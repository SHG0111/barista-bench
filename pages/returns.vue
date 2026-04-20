<template>
  <div class="page-top">
    <div
      class="container returns-layout"
      style="padding-top: 48px; padding-bottom: 80px"
    >
      <!-- Left: Return form -->
      <div class="returns-main">
        <div class="section-label">Customer Care Portal</div>
        <h1 style="font-size: 38px; margin: 8px 0 10px">Start a Return</h1>
        <p
          style="
            color: var(--text-2);
            font-size: 14px;
            margin-bottom: 32px;
            line-height: 1.7;
          "
        >
          Our tools are built to last, but we understand if things aren't
          perfect. Initiate your return or exchange below in a few simple steps.
        </p>

        <!-- Active return card -->
        <div class="return-card" v-if="activeOrder">
          <!-- Header -->
          <div class="rc-header">
            <div>
              <div class="rc-tag">ACTIVE RETURN REQUEST</div>
              <div class="rc-order-num">
                Order #{{ activeOrder.order_number }}
              </div>
            </div>
            <div class="return-steps">
              <div
                v-for="(step, i) in returnSteps"
                :key="step"
                class="rs-item"
                :class="{ active: returnStep === i, done: returnStep > i }"
              >
                <div class="rs-dot"></div>
                <span>{{ step }}</span>
              </div>
            </div>
          </div>

          <!-- Step 1: Select items -->
          <div v-if="returnStep === 0" class="rc-body">
            <h3>Step 1: Select items to return</h3>
            <p>
              Choose the tools from your order that you would like to return or
              exchange.
            </p>
            <div class="return-items">
              <div
                v-for="item in activeOrder.order_items"
                :key="item.id"
                class="return-item"
                :class="{ selected: selectedReturnItems.includes(item.id) }"
                @click="toggleReturnItem(item.id)"
              >
                <div class="ri-check">
                  <div
                    v-if="selectedReturnItems.includes(item.id)"
                    class="ri-check-inner"
                  >
                    ✓
                  </div>
                </div>
                <div class="ri-img"></div>
                <div class="ri-info">
                  <div class="ri-name">{{ item.product_name }}</div>
                  <div class="ri-meta">
                    {{ item.variant_info?.color || "Matte Black" }} • Serial:
                    {{ item.product_sku }}
                  </div>
                </div>
                <div class="ri-price">${{ item.total_price?.toFixed(2) }}</div>
              </div>
            </div>
          </div>

          <!-- Step 2: Reason -->
          <div v-if="returnStep === 1" class="rc-body">
            <h3>Step 2: Reason for return</h3>
            <p>Help us understand what went wrong.</p>
            <div class="reason-options">
              <label v-for="reason in reasons" :key="reason" class="reason-opt">
                <input type="radio" v-model="returnReason" :value="reason" />
                <div
                  class="reason-card"
                  :class="{ selected: returnReason === reason }"
                >
                  {{ reason }}
                </div>
              </label>
            </div>
            <div style="margin-top: 16px">
              <label class="input-label">Additional Notes (optional)</label>
              <textarea
                v-model="returnNotes"
                class="input"
                style="height: 90px; resize: vertical"
                placeholder="Tell us more..."
              ></textarea>
            </div>
          </div>

          <!-- Step 3: Resolution -->
          <div v-if="returnStep === 2" class="rc-body">
            <h3>Step 3: Choose your resolution</h3>
            <p>How would you like to resolve this?</p>
            <div class="resolution-options">
              <div
                v-for="opt in resolutions"
                :key="opt.key"
                class="resolution-card"
                :class="{ selected: returnResolution === opt.key }"
                @click="returnResolution = opt.key"
              >
                <div class="res-icon">{{ opt.icon }}</div>
                <div>
                  <div class="res-title">{{ opt.title }}</div>
                  <div class="res-desc">{{ opt.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Confirm -->
          <div v-if="returnStep === 3" class="rc-body">
            <h3>Step 4: Confirm your return</h3>
            <div class="confirm-summary">
              <div class="cs-row">
                <span>Items</span
                ><span>{{ selectedReturnItems.length }} item(s)</span>
              </div>
              <div class="cs-row">
                <span>Reason</span><span>{{ returnReason }}</span>
              </div>
              <div class="cs-row">
                <span>Resolution</span><span>{{ returnResolution }}</span>
              </div>
            </div>
            <p style="font-size: 13px; color: var(--text-2); margin-top: 16px">
              A prepaid return label will be emailed to you within 24 hours.
              Please pack your items in the original packaging.
            </p>
          </div>

          <!-- Footer nav -->
          <div class="rc-footer">
            <button class="btn btn-ghost" @click="cancelReturn">
              CANCEL REQUEST
            </button>
            <button
              class="btn btn-primary"
              @click="nextReturnStep"
              :disabled="!canProceed || submitting"
            >
              {{
                returnStep === 3
                  ? submitting
                    ? "Submitting..."
                    : "SUBMIT RETURN"
                  : `NEXT: ${returnSteps[returnStep + 1]?.toUpperCase()}`
              }}
            </button>
          </div>
        </div>

        <!-- No active order: Order lookup -->
        <div class="card" v-else>
          <h3 style="margin-bottom: 20px">Start by finding your order</h3>
          <div class="form-row">
            <div>
              <label class="input-label">Order Number</label>
              <input
                v-model="lookupNum"
                class="input"
                placeholder="e.g. BB-123456"
              />
            </div>
            <div>
              <label class="input-label">Email Address</label>
              <input
                v-model="lookupEmail"
                type="email"
                class="input"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <button
            class="btn btn-primary"
            style="margin-top: 16px; width: 100%"
            @click="lookupOrder"
            :disabled="lookingUp"
          >
            {{ lookingUp ? "Looking up..." : "LOOKUP ORDER" }}
          </button>
          <p
            v-if="lookupError"
            style="color: var(--red); font-size: 13px; margin-top: 10px"
          >
            {{ lookupError }}
          </p>
        </div>
      </div>

      <!-- Right sidebar -->
      <div class="returns-sidebar">
        <!-- Order lookup (when order found) -->
        <div class="card" v-if="!activeOrder" style="margin-bottom: 16px">
          <h4
            style="
              font-size: 12px;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              color: var(--text-2);
              margin-bottom: 16px;
              font-family: var(--font-body);
            "
          >
            ORDER LOOKUP
          </h4>
          <label class="input-label">Order Number</label>
          <input
            v-model="lookupNum"
            class="input"
            placeholder="e.g. BB-123456"
            style="margin-bottom: 12px"
          />
          <label class="input-label">Email Address</label>
          <input
            v-model="lookupEmail"
            type="email"
            class="input"
            placeholder="your@email.com"
            style="margin-bottom: 14px"
          />
          <button
            class="btn btn-outline btn-full"
            @click="lookupOrder"
            :disabled="lookingUp"
          >
            LOOKUP ORDER
          </button>
        </div>

        <!-- Return Policy -->
        <div class="card" style="margin-bottom: 16px">
          <div class="policy-icon">↺</div>
          <h4 style="margin: 10px 0 8px; font-size: 13px">RETURN POLICY</h4>
          <p style="font-size: 12.5px; color: var(--text-2); line-height: 1.65">
            All Barista Bench tools are eligible for returns within 30 days of
            delivery. Items must be in their original packaging with no visible
            wear.
          </p>
          <a
            href="/fullReturnPolicy"
            style="
              display: inline-block;
              margin-top: 12px;
              font-size: 12.5px;
              font-weight: 600;
              color: var(--text);
              text-decoration: underline;
            "
            >READ FULL TERMS</a
          >
        </div>

        <!-- Support -->
        <div
          class="card-dark"
          style="padding: 20px; border-radius: var(--radius-lg)"
        >
          <div
            style="
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 10px;
            "
          >
            <span style="font-size: 20px">🛡</span>
            <span
              style="
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.1em;
                color: var(--accent);
              "
              >LIFETIME TECHNICAL SUPPORT</span
            >
          </div>
          <p
            style="
              font-size: 12.5px;
              color: #666;
              line-height: 1.65;
              margin-bottom: 14px;
            "
          >
            Having trouble dialing in your shots? It might not be the tool. Chat
            with our roast masters before returning.
          </p>
          <button
            class="btn btn-full"
            style="background: #2a2825; color: white; border: 1px solid #3a3835"
          >
            LIVE CHAT SUPPORT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase: any = useSupabaseClient();
const user = useSupabaseUser();
const { success, error } = useToast();

const activeOrder = ref<any>(null);
const lookupNum = ref("");
const lookupEmail = ref("");
const lookingUp = ref(false);
const lookupError = ref("");
const submitting = ref(false);

const returnStep = ref(0);
const selectedReturnItems = ref<string[]>([]);
const returnReason = ref("");
const returnNotes = ref("");
const returnResolution = ref("");

const returnSteps = ["ITEMS", "REASON", "RESOLUTION", "CONFIRM"];
const reasons = [
  "Changed my mind",
  "Not as described",
  "Compatibility issue",
  "Defective/Damaged",
  "Wrong item received",
  "Performance not as expected",
];
const resolutions = [
  {
    key: "refund",
    icon: "💳",
    title: "Full Refund",
    desc: "Refund to your original payment method within 5-7 days.",
  },
  {
    key: "exchange",
    icon: "🔄",
    title: "Exchange",
    desc: "Swap for a different size, variant, or item of equal value.",
  },
  {
    key: "store_credit",
    icon: "🎁",
    title: "Store Credit",
    desc: "Get 110% in store credit — a little extra for the inconvenience.",
  },
];

const canProceed = computed(() => {
  if (returnStep.value === 0) return selectedReturnItems.value.length > 0;
  if (returnStep.value === 1) return !!returnReason.value;
  if (returnStep.value === 2) return !!returnResolution.value;
  return true;
});

function toggleReturnItem(id: string) {
  const idx = selectedReturnItems.value.indexOf(id);
  if (idx === -1) selectedReturnItems.value.push(id);
  else selectedReturnItems.value.splice(idx, 1);
}

async function lookupOrder() {
  if (!lookupNum.value) return;
  lookingUp.value = true;
  lookupError.value = "";
  const { data, error: e } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("order_number", lookupNum.value.trim().toUpperCase())
    .single();
  if (e || !data) {
    lookupError.value =
      "Order not found. Please check the order number and email.";
  } else {
    activeOrder.value = data;
  }
  lookingUp.value = false;
}

async function nextReturnStep() {
  if (returnStep.value < 3) {
    returnStep.value++;
    return;
  }
  if (!user.value || !activeOrder.value) return;
  submitting.value = true;
  await supabase.from("returns").insert({
    order_id: activeOrder.value.id,
    user_id: user.value.id,
    status: "pending",
    items: selectedReturnItems.value,
    reason: returnReason.value,
    resolution: returnResolution.value,
    notes: returnNotes.value,
  });
  success("Return request submitted. Check your email for the prepaid label.");
  cancelReturn();
  submitting.value = false;
}

function cancelReturn() {
  activeOrder.value = null;
  returnStep.value = 0;
  selectedReturnItems.value = [];
  returnReason.value = "";
  returnNotes.value = "";
  returnResolution.value = "";
  lookupNum.value = "";
}
</script>

<style scoped>
.returns-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 40px;
}
.returns-sidebar {
  position: sticky;
  top: calc(var(--nav-h) + 24px);
}
.return-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.rc-header {
  background: var(--bg-dark);
  padding: 20px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rc-tag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 4px;
}
.rc-order-num {
  font-size: 18px;
  font-weight: 700;
  color: white;
  font-family: var(--font-mono);
}
.return-steps {
  display: flex;
  gap: 12px;
  align-items: center;
}
.rs-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  position: relative;
}
.rs-item:not(:last-child)::after {
  content: "—";
  color: #333;
  position: absolute;
  right: -14px;
  top: 6px;
  font-size: 12px;
}
.rs-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid #444;
}
.rs-item.active .rs-dot {
  background: var(--accent);
  border-color: var(--accent);
}
.rs-item.done .rs-dot {
  background: #555;
  border-color: #555;
}
.rs-item span {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #444;
  text-transform: uppercase;
}
.rs-item.active span {
  color: var(--accent);
}
.rc-body {
  padding: 28px;
}
.rc-body h3 {
  font-size: 18px;
  margin-bottom: 6px;
  font-family: var(--font-body);
  font-weight: 700;
}
.rc-body > p {
  font-size: 13px;
  color: var(--text-2);
  margin-bottom: 20px;
}
.return-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.return-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.15s;
}
.return-item:hover {
  border-color: var(--border-hover);
}
.return-item.selected {
  border-color: var(--accent);
  background: rgba(196, 130, 74, 0.04);
}
.ri-check {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1.5px solid var(--border-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.return-item.selected .ri-check {
  background: var(--accent);
  border-color: var(--accent);
}
.ri-check-inner {
  color: white;
  font-size: 11px;
  font-weight: 700;
}
.ri-img {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  background: var(--surface-2);
  flex-shrink: 0;
}
.ri-info {
  flex: 1;
}
.ri-name {
  font-size: 14px;
  font-weight: 600;
}
.ri-meta {
  font-size: 12px;
  color: var(--text-2);
  margin-top: 2px;
}
.ri-price {
  font-weight: 700;
}
.reason-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.reason-opt input {
  display: none;
}
.reason-card {
  padding: 12px 16px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s;
  text-align: center;
}
.reason-card.selected {
  border-color: var(--accent);
  background: rgba(196, 130, 74, 0.08);
  color: var(--accent);
}
.resolution-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.resolution-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.15s;
}
.resolution-card.selected {
  border-color: var(--accent);
  background: rgba(196, 130, 74, 0.06);
}
.res-icon {
  font-size: 22px;
}
.res-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 3px;
}
.res-desc {
  font-size: 12.5px;
  color: var(--text-2);
}
.confirm-summary {
  background: var(--surface-2);
  border-radius: var(--radius);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cs-row {
  display: flex;
  justify-content: space-between;
  font-size: 13.5px;
}
.cs-row span:first-child {
  color: var(--text-2);
}
.cs-row span:last-child {
  font-weight: 600;
  text-transform: capitalize;
}
.rc-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px;
  border-top: 1px solid var(--border);
  background: var(--surface-2);
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.policy-icon {
  font-size: 24px;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .returns-layout {
    grid-template-columns: 1fr;
  }
  .returns-sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .rc-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  .reason-options {
    grid-template-columns: 1fr;
  }
  .return-steps span {
    display: none;
  }
  .rs-item:not(:last-child)::after {
    right: -10px;
  }
}

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .return-item {
    flex-wrap: wrap;
  }
  .ri-price {
    width: 100%;
    margin-top: 8px;
    padding-left: 66px;
  }
}
</style>
