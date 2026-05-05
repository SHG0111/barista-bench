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

        <div v-if="tokenError" class="auth-card auth-card--error">
          <div class="auth-card__icon auth-card__icon--error">
            <Icon name="solar:danger-broken" width="28" height="28" />
          </div>
          <h2 class="auth-card__title">Invalid or Expired Link</h2>
          <p class="auth-card__text">{{ tokenError }}</p>
          <NuxtLink to="/auth/login" class="btn btn-outline btn-full">Request New Reset Link</NuxtLink>
        </div>

        <div v-else-if="processingToken" class="auth-card auth-card--loading">
          <div class="auth-card__icon auth-card__icon--loading">
            <svg class="auth-spinner" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
          </div>
          <h2 class="auth-card__title">Verifying your link...</h2>
          <p class="auth-card__text">Please wait while we verify your reset link.</p>
        </div>

        <template v-else-if="passwordReset">
          <div class="auth-card auth-card--success">
            <div class="auth-card__icon auth-card__icon--success">
              <Icon name="solar:shield-check-broken" width="28" height="28" />
            </div>
            <h2 class="auth-card__title">Password Updated</h2>
            <p class="auth-card__text">Your password has been reset successfully. You can now sign in with your new password.</p>
            <NuxtLink to="/auth/login" class="btn btn-primary btn-full">Sign In</NuxtLink>
          </div>
        </template>

        <template v-else>
          <div class="auth-header">
            <div class="auth-header__icon">
              <Icon name="solar:lock-password-broken" width="28" height="28" />
            </div>
            <h1 class="auth-header__title">Reset Password</h1>
            <p class="auth-header__desc">Enter your new password below.</p>
          </div>

          <form class="auth-form" @submit.prevent="handleUpdate">
            <label class="input-label">New Password</label>
            <div class="password-wrapper">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="input"
                placeholder="••••••••"
                autocomplete="new-password"
              />
              <button type="button" class="password-toggle" @click="showPassword = !showPassword">
                <Icon v-if="!showPassword" name="solar:eye-broken" width="18" height="18" />
                <Icon v-else name="solar:eye-closed-broken" width="18" height="18" />
              </button>
            </div>

            <div v-if="password" class="pw-requirements">
              <div class="pw-req" :class="{ met: password.length >= 8 }">
                <Icon name="solar:check-circle-broken" width="14" height="14" v-if="password.length >= 8" />
                <Icon name="solar:circle-broken" width="14" height="14" v-else />
                At least 8 characters
              </div>
              <div class="pw-req" :class="{ met: /[a-zA-Z]/.test(password) }">
                <Icon name="solar:check-circle-broken" width="14" height="14" v-if="/[a-zA-Z]/.test(password)" />
                <Icon name="solar:circle-broken" width="14" height="14" v-else />
                At least one letter
              </div>
              <div class="pw-req" :class="{ met: /[^a-zA-Z0-9]/.test(password) }">
                <Icon name="solar:check-circle-broken" width="14" height="14" v-if="/[^a-zA-Z0-9]/.test(password)" />
                <Icon name="solar:circle-broken" width="14" height="14" v-else />
                At least one symbol
              </div>
            </div>

            <label class="input-label">Confirm Password</label>
            <div class="password-wrapper">
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="input"
                placeholder="••••••••"
                autocomplete="new-password"
              />
              <button type="button" class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                <Icon v-if="!showConfirmPassword" name="solar:eye-broken" width="18" height="18" />
                <Icon v-else name="solar:eye-closed-broken" width="18" height="18" />
              </button>
            </div>

            <p v-if="passwordMatch === false" class="match-error">Passwords do not match</p>

            <p v-if="authError" class="auth-error">{{ authError }}</p>

            <button type="submit" class="btn btn-primary btn-full btn-lg" :disabled="loading">
              {{ loading ? 'Please wait...' : 'Reset Password' }}
            </button>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'clean' })

const supabase = useSupabaseClient()
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const password = ref('')
const confirmPassword = ref('')
const authError = ref('')
const processingToken = ref(true)
const tokenError = ref('')
const passwordReset = ref(false)

onMounted(async () => {
  processingToken.value = true
  tokenError.value = ''

  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      tokenError.value = 'This password reset link is invalid or has expired. Please request a new one.'
    } else if (data.session) {
      processingToken.value = false
    } else {
      const hash = window.location.hash
      if (hash && hash.includes('access_token')) {
        const { data: exchData, error: exchError } = await supabase.auth.setSession({
          access_token: new URLSearchParams(hash.substring(1)).get('access_token') || '',
          refresh_token: new URLSearchParams(hash.substring(1)).get('refresh_token') || '',
        })
        if (exchError || !exchData.session) {
          tokenError.value = 'This password reset link is invalid or has expired. Please request a new one.'
        }
      } else {
        tokenError.value = 'This password reset link is invalid or has expired. Please request a new one.'
      }
    }
  } catch {
    tokenError.value = 'Something went wrong. Please try requesting a new reset link.'
  }
  processingToken.value = false
})

const passwordMatch = computed(() => {
  if (!confirmPassword.value) return null
  return password.value === confirmPassword.value
})

async function handleUpdate() {
  authError.value = ''
  if (password.value.length < 8) {
    authError.value = 'Password must be at least 8 characters long.'
    return
  }
  if (!/[a-zA-Z]/.test(password.value)) {
    authError.value = 'Password must contain at least one letter.'
    return
  }
  if (!/[^a-zA-Z0-9]/.test(password.value)) {
    authError.value = 'Password must contain at least one symbol.'
    return
  }
  if (password.value !== confirmPassword.value) {
    authError.value = 'Passwords do not match.'
    return
  }
  loading.value = true
  const { error } = await supabase.auth.updateUser({ password: password.value })
  loading.value = false
  if (error) {
    authError.value = error.message
  } else {
    passwordReset.value = true
  }
}
</script>

<style scoped>
.auth-page { display: grid; min-height: 100vh; }

@media (min-width: 1024px) {
  .auth-page { grid-template-columns: 1fr 1fr; }
}

.auth-left { display: none; }

@media (min-width: 1024px) {
  .auth-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--bg-dark);
    padding: 48px;
  }
}

.auth-logo { display: flex; align-items: center; gap: 10px; color: white; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 40px; }
.logo-box { width: 28px; height: 28px; background: white; border-radius: 5px; display: flex; align-items: center; justify-content: center; }
.logo-box span { color: black; font-size: 9px; font-weight: 800; }
.auth-tagline { font-size: 28px; color: white; line-height: 1.2; margin-bottom: 32px; }
@media (min-width: 1024px) {
  .auth-tagline { font-size: 36px; }
}
.auth-stats { display: flex; gap: 32px; }
.as-item { display: flex; flex-direction: column; }
.as-num { font-size: 22px; font-weight: 700; color: white; }
.as-label { font-size: 11px; color: #555; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px; }
.auth-left-visual { display: flex; justify-content: center; align-items: center; }
.auth-mock-product { position: relative; }
.amp-body { width: 90px; height: 200px; background: linear-gradient(135deg, #2A2825, #1A1816); border-radius: 12px 12px 20px 20px; box-shadow: inset -4px 0 12px rgba(0,0,0,0.5), 0 20px 60px rgba(0,0,0,0.4); }
.amp-handle { width: 110px; height: 8px; background: #4A3828; border-radius: 4px; margin: -90px auto 0; transform: rotate(-12deg); }

.auth-right { display: flex; align-items: center; justify-content: center; padding: 24px 20px; background: var(--bg); }
@media (min-width: 1024px) {
  .auth-right { padding: 48px; }
}

.auth-form-wrap { width: 100%; max-width: 420px; }
.back-link { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; color: var(--text-2); text-decoration: none; margin-bottom: 24px; transition: color 0.2s; }
.back-link:hover { color: var(--text); }

.auth-header { margin-bottom: 28px; }
.auth-header__icon { width: 48px; height: 48px; border-radius: 12px; background: var(--accent-light); color: var(--accent); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.auth-header__title { font-size: 24px; font-weight: 700; color: var(--text); margin: 0 0 6px 0; }
.auth-header__desc { font-size: 14px; color: var(--text-2); margin: 0; line-height: 1.5; }

.auth-card { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 32px 24px; border-radius: 16px; }
.auth-card--error { background: var(--red-bg); border: 1px solid rgba(255, 0, 0, 0.08); }
.auth-card--success { background: var(--green-bg); border: 1px solid rgba(0, 180, 80, 0.08); }
.auth-card--loading { background: var(--surface); border: 1px solid var(--border); }
.auth-card__icon { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.auth-card__icon--error { background: rgba(255, 0, 0, 0.1); color: var(--red); }
.auth-card__icon--success { background: rgba(0, 180, 80, 0.1); color: var(--green); }
.auth-card__icon--loading { background: var(--surface-2); color: var(--text-2); }
.auth-spinner { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.auth-card__title { font-size: 20px; font-weight: 700; color: var(--text); margin: 0 0 8px 0; }
.auth-card__text { font-size: 14px; color: var(--text-2); margin: 0 0 20px 0; line-height: 1.6; }
.auth-card .btn { margin-top: auto; }

.auth-form { display: flex; flex-direction: column; }
.auth-error { color: var(--red); font-size: 13px; background: var(--red-bg); padding: 10px 14px; border-radius: var(--radius); margin-bottom: 14px; }
.match-error { color: var(--red); font-size: 12px; margin: 0 0 16px 0; }

.password-wrapper { position: relative; display: flex; align-items: center; margin-bottom: 24px; }
.password-toggle { position: absolute; right: 12px; background: none; border: none; padding: 4px; color: var(--text-3); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: color 0.2s; }
.password-toggle:hover { color: var(--text); }

.pw-requirements { display: flex; flex-direction: column; gap: 4px; margin-bottom: 24px; }
.pw-req { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-3); transition: color 0.2s; }
.pw-req.met { color: var(--green); }
.pw-req svg { flex-shrink: 0; }
</style>
