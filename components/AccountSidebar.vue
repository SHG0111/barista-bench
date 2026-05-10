<template>
  <aside class="bg-surface rounded-lg p-2 sticky top-[calc(56px+24px)]">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="flex items-center gap-2.5 px-3.5 py-2.5 rounded cursor-pointer text-[13.5px] font-medium transition-all duration-180"
      :class="activeTab === tab.id ? 'bg-text text-white' : 'text-text-2 hover:bg-surface-2 hover:text-text'"
      @click="$emit('update:activeTab', tab.id)"
    >
      <Icon :name="tab.icon" width="16" height="16" />
      {{ tab.label }}
    </div>

    <div class="h-px bg-border my-1.5 mx-2"></div>

    <div class="p-3.5 bg-surface-2 rounded mx-2 my-1.5">
      <div class="flex items-center gap-2 mb-2.5">
        <span class="text-sm">🏆</span>
        <span class="text-[10px] font-bold tracking-widest uppercase text-accent">BARISTA STATUS</span>
      </div>
      <div class="text-sm font-bold mb-0.5">{{ profile?.barista_tier || "Expert Home Barista" }}</div>
      <div class="text-[11.5px] text-text-2 mb-2">Top 5% of the community</div>
      <div class="h-1 bg-surface-3 rounded-full overflow-hidden mb-2.5">
        <div class="h-full bg-gradient-to-r from-accent to-accent/10 rounded-full transition-all duration-500" style="width: 72%"></div>
      </div>
      <div class="text-[11px] text-text-3">150 points until Master tier</div>
    </div>

    <div class="h-px bg-border my-1.5 mx-2"></div>

    <div class="flex items-center gap-2.5 px-3.5 py-2.5 rounded cursor-pointer text-[13.5px] font-medium transition-all duration-180 text-red hover:bg-red-bg" @click="$emit('signOut')">
      <Icon name="solar:logout-2-broken" width="16" height="16" />
      Log Out
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps({
  activeTab: { type: String, required: true },
  profile: { type: Object, default: null },
})

defineEmits<{
  'update:activeTab': [tab: string]
  signOut: []
}>()

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: 'solar:widget-4-broken' },
  { id: 'orders', label: 'My Orders', icon: 'solar:bag-3-broken' },
  { id: 'saved', label: 'Saved Tools', icon: 'solar:heart-broken' },
  { id: 'settings', label: 'Profile Settings', icon: 'solar:settings-broken' },
]
</script>
