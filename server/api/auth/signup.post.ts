import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseUrl = process.env.SUPABASE_URL || config.public.supabaseUrl
  const serviceKey = process.env.SUPABASE_SECRET_KEY || config.supabaseSecretKey

  if (!supabaseUrl || !serviceKey) {
    throw createError({ statusCode: 500, statusMessage: 'Supabase config missing' })
  }

  const body = await readBody(event)
  const { email, password, fullName } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'email and password are required' })
  }

  const normalizedEmail = email.trim().toLowerCase()
  const origin = getRequestURL(event).origin

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'signup',
    email: normalizedEmail,
    options: {
      password,
      data: { full_name: fullName?.trim() || '' },
      redirect_to: `${origin}/auth/confirm`,
    },
  })

  if (error) {
    console.error('Generate signup link error:', JSON.stringify(error))
    if (error.message?.includes('already registered') || error.message?.includes('duplicate') || error.message?.includes('User already registered')) {
      throw createError({ statusCode: 409, statusMessage: 'This email is already registered. Please sign in instead.' })
    }
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  const confirmUrl = data.properties?.action_link || data.action_link
  if (!confirmUrl) {
    throw createError({ statusCode: 500, statusMessage: 'No confirmation URL returned' })
  }

  await sendMailtrapEmail(
    normalizedEmail,
    'Confirm your Barista Bench account',
    `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #333;">Welcome to Barista Bench!</h2>
        <p style="color: #666; line-height: 1.6;">Click the button below to confirm your email address.</p>
        <a href="${confirmUrl}"
           style="display: inline-block; background: #000; color: #fff; padding: 14px 28px;
                  text-decoration: none; border-radius: 6px; font-weight: 600; margin: 24px 0;">
          Confirm Email
        </a>
        <p style="color: #999; font-size: 12px; margin-top: 32px;">If you didn't create an account, ignore this email.</p>
      </div>
    `,
  )

  return { success: true, user_id: data.user?.id }
})
