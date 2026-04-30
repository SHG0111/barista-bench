<template>
  <NuxtLayout>
    <!-- Email Confirmation Banner -->
    <div v-if="showEmailBanner" class="sticky top-0 z-50 bg-accent/10 border-b border-accent/20 px-4 py-3">
      <div class="container mx-auto flex items-center justify-between gap-4">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <svg class="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p class="text-sm text-accent font-medium">
            <span class="font-bold">Email not verified.</span> Please check your inbox and click the confirmation link to unlock your full account.
          </p>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button @click="resendEmail" class="text-xs font-semibold text-accent underline hover:no-underline transition-colors">
            Resend email
          </button>
          <button @click="dismissBanner" class="text-accent/60 hover:text-accent transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    </div>
    <NuxtPage />
  </NuxtLayout>
  <ToastContainer />
</template>

<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient()
const route = useRoute()

const showEmailBanner = computed(() => {
  if (!user.value) return false
  if (route.path.startsWith('/admin')) return false
  if (sessionStorage.getItem('emailBannerDismissed')) return false
  
  const emailConfirmed = user.value.email_confirmed_at || user.value.user_metadata?.email_verified
  return !emailConfirmed
})

const dismissBanner = () => {
  sessionStorage.setItem('emailBannerDismissed', 'true')
}

const resendEmail = async () => {
  if (!user.value) return
  const { error } = await client.auth.resend({
    type: 'signup',
    email: user.value.email
  })
  if (error) {
    alert('Failed to resend confirmation email. Please try again.')
  } else {
    alert('Confirmation email sent! Check your inbox.')
  }
}
</script>
