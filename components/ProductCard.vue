<template>
  <div class="bg-surface rounded-lg overflow-hidden cursor-pointer transition-all duration-180 ease-default hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-[3px]" @click="navigate">
    <div class="relative">
      <div class="aspect-square flex items-center justify-center overflow-hidden">
        <NuxtImg
          v-if="coverImage"
          :src="coverImage"
          :alt="product.name"
          class="w-full h-full object-cover"
          format="webp"
          loading="lazy"
        />
        <div v-else class="w-[65%] h-[65%] flex items-center justify-center">
          <div class="w-full h-full rounded-xl" :style="mockStyle"></div>
        </div>
      </div>
      <span v-if="product.is_bestseller" class="absolute top-3 left-3 bg-accent text-white text-[9px] font-bold tracking-[0.1em] px-2.5 py-1 rounded-full">BEST SELLER</span>
      
      <div class="absolute bottom-3 right-3 z-10">
        <transition name="qty">
          <div v-if="cartQty > 0" class="flex items-center gap-1 bg-text/95 backdrop-blur-sm rounded-full p-1 shadow-lg">
            <button
              class="w-[26px] h-[26px] rounded-full bg-white/10 text-white text-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              @click.stop="adjust(-1)"
            >
              -
            </button>
            <span class="w-[20px] text-center text-[12px] font-bold text-white">{{ cartQty }}</span>
            <button
              class="w-[26px] h-[26px] rounded-full bg-white/10 text-white text-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              @click.stop="adjust(1)"
            >
              +
            </button>
          </div>
        </transition>
        <button
          v-show="cartQty === 0"
          class="w-[30px] h-[30px] rounded-full bg-text text-white border-none text-[20px] flex items-center justify-center shadow-lg hover:bg-text-2 transition-colors cursor-pointer"
          @click.stop="addToCart"
          title="Add to cart"
        >
          +
        </button>
      </div>
    </div>
    <div class="p-4 pt-4 pb-[18px]">
      <p class="text-[10px] font-semibold tracking-[0.1em] uppercase text-accent mb-1">{{ product.series || product.category_name }}</p>
      <h3 class="text-[15px] font-semibold mb-1 leading-tight text-text">{{ product.name }}</h3>
      <p class="text-[12px] text-text-2 leading-[1.5] mb-3">{{ product.tagline }}</p>
      <div class="flex items-center justify-between flex-wrap gap-2">
        <span class="text-[16px] font-bold text-text">{{ formatPrice(product.price) }}</span>
        <div v-if="product.tags?.length" class="flex gap-[5px]">
          <span v-for="tag in product.tags.slice(0,2)" :key="tag" class="inline-block px-2.5 py-0.5 bg-surface-2 rounded-full text-[11px] font-medium text-text-2 uppercase tracking-wide">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ product: any }>()

const router = useRouter()
function navigate() {
  router.push(`/product/${props.product.slug}`)
}

const { formatPrice } = useCurrency()

const coverImage = computed(() => {
  const images = props.product.images as string[] | undefined
  if (!images || images.length === 0) return null
  return images[0]
})

const mockStyle = computed(() => {
  const colors: Record<string, string> = {
    'manual-grinders': 'linear-gradient(135deg,#2A2825,#1A1816)',
    'portafilters': 'linear-gradient(135deg,#3A2E24,#1E1810)',
    'tampers': 'linear-gradient(135deg,#2E2E2E,#1A1A1A)',
    'distribution-tools': 'linear-gradient(135deg,#C4A882,#8B7355)',
    'scales-precision': 'linear-gradient(135deg,#1C1C1C,#111)',
  }
  return { background: colors[props.product.category_slug] || 'linear-gradient(135deg,#2A2825,#1A1816)' }
})

const { addToCart: cartAdd, updateQuantity, removeFromCart, fetchCart, getItemQuantity } = useCart()
const { success } = useToast()

const cartQty = computed(() => {
  const id = props.product?.id
  if (!id) return 0
  return getItemQuantity(id)
})

const addToCart = async () => {
  const id = props.product?.id
  if (!id || id === 'undefined' || id === 'null') {
    console.error('ProductCard - product missing id:', props.product)
    return
  }
  const successResult = await cartAdd(id, 1)
  if (successResult) {
    success("Added to your cart")
  }
}

const adjust = async (delta: number) => {
  const id = props.product?.id
  if (!id || id === 'undefined' || id === 'null') return
  const newQty = Math.max(0, cartQty.value + delta)
  if (newQty === 0) {
    await removeFromCart(id)
  } else {
    await updateQuantity(id, newQty)
  }
}
</script>

<style scoped>
.qty-enter-active,
.qty-leave-active {
  transition: all 0.2s ease;
}
.qty-enter-from,
.qty-leave-to {
  opacity: 0;
  transform: scale(0.7) translateY(4px);
}
</style>
