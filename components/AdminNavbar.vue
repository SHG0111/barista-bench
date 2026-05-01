<template>
  <header
    class="sticky top-0 z-40 flex h-16 items-center justify-between bg-white/70 backdrop-blur-md px-6 sm:px-8 border-b border-border shadow-sm"
  >
    <div class="flex items-center gap-4 flex-1 min-w-0">
      <!-- Mobile Menu Toggle -->
      <button
        @click="$emit('toggle-sidebar')"
        class="lg:hidden p-2 -ml-2 text-text-2 hover:bg-surface-2 rounded-lg transition-colors"
      >
        <Icon name="solar:hamburger-menu-broken" class="w-6 h-6" />
      </button>

      <h1 class="text-xl font-bold text-text font-display">
        {{ pageTitle }}
      </h1>
      <p class="text-[10px] text-text-2 mt-0.5 hidden sm:block">
        Welcome back, {{ profile?.full_name?.split(" ")[0] || "Admin" }}
      </p>
    </div>

    <div class="flex items-center gap-4 sm:gap-6">
      <button
        class="relative text-text-2 hover:bg-surface-2 rounded-lg p-2 transition-colors"
      >
        <Icon name="solar:bell-broken" class="w-5 h-5 sm:w-6 sm:h-6" />
        <span
          class="absolute top-2.5 right-2.5 block h-1.5 w-1.5 rounded-full bg-red border border-white"
        ></span>
      </button>

      <div
        class="flex items-center gap-3 pl-4 sm:pl-6 border-l border-border"
      >
        <div class="flex flex-col items-end gap-0.5 sm:flex">
          <span class="text-xs font-semibold text-text leading-none">{{
            profile?.full_name || "Admin User"
          }}</span>
          <span class="text-[10px] font-medium text-text-2"
            >Administrator</span
          >
        </div>
        <div
          class="h-9 w-9 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent/20 flex-shrink-0"
        >
          {{ userInitial }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  pageTitle: {
    type: String,
    required: true
  },
  profile: {
    type: Object,
    default: null
  }
})

defineEmits(['toggle-sidebar'])

const userInitial = computed(() => props.profile?.full_name?.charAt(0) || "A")
</script>