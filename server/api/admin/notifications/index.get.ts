import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseAdmin = createClient(config.public.supabaseUrl, config.supabaseSecretKey, {
    auth: { persistSession: false },
  })

  const { data: notifications, error } = await supabaseAdmin
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(15)

  if (error) {
    if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
      return []
    }
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return notifications || []
})
