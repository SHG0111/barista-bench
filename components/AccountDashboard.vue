<template>
  <div class="space-y-6">
    <div class="flex items-center gap-5 p-6 bg-surface rounded-lg shadow-sm border border-border/50">
      <img
        v-if="avatarSrc && user"
        :src="avatarSrc"
        class="w-16 h-16 rounded-full object-cover shrink-0"
        referrerpolicy="no-referrer"
      />
      <div v-else class="w-16 h-16 rounded-full bg-accent-light text-accent text-2xl font-bold flex items-center justify-center shrink-0">
        {{ userInitial }}
      </div>
      <div class="flex-1">
        <h2 class="text-[22px] font-semibold mb-1">Welcome back, {{ firstName }}</h2>
        <p class="text-[13px] text-text-2">{{ user?.email }} • Member since {{ memberSince }}</p>
      </div>
      <button class="btn btn-outline btn-sm" @click="$emit('editProfile')">EDIT PROFILE</button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-surface rounded-lg p-5 shadow-sm border border-border/50">
        <div class="text-[10.5px] font-bold tracking-widest uppercase text-text-3 mb-2 font-body">TOTAL ORDERS</div>
        <div class="text-[32px] font-bold font-display mb-1">{{ orders.length }}</div>
        <div class="text-[12px] text-green font-medium">+{{ ordersThisMonth }} this month</div>
      </div>
      <div class="bg-surface rounded-lg p-5 shadow-sm border border-border/50">
        <div class="text-[10.5px] font-bold tracking-widest uppercase text-text-3 mb-2 font-body">SAVED ITEMS</div>
        <div class="text-[32px] font-bold font-display mb-1">{{ savedTools.length }}</div>
        <div class="text-[12px] text-text-2">Precision collection</div>
      </div>
      <div class="bg-surface rounded-lg p-5 shadow-sm border border-border/50">
        <div class="text-[10.5px] font-bold tracking-widest uppercase text-text-3 mb-2 font-body">ACADEMY RANK</div>
        <div class="text-[26px] font-bold font-display mb-1">{{ profile?.academy_rank || "Pro" }}</div>
        <div class="text-[12px] text-accent font-medium">{{ profile?.courses_completed || 4 }} courses completed</div>
      </div>
    </div>

    <div class="bg-surface rounded-lg p-6 shadow-sm border border-border/50 relative min-h-[180px]">
      <div v-if="ordersLoading" class="absolute inset-0 flex items-center justify-center bg-white/70 z-10 rounded-lg">
        <div class="w-6 h-6 border-2 border-border border-t-accent rounded-full animate-spin"></div>
      </div>
      <template v-else>
        <div class="flex justify-between items-center mb-5">
          <h3 class="text-[11px] font-bold tracking-[0.12em] uppercase text-text-2 font-body">RECENT ORDERS</h3>
          <button class="btn btn-ghost btn-sm" @click="$emit('viewOrders')">VIEW ALL</button>
        </div>
        <div class="hidden sm:grid grid-cols-[1fr_120px_140px_100px_40px] items-center gap-4 mb-3 px-0 text-[11px] font-bold tracking-widest uppercase text-text-3">
          <span>Order #</span><span>Date</span><span>Status</span><span>Total</span><span></span>
        </div>
        <div class="space-y-1">
          <div
            v-for="o in orders.slice(0, 3)"
            :key="o.id"
            class="grid grid-cols-1 sm:grid-cols-[1fr_120px_140px_100px_40px] items-center gap-4 py-3.5 border-b border-border last:border-0"
          >
            <span class="font-mono text-[13px] font-medium text-text">{{ o.order_number }}</span>
            <span class="text-[13px] text-text-2">{{ formatDate(o.placed_at) }}</span>
            <div>
              <span class="badge" :class="statusBadge(o.status)">{{ o.status }}</span>
            </div>
            <span class="text-[14px] font-bold text-text">{{ formatPrice(o.total) }}</span>
            <NuxtLink :to="`/order/${o.order_number}`" class="btn btn-ghost btn-sm px-2"><IconEye /></NuxtLink>
          </div>
        </div>
        <div v-if="orders.length === 0" class="text-center py-10 text-text-2">
          No orders yet. <NuxtLink to="/shop" class="text-accent underline">Start shopping →</NuxtLink>
        </div>
      </template>
    </div>

    <div class="bg-surface rounded-lg p-6 shadow-sm border border-border/50" v-if="savedTools.length">
      <div class="flex justify-between items-center mb-5">
        <h3 class="text-[11px] font-bold tracking-[0.12em] uppercase text-text-2 font-body">SAVED TOOLS</h3>
        <button class="btn btn-ghost btn-sm" @click="$emit('viewSaved')">VIEW ALL</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="item in savedTools.slice(0, 2)"
          :key="item.id"
          class="flex items-center gap-3.5 p-4 border border-border rounded-lg bg-surface"
        >
          <div class="w-[52px] h-[52px] rounded-lg bg-surface-2 shrink-0 overflow-hidden flex items-center justify-center">
            <NuxtImg
              v-if="item.products?.images?.length"
              :src="(item.products.images[0] as string)"
              :alt="item.products?.name"
              class="w-full h-full object-cover"
              format="webp"
              loading="lazy"
            />
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-[13.5px] font-semibold text-text truncate mb-0.5">{{ item.products?.name }}</div>
            <div class="text-[12px] text-accent font-bold mb-2">{{ formatPrice(item.products?.price || 0) }}</div>
            <button class="btn btn-accent btn-sm" @click="$emit('addSavedToCart', item)">ADD TO CART</button>
          </div>
          <button class="p-1 rounded text-text-3 hover:text-red hover:bg-red-bg transition-all duration-150" @click="$emit('removeSaved', item)">
            <IconTrash />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Orders, Saved_tools, Products } from '~/types/database.types'

const { formatPrice } = useCurrency()

const props = defineProps({
  profile: { type: Object, default: null },
  orders: { 
    type: Array as PropType<Orders[]>, 
    default: () => [] 
  },
  ordersLoading: { type: Boolean, default: false },
  savedTools: { 
    type: Array as PropType<(Saved_tools & { products?: Products })[]>, 
    default: () => [] 
  },
  user: { type: Object, default: null },
  firstName: { type: String, default: '' },
  userInitial: { type: String, default: 'U' },
  memberSince: { type: String, default: '' },
})

defineEmits<{
  editProfile: []
  viewOrders: []
  viewSaved: []
  addSavedToCart: [item: any]
  removeSaved: [item: any]
}>()

const ordersThisMonth = computed(() => {
  const now = new Date()
  return (props.orders as any[]).filter(o => {
    const d = new Date(o.placed_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length
})

const avatarSrc = computed(() => {
  return props.profile?.avatar_url
    || props.user?.user_metadata?.avatar_url
    || props.user?.user_metadata?.picture
    || props.user?.user_metadata?.avatar
    || null
})

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
