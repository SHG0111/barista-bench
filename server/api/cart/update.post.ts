import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import { z } from 'zod'

const updateCartSchema = z.object({
  productId: z.string().uuid('Invalid product ID format'),
  quantity: z.number().int().min(0, 'Quantity cannot be negative').max(99, 'Quantity cannot exceed 99'),
})

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event).catch(() => null)
  const userId = user?.sub ?? user?.id

  if (!userId || typeof userId !== 'string') {
    throw createError({ statusCode: 401, statusMessage: 'Please log in to update your cart' })
  }

  const body = await readBody(event)

  const validation = updateCartSchema.safeParse(body)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map(issue => issue.message)
    throw createError({ statusCode: 400, statusMessage: 'Validation failed', data: { errors: errorMessages } })
  }

  const { productId, quantity } = validation.data

  if (quantity === 0) {
    const supabase = serverSupabaseServiceRole(event)
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)

    if (error) {
      throw createError({ statusCode: 500, statusMessage: 'Failed to remove item from cart. Please try again.' })
    }
    return { success: true }
  }

  const supabase = serverSupabaseServiceRole(event)
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('user_id', userId)
    .eq('product_id', productId)
    .select()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to update cart quantity. Please try again.' })
  }

  return data
})
