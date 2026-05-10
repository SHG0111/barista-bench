<template>
  <div class="space-y-6 lg:space-y-8">
    <!-- Breadcrumb & Header -->
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div>
        <nav class="flex items-center gap-2 text-xs font-medium text-text-3 mb-2">
          <NuxtLink to="/admin" class="text-accent hover:text-accent-hover transition-colors">Home</NuxtLink>
          <Icon name="solar:arrow-right-broken" class="w-3 h-3 text-text-3" />
          <span class="text-accent">Notifications</span>
        </nav>
        <h2 class="text-3xl font-extrabold text-text tracking-tight">Notifications</h2>
        <p class="text-text-2 font-medium mt-1">Stay informed with the latest platform activity.</p>
      </div>
      <div class="flex gap-3">
        <button
          v-if="notifications.length > 0"
          @click="markAllRead"
          class="flex items-center gap-2 bg-white border border-border px-5 py-2.5 rounded-xl font-semibold text-sm text-text-2 hover:bg-surface-2 shadow-sm transition-all active:scale-95"
        >
          <Icon name="solar:check-read-broken" class="w-4 h-4" />
          Clear All
        </button>
      </div>
    </div>

    <!-- Filter tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-1">
      <button
        v-for="tab in filterTabs"
        :key="tab.value"
        @click="activeFilter = tab.value"
        :class="[
          'px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap',
          activeFilter === tab.value
            ? 'bg-accent text-white shadow-md shadow-accent/20'
            : 'bg-white text-text-2 border border-border hover:border-accent hover:text-accent',
        ]"
      >
        {{ tab.label }}
        <span v-if="tab.count !== undefined" class="ml-1.5 opacity-70">({{ tab.count }})</span>
      </button>
    </div>

    <!-- Notifications List -->
    <div v-if="pending" class="flex items-center justify-center py-24">
      <div class="flex flex-col items-center gap-4">
        <svg class="animate-spin w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-sm font-semibold text-text-2">Loading notifications...</p>
      </div>
    </div>

    <div v-else-if="filteredNotifications.length === 0" class="flex items-center justify-center py-24">
      <div class="flex flex-col items-center gap-4">
        <div class="w-20 h-20 rounded-3xl bg-surface-2 flex items-center justify-center">
          <Icon name="solar:bell-off-broken" class="w-10 h-10 text-text-3" />
        </div>
        <h3 class="text-lg font-bold text-text">All clear</h3>
        <p class="text-sm text-text-2 text-center max-w-xs">
          {{ activeFilter === 'all' ? 'No notifications yet. They will appear here when something happens.' : 'No notifications of this type.' }}
        </p>
      </div>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="(group, dateLabel) in groupedNotifications"
        :key="dateLabel"
        class="space-y-2"
      >
        <div class="flex items-center gap-3 px-1">
          <div class="h-px flex-1 bg-border/50"></div>
          <span class="text-[10px] font-bold uppercase tracking-widest text-text-3">{{ dateLabel }}</span>
          <div class="h-px flex-1 bg-border/50"></div>
        </div>

        <div class="bg-white border border-border rounded-2xl shadow-sm overflow-hidden divide-y divide-border/50">
          <div
            v-for="n in group"
            :key="n.id"
            class="flex items-start gap-4 p-5 hover:bg-surface-2/50 transition-all group"
          >
            <div
              :class="[
                'w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm ring-2 ring-white',
                iconBgMap[n.type] || 'bg-surface-2 text-text-3',
              ]"
            >
              <Icon :name="n.icon || 'solar:info-circle-broken'" class="w-5 h-5" />
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm font-bold text-text">{{ n.title }}</p>
                  <p v-if="n.description" class="text-xs text-text-2 mt-0.5 leading-relaxed max-w-2xl">
                    {{ n.description }}
                  </p>
                </div>
                <span class="text-[10px] text-text-3 font-mono whitespace-nowrap flex-shrink-0 mt-1">{{ timeAgo(n.created_at) }}</span>
              </div>

              <div class="flex items-center gap-3 mt-3">
                <span
                  :class="[
                    'inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider',
                    typeBadgeMap[n.type] || 'bg-surface-2 text-text-3',
                  ]"
                >
                  {{ n.type }}
                </span>
                <NuxtLink
                  v-if="n.link"
                  :to="n.link"
                  class="text-[11px] font-bold text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
                >
                  View details
                  <Icon name="solar:arrow-right-broken" class="w-3 h-3" />
                </NuxtLink>
                <button
                  @click="deleteNotification(n.id)"
                  class="ml-auto text-text-3 hover:text-red transition-colors opacity-0 group-hover:opacity-100"
                  title="Dismiss"
                >
                  <Icon name="solar:close-circle-broken" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin",
})

const activeFilter = ref('all')

const filterTabs = computed(() => {
  const all = notifications.value.length
  const counts: Record<string, number> = {}
  for (const n of notifications.value) {
    counts[n.type] = (counts[n.type] || 0) + 1
  }
  return [
    { value: 'all', label: 'All', count: all },
    ...Object.entries(counts).map(([type, count]) => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      count,
    })),
  ]
})

const { data: notifData, pending, refresh } = await useFetch('/api/admin/notifications', {
  transform: (data: any) => data || [],
})

let notifInterval: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  notifInterval = setInterval(() => refresh(), 30000)
})
onUnmounted(() => {
  if (notifInterval) clearInterval(notifInterval)
})

const notifications = computed(() => notifData.value || [])

const filteredNotifications = computed(() => {
  if (activeFilter.value === 'all') return notifications.value
  return notifications.value.filter((n: any) => n.type === activeFilter.value)
})

const groupedNotifications = computed(() => {
  const groups: Record<string, any[]> = {}
  const now = new Date()
  const today = now.toDateString()
  const yesterday = new Date(now.getTime() - 86400000).toDateString()

  for (const n of filteredNotifications.value) {
    const d = new Date(n.created_at)
    const dateStr = d.toDateString()
    let label: string
    if (dateStr === today) label = 'Today'
    else if (dateStr === yesterday) label = 'Yesterday'
    else if (now.getTime() - d.getTime() < 7 * 86400000) label = 'This Week'
    else label = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    if (!groups[label]) groups[label] = []
    groups[label]!.push(n)
  }
  return groups
})

const iconBgMap: Record<string, string> = {
  order: 'bg-accent/10 text-accent',
  user: 'bg-blue-50 text-blue-700',
  payment: 'bg-emerald-50 text-emerald-700',
  alert: 'bg-red-50 text-red-600',
  return: 'bg-orange-50 text-orange-700',
  review: 'bg-violet-50 text-violet-700',
}

const typeBadgeMap: Record<string, string> = {
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

async function deleteNotification(id: string) {
  try {
    await $fetch('/api/admin/notifications/read', {
      method: 'POST',
      body: { notification_id: id },
    })
    refresh()
  } catch (e) {
    console.error('Failed to dismiss notification:', e)
  }
}

async function markAllRead() {
  try {
    await $fetch('/api/admin/notifications/read-all', {
      method: 'POST',
    })
    refresh()
  } catch (e) {
    console.error('Failed to clear notifications:', e)
  }
}
</script>
