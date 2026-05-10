<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold">Profile Settings</h2>
    <div class="bg-surface rounded-lg p-6 shadow-sm border border-border/50">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-[11px] font-bold tracking-widest uppercase text-text-2 mb-1.5">Full Name</label>
          <input v-model="localFullName" class="w-full px-3.5 py-2.5 bg-surface border-[1.5px] border-border rounded font-body text-sm text-text outline-none focus:border-accent transition-colors" />
        </div>
        <div>
          <label class="block text-[11px] font-bold tracking-widest uppercase text-text-2 mb-1.5">Email</label>
          <input :value="user?.email" class="w-full px-3.5 py-2.5 bg-surface border-[1.5px] border-border rounded font-body text-sm text-text outline-none opacity-50 cursor-not-allowed" disabled />
        </div>
      </div>
      <button class="btn btn-primary mt-5" @click="save" :disabled="saving">
        {{ saving ? "Saving..." : "Save Changes" }}
      </button>
    </div>

    <div class="bg-surface rounded-lg p-6 shadow-sm border border-border/50" v-if="user?.app_metadata?.provider === 'email'">
      <h3 class="text-sm font-bold tracking-wider uppercase mb-5">SECURITY</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-[11px] font-bold tracking-widest uppercase text-text-2 mb-1.5">New Password</label>
          <input v-model="localPassword.new" type="password" class="w-full px-3.5 py-2.5 bg-surface border-[1.5px] border-border rounded font-body text-sm text-text outline-none focus:border-accent transition-colors" placeholder="••••••••" />
        </div>
        <div>
          <label class="block text-[11px] font-bold tracking-widest uppercase text-text-2 mb-1.5">Confirm Password</label>
          <input v-model="localPassword.confirm" type="password" class="w-full px-3.5 py-2.5 bg-surface border-[1.5px] border-border rounded font-body text-sm text-text outline-none focus:border-accent transition-colors" placeholder="••••••••" />
        </div>
      </div>
      <button class="btn btn-outline mt-5" @click="updatePw" :disabled="changingPassword">
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
</template>

<script setup lang="ts">
import { z } from 'zod'

const props = defineProps({
  user: { type: Object, default: null },
  fullName: { type: String, default: '' },
  saving: { type: Boolean, default: false },
  changingPassword: { type: Boolean, default: false },
})

const emit = defineEmits<{
  saveSettings: [name: string]
  updatePassword: [newPw: string, confirmPw: string]
}>()

const toast = useToast()
const localFullName = ref(props.fullName)
const localPassword = reactive({ new: '', confirm: '' })

const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
})

const passwordSchema = z.object({
  new: z.string().min(6, 'Password must be at least 6 characters'),
  confirm: z.string(),
}).refine(data => data.new === data.confirm, { message: 'Passwords do not match' })

watch(() => props.fullName, (val) => { localFullName.value = val })

function save() {
  const validation = profileSchema.safeParse({ full_name: localFullName.value })
  if (!validation.success) {
    toast.error(validation.error.issues[0]?.message || 'Validation failed')
    return
  }
  emit('saveSettings', localFullName.value)
}

function updatePw() {
  const validation = passwordSchema.safeParse(localPassword)
  if (!validation.success) {
    toast.error(validation.error.issues[0]?.message || 'Validation failed')
    return
  }
  emit('updatePassword', localPassword.new, localPassword.confirm)
  localPassword.new = ''
  localPassword.confirm = ''
}
</script>
