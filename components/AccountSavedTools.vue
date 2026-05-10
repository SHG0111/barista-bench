<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold">Saved Tools</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5" v-if="savedTools.length">
      <div
        v-for="item in savedTools as any"
        :key="item.id"
        class="flex items-center gap-3.5 p-4 bg-surface rounded-lg shadow-sm border border-border/50"
      >
        <div class="w-[52px] h-[52px] rounded-lg bg-surface-2 shrink-0 overflow-hidden flex items-center justify-center">
          <NuxtImg
            v-if="item.products?.images?.length"
            :src="item.products.images[0]"
            :alt="item.products?.name"
            class="w-full h-full object-cover"
            format="webp"
            loading="lazy"
          />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[13.5px] font-semibold text-text truncate mb-0.5">{{ item.products?.name }}</div>
          <div class="text-[12px] text-accent font-bold mb-2">{{ formatPrice(item.products?.price) }}</div>
          <button class="btn btn-accent btn-sm" @click="$emit('addToCart', item)">ADD TO CART</button>
        </div>
        <button class="p-1 rounded text-text-3 hover:text-red hover:bg-red-bg transition-all duration-150" @click="$emit('remove', item)">
          <IconTrash />
        </button>
      </div>
    </div>
    <div v-else class="text-center py-10 text-text-2 bg-surface rounded-lg shadow-sm border border-border/50">
      No saved tools yet.
      <NuxtLink to="/shop" class="text-accent underline block mt-2">Browse the collection →</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { formatPrice } = useCurrency()

defineProps({
  savedTools: { type: Array, default: () => [] },
})

defineEmits<{
  addToCart: [item: any]
  remove: [item: any]
}>()
</script>
