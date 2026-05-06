import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event).catch(() => null)
  const userId = user?.sub ?? user?.id

  if (!userId || typeof userId !== 'string') {
    throw createError({ statusCode: 401, statusMessage: 'Please log in to view your cart' })
  }

  const supabase = serverSupabaseServiceRole(event)
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, products(*)')
    .eq('user_id', userId)

  if (error) {
    console.error('Cart GET error:', JSON.stringify(error))
    throw createError({ statusCode: 500, statusMessage: 'Failed to load cart items' })
  }

  console.log('Cart GET - returning', (data || []).length, 'items')
  return { items: data || [], count: (data || []).length }
})
