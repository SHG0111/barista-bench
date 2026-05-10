import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required').transform(e => e.trim().toLowerCase()),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/[a-zA-Z]/, 'Password must contain at least one letter').regex(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name is too long'),
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseUrl = process.env.SUPABASE_URL || config.public.supabaseUrl
  const serviceKey = process.env.SUPABASE_SECRET_KEY || config.supabaseSecretKey

  if (!supabaseUrl || !serviceKey) {
    throw createError({ statusCode: 500, statusMessage: 'Supabase configuration is missing' })
  }

  const body = await readBody(event)

  const validation = signupSchema.safeParse(body)
  if (!validation.success) {
    const firstError = validation.error.issues[0]
    throw createError({ statusCode: 400, statusMessage: firstError?.message ?? 'Validation failed' })
  }

  const { email, password, fullName } = validation.data

  const origin = getRequestURL(event).origin

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'signup',
    email,
    password,
    options: {
      data: { full_name: fullName },
      redirectTo: `${origin}/auth/confirm`,
    },
  })

  if (error) {
    console.error('Generate signup link error:', JSON.stringify(error))
    if (error.message?.includes('already registered') || error.message?.includes('duplicate') || error.message?.includes('User already registered')) {
      throw createError({ statusCode: 409, statusMessage: 'This email is already registered. Please sign in instead.' })
    }
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  const confirmUrl = data.properties?.action_link
  if (!confirmUrl) {
    throw createError({ statusCode: 500, statusMessage: 'No confirmation URL returned' })
  }

  await createNotification(event, {
    type: 'user',
    title: 'New user registered',
    description: `${fullName} created an account`,
    link: '/admin/users',
  })

  return { success: true, user_id: data.user?.id }
})
