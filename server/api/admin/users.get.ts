import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  const supabaseUrl = config.public.supabaseUrl
  const supabaseSecretKey = config.supabaseSecretKey

  const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey, {
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

  const { data: profiles, error: profilesError } = await supabaseAdmin.from('profiles').select('*')
  if (profilesError) {
    console.error('Error fetching profiles:', profilesError)
    throw createError({ statusCode: 500, message: 'Failed to fetch profiles' })
  }

  const usersWithEmail = profiles.map(profile => {
    const authUser = users.find(u => u.id === profile.id)
    const avatarUrl = profile.avatar_url 
      || authUser?.user_metadata?.avatar_url 
      || authUser?.user_metadata?.picture 
      || authUser?.user_metadata?.avatar 
      || null
    return {
      ...profile,
      email: authUser?.email || profile.email || 'No email',
      avatar_url: avatarUrl
    }
  })

  return usersWithEmail
})
