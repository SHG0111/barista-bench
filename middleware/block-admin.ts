import type { Profiles } from "~/types/database.types";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  
  if (!user.value) {
    return navigateTo("/auth/login");
  }

  if (!user.value.id) {
    return;
  }

  const adminEmail = "admin@bench.bb";
  if (user.value.email === adminEmail) {
    return navigateTo("/admin");
  }

  if (user.value?.app_metadata?.role === "admin") {
    return navigateTo("/admin");
  }

  try {
    const client = useSupabaseClient();
    const { data: profile } = await client
      .from("profiles")
      .select("role")
      .eq("id", user.value.id)
      .single();

    if (profile && (profile as Profiles).role === "admin") {
      return navigateTo("/admin");
    }
  } catch (err) {
    console.error('block-admin middleware error:', err);
  }
});
