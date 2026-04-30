export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  
  if (!user.value) {
    return navigateTo("/auth/login");
  }

  if (!user.value.id) {
    return
  }

  const adminEmail = "admin@bench.bb";
  if (user.value.email === adminEmail) {
    return navigateTo("/admin");
  }

  if (user.value?.app_metadata?.role === "admin") {
    return navigateTo("/admin");
  }

  const client = useSupabaseClient();
  const { data: profile } = await client
    .from("profiles")
    .select("role")
    .eq("id", user.value.id)
    .single();

  if (profile?.role === "admin") {
    return navigateTo("/admin");
  }
});
