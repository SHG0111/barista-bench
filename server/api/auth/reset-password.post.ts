import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required').transform(e => e.trim().toLowerCase()),
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseUrl = process.env.SUPABASE_URL || config.public.supabaseUrl
  const serviceKey = process.env.SUPABASE_SECRET_KEY || config.supabaseSecretKey

  if (!supabaseUrl || !serviceKey) {
    throw createError({ statusCode: 500, statusMessage: 'Supabase configuration is missing' })
  }

  const body = await readBody(event)

  const validation = emailSchema.safeParse(body)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map(issue => issue.message)
    throw createError({ statusCode: 400, statusMessage: 'Validation failed', data: { errors: errorMessages } })
  }

  const { email: normalizedEmail } = validation.data
  const origin = getRequestURL(event).origin

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'recovery',
    email: normalizedEmail,
    options: {
      redirectTo: `${origin}/auth/update-password`,
    },
  })

  if (error) {
    console.error('Generate recovery link error:', JSON.stringify(error))
    if (error.message?.includes('not found') || error.message?.includes('does not exist')) {
      return { success: true }
    }
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  const recoveryUrl = data.properties?.action_link
  if (!recoveryUrl) {
    throw createError({ statusCode: 500, statusMessage: 'No recovery URL returned' })
  }

  return { success: true }
})
