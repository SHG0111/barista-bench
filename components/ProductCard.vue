<template>
  <div class="product-card" @click="navigate">
    <div class="product-img-wrap">
      <div class="product-img-bg">
        <div class="product-img-mock">
          <div class="mock-shape" :style="mockStyle"></div>
        </div>
      </div>
      <span v-if="product.is_bestseller" class="bestseller-badge">BEST SELLER</span>
      <button class="add-btn" @click.stop="$emit('addToCart', product.id)" title="Add to cart">+</button>
    </div>
    <div class="product-info">
      <p class="product-series">{{ product.series || product.category_name }}</p>
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-sub">{{ product.tagline }}</p>
      <div class="product-footer">
        <span class="product-price">${{ product.price }}</span>
        <div v-if="product.tags?.length" class="product-tags">
          <span v-for="tag in product.tags.slice(0,2)" :key="tag" class="tag">{{ tag }}</span>
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
.product-card {
  background: var(--surface);
  border-radius: var(--radius-lg); overflow: hidden;
  cursor: pointer; transition: all 0.18s;
}
.product-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}
.product-img-wrap { position: relative; }
.product-img-bg {
  aspect-ratio: 1; background: var(--surface-2);
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.product-img-mock { width: 65%; height: 65%; display: flex; align-items: center; justify-content: center; }
.mock-shape { width: 100%; height: 100%; border-radius: 12px; }
.bestseller-badge {
  position: absolute; top: 12px; left: 12px;
  background: var(--accent); color: white;
  font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
  padding: 4px 9px; border-radius: 100px;
}
.add-btn {
  position: absolute; bottom: 12px; right: 12px;
  width: 30px; height: 30px; border-radius: 50%;
  background: var(--text); color: white; border: none;
  font-size: 20px; line-height: 1; cursor: pointer;
  opacity: 0; transition: opacity 0.15s;
  display: flex; align-items: center; justify-content: center;
}
.product-card:hover .add-btn { opacity: 1; }
.product-info { padding: 16px 16px 18px; }
.product-series { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 4px; }
.product-name { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
.product-sub { font-size: 12px; color: var(--text-2); line-height: 1.5; margin-bottom: 12px; }
.product-footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
.product-price { font-size: 16px; font-weight: 700; }
.product-tags { display: flex; gap: 5px; }
</style>
