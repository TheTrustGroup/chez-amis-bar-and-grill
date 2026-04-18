'use client'

import { useEffect, useMemo, useState } from 'react'
import { RefreshCw, Send, AlertTriangle, Clock3, CheckCircle2, Mail, MessageSquare } from 'lucide-react'
import { PageHeader } from '@/components/admin/ui/PageHeader'
import { StatCard } from '@/components/admin/ui/StatCard'
import { ActionButton } from '@/components/admin/ui/ActionButton'
import { DataSectionCard } from '@/components/admin/ui/DataSectionCard'
import { StatusBadge } from '@/components/admin/ui/StatusBadge'

type OutboxStatus = 'pending' | 'processing' | 'sent' | 'failed'
type OutboxChannel = 'email' | 'sms'

interface OutboxItem {
  id: string
  eventType: string
  channel: OutboxChannel
  status: OutboxStatus
  recipient: string
  attempts: number
  errorMessage?: string
  nextRetryAt: string
  createdAt: string
  updatedAt: string
}

interface OutboxResponse {
  success: boolean
  counts: Record<OutboxStatus, number>
  items: OutboxItem[]
}

export default function AdminOutboxPage() {
  const [items, setItems] = useState<OutboxItem[]>([])
  const [counts, setCounts] = useState<Record<OutboxStatus, number>>({
    pending: 0,
    processing: 0,
    sent: 0,
    failed: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isRetrying, setIsRetrying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const failedItems = useMemo(() => items.filter((item) => item.status === 'failed'), [items])
  const pendingItems = useMemo(
    () => items.filter((item) => item.status === 'pending' || item.status === 'processing'),
    [items]
  )

  const fetchOutbox = async () => {
    setError(null)
    try {
      const response = await fetch('/api/admin/outbox?limit=200', { cache: 'no-store' })
      const data = (await response.json()) as OutboxResponse & { error?: string }
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch outbox status')
      }
      setItems(data.items || [])
      setCounts(
        data.counts || {
          pending: 0,
          processing: 0,
          sent: 0,
          failed: 0,
        }
      )
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to fetch outbox')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = async () => {
    setIsRetrying(true)
    setError(null)
    try {
      const response = await fetch('/api/admin/outbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit: 100 }),
      })
      const data = (await response.json()) as { success?: boolean; error?: string }
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Retry request failed')
      }
      await fetchOutbox()
    } catch (retryError) {
      setError(retryError instanceof Error ? retryError.message : 'Failed to retry outbox')
    } finally {
      setIsRetrying(false)
    }
  }

  useEffect(() => {
    void fetchOutbox()
    const interval = setInterval(() => {
      void fetchOutbox()
    }, 20000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-amber-600" />
          <p className="text-muted-foreground">Loading outbox...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="ui-stack-lg">
      <PageHeader
        title="Notification Outbox"
        subtitle="Monitor notification delivery failures and retries."
        actions={
          <>
            <ActionButton
              onClick={() => void fetchOutbox()}
              icon={<RefreshCw className="h-4 w-4" />}
            >
              Refresh
            </ActionButton>
            <ActionButton
              onClick={() => void handleRetry()}
              disabled={isRetrying}
              tone="primary"
              icon={<Send className={`h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`} />}
            >
              Retry Due
            </ActionButton>
          </>
        }
      />

      {error ? (
        <div className="ui-panel border-red-200 bg-red-50 text-red-800">{error}</div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pending" value={String(counts.pending)} icon={Clock3} />
        <StatCard label="Processing" value={String(counts.processing)} icon={RefreshCw} />
        <StatCard label="Sent" value={String(counts.sent)} icon={CheckCircle2} trendTone="positive" />
        <StatCard label="Failed" value={String(counts.failed)} icon={AlertTriangle} trendTone="negative" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DataSectionCard title="Failed Notifications" className="p-0" contentClassName="max-h-[460px] overflow-y-auto space-y-3">
          {failedItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">No failed notifications.</p>
          ) : (
            failedItems.map((item) => (
              <article key={item.id} className="rounded-lg border border-red-200 bg-red-50 p-3">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-red-900">{item.eventType}</p>
                  <StatusBadge label={item.status} tone="danger" />
                </div>
                <p className="text-xs text-red-800">{item.recipient}</p>
                <p className="mt-1 text-xs text-red-700">
                  Attempts: {item.attempts} • Next retry: {new Date(item.nextRetryAt).toLocaleString()}
                </p>
                {item.errorMessage ? (
                  <p className="mt-2 text-xs text-red-900">{item.errorMessage}</p>
                ) : null}
              </article>
            ))
          )}
        </DataSectionCard>

        <DataSectionCard title="Pending / Processing" className="p-0" contentClassName="max-h-[460px] overflow-y-auto space-y-3">
          {pendingItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">No queued notifications.</p>
          ) : (
            pendingItems.map((item) => (
              <article key={item.id} className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{item.eventType}</p>
                  <StatusBadge label={item.status} tone="warning" />
                </div>
                <p className="text-xs text-muted-foreground">{item.recipient}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  {item.channel === 'email' ? <Mail className="h-3.5 w-3.5" /> : <MessageSquare className="h-3.5 w-3.5" />}
                  <span>{item.channel.toUpperCase()}</span>
                  <span>•</span>
                  <span>{new Date(item.createdAt).toLocaleString()}</span>
                </div>
              </article>
            ))
          )}
        </DataSectionCard>
      </div>
    </div>
  )
}
