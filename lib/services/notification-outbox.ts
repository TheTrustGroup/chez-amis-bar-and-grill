import { promises as fs } from 'fs'
import path from 'path'
import { getSupabaseServerClient, hasSupabaseServerConfig } from '@/lib/services/supabase-server'
import { sendEmail } from '@/lib/services/email.service'
import { sendSMS } from '@/lib/services/sms.service'
import type { EmailTemplate, SMSTemplate } from '@/lib/types/notifications'

type OutboxEventType =
  | 'order_customer_notification'
  | 'order_admin_notification'
  | 'reservation_customer_notification'
  | 'reservation_admin_notification'

type OutboxChannel = 'email' | 'sms'
type OutboxStatus = 'pending' | 'processing' | 'sent' | 'failed'

interface OutboxRecordPayload {
  template: EmailTemplate | SMSTemplate
  data: Record<string, unknown>
  subject?: string
}

export interface OutboxRecord {
  id: string
  eventType: OutboxEventType
  channel: OutboxChannel
  status: OutboxStatus
  recipient: string
  payload: OutboxRecordPayload
  errorMessage?: string
  attempts: number
  nextRetryAt: string
  createdAt: string
  updatedAt: string
}

const STORAGE_BACKEND = (process.env.ORDER_STORAGE_BACKEND || 'file').toLowerCase()
const SUPABASE_OUTBOX_TABLE = 'notification_outbox'
const STORAGE_DIR = path.join(process.cwd(), '.data')
const STORAGE_FILE = path.join(STORAGE_DIR, 'notification-outbox.json')
const OUTBOX_MAX_RETRIES = Number.parseInt(process.env.OUTBOX_MAX_RETRIES || '6', 10)

interface SupabaseOutboxRow {
  id: string
  event_type: OutboxEventType
  channel: OutboxChannel
  status: OutboxStatus
  recipient: string
  payload: OutboxRecordPayload
  error_message: string | null
  attempts: number
  next_retry_at: string
  created_at: string
  updated_at: string
}

function shouldUseSupabaseOutbox(): boolean {
  return STORAGE_BACKEND === 'supabase' && hasSupabaseServerConfig()
}

async function ensureStorageDir(): Promise<void> {
  await fs.mkdir(STORAGE_DIR, { recursive: true })
}

async function readOutboxFile(): Promise<OutboxRecord[]> {
  try {
    await ensureStorageDir()
    const data = await fs.readFile(STORAGE_FILE, 'utf-8')
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []
    throw error
  }
}

async function writeOutboxFile(records: OutboxRecord[]): Promise<void> {
  await ensureStorageDir()
  const temp = `${STORAGE_FILE}.tmp`
  await fs.writeFile(temp, JSON.stringify(records, null, 2), 'utf-8')
  await fs.rename(temp, STORAGE_FILE)
}

function toOutboxRecord(row: SupabaseOutboxRow): OutboxRecord {
  return {
    id: row.id,
    eventType: row.event_type,
    channel: row.channel,
    status: row.status,
    recipient: row.recipient,
    payload: row.payload,
    errorMessage: row.error_message || undefined,
    attempts: row.attempts,
    nextRetryAt: row.next_retry_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function buildOutboxRecord(input: {
  eventType: OutboxEventType
  channel: OutboxChannel
  recipient: string
  payload: OutboxRecordPayload
  errorMessage?: string
}): OutboxRecord {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    eventType: input.eventType,
    channel: input.channel,
    status: 'pending',
    recipient: input.recipient,
    payload: input.payload,
    errorMessage: input.errorMessage,
    attempts: 0,
    nextRetryAt: now,
    createdAt: now,
    updatedAt: now,
  }
}

export async function enqueueFailedNotification(input: {
  eventType: OutboxEventType
  channel: OutboxChannel
  recipient: string
  payload: OutboxRecordPayload
  errorMessage?: string
}): Promise<void> {
  const record = buildOutboxRecord(input)

  if (shouldUseSupabaseOutbox()) {
    const client = getSupabaseServerClient()
    const { error } = await client.from(SUPABASE_OUTBOX_TABLE).insert({
      event_type: record.eventType,
      channel: record.channel,
      status: record.status,
      recipient: record.recipient,
      payload: record.payload,
      error_message: record.errorMessage || null,
      attempts: record.attempts,
      next_retry_at: record.nextRetryAt,
    })
    if (error) {
      throw new Error(`Failed to enqueue outbox record in Supabase: ${error.message}`)
    }
    return
  }

  const existing = await readOutboxFile()
  existing.unshift(record)
  await writeOutboxFile(existing)
}

function getNextRetryAt(attempts: number): string {
  const backoffMinutes = Math.min(2 ** Math.max(attempts - 1, 0), 60)
  return new Date(Date.now() + backoffMinutes * 60 * 1000).toISOString()
}

async function updateOutboxRecord(record: OutboxRecord): Promise<void> {
  if (shouldUseSupabaseOutbox()) {
    const client = getSupabaseServerClient()
    const { error } = await client
      .from(SUPABASE_OUTBOX_TABLE)
      .update({
        status: record.status,
        error_message: record.errorMessage || null,
        attempts: record.attempts,
        next_retry_at: record.nextRetryAt,
        updated_at: new Date().toISOString(),
      })
      .eq('id', record.id)

    if (error) {
      throw new Error(`Failed to update outbox record ${record.id}: ${error.message}`)
    }
    return
  }

  const records = await readOutboxFile()
  const index = records.findIndex((entry) => entry.id === record.id)
  if (index === -1) return
  records[index] = record
  await writeOutboxFile(records)
}

async function getDueOutboxRecords(limit: number): Promise<OutboxRecord[]> {
  const nowIso = new Date().toISOString()

  if (shouldUseSupabaseOutbox()) {
    const client = getSupabaseServerClient()
    const { data, error } = await client
      .from(SUPABASE_OUTBOX_TABLE)
      .select('*')
      .in('status', ['pending', 'failed'])
      .lte('next_retry_at', nowIso)
      .order('created_at', { ascending: true })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to fetch due outbox records: ${error.message}`)
    }

    return (data || []).map((row) => toOutboxRecord(row as SupabaseOutboxRow))
  }

  const records = await readOutboxFile()
  return records
    .filter(
      (record) =>
        (record.status === 'pending' || record.status === 'failed') &&
        new Date(record.nextRetryAt).getTime() <= Date.now()
    )
    .sort((left, right) => left.createdAt.localeCompare(right.createdAt))
    .slice(0, limit)
}

async function dispatchOutboxRecord(record: OutboxRecord): Promise<void> {
  if (record.channel === 'email') {
    if (!record.payload.subject) {
      throw new Error('Outbox email payload missing subject')
    }
    await sendEmail({
      to: record.recipient,
      subject: record.payload.subject,
      template: record.payload.template as EmailTemplate,
      data: record.payload.data as any,
    })
    return
  }

  await sendSMS({
    to: record.recipient,
    template: record.payload.template as SMSTemplate,
    data: record.payload.data as any,
  })
}

export async function processNotificationOutbox(limit: number = 25): Promise<{
  scanned: number
  sent: number
  failed: number
}> {
  const dueRecords = await getDueOutboxRecords(limit)
  let sent = 0
  let failed = 0

  for (const record of dueRecords) {
    record.status = 'processing'
    record.updatedAt = new Date().toISOString()
    await updateOutboxRecord(record)

    try {
      await dispatchOutboxRecord(record)
      record.status = 'sent'
      record.errorMessage = undefined
      record.attempts += 1
      record.nextRetryAt = new Date().toISOString()
      record.updatedAt = new Date().toISOString()
      await updateOutboxRecord(record)
      sent += 1
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      record.attempts += 1
      record.errorMessage = message
      record.nextRetryAt = getNextRetryAt(record.attempts)
      record.status = record.attempts >= OUTBOX_MAX_RETRIES ? 'failed' : 'pending'
      record.updatedAt = new Date().toISOString()
      await updateOutboxRecord(record)
      failed += 1
    }
  }

  return {
    scanned: dueRecords.length,
    sent,
    failed,
  }
}

export async function getOutboxSummary(limit: number = 100): Promise<{
  counts: Record<OutboxStatus, number>
  items: OutboxRecord[]
}> {
  const counts: Record<OutboxStatus, number> = {
    pending: 0,
    processing: 0,
    sent: 0,
    failed: 0,
  }

  if (shouldUseSupabaseOutbox()) {
    const client = getSupabaseServerClient()
    const { data, error } = await client
      .from(SUPABASE_OUTBOX_TABLE)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to fetch outbox summary: ${error.message}`)
    }

    const items = (data || []).map((row) => toOutboxRecord(row as SupabaseOutboxRow))
    for (const item of items) {
      counts[item.status] += 1
    }
    return { counts, items }
  }

  const items = (await readOutboxFile())
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .slice(0, limit)
  for (const item of items) {
    counts[item.status] += 1
  }
  return { counts, items }
}
