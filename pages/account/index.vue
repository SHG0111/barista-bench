<template>
  <div class="pt-nav-h">
    <div class="container mx-auto px-8 pt-12 pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
        <!-- Sidebar nav -->
        <aside class="bg-surface rounded-lg p-2 sticky top-[calc(56px+24px)]">
          <div
            v-for="tab in [
              { id: 'dashboard', label: 'Dashboard', icon: 'solar:widget-4-broken' },
              { id: 'orders', label: 'My Orders', icon: 'solar:bag-3-broken' },
              { id: 'saved', label: 'Saved Tools', icon: 'solar:heart-broken' },
              { id: 'settings', label: 'Profile Settings', icon: 'solar:settings-broken' }
            ]"
            :key="tab.id"
            class="flex items-center gap-2.5 px-3.5 py-2.5 rounded cursor-pointer text-[13.5px] font-medium transition-all duration-180"
            :class="activeTab === tab.id ? 'bg-text text-white' : 'text-text-2 hover:bg-surface-2 hover:text-text'"
            @click="activeTab = tab.id"
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
          
          <div class="flex items-center gap-2.5 px-3.5 py-2.5 rounded cursor-pointer text-[13.5px] font-medium transition-all duration-180 text-red hover:bg-red-bg" @click="signOut">
            <Icon name="solar:logout-2-broken" width="16" height="16" />
            Log Out
          </div>
        </aside>

        <!-- Main content -->
        <div class="space-y-6">
          <!-- Dashboard -->
          <div v-if="activeTab === 'dashboard'" class="space-y-6">
            <div class="flex items-center gap-5 p-6 bg-surface rounded-lg shadow-sm border border-border/50">
              <img
                v-if="(profile?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture || user?.user_metadata?.avatar) && user"
                :src="profile?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture || user?.user_metadata?.avatar"
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
              <button class="btn btn-outline btn-sm" @click="activeTab = 'settings'">EDIT PROFILE</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="bg-surface rounded-lg p-5 shadow-sm border border-border/50">
                <div class="text-[10.5px] font-bold tracking-widest uppercase text-text-3 mb-2 font-body">TOTAL ORDERS</div>
                <div class="text-[32px] font-bold font-display mb-1">{{ orders.length }}</div>
                <div class="text-[12px] text-green font-medium">+2 this month</div>
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

            <!-- Recent orders preview -->
            <div class="bg-surface rounded-lg p-6 shadow-sm border border-border/50 relative min-h-[180px]">
              <div v-if="ordersLoading" class="absolute inset-0 flex items-center justify-center bg-white/70 z-10 rounded-lg">
                <div class="w-6 h-6 border-2 border-border border-t-accent rounded-full animate-spin"></div>
              </div>
              <template v-else>
                <div class="flex justify-between items-center mb-5">
                  <h3 class="text-[11px] font-bold tracking-[0.12em] uppercase text-text-2 font-body">RECENT ORDERS</h3>
                  <button class="btn btn-ghost btn-sm" @click="activeTab = 'orders'">VIEW ALL</button>
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

            <!-- Saved tools preview -->
            <div class="bg-surface rounded-lg p-6 shadow-sm border border-border/50" v-if="savedTools.length">
              <div class="flex justify-between items-center mb-5">
                <h3 class="text-[11px] font-bold tracking-[0.12em] uppercase text-text-2 font-body">SAVED TOOLS</h3>
                <button class="btn btn-ghost btn-sm" @click="activeTab = 'saved'">VIEW ALL</button>
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
                        :src="item.products.images[0]"
                        :alt="item.products?.name"
                        class="w-full h-full object-cover"
                        format="webp"
                        loading="lazy"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="text-[13.5px] font-semibold text-text truncate mb-0.5">{{ item.products?.name }}</div>
                      <div class="text-[12px] text-accent font-bold mb-2">{{ formatPrice(item.products?.price) }}</div>
                      <button class="btn btn-accent btn-sm" @click="addSavedToCart(item)">ADD TO CART</button>
                    </div>
                    <button class="p-1 rounded text-text-3 hover:text-red hover:bg-red-bg transition-all duration-150" @click="removeSaved(item)">
                      <IconTrash />
                    </button>
                  </div>
              </div>
            </div>
          </div>

          <!-- Orders tab -->
          <div v-if="activeTab === 'orders'" class="space-y-6">
            <h2 class="text-2xl font-semibold">My Orders</h2>
            <div class="bg-surface rounded-lg p-6 shadow-sm border border-border/50 relative min-h-[200px]">
              <div v-if="ordersLoading" class="absolute inset-0 flex items-center justify-center bg-white/70 z-10 rounded-lg">
                <div class="w-6 h-6 border-2 border-border border-t-accent rounded-full animate-spin"></div>
              </div>
              <template v-else>
                <div class="hidden sm:grid grid-cols-[1fr_120px_140px_100px_40px] items-center gap-4 mb-3 text-[11px] font-bold tracking-widest uppercase text-text-3">
                  <span>Order #</span><span>Date</span><span>Status</span><span>Total</span><span></span>
                </div>
                <div class="space-y-1">
                  <div v-for="o in orders" :key="o.id" class="grid grid-cols-1 sm:grid-cols-[1fr_120px_140px_100px_40px] items-center gap-4 py-3.5 border-b border-border last:border-0">
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
                  No orders yet.
                </div>
              </template>
            </div>
          </div>

          <!-- Saved tools tab -->
          <div v-if="activeTab === 'saved'" class="space-y-6">
            <h2 class="text-2xl font-semibold">Saved Tools</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5" v-if="savedTools.length">
                <div
                  v-for="item in savedTools"
                  :key="item.id"
                  class="flex items-center gap-3.5 p-4 bg-surface rounded-lg shadow-sm border border-border/50"
                >
                  <div class="w-[52px] h-[52px] rounded-lg bg-surface-2 shrink-0 overflow-hidden flex items-center justify-center">
                    <NuxtImg
                      v-if="item.products?.images?.length"
                      :src="item.products.images[0]"
                      :alt="item.products?.name"
                      class="w-full h-full object-cover"
                      format="webp"
                      loading="lazy"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-[13.5px] font-semibold text-text truncate mb-0.5">{{ item.products?.name }}</div>
                    <div class="text-[12px] text-accent font-bold mb-2">${{ item.products?.price }}</div>
                    <button class="btn btn-accent btn-sm" @click="addSavedToCart(item)">ADD TO CART</button>
                  </div>
                  <button class="p-1 rounded text-text-3 hover:text-red hover:bg-red-bg transition-all duration-150" @click="removeSaved(item)">
                    <IconTrash />
                  </button>
                </div>
            </div>
            <div v-else class="text-center py-10 text-text-2 bg-surface rounded-lg shadow-sm border border-border/50">
              No saved tools yet.
              <NuxtLink to="/shop" class="text-accent underline block mt-2">Browse the collection →</NuxtLink>
            </div>
          </div>

          <!-- Settings tab -->
          <div v-if="activeTab === 'settings'" class="space-y-6">
            <h2 class="text-2xl font-semibold">Profile Settings</h2>
            <div class="bg-surface rounded-lg p-6 shadow-sm border border-border/50">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[11px] font-bold tracking-widest uppercase text-text-2 mb-1.5">Full Name</label>
                  <input v-model="settingsForm.full_name" class="w-full px-3.5 py-2.5 bg-surface border-[1.5px] border-border rounded font-body text-sm text-text outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label class="block text-[11px] font-bold tracking-widest uppercase text-text-2 mb-1.5">Email</label>
                  <input :value="user?.email" class="w-full px-3.5 py-2.5 bg-surface border-[1.5px] border-border rounded font-body text-sm text-text outline-none opacity-50 cursor-not-allowed" disabled />
                </div>
              </div>
              <button class="btn btn-primary mt-5" @click="saveSettings" :disabled="saving">
                {{ saving ? "Saving..." : "Save Changes" }}
              </button>
            </div>

            <!-- Password change -->
            <div class="bg-surface rounded-lg p-6 shadow-sm border border-border/50" v-if="user?.app_metadata?.provider === 'email'">
              <h3 class="text-sm font-bold tracking-wider uppercase mb-5">SECURITY</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[11px] font-bold tracking-widest uppercase text-text-2 mb-1.5">New Password</label>
                  <input v-model="passwordForm.new" type="password" class="w-full px-3.5 py-2.5 bg-surface border-[1.5px] border-border rounded font-body text-sm text-text outline-none focus:border-accent transition-colors" placeholder="••••••••" />
                </div>
                <div>
                  <label class="block text-[11px] font-bold tracking-widest uppercase text-text-2 mb-1.5">Confirm Password</label>
                  <input v-model="passwordForm.confirm" type="password" class="w-full px-3.5 py-2.5 bg-surface border-[1.5px] border-border rounded font-body text-sm text-text outline-none focus:border-accent transition-colors" placeholder="••••••••" />
                </div>
              </div>
              <button class="btn btn-outline mt-5" @click="updatePassword" :disabled="changingPassword">
                {{ changingPassword ? "Updating..." : "Update Password" }}
              </button>
            </div>
            <div class="bg-surface rounded-lg p-6 shadow-sm border border-border/50" v-else>
               <p class="text-[13px] text-text-3">
                 You are logged in via <strong>{{ user?.app_metadata?.provider }}</strong>. 
                 Password management is handled by your provider.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

definePageMeta({ middleware: ["auth", "block-admin"] });

const supabase: any = useSupabaseClient();
const user = useSupabaseUser();
const { addToCart } = useCart();
const { formatPrice } = useCurrency();
const toast = useToast();
const route = useRoute();

const activeTab = ref(route.query.tab ? String(route.query.tab) : "dashboard");
const profile = ref<any>(null);
const orders = ref<any[]>([]);
const savedTools = ref<any[]>([]);
const saving = ref(false);
const ordersLoading = ref(true);
const settingsForm = reactive({ full_name: "" });
const passwordForm = reactive({ new: "", confirm: "" });
const changingPassword = ref(false);

const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
})

const passwordSchema = z.object({
  new: z.string().min(6, 'Password must be at least 6 characters'),
  confirm: z.string(),
}).refine(data => data.new === data.confirm, { message: 'Passwords do not match' })

const firstName = computed(() => {
  const name = profile.value?.full_name || 
               user.value?.user_metadata?.full_name || 
               user.value?.user_metadata?.name;
  return name?.split(" ")[0] || user.value?.email?.split("@")[0] || "there";
});

const userInitial = computed(() => {
  const name = profile.value?.full_name || 
               user.value?.user_metadata?.full_name || 
               user.value?.user_metadata?.name || 
               user.value?.email || "U";
  return name[0].toUpperCase();
});
const memberSince = computed(() => {
  if (!user.value?.created_at) return "";
  return new Date(user.value.created_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
});

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
function statusBadge(s: string) {
  if (s === "delivered") return "badge-green";
  if (s === "processed") return "badge-green";
  if (s === "in_transit") return "badge-amber";
  if (s === "placed") return "badge-amber";
  return "badge-gray";
}

async function addSavedToCart(item: any) {
  await addToCart(item.product_id);
  toast.success("Added to cart");
}
async function removeSaved(item: any) {
  await supabase.from("saved_tools").delete().eq("id", item.id);
  savedTools.value = savedTools.value.filter((s) => s.id !== item.id);
}
async function saveSettings() {
  if (!user.value) return;

  const validation = profileSchema.safeParse(settingsForm)
  if (!validation.success) {
    toast.error(validation.error.issues[0]?.message || 'Validation failed')
    return
  }

  saving.value = true;
  await supabase
    .from("profiles")
    .update({
      full_name: settingsForm.full_name,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.value.id);
  if (profile.value) profile.value.full_name = settingsForm.full_name;
  toast.success("Profile updated");
  saving.value = false;
}

async function updatePassword() {
  const validation = passwordSchema.safeParse(passwordForm)
  if (!validation.success) {
    toast.error(validation.error.issues[0]?.message || 'Validation failed')
    return
  }

  changingPassword.value = true;
  const { error } = await supabase.auth.updateUser({
    password: passwordForm.new,
  });
  if (error) {
    toast.error(error.message);
  } else {
    toast.success("Password updated successfully");
    passwordForm.new = "";
    passwordForm.confirm = "";
  }
  changingPassword.value = false;
}
async function signOut() {
  await supabase.auth.signOut();
  navigateTo("/");
}

onMounted(async () => {
  ordersLoading.value = true;
  
  if (!user.value?.id) {
    ordersLoading.value = false;
    return;
  }

  try {
    const [{ data: p }, { data: o }, { data: s }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.value.id).single(),
      supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.value.id)
        .order("placed_at", { ascending: false }),
      supabase
        .from("saved_tools")
        .select("*, products(*)")
        .eq("user_id", user.value.id),
    ]);
    profile.value = p;
    orders.value = o || [];
    savedTools.value = s || [];
    if (p?.full_name) settingsForm.full_name = p.full_name;
  } finally {
    ordersLoading.value = false;
  }
});
</script>

<style scoped>
/* Transition & Spinners */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 0.8s linear infinite;
}
</style>
