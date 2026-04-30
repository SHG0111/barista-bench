<template>
  <div class="bg-white text-text min-h-screen py-10 pb-[120px] font-body">
    <div class="max-w-[1200px] mx-auto px-0">
      <div class="flex flex-col-reverse lg:flex-row min-h-[calc(100vh-40px)]">
        <!-- Left: Checkout Forms -->
        <div class="flex-[1.25] p-10 lg:pr-[60px] lg:pl-6">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-[12px] mb-12">
            <NuxtLink to="/cart" class="text-accent no-underline font-semibold">Cart</NuxtLink>
            <span class="text-text-3">›</span>
            <span
              class="cursor-pointer font-semibold"
              :class="step === 'information' ? 'text-text' : 'text-accent'"
              @click="setStep('information')"
              >Information</span
            >
            <span class="text-text-3">›</span>
            <span
              class="font-semibold"
              :class="[
                step === 'shipping' ? 'text-text' : 
                step === 'payment' ? 'text-accent cursor-pointer' : 
                'text-text-3'
              ]"
              @click="step === 'payment' ? setStep('shipping') : null"
              >Shipping</span
            >
            <span class="text-text-3">›</span>
            <span class="font-semibold" :class="step === 'payment' ? 'text-text' : 'text-text-3'"
              >Payment</span
            >
          </nav>

          <transition name="fade" mode="out-in">
            <div :key="step">
              <!-- INFORMATION STEP -->
              <div v-if="step === 'information'">
                <!-- Country Selection Tabs -->
                <section class="mb-12">
                  <div class="flex justify-between items-baseline mb-5">
                    <h2 class="font-display text-2xl font-medium">Select Country</h2>
                  </div>
                  <div class="flex flex-wrap gap-2.5 mb-8">
                    <button
                      v-for="c in availableCountriesList"
                      :key="c.code"
                      class="px-4 py-2.5 rounded-[40px] border border-border text-[13px] font-medium cursor-pointer transition-all duration-200 font-body"
                      :class="form.country === c.code ? 'bg-accent border-accent text-white' : 'bg-white text-text-2 hover:border-[#a09d98] hover:text-text'"
                      @click="form.country = c.code"
                      type="button"
                    >
                      {{ c.name }}
                    </button>
                  </div>
                </section>

                <!-- Contact Info -->
                <section class="mb-12">
                  <div class="flex justify-between items-baseline mb-5">
                    <h2 class="font-display text-2xl font-medium">Account</h2>
                    <div class="text-[13px] text-text-2" v-if="!user">
                      Already have an account?
                      <NuxtLink to="/auth/login" class="text-accent no-underline font-semibold">Log in</NuxtLink>
                    </div>
                  </div>

                  <div v-if="user" class="bg-surface-2 p-4 sm:p-5 rounded">
                    <div class="flex justify-between items-center">
                      <span class="text-sm font-medium text-text">{{ user.email }}</span>
                      <button
                        class="bg-none border-none text-accent text-[13px] font-semibold cursor-pointer p-0 no-underline hover:underline"
                        @click="supabase.auth.signOut()"
                      >
                        Log out
                      </button>
                    </div>
                  </div>

                  <div v-else class="space-y-3.5">
                    <div class="mb-3.5">
                      <input
                        type="email"
                        placeholder="Email Address"
                        v-model="form.email"
                        required
                        class="w-full bg-white border border-border rounded px-4 py-3.5 text-sm font-body text-text outline-none transition-all duration-200 focus:border-accent placeholder:text-[#a09d98]"
                      />
                    </div>
                    <div class="flex items-center gap-2.5 mt-4">
                      <input type="checkbox" id="news" checked class="w-[18px] h-[18px] accent-accent" />
                      <label for="news" class="text-[13.5px] text-text-2">Email me with news and offers regarding gear drops</label>
                    </div>
                  </div>
                </section>

                <!-- Shipping Address -->
                <section class="mb-12">
                  <div class="flex justify-between items-baseline mb-5">
                    <h2 class="font-display text-2xl font-medium">Shipping Address</h2>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                    <input
                      type="text"
                      placeholder="First name"
                      v-model="form.firstName"
                      required
                      class="w-full bg-white border border-border rounded px-4 py-3.5 text-sm font-body text-text outline-none transition-all duration-200 focus:border-accent placeholder:text-[#a09d98]"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      v-model="form.lastName"
                      required
                      class="w-full bg-white border border-border rounded px-4 py-3.5 text-sm font-body text-text outline-none transition-all duration-200 focus:border-accent placeholder:text-[#a09d98]"
                    />
                  </div>

                  <div class="mb-3.5">
                    <input
                      type="text"
                      placeholder="Address (P.O. Boxes not permitted)"
                      v-model="form.address"
                      required
                      class="w-full bg-white border border-border rounded px-4 py-3.5 text-sm font-body text-text outline-none transition-all duration-200 focus:border-accent placeholder:text-[#a09d98]"
                    />
                  </div>

                  <div class="mb-3.5">
                    <input
                      type="text"
                      placeholder="Apartment, suite, etc. (optional)"
                      v-model="form.apartment"
                      class="w-full bg-white border border-border rounded px-4 py-3.5 text-sm font-body text-text outline-none transition-all duration-200 focus:border-accent placeholder:text-[#a09d98]"
                    />
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mb-3.5">
                    <select v-model="form.city" required class="w-full bg-white border border-border rounded px-4 py-3.5 text-sm font-body text-text outline-none transition-all duration-200 focus:border-accent appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%2212%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%236B6862%22_stroke-width=%222%22%3E%3Cpath_d=%22M6_9l6_6_6-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center]">
                      <option value="" disabled selected>City</option>
                      <option
                        v-for="city in availableCities"
                        :key="city"
                        :value="city"
                      >
                        {{ city }}
                      </option>
                    </select>
                    <input
                      type="text"
                      placeholder="State / Emirate"
                      v-model="form.state"
                      required
                      class="w-full bg-white border border-border rounded px-4 py-3.5 text-sm font-body text-text outline-none transition-all duration-200 focus:border-accent placeholder:text-[#a09d98]"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      v-model="form.zip"
                      required
                      class="w-full bg-white border border-border rounded px-4 py-3.5 text-sm font-body text-text outline-none transition-all duration-200 focus:border-accent placeholder:text-[#a09d98] sm:col-span-2 md:col-span-1"
                    />
                  </div>

                  <div class="mb-3.5">
                    <input
                      type="tel"
                      placeholder="Phone"
                      v-model="form.phone"
                      required
                      class="w-full bg-white border border-border rounded px-4 py-3.5 text-sm font-body text-text outline-none transition-all duration-200 focus:border-accent placeholder:text-[#a09d98]"
                    />
                  </div>
                </section>

                <!-- Actions -->
                <div class="flex flex-col-reverse sm:flex-row justify-between items-center mt-8 pt-6 border-t border-border gap-5">
                  <NuxtLink to="/cart" class="text-[13px] text-accent no-underline hover:underline">‹ Return to cart</NuxtLink>
                  <button class="w-full sm:w-auto px-8 py-4.5 text-[12px] font-bold tracking-[0.1em] uppercase rounded bg-accent text-white border-none cursor-pointer transition-all duration-200 hover:bg-[#a67243] hover:-translate-y-0.5" @click="proceedToShipping">
                    CONTINUE TO SHIPPING
                  </button>
                </div>
              </div>

              <!-- SHIPPING STEP -->
              <div v-else-if="step === 'shipping'">
                <section class="mb-10 border border-border rounded-lg bg-white p-0">
                  <div class="flex items-center px-4 py-4 border-b border-border">
                    <div class="w-20 text-text-2 text-sm">Contact</div>
                    <div class="flex-1 text-sm text-text">{{ form.phone || "No phone provided" }}</div>
                    <button class="bg-none border-none text-accent text-[12px] font-semibold cursor-pointer hover:underline" @click="setStep('information')">
                      Change
                    </button>
                  </div>
                  <div class="flex items-center px-4 py-4">
                    <div class="w-20 text-text-2 text-sm">Ship to</div>
                    <div class="flex-1 text-sm text-text truncate">
                      {{ form.address }}, {{ form.city }}, {{ form.state }} {{ form.zip }}, {{ form.country }}
                    </div>
                    <button class="bg-none border-none text-accent text-[12px] font-semibold cursor-pointer hover:underline" @click="setStep('information')">
                      Change
                    </button>
                  </div>
                </section>

                <section class="mb-12">
                  <div class="flex justify-between items-baseline mb-5">
                    <h2 class="font-display text-2xl font-medium">Shipping Method</h2>
                  </div>

                  <div class="flex flex-col gap-3">
                    <label
                      class="flex justify-between items-center border p-4 rounded-lg cursor-pointer transition-all duration-200"
                      :class="shippingMethod === 'standard' ? 'border-accent bg-accent/5' : 'border-border'"
                    >
                      <div class="flex items-center gap-3">
                        <input
                          type="radio"
                          value="standard"
                          v-model="shippingMethod"
                          class="accent-accent w-[18px] h-[18px]"
                        />
                        <div class="flex flex-col">
                          <span class="text-[15px] font-semibold text-text">Standard Shipping</span>
                          <span class="text-[13px] text-text-2">3-5 business days</span>
                        </div>
                      </div>
                      <div class="text-[15px] font-semibold text-text">Free</div>
                    </label>

                    <label
                      class="flex justify-between items-center border p-4 rounded-lg cursor-pointer transition-all duration-200"
                      :class="shippingMethod === 'express' ? 'border-accent bg-accent/5' : 'border-border'"
                    >
                      <div class="flex items-center gap-3">
                        <input
                          type="radio"
                          value="express"
                          v-model="shippingMethod"
                          class="accent-accent w-[18px] h-[18px]"
                        />
                        <div class="flex flex-col">
                          <span class="text-[15px] font-semibold text-text">Express Priority</span>
                          <span class="text-[13px] text-text-2">1-2 business days</span>
                        </div>
                      </div>
                      <div class="text-[15px] font-semibold text-text">$15.00</div>
                    </label>
                  </div>
                </section>

                <div class="flex flex-col-reverse sm:flex-row justify-between items-center mt-8 pt-6 border-t border-border gap-5">
                  <button
                    class="bg-none border-none p-0 cursor-pointer text-[13px] text-accent no-underline hover:underline"
                    @click="setStep('information')"
                  >
                    ‹ Return to information
                  </button>
                  <button class="w-full sm:w-auto px-8 py-4.5 text-[12px] font-bold tracking-[0.1em] uppercase rounded bg-accent text-white border-none cursor-pointer transition-all duration-200 hover:bg-[#a67243] hover:-translate-y-0.5" @click="proceedToPayment">
                    CONTINUE TO PAYMENT
                  </button>
                </div>
              </div>

              <!-- PAYMENT STEP -->
              <div v-else-if="step === 'payment'">
                <section class="mb-10 border border-border rounded-lg bg-white p-0">
                  <div class="flex items-center px-4 py-4 border-b border-border">
                    <div class="w-20 text-text-2 text-sm">Contact</div>
                    <div class="flex-1 text-sm text-text">{{ form.phone || "No phone provided" }}</div>
                    <button class="bg-none border-none text-accent text-[12px] font-semibold cursor-pointer hover:underline" @click="setStep('information')">Change</button>
                  </div>
                  <div class="flex items-center px-4 py-4 border-b border-border">
                    <div class="w-20 text-text-2 text-sm">Ship to</div>
                    <div class="flex-1 text-sm text-text truncate">{{ form.address }}, {{ form.city }}, {{ form.state }} {{ form.zip }}, {{ form.country }}</div>
                    <button class="bg-none border-none text-accent text-[12px] font-semibold cursor-pointer hover:underline" @click="setStep('information')">Change</button>
                  </div>
                  <div class="flex items-center px-4 py-4">
                    <div class="w-20 text-text-2 text-sm">Method</div>
                    <div class="flex-1 text-sm text-text">
                      {{ shippingMethod === "standard" ? "Standard Shipping" : "Express Priority" }}
                      <span class="font-semibold"> · {{ shippingMethod === "standard" ? "Free" : "$15.00" }}</span>
                    </div>
                    <button class="bg-none border-none text-accent text-[12px] font-semibold cursor-pointer hover:underline" @click="setStep('shipping')">Change</button>
                  </div>
                </section>

                <section class="mb-12">
                  <div class="flex justify-between items-baseline mb-5">
                    <h2 class="font-display text-2xl font-medium">Payment</h2>
                  </div>
                  <p class="text-text-2 text-sm mb-5 -mt-2.5">
                    All transactions are secure and encrypted.
                  </p>

                  <div class="flex flex-col gap-3 mb-6">
                    <label
                      class="flex justify-between items-center border p-4 rounded-lg cursor-pointer transition-all duration-200"
                      :class="paymentMethod === 'online' ? 'border-accent bg-accent/5' : 'border-border'"
                    >
                      <div class="flex items-center gap-3">
                        <input
                          type="radio"
                          value="online"
                          v-model="paymentMethod"
                          class="accent-accent w-[18px] h-[18px]"
                        />
                        <span class="text-[15px] font-semibold text-text">Credit Card & Secure Online Payments</span>
                      </div>
                    </label>
                    <label
                      class="flex justify-between items-center border p-4 rounded-lg cursor-pointer transition-all duration-200"
                      :class="paymentMethod === 'cod' ? 'border-accent bg-accent/5' : 'border-border'"
                    >
                      <div class="flex items-center gap-3">
                        <input
                          type="radio"
                          value="cod"
                          v-model="paymentMethod"
                          class="accent-accent w-[18px] h-[18px]"
                        />
                        <span class="text-[15px] font-semibold text-text">Cash on Delivery (COD)</span>
                      </div>
                    </label>
                  </div>

                  <div
                    v-show="paymentMethod === 'online'"
                    class="p-4 bg-white border border-border rounded-lg min-h-[120px] flex flex-col justify-center"
                  >
                    <div v-if="stripeLoading" class="text-center text-sm text-text-2">
                      Loading secure checkout...
                    </div>
                    <div id="payment-element"></div>
                    <div v-if="stripeError" class="mt-3 text-[#d32f2f] text-[13px] bg-[#fdeaea] p-3 rounded">
                      {{ stripeError }}
                    </div>
                  </div>

                  <div v-show="paymentMethod === 'cod'" class="p-8 text-center bg-surface-2/50 rounded-lg">
                    <svg
                      viewBox="0 0 24 24"
                      width="48"
                      height="48"
                      fill="currentColor"
                      class="text-text/10 mb-4 mx-auto"
                    >
                      <path
                        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
                      ></path>
                      <path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path>
                    </svg>
                    <p class="text-text-2 text-sm max-w-sm mx-auto">
                      You will pay for your order in physical cash directly to
                      the delivery agent upon receiving your items.
                    </p>
                  </div>
                </section>

                <div class="flex flex-col-reverse sm:flex-row justify-between items-center mt-8 pt-6 border-t border-border gap-5">
                  <button
                    class="bg-none border-none p-0 cursor-pointer text-[13px] text-accent no-underline hover:underline"
                    @click="setStep('shipping')"
                  >
                    ‹ Return to shipping
                  </button>
                  <button
                    class="w-full sm:w-auto px-8 py-4.5 text-[12px] font-bold tracking-[0.1em] uppercase rounded bg-accent text-white border-none cursor-pointer transition-all duration-200 hover:bg-[#a67243] hover:-translate-y-0.5"
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

          <div class="flex gap-4 mt-[60px] pt-5 border-t border-border">
            <NuxtLink to="/fullReturnPolicy" class="text-[11px] text-text-3 no-underline hover:text-accent">Refund policy</NuxtLink>
            <NuxtLink to="/shippingPolicy" class="text-[11px] text-text-3 no-underline hover:text-accent">Shipping policy</NuxtLink>
            <NuxtLink to="/termsAndConditions" class="text-[11px] text-text-3 no-underline hover:text-accent">Terms of service</NuxtLink>
          </div>
        </div>

        <!-- Right: Order Summary Sidebar -->
        <div class="flex-1 bg-surface-2 lg:border-l border-border/50">
          <div class="sticky top-10 p-10 lg:pr-6 lg:pl-10 space-y-6">
            <!-- Items Box -->
            <div class="flex flex-col gap-4 pb-6 border-b border-border">
              <div v-for="item in items" :key="item.id" class="flex items-center gap-4">
                <div class="relative w-16 h-16 bg-white rounded-lg shrink-0 flex items-center justify-center">
                  <div class="absolute -top-2 -right-2 bg-text-2/90 text-white w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold z-[2]">{{ item.quantity }}</div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    class="w-6 h-6 opacity-20 text-text"
                  >
                    <path
                      d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                    ></path>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-semibold text-text truncate">{{ item.products.name }}</div>
                  <div class="text-[11px] text-text-3" v-if="item.products.series">
                    {{ item.products.series }}
                  </div>
                </div>
                <div class="text-sm font-semibold text-text">
                  {{ currency }}
                  {{ (item.products.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>

            <div class="flex gap-3 pb-6 border-b border-border group">
              <input type="text" placeholder="Gift card or discount code" class="flex-1 bg-white border border-border rounded px-4 py-3.5 text-sm font-body" />
              <button class="bg-[#e0ddd5] text-text-3 border-none rounded px-6 font-bold cursor-not-allowed transition-all duration-200 group-focus-within:bg-accent group-focus-within:text-white group-focus-within:cursor-pointer">Apply</button>
            </div>

            <!-- Totals -->
            <div class="flex flex-col gap-3 pb-6 border-b border-border">
              <div class="flex justify-between text-sm text-text-2">
                <span>Subtotal</span>
                <span class="text-text font-medium">{{ currency }} {{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm text-accent font-semibold" v-if="isBundle">
                <span>Bundle Discount (15%)</span>
                <span>−{{ currency }} {{ discount.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm text-text-2">
                <span>Shipping</span>
                <span class="text-text font-medium">{{
                  step === 'information' ? 'Calculated at next step' : 
                  (shippingCost === 0 ? "Free" : currency + " " + shippingCost.toFixed(2))
                }}</span>
              </div>
              <div class="flex justify-between text-sm text-text-2">
                <span>Taxes</span>
                <span class="text-text font-medium">{{ step === 'information' ? 'Calculated at next step' : currency + ' ' + taxes.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Final -->
            <div class="mt-6 flex justify-between items-baseline">
              <span class="text-base text-text">Total</span>
              <div class="flex items-baseline gap-2">
                <span class="text-[12px] text-text-3">{{ currency }}</span>
                <span class="text-2xl font-bold text-text">{{
                  step !== 'information' ? finalTotal.toFixed(2) : total.toFixed(2)
                }}</span>
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
  
  if (finalTotal.value <= 0) {
    stripeError.value = "Total must be greater than 0 for online payments.";
    stripeLoading.value = false;
    return;
  }

  const restrictedCurrencies = ['KWD', 'BHD', 'JOD', 'OMR', 'LBP'];
  const isRestricted = restrictedCurrencies.includes(currency.value.toUpperCase());
  
  const processingCurrency = isRestricted ? 'usd' : currency.value.toLowerCase();
  let processingAmount = stripeAmount;

  if (isRestricted) {
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
      await clearCart(); 
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
