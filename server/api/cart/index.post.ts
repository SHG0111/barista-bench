import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import { z } from 'zod'

const cartSchema = z.object({
  productId: z.string().uuid('Invalid product ID format'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99, 'Quantity cannot exceed 99').default(1),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('CART BODY RECEIVED:', body, 'productId:', body?.productId, typeof body?.productId)

  const validation = cartSchema.safeParse(body)
  if (!validation.success) {
    const firstError = validation?.error?.issues?.[0]?.message ?? 'Invalid request data'
    throw createError({ statusCode: 400, statusMessage: firstError })
  }

  const user = await serverSupabaseUser(event).catch(() => null)
  const userId = user?.sub ?? user?.id

  if (!userId || typeof userId !== 'string') {
    throw createError({ statusCode: 401, statusMessage: 'Please log in to add items to cart' })
  }

  const { productId, quantity } = validation.data

  const supabase = serverSupabaseServiceRole(event)
  const { data: existing, error: fetchError } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle()

  if (fetchError) {
    console.error('Cart fetch error:', JSON.stringify(fetchError))
    throw createError({ statusCode: 500, statusMessage: `Cart DB error: ${fetchError.message}` })
  }

  console.log('Cart operation:', existing ? 'update' : 'insert', 'userId:', userId, 'productId:', productId, 'quantity:', quantity)

  let error
  if (existing) {
    const newQty = existing.quantity + quantity
    if (newQty > 99) {
      throw createError({ statusCode: 400, statusMessage: 'Maximum quantity per item is 99' })
    }
    const res = await supabase
      .from('cart_items')
      .update({ quantity: newQty })
      .eq('user_id', userId)
      .eq('product_id', productId)
    error = res.error
  } else {
    const res = await supabase
      .from('cart_items')
      .insert({ user_id: userId, product_id: productId, quantity })
    error = res.error
  }

  if (error) {
    console.error('Cart insert/update error:', JSON.stringify(error))
    throw createError({ statusCode: 500, statusMessage: 'Failed to update cart. Please try again.' })
  }

  console.log('Cart item added successfully')
  return { success: true }
})
