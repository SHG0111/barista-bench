<template>
  <div class="pt-[56px] min-h-screen bg-bg">
    <!-- Mini nav bar -->
    <div class="bg-surface border-b border-border h-[52px] flex items-center justify-between px-8">
      <NuxtLink to="/shop" class="flex items-center gap-2 no-underline text-text text-[12px] font-bold tracking-[0.1em]">
        <div class="w-6 h-6 bg-text rounded-[4px] flex items-center justify-center">
          <span class="text-white text-[8px] font-extrabold">BB</span>
        </div>
        <span>BARISTA BENCH</span>
      </NuxtLink>
      <div class="hidden md:block text-[12px] font-semibold tracking-[0.08em] text-text-2">
        KIT BUILDER <span class="mx-1.5 text-text-3">/</span> COMPATIBILITY VERIFIED
      </div>
      <NuxtLink to="/shop" class="text-base text-text-2 no-underline px-2 py-1 rounded transition-all duration-150 hover:bg-surface-2 hover:text-text">✕</NuxtLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-0 min-h-[calc(100vh-52px-56px-56px)]">
      <!-- Main -->
      <div class="p-10 lg:p-12 lg:px-12">
        <!-- Steps -->
        <div class="mb-9">
          <div class="flex items-center justify-center md:justify-start gap-3 md:gap-0">
            <div
              v-for="(step, i) in steps"
              :key="step.key"
              class="flex flex-col items-center gap-1.5 relative flex-1 max-w-[120px]"
            >
              <div class="flex items-center w-full relative">
                <div 
                  class="w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center text-xs font-semibold relative z-10 transition-all duration-300"
                  :class="[
                    currentStep === i ? 'bg-text border-text text-white shadow-sm' : 
                    currentStep > i ? 'bg-accent border-accent text-white' : 
                    'bg-surface border-border text-text-3'
                  ]"
                >
                  <span v-if="currentStep > i">✓</span>
                  <span v-else>{{ i + 1 }}</span>
                </div>
                <div v-if="i < steps.length - 1" class="absolute left-1/2 top-1/2 w-full h-px bg-border -translate-y-1/2 z-0"></div>
              </div>
              <div 
                class="hidden md:block text-[10px] font-bold uppercase tracking-[0.08em] transition-colors duration-300"
                :class="currentStep === i ? 'text-text' : currentStep > i ? 'text-accent' : 'text-text-3'"
              >
                {{ step.label }}
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-7">
          <div class="flex items-baseline justify-between mb-7">
            <h2 class="text-3xl font-display font-semibold text-text">{{ steps[currentStep].title }}</h2>
            <span class="text-[12px] text-text-3 font-medium">Step {{ currentStep + 1 }} of {{ steps.length }}</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5" v-if="stepProducts.length">
            <div
              v-for="p in stepProducts"
              :key="p.id"
              class="group bg-surface rounded-lg pb-4 cursor-pointer relative transition-all duration-180 ease-default hover:shadow-md"
              :class="{ 'ring-2 ring-text': selectedItems[steps[currentStep].key]?.id === p.id }"
              @click="selectItem(p)"
            >
              <div
                class="absolute top-3.5 right-3.5 w-6 h-6 bg-text rounded-full text-white text-[12px] font-bold flex items-center justify-center z-10"
                v-if="selectedItems[steps[currentStep].key]?.id === p.id"
              >
                ✓
              </div>
              <div class="aspect-[16/9] overflow-hidden rounded-t-lg bg-gradient-to-br from-[#efede9] to-[#e0ddd8]"></div>
              <div class="px-4 pt-4">
                <div class="flex justify-between items-baseline mb-1.5">
                  <h3 class="text-[16px] font-semibold text-text truncate pr-2">{{ p.name }}</h3>
                  <span class="text-[15px] font-bold text-text shrink-0">${{ p.price }}</span>
                </div>
                <p class="text-[12.5px] text-text-2 leading-[1.6] mb-2.5 line-clamp-2">{{ p.tagline }}</p>
                <div class="flex gap-1.5 mb-3 flex-wrap">
                  <span v-for="t in p.tags?.slice(0, 2)" :key="t" class="px-2 py-0.5 bg-surface-2 rounded-full text-[10px] font-medium text-text-2 uppercase tracking-wide">{{ t }}</span>
                </div>
              </div>
              <div
                v-if="selectedItems[steps[currentStep].key]?.id !== p.id"
                class="mx-4 py-2.5 bg-surface-2 rounded-lg text-center text-[12.5px] font-semibold text-text-2 transition-all duration-150 group-hover:bg-text group-hover:text-white"
              >
                Select {{ steps[currentStep].label }}
              </div>
            </div>
          </div>
          <div v-else class="text-center py-20 text-text-2">
            <p>No products available for this step yet.</p>
          </div>
        </div>

        <!-- Nav buttons -->
        <div class="flex flex-col sm:flex-row justify-between items-center mt-10 pt-7 border-t border-border gap-4">
          <button
            class="btn btn-ghost w-full sm:w-auto"
            :disabled="currentStep === 0"
            @click="currentStep--"
          >
            PREVIOUS
          </button>
          <button
            class="btn btn-primary btn-lg w-full sm:w-auto"
            @click="nextStep"
            :disabled="
              !selectedItems[steps[currentStep].key] &&
              currentStep < steps.length - 1
            "
          >
            {{
              currentStep === steps.length - 1
                ? "REVIEW KIT"
                : `NEXT STEP: ${steps[currentStep + 1]?.label?.toUpperCase()}`
            }}
          </button>
        </div>
      </div>

      <!-- Sidebar summary -->
      <div class="bg-white p-8 lg:px-6 lg:border-l border-border/50">
        <div class="space-y-5">
          <h3 class="text-[18px] font-display font-semibold text-text mb-1">YOUR BUNDLE</h3>
          <p class="text-[12px] text-accent tracking-[0.06em] font-bold uppercase -mt-4">Save 15% on completion</p>

          <div class="space-y-3.5 mt-5">
            <div v-for="step in steps" :key="step.key" class="flex flex-col gap-1.5">
              <div class="text-[10px] font-bold tracking-[0.1em] uppercase text-[#555]">{{ step.label }}</div>
              <div v-if="selectedItems[step.key]" class="flex items-center gap-2.5 bg-surface-2 rounded-lg p-2.5 group">
                <div class="w-8 h-8 rounded-md bg-[#333] shrink-0"></div>
                <div class="min-w-0">
                  <div class="text-[12.5px] text-text font-medium truncate">{{ selectedItems[step.key].name }}</div>
                  <div class="text-[12px] text-accent font-bold">${{ selectedItems[step.key].price }}</div>
                </div>
                <button class="ml-auto border-none bg-transparent cursor-pointer text-[#555] p-1 opacity-60 hover:opacity-100 transition-opacity" @click="removeItem(step.key)">
                  🗑
                </button>
              </div>
              <div v-else class="border-[1.5px] border-dashed border-border-hover rounded-lg p-3 text-center text-[12px] text-[#444] font-medium">Select {{ step.label }}</div>
            </div>
          </div>

          <hr class="border-border-dark my-5" />

          <div class="flex flex-col gap-2">
            <div class="flex justify-between text-[13px] text-[#777] font-medium">
              <span>Subtotal</span>
              <span>${{ bundleSubtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-[13px] text-accent font-bold">
              <span>Bundle Discount (15%)</span>
              <span>−${{ bundleDiscount.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-text text-[18px] font-bold mt-1">
              <span>Total</span>
              <span>${{ bundleTotal.toFixed(2) }}</span>
            </div>
          </div>

          <button
            class="btn btn-accent btn-full btn-lg mt-5"
            :disabled="!hasMinimumItems"
            @click="addKitToCart"
          >
            ADD KIT TO CART
          </button>
          <div class="flex items-center gap-1.5 justify-center mt-2.5 text-[11px] text-[#555] font-bold uppercase tracking-wider">
            ⊙ 2-YEAR WARRANTY INCLUDED
          </div>
        </div>
      </div>
    </div>

    <!-- Footer mini -->
    <div class="bg-surface border-t border-border flex flex-col md:flex-row items-center gap-4 md:gap-10 p-6 md:px-12 text-[12.5px] font-bold tracking-[0.04em] text-text">
      <span class="flex items-center gap-2">✈ FREE SHIPPING <span class="text-[#555] font-medium">On orders over $150</span></span>
      <span class="flex items-center gap-2">⊙ EXPERT SUPPORT <span class="text-[#555] font-medium">Barista-led help desk</span></span>
      <div class="flex gap-2 ml-0 md:ml-auto">
        <span v-for="pay in ['VISA', 'MC', 'PP']" :key="pay" class="border border-border rounded px-2 py-0.5 text-[10px] font-bold text-text-3">{{ pay }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
const supabase = useSupabaseClient();
const { addToCart, isBundle } = useCart();
const { success, error } = useToast();

const currentStep = ref(0);
const selectedItems = ref<Record<string, any>>({});
const allProducts = ref<any[]>([]);

const steps = [
  {
    key: "grinder",
    label: "Grinder",
    title: "Select your grinder",
    categorySlug: "manual-grinders",
  },
  {
    key: "portafilter",
    label: "Portafilter",
    title: "Select your portafilter",
    categorySlug: "portafilters",
  },
  {
    key: "tamper",
    label: "Tamper",
    title: "Select your tamper",
    categorySlug: "tampers",
  },
  {
    key: "finish",
    label: "Finish",
    title: "Add finishing touches",
    categorySlug: "distribution-tools",
  },
];

const stepProducts = computed(() => {
  const cat = steps[currentStep.value].categorySlug;
  return allProducts.value.filter((p) => p.category_slug === cat);
});

const bundleSubtotal = computed(() =>
  Object.values(selectedItems.value).reduce(
    (s, p: any) => s + parseFloat(p.price),
    0,
  ),
);
const bundleDiscount = computed(() => bundleSubtotal.value * 0.15);
const bundleTotal = computed(() => bundleSubtotal.value - bundleDiscount.value);
const hasMinimumItems = computed(
  () => Object.keys(selectedItems.value).length >= 2,
);

function selectItem(product: any) {
  selectedItems.value = {
    ...selectedItems.value,
    [steps[currentStep.value].key]: product,
  };
}

function removeItem(key: string) {
  const updated = { ...selectedItems.value };
  delete updated[key];
  selectedItems.value = updated;
}

function nextStep() {
  if (currentStep.value < steps.length - 1) currentStep.value++;
  else addKitToCart();
}

async function addKitToCart() {
  if (!hasMinimumItems.value) {
    error("Select at least 2 items");
    return;
  }
  isBundle.value = true; // Activate bundle discount
  for (const item of Object.values(selectedItems.value) as any[]) {
    await addToCart(item.id);
  }
  success(
    `Kit added to cart — ${bundleTotal.value.toFixed(2)} with 15% bundle discount`,
  );
  await navigateTo("/checkout");
}

onMounted(async () => {
  const { data } = await supabase.from("products_with_category").select("*");
  if (data) allProducts.value = data;
});
</script>

<style scoped>
/* All styles handled via Tailwind CSS utility classes */
</style>
