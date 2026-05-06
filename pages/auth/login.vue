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
          <button :class="{ active: mode === 'login' }" @click="mode = 'login'; authError = ''; authSuccess = ''; showResendBtn = false">Sign In</button>
          <button :class="{ active: mode === 'register' }" @click="mode = 'register'; authError = ''; authSuccess = ''; showResendBtn = false">Create Account</button>
        </div>

         <form class="auth-form" @submit.prevent="handleSubmit">
           <div v-if="mode === 'register'">
             <label class="input-label">Full Name</label>
             <input v-model="form.fullName" class="input" placeholder="Alex Rivers" style="margin-bottom:16px" />
           </div>
           <label class="input-label">Email Address</label>
           <input v-model="form.email" type="email" class="input" placeholder="you@example.com" :style="{ marginBottom: mode === 'forgot' ? '24px' : '16px' }" />
           <div v-if="mode !== 'forgot'">
             <label class="input-label">Password</label>
             <div class="password-wrapper" :style="{ marginBottom: mode === 'register' ? '8px' : '24px' }">
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
           </div>

           <div v-if="mode === 'register' && form.password" class="pw-requirements">
             <div class="pw-req" :class="{ met: form.password.length >= 8 }">
               <Icon name="solar:check-circle-broken" width="14" height="14" v-if="form.password.length >= 8" />
               <Icon name="solar:circle-broken" width="14" height="14" v-else />
               At least 8 characters
             </div>
             <div class="pw-req" :class="{ met: /[a-zA-Z]/.test(form.password) }">
               <Icon name="solar:check-circle-broken" width="14" height="14" v-if="/[a-zA-Z]/.test(form.password)" />
               <Icon name="solar:circle-broken" width="14" height="14" v-else />
               At least one letter
             </div>
             <div class="pw-req" :class="{ met: /[^a-zA-Z0-9]/.test(form.password) }">
               <Icon name="solar:check-circle-broken" width="14" height="14" v-if="/[^a-zA-Z0-9]/.test(form.password)" />
               <Icon name="solar:circle-broken" width="14" height="14" v-else />
               At least one symbol
             </div>
           </div>

           <p v-if="mode === 'login'" class="forgot-link" @click="mode = 'forgot'; authError = ''; authSuccess = ''; showResendBtn = false">Forgot password?</p>

            <p v-if="authError" class="auth-error">{{ authError }}</p>
            <div v-if="authSuccess" class="auth-success-box">
              <p>{{ authSuccess }}</p>
              <button v-if="showResendBtn" type="button" class="resend-btn" @click="handleResend" :disabled="resendCooldown > 0">
                <svg v-if="resending" class="resend-spinner" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
                {{ resendCooldown > 0 ? `Try again in ${resendCooldown}s` : resendSent ? 'Email confirmed! Try signing in.' : 'Confirm email now' }}
              </button>
            </div>

           <button type="submit" class="btn btn-primary btn-full btn-lg" :disabled="loading || resetCooldown > 0">
             {{ loading ? 'Please wait...' : resetCooldown > 0 ? `Wait ${resetCooldown}s` : (mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link') }}
           </button>

            <button v-if="mode === 'forgot'" type="button" class="btn btn-outline btn-full" style="margin-top:12px" @click="mode = 'login'; authError = ''; authSuccess = ''; showResendBtn = false; form.password = ''">Back to Sign In</button>

           <template v-if="mode === 'login'">
             <div class="auth-divider"><span>or continue with</span></div>

             <button type="button" class="btn btn-outline btn-full" @click="signInWithGoogle">
               <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
               Continue with Google
             </button>
           </template>
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
import { z } from 'zod'

definePageMeta({ layout: 'clean' })

const supabase = useSupabaseClient()
const { success } = useToast()

const mode = ref<'login' | 'register' | 'forgot'>('login')
const loading = ref(false)
const showPassword = ref(false)
const authError = ref('')
const authSuccess = ref('')
const resetCooldown = ref(0)
const showResendBtn = ref(false)
const resendCooldown = ref(0)
const resendSent = ref(false)
const resending = ref(false)
const registeredEmail = ref('')
const form = reactive({ email: '', password: '', fullName: '' })

const route = useRoute()

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name is too long'),
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/[a-zA-Z]/, 'Password must contain at least one letter').regex(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol'),
})

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
})

async function resendConfirmation(email: string) {
  resending.value = true
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email
    })
    if (error) {
      if (error.message?.includes('already confirmed') || error.message?.includes('email confirmed')) {
        authSuccess.value = 'Your email is already confirmed. Please try signing in again.'
      } else {
        authError.value = error.message || 'Failed to resend confirmation email'
      }
    } else {
      resendSent.value = true
    }
      resendCooldown.value = 5
      let t = setInterval(() => {
        resendCooldown.value--
        if (resendCooldown.value <= 0) clearInterval(t)
      }, 1000)
    }
  
  
  
    catch (err: any) {
      authError.value = err?.data?.message || err?.message || 'Failed to resend confirmation'
    } finally {
      resending.value = false
    }
  }


async function handleResend() {
  if (resendCooldown.value > 0 || resending.value) return
  resendSent.value = false
  await resendConfirmation(registeredEmail.value)
}

let cooldownTimer: ReturnType<typeof setInterval> | null = null
function startCooldown(seconds: number) {
  if (cooldownTimer) clearInterval(cooldownTimer)
  resetCooldown.value = seconds
  cooldownTimer = setInterval(() => {
    resetCooldown.value--
    if (resetCooldown.value <= 0 && cooldownTimer) {
      clearInterval(cooldownTimer)
      cooldownTimer = null
    }
  }, 1000)
}

onUnmounted(() => {
  if (cooldownTimer) clearInterval(cooldownTimer)
})

onMounted(() => {
  if (route.query.error === 'timeout') {
    authError.value = 'Signing in took too long. Please try again.'
  }
})

async function handleSubmit() {
  authError.value = ''
  authSuccess.value = ''

  let validation
  if (mode.value === 'forgot') {
    validation = forgotSchema.safeParse({ email: form.email })
  } else if (mode.value === 'login') {
    validation = loginSchema.safeParse({ email: form.email, password: form.password })
  } else {
    validation = registerSchema.safeParse({ fullName: form.fullName, email: form.email, password: form.password })
  }

  if (!validation.success) {
    authError.value = validation.error.issues[0]?.message ?? "Validation failed"
    return
  }

  loading.value = true

  if (mode.value === 'forgot') {
    if (resetCooldown.value > 0) {
      authError.value = `Please wait ${resetCooldown.value}s before requesting another reset link.`
      loading.value = false
      return
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(form.email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })
      if (resetError) throw resetError
      authSuccess.value = 'Password reset link sent! Check your email to reset your password.'
      showResendBtn.value = false
      form.email = ''
      startCooldown(60)
    } catch (err: any) {
      const msg = err?.data?.statusMessage || err?.data?.message || err?.message || ''
      if (msg.toLowerCase().includes('rate limit') || msg.includes('429')) {
        authError.value = 'Too many requests. Please wait a minute before trying again.'
        startCooldown(60)
      } else if (msg.toLowerCase().includes('recovery email')) {
        authError.value = 'Failed to send reset link. Please check your email address and try again.'
      } else {
        authError.value = msg || 'Failed to send reset link. Please try again.'
      }
    }
    loading.value = false
    return
  }
  if (mode.value === 'login') {
    const { error, data } = await supabase.auth.signInWithPassword({ email: form.email.trim().toLowerCase(), password: form.password })
    if (error) {
      if (error.message?.toLowerCase().includes('email') && error.message?.toLowerCase().includes('confirm')) {
        authSuccess.value = 'Email not confirmed. Please check your inbox and click the confirmation link.'
        registeredEmail.value = form.email.trim().toLowerCase()
        showResendBtn.value = true
        await resendConfirmation(form.email.trim().toLowerCase())
      } else {
        authError.value = error.message
      }
    } else {
      const adminEmail = 'admin@bench.bb'
      const isUnconfirmed = !data.user?.email_confirmed_at && !data.user?.user_metadata?.email_verified
      if (isUnconfirmed) {
        authSuccess.value = 'Email not confirmed. Please check your inbox and click the confirmation link.'
        registeredEmail.value = data.user?.email || form.email.trim().toLowerCase()
        showResendBtn.value = true
        await resendConfirmation(data.user?.email || form.email.trim().toLowerCase())
      } else if (data.user?.email === adminEmail || data.user?.app_metadata?.role === 'admin') {
        await navigateTo('/admin')
      } else {
        await navigateTo('/account')
      }
    }
  } else {
    const normalizedEmail = form.email.trim().toLowerCase()
    try {
      const api = useApi()
      await api.post('/api/auth/signup', { email: normalizedEmail, password: form.password, fullName: form.fullName.trim() })
      authSuccess.value = 'Account created! Please confirm your email to continue.'
      registeredEmail.value = normalizedEmail
      showResendBtn.value = true
      mode.value = 'login'
      form.password = ''
    } catch (err: any) {
      const msg = err?.response?.data?.statusMessage || err?.response?.data?.message || err?.message || ''
      if (msg.toLowerCase().includes('already registered') || msg.toLowerCase().includes('already exists') || msg.toLowerCase().includes('duplicate')) {
        authError.value = 'This email is already registered. Please sign in instead.'
      } else {
        authError.value = msg || 'Failed to create account. Please try again.'
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
.auth-success-box { color: var(--green); font-size: 13px; background: var(--green-bg); padding: 10px 14px; border-radius: var(--radius); margin-bottom: 14px; }
.auth-success-box p { margin: 0 0 8px 0; }
.resend-btn { background: var(--green); color: white; border: none; padding: 6px 14px; border-radius: var(--radius); font-size: 12px; font-weight: 600; cursor: pointer; font-family: var(--font-body); transition: opacity 0.2s; display: inline-flex; align-items: center; gap: 6px; }
.resend-btn:hover:not(:disabled) { opacity: 0.85; }
.resend-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.resend-spinner { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.auth-divider { text-align: center; margin: 20px 0; position: relative; }
.auth-divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--border); }
.auth-divider span { position: relative; background: var(--bg); padding: 0 12px; font-size: 12px; color: var(--text-3); }
.auth-footer-note { font-size: 11.5px; color: var(--text-3); margin-top: 20px; text-align: center; line-height: 1.6; }
.auth-footer-note a { color: var(--text-2); text-decoration: underline; }

.password-wrapper { position: relative; display: flex; align-items: center; }
.password-toggle { position: absolute; right: 12px; background: none; border: none; padding: 4px; color: var(--text-3); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: color 0.2s; }
.password-toggle:hover { color: var(--text); }

.pw-requirements { display: flex; flex-direction: column; gap: 4px; margin-bottom: 20px; }
.pw-req { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-3); transition: color 0.2s; }
.pw-req.met { color: var(--green); }
.pw-req svg { flex-shrink: 0; }

.forgot-link { font-size: 12px; color: var(--text-2); cursor: pointer; text-align: right; margin-bottom: 20px; transition: color 0.2s; }
.forgot-link:hover { color: var(--text); }
</style>
