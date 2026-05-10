<template>
  <div class="pt-nav-h">
    <div class="container mx-auto px-8 pt-12 pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
        <AccountSidebar
          :activeTab="activeTab"
          :profile="profile"
          @update:activeTab="activeTab = $event"
          @signOut="signOut"
        />

        <div class="space-y-6">
          <AccountDashboard
            v-if="activeTab === 'dashboard'"
            :profile="profile"
            :orders="orders"
            :ordersLoading="ordersLoading"
            :savedTools="savedTools"
            :user="userId.value  as any"  
            :firstName="firstName"
            :userInitial="userInitial"
            :memberSince="memberSince"
            @editProfile="activeTab = 'settings'"
            @viewOrders="activeTab = 'orders'"
            @viewSaved="activeTab = 'saved'"
            @addSavedToCart="addSavedToCart"
            @removeSaved="removeSaved"
          />

          <AccountOrders
            v-if="activeTab === 'orders'"
            :orders="orders"
            :ordersLoading="ordersLoading"
          />

          <AccountSavedTools
            v-if="activeTab === 'saved'"
            :savedTools="savedTools"
            @addToCart="addSavedToCart"
            @remove="removeSaved"
          />

          <AccountSettings
            v-if="activeTab === 'settings'"
            :user="userId.value  as any"
            :fullName="profile?.full_name || ''"
            :saving="saving"
            :changingPassword="changingPassword"
            @saveSettings="saveSettings"
            @updatePassword="updatePassword"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

definePageMeta({ middleware: ["auth", "block-admin"] })

const supabase: any = useSupabaseClient()
const { addToCart, userId } = useCart()
const { formatPrice } = useCurrency()
const toast = useToast()
const route = useRoute()
const api = useApi()

const activeTab = ref(route.query.tab ? String(route.query.tab) : "dashboard")
const profile = ref<any>(null)
const orders = ref<any[]>([])
const savedTools = ref<any[]>([])
const saving = ref(false)
const ordersLoading = ref(true)
const changingPassword = ref(false)
const settingsForm = reactive({ full_name: "" })

const firstName = computed(() => {
  const name = profile.value?.full_name ||
               userId.value?.user_metadata?.full_name ||
               userId.value?.user_metadata?.name
  return name?.split(" ")[0] || userId.value?.email?.split("@")[0] || "there"
})

const userInitial = computed(() => {
  const name = profile.value?.full_name ||
               userId.value?.user_metadata?.full_name ||
               userId.value?.user_metadata?.name ||
               userId.value?.email || "U"
  return name[0].toUpperCase()
})

const memberSince = computed(() => {
  if (!userId.value?.created_at) return ""
  return new Date(userId.value.created_at).toLocaleDateString("en-US", {
    month: "short", year: "numeric",
  })
})

async function addSavedToCart(item: any) {
  await addToCart(item.product_id)
  toast.success("Added to cart")
}

async function removeSaved(item: any) {
  await supabase.from("saved_tools").delete().eq("id", item.id)
  savedTools.value = savedTools.value.filter((s) => s.id !== item.id)
}

async function saveSettings(name: string) {
  if (!userId.value) return
  saving.value = true
  try {
    await supabase
      .from("profiles")
      .update({ full_name: name, updated_at: new Date().toISOString() })
      .eq("id", userId.value)
    if (profile.value) profile.value.full_name = name
    settingsForm.full_name = name
    toast.success("Profile updated")
  } finally {
    saving.value = false
  }
}

async function updatePassword(newPw: string, confirmPw: string) {
  const validation = z.object({
    new: z.string().min(6, 'Password must be at least 6 characters'),
    confirm: z.string(),
  }).refine(data => data.new === data.confirm, { message: 'Passwords do not match' })
    .safeParse({ new: newPw, confirm: confirmPw })

  if (!validation.success) {
    toast.error(validation.error.issues[0]?.message || 'Validation failed')
    return
  }

  changingPassword.value = true
  const { error } = await supabase.auth.updateUser({ password: newPw })
  if (error) {
    toast.error(error.message)
  } else {
    toast.success("Password updated successfully")
  }
  changingPassword.value = false
}

async function signOut() {
  await supabase.auth.signOut()
  navigateTo("/")
}

onMounted(async () => {
  ordersLoading.value = true

  if (!userId.value ) {

    ordersLoading.value = false
    return
  }

  try {

    const [{ data: p }, { data: s }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId.value ).single(),
      supabase
        .from("saved_tools")
        .select("*, products(*)")
        .eq("user_id", userId.value ),
    ])
    profile.value = p
    savedTools.value = s || []
    if (p?.full_name) settingsForm.full_name = p.full_name

    try {
      const { data: o } = await api.get("/api/orders/my-orders", {
        params: { userId: userId.value },
      })

      orders.value = o || []
    } catch (err) {
      console.error("Failed to fetch orders:", err)
      orders.value = []

    }
  } finally {
    ordersLoading.value = false

  }
})
</script>
