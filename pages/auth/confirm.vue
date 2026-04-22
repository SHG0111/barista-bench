<template>
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg)">
    <div style="text-align:center;max-width:400px;padding:24px">
      <div v-if="!debugError">
        <div style="font-size:32px;margin-bottom:16px">✓</div>
        <h2>Confirming your account...</h2>
        <p style="color:var(--text-2);margin-top:8px">You'll be redirected in a moment.</p>
      </div>

      <div v-else style="color: var(--red); background: var(--red-bg); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,0,0,0.1)">
        <div style="font-size:24px;margin-bottom:12px">⚠️</div>
        <h3 style="margin-bottom:8px">Login Issue</h3>
        <p style="font-size:14px;line-height:1.6;margin-bottom:20px">{{ debugError }}</p>
        <NuxtLink to="/auth/login" class="btn btn-outline" style="display:inline-block">Back to Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'clean' })
const user = useSupabaseUser()
const route = useRoute()
const debugError = ref('')

// Check for errors in the URL hash or query (Google/Supabase often send errors here)
onMounted(() => {
  const hash = window.location.hash
  if (hash.includes('error_description')) {
    debugError.value = decodeURIComponent(hash.split('error_description=')[1].split('&')[0])
  } else if (route.query.error_description) {
    debugError.value = String(route.query.error_description)
  }
})

watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/account')
  }
}, { immediate: true })

onMounted(() => {
  setTimeout(() => {
    if (!user.value && !debugError.value) {
      navigateTo('/auth/login?error=timeout')
    }
  }, 8000) // Increased to 8 seconds for slower networks
})
</script>

