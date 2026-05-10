import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const notificationId = body?.notification_id

  if (!notificationId) {
    throw createError({ statusCode: 400, statusMessage: 'notification_id is required' })
  }

  const supabaseAdmin = createClient(config.public.supabaseUrl, config.supabaseSecretKey, {
    auth: { persistSession: false },
  })

  const { error } = await supabaseAdmin
    .from('notifications')
    .delete()
    .eq('id', notificationId)

  if (error) {
    if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
      return { success: true }
    }
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { success: true }
})
