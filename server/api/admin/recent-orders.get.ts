import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseAdmin = createClient(config.public.supabaseUrl, config.supabaseSecretKey, {
    auth: { persistSession: false },
  })

  const { data: orders, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('placed_at', { ascending: false })
    .limit(5)

  if (error) {
    throw createError({ statusCode: 500, statusMessage: `Orders fetch failed: ${error.message}` })
  }
  if (!orders || orders.length === 0) {
    return []
  }

  const userIds = orders.filter(o => o.user_id).map(o => o.user_id)
  const orderIds = orders.map(o => o.id)

  const [profileRes, itemsRes] = await Promise.all([
    userIds.length > 0
      ? supabaseAdmin.from('profiles').select('id, full_name').in('id', userIds)
      : { data: [], error: null },
    supabaseAdmin.from('order_items').select('order_id, product_name, quantity, unit_price').in('order_id', orderIds),
  ])

  if (profileRes.error) {
    throw createError({ statusCode: 500, statusMessage: `Profiles fetch failed: ${profileRes.error.message}` })
  }
  if (itemsRes.error) {
    throw createError({ statusCode: 500, statusMessage: `Order items fetch failed: ${itemsRes.error.message}` })
  }

  const profileMap: Record<string, string> = {}
  for (const p of profileRes.data || []) profileMap[p.id] = p.full_name

  const itemsMap: Record<string, { product_name: string; quantity: number }[]> = {}
  for (const item of itemsRes.data || []) {
    if (!itemsMap[item.order_id]) itemsMap[item.order_id] = []
    itemsMap[item.order_id]!.push(item)
  }

  return orders.map((order) => {
    const orderItemList = itemsMap[order.id] || []
    const firstItem = orderItemList[0]
    const productLabel = firstItem
      ? `${firstItem.product_name}${orderItemList.length > 1 ? ` +${orderItemList.length - 1}` : ''}`
      : '—'

    return {
      id: order.id,
      order_number: order.order_number,
      customer_name: profileMap[order.user_id] || 'Guest',
      product: productLabel,
      total: Number(order.total).toFixed(2),
      status: order.status,
      placed_at: order.placed_at,
    }
  })
})
