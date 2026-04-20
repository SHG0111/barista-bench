<template>
  <nav class="app-nav">
    <div class="nav-inner">
      <!-- Logo -->
      <NuxtLink to="/" class="nav-logo">
        <div class="logo-box">
          <span>BB</span>
        </div>
        <span class="logo-text">BARISTA BENCH</span>
      </NuxtLink>

      <!-- Center links -->
      <div class="nav-links">
        <NuxtLink to="/shop" class="nav-link">Shop All</NuxtLink>
        <NuxtLink to="/shop?category=manual-grinders" class="nav-link"
          >Grinders</NuxtLink
        >
        <NuxtLink to="/shop?category=portafilters" class="nav-link"
          >Portafilters</NuxtLink
        >
        <NuxtLink to="/shop?category=distribution-tools" class="nav-link"
          >Tools</NuxtLink
        >
        <NuxtLink to="/bundle" class="btn btn-primary btn-sm"
          >Bundle Builder</NuxtLink
        >
      </div>

      <!-- Right icons -->
      <div class="nav-actions">
        <button class="nav-icon-btn" @click="toggleSearch" aria-label="Search">
          <IconSearch />
        </button>

        <NuxtLink to="/account" class="nav-icon-btn" aria-label="Account">
          <IconUser />
        </NuxtLink>

        <NuxtLink to="/cart" class="nav-icon-btn cart-btn" aria-label="Cart">
          <IconCart />
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile sub-links (visible below nav-inner on mobile) -->
    <div class="mobile-links">
      <NuxtLink to="/shop?category=manual-grinders" class="mobile-link">Grinders</NuxtLink>
      <NuxtLink to="/shop?category=portafilters" class="mobile-link">Portafilters</NuxtLink>
      <NuxtLink to="/shop?category=distribution-tools" class="mobile-link">Tools</NuxtLink>
      <NuxtLink to="/bundle" class="mobile-link">Bundle Builder</NuxtLink>
    </div>

    <!-- Search bar -->
    <Transition name="search">
      <div v-if="searchOpen" class="search-bar">
        <div class="search-inner">
          <IconSearch class="search-icon" />
          <input
            ref="searchInput"
            v-model="searchQuery"
            class="search-input"
            placeholder="Search tools, grinders, portafilters..."
            @keyup.enter="doSearch"
            @keyup.esc="toggleSearch"
          />
          <button class="search-close" @click="toggleSearch">✕</button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const { count: cartCount, fetchCart } = useCart();
const router = useRouter();
const searchOpen = ref(false);
const searchQuery = ref("");
const searchInput = ref<HTMLInputElement>();

const user = useSupabaseUser();
import { watch } from "vue";

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
</script>

<style scoped>
.app-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: rgba(245, 244, 241, 0.94);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  max-width: 1440px;
  margin: 0 auto;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  color: var(--text);
}
.logo-box {
  width: 28px;
  height: 28px;
  background: var(--text);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-box span {
  color: white;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.05em;
}
.logo-text {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
}
.nav-links {
  display: flex;
  gap: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.nav-link {
  font-size: 13.5px;
  color: var(--text-2);
  text-decoration: none;
  font-weight: 450;
  transition: color 0.15s;
  white-space: nowrap;
}
.nav-link:hover,
.nav-link.router-link-active {
  color: var(--text);
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-icon-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 8px;
  color: var(--text-2);
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
}
.nav-icon-btn:hover {
  background: var(--surface-2);
  color: var(--text);
}
.cart-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  background: var(--accent);
  border-radius: 50%;
  font-size: 9px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Search */
.search-bar {
  border-top: 1px solid var(--border);
  background: var(--surface);
}
.search-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 32px;
  max-width: 1440px;
  margin: 0 auto;
}
.search-icon {
  color: var(--text-3);
  flex-shrink: 0;
}
.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  font-family: var(--font-body);
  color: var(--text);
  outline: none;
}
.search-input::placeholder {
  color: var(--text-3);
}
.search-close {
  border: none;
  background: transparent;
  color: var(--text-3);
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.15s;
}
.search-close:hover {
  background: var(--surface-2);
  color: var(--text);
}
/* Transition */
.search-enter-active,
.search-leave-active {
  transition: all 0.2s ease;
}
.search-enter-from,
.search-leave-to {
  transform: translateY(-6px);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .nav-links {
    display: none;
  }
}

@media (max-width: 768px) {
  .nav-inner {
    padding: 0 16px;
  }
  .logo-text {
    display: none;
  }
  .mobile-links {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    padding: 10px 16px;
    background: rgba(245, 244, 241, 0.94);
    border-top: 1px solid var(--border);
    scrollbar-width: none;
  }
  .mobile-links::-webkit-scrollbar {
    display: none;
  }
  .mobile-link {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-2);
    text-decoration: none;
    white-space: nowrap;
  }
}

@media (min-width: 769px) {
  .mobile-links {
    display: none;
  }
}
</style>
