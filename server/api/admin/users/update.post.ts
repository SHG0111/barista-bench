import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const updateStatusSchema = z.object({
  id: z.string().uuid('Invalid user ID format'),
  status: z.enum(['active', 'suspended', 'pending'], { message: 'Status must be active, suspended, or pending' }),
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const validation = updateStatusSchema.safeParse(body)
  if (!validation.success) {
    const firstError = validation.error.issues[0]
    throw createError({ statusCode: 400, message: firstError?.message || 'Validation failed' })
  }

  const { id, status } = validation.data

  const supabaseAdmin = createClient(config.public.supabaseUrl, config.supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  const { data, error } = await supabaseAdmin.from('profiles').update({ status }).eq('id', id).select().single()

  if (error) {
    console.error('Error updating profile status:', error)
    throw createError({ statusCode: 500, message: 'Failed to update user status. Please try again.' })
  }

  return data
})
