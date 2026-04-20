// composables/useCart.ts
export const useCart = () => {
  const supabase = useSupabaseClient<any>();
  const user = useSupabaseUser();
  const items = useState<any[]>("cart-items", () => []);
  const loading = useState("cart-loading", () => false);
  const isBundle = useState("is-bundle-cart", () => false);

  const count = computed(() => items.value.reduce((s, i) => s + i.quantity, 0));
  const subtotal = computed(() =>
    items.value.reduce((s, i) => s + i.products.price * i.quantity, 0),
  );
  const discount = computed(() => isBundle.value ? subtotal.value * 0.15 : 0);
  const total = computed(() => subtotal.value - discount.value);

  async function fetchCart() {
    if (!user.value) return;
    loading.value = true;
    const { data } = await supabase
      .from("cart_items")
      .select("*, products(*)")
      .eq("user_id", user.value.id);
    if (data) items.value = data;
    loading.value = false;
  }

  async function addToCart(productId: string, quantity = 1) {
    if (!user.value) {
      navigateTo("/auth/login");
      return;
    }
    const { error } = await supabase
      .from("cart_items")
      .upsert(
        { user_id: user.value.id, product_id: productId, quantity },
        { onConflict: "user_id,product_id", ignoreDuplicates: false },
      );
    if (!error) await fetchCart();
    return !error;
  }

  async function updateQuantity(productId: string, quantity: number) {
    if (!user.value) return;
    if (quantity <= 0) return removeFromCart(productId);
    await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("user_id", user.value.id)
      .eq("product_id", productId);
    await fetchCart();
  }

  async function removeFromCart(productId: string) {
    if (!user.value) return;
    await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.value.id)
      .eq("product_id", productId);
    await fetchCart();
  }

  async function clearCart() {
    if (!user.value) return;
    await supabase.from("cart_items").delete().eq("user_id", user.value.id);
    items.value = [];
  }

  return {
    items,
    count,
    subtotal,
    discount,
    total,
    isBundle,
    loading,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
};
