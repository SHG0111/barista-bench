import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, message: 'Missing id' })
  }

  const supabaseAdmin = createClient(config.public.supabaseUrl, config.supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  // Check if user is admin before deleting
  const { data: profile } = await supabaseAdmin.from('profiles').select('role').eq('id', id).single()
  if (profile?.role === 'admin') {
    throw createError({ statusCode: 403, message: 'Cannot delete admin users' })
  }

  // Delete from auth.users first
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id)
  if (authError) {
    console.error('Error deleting auth user:', authError)
  }

  // Delete from profiles table
  const { error } = await supabaseAdmin.from('profiles').delete().eq('id', id)

  if (error) {
    console.error('Error deleting profile:', error)
    throw createError({ statusCode: 500, message: error.message })
  }

  return { success: true }
})
