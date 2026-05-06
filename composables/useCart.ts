export const useCart = () => {
  const user = useSupabaseUser()
  const items = useState<any[]>("cart-items", () => [])
  const loading = useState("cart-loading", () => false)
  const isBundle = useState("is-bundle-cart", () => false)
  const api = useApi()
  const initialized = useState<boolean>("cart-initialized", () => false)

  const userId = computed(() => {
    return user.value?.id || user.value?.sub || user.value?.user_metadata?.id || null
  })

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
    if (!userId.value) {
      return
    }
    loading.value = true
    try {
      const res = await api.get('/api/cart')
      console.log('Cart fetched successfully:', res.data)
      const cartData = res.data?.items ?? res.data
      items.value = Array.isArray(cartData) ? cartData : []
    } catch (err) {
      console.error("fetchCart error:", err)
      items.value = []
    }
    loading.value = false
  }

  async function addToCart(productId: string, quantity = 1) {
    if (!userId.value) {
      navigateTo("/auth/login")
      return false
    }

    if (!productId) {
      return false
    }

    try {
      const res = await api.post('/api/cart', { productId, quantity })
      console.log('Cart added successfully:', res.data)
      await fetchCart()
      return true
    } catch (err) {
      console.error("addToCart error:", err)
      return false
    }
  }

  async function updateQuantity(productId: string, quantity: number) {
    if (!userId.value) return
    if (quantity <= 0) return removeFromCart(productId)

    try {
      await api.post('/api/cart/update', { productId, quantity })
      await fetchCart()
    } catch (err) {
      console.error("updateQuantity error:", err)
    }
  }

  async function removeFromCart(productId: string) {
    if (!userId.value) return

    try {
      await api.post('/api/cart/delete', { productId })
      await fetchCart()
    } catch (err) {
      console.error("removeFromCart error:", err)
    }
  }

  async function clearCart() {
    if (!userId.value) {
      items.value = []
      return
    }
    try {
      await api.post('/api/cart/delete', {})
      items.value = []
    } catch (err) {
      console.error("clearCart error:", err)
      items.value = []
    }
  }

  if (process.client && !initialized.value) {
    initialized.value = true
    watch(userId, async (newId) => {
      if (newId) {
        await fetchCart()
      } else {
        items.value = []
      }
    })

    onMounted(async () => {
      await new Promise(r => setTimeout(r, 500))
      if (userId.value) {
        await fetchCart()
      }
    })
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
    getItemQuantity,
    userId,
  }
}
