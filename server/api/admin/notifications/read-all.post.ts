import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseAdmin = createClient(config.public.supabaseUrl, config.supabaseSecretKey, {
    auth: { persistSession: false },
  })

  const { data: all, error: fetchError } = await supabaseAdmin
    .from('notifications')
    .select('id')

  if (fetchError) {
    if (fetchError.message?.includes('relation') && fetchError.message?.includes('does not exist')) {
      return { success: true, count: 0 }
    }
    throw createError({ statusCode: 500, statusMessage: fetchError.message })
  }

  const ids = (all || []).map(n => n.id)

  if (ids.length === 0) {
    return { success: true, count: 0 }
  }

  const { error } = await supabaseAdmin
    .from('notifications')
    .delete()
    .in('id', ids)

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { success: true, count: ids.length }
})
