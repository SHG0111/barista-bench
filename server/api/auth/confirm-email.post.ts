import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl || process.env.SUPABASE_URL
  const serviceKey = config.supabaseSecretKey || process.env.SUPABASE_SECRET_KEY

  if (!supabaseUrl || !serviceKey) {
    throw createError({ statusCode: 500, statusMessage: 'Supabase config missing' })
  }

  const { email } = await readBody(event)
  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'email is required' })
  }

  const normalizedEmail = email.trim().toLowerCase()
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
    type: 'signup',
    email: normalizedEmail,
    options: {
      redirectTo: `${origin}/auth/confirm`,
    },
  })

  if (error) {
    console.error('Generate confirmation link error:', JSON.stringify(error))
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

  return { success: true }
})
