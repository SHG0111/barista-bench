import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { id, status } = body

  if (!id || !status) {
    throw createError({ statusCode: 400, message: 'Missing id or status' })
  }

  const supabaseAdmin = createClient(config.public.supabaseUrl, config.supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  const { data, error } = await supabaseAdmin.from('profiles').update({ status }).eq('id', id).select().single()

  if (error) {
    console.error('Error updating profile status:', error)
    throw createError({ statusCode: 500, message: error.message })
  }

  return data
})
