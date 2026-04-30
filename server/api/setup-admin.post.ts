import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // Use the regular supabase client
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  const email = 'admin@bench.bb'
  const password = 'Barista2026!'

  // Sign up the admin user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: 'Admin' }
    }
  })

  if (signUpError) {
    // If user already exists, that's okay
    if (signUpError.message?.includes('already registered')) {
      return { 
        success: true, 
        message: 'Admin account already exists. Log in and promote via SQL.',
        credentials: { email, password }
      }
    }
    return { success: false, error: signUpError.message }
  }

  const userId = signUpData?.user?.id

  // Try to set role to admin in profiles
  if (userId) {
    // Upsert profile with admin role
    await supabase.from('profiles').upsert({
      id: userId,
      full_name: 'Admin',
      role: 'admin',
      updated_at: new Date().toISOString()
    })
  }

  return {
    success: true,
    message: 'Admin account created! You may still need to promote via Supabase SQL Editor if RLS blocks the role update.',
    credentials: { email, password },
    userId,
    sqlFallback: `UPDATE public.profiles SET role = 'admin' WHERE id = '${userId}';`
  }
})
