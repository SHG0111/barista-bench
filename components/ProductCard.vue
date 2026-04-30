<template>
  <div class="bg-surface rounded-lg overflow-hidden cursor-pointer transition-all duration-180 ease-default hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-[3px]" @click="navigate">
    <div class="relative">
      <div class="aspect-square bg-surface-2 flex items-center justify-center overflow-hidden">
        <div class="w-[65%] h-[65%] flex items-center justify-center">
          <div class="w-full h-full rounded-xl" :style="mockStyle"></div>
        </div>
      </div>
      <span v-if="product.is_bestseller" class="absolute top-3 left-3 bg-accent text-white text-[9px] font-bold tracking-[0.1em] px-2.5 py-1 rounded-full">BEST SELLER</span>
      <button class="absolute bottom-3 right-3 w-[30px] h-[30px] rounded-full bg-text text-white border-none text-[20px] flex items-center justify-center opacity-0 group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-150 cursor-pointer" @click.stop="$emit('addToCart', product.id)" title="Add to cart">+</button>
    </div>
    <div class="p-4 pt-4 pb-[18px]">
      <p class="text-[10px] font-semibold tracking-[0.1em] uppercase text-accent mb-1">{{ product.series || product.category_name }}</p>
      <h3 class="text-[15px] font-semibold mb-1 leading-tight text-text">{{ product.name }}</h3>
      <p class="text-[12px] text-text-2 leading-[1.5] mb-3">{{ product.tagline }}</p>
      <div class="flex items-center justify-between flex-wrap gap-2">
        <span class="text-[16px] font-bold text-text">${{ product.price }}</span>
        <div v-if="product.tags?.length" class="flex gap-[5px]">
          <span v-for="tag in product.tags.slice(0,2)" :key="tag" class="inline-block px-2.5 py-0.5 bg-surface-2 rounded-full text-[11px] font-medium text-text-2 uppercase tracking-wide">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ product: any }>()
defineEmits(['addToCart'])

const router = useRouter()
function navigate() {
  router.push(`/product/${props.product.slug}`)
}

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
</script>

<style scoped>
/* 
Note: Added 'group' to the root div to trigger hover effects on child elements.
Updating the template above to use 'group' class.
*/
</style>
