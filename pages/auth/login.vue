<template>
  <div class="auth-page">
    <div class="auth-left">
      <div class="auth-brand">
        <div class="auth-logo">
          <div class="logo-box"><span>BB</span></div>
          <span>BARISTA BENCH</span>
        </div>
        <h2 class="auth-tagline">Precision tools for<br />meticulous rituals.</h2>
        <div class="auth-stats">
          <div class="as-item"><span class="as-num">15k+</span><span class="as-label">Baristas</span></div>
          <div class="as-item"><span class="as-num">4.9★</span><span class="as-label">Average rating</span></div>
          <div class="as-item"><span class="as-num">50+</span><span class="as-label">Premium tools</span></div>
        </div>
      </div>
      <div class="auth-left-visual">
        <div class="auth-mock-product">
          <div class="amp-body"></div>
          <div class="amp-handle"></div>
        </div>
      </div>
    </div>

    <div class="auth-right">
      <div class="auth-form-wrap">
        <NuxtLink to="/" class="back-link">← Back to site</NuxtLink>

        <div class="auth-tabs">
          <button :class="{ active: mode === 'login' }" @click="mode = 'login'">Sign In</button>
          <button :class="{ active: mode === 'register' }" @click="mode = 'register'">Create Account</button>
        </div>

        <form class="auth-form" @submit.prevent="handleSubmit">
          <div v-if="mode === 'register'">
            <label class="input-label">Full Name</label>
            <input v-model="form.fullName" class="input" placeholder="Alex Rivers" style="margin-bottom:16px" />
          </div>
          <label class="input-label">Email Address</label>
          <input v-model="form.email" type="email" class="input" placeholder="you@example.com" style="margin-bottom:16px" />
          <label class="input-label">Password</label>
          <div class="password-wrapper" style="margin-bottom:24px">
            <input 
              v-model="form.password" 
              :type="showPassword ? 'text' : 'password'" 
              class="input" 
              placeholder="••••••••" 
            />
            <button type="button" class="password-toggle" @click="showPassword = !showPassword">
              <Icon v-if="!showPassword" name="solar:eye-broken" width="18" height="18" />
              <Icon v-else name="solar:eye-closed-broken" width="18" height="18" />
            </button>
          </div>

          <p v-if="authError" class="auth-error">{{ authError }}</p>
          <p v-if="authSuccess" class="auth-success">{{ authSuccess }}</p>

          <button type="submit" class="btn btn-primary btn-full btn-lg" :disabled="loading">
            {{ loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account') }}
          </button>

          <div class="auth-divider"><span>or continue with</span></div>

          <button type="button" class="btn btn-outline btn-full" @click="signInWithGoogle">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
        </form>

        <p class="auth-footer-note">
          By continuing, you agree to our
          <NuxtLink to="/terms">Terms of Service</NuxtLink> and <NuxtLink to="/privacy">Privacy Policy</NuxtLink>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'clean' })

const supabase = useSupabaseClient()
const { success } = useToast()

const mode = ref<'login' | 'register'>('login')
const loading = ref(false)
const showPassword = ref(false)
const authError = ref('')
const authSuccess = ref('')
const form = reactive({ email: '', password: '', fullName: '' })

const route = useRoute()

onMounted(() => {
  if (route.query.error === 'timeout') {
    authError.value = 'Signing in took too long. Please try again.'
  }
})

async function handleSubmit() {
  authError.value = ''
  authSuccess.value = ''
  loading.value = true
  if (mode.value === 'login') {
    const { error, data } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
    if (error) { authError.value = error.message }
    else {
      const adminEmail = 'admin@bench.bb'
      if (data.user?.email === adminEmail || data.user?.app_metadata?.role === 'admin') {
        await navigateTo('/admin')
      } else {
        await navigateTo('/account')
      }
    }
  } else {
    const { error, data } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { full_name: form.fullName } },
    })
    if (error) {
      if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
        authError.value = 'An account with this email already exists. Please sign in instead.'
      } else {
        authError.value = error.message
      }
    } else {
      if (data.user && !data.user.email_confirmed_at) {
        authSuccess.value = 'Check your email to confirm your account.'
      } else {
        await navigateTo('/account')
      }
    }
  }
  loading.value = false
}

async function signInWithGoogle() {
  loading.value = true
  authError.value = ''
  const { error } = await supabase.auth.signInWithOAuth({ 
    provider: 'google', 
    options: { redirectTo: `${window.location.origin}/auth/confirm` } 
  })
  if (error) {
    authError.value = error.message
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
.auth-left { background: var(--bg-dark); padding: 48px; display: flex; flex-direction: column; justify-content: space-between; }
.auth-brand { }
.auth-logo { display: flex; align-items: center; gap: 10px; color: white; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 40px; }
.logo-box { width: 28px; height: 28px; background: white; border-radius: 5px; display: flex; align-items: center; justify-content: center; }
.logo-box span { color: black; font-size: 9px; font-weight: 800; }
.auth-tagline { font-size: 36px; color: white; line-height: 1.2; margin-bottom: 32px; }
.auth-stats { display: flex; gap: 32px; }
.as-item { display: flex; flex-direction: column; }
.as-num { font-size: 22px; font-weight: 700; color: white; }
.as-label { font-size: 11px; color: #555; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px; }
.auth-left-visual { display: flex; justify-content: center; align-items: center; }
.auth-mock-product { position: relative; }
.amp-body { width: 90px; height: 200px; background: linear-gradient(135deg, #2A2825, #1A1816); border-radius: 12px 12px 20px 20px; box-shadow: inset -4px 0 12px rgba(0,0,0,0.5), 0 20px 60px rgba(0,0,0,0.4); }
.amp-handle { width: 110px; height: 8px; background: #4A3828; border-radius: 4px; margin: -90px auto 0; transform: rotate(-12deg); }
.auth-right { background: var(--bg); display: flex; align-items: center; justify-content: center; padding: 48px; }
.auth-form-wrap { width: 100%; max-width: 400px; }
.back-link { display: inline-block; font-size: 13px; color: var(--text-2); text-decoration: none; margin-bottom: 32px; }
.back-link:hover { color: var(--text); }
.auth-tabs { display: flex; gap: 0; margin-bottom: 28px; border-bottom: 2px solid var(--border); }
.auth-tabs button { background: none; border: none; padding: 10px 0; font-size: 15px; font-weight: 600; cursor: pointer; color: var(--text-3); font-family: var(--font-body); margin-right: 24px; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.15s; }
.auth-tabs button.active { color: var(--text); border-bottom-color: var(--text); }
.auth-form { display: flex; flex-direction: column; }
.auth-error { color: var(--red); font-size: 13px; background: var(--red-bg); padding: 10px 14px; border-radius: var(--radius); margin-bottom: 14px; }
.auth-success { color: var(--green); font-size: 13px; background: var(--green-bg); padding: 10px 14px; border-radius: var(--radius); margin-bottom: 14px; }
.auth-divider { text-align: center; margin: 20px 0; position: relative; }
.auth-divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--border); }
.auth-divider span { position: relative; background: var(--bg); padding: 0 12px; font-size: 12px; color: var(--text-3); }
.auth-footer-note { font-size: 11.5px; color: var(--text-3); margin-top: 20px; text-align: center; line-height: 1.6; }
.auth-footer-note a { color: var(--text-2); text-decoration: underline; }

.password-wrapper { position: relative; display: flex; align-items: center; }
.password-toggle { position: absolute; right: 12px; background: none; border: none; padding: 4px; color: var(--text-3); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: color 0.2s; }
.password-toggle:hover { color: var(--text); }
</style>
