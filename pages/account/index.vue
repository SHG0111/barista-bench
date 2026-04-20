<template>
  <div class="page-top">
    <div class="container" style="padding-top: 48px; padding-bottom: 80px">
      <div class="sidebar-layout">
        <!-- Sidebar nav -->
        <aside class="sidebar">
          <div
            class="sidebar-item"
            :class="{ active: activeTab === 'dashboard' }"
            @click="activeTab = 'dashboard'"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
            Dashboard
          </div>
          <div
            class="sidebar-item"
            :class="{ active: activeTab === 'orders' }"
            @click="activeTab = 'orders'"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            My Orders
          </div>
          <div
            class="sidebar-item"
            :class="{ active: activeTab === 'saved' }"
            @click="activeTab = 'saved'"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              />
            </svg>
            Saved Tools
          </div>
          <div
            class="sidebar-item"
            :class="{ active: activeTab === 'settings' }"
            @click="activeTab = 'settings'"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <circle cx="12" cy="12" r="3" />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
              />
            </svg>
            Profile Settings
          </div>
          <div class="sidebar-divider"></div>
          <div class="barista-status-widget">
            <div class="bsw-header">
              <span class="bsw-icon">🏆</span>
              <span class="bsw-label">BARISTA STATUS</span>
            </div>
            <div class="bsw-tier">
              {{ profile?.barista_tier || "Expert Home Barista" }}
            </div>
            <div class="bsw-community">Top 5% of the community</div>
            <div class="progress-bar" style="margin: 12px 0">
              <div class="progress-fill" style="width: 72%"></div>
            </div>
            <div class="bsw-next">150 points until Master tier</div>
          </div>
          <div class="sidebar-divider"></div>
          <div class="sidebar-item logout-item" @click="signOut">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log Out
          </div>
        </aside>

        <!-- Main content -->
        <div class="account-main">
          <!-- Dashboard -->
          <div v-if="activeTab === 'dashboard'">
            <div class="profile-header card">
              <img
                v-if="profile?.avatar_url"
                :src="profile.avatar_url"
                class="profile-avatar"
              />
              <div v-else class="profile-avatar-placeholder">
                {{ userInitial }}
              </div>
              <div class="profile-info">
                <h2>Welcome back, {{ firstName }}</h2>
                <p>{{ user?.email }} • Member since {{ memberSince }}</p>
              </div>
              <button
                class="btn btn-outline btn-sm"
                @click="activeTab = 'settings'"
              >
                EDIT PROFILE
              </button>
            </div>

            <div class="stats-row">
              <div class="stat-card card">
                <div class="stat-label-sm">TOTAL ORDERS</div>
                <div class="stat-number">{{ orders.length }}</div>
                <div class="stat-sub green">+2 this month</div>
              </div>
              <div class="stat-card card">
                <div class="stat-label-sm">SAVED ITEMS</div>
                <div class="stat-number">{{ savedTools.length }}</div>
                <div class="stat-sub">Precision collection</div>
              </div>
              <div class="stat-card card">
                <div class="stat-label-sm">ACADEMY RANK</div>
                <div class="stat-number rank">
                  {{ profile?.academy_rank || "Pro" }}
                </div>
                <div class="stat-sub amber">
                  {{ profile?.courses_completed || 4 }} courses completed
                </div>
              </div>
            </div>

            <!-- Recent orders preview -->
            <div class="card" style="margin-top: 24px">
              <div class="section-block-header">
                <h3>RECENT ORDERS</h3>
                <button
                  class="btn btn-ghost btn-sm"
                  @click="activeTab = 'orders'"
                >
                  VIEW ALL
                </button>
              </div>
              <div class="order-thead order-row">
                <span>Order #</span><span>Date</span><span>Status</span
                ><span>Total</span><span></span>
              </div>
              <div
                v-for="o in orders.slice(0, 3)"
                :key="o.id"
                class="order-row"
              >
                <span class="order-num">{{ o.order_number }}</span>
                <span class="order-date">{{ formatDate(o.placed_at) }}</span>
                <span>
                  <span class="badge" :class="statusBadge(o.status)">
                    <span v-if="o.status === 'delivered'">●</span>
                    {{ o.status }}
                  </span>
                </span>
                <span class="order-total">${{ o.total?.toFixed(2) }}</span>
                <NuxtLink
                  :to="`/order/${o.order_number}`"
                  class="btn btn-ghost btn-sm"
                >
                  <IconEye />
                </NuxtLink>
              </div>
              <div v-if="orders.length === 0" class="empty-tab">
                No orders yet. <NuxtLink to="/shop">Start shopping →</NuxtLink>
              </div>
            </div>

            <!-- Saved tools preview -->
            <div class="card" style="margin-top: 24px" v-if="savedTools.length">
              <div class="section-block-header">
                <h3>SAVED TOOLS</h3>
                <button
                  class="btn btn-ghost btn-sm"
                  @click="activeTab = 'saved'"
                >
                  VIEW ALL
                </button>
              </div>
              <div class="saved-grid">
                <div
                  v-for="item in savedTools.slice(0, 2)"
                  :key="item.id"
                  class="saved-item"
                >
                  <div class="saved-img"></div>
                  <div class="saved-info">
                    <div class="saved-name">{{ item.products?.name }}</div>
                    <div class="saved-price">${{ item.products?.price }}</div>
                    <button
                      class="btn btn-accent btn-sm"
                      @click="addSavedToCart(item)"
                    >
                      ADD TO CART
                    </button>
                  </div>
                  <button class="saved-remove" @click="removeSaved(item)">
                    <IconTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Orders tab -->
          <div v-if="activeTab === 'orders'">
            <h2 style="margin-bottom: 24px">My Orders</h2>
            <div class="card">
              <div class="order-thead order-row">
                <span>Order #</span><span>Date</span><span>Status</span
                ><span>Total</span><span></span>
              </div>
              <div v-for="o in orders" :key="o.id" class="order-row">
                <span class="order-num">{{ o.order_number }}</span>
                <span class="order-date">{{ formatDate(o.placed_at) }}</span>
                <span
                  ><span class="badge" :class="statusBadge(o.status)">{{
                    o.status
                  }}</span></span
                >
                <span class="order-total">${{ o.total?.toFixed(2) }}</span>
                <NuxtLink
                  :to="`/order/${o.order_number}`"
                  class="btn btn-ghost btn-sm"
                  ><IconEye
                /></NuxtLink>
              </div>
              <div v-if="orders.length === 0" class="empty-tab">
                No orders yet.
              </div>
            </div>
          </div>

          <!-- Saved tools tab -->
          <div v-if="activeTab === 'saved'">
            <h2 style="margin-bottom: 24px">Saved Tools</h2>
            <div class="saved-grid-full" v-if="savedTools.length">
              <div
                v-for="item in savedTools"
                :key="item.id"
                class="saved-item card"
              >
                <div class="saved-img"></div>
                <div class="saved-info">
                  <div class="saved-name">{{ item.products?.name }}</div>
                  <div class="saved-price">${{ item.products?.price }}</div>
                  <button
                    class="btn btn-accent btn-sm"
                    @click="addSavedToCart(item)"
                  >
                    ADD TO CART
                  </button>
                </div>
                <button class="saved-remove" @click="removeSaved(item)">
                  <IconTrash />
                </button>
              </div>
            </div>
            <div v-else class="empty-tab card">
              No saved tools yet.
              <NuxtLink to="/shop">Browse the collection →</NuxtLink>
            </div>
          </div>

          <!-- Settings tab -->
          <div v-if="activeTab === 'settings'">
            <h2 style="margin-bottom: 24px">Profile Settings</h2>
            <div class="card settings-form">
              <div class="form-grid">
                <div>
                  <label class="input-label">Full Name</label>
                  <input v-model="settingsForm.full_name" class="input" />
                </div>
                <div>
                  <label class="input-label">Email</label>
                  <input
                    :value="user?.email"
                    class="input"
                    disabled
                    style="opacity: 0.5"
                  />
                </div>
              </div>
              <button
                class="btn btn-primary"
                style="margin-top: 20px"
                @click="saveSettings"
                :disabled="saving"
              >
                {{ saving ? "Saving..." : "Save Changes" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const supabase: any = useSupabaseClient();
const user = useSupabaseUser();
const { addToCart } = useCart();
const { success } = useToast();

const activeTab = ref("dashboard");
const profile = ref<any>(null);
const orders = ref<any[]>([]);
const savedTools = ref<any[]>([]);
const saving = ref(false);
const settingsForm = reactive({ full_name: "" });

const firstName = computed(
  () =>
    profile.value?.full_name?.split(" ")[0] ||
    user.value?.email?.split("@")[0] ||
    "there",
);
const userInitial = computed(() =>
  (profile.value?.full_name || user.value?.email || "U")[0].toUpperCase(),
);
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
  if (s === "in_transit") return "badge-amber";
  return "badge-gray";
}

async function addSavedToCart(item: any) {
  await addToCart(item.product_id);
  success("Added to cart");
}
async function removeSaved(item: any) {
  await supabase.from("saved_tools").delete().eq("id", item.id);
  savedTools.value = savedTools.value.filter((s) => s.id !== item.id);
}
async function saveSettings() {
  if (!user.value) return;
  saving.value = true;
  await supabase
    .from("profiles")
    .update({
      full_name: settingsForm.full_name,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.value.id);
  if (profile.value) profile.value.full_name = settingsForm.full_name;
  success("Profile updated");
  saving.value = false;
}
async function signOut() {
  await supabase.auth.signOut();
  navigateTo("/");
}

onMounted(async () => {
  if (!user.value) return;
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
});
</script>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}
.profile-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}
.profile-avatar-placeholder {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--accent-light);
  color: var(--accent);
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.profile-info {
  flex: 1;
}
.profile-info h2 {
  font-size: 22px;
  margin-bottom: 4px;
}
.profile-info p {
  font-size: 13px;
  color: var(--text-2);
}
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.stat-card {
  padding: 20px;
}
.stat-label-sm {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 8px;
  font-family: var(--font-body);
}
.stat-number {
  font-size: 32px;
  font-weight: 700;
  font-family: var(--font-display);
  margin-bottom: 4px;
}
.stat-number.rank {
  font-size: 26px;
}
.stat-sub {
  font-size: 12px;
  color: var(--text-2);
}
.stat-sub.green {
  color: var(--green);
}
.stat-sub.amber {
  color: var(--accent);
}
.section-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.section-block-header h3 {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--text-2);
  font-family: var(--font-body);
}
.order-num {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
}
.order-date {
  font-size: 13px;
  color: var(--text-2);
}
.order-total {
  font-weight: 700;
}
.saved-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.saved-grid-full {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.saved-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
}
.saved-img {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  background: var(--surface-2);
  flex-shrink: 0;
}
.saved-info {
  flex: 1;
}
.saved-name {
  font-size: 13.5px;
  font-weight: 600;
  margin-bottom: 2px;
}
.saved-price {
  font-size: 12px;
  color: var(--accent);
  margin-bottom: 8px;
}
.saved-remove {
  border: none;
  background: transparent;
  color: var(--text-3);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.15s;
}
.saved-remove:hover {
  color: var(--red);
  background: var(--red-bg);
}
.settings-form .form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.empty-tab {
  padding: 40px;
  text-align: center;
  color: var(--text-2);
}
.empty-tab a {
  color: var(--accent);
  text-decoration: underline;
}
.logout-item {
  color: var(--red) !important;
}
.logout-item:hover {
  background: var(--red-bg) !important;
}
.barista-status-widget {
  padding: 14px;
  background: var(--surface-2);
  border-radius: var(--radius);
  margin: 6px 8px;
}
.bsw-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.bsw-icon {
  font-size: 14px;
}
.bsw-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}
.bsw-tier {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 2px;
}
.bsw-community {
  font-size: 11.5px;
  color: var(--text-2);
  margin-bottom: 8px;
}
.bsw-next {
  font-size: 11px;
  color: var(--text-3);
}
</style>
