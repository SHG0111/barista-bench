export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const client: any = useSupabaseClient();

  if (!user.value) {
    console.log("No user found, redirecting to login");
    return navigateTo("/auth/login");
  }

  if (!user.value.id) {
    return
  }

  const adminEmail = "admin@bench.bb";
  if (user.value.email === adminEmail) {
    console.log("Admin access granted by email");
    return; // continue to route
  }

  const { data: profile, error } = await client
    .from("profiles")
    .select("role")
    .eq("id", user.value.id)
    .single();

  if (error) {
    console.error("Profile fetch error:", error);
    return navigateTo("/");
  }

  if (!profile) {
    console.log("No profile found, redirecting home");
    return navigateTo("/");
  }

  const role = (profile.role || "").toString().toLowerCase();
  const isAdmin =
    role === "admin" || role === "administrator" || role === "true";

  if (!isAdmin) {
    console.log("Access denied - role", profile.role);
    return navigateTo("/");
  }

  console.log("Admin access granted - role", profile.role);
});
