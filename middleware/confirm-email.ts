export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  
  if (user.value && !user.value.email_confirmed_at) {
    return navigateTo('/')
  }
})
