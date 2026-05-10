export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { createClient } = await import('@supabase/supabase-js')

  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.supabaseSecretKey as string
  )

  const query = getQuery(event)
  const userId = query.userId as string
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing userId' })
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('placed_at', { ascending: false })


  if (error) {
    console.error('Fetch orders error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch orders' })
  }

  return data || []
})
