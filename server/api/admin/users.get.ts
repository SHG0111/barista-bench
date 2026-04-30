import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  const supabaseUrl = config.public.supabaseUrl
  const supabaseServiceKey = config.supabaseServiceKey

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers()
  if (authError) {
    console.error('Error fetching auth users:', authError)
    throw createError({ statusCode: 500, message: 'Failed to fetch users' })
  }

  const supabaseClient = createServerClient(
    supabaseUrl,
    config.supabaseServiceKey,
    { cookies: { get: () => {} } }
  )

  const { data: profiles, error: profilesError } = await supabaseClient.from('profiles').select('*')
  if (profilesError) {
    console.error('Error fetching profiles:', profilesError)
    throw createError({ statusCode: 500, message: 'Failed to fetch profiles' })
  }

  const usersWithEmail = profiles.map(profile => {
    const authUser = users.find(u => u.id === profile.id)
    return {
      ...profile,
      email: authUser?.email || profile.email || 'No email'
    }
  })

  return usersWithEmail
})
