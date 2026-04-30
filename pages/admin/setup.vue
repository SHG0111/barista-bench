<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-950 p-6 font-sans">
    <div class="w-full max-w-md space-y-8 bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl">
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight text-white bg-gradient-to-r from-white to-brand bg-clip-text text-transparent">Admin Bootstrap</h1>
        <p class="mt-2 text-sm text-slate-400">Initialize the core administrator account.</p>
      </div>

      <form @submit.prevent="handleSetup" class="space-y-6">
        <div class="space-y-2">
          <label class="text-xs font-bold uppercase tracking-widest text-slate-500 pl-1">Email Address</label>
          <input type="email" v-model="form.email" required class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all" placeholder="admin@baristabench.com" />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold uppercase tracking-widest text-slate-500 pl-1">Password</label>
          <input type="password" v-model="form.password" required class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all" placeholder="••••••••" />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold uppercase tracking-widest text-slate-500 pl-1">Full Name</label>
          <input type="text" v-model="form.fullName" required class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all" placeholder="System Admin" />
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-brand hover:bg-brand-light text-white font-bold py-4 rounded-xl shadow-lg shadow-brand/20 transform active:scale-[0.98] transition-all disabled:opacity-50">
          {{ loading ? 'Initializing...' : 'Create Admin Account' }}
        </button>

        <div v-if="message" :class="['p-4 rounded-xl text-xs font-medium border', messageType === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400']">
          {{ message }}
        </div>
      </form>

      <div class="pt-8 border-t border-white/10">
        <h3 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Manual Activation</h3>
        <div class="bg-black/40 rounded-xl p-4 font-mono text-[10px] text-emerald-500 overflow-x-auto whitespace-pre">-- Promote user to admin
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = 'USER_ID';</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const loading = ref(false)
const message = ref('')
const messageType = ref('')

const form = ref({
  email: 'admin@baristabench.com',
  password: '',
  fullName: 'Barista Admin'
})

const handleSetup = async () => {
  loading.value = true
  message.value = ''
  try {
    const { error: authError } = await client.auth.signUp({
      email: form.value.email,
      password: form.value.password,
      options: { data: { full_name: form.value.fullName } }
    })
    if (authError) throw authError
    message.value = 'Success! Now manually set the "admin" role in Supabase SQL editor.'
    messageType.value = 'success'
  } catch (err) {
    message.value = err.message
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>
