<template>
  <div class="space-y-8">
    <!-- Breadcrumb & Page Header -->
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div>
        <nav class="flex items-center gap-2 text-xs font-medium text-text-3 mb-2">
          <NuxtLink to="/admin" class="text-accent hover:text-accent-hover transition-colors">Home</NuxtLink>
          <Icon name="solar:arrow-right-broken" class="w-3 h-3 text-text-3" />
          <span class="text-accent">User Management</span>
        </nav>
        <h2 class="text-3xl font-extrabold text-text tracking-tight">User Management</h2>
        <p class="text-text-2 font-medium mt-1">Monitor and manage access for <span class="text-text font-bold">{{ totalUsers }}</span> platform participants.</p>
      </div>
      <div class="flex gap-3">
        <button class="flex items-center gap-2 bg-white border border-border px-5 py-2.5 rounded-xl font-semibold text-sm text-text-2 hover:bg-surface-2 shadow-sm transition-all active:scale-95">
          <Icon name="solar:filter-broken" class="w-4 h-4" />
          Filter View
        </button>
        <button class="flex items-center gap-2 bg-white border border-border px-5 py-2.5 rounded-xl font-semibold text-sm text-text-2 hover:bg-surface-2 shadow-sm transition-all active:scale-95">
          <Icon name="solar:file-bold-broken" class="w-4 h-4" />
          Export Data
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-border group hover:border-accent-light transition-all">
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-accent-light group-hover:bg-accent/20 transition-colors">
            <Icon name="solar:user-broken" class="w-6 h-6 text-accent" />
          </div>
          <div v-if="customerTrend !== null" class="flex items-center gap-1 text-green text-xs font-bold bg-green-bg px-2 py-1 rounded-lg">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            {{ customerTrend }}%
          </div>
        </div>
        <p class="text-text-3 text-xs font-bold uppercase tracking-widest mb-1">Total Customers</p>
        <h3 class="text-3xl font-black text-text">{{ stats.customers }}</h3>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-border group hover:border-red-100 transition-all">
        <div class="flex justify-between items-center mb-4">
             <div class="flex justify-center  w-12 h-12 rounded-full items-center bg-red-bg group-hover:bg-red/10 transition-colors">
            <Icon name="solar:close-circle-broken" class="w-6 h-6 text-red" />
          </div>
          <div v-if="stats.suspended > 0" class="flex items-center gap-1 text-red text-xs font-bold bg-red-bg px-2 py-1 rounded-lg">
            {{ stats.suspendedPercent }}% of total
          </div>
        </div>
        <p class="text-text-3 text-xs font-bold uppercase tracking-widest mb-1">Suspended Users</p>
        <h3 class="text-3xl font-black text-text">{{ stats.suspended }}</h3>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-border group hover:border-orange-100 transition-all">
        <div class="flex justify-between items-center mb-4">
          <div class="flex justify-center w-12 h-12 rounded-full items-center bg-orange-50 group-hover:bg-orange-100 transition-colors">
             <Icon name="solar:shield-broken" class="w-6 h-6 text-orange-600" />
          </div>
          <span v-if="stats.pending > 0" class="bg-red-bg text-red px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">Action Required</span>
        </div>
        <p class="text-text-3 text-xs font-bold uppercase tracking-widest mb-1">Pending Verification</p>
        <h3 class="text-3xl font-black text-text">{{ stats.pending }}</h3>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-border group hover:border-accent-light transition-all">
        <div class="flex justify-between items-center mb-4">
          <div class="flex justify-center w-12 h-12 rounded-full items-center bg-green-bg group-hover:bg-green/20 transition-colors">
             <Icon name="solar:check-circle-broken" class="w-6 h-6 text-green" />
          </div>
          <div v-if="stats.activePercent !== null" class="flex items-center gap-1 text-text-2 text-xs font-bold bg-surface-2 px-2 py-1 rounded-lg">
            {{ stats.activePercent }}% of total
          </div>
        </div>
        <p class="text-text-3 text-xs font-bold uppercase tracking-widest mb-1">Active Users</p>
        <h3 class="text-3xl font-black text-text">{{ stats.active }}</h3>
      </div>
    </div>

    <!-- Users Table -->
    <AdminTable :headers="tableHeaders" :items="filteredUsers" :loading="!users" :pagination="{ default: 10, options: [10, 25, 50] }">
      <template #controls>
        <div class="flex items-center gap-6 overflow-x-auto w-full sm:w-auto">
          <button @click="activeTab = 'all'" :class="['font-bold text-sm relative py-2 transition-colors whitespace-nowrap', activeTab === 'all' ? 'text-accent after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-accent after:rounded-full' : 'text-text-3 hover:text-text']">All Users</button>
          <button @click="activeTab = 'active'" :class="['font-bold text-sm relative py-2 transition-colors whitespace-nowrap', activeTab === 'active' ? 'text-accent after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-accent after:rounded-full' : 'text-text-3 hover:text-text']">Active</button>
          <button @click="activeTab = 'suspended'" :class="['font-bold text-sm relative py-2 transition-colors whitespace-nowrap', activeTab === 'suspended' ? 'text-accent after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-accent after:rounded-full' : 'text-text-3 hover:text-text']">Suspended</button>
        </div>
        <div class="text-text-3 text-xs font-semibold whitespace-nowrap">
          Showing <span class="text-text font-bold">{{ $refs.table?.paginationStart || 0 }}-{{ $refs.table?.paginationEnd || 0 }}</span> of {{ filteredUsers.length }}
        </div>
      </template>

      <template #mobile-card="{ item: profile }">
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-3 flex-1 min-w-0">
            <div class="relative flex-shrink-0">
              <template v-if="profile.avatar_url">
                <img :src="profile.avatar_url" :alt="profile.full_name || 'User'" class="w-12 h-12 rounded-2xl object-cover shadow-sm ring-2 ring-white" referrerpolicy="no-referrer" />
              </template>
              <div v-else class="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white" :style="{ backgroundColor: getRandomColor(profile.full_name) }">
                {{ profile.full_name?.charAt(0) || 'U' }}
              </div>
              <div v-if="profile.status === 'active'" class="absolute -bottom-1 -right-1 w-4 h-4 bg-green border-2 border-white rounded-full"></div>
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-bold text-sm text-text truncate">{{ profile.full_name || 'Anonymous Member' }}</p>
              <p class="text-xs text-text-3 font-medium truncate">{{ profile.auth_users?.email || profile.email || 'No email' }}</p>
              <div class="flex items-center gap-3 mt-2 flex-wrap">
                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tight', profile.role === 'admin' ? 'bg-accent-light text-accent' : profile.user_type === 'barista' ? 'bg-accent-light text-accent' : 'bg-blue-50 text-blue-700']">
                  {{ profile.role === 'admin' ? 'Admin' : profile.user_type === 'barista' ? 'Barista' : 'Customer' }}
                </span>
                <div class="flex items-center gap-1.5">
                  <div :class="['w-1.5 h-1.5 rounded-full', profile.status === 'active' ? 'bg-green' : profile.status === 'pending' ? 'bg-orange-400' : 'bg-red']"></div>
                  <span :class="['text-xs font-bold', profile.status === 'active' ? 'text-green' : profile.status === 'pending' ? 'text-orange-600' : 'text-red']">{{ profile.status === 'active' ? 'Verified' : profile.status === 'pending' ? 'Pending' : 'Suspended' }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-1 flex-shrink-0">
             <button v-if="profile.status === 'pending'" @click="verifyAccount(profile)" class="p-2 text-text-3 hover:text-green transition-colors">
               <Icon name="solar:check-circle-broken" class="w-5 h-5" />
             </button>
             <button v-if="profile.status === 'suspended'" @click="toggleSuspend(profile)" class="p-2 text-text-3 hover:text-green transition-colors">
               <Icon name="solar:check-circle-broken" class="w-5 h-5" />
             </button>
             <button v-else-if="profile.status !== 'pending' && profile.role !== 'admin'" @click="toggleSuspend(profile)" class="p-2 text-text-3 hover:text-red transition-colors">
               <Icon name="solar:close-circle-broken" class="w-5 h-5" />
             </button>
             <button v-if="profile.role !== 'admin'" @click="deleteUser(profile)" class="p-2 text-text-3 hover:text-red-600 transition-colors">
               <Icon name="solar:trash-bin-minimalistic-broken" class="w-5 h-5" />
             </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-border/50">
          <div>
            <p class="text-[10px] text-text-3 font-bold uppercase tracking-tighter mb-0.5">Financials</p>
            <p class="font-bold text-sm text-text">${{ (profile.total_sales || profile.total_spend || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</p>
          </div>
          <div>
            <p class="text-[10px] text-text-3 font-bold uppercase tracking-tighter mb-0.5">Joined</p>
            <p class="text-sm font-medium text-text-2">{{ formatDate(profile.created_at) }}</p>
          </div>
        </div>
      </template>

      <template #default="{ items }">
        <tr v-for="profile in $refs.table?.paginatedItems || items" :key="profile.id" class="hover:bg-slate-50 transition-colors group">
          <td class="px-4 sm:px-8 py-4 sm:py-5">
            <div class="flex items-center gap-4">
              <div class="relative">
                <template v-if="profile.avatar_url">
                  <img :src="profile.avatar_url" :alt="profile.full_name || 'User'" class="w-11 h-11 rounded-2xl object-cover shadow-sm ring-2 ring-white" referrerpolicy="no-referrer" />
                </template>
                <div v-else class="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white" :style="{ backgroundColor: getRandomColor(profile.full_name) }">
                  {{ profile.full_name?.charAt(0) || 'U' }}
                </div>
                <div v-if="profile.status === 'active'" class="absolute -bottom-1 -right-1 w-4 h-4 bg-green border-2 border-white rounded-full"></div>
              </div>
              <div>
                <p class="font-bold text-sm text-text">{{ profile.full_name || 'Anonymous Member' }}</p>
                <p class="text-xs text-text-3 font-medium">{{ profile.auth_users?.email || profile.email || 'No email' }}</p>
              </div>
            </div>
          </td>
          <td class="px-4 sm:px-8 py-4 sm:py-5">
            <span :class="['inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight', profile.role === 'admin' ? 'bg-accent-light text-accent' : profile.user_type === 'barista' ? 'bg-accent-light text-accent' : 'bg-blue-50 text-blue-700']">
              {{ profile.role === 'admin' ? 'Admin' : profile.user_type === 'barista' ? 'Barista' : 'Customer' }}
            </span>
          </td>
          <td class="px-4 sm:px-8 py-4 sm:py-5">
            <div class="flex items-center gap-2">
              <div :class="['w-1.5 h-1.5 rounded-full ring-4', profile.status === 'active' ? 'bg-green ring-green-bg' : profile.status === 'pending' ? 'bg-orange-400 ring-orange-50' : 'bg-red ring-red-bg']"></div>
              <span :class="['text-xs font-bold', profile.status === 'active' ? 'text-green' : profile.status === 'pending' ? 'text-orange-600' : 'text-red']">{{ profile.status === 'active' ? 'Verified' : profile.status === 'pending' ? 'Pending' : 'Suspended' }}</span>
            </div>
          </td>
          <td class="px-4 sm:px-8 py-4 sm:py-5">
            <p class="font-bold text-sm text-text">${{ (profile.total_sales || profile.total_spend || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</p>
            <p class="text-[10px] text-text-3 font-bold uppercase tracking-tighter">{{ profile.user_type === 'barista' ? 'Total Sales' : 'Total Spend' }}</p>
          </td>
          <td class="px-4 sm:px-8 py-4 sm:py-5 text-xs text-text-2 font-medium">{{ formatDate(profile.created_at) }}</td>
          <td class="px-4 sm:px-8 py-4 sm:py-5 text-right">
            <div class="flex justify-end gap-1">
              <button v-if="profile.status === 'pending'" @click="verifyAccount(profile)" class="group/verify p-2 hover:bg-white rounded-xl text-text-3 hover:text-green transition-all shadow-sm hover:ring-1 ring-border relative">
                <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-black text-white text-xs font-medium rounded-md opacity-0 invisible group-hover/verify:opacity-100 group-hover/verify:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                  Verify Account
                  <div class="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-black"></div>
                </div>
              </button>
              <button v-if="profile.status === 'suspended'" @click="toggleSuspend(profile)" class="group/unsuspend p-2 hover:bg-white rounded-xl text-text-3 hover:text-green transition-all shadow-sm hover:ring-1 ring-border relative">
                <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-black text-white text-xs font-medium rounded-md opacity-0 invisible group-hover/unsuspend:opacity-100 group-hover/unsuspend:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                  Unsuspend
                  <div class="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-black"></div>
                </div>
              </button>
              <button v-else-if="profile.status !== 'pending' && profile.role !== 'admin'" @click="toggleSuspend(profile)" class="group/suspend  hover:bg-white rounded-full w-8 h-8 flex items-center justify-center  text-text-3 hover:text-red transition-all shadow-sm hover:ring-1 ring-border relative">
                 <Icon name="solar:close-circle-broken" class="w-[18px] h-[18px]" />
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-black text-white text-xs font-medium rounded-md opacity-0 invisible group-hover/suspend:opacity-100 group-hover/suspend:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                  Suspend
                  <div class="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-black"></div>
                </div>
              </button>
               <button v-if="profile.role !== 'admin'" @click="deleteUser(profile)" class="group/delete p-2 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center  text-text-3 hover:text-red-600 transition-all shadow-sm hover:ring-1 ring-border relative">
                 <Icon name="solar:trash-bin-minimalistic-broken" class="w-[18px] h-[18px]" />
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-black text-white text-xs font-medium rounded-md opacity-0 invisible group-hover/delete:opacity-100 group-hover/delete:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                  Delete User
                  <div class="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-black"></div>
                </div>
              </button>
            </div>
          </td>
        </tr>
      </template>
    </AdminTable>

    <!-- Contextual Help / Action Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="relative rounded-3xl p-8 overflow-hidden group bg-[#432818]">
        <div class="relative z-10">
          <span class="inline-block px-3 py-1 bg-[#5D3A1A] text-[#DDB892] rounded-full text-[10px] font-black uppercase tracking-widest mb-4">New Program</span>
          <h4 class="text-2xl font-black text-white mb-3 tracking-tight">Barista Certification</h4>
          <p class="text-[#E6CCB2]/70 text-sm font-medium mb-6 max-w-sm leading-relaxed">Streamline your verification process by setting up automated checks for professional certifications.</p>
          <button class="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#2B170C]/50 active:scale-95">
            Manage Automation
          </button>
        </div>
         <Icon name="solar:shield-broken" class="absolute -right-6 -bottom-6 w-[180px] h-[180px] text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
      </div>

      <div class="bg-white border border-border rounded-3xl p-8 flex flex-col justify-between shadow-sm">
        <div>
          <h4 class="text-xl font-extrabold text-text mb-3 tracking-tight">Need Assistance?</h4>
          <p class="text-text-2 text-sm font-medium leading-relaxed">Our administrative support team is available to help with complex user disputes or platform policy issues.</p>
        </div>
        <div class="flex gap-6 pt-6 mt-6 border-t border-border/50">
          <a href="#" class="font-black text-xs uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all text-accent">
             View Guidelines <Icon name="solar:arrow-right-broken" class="w-4 h-4" />
          </a>
          <a href="#" class="font-black text-xs uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all text-accent">
             Contact Support <Icon name="solar:arrow-right-broken" class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>

    <ConfirmModal ref="confirmModal" title="Delete User" message="This will permanently delete this user and all their associated data. This action cannot be undone." confirmText="Delete User" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const client = useSupabaseClient()
const api = useApi()
const searchQuery = ref('')
const activeTab = ref('all')
const users = ref([])

const loadUsers = async () => {
  try {
    const { data } = await api.get('/api/admin/users')
    users.value = data || []
  } catch (err) {
    console.error('Failed to load users:', err)
    users.value = []
  }
}

await loadUsers()

const refreshUsers = async () => {
  await loadUsers()
}

const totalUsers = computed(() => users.value?.length || 0)

const tableHeaders = [
  { key: 'user', label: 'User Details' },
  { key: 'type', label: 'Type', hiddenOn: ['sm'] },
  { key: 'status', label: 'Status' },
  { key: 'financials', label: 'Financials', hiddenOn: ['sm', 'md'] },
  { key: 'joinDate', label: 'Join Date', hiddenOn: ['sm', 'md'] },
  { key: 'actions', label: 'Actions', align: 'right', hiddenOn: ['sm'] }
]

const stats = computed(() => {
  const all = users.value || []
  const customers = all.filter(u => u.user_type !== 'barista' && u.role !== 'admin').length
  const pending = all.filter(u => u.status === 'pending').length
  const active = all.filter(u => u.status === 'active').length
  const suspended = all.filter(u => u.status === 'suspended').length
  const total = all.length

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

  const recentCustomers = all.filter(u => u.user_type !== 'barista' && u.role !== 'admin' && new Date(u.created_at) >= thirtyDaysAgo).length
  const prevCustomers = all.filter(u => u.user_type !== 'barista' && u.role !== 'admin' && new Date(u.created_at) >= sixtyDaysAgo && new Date(u.created_at) < thirtyDaysAgo).length

  const activePercent = total > 0 ? Math.round((active / total) * 100) : null
  const suspendedPercent = total > 0 ? Math.round((suspended / total) * 100) : null

  return {
    customers,
    pending,
    active,
    suspended,
    total,
    activePercent,
    suspendedPercent,
    customerTrend: prevCustomers > 0 ? Math.round(((recentCustomers - prevCustomers) / prevCustomers) * 100) : (recentCustomers > 0 ? 100 : null),
  }
})

const filteredUsers = computed(() => {
  if (!users.value) return []
  let filtered = users.value

  if (activeTab.value === 'active') {
    filtered = filtered.filter(u => u.status === 'active')
  } else if (activeTab.value === 'suspended') {
    filtered = filtered.filter(u => u.status === 'suspended')
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(u =>
      u.full_name?.toLowerCase().includes(query) ||
      u.auth_users?.email?.toLowerCase().includes(query) ||
      u.email?.toLowerCase().includes(query) ||
      u.id.toLowerCase().includes(query)
    )
  }

  return filtered
})

const getRandomColor = (name) => {
  const colors = ['#7221ED', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
  if (!name) return colors[0]
  const index = name.length % colors.length
  return colors[index]
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

const confirmModal = ref(null)

const verifyAccount = async (profile) => {
  try {
    await api.post('/api/admin/users/update', { id: profile.id, status: 'active' })
    refreshUsers()
  } catch (err) {
    console.error('Error verifying account:', err)
  }
}

const toggleSuspend = async (profile) => {
  const newStatus = profile.status === 'suspended' ? 'active' : 'suspended'
  try {
    await api.post('/api/admin/users/update', { id: profile.id, status: newStatus })
    refreshUsers()
  } catch (err) {
    console.error('Error toggling suspend:', err)
  }
}

const deleteUser = async (profile) => {
  if (!confirmModal.value) return
  const confirmed = await confirmModal.value.open()
  if (!confirmed) return

  try {
    await api.delete(`/api/admin/users/${profile.id}`)
    refreshUsers()
  } catch (err) {
    console.error('Error deleting user:', err)
  }
}
</script>
