<template>
  <div class="flex min-h-screen bg-bg text-text font-body">
    <PageLoader />
    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 z-40 bg-text/20 backdrop-blur-sm lg:hidden"
    ></div>

    <AdminSidebar
      :sidebar-open="sidebarOpen"
      @toggle="sidebarOpen = !sidebarOpen"
      @logout="handleLogout"
    />

    <!-- Main Content -->
    <div
      class="flex-1 flex flex-col min-w-0 transition-all duration-300"
      :class="[sidebarOpen ? 'lg:pl-72' : 'lg:pl-20']"
    >
      <AdminNavbar
        :page-title="pageTitle"
        :profile="profile"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <main class="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-bg">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { navigateTo } from "#app";
import AdminSidebar from "@/pages/admin/components/Sidebar.vue";
import AdminNavbar from "~/pages/admin/components/AdminNavbar.vue";
const route = useRoute();
const client = useSupabaseClient();
const user = useSupabaseUser();
const sidebarOpen = ref(true);

const { data: profile } = await useAsyncData(
  "admin-profile",
  async () => {
    if (!user.value?.id) return null;
    const { data } = await client
      .from("profiles")
      .select("*")
      .eq("id", user.value.id)
      .single();
    return data;
  },
  { watch: [user] },
);

const pageTitle = computed(() => {
  const path = route.path;
  if (path === "/admin") return "Dashboard";
  if (path.startsWith("/admin/products")) return "Inventory";
  if (path.startsWith("/admin/users")) return "Staff";
  if (path.startsWith("/admin/orders")) return "Orders";
  if (path.startsWith("/admin/analytics")) return "Analytics";
  return "Admin";
});

const handleLogout = async () => {
  await client.auth.signOut();
  navigateTo("/auth/login");
};
</script>
