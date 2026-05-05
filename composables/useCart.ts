export const useCart = () => {
  const supabase = useSupabaseClient<any>()
  const user = useSupabaseUser()
  const items = useState<any[]>("cart-items", () => [])
  const loading = useState("cart-loading", () => false)
  const isBundle = useState("is-bundle-cart", () => false)

  const count = computed(() => items.value.reduce((s: number, i: any) => s + i.quantity, 0))
  const subtotal = computed(() =>
    items.value.reduce((s: number, i: any) => s + (i.products?.price || 0) * i.quantity, 0),
  )
  const discount = computed(() => isBundle.value ? subtotal.value * 0.15 : 0)
  const total = computed(() => subtotal.value - discount.value)

  function getItemQuantity(productId: string): number {
    const item = items.value.find((i: any) => i.product_id === productId)
    return item?.quantity || 0
  }

  async function fetchCart() {
    if (!user.value?.id) {
      return
    }
    loading.value = true
    try {
      const data = await $fetch('/api/cart', {
        credentials: 'include',
      })
      items.value = data || []
      console.log('Cart fetched successfully:', items.value.length, 'items')
    } catch (err) {
      console.error("fetchCart error:", err)
      items.value = []
    }
    loading.value = false
  }

  async function addToCart(productId: string, quantity = 1) {
    if (!user.value) {
      navigateTo("/auth/login")
      return false
    }

    if (!productId) {
      console.error('useCart - addToCart called with invalid productId:', productId)
      return false
    }

    try {
      console.log('useCart addToCart - productId:', productId, 'type:', typeof productId)
      await $fetch('/api/cart', {
        method: 'POST',
        credentials: 'include',
        body: { productId, quantity }
      })
      await fetchCart()
      return true
    } catch (err) {
      console.error("addToCart error:", err)
      return false
    }
  }

  async function updateQuantity(productId: string, quantity: number) {
    if (!user.value) return
    if (quantity <= 0) return removeFromCart(productId)

    try {
      await $fetch('/api/cart/update', {
        method: 'POST',
        credentials: 'include',
        body: { productId, quantity }
      })
      await fetchCart()
    } catch (err) {
      console.error("updateQuantity error:", err)
    }
  }

  async function removeFromCart(productId: string) {
    if (!user.value) return

    try {
      await $fetch('/api/cart/delete', {
        method: 'POST',
        credentials: 'include',
        body: { productId }
      })
      await fetchCart()
    } catch (err) {
      console.error("removeFromCart error:", err)
    }
  }

  async function clearCart() {
    if (!user.value) return
    items.value = []
  }

  watch(() => user.value?.id, async (newId) => {
    if (newId) {
      await fetchCart()
    } else {
      items.value = []
    }
  })

  onMounted(async () => {
    await new Promise(r => setTimeout(r, 500))
    if (user.value?.id) {
      await fetchCart()
    }
  })

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
    getItemQuantity,
  }
}
