import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required').transform(e => e.trim().toLowerCase()),
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl || process.env.SUPABASE_URL
  const serviceKey = config.supabaseSecretKey || process.env.SUPABASE_SECRET_KEY

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

  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
  if (listError) {
    throw createError({ statusCode: 500, statusMessage: listError.message })
  }

  const user = users.find(u => u.email?.toLowerCase() === normalizedEmail)
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  if (user.email_confirmed_at) {
    return { success: true, alreadyConfirmed: true }
  }

  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: normalizedEmail,
    options: {
      redirectTo: `${origin}/auth/confirm`,
    },
  })

  if (error) {
    console.error('Generate confirmation link error:', JSON.stringify(error))
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  const confirmUrl = data.properties?.action_link
  if (!confirmUrl) {
    throw createError({ statusCode: 500, statusMessage: 'No confirmation URL returned' })
  }

  return { success: true }
})
