<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold">My Orders</h2>
      <AdminTable 
        :headers="orderHeaders"
        :items="orders"
        :loading="ordersLoading"
      >
        <template #default="{ items }">
          <tr v-for="o in items" :key="o.id" class="border-b border-border last:border-0 hover:bg-surface-2/50 transition-colors">
            <td class="px-6 py-4"><span class="font-mono text-[13px] font-medium text-text">{{ o.order_number }}</span></td>
            <td class="px-6 py-4"><span class="text-[13px] text-text-2">{{ formatDate(o.placed_at) }}</span></td>
            <td class="px-6 py-4"><span class="badge" :class="statusBadge(o.status)">{{ o.status }}</span></td>
            <td class="px-6 py-4 text-right"><span class="text-[14px] font-bold text-text">{{ formatPrice(o.total) }}</span></td>
            <td class="px-6 py-4 text-right"><NuxtLink :to="`/order/${o.order_number}`" class="btn btn-ghost btn-sm px-2"><IconEye /></NuxtLink></td>
          </tr>
        </template>
        <template #empty>
          <div class="text-center py-10 text-text-2">No orders yet.</div>
        </template>
      </AdminTable>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Orders } from '~/types/database.types'

const { formatPrice } = useCurrency()

defineProps({
  orders: { 
    type: Array as PropType<Orders[]>, 
    default: () => [] 
  },
  ordersLoading: { type: Boolean, default: false },
})

const orderHeaders = [
  { key: 'order_number', label: 'Order #' },
  { key: 'placed_at', label: 'Date' },
  { key: 'status', label: 'Status' },
  { key: 'total', label: 'Total', align: 'right' },
  { key: 'actions', label: '', align: 'right' },
]

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  })
}

function statusBadge(s: string) {
  if (s === "delivered" || s === "processed") return "badge-green"
  if (s === "in_transit" || s === "placed") return "badge-amber"
  return "badge-gray"
}
</script>
