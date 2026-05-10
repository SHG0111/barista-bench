<template>
  <div class="space-y-6 lg:space-y-8 font-body">
    <!-- Operational Overview Header -->
    <div
      class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2"
    >
      <div>
        <h2
          class="text-xl lg:text-3xl font-bold text-text font-display tracking-tight"
        >
          Operational Overview
        </h2>
        <p class="text-sm text-text-2 mt-1">
          Real-time performance metrics for your coffee empire.
        </p>
      </div>
      <div
        class="flex p-1 bg-white border border-border rounded-xl shadow-sm self-start md:self-end"
      >
        <button
          type="button"
          :class="[
            'px-5 py-2 rounded-lg text-sm font-semibold transition-all',
            activeTab === 'last30'
              ? 'bg-accent/10 text-accent'
              : 'text-text-2 hover:text-text',
          ]"
          @click="activeTab = 'last30'"
        >
          Last 30 Days
        </button>
        <button
          type="button"
          :class="[
            'px-5 py-2 rounded-lg text-sm font-semibold transition-all',
            activeTab === 'ytd'
              ? 'bg-accent/10 text-accent'
              : 'text-text-2 hover:text-text',
          ]"
          @click="activeTab = 'ytd'"
        >
          Year to Date
        </button>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <div
        v-for="metric in metrics"
        :key="metric.label"
        class="glass-card rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-text-3/10 transition-all group"
      >
        <!-- Icon and Trend -->
        <div class="flex items-start justify-between mb-4">
          <div
            :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center transition-colors group-hover:bg-opacity-100 group-hover:text-white',
              metric.iconBg,
            ]"
          >
            {{ metric.icon }}
          </div>
          <span
            v-if="metric.trend"
            :class="[
              'flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full',
              metric.trendClass,
            ]"
          >
            {{ metric.trend }}
          </span>
        </div>
        <!-- Label and Value -->
        <p
          class="text-text-2 text-[11px] font-bold uppercase tracking-widest mb-1"
        >
          {{ metric.label }}
        </p>
        <p class="text-2xl font-extrabold text-text font-display">
          {{ metric.value }}
        </p>
      </div>
    </div>

    <!-- Revenue Trends and Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue Trends Chart -->
      <div class="lg:col-span-2 glass-card rounded-2xl p-6 lg:p-8 shadow-sm">
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h4 class="font-display text-xl font-bold text-text">
              Revenue Trends
            </h4>
            <p class="text-xs text-text-2 mt-1">
              Monthly performance analytics
            </p>
          </div>
          <div class="flex gap-5">
            <div class="flex items-center gap-2">
              <span
                class="w-2.5 h-2.5 rounded-full bg-accent shadow-sm shadow-accent/20"
              ></span>
              <span
                class="text-[11px] font-bold text-text-2 uppercase tracking-tight"
                >In-Store</span
              >
            </div>
            <div class="flex items-center gap-2">
              <span
                class="w-2.5 h-2.5 rounded-full bg-surface-3 shadow-sm shadow-text-3/20"
              ></span>
              <span
                class="text-[11px] font-bold text-text-2 uppercase tracking-tight"
                >Subscription</span
              >
            </div>
          </div>
        </div>

        <!-- Chart -->
        <div class="h-64 w-full flex items-end gap-3 md:gap-6 px-2">
          <div
            v-for="(bar, idx) in activeChartData"
            :key="idx"
            class="flex-1 group relative flex flex-col justify-end gap-1.5 h-full"
          >
            <div
              class="w-full bg-surface-2 rounded-full transition-all group-hover:bg-surface-3"
              :style="{ height: bar.height + 15 + '%' }"
            ></div>
            <div
              class="w-full bg-gradient-to-t from-accent to-brand rounded-full shadow-lg shadow-accent/10 transition-all group-hover:scale-105"
              :style="{ height: bar.height + '%' }"
            ></div>
            <div
              class="absolute -top-10 left-1/2 -translate-x-1/2 bg-text text-white text-[10px] font-bold py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {{ bar.month }}
            </div>
          </div>
        </div>
        <div
          class="flex justify-between mt-6 text-[10px] font-bold text-text-3 uppercase tracking-widest px-2"
        >
          <span v-for="bar in activeChartData" :key="bar.month">{{
            bar.month
          }}</span>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="glass-card rounded-2xl flex flex-col shadow-sm">
        <div class="p-8 border-b border-surface-2 flex items-center justify-between">
          <div>
            <h4 class="font-display text-xl font-bold text-text">
              Recent Activity
            </h4>
            <p class="text-xs text-text-2 mt-1">Real-time updates</p>
          </div>
          <div v-if="notifications.length > 0" class="flex items-center gap-1.5 bg-accent/10 text-accent px-2.5 py-1 rounded-full text-[10px] font-bold">
            <Icon name="solar:bell-broken" class="w-3.5 h-3.5" />
            {{ notifications.length }}
          </div>
        </div>

        <div v-if="notifPending" class="flex-1 p-8 flex items-center justify-center">
          <div class="flex flex-col items-center gap-3">
            <svg class="animate-spin w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-xs text-text-3 font-medium">Loading activity...</p>
          </div>
        </div>

        <div v-else-if="notifications.length === 0" class="flex-1 p-8 flex items-center justify-center">
          <div class="flex flex-col items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center">
              <Icon name="solar:bell-off-broken" class="w-6 h-6 text-text-3" />
            </div>
            <p class="text-sm font-semibold text-text-2">No recent activity</p>
            <p class="text-xs text-text-3 text-center max-w-[200px]">Activity notifications will appear here as events occur.</p>
          </div>
        </div>

        <div v-else class="flex-1 divide-y divide-surface-2 overflow-y-auto max-h-[380px] custom-scroll">
          <NuxtLink
            v-for="n in displayedNotifications"
            :key="n.id"
            :to="n.link || '#'"
            class="flex gap-4 p-5 hover:bg-accent/5 transition-all group"
          >
            <div
              :class="[
                'w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center',
                iconBgMap[n.type] || 'bg-surface-2 text-text-3',
              ]"
            >
              <Icon :name="n.icon || 'solar:info-circle-broken'" class="w-5 h-5" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-text font-display group-hover:text-accent transition-colors">
                {{ n.title }}
              </p>
              <p class="text-xs text-text-2 mt-0.5 line-clamp-2">
                {{ n.description }}
              </p>
              <p class="text-[10px] text-text-3 mt-1.5 font-mono">
                {{ timeAgo(n.created_at) }}
              </p>
            </div>
          </NuxtLink>
        </div>

        <NuxtLink
          to="/admin/notifications"
          class="p-5 bg-surface-2/50 text-center block hover:bg-surface-2 transition-all"
        >
          <span class="text-[11px] font-bold uppercase tracking-widest text-accent hover:text-accent-hover transition">
            VIEW ALL NOTIFICATIONS
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- Recent Orders Table -->
    <AdminTable
      :headers="orderHeaders"
      :items="recentOrders"
      :loading="pending"
    >
      <template #controls>
        <div>
          <h4 class="font-display text-xl font-bold text-text">
            Recent Orders
          </h4>
          <p class="text-xs text-text-2 mt-1">
            Manage and track your latest transactions
          </p>
        </div>
        <button
          class="text-xs font-bold text-text-2 border border-border rounded-xl px-5 py-2.5 hover:bg-surface-2 transition-all flex items-center gap-2"
        >
          <Icon name="solar:file-bold-broken" class="w-4 h-4" />
          Export CSV
        </button>
      </template>

      <template #default="{ items }">
        <tr
          v-for="order in items"
          :key="order.id"
          class="group hover:bg-accent/5 transition-all"
        >
          <td class="px-8 py-5">
            <span class="font-mono text-xs font-bold text-accent">{{ order.order_number }}</span>
          </td>
          <td class="px-8 py-5">
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold bg-accent/10 text-accent"
              >
                {{ (order.customer_name || 'G').charAt(0) }}
              </div>
              <span class="text-sm font-semibold text-text">{{
                order.customer_name
              }}</span>
            </div>
          </td>
          <td class="px-8 py-5 text-sm text-text-2 font-medium">
            {{ order.product }}
          </td>
          <td class="px-8 py-5 text-sm font-extrabold text-text">
            ${{ order.total }}
          </td>
          <td class="px-8 py-5">
            <span
              :class="[
                'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight',
                statusClassMap[order.status] || 'bg-surface-2 text-text-3',
              ]"
            >
              {{ order.status.replace(/_/g, ' ') }}
            </span>
          </td>
          <td class="px-8 py-5 text-right">
            <NuxtLink
              :to="`/order/${order.id}`"
              class="text-text-3 hover:text-accent transition-colors inline-flex p-1"
              title="View details"
            >
              <Icon name="solar:eye-broken" class="w-4 h-4" />
            </NuxtLink>
          </td>
        </tr>
      </template>
    </AdminTable>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const activeTab = ref("last30");
const chartType = ref<"instore" | "subscription">("instore");

const metrics = ref([
  {
    label: "Total Sales",
    value: "$42,890",
    trend: "+12%",
    icon: "💰",
    iconBg: "bg-green/10 text-green",
    trendClass: "text-green bg-green/10",
  },
  {
    label: "Active Baristas",
    value: "156",
    trend: "+8 new",
    icon: "☕",
    iconBg: "bg-surface-3/10 text-text",
    trendClass: "text-text-2 bg-surface-2",
  },
  {
    label: "Pending Approvals",
    value: "24",
    trend: "URGENT",
    icon: "📋",
    iconBg: "bg-red/10 text-red",
    trendClass: "text-red bg-red/10 uppercase",
  },
  {
    label: "Monthly Revenue",
    value: "$12,405",
    trend: "+8.4%",
    icon: "💵",
    iconBg: "bg-brand/10 text-brand",
    trendClass: "text-brand bg-brand/10",
  },
]);

const revenueStats = {
  instore: [
    { month: "JAN", height: 35 },
    { month: "FEB", height: 50 },
    { month: "MAR", height: 70 },
    { month: "APR", height: 45 },
    { month: "MAY", height: 65 },
    { month: "JUN", height: 80 },
    { month: "JUL", height: 62 },
  ],
  subscription: [
    { month: "JAN", height: 20 },
    { month: "FEB", height: 25 },
    { month: "MAR", height: 30 },
    { month: "APR", height: 40 },
    { month: "MAY", height: 55 },
    { month: "JUN", height: 70 },
    { month: "JUL", height: 85 },
  ],
};

const activeChartData = computed(() => {
  return revenueStats[chartType.value] || revenueStats.instore;
});

const { data: notifData, pending: notifPending, refresh: refreshNotifs } = await useFetch('/api/admin/notifications', {
  transform: (data: any) => data || [],
})

let notifInterval: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  notifInterval = setInterval(() => refreshNotifs(), 30000)
})
onUnmounted(() => {
  if (notifInterval) clearInterval(notifInterval)
})

const notifications = computed(() => notifData.value || [])

const displayedNotifications = computed(() => notifications.value.slice(0, 15))

const iconBgMap: Record<string, string> = {
  order: 'bg-accent/10 text-accent',
  user: 'bg-blue-50 text-blue-700',
  payment: 'bg-emerald-50 text-emerald-700',
  alert: 'bg-red-50 text-red-600',
  return: 'bg-orange-50 text-orange-700',
  review: 'bg-violet-50 text-violet-700',
}

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const orderHeaders = [
  { key: 'order', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'product', label: 'Product' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions', align: 'right' },
]

const { data: orders, pending, error: ordersErr } = await useFetch('/api/admin/recent-orders', {
  transform: (data: any) => data || [],
})

const recentOrders = computed(() => orders.value || [])

const statusClassMap: Record<string, string> = {
  placed: 'bg-slate-100 text-slate-600',
  processed: 'bg-blue-100 text-blue-700',
  in_transit: 'bg-amber-100 text-amber-700',
  out_for_delivery: 'bg-violet-100 text-violet-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
  returned: 'bg-orange-100 text-orange-700',
}
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(226, 232, 240, 1);
}

.custom-scroll::-webkit-scrollbar {
  width: 4px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.5);
}
</style>
