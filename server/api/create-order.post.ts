const countryTimezone: Record<string, string> = {
  AE: 'Asia/Dubai', SA: 'Asia/Riyadh', QA: 'Asia/Qatar',
  KW: 'Asia/Kuwait', BH: 'Asia/Bahrain', OM: 'Asia/Muscat',
  JO: 'Asia/Amman', LB: 'Asia/Beirut', EG: 'Africa/Cairo',
}

function toLocalISO(date: Date, tz: string): string {
  const str = date.toLocaleString('sv-SE', { timeZone: tz, hour12: false })
  return str.replace(' ', 'T') + '.000Z'
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig(event)
  const { createClient } = await import('@supabase/supabase-js')
  
  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.supabaseSecretKey as string
  )

  const {
    userId,
    orderNumber,
    status,
    items,
    shippingInfo,
    billingInfo,
    subtotal,
    discount,
    shippingCost,
    tax,
    total,
    country,
  } = body

  if (!orderNumber || !items || items.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid order data' })
  }

  const tz = countryTimezone[country as string] || 'UTC'
  const now = new Date()

  const orderData = {
    order_number: orderNumber,
    user_id: userId || null,
    status,
    shipping_info: shippingInfo,
    billing_info: billingInfo || shippingInfo,
    subtotal,
    discount: discount || 0,
    shipping_cost: shippingCost || 0,
    tax: tax || 0,
    total,
    placed_at: toLocalISO(now, tz),
    updated_at: toLocalISO(now, tz),
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single()

  if (orderError) {
    console.error('Order insert error:', orderError)
    throw createError({ statusCode: 500, statusMessage: orderError.message })
  }

  const orderItems = items.map((item: any) => ({
    order_id: order.id,
    product_id: item.product_id || item.products?.id || null,
    product_name: item.products?.name || item.product_name || 'Unknown Product',
    product_sku: item.products?.sku || null,
    variant_info: item.variant || null,
    quantity: item.quantity,
    unit_price: item.products?.price || 0,
    total_price: (item.products?.price || 0) * item.quantity,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    console.error('Order items insert error:', itemsError)
    throw createError({ statusCode: 500, statusMessage: itemsError.message })
  }

  if (userId) {
    await supabase.from('cart_items').delete().eq('user_id', userId)
  }

  const customerName = shippingInfo?.name || 'A customer'
  await createNotification(event, {
    type: 'order',
    title: 'New order placed',
    description: `Order ${orderNumber} — $${total.toFixed(2)} by ${customerName}`,
    link: `/order/${order.id}`,
  })

  return {
    success: true,
    orderId: order.id,
    orderNumber: order.order_number,
  }
})
