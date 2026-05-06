export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(config.public.supabaseUrl as string, config.supabaseSecretKey as string)

  const { data: users } = await supabase.from('profiles').select('id, full_name').limit(5)

  const testOrders = [
    {
      order_number: 'BB-84729103',
      user_id: users?.[0]?.id || null,
      status: 'placed',
      shipping_info: { name: 'Sarah Chen', address: '123 Oak St', city: 'Brooklyn', postal: '11201' },
      billing_info: { name: 'Sarah Chen', address: '123 Oak St', city: 'Brooklyn', postal: '11201' },
      subtotal: 189.99,
      shipping_cost: 8.50,
      tax: 15.20,
      discount: 0,
      total: 213.69,
      placed_at: new Date(Date.now() - 2 * 3600000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_number: 'BB-73618294',
      user_id: users?.[1]?.id || null,
      status: 'processed',
      shipping_info: { name: 'Marcus Rivera', address: '456 Elm Ave', city: 'Manhattan', postal: '10001' },
      billing_info: { name: 'Marcus Rivera', address: '456 Elm Ave', city: 'Manhattan', postal: '10001' },
      subtotal: 345.00,
      shipping_cost: 12.00,
      tax: 27.60,
      discount: 25.00,
      total: 359.60,
      placed_at: new Date(Date.now() - 24 * 3600000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_number: 'BB-62507385',
      user_id: users?.[2]?.id || null,
      status: 'in_transit',
      shipping_info: { name: 'Emily Watson', address: '789 Pine Rd', city: 'Queens', postal: '11354' },
      billing_info: { name: 'Emily Watson', address: '789 Pine Rd', city: 'Queens', postal: '11354' },
      subtotal: 79.99,
      shipping_cost: 5.00,
      tax: 6.40,
      discount: 0,
      total: 91.39,
      carrier: 'USPS',
      tracking_number: '9400123456789012345678',
      placed_at: new Date(Date.now() - 48 * 3600000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_number: 'BB-51496476',
      user_id: users?.[3]?.id || null,
      status: 'delivered',
      shipping_info: { name: 'James Park', address: '321 Maple Dr', city: 'Bronx', postal: '10451' },
      billing_info: { name: 'James Park', address: '321 Maple Dr', city: 'Bronx', postal: '10451' },
      subtotal: 520.00,
      shipping_cost: 15.00,
      tax: 41.60,
      discount: 50.00,
      total: 526.60,
      carrier: 'UPS',
      tracking_number: '1Z999AA10123456784',
      placed_at: new Date(Date.now() - 7 * 24 * 3600000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_number: 'BB-40385567',
      user_id: null,
      status: 'cancelled',
      shipping_info: { name: 'Guest', address: '999 Test St', city: 'Staten Island', postal: '10301' },
      billing_info: { name: 'Guest', address: '999 Test St', city: 'Staten Island', postal: '10301' },
      subtotal: 45.00,
      shipping_cost: 4.00,
      tax: 3.60,
      discount: 0,
      total: 52.60,
      placed_at: new Date(Date.now() - 3 * 24 * 3600000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  const { data, error } = await supabase.from('orders').insert(testOrders).select()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { success: true, count: data.length }
})
