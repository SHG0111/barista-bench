<template>
  <div class="space-y-6">
    <!-- Stats Cards Row -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{{ stat.label }}</span>
          <button class="text-[10px] font-bold text-brand hover:underline">View More</button>
        </div>
        <p class="text-2xl font-bold text-slate-900">{{ stat.value }}</p>
        <p class="text-[10px] text-slate-500 mt-1">{{ stat.sublabel }}</p>
      </div>
    </div>

    <!-- Header Actions -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="relative flex-1 max-w-md group">
        <Icon name="solar:magnifer-broken" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" />
        <input type="text" v-model="searchQuery" placeholder="Search orders..." class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all" />
      </div>
      
      <!-- Status Filter -->
      <div class="flex gap-2">
        <button
          v-for="status in statuses"
          :key="status.value"
          @click="filterStatus = status.value"
          :class="[
            'px-4 py-2 rounded-lg text-xs font-semibold transition-all',
            filterStatus === status.value 
              ? 'bg-brand text-white' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-brand hover:text-brand'
          ]"
        >
          {{ status.label }}
        </button>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50">
              <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Order ID</th>
              <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Customer</th>
              <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
              <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Amount</th>
              <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="filteredOrders.length === 0">
              <td colspan="6" class="px-6 py-16 text-center">
                <div class="flex flex-col items-center gap-3">
                  <div class="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center">
                    <Icon name="solar:cart-broken" class="w-8 h-8 text-slate-300" />
                  </div>
                  <p class="text-sm font-semibold text-slate-900">No orders found</p>
                  <p class="text-xs text-slate-500 max-w-xs">
                    {{ searchQuery || filterStatus !== 'all' ? 'Try adjusting your search or filter to find what you\'re looking for.' : 'Orders will appear here once customers start purchasing.' }}
                  </p>
                </div>
              </td>
            </tr>
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-6 py-4">
                <span class="font-mono text-xs font-bold text-brand">{{ order.order_number }}</span>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm font-bold text-slate-900">{{ order.customer_name || 'Guest' }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="text-xs text-slate-500">{{ formatDate(order.placed_at) }}</p>
              </td>
              <td class="px-6 py-4 text-sm font-bold text-slate-900">${{ order.total }}</td>
              <td class="px-6 py-4">
                <span :class="['px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider', statusClasses[order.status]]">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <NuxtLink :to="`/order/${order.id}`" class="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all inline-flex" title="View Details">
                  <Icon name="solar:eye-broken" class="w-4 h-4" />
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
        <p class="text-xs text-slate-500">Showing {{ filteredOrders.length }} of {{ allOrders.length }} orders</p>
        <div class="flex gap-2">
          <button class="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-brand hover:text-brand transition-all">
            Previous
          </button>
          <button class="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-brand hover:text-brand transition-all">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const client = useSupabaseClient()
const searchQuery = ref('')
const filterStatus = ref('all')

const statuses = [
  { value: 'all', label: 'All' },
  { value: 'placed', label: 'Placed' },
  { value: 'processed', label: 'Processed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
]

const { data: orders } = await useAsyncData('admin-orders-list', async () => {
  const { data } = await client.from('orders').select('*').order('placed_at', { ascending: false })
  return data
})

const allOrders = computed(() => orders.value || [])

const filteredOrders = computed(() => {
  let result = allOrders.value
  
  if (filterStatus.value !== 'all') {
    result = result.filter(o => o.status === filterStatus.value)
  }
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(o => 
      o.order_number?.toLowerCase().includes(q) ||
      o.customer_name?.toLowerCase().includes(q)
    )
  }
  
  return result
})

const stats = computed(() => {
  const orderData = allOrders.value
  const totalRevenue = orderData.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0)
  const pendingOrders = orderData.filter(o => o.status === 'placed').length
  
  return [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, sublabel: 'All time' },
    { label: 'Orders', value: orderData.length || '0', sublabel: 'This month' },
    { label: 'Pending', value: pendingOrders, sublabel: 'Needs attention' },
    { label: 'Customers', value: '—', sublabel: 'Unique buyers' }
  ]
})

const statusClasses = {
  delivered: 'bg-emerald-100 text-emerald-700',
  processed: 'bg-blue-100 text-blue-700',
  in_transit: 'bg-amber-100 text-amber-700',
  placed: 'bg-slate-100 text-slate-600',
  cancelled: 'bg-red-100 text-red-700'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}
</script>