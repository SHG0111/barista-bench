<template>
  <div class="checkout-page">
    <div class="container">
      <div class="checkout-grid">
        <!-- Left: Checkout Forms -->
        <div class="checkout-forms">
          <!-- Breadcrumb -->
          <nav class="checkout-breadcrumb">
            <NuxtLink to="/cart">Cart</NuxtLink>
            <span class="sep">›</span>
            <span
              :class="step === 'information' ? 'current' : 'completed'"
              @click="setStep('information')"
              >Information</span
            >
            <span class="sep">›</span>
            <span
              :class="
                step === 'shipping'
                  ? 'current'
                  : step === 'payment'
                    ? 'completed'
                    : 'inactive'
              "
              @click="step === 'payment' ? setStep('shipping') : null"
              >Shipping</span
            >
            <span class="sep">›</span>
            <span :class="step === 'payment' ? 'current' : 'inactive'"
              >Payment</span
            >
          </nav>

          <transition name="fade" mode="out-in">
            <div :key="step">
              <!-- INFORMATION STEP -->
              <div v-if="step === 'information'">
                <!-- Country Selection Tabs -->
                <section class="form-section">
                  <div class="section-header">
                    <h2>Select Country</h2>
                  </div>
                  <div class="country-tabs">
                    <button
                      v-for="c in availableCountriesList"
                      :key="c.code"
                      :class="[
                        'country-tab',
                        { active: form.country === c.code },
                      ]"
                      @click="form.country = c.code"
                      type="button"
                    >
                      {{ c.name }}
                    </button>
                  </div>
                </section>

                <!-- Contact Info -->
                <section class="form-section">
                  <div class="section-header">
                    <h2>Account</h2>
                    <div class="login-prompt" v-if="!user">
                      Already have an account?
                      <NuxtLink to="/auth/login">Log in</NuxtLink>
                    </div>
                  </div>

                  <div v-if="user" class="logged-in-box">
                    <div class="user-info">
                      <span class="user-email">{{ user.email }}</span>
                      <button
                        class="logout-link"
                        @click="supabase.auth.signOut()"
                      >
                        Log out
                      </button>
                    </div>
                  </div>

                  <div v-else>
                    <div class="input-group">
                      <input
                        type="email"
                        placeholder="Email Address"
                        v-model="form.email"
                        required
                      />
                    </div>
                    <div class="checkbox-group">
                      <input type="checkbox" id="news" checked />
                      <label for="news"
                        >Email me with news and offers regarding gear
                        drops</label
                      >
                    </div>
                  </div>
                </section>

                <!-- Shipping Address -->
                <section class="form-section">
                  <div class="section-header">
                    <h2>Shipping Address</h2>
                  </div>

                  <div class="form-row">
                    <div class="input-group">
                      <input
                        type="text"
                        placeholder="First name"
                        v-model="form.firstName"
                        required
                      />
                    </div>
                    <div class="input-group">
                      <input
                        type="text"
                        placeholder="Last name"
                        v-model="form.lastName"
                        required
                      />
                    </div>
                  </div>

                  <div class="input-group">
                    <input
                      type="text"
                      placeholder="Address (P.O. Boxes not permitted)"
                      v-model="form.address"
                      required
                    />
                  </div>

                  <div class="input-group">
                    <input
                      type="text"
                      placeholder="Apartment, suite, etc. (optional)"
                      v-model="form.apartment"
                    />
                  </div>

                  <div class="form-row three-col">
                    <div class="input-group">
                      <select v-model="form.city" required>
                        <option value="" disabled selected>City</option>
                        <option
                          v-for="city in availableCities"
                          :key="city"
                          :value="city"
                        >
                          {{ city }}
                        </option>
                      </select>
                    </div>
                    <div class="input-group">
                      <input
                        type="text"
                        placeholder="State / Emirate"
                        v-model="form.state"
                        required
                      />
                    </div>
                    <div class="input-group">
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        v-model="form.zip"
                        required
                      />
                    </div>
                  </div>

                  <div class="input-group">
                    <input
                      type="tel"
                      placeholder="Phone"
                      v-model="form.phone"
                      required
                    />
                  </div>
                </section>

                <!-- Continue Button -->
                <div class="checkout-actions">
                  <NuxtLink to="/cart" class="return-link"
                    >‹ Return to cart</NuxtLink
                  >
                  <button class="btn-primary-alt" @click="proceedToShipping">
                    CONTINUE TO SHIPPING
                  </button>
                </div>
              </div>

              <!-- SHIPPING STEP -->
              <div v-else-if="step === 'shipping'">
                <section class="form-section summary-contact-box">
                  <div class="summary-contact-row">
                    <div class="col-lbl">Contact</div>
                    <div class="col-val">
                      {{ form.phone || "No phone provided" }}
                    </div>
                    <button class="col-act" @click="setStep('information')">
                      Change
                    </button>
                  </div>
                  <div class="summary-contact-row">
                    <div class="col-lbl">Ship to</div>
                    <div class="col-val">
                      {{ form.address }}, {{ form.city }}, {{ form.state }}
                      {{ form.zip }}, {{ form.country }}
                    </div>
                    <button class="col-act" @click="setStep('information')">
                      Change
                    </button>
                  </div>
                </section>

                <section class="form-section">
                  <div class="section-header">
                    <h2>Shipping Method</h2>
                  </div>

                  <div class="shipping-methods">
                    <label
                      class="radio-card"
                      :class="{ active: shippingMethod === 'standard' }"
                    >
                      <div class="rc-left">
                        <input
                          type="radio"
                          value="standard"
                          v-model="shippingMethod"
                        />
                        <div class="rc-info">
                          <span class="rc-title">Standard Shipping</span>
                          <span class="rc-desc">3-5 business days</span>
                        </div>
                      </div>
                      <div class="rc-price">Free</div>
                    </label>

                    <label
                      class="radio-card"
                      :class="{ active: shippingMethod === 'express' }"
                    >
                      <div class="rc-left">
                        <input
                          type="radio"
                          value="express"
                          v-model="shippingMethod"
                        />
                        <div class="rc-info">
                          <span class="rc-title">Express Priority</span>
                          <span class="rc-desc">1-2 business days</span>
                        </div>
                      </div>
                      <div class="rc-price">$15.00</div>
                    </label>
                  </div>
                </section>

                <div class="checkout-actions">
                  <button
                    class="return-link"
                    @click="setStep('information')"
                    style="
                      background: none;
                      border: none;
                      cursor: pointer;
                      padding: 0;
                    "
                  >
                    ‹ Return to information
                  </button>
                  <button class="btn-primary-alt" @click="proceedToPayment">
                    CONTINUE TO PAYMENT
                  </button>
                </div>
              </div>

              <!-- PAYMENT STEP -->
              <div v-else-if="step === 'payment'">
                <section class="form-section summary-contact-box">
                  <div class="summary-contact-row">
                    <div class="col-lbl">Contact</div>
                    <div class="col-val">
                      {{ form.phone || "No phone provided" }}
                    </div>
                    <button class="col-act" @click="setStep('information')">
                      Change
                    </button>
                  </div>
                  <div class="summary-contact-row">
                    <div class="col-lbl">Ship to</div>
                    <div class="col-val">
                      {{ form.address }}, {{ form.city }}, {{ form.state }}
                      {{ form.zip }}, {{ form.country }}
                    </div>
                    <button class="col-act" @click="setStep('information')">
                      Change
                    </button>
                  </div>
                  <div class="summary-contact-row">
                    <div class="col-lbl">Method</div>
                    <div class="col-val">
                      {{
                        shippingMethod === "standard"
                          ? "Standard Shipping"
                          : "Express Priority"
                      }}
                      <span class="sm-price"
                        >·
                        {{
                          shippingMethod === "standard" ? "Free" : "$15.00"
                        }}</span
                      >
                    </div>
                    <button class="col-act" @click="setStep('shipping')">
                      Change
                    </button>
                  </div>
                </section>

                <section class="form-section">
                  <div class="section-header">
                    <h2>Payment</h2>
                  </div>
                  <p
                    class="subtitle"
                    style="
                      margin-top: -10px;
                      margin-bottom: 20px;
                      color: #73706c;
                      font-size: 14px;
                    "
                  >
                    All transactions are secure and encrypted.
                  </p>

                  <div class="shipping-methods" style="margin-bottom: 24px">
                    <label
                      class="radio-card"
                      :class="{ active: paymentMethod === 'online' }"
                    >
                      <div class="rc-left">
                        <input
                          type="radio"
                          value="online"
                          v-model="paymentMethod"
                        />
                        <div class="rc-info">
                          <span class="rc-title"
                            >Credit Card & Secure Online Payments</span
                          >
                        </div>
                      </div>
                    </label>
                    <label
                      class="radio-card"
                      :class="{ active: paymentMethod === 'cod' }"
                    >
                      <div class="rc-left">
                        <input
                          type="radio"
                          value="cod"
                          v-model="paymentMethod"
                        />
                        <div class="rc-info">
                          <span class="rc-title">Cash on Delivery (COD)</span>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div
                    v-show="paymentMethod === 'online'"
                    class="stripe-container"
                  >
                    <div v-if="stripeLoading" class="loading-spinner">
                      Loading secure checkout...
                    </div>
                    <div id="payment-element"></div>
                    <div v-if="stripeError" class="stripe-error-message">
                      {{ stripeError }}
                    </div>
                  </div>

                  <div v-show="paymentMethod === 'cod'" class="cod-container">
                    <svg
                      viewBox="0 0 24 24"
                      width="48"
                      height="48"
                      fill="rgba(0,0,0,0.1)"
                      style="
                        margin-bottom: 16px;
                        margin-top: 20px;
                        display: block;
                        margin-inline: auto;
                      "
                    >
                      <path
                        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
                      ></path>
                      <path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path>
                    </svg>
                    <p
                      style="
                        color: #73706c;
                        font-size: 14px;
                        text-align: center;
                      "
                    >
                      You will pay for your order in physical cash directly to
                      the delivery agent upon receiving your items.
                    </p>
                  </div>
                </section>

                <div class="checkout-actions">
                  <button
                    class="return-link"
                    @click="setStep('shipping')"
                    style="
                      background: none;
                      border: none;
                      cursor: pointer;
                      padding: 0;
                    "
                  >
                    ‹ Return to shipping
                  </button>
                  <button
                    class="btn-primary-alt"
                    @click="completeOrder"
                    :disabled="isProcessing"
                  >
                    <span v-if="!isProcessing">PAY NOW</span>
                    <span v-else>PROCESSING...</span>
                  </button>
                </div>
              </div>
            </div>
          </transition>

          <div class="footer-links">
            <NuxtLink to="/fullReturnPolicy">Refund policy</NuxtLink>
            <NuxtLink to="/shippingPolicy">Shipping policy</NuxtLink>
            <NuxtLink to="/termsAndConditions">Terms of service</NuxtLink>
          </div>
        </div>

        <!-- Right: Order Summary Sidebar -->
        <div class="checkout-summary-wrap">
          <div class="checkout-summary">
            <!-- Items Box -->
            <div class="summary-items">
              <div v-for="item in items" :key="item.id" class="summary-item">
                <div class="si-img">
                  <div class="si-badge">{{ item.quantity }}</div>
                  <div class="img-placeholder">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="si-details">
                  <div class="si-name">{{ item.products.name }}</div>
                  <div class="si-meta" v-if="item.products.series">
                    {{ item.products.series }}
                  </div>
                </div>
                <div class="si-price">
                  {{ currency }}
                  {{ (item.products.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>

            <div class="discount-box">
              <input type="text" placeholder="Gift card or discount code" />
              <button class="btn-apply">Apply</button>
            </div>

            <!-- Totals -->
            <div class="totals-box">
              <div class="tl-line">
                <span>Subtotal</span>
                <span>{{ currency }} {{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="tl-line" v-if="isBundle">
                <span>Bundle Discount (15%)</span>
                <span>−{{ currency }} {{ discount.toFixed(2) }}</span>
              </div>
              <div class="tl-line" v-if="step !== 'information'">
                <span>Shipping</span>
                <span>{{
                  shippingCost === 0
                    ? "Free"
                    : currency + " " + shippingCost.toFixed(2)
                }}</span>
              </div>
              <div class="tl-line" v-else>
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div class="tl-line" v-if="step !== 'information'">
                <span>Taxes</span>
                <span>{{ currency }} {{ taxes.toFixed(2) }}</span>
              </div>
              <div class="tl-line" v-else>
                <span>Taxes</span>
                <span>Calculated at next step</span>
              </div>
            </div>

            <!-- Final -->
            <div class="summary-total">
              <div class="st-main">
                <span>Total</span>
                <span class="st-cur">{{ currency }}</span>
                <span class="st-val" v-if="step !== 'information'">{{
                  finalTotal.toFixed(2)
                }}</span>
                <span class="st-val" v-else>{{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue";
import { loadStripe } from "@stripe/stripe-js";

definePageMeta({ layout: "default" });

const config = useRuntimeConfig();
const { items, subtotal, discount, total, isBundle, fetchCart, clearCart } = useCart();
const user = useSupabaseUser();
const supabase: any = useSupabaseClient();
const toast = useToast();

const step = ref<"information" | "shipping" | "payment">("information");

const form = reactive({
  email: "",
  country: "AE",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
});

const countryToCities: Record<string, string[]> = {
  AE: [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Fujairah",
    "Ras Al Khaimah",
    "Umm Al Quwain",
    "Al Ain",
  ],
  SA: [
    "Riyadh",
    "Jeddah",
    "Mecca",
    "Medina",
    "Dammam",
    "Khobar",
    "Dhahran",
    "Tabuk",
    "Taif",
  ],
  QA: ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor"],
  KW: ["Kuwait City", "Al Ahmadi", "Hawalli", "Salmiya", "Al Farwaniyah"],
  BH: ["Manama", "Muharraq", "Riffa", "Hamad Town"],
  OM: ["Muscat", "Salalah", "Sohar", "Nizwa"],
  JO: ["Amman", "Zarqa", "Irbid", "Aqaba"],
  LB: ["Beirut", "Tripoli", "Sidon", "Tyre"],
  EG: [
    "Cairo",
    "Alexandria",
    "Giza",
    "Sharm El Sheikh",
    "Hurghada",
    "Luxor",
    "Aswan",
  ],
};

const availableCities = computed(() => countryToCities[form.country] || []);

watch(
  () => form.country,
  () => {
    form.city = "";
  },
);

const shippingMethod = ref("standard");
const paymentMethod = ref("online");

const availableCountriesList = [
  { code: "AE", name: "UAE" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "QA", name: "Qatar" },
  { code: "KW", name: "Kuwait" },
  { code: "BH", name: "Bahrain" },
  { code: "OM", name: "Oman" },
  { code: "JO", name: "Jordan" },
  { code: "LB", name: "Lebanon" },
  { code: "EG", name: "Egypt" },
];

// Stripe
const stripeLoading = ref(false);
const stripeError = ref("");
const isProcessing = ref(false);
let stripeApp: any = null;
let stripeElements: any = null;

onMounted(() => {
  if (user.value) {
    fetchCart();
    form.email = user.value.email || "";
  }
});

const shippingCost = computed(() => {
  return shippingMethod.value === "express" ? 15.0 : 0.0;
});

const taxes = computed(() => {
  return (total.value + shippingCost.value) * 0.08; // 8% mock tax calculation
});

const finalTotal = computed(() => {
  return total.value + shippingCost.value + taxes.value;
});

const currency = computed(() => {
  const map: Record<string, string> = {
    AE: "AED",
    SA: "SAR",
    QA: "QAR",
    KW: "KWD",
    BH: "BHD",
    OM: "OMR",
    JO: "JOD",
    LB: "USD",
    EG: "EGP",
  };
  return map[form.country] || "USD";
});

const getStripeAmount = (total: number, cur: string) => {
  const threeDecimal = ["bhd", "jod", "kwd", "omr"];
  if (threeDecimal.includes(cur.toLowerCase())) return Math.round(total * 1000);
  return Math.round(total * 100);
};

const setStep = (newStep: "information" | "shipping" | "payment") => {
  step.value = newStep;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const proceedToShipping = () => {
  if (
    !form.firstName ||
    !form.lastName ||
    !form.address ||
    !form.city ||
    !form.zip
  ) {
    toast.error("Please fill in all required shipping fields.");
    return;
  }
  setStep("shipping");
};

const proceedToPayment = () => {
  setStep("payment");
  initializeStripe();
};

const initializeStripe = async () => {
  stripeLoading.value = true;
  stripeError.value = "";

  if (
    !config.public.stripePublishableKey ||
    config.public.stripePublishableKey.startsWith("pk_test_12345")
  ) {
    stripeError.value =
      "Stripe publishable key is missing. Please configure it in .env";
    stripeLoading.value = false;
    return;
  }

  const stripeAmount = getStripeAmount(finalTotal.value, currency.value);
  
  // Guard: Stripe cannot process payments below a certain threshold (usually ~$0.50)
  // If the total is 0, we should ideally handle it as a free checkout instead of loading Stripe.
  if (finalTotal.value <= 0) {
    stripeError.value = "Total must be greater than 0 for online payments.";
    stripeLoading.value = false;
    return;
  }

  const restrictedCurrencies = ['KWD', 'BHD', 'JOD', 'OMR', 'LBP'];
  const isRestricted = restrictedCurrencies.includes(currency.value.toUpperCase());
  
  // Use USD for restricted currencies (approximate conversion for Stripe floor)
  const processingCurrency = isRestricted ? 'usd' : currency.value.toLowerCase();
  let processingAmount = stripeAmount;

  if (isRestricted) {
    // Simple mock conversion for the Stripe API floor check
    // In a real prod app, you should use a real exchange rate API
    processingAmount = Math.round((finalTotal.value * 3.3) * 100); 
  }

  try {
    const { clientSecret } = await $fetch("/api/create-payment-intent", {
      method: "POST",
      body: {
        amount: processingAmount,
        currency: processingCurrency,
      },
    });

    stripeApp = await loadStripe(config.public.stripePublishableKey);
    if (!stripeApp) throw new Error("Stripe failed to load");

    stripeElements = stripeApp.elements({ clientSecret, theme: "stripe" });
    const paymentElement = stripeElements.create("payment", {
      wallets: {
        link: "never",
      },
      defaultValues: {
        billingDetails: {
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email || (user.value ? user.value.email : ""),
          phone: form.phone,
          address: {
            line1: form.address,
            line2: form.apartment,
            city: form.city,
            state: form.state,
            postal_code: form.zip,
            country: form.country.toUpperCase(),
          },
        },
      },
      fields: {
        billingDetails: "never",
      },
    });

    setTimeout(() => {
      paymentElement.mount("#payment-element");
      stripeLoading.value = false;
    }, 50);
  } catch (err: any) {
    console.error(err);
    stripeError.value =
      err.data?.statusMessage ||
      err.message ||
      "Failed to initialize Stripe checkout.";
    stripeLoading.value = false;
  }
};

const completeOrder = async () => {
  isProcessing.value = true;
  stripeError.value = "";

  let orderId = "ORD-" + Math.floor(Math.random() * 1000000);

  if (user.value) {
    const { error: dbError } = await supabase.from("orders").insert({
      user_id: user.value.id,
      order_number: orderId,
      status: paymentMethod.value === "cod" ? "processed" : "placed",
      subtotal: subtotal.value || total.value || 0,
      discount: discount.value || 0,
      shipping_cost: shippingCost.value || 0,
      tax: taxes.value || 0,
      total: finalTotal.value || total.value || 0,
      placed_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error("❌ SUPABASE INSERT ERROR:", dbError);
      toast.error(`Database Error: ${dbError.message}`);
    } else {
      console.log("✅ Order successfully saved to Supabase");
      await clearCart(); // Cart is now officially empty!
    }
  }

  if (paymentMethod.value === "cod") {
    await $fetch("/api/send-email", {
      method: "POST",
      body: {
        to: form.email || (user.value ? user.value.email : "guest@example.com"),
        subject: `Order Confirmed: ${orderId}`,
        content: `Your COD order for ${finalTotal.value} ${currency.value} is being processed.`,
      },
    }).catch((e) => console.error(e));

    setTimeout(() => {
      window.location.href = user.value
        ? "/account?tab=orders"
        : "/shop?success=true";
    }, 1500);
    return;
  }

  if (!stripeApp || !stripeElements) {
    toast.error("Secure checkout hasn't fully loaded.");
    isProcessing.value = false;
    return;
  }

  const { error } = await stripeApp.confirmPayment({
    elements: stripeElements,
    confirmParams: {
      return_url:
        window.location.origin +
        (user.value
          ? `/account?tab=orders&stripe_cb=true&ord_id=${orderId}`
          : "/shop?success=true"),
      payment_method_data: {
        billing_details: {
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email || (user.value ? user.value.email : ""),
          phone: form.phone,
          address: {
            line1: form.address,
            line2: form.apartment,
            city: form.city,
            state: form.state,
            postal_code: form.zip,
            country: form.country.toUpperCase(),
          },
        },
      },
    },
  });

  if (error) {
    stripeError.value = error.message || "An unknown error occurred.";
    isProcessing.value = false;
  }
};
</script>

<style scoped>
/* Tabs */
.country-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.country-tab {
  padding: 10px 16px;
  border-radius: 40px;
  background-color: var(--input-bg);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.country-tab:hover {
  border-color: #a09d98;
  color: #1a1918;
}

.country-tab.active {
  background-color: var(--accent-gold);
  border-color: var(--accent-gold);
  color: #fff;
}

/* Adhering to the Light Theme matching the Cart */
.checkout-page {
  background-color: #ffffff; /* White bg for forms */
  color: #1a1918;
  min-height: 100vh;
  padding: 40px 0 120px;
  --accent-gold: #c38a53;
  --bg-sidebar: #f5f4f1;
  --border: #e0ddd5;
  --text-muted: #73706c;
  --input-bg: #fff;
  font-family: var(--font-body);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
}

/* Base grid structure */
.checkout-grid {
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 40px);
}

/* Left Forms */
.checkout-forms {
  flex: 1.25;
  padding: 40px 60px 40px 24px;
}

.checkout-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  margin-bottom: 48px;
}

.checkout-breadcrumb a {
  color: var(--accent-gold);
  text-decoration: none;
  font-weight: 600;
}

.checkout-breadcrumb .sep {
  color: var(--text-muted);
}

.checkout-breadcrumb .current {
  color: #1a1918;
  font-weight: 600;
}

.checkout-breadcrumb .inactive {
  color: var(--text-muted);
}

/* Form Sections */
.form-section {
  margin-bottom: 48px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
}

.section-header h2 {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 24px;
  font-weight: 500;
}

.login-prompt {
  font-size: 13px;
  color: var(--text-muted);
}

.login-prompt a {
  color: var(--accent-gold);
  text-decoration: none;
  font-weight: 600;
}

.input-group {
  margin-bottom: 14px;
}

.input-group input,
.input-group select {
  width: 100%;
  background-color: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 14px 16px;
  font-size: 14px;
  font-family: var(--font-body);
  color: #1a1918;
  transition: all 0.2s;
  box-sizing: border-box;
}

.input-group input::placeholder {
  color: #a09d98;
}

.input-group input:focus,
.input-group select:focus {
  outline: none;
  border-color: var(--accent-gold);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.form-row.three-col {
  grid-template-columns: 1fr 1fr 1fr;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}

.checkbox-group input {
  width: 18px;
  height: 18px;
  accent-color: var(--accent-gold);
}

.checkbox-group label {
  font-size: 13.5px;
  color: var(--text-muted);
}

/* Logged in box */
.logged-in-box {
  background-color: var(--bg-sidebar);
  padding: 16px 20px;
  border-radius: 4px;
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-email {
  font-size: 14px;
  font-weight: 500;
  color: #1a1918;
}

.logout-link {
  background: none;
  border: none;
  color: var(--accent-gold);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
}

.logout-link:hover {
  text-decoration: underline;
}

/* Actions */
.checkout-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.return-link {
  font-size: 13px;
  color: var(--accent-gold);
  text-decoration: none;
  transition: color 0.2s;
}

.return-link:hover {
  text-decoration: underline;
}

.btn-primary-alt {
  padding: 18px 32px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 4px;
  background-color: var(--accent-gold);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary-alt:hover {
  background-color: #a67243;
  transform: translateY(-2px);
}

.footer-links {
  display: flex;
  gap: 16px;
  margin-top: 60px;
  border-top: 1px solid var(--border);
  padding-top: 20px;
}

.footer-links a {
  font-size: 11px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--accent-gold);
}

/* Right Sidebar */
.checkout-summary-wrap {
  flex: 1;
  background-color: var(--bg-sidebar);
}

.checkout-summary {
  position: sticky;
  top: 40px;
  padding: 40px 24px 40px 40px;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 24px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.si-img {
  position: relative;
  width: 64px;
  height: 64px;
  background-color: #fff;
  border-radius: 8px;
  flex-shrink: 0;
}

.img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-placeholder svg {
  width: 24px;
  height: 24px;
  opacity: 0.2;
  color: #1a1918;
}

.si-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: rgba(115, 112, 108, 0.9);
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  z-index: 2;
}

.si-details {
  flex: 1;
}

.si-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1918;
  margin-bottom: 4px;
}

.si-meta {
  font-size: 11px;
  color: var(--text-muted);
}

.si-price {
  font-size: 14px;
  font-weight: 600;
  color: #1a1918;
}

/* Discount Box */
.discount-box {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}

.discount-box input {
  flex: 1;
  background-color: #fff;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 14px 16px;
  font-size: 14px;
  font-family: var(--font-body);
}

.btn-apply {
  background-color: #e0ddd5;
  color: var(--text-muted);
  border: none;
  border-radius: 4px;
  padding: 0 24px;
  font-weight: 700;
  cursor: not-allowed; /* Disabled state style */
  transition: all 0.2s;
}

.discount-box input:focus + .btn-apply {
  background-color: var(--accent-gold);
  color: #fff;
  cursor: pointer;
}

/* Totals */
.totals-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}

.tl-line {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--text-muted);
}

.tl-line span:last-child {
  color: #1a1918;
  font-weight: 500;
}

.accent-row {
  color: var(--accent-gold) !important;
  font-weight: 600;
}

.summary-total {
  margin-top: 24px;
}

.st-main {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.st-main span:first-child {
  font-size: 16px;
  color: #1a1918;
}

.st-cur {
  font-size: 12px;
  color: var(--text-muted);
  margin-right: -4px;
  margin-left: auto;
}

.st-val {
  font-size: 24px;
  font-weight: 700;
  color: #1a1918;
  margin-left: 8px;
}

/* Multi-step animations */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.checkout-breadcrumb .completed {
  color: var(--accent-gold);
  cursor: pointer;
}

.checkout-breadcrumb .completed:hover {
  text-decoration: underline;
}

/* Summary Contact Box */
.summary-contact-box {
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--input-bg);
  padding: 0 16px;
  margin-bottom: 40px;
}
.summary-contact-row {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}
.summary-contact-row:last-child {
  border-bottom: none;
}
.col-lbl {
  width: 80px;
  color: var(--text-muted);
  font-size: 14px;
}
.col-val {
  flex: 1;
  font-size: 14px;
  color: #1a1918;
}
.col-act {
  background: none;
  border: none;
  color: var(--accent-gold);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.col-act:hover {
  text-decoration: underline;
}

/* Shipping Methods */
.shipping-methods {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.radio-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--border);
  padding: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}
.radio-card.active {
  border-color: var(--accent-gold);
  background: rgba(195, 138, 83, 0.05);
}
.rc-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.rc-left input[type="radio"] {
  accent-color: var(--accent-gold);
  width: 18px;
  height: 18px;
}
.rc-info {
  display: flex;
  flex-direction: column;
}
.rc-title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1918;
}
.rc-desc {
  font-size: 13px;
  color: var(--text-muted);
}
.rc-price {
  font-size: 15px;
  font-weight: 600;
  color: #1a1918;
}

/* Payment Methods */
.payment-methods {
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
}
.payment-accordion-item {
  border-bottom: 1px solid var(--border);
  background: var(--input-bg);
}
.payment-accordion-item:last-child {
  border-bottom: none;
}
.payment-accordion-item.active {
  background: rgba(195, 138, 83, 0.02);
}
.pa-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  cursor: pointer;
}
.pa-left {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 15px;
  color: #1a1918;
}
.pa-left input[type="radio"] {
  accent-color: var(--accent-gold);
  width: 18px;
  height: 18px;
}
.pa-icons {
  color: var(--text-muted);
}
.pa-body {
  padding: 20px;
  background: #faf9f7;
  border-top: 1px solid var(--border);
}
.cc-form .input-group:last-child {
  margin-bottom: 0;
}
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
}
.sm-price {
  font-weight: 600;
}
/* Stripe Elements */
.stripe-container {
  padding: 16px;
  background: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.loading-spinner {
  text-align: center;
  font-size: 14px;
  color: var(--text-muted);
}
.stripe-error-message {
  margin-top: 12px;
  color: #d32f2f;
  font-size: 13px;
  background: #fdeaea;
  padding: 12px;
  border-radius: 4px;
}

/* ---- RESPONSIVE MEDIA QUERIES ---- */

/* Tablet & Smaller Desktop */
@media (max-width: 992px) {
  .checkout-forms {
    padding: 40px 32px 40px 24px;
  }
  .form-row.three-col {
    grid-template-columns: 1fr 1fr;
  }
  .form-row.three-col .input-group:last-child {
    grid-column: span 2;
  }
  .checkout-summary {
    padding: 40px 24px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .checkout-page {
    padding: 0 0 60px;
    /* Remove top padding, rely on nav */
  }

  /* Stack completely */
  .checkout-grid {
    flex-direction: column-reverse; /* Usually Summary is above forms on mobile */
  }

  .checkout-summary-wrap {
    border-left: none;
    border-bottom: 1px solid var(--border);
  }

  .checkout-summary {
    position: static;
    padding: 24px;
  }

  .checkout-forms {
    padding: 32px 24px;
  }

  .checkout-actions {
    flex-direction: column-reverse; /* Return to cart below button */
    gap: 20px;
  }

  .btn-primary-alt {
    width: 100%;
  }

  .form-row,
  .form-row.three-col {
    grid-template-columns: 1fr; /* Stack all inputs */
  }

  .form-row.three-col .input-group:last-child {
    grid-column: span 1;
  }

  .section-header {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
