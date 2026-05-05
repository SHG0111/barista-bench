import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseUrl = process.env.SUPABASE_URL || config.public.supabaseUrl
  const serviceKey = process.env.SUPABASE_SECRET_KEY || config.supabaseSecretKey

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

  const recoveryUrl = data.properties?.action_link || data.action_link
  if (!recoveryUrl) {
    throw createError({ statusCode: 500, statusMessage: 'No recovery URL returned' })
  }

  await sendMailtrapEmail(
    normalizedEmail,
    'Reset your Barista Bench password',
    `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #333;">Reset your password</h2>
        <p style="color: #666; line-height: 1.6;">Click the button below to set a new password.</p>
        <a href="${recoveryUrl}"
           style="display: inline-block; background: #000; color: #fff; padding: 14px 28px;
                  text-decoration: none; border-radius: 6px; font-weight: 600; margin: 24px 0;">
          Reset Password
        </a>
        <p style="color: #999; font-size: 12px; margin-top: 32px;">If you didn't request this, ignore this email.</p>
      </div>
    `,
  )

  return { success: true }
})
