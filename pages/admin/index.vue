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
        <div class="p-8 border-b border-surface-2">
          <h4 class="font-display text-xl font-bold text-text">
            Recent Activity
          </h4>
          <p class="text-xs text-text-2 mt-1">Real-time updates</p>
        </div>

        <div class="flex-1 p-6 space-y-6">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex gap-4"
          >
            <div
              :class="[
                'w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold',
                activity.color,
              ]"
            >
              {{ activity.icon }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-text font-display">
                {{ activity.title }}
              </p>
              <p class="text-xs text-text-2 mt-0.5">
                {{ activity.description }}
              </p>
              <p class="text-xs text-text-3 mt-1 font-mono italic">
                {{ activity.time }}
              </p>
            </div>
          </div>
        </div>

        <div class="p-6 bg-surface-2/50 text-center">
          <button
            class="text-[11px] font-bold uppercase tracking-widest text-accent hover:text-accent-hover transition"
          >
            VIEW ALL NOTIFICATIONS
          </button>
        </div>
      </div>
    </div>

    <!-- Recent Orders Table -->
    <div class="glass-card rounded-2xl overflow-hidden shadow-sm">
      <div
        class="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-2"
      >
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
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-border bg-surface-2">
            <tr>
              <th
                class="px-8 py-4 text-[10px] font-bold text-text-3 uppercase tracking-widest"
              >
                Order ID
              </th>
              <th
                class="px-8 py-4 text-[10px] font-bold text-text-3 uppercase tracking-widest"
              >
                Customer
              </th>
              <th
                class="px-8 py-4 text-[10px] font-bold text-text-3 uppercase tracking-widest"
              >
                Product
              </th>
              <th
                class="px-8 py-4 text-[10px] font-bold text-text-3 uppercase tracking-widest"
              >
                Amount
              </th>
              <th
                class="px-8 py-4 text-[10px] font-bold text-text-3 uppercase tracking-widest"
              >
                Status
              </th>
              <th
                class="px-8 py-4 text-[10px] font-bold text-text-3 uppercase tracking-widest text-right"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-2">
            <tr
              v-for="order in recentOrders"
              :key="order.id"
              class="group hover:bg-accent/5 transition-all"
            >
              <td class="px-8 py-5 text-sm font-bold text-text">
                {{ order.order_id }}
              </td>
              <td class="px-8 py-5">
                <div class="flex items-center gap-3">
                  <div
                    :class="[
                      'w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold',
                      order.avatarColor,
                    ]"
                  >
                    {{ order.customer.charAt(0) }}
                  </div>
                  <span class="text-sm font-semibold text-text">{{
                    order.customer
                  }}</span>
                </div>
              </td>
              <td class="px-8 py-5 text-sm text-text-2 font-medium">
                {{ order.product }}
              </td>
              <td class="px-8 py-5 text-sm font-extrabold text-text">
                ${{ order.amount }}
              </td>
              <td class="px-8 py-5">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight',
                    getStatusClass(order.status),
                  ]"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="px-8 py-5 text-right">
                <button
                  class="text-text-3 group-hover:text-accent transition-colors"
                >
                  ● ● ●
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const activeTab = ref("last30");
const chartType = ref("instore");

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

/**
 * Computes the chart data based on the selected chartType toggle.
 * This makes the dashboard feel interactive even with mock data.
 */
const activeChartData = computed(() => {
  return revenueStats[chartType.value] || revenueStats.instore;
});

const recentActivities = ref([
  {
    id: 1,
    icon: "📦",
    title: "New wholesale order",
    description: "Roast & Ground • $1,200.00",
    time: "2 mins ago",
    color: "bg-accent/10 text-accent",
  },
  {
    id: 2,
    icon: "👤",
    title: "Sarah Chen joined",
    description: "Location: Brooklyn Heights",
    time: "18 mins ago",
    color: "bg-surface-3/20 text-text-2",
  },
  {
    id: 3,
    icon: "✓",
    title: "Merchant verified",
    description: "Central Roast Co. is now active",
    time: "1 hour ago",
    color: "bg-surface-3/10 text-text",
  },
]);

const recentOrders = ref([
  {
    id: 1,
    order_id: "#ORD-9021",
    customer: "James Brews",
    product: "Signature Espresso (5kg)",
    amount: "245.00",
    status: "SHIPPED",
    avatarColor: "bg-accent/10 text-accent",
  },
  {
    id: 2,
    order_id: "#ORD-9022",
    customer: "Aroma Loft",
    product: "Cold Brew Kit x 12",
    amount: "512.40",
    status: "PENDING",
    avatarColor: "bg-surface-3/20 text-text-2",
  },
  {
    id: 3,
    order_id: "#ORD-9023",
    customer: "Grind Central",
    product: "Decaf Swiss Water (10kg)",
    amount: "430.00",
    status: "ALERT",
    avatarColor: "bg-red/10 text-red",
  },
]);

const getStatusClass = (status) => {
  const classes = {
    SHIPPED: "bg-accent/10 text-accent",
    PENDING: "bg-surface-2 text-text-3",
    ALERT: "bg-red/10 text-red",
  };
  return classes[status] || "bg-surface-2 text-text-2";
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(226, 232, 240, 1);
}
</style>
