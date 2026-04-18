import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cachedClient: SupabaseClient | null = null

function getSupabaseServerConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  }
}

export function hasSupabaseServerConfig(): boolean {
  const { url, serviceRoleKey } = getSupabaseServerConfig()
  return Boolean(url && serviceRoleKey)
}

export function getSupabaseServerClient(): SupabaseClient {
  if (cachedClient) {
    return cachedClient
  }

  const { url, serviceRoleKey } = getSupabaseServerConfig()
  if (!url || !serviceRoleKey) {
    throw new Error(
      'Supabase server configuration is missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    )
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return cachedClient
}
