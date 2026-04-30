<template>
  <aside
    class="fixed left-0 top-0 z-50 h-screen transition-all duration-300 bg-white/80 backdrop-blur-xl border-r border-border"
    :class="[
      sidebarOpen
        ? 'translate-x-0 w-72'
        : '-translate-x-full lg:translate-x-0 lg:w-20',
    ]"
  >
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-between p-6">
        <NuxtLink to="/" class="flex flex-col group" v-if="sidebarOpen">
          <span
            class="font-display text-lg font-black tracking-tight text-accent"
            >BARISTA BENCH</span
          >
          <span class="text-text-3 text-[10px] mt-1 font-medium tracking-tight"
            >Management Portal</span
          >
        </NuxtLink>
        <div v-else class="mx-auto font-display text-xl font-bold text-accent">
          B
        </div>
        <button
          @click="$emit('toggle')"
          class="hidden lg:block text-text-3 hover:text-text transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <div class="mt-4 flex flex-col gap-1 px-3 flex-1">
        <div
          v-if="sidebarOpen"
          class="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-text-3"
        >
          Menu
        </div>

        <NuxtLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="group flex items-center gap-3 px-4 py-3 text-text-2 transition-all hover:bg-surface-2 relative"
          :class="{
            'bg-accent/5 text-accent border-l-4 border-accent font-semibold':
              isPathActive(item.path),
          }"
        >
          <div class="w-5 h-5" v-html="item.icon"></div>
          <span v-if="sidebarOpen" class="font-medium text-sm">{{
            item.name
          }}</span>
          <div
            v-if="!sidebarOpen"
            class="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs font-medium rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none"
          >
            {{ item.name }}
          </div>
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-1 px-3 py-4 border-t border-border">
        <button
          class="group flex items-center gap-3 rounded-xl px-4 py-3 text-accent font-semibold hover:bg-accent/5 transition-all relative"
        >
          <div class="w-5 h-5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <span v-if="sidebarOpen" class="font-medium text-sm"
            >Get Support</span
          >
          <div
            v-if="!sidebarOpen"
            class="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs font-medium rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none"
          >
            Get Support
          </div>
        </button>

        <button
          @click="$emit('logout')"
          class="group flex items-center gap-3 w-full rounded-xl px-4 py-3 text-text-2 transition-all hover:bg-surface-2 relative"
        >
          <div class="w-5 h-5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
          <span v-if="sidebarOpen" class="font-medium text-sm">Logout</span>
          <div
            v-if="!sidebarOpen"
            class="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs font-medium rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none"
          >
            Logout
          </div>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  sidebarOpen: Boolean,
});

defineEmits(["toggle", "logout"]);

const route = useRoute();

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>',
  },
  {
    name: "Orders",
    path: "/admin/orders",
    badge: "12",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>',
  },
  {
    name: "Products",
    path: "/admin/products",
    badge: "08",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>',
  },
  {
    name: "Customers",
    path: "/admin/users",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>',
  },
  {
    name: "Analytics",
    path: "/admin",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>',
  },
];

const isPathActive = (path) => {
  if (path === "/admin") return route.path === "/admin";
  return route.path.startsWith(path);
};
</script>
