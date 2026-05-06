<template>
  <footer class="bg-bg-dark text-[#888]">
    <div class="max-w-[1440px] mx-auto px-8 pt-14 pb-7">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1.4fr] gap-12 pb-12 border-b border-border-dark mb-6 text-center sm:text-left">
        <div class="flex flex-col items-center sm:items-start">
          <div class="flex items-center gap-2 text-white text-[12px] font-bold tracking-[0.1em] mb-4">
            <div class="w-6 h-6 bg-white rounded-[3px] flex items-center justify-center">
              <span class="text-black text-[8px] font-extrabold">BB</span>
            </div>
            <span>BARISTA BENCH</span>
          </div>
          <p class="text-[12.5px] text-[#5a5855] leading-[1.75] max-w-[260px] sm:max-w-none lg:max-w-[260px]">
            The destination for meticulous baristas seeking tools that match
            their passion. Precision in every gram, every click, and every shot.
          </p>
          <div class="flex gap-2.5 mt-4 justify-center sm:justify-start">
            <a v-for="social in ['ig', 'tt', 'fb']" :key="social" href="#" class="w-[30px] h-[30px] border border-border-dark rounded-full flex items-center justify-center text-[10px] font-semibold text-[#555] uppercase transition-all duration-150 hover:border-[#555] hover:text-[#aaa]">
              {{ social }}
            </a>
          </div>
        </div>

        <div>
          <h5 class="text-white text-[11px] tracking-[0.1em] uppercase font-semibold mb-5 font-body">Shop</h5>
          <NuxtLink v-for="link in [
            { to: '/shop?category=manual-grinders', text: 'Manual Grinders' },
            { to: '/shop?category=portafilters', text: 'Portafilters' },
            { to: '/shop?category=tampers', text: 'Tampers & Levelers' },
            { to: '/bundle', text: 'Bundle Builder' },
            { to: '/reviews', text: 'Customer Reviews' }
          ]" :key="link.text" :to="link.to" class="block text-[#5a5855] text-[13px] mb-[11px] transition-colors duration-150 hover:text-[#aaa]">
            {{ link.text }}
          </NuxtLink>
        </div>

        <div>
          <h5 class="text-white text-[11px] tracking-[0.1em] uppercase font-semibold mb-5 font-body">Support</h5>
          <NuxtLink v-for="link in [
            { to: '/shippingPolicy', text: 'Shipping Policy' },
            { to: '/returns', text: 'Returns & Refunds' },
            { to: '/compatibility', text: 'Compatibility Guide' },
            { to: '/contact', text: 'Contact Us' }
          ]" :key="link.text" :to="link.to" class="block text-[#5a5855] text-[13px] mb-[11px] transition-colors duration-150 hover:text-[#aaa]">
            {{ link.text }}
          </NuxtLink>
        </div>

        <div class="flex flex-col items-center sm:items-start">
          <h5 class="text-white text-[11px] tracking-[0.1em] uppercase font-semibold mb-5 font-body">Newsletter</h5>
          <p class="text-[12.5px] text-[#5a5855] mb-3.5 leading-[1.6]">
            Join our inner circle for precision tips and early access to drops.
          </p>
          <form class="flex w-full max-w-[400px] sm:max-w-none" @submit.prevent="subscribe">
            <input v-model="email" type="email" placeholder="Your email" class="flex-1 bg-[#252422] border border-border-dark border-r-0 rounded-l-[5px] px-3.5 py-[9px] text-white text-[12px] font-body outline-none placeholder:text-[#444]" />
            <button type="submit" class="bg-accent text-white px-[18px] py-[9px] text-[11px] font-bold tracking-[0.08em] rounded-r-[5px] hover:bg-accent-hover transition-colors font-body">JOIN</button>
          </form>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-center gap-5 text-[12px] text-[#3a3835]">
        <span>© {{ new Date().getFullYear() }} Barista Bench. Precision tools for meticulous rituals.</span>
        <div class="flex gap-6 flex-wrap justify-center">
          <NuxtLink to="/terms" class="text-[#3a3835] hover:text-[#666] transition-colors duration-150">Terms of Service</NuxtLink>
          <NuxtLink to="/privacy" class="text-[#3a3835] hover:text-[#666] transition-colors duration-150">Privacy Policy</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { z } from 'zod'

const email = ref("");
const { success, error } = useToast();

const emailSchema = z.string().email('Please enter a valid email address')

function subscribe() {
  const validation = emailSchema.safeParse(email.value)
  if (!validation.success) {
    error(validation.error.issues[0]?.message ?? "Validation failed")
    return
  }
  success("You're on the list — welcome to the bench.");
  email.value = "";
}
</script>

<style scoped>
/* Scoped styles removed in favor of Tailwind CSS */
</style>
