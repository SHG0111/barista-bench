<template>
  <div class="bg-bg text-text min-h-screen pt-20 pb-[120px] font-body">
    <div class="max-w-[1100px] mx-auto px-6">
      
      <div class="flex justify-between items-end mb-10 pb-6 border-b border-border">
        <h1 class="font-display text-[48px] font-medium text-text leading-tight">Your Cart</h1>
        <NuxtLink to="/shop" class="text-[11px] font-bold tracking-[0.1em] text-accent uppercase no-underline pb-1 border-b border-transparent transition-all duration-200 hover:border-accent">CONTINUE SHOPPING</NuxtLink>
      </div>

      <div v-if="items.length === 0 && !loading" class="text-center py-20 bg-white rounded-lg">
        <div class="text-[48px] mb-6 opacity-30">🛒</div>
        <h2 class="text-2xl mb-3 font-semibold">Your cart is empty.</h2>
        <p class="text-text-2 mb-8">Looks like you haven't added any precision tools yet.</p>
        <NuxtLink to="/shop" class="inline-flex items-center justify-center px-8 py-4 text-[12px] font-bold tracking-[0.1em] uppercase rounded bg-accent text-white border-none cursor-pointer no-underline transition-all duration-200 hover:bg-[#a67243] hover:-translate-y-0.5">SHOP ALL HARDWARE</NuxtLink>
      </div>

      <div v-else-if="loading" class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
        <!-- Left: Skeleton Items -->
        <div class="flex flex-col gap-5">
          <div v-for="i in 3" :key="i" class="flex bg-white rounded-lg p-6 gap-6">
            <div class="w-[100px] h-[100px] shrink-0 skeleton rounded-lg"></div>
            <div class="flex-1 flex flex-col">
              <div class="w-[60%] h-5 mb-3 rounded skeleton"></div>
              <div class="w-[30%] h-3.5 mb-6 rounded skeleton"></div>
              <div class="mt-4">
                 <div class="w-[100px] h-9 rounded skeleton"></div>
              </div>
            </div>
            <div class="w-20 h-6 rounded skeleton shrink-0"></div>
          </div>
        </div>
        <!-- Right: Skeleton Summary -->
        <div class="lg:sticky lg:top-[calc(56px+24px)]">
          <div class="bg-white rounded-lg p-8">
            <div class="w-[150px] h-6 mb-8 rounded skeleton"></div>
            <div v-for="i in 3" :key="i" class="flex justify-between mb-4">
              <div class="w-[100px] h-4 rounded skeleton"></div>
              <div class="w-[60px] h-4 rounded skeleton"></div>
            </div>
            <div class="w-full h-14 mt-8 rounded skeleton"></div>
          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
        
        <!-- Cart Items List -->
        <div class="flex flex-col gap-5">
          <div class="flex bg-white rounded-lg p-6 gap-6" v-for="item in items" :key="item.id">
            <div class="w-[100px] h-[100px] shrink-0">
                <div class="w-full h-full bg-bg rounded-md flex items-center justify-center text-text-2">
                  <Icon name="solar:cart-broken" class="w-10 h-10 opacity-30" />
                </div>
            </div>
            
            <div class="flex-1 flex flex-col min-w-0">
              <NuxtLink :to="`/product/${item.products.slug}`" class="text-base font-semibold text-text no-underline mb-2 hover:underline truncate">{{ item.products.name }}</NuxtLink>
              <div class="mb-auto">
                <span class="text-[10px] font-bold tracking-[0.1em] uppercase bg-accent/10 text-accent px-2 py-1 rounded" v-if="item.products.series">{{ item.products.series }}</span>
              </div>
              <div class="flex items-center gap-5 mt-4">
                <div class="flex items-center border border-border rounded overflow-hidden h-9">
                  <button @click="updateQuantity(item.product_id, item.quantity - 1)" class="bg-transparent border-none text-text w-8 h-full cursor-pointer text-base transition-colors hover:bg-surface-2">−</button>
                  <span class="w-8 text-center text-[13px] font-semibold">{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.product_id, item.quantity + 1)" class="bg-transparent border-none text-text w-8 h-full cursor-pointer text-base transition-colors hover:bg-surface-2">+</button>
                </div>
                <button class="bg-transparent border-none text-text-2 text-[12px] underline cursor-pointer p-0 hover:text-[#d1cfcc]" @click="removeFromCart(item.product_id)">Remove</button>
              </div>
            </div>

            <div class="text-[18px] font-bold text-text shrink-0">
              ${{ (item.products.price * item.quantity).toFixed(2) }}
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:sticky lg:top-[calc(56px+24px)]">
          <div class="bg-white rounded-lg p-8">
            <h2 class="font-display text-2xl mb-6 text-text border-b border-border pb-4 font-medium">Order Summary</h2>
            
            <div class="flex justify-between mb-4 text-sm text-text-2">
              <span>Subtotal</span>
              <span class="text-text font-medium">${{ subtotal.toFixed(2) }}</span>
            </div>
            
            <div class="flex justify-between mb-4 text-sm text-accent font-semibold" v-if="isBundle">
              <span>Bundle Discount (15%)</span>
              <span>−${{ discount.toFixed(2) }}</span>
            </div>
            
            <div class="flex justify-between mb-4 text-sm text-text-2">
              <span>Shipping</span>
              <span class="text-text font-medium">Calculated at checkout</span>
            </div>
            
            <div class="flex justify-between mb-4 text-sm text-text-2">
              <span>Tax</span>
              <span class="text-text font-medium">Calculated at checkout</span>
            </div>

            <div class="flex justify-between mt-6 pt-5 border-t border-border text-[18px] font-bold text-text">
              <span class="text-[15px]">Estimated Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>

            <NuxtLink to="/checkout" class="flex items-center justify-center w-full p-4.5 text-[12px] font-bold tracking-[0.1em] uppercase bg-accent text-white border-none rounded cursor-pointer no-underline transition-all duration-200 mt-8 hover:bg-[#a67243] hover:-translate-y-0.5">PROCEED TO CHECKOUT</NuxtLink>

            <div class="flex justify-center gap-3 mt-6 opacity-50 text-[11px] font-bold uppercase tracking-wider text-text">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Amex</span>
              <span>Apple Pay</span>
            </div>

            <p class="text-center text-[11px] text-text-2 mt-4">🔒 Secure checkout powered by Stripe</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

definePageMeta({ layout: 'default' });

const { items, subtotal, discount, total, isBundle, loading, updateQuantity, removeFromCart, fetchCart } = useCart();
const user = useSupabaseUser();

onMounted(() => {
  if (user.value) {
    fetchCart();
  }
});
</script>

<style scoped>
@keyframes shimmer {
  0% { background-position: -600px 0; }
  100% { background-position: 600px 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f0ede8 25%, #e8e4de 50%, #f0ede8 75%);
  background-size: 600px 100%;
  animation: shimmer 1.5s infinite;
}
</style>
