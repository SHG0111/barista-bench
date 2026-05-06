import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  
  const idSchema = z.string().uuid('Invalid product ID format')
  const validation = idSchema.safeParse(id)
  if (!validation.success) {
    const firstError = validation.error.issues[0]
    throw createError({ statusCode: 400, message: firstError?.message ?? 'Validation failed' })
  }

  const validatedId = validation.data

  const supabaseAdmin = createClient(config.public.supabaseUrl, config.supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  const { data: product } = await supabaseAdmin
    .from('products_with_category')
    .select('images, category_slug')
    .eq('id', validatedId)
    .single()

  if (product?.images?.length) {
    const paths = product.images.map((url: string) => {
      const prefix = '/storage/v1/object/public/products/'
      const idx = url.indexOf(prefix)
      return idx !== -1 ? url.substring(idx + prefix.length) : null
    }).filter(Boolean)

    if (paths.length > 0) {
      await supabaseAdmin.storage.from('products').remove(paths)
    }
  }

  const categoryFolder = product?.category_slug || 'uncategorized'
  await supabaseAdmin.storage.from('products').remove([`${categoryFolder}/${validatedId}`])

  const { error } = await supabaseAdmin.from('products').delete().eq('id', validatedId)

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  return { success: true }
})
