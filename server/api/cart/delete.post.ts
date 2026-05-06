import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import { z } from 'zod'

const deleteCartSchema = z.object({
  productId: z.string().uuid('Invalid product ID format'),
})

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event).catch(() => null)
  const userId = user?.sub ?? user?.id

  if (!userId || typeof userId !== 'string') {
    throw createError({ statusCode: 401, statusMessage: 'Please log in to remove items from cart' })
  }

  const body = await readBody(event)

  const validation = deleteCartSchema.safeParse(body)
  if (!validation.success) {
    const firstError = validation?.error?.issues?.[0]?.message ?? 'Invalid request data'
    throw createError({ statusCode: 400, statusMessage: firstError })
  }


  const { productId } = validation.data

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
})
