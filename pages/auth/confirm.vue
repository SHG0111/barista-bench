<template>
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg)">
    <div style="text-align:center">
      <div style="font-size:32px;margin-bottom:16px">✓</div>
      <h2>Confirming your account...</h2>
      <p style="color:var(--text-2);margin-top:8px">You'll be redirected in a moment.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'clean' })
onMounted(() => {
  setTimeout(() => navigateTo('/account'), 2000)
})
</script>
