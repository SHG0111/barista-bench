<template>
  <div
    style="padding-top: var(--nav-h); min-height: 100vh; background: var(--bg)"
  >
    <!-- Mini nav bar -->
    <div class="bundle-topbar">
      <NuxtLink to="/shop" class="topbar-logo">
        <div class="logo-box-sm"><span>BB</span></div>
        <span>BARISTA BENCH</span>
      </NuxtLink>
      <div class="topbar-title">
        KIT BUILDER <span class="topbar-sep">/</span> COMPATIBILITY VERIFIED
      </div>
      <NuxtLink to="/shop" class="topbar-close">✕</NuxtLink>
    </div>

    <div class="bundle-layout">
      <!-- Main -->
      <div class="bundle-main">
        <!-- Steps -->
        <div class="steps-wrap">
          <div class="steps">
            <div
              v-for="(step, i) in steps"
              :key="step.key"
              class="step-item"
              :class="{ active: currentStep === i, done: currentStep > i }"
            >
              <div class="step-circle">
                <span v-if="currentStep > i">✓</span>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <div class="step-label">{{ step.label }}</div>
            </div>
          </div>
        </div>

        <div class="bundle-step-content">
          <div class="step-header">
            <h2>{{ steps[currentStep].title }}</h2>
            <span class="step-indicator"
              >Step {{ currentStep + 1 }} of {{ steps.length }}</span
            >
          </div>

          <div class="bundle-products-grid" v-if="stepProducts.length">
            <div
              v-for="p in stepProducts"
              :key="p.id"
              class="bundle-prod-card"
              :class="{
                selected: selectedItems[steps[currentStep].key]?.id === p.id,
              }"
              @click="selectItem(p)"
            >
              <div
                class="bpc-check"
                v-if="selectedItems[steps[currentStep].key]?.id === p.id"
              >
                ✓
              </div>
              <div class="bpc-img">
                <div class="bpc-img-bg"></div>
              </div>
              <div class="bpc-info">
                <div class="bpc-name-row">
                  <h3>{{ p.name }}</h3>
                  <span class="bpc-price">${{ p.price }}</span>
                </div>
                <p class="bpc-desc">{{ p.tagline }}</p>
                <div class="bpc-tags">
                  <span v-for="t in p.tags?.slice(0, 2)" :key="t" class="tag">{{
                    t
                  }}</span>
                </div>
              </div>
              <div
                v-if="selectedItems[steps[currentStep].key]?.id !== p.id"
                class="bpc-select-btn"
              >
                Select {{ steps[currentStep].label }}
              </div>
            </div>
          </div>
          <div v-else class="step-empty">
            <p>No products available for this step yet.</p>
          </div>
        </div>

        <!-- Nav buttons -->
        <div class="bundle-nav">
          <button
            class="btn btn-ghost"
            :disabled="currentStep === 0"
            @click="currentStep--"
          >
            PREVIOUS
          </button>
          <button
            class="btn btn-primary btn-lg"
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
      <div class="bundle-sidebar">
        <div class="card-dark bundle-summary-card">
          <h3 style="color: var(--text); font-size: 18px; margin-bottom: 4px">
            YOUR BUNDLE
          </h3>
          <p
            style="
              color: var(--accent);
              font-size: 12px;
              letter-spacing: 0.06em;
            "
          >
            Save 15% on completion
          </p>

          <div class="bundle-items" style="margin-top: 20px">
            <div v-for="step in steps" :key="step.key" class="bundle-line-item">
              <div class="bli-label">{{ step.label }}</div>
              <div v-if="selectedItems[step.key]" class="bli-selected">
                <div class="bli-prod-img"></div>
                <div class="bli-prod-info">
                  <div class="bli-prod-name">
                    {{ selectedItems[step.key].name }}
                  </div>
                  <div class="bli-prod-price">
                    ${{ selectedItems[step.key].price }}
                  </div>
                </div>
                <button class="bli-remove" @click="removeItem(step.key)">
                  🗑
                </button>
              </div>
              <div v-else class="bli-empty">Select {{ step.label }}</div>
            </div>
          </div>

          <hr style="border-color: var(--border-dark); margin: 20px 0" />

          <div class="bundle-totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>${{ bundleSubtotal.toFixed(2) }}</span>
            </div>
            <div class="total-row accent-row">
              <span>Bundle Discount (15%)</span>
              <span>−${{ bundleDiscount.toFixed(2) }}</span>
            </div>
            <div class="total-row total-final">
              <span>Total</span>
              <span>${{ bundleTotal.toFixed(2) }}</span>
            </div>
          </div>

          <button
            class="btn btn-accent btn-full btn-lg"
            style="margin-top: 20px"
            :disabled="!hasMinimumItems"
            @click="addKitToCart"
          >
            ADD KIT TO CART
          </button>
          <div
            style="
              display: flex;
              align-items: center;
              gap: 6px;
              justify-content: center;
              margin-top: 10px;
              font-size: 11px;
              color: #555;
            "
          >
            ⊙ 2-YEAR WARRANTY INCLUDED
          </div>
        </div>
      </div>
    </div>

    <!-- Footer mini -->
    <div class="bundle-footer-bar">
      <span
        >✈ FREE SHIPPING
        <span style="color: #555">On orders over $150</span></span
      >
      <span
        >⊙ EXPERT SUPPORT
        <span style="color: #555">Barista-led help desk</span></span
      >
      <div class="payment-logos">
        <span class="pay-logo">VISA</span>
        <span class="pay-logo">MC</span>
        <span class="pay-logo">PP</span>
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
.bundle-topbar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
}
.topbar-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
}
.logo-box-sm {
  width: 24px;
  height: 24px;
  background: var(--text);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-box-sm span {
  color: white;
  font-size: 8px;
  font-weight: 800;
}
.topbar-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--text-2);
}
.topbar-sep {
  margin: 0 6px;
  color: var(--text-3);
}
.topbar-close {
  font-size: 16px;
  color: var(--text-2);
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.15s;
}
.topbar-close:hover {
  background: var(--surface-2);
  color: var(--text);
}
.bundle-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 0;
  min-height: calc(100vh - 52px - var(--nav-h) - 56px);
}
.bundle-main {
  padding: 40px 48px;
}
.steps-wrap {
  margin-bottom: 36px;
}
.step-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 28px;
}
.step-header h2 {
  font-size: 30px;
}
.step-indicator {
  font-size: 12px;
  color: var(--text-3);
}
.bundle-products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.bundle-prod-card {
  border-radius: var(--radius-lg);
  padding: 0 0 16px;
  cursor: pointer;
  position: relative;
  transition: all 0.18s;
  background: var(--surface);
}
.bundle-prod-card:hover {
  box-shadow: var(--shadow-md);
}
.bundle-prod-card.selected {
  outline: 2px solid var(--text);
}
.bpc-check {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 24px;
  height: 24px;
  background: var(--text);
  border-radius: 50%;
  color: white;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.bpc-img {
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}
.bpc-img-bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #efede9, #e0ddd8);
}
.bpc-info {
  padding: 16px 16px 0;
}
.bpc-name-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 6px;
}
.bpc-name-row h3 {
  font-size: 16px;
  font-weight: 600;
}
.bpc-price {
  font-size: 15px;
  font-weight: 700;
}
.bpc-desc {
  font-size: 12.5px;
  color: var(--text-2);
  line-height: 1.6;
  margin-bottom: 10px;
}
.bpc-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}
.bpc-select-btn {
  margin: 0 16px;
  padding: 9px;
  background: var(--surface-2);
  border-radius: 8px;
  text-align: center;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-2);
  transition: all 0.15s;
}
.bundle-prod-card:hover .bpc-select-btn {
  background: var(--text);
  color: white;
}
.bundle-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding-top: 28px;
  border-top: 1px solid var(--border);
}
.bundle-sidebar {
  background: #fff;
  padding: 32px 24px;
}
.bundle-summary-card {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
}
.bundle-line-item {
  margin-bottom: 14px;
}
.bli-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #555;
  margin-bottom: 6px;
}
.bli-selected {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface-2);
  border-radius: 8px;
  padding: 10px 12px;
}
.bli-prod-img {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: #333;
  flex-shrink: 0;
}
.bli-prod-name {
  font-size: 12.5px;
  color: var(--text);
  font-weight: 500;
}
.bli-prod-price {
  font-size: 12px;
  color: var(--accent);
}
.bli-remove {
  border: none;
  background: transparent;
  cursor: pointer;
  color: #555;
  font-size: 14px;
  margin-left: auto;
}
.bli-empty {
  border: 1.5px dashed var(--border-dark);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  font-size: 12px;
  color: #444;
}
.bundle-totals {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #777;
}
.accent-row {
  color: var(--accent);
}
.total-final {
  color: var(--text);
  font-size: 18px;
  font-weight: 700;
  margin-top: 4px;
}
.bundle-footer-bar {
  background: var(--surface);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 14px 48px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--text);
}
.payment-logos {
  display: flex;
  gap: 8px;
  margin-left: auto;
}
.pay-logo {
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 700;
  color: var(--text-3);
}
/* text-align: center; padding: 48px; color: var(--text-2); } */

/* RESPONSIVE */
@media (max-width: 1024px) {
  .bundle-layout {
    grid-template-columns: 1fr;
  }
  .bundle-sidebar {
    border-left: none;
    border-top: 1px solid var(--border-dark);
  }
  .bundle-main {
    padding: 32px 24px;
  }
}

@media (max-width: 768px) {
  .topbar-title {
    display: none;
  }
  .bundle-products-grid {
    grid-template-columns: 1fr;
  }
  .step-label {
    display: none;
  }
  .steps {
    justify-content: center;
    gap: 12px;
  }
  .bundle-footer-bar {
    flex-direction: column;
    gap: 12px;
    text-align: center;
    padding: 24px;
  }
  .payment-logos {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .step-header h2 {
    font-size: 24px;
  }
  .bundle-nav {
    flex-direction: column;
    gap: 16px;
  }
  .bundle-nav .btn {
    width: 100%;
  }
}
</style>
