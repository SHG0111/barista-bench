<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[200] bg-bg/94 backdrop-blur-2xl border-b border-border"
  >
    <div
      class="h-nav-h flex items-center justify-between px-8 max-w-[1440px] mx-auto relative"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex items-center gap-[9px] no-underline text-text"
      >
        <div
          class="w-7 h-7 bg-text rounded-[5px] flex items-center justify-center"
        >
          <span class="text-white text-[9px] font-extrabold tracking-wider"
            >BB</span
          >
        </div>
        <span class="text-[12.5px] font-semibold tracking-[0.1em]"
          >BARISTA BENCH</span
        >
      </NuxtLink>

      <!-- Center links -->
      <div
        class="hidden lg:flex gap-6 absolute left-1/2 -translate-x-1/2 items-center"
      >
        <NuxtLink
          to="/shop"
          class="text-[13.5px] text-text-2 no-underline font-[450] hover:text-text transition-colors duration-default ease-default [&.router-link-active]:text-text"
          >Shop All</NuxtLink
        >
        <NuxtLink
          to="/shop?category=manual-grinders"
          class="text-[13.5px] text-text-2 no-underline font-[450] hover:text-text transition-colors duration-default ease-default [&.router-link-active]:text-text"
          >Grinders</NuxtLink
        >
        <NuxtLink
          to="/shop?category=portafilters"
          class="text-[13.5px] text-text-2 no-underline font-[450] hover:text-text transition-colors duration-default ease-default [&.router-link-active]:text-text"
          >Portafilters</NuxtLink
        >
        <NuxtLink
          to="/shop?category=distribution-tools"
          class="text-[13.5px] text-text-2 no-underline font-[450] hover:text-text transition-colors duration-default ease-default [&.router-link-active]:text-text"
          >Tools</NuxtLink
        >
        <NuxtLink
          to="/bundle"
          class="bg-text text-white px-[22px] py-[10px] rounded-[var(--radius)] font-body text-[12px] font-semibold tracking-wide hover:bg-[#333] transition-all duration-default ease-default"
          >Bundle Builder</NuxtLink
        >
      </div>

<!-- Right icons -->
      <div class="flex items-center gap-1">
        <button
          class="w-9 h-9 flex items-center justify-center rounded-lg text-text-2 hover:bg-surface-2 hover:text-text transition-all duration-default ease-default"
          @click="toggleSearch"
          aria-label="Search"
        >
          <IconSearch />
        </button>

        <!-- Admin Dashboard (only for admins) -->
        <NuxtLink
          v-if="isAdmin"
          to="/admin"
          class="w-auto h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-brand transition-all gap-2 px-2.5"
          title="Admin Dashboard"
        >
          <Icon name="solar:box-broken" width="20" height="20" />
          <span class="text-[13px] font-semibold text-text">Admin</span>
        </NuxtLink>

        <!-- Account (hidden for admin) -->
        <NuxtLink
          v-if="!isAdmin"
          to="/account"
          class="w-auto h-9 flex items-center justify-center rounded-lg text-text-2 hover:bg-surface-2 hover:text-text transition-all duration-default ease-default gap-2 px-2.5"
          aria-label="Account"
        >
          <img
            v-if="user && userAvatar"
            :src="userAvatar"
            class="w-6 h-6 rounded-full object-cover border-[1.5px] border-border"
            referrerpolicy="no-referrer"
          />
          <IconUser v-else />
          <span
            v-if="user && userFirstName"
            class="text-[13px] font-semibold text-text max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap"
            >{{ userFirstName }}</span>
        </NuxtLink>

        <!-- Cart Link (Hidden for Admin) -->
        <NuxtLink
          v-if="!isAdmin"
          to="/cart"
          class="w-9 h-9 flex items-center justify-center rounded-lg text-text-2 hover:bg-surface-2 hover:text-text transition-all duration-default ease-default relative"
          aria-label="Cart"
        >
          <IconCart />
          <span
            v-if="cartCount > 0"
            class="absolute top-1 right-1 w-4 h-4 bg-accent rounded-full text-[9px] font-bold text-white flex items-center justify-center"
            >{{ cartCount }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile sub-links -->
    <div
      class="flex md:hidden overflow-x-auto gap-5 px-4 py-2.5 bg-bg/94 border-t border-border scrollbar-none"
    >
      <NuxtLink
        to="/shop?category=manual-grinders"
        class="text-[11px] font-bold uppercase tracking-[0.1em] text-text-2 no-underline whitespace-nowrap"
        >Grinders</NuxtLink
      >
      <NuxtLink
        to="/shop?category=portafilters"
        class="text-[11px] font-bold uppercase tracking-[0.1em] text-text-2 no-underline whitespace-nowrap"
        >Portafilters</NuxtLink
      >
      <NuxtLink
        to="/shop?category=distribution-tools"
        class="text-[11px] font-bold uppercase tracking-[0.1em] text-text-2 no-underline whitespace-nowrap"
        >Tools</NuxtLink
      >
      <NuxtLink
        to="/bundle"
        class="text-[11px] font-bold uppercase tracking-[0.1em] text-text-2 no-underline whitespace-nowrap"
        >Bundle Builder</NuxtLink
      >
    </div>

    <!-- Search bar -->
    <Transition name="search">
      <div v-if="searchOpen" class="border-t border-border bg-surface">
        <div class="flex items-center gap-3 px-8 py-3 max-w-[1440px] mx-auto">
          <IconSearch class="text-text-3 shrink-0" />
          <input
            ref="searchInput"
            v-model="searchQuery"
            class="flex-1 border-none bg-transparent text-[15px] font-body text-text outline-none placeholder:text-text-3"
            placeholder="Search tools, grinders, portafilters..."
            @keyup.enter="doSearch"
            @keyup.esc="toggleSearch"
          />
          <button
            class="border-none bg-transparent text-text-3 cursor-pointer text-sm px-2 py-1 rounded hover:bg-surface-2 hover:text-text transition-all duration-default ease-default"
            @click="toggleSearch"
          >
            ✕
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { watch, nextTick } from "vue";
const { count: cartCount, fetchCart } = useCart();
const router = useRouter();
const searchOpen = ref(false);
const searchQuery = ref("");
const searchInput = ref<HTMLInputElement>();

const user = useSupabaseUser();

watch(
  user,
  (newUser) => {
    if (newUser) {
      fetchCart();
    }
  },
  { immediate: true },
);

function toggleSearch() {
  searchOpen.value = !searchOpen.value;
  if (searchOpen.value) {
    nextTick(() => searchInput.value?.focus());
  }
}

function doSearch() {
  if (!searchQuery.value.trim()) return;
  router.push(`/shop?q=${encodeURIComponent(searchQuery.value.trim())}`);
  searchOpen.value = false;
  searchQuery.value = "";
}

const userFirstName = computed(() => {
  const name =
    user.value?.user_metadata?.full_name || user.value?.user_metadata?.name;
  return name?.split(" ")[0] || "";
});

const userAvatar = computed(() => {
  return (
    user.value?.user_metadata?.avatar_url ||
    user.value?.user_metadata?.picture ||
    user.value?.user_metadata?.avatar
  );
});

const { data: profile } = await useAsyncData<any>("user-profile", async () => {
  if (!user.value?.id) return null;
  const client = useSupabaseClient();
  const { data } = await client
    .from("profiles")
    .select("role")
    .eq("id", user.value.id)
    .single();
  return data;
});

const isAdmin = ref(false);

watchEffect(() => {
  const role = profile.value?.role?.toLowerCase() || '';
  const email = user.value?.email;
  const calculatedIsAdmin = role === 'admin' || role === 'administrator' || role === 'true' || email === 'admin@bench.bb';
  isAdmin.value = calculatedIsAdmin;
});
</script>

<style scoped>
/* Transition */

.search-enter-from,
.search-leave-to {
  transform: translateY(-6px);
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  scrollbar-width: none;
}
</style>
