<template>
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg)">
    <div style="text-align:center;max-width:400px;padding:24px">
      <div v-if="processing">
        <svg style="animation:spin 0.8s linear infinite;margin-bottom:16px" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
        <h2>Confirming your account...</h2>
        <p style="color:var(--text-2);margin-top:8px">Please wait.</p>
      </div>

      <div v-else-if="debugError" style="color:var(--red);background:var(--red-bg);padding:24px;border-radius:12px;border:1px solid rgba(255,0,0,0.1)">
        <div style="font-size:24px;margin-bottom:12px">⚠️</div>
        <h3 style="margin-bottom:8px">Confirmation Failed</h3>
        <p style="font-size:14px;line-height:1.6;margin-bottom:20px">{{ debugError }}</p>
        <NuxtLink to="/auth/login" class="btn btn-outline" style="display:inline-block">Back to Login</NuxtLink>
      </div>

      <div v-else style="color:var(--green);background:var(--green-bg);padding:24px;border-radius:12px;border:1px solid rgba(0,180,80,0.1)">
        <div style="font-size:40px;margin-bottom:12px">✓</div>
        <h3 style="margin-bottom:8px">Email Confirmed!</h3>
        <p style="font-size:14px;line-height:1.6;margin-bottom:20px">Your email has been confirmed. You can now sign in.</p>
        <NuxtLink to="/auth/login" class="btn btn-primary" style="display:inline-block">Sign In</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'clean' })

const route = useRoute()
const client = useSupabaseClient()
const processing = ref(true)
const debugError = ref('')

onMounted(async () => {
  const hash = window.location.hash
  const query = route.query

  if (hash.includes('error_description')) {
    debugError.value = decodeURIComponent(hash.split('error_description=')[1]?.split('&')[0] || '')
    processing.value = false
    return
  }

  if (query.error_description) {
    debugError.value = String(query.error_description)
    processing.value = false
    return
  }

  if (hash.includes('access_token') || query.access_token) {
    try {
      const hashParams = hash ? new URLSearchParams(hash.substring(1)) : new URLSearchParams()
      const accessToken = query.access_token?.toString() || hashParams.get('access_token') || ''
      const refreshToken = query.refresh_token?.toString() || hashParams.get('refresh_token') || ''

      if (accessToken && refreshToken) {
        const { error } = await client.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        if (error) {
          debugError.value = 'This confirmation link is invalid or has expired.'
        }
      }
    } catch (e) {
      debugError.value = 'Failed to process confirmation link.'
    }
  }

  processing.value = false

  if (!debugError.value) {
    setTimeout(() => {
      navigateTo('/auth/login')
    }, 3000)
  }
})
</script>

<style scoped>
@keyframes spin { to { transform: rotate(360deg); } }
</style>
