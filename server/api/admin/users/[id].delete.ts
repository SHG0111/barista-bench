import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  const idSchema = z.string().uuid('Invalid user ID format')
  const validation = idSchema.safeParse(id)
  if (!validation.success) {
    const firstError = validation.error.issues[0]
    throw createError({ statusCode: 400, message: firstError?.message || 'Validation failed' })
  }

  const validatedId = validation.data

  const supabaseAdmin = createClient(config.public.supabaseUrl, config.supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  // Check if user is admin before deleting
  const { data: profile } = await supabaseAdmin.from('profiles').select('role').eq('id', validatedId).single()
  if (profile?.role === 'admin') {
    throw createError({ statusCode: 403, message: 'Cannot delete admin users' })
  }

  // Delete from auth.users first
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(validatedId)
  if (authError) {
    console.error('Error deleting auth user:', authError)
  }

  // Delete from profiles table
  const { error } = await supabaseAdmin.from('profiles').delete().eq('id', validatedId)

  if (error) {
    console.error('Error deleting profile:', error)
    throw createError({ statusCode: 500, message: 'Failed to delete user. Please try again.' })
  }

  return { success: true }
})
