import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)
  const { productId, quantity } = body

  if (!productId) {
    throw createError({ statusCode: 400, statusMessage: 'productId is required' })
  }

  const { data: existing, error: fetchError } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .maybeSingle()

  if (fetchError) {
    throw createError({ statusCode: 500, statusMessage: fetchError.message })
  }

  let error
  if (existing) {
    const newQty = existing.quantity + (quantity || 1)
    const res = await supabase
      .from('cart_items')
      .update({ quantity: newQty })
      .eq('user_id', user.id)
      .eq('product_id', productId)
    error = res.error
  } else {
    const res = await supabase
      .from('cart_items')
      .insert({ user_id: user.id, product_id: productId, quantity: quantity || 1 })
    error = res.error
  }

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { success: true }
})
