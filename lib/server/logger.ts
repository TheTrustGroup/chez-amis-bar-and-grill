type LogLevel = 'info' | 'warn' | 'error'

interface LogPayload {
  event: string
  route?: string
  requestId?: string
  metadata?: Record<string, unknown>
}

function writeLog(level: LogLevel, payload: LogPayload): void {
  const entry = {
    ts: new Date().toISOString(),
    level,
    event: payload.event,
    route: payload.route,
    requestId: payload.requestId,
    ...payload.metadata,
  }

  if (level === 'error') {
    console.error(JSON.stringify(entry))
    return
  }
  if (level === 'warn') {
    console.warn(JSON.stringify(entry))
    return
  }
  console.log(JSON.stringify(entry))
}

export function logInfo(payload: LogPayload): void {
  writeLog('info', payload)
}

export function logWarn(payload: LogPayload): void {
  writeLog('warn', payload)
}

export function logError(payload: LogPayload): void {
  writeLog('error', payload)
}
