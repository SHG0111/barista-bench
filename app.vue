<template>
  <NuxtLayout>
    <div v-if="showEmailBanner" class="sticky top-0 z-50 bg-accent/10 border-b border-accent/20 px-4 py-3">
      <div class="container mx-auto flex items-center justify-between gap-4">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <Icon name="solar:letter-broken" class="w-5 h-5 text-accent shrink-0" />
          <p class="text-sm text-accent font-medium">
            <span class="font-bold">Email not verified.</span> Please check your inbox and click the confirmation link to unlock your full account.
          </p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <a :href="mailtoLink" target="_blank" rel="noopener noreferrer" class="text-xs font-semibold text-accent underline hover:no-underline transition-colors">
            Open mail inbox
          </a>
          <button @click="resendEmail" :disabled="resendLoading" class="text-xs font-semibold text-accent underline hover:no-underline transition-colors disabled:opacity-50">
            {{ resendLoading ? 'Sending...' : 'Resend email' }}
          </button>
          <button @click="dismissBanner" class="text-accent/60 hover:text-accent transition-colors">
            <Icon name="solar:close-circle-broken" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient()
const route = useRoute()
const { success, error } = useToast()

const resendLoading = ref(false)
const resendCooldown = ref(false)

const showEmailBanner = computed(() => {
  if (!user.value) return false
  if (route.path.startsWith('/admin')) return false
  if (process.client && sessionStorage.getItem('emailBannerDismissed')) return false
  
  const emailConfirmed = user.value.email_confirmed_at || user.value.user_metadata?.email_verified
  return !emailConfirmed
})

const mailtoLink = computed(() => {
  const email = user.value?.email || ''
  const domain = email.split('@')[1]?.toLowerCase() || ''
  if (domain === 'gmail.com') return 'https://mail.google.com'
  if (domain === 'yahoo.com' || domain === 'ymail.com') return 'https://mail.yahoo.com'
  if (domain === 'outlook.com' || domain === 'hotmail.com' || domain === 'live.com') return 'https://outlook.live.com'
  if (domain === 'icloud.com' || domain === 'me.com') return 'https://www.icloud.com/mail'
  return `mailto:${email}`
})

const dismissBanner = () => {
  if (process.client) sessionStorage.setItem('emailBannerDismissed', 'true')
}

const resendEmail = async () => {
  if (!user.value || resendLoading.value || resendCooldown.value) return
  resendLoading.value = true
  const { error: err } = await client.auth.resend({
    type: 'signup',
    email: user.value.email
  })
  resendLoading.value = false
  if (err) {
    if (err.message?.includes('429') || err.message?.includes('rate limit') || err.message?.includes('too many')) {
      error('Too many requests. Please wait a minute before trying again.')
      resendCooldown.value = true
      setTimeout(() => { resendCooldown.value = false }, 60000)
    } else {
      error('Failed to resend confirmation email.')
    }
  } else {
    success('Confirmation email sent! Check your inbox.')
  }
}

watch(() => route.fullPath, () => {
  showEmailBanner.value
})
</script>
