<template>
  <div class="page-top">
    <div class="container-sm" style="padding-top:48px;padding-bottom:80px">
      <h1 style="font-size:36px;margin-bottom:6px">Track Your Order</h1>
      <p style="color:var(--text-2);margin-bottom:40px">Real-time updates for your precision tools.</p>

      <!-- Lookup Card -->
      <div class="card" style="margin-bottom:28px" v-if="!order">
        <label class="input-label">Order Number</label>
        <div style="display:flex;gap:12px;margin-top:8px">
          <input v-model="lookupNum" class="input" placeholder="e.g. BB-94285710" @keyup.enter="lookupOrder" />
          <button class="btn btn-primary" @click="lookupOrder" :disabled="loading">
            {{ loading ? 'Looking up...' : 'Track' }}
          </button>
        </div>
        <p v-if="lookupError" style="color:var(--red);font-size:13px;margin-top:10px">{{ lookupError }}</p>
      </div>

      <div v-if="order">
        <!-- Status banner -->
        <div class="card tracking-card">
          <div class="tracking-top">
            <div>
              <label class="input-label">Order Number</label>
              <div style="display:flex;align-items:center;gap:10px;margin-top:6px">
                <span class="order-num-display">{{ order.order_number }}</span>
                <button class="copy-btn" @click="copyOrder">COPY</button>
              </div>
            </div>
            <div class="status-badge-lg" :class="statusClass">
              <span class="status-icon">{{ statusIcon }}</span>
              <div>
                <div class="status-main">{{ statusLabel }}</div>
                <div class="status-eta" v-if="order.status === 'in_transit'">Expected Delivery: Oct 24, 2024</div>
              </div>
            </div>
          </div>

          <!-- Progress track -->
          <div class="track-progress">
            <div
              v-for="(step, i) in trackSteps"
              :key="step.key"
              class="track-step"
              :class="{ done: stepIndex >= i, active: stepIndex === i }"
            >
              <div class="track-dot">
                <div class="track-dot-inner"></div>
              </div>
              <div class="track-line" v-if="i < trackSteps.length - 1" :class="{ filled: stepIndex > i }"></div>
              <div class="track-label">{{ step.label }}</div>
            </div>
          </div>
        </div>

        <!-- Order items + shipping info -->
        <div class="order-details-grid">
          <div class="card order-summary-block">
            <div class="os-header">
              <h3>ORDER SUMMARY</h3>
              <span>{{ order.order_items?.length || 0 }} Items</span>
            </div>
            <div class="order-items-list">
              <div v-for="item in order.order_items" :key="item.id" class="oi-row">
                <div class="oi-img">
                  <NuxtImg
                    v-if="item.product_image"
                    :src="item.product_image"
                    :alt="item.product_name"
                    class="w-full h-full object-cover rounded"
                    format="webp"
                    loading="lazy"
                  />
                </div>
                <div class="oi-info">
                  <div class="oi-name">{{ item.product_name }}</div>
                  <div class="oi-variant" v-if="item.variant_info?.color">{{ item.variant_info.color }}</div>
                  <div class="badge badge-gray" style="margin-top:6px;font-size:10px">QTY: {{ item.quantity }}</div>
                </div>
                <div class="oi-price">{{ formatPrice(item.total_price) }}</div>
              </div>
            </div>
            <hr class="divider" />
            <div class="address-billing-row">
              <div>
                <div class="ab-label">SHIPPING ADDRESS</div>
                <div class="ab-name">{{ order.shipping_info?.name }}</div>
                <div class="ab-addr">{{ order.shipping_info?.address }}</div>
                <div class="ab-addr">{{ order.shipping_info?.city }}, {{ order.shipping_info?.postal }}</div>
              </div>
              <div>
                <div class="ab-label">BILLING SUMMARY</div>
                <div class="billing-row"><span>Subtotal</span><span>{{ formatPrice(order.subtotal) }}</span></div>
                <div class="billing-row total-row"><span>Total</span><span>{{ formatPrice(order.total) }}</span></div>
              </div>
            </div>
          </div>

          <div class="tracking-sidebar">
            <!-- Shipment info -->
            <div class="card-dark shipment-card">
              <div class="shipment-header">
                <span>📦</span>
                <h4>SHIPMENT INFO</h4>
              </div>
              <div class="ship-info-row"><span class="sil">CARRIER</span><span>FedEx Priority Espresso</span></div>
              <div class="ship-info-row"><span class="sil">STATUS</span><span>Arrived at Regional Sorting Hub, NY</span></div>
              <div class="ship-date">Oct 22, 2024 • 08:45 AM</div>
              <a href="#" class="track-link">VIEW DETAILED HISTORY ↗</a>
            </div>

            <!-- Support -->
            <div class="card support-card">
              <div class="support-icon">💬</div>
              <h4>NEED ASSISTANCE?</h4>
              <p>Our expert baristas are here to help with your shipment or technical setup.</p>
              <button class="btn btn-outline btn-full" style="margin-top:14px">CONTACT SUPPORT</button>
            </div>

            <!-- Pro tip -->
            <div class="pro-tip-card">
              <div class="pt-header">
                <span class="pt-badge">PRO TIP</span>
              </div>
              <p>While you wait, check out our <strong>Dial-in Guide</strong> to get your Apex Grinder calibrated perfectly on day one.</p>
              <a href="#" class="read-guide">Read the Guide</a>
            </div>
          </div>
        </div>

        <button class="btn btn-ghost" @click="order = null; lookupNum = ''" style="margin-top:24px">
          ← Track a different order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const { success } = useToast()
const { formatPrice } = useCurrency()

const order = ref<any>(null)
const lookupNum = ref((route.params.id as string) || '')
const loading = ref(false)
const lookupError = ref('')

const trackSteps = [
  { key: 'placed', label: 'Placed' },
  { key: 'processed', label: 'Processed' },
  { key: 'in_transit', label: 'In Transit' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' },
]

const stepIndex = computed(() => {
  if (!order.value) return 0
  return trackSteps.findIndex(s => s.key === order.value.status)
})

const statusLabel = computed(() => {
  const map: Record<string, string> = {
    placed: 'Order Placed', processed: 'Processed',
    in_transit: 'IN TRANSIT', out_for_delivery: 'Out for Delivery', delivered: 'Delivered',
  }
  return map[order.value?.status] || order.value?.status
})
const statusIcon = computed(() => {
  const map: Record<string, string> = { in_transit: '🚚', delivered: '✅', placed: '📋', processed: '⚙️', out_for_delivery: '📬' }
  return map[order.value?.status] || '📦'
})
const statusClass = computed(() => {
  const map: Record<string, string> = { in_transit: 'status-transit', delivered: 'status-delivered' }
  return map[order.value?.status] || 'status-default'
})

async function lookupOrder() {
  if (!lookupNum.value.trim()) return
  loading.value = true
  lookupError.value = ''

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items(
        *,
        products(image)
      )
    `)
    .eq('order_number', lookupNum.value.trim().toUpperCase())
    .single()

  if (error || !data) {
    lookupError.value = 'Order not found. Please check the order number.'
  } else {
    const rawData = data as any
    order.value = {
      ...rawData,
      order_items: (rawData.order_items || []).map((item: any) => ({
        ...item,
        product_image: item.products?.image || null
      }))
    }
  }
  loading.value = false
}

function copyOrder() {
  navigator.clipboard.writeText(order.value.order_number)
  success('Order number copied')
}

onMounted(() => {
  if (lookupNum.value) lookupOrder()
})
</script>

<style scoped>
.tracking-card { padding: 28px; margin-bottom: 24px; }
.tracking-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 36px; }
.order-num-display { font-size: 18px; font-weight: 700; font-family: var(--font-mono); }
.copy-btn { border: 1.5px solid var(--border); background: var(--text); color: white; border-radius: 5px; padding: 5px 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; cursor: pointer; font-family: var(--font-body); }
.status-badge-lg { display: flex; align-items: center; gap: 12px; padding: 12px 18px; border-radius: 10px; }
.status-transit { background: var(--green-bg); color: var(--green); }
.status-delivered { background: var(--green-bg); color: var(--green); }
.status-default { background: var(--surface-2); color: var(--text-2); }
.status-icon { font-size: 22px; }
.status-main { font-size: 13px; font-weight: 700; letter-spacing: 0.06em; }
.status-eta { font-size: 11.5px; opacity: 0.75; margin-top: 2px; }

.track-progress { display: flex; align-items: center; position: relative; }
.track-step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; }
.track-dot { width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--border); background: var(--surface); display: flex; align-items: center; justify-content: center; z-index: 1; transition: all 0.3s; }
.track-step.done .track-dot { background: var(--accent); border-color: var(--accent); }
.track-step.active .track-dot { background: var(--accent); border-color: var(--accent); }
.track-dot-inner { width: 10px; height: 10px; border-radius: 50%; background: white; }
.track-step:not(.done):not(.active) .track-dot-inner { background: var(--border); }
.track-line { position: absolute; top: 13px; left: calc(50% + 14px); width: calc(100% - 28px); height: 2px; background: var(--border); z-index: 0; }
.track-line.filled { background: var(--accent); }
.track-label { font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3); margin-top: 8px; text-align: center; }
.track-step.done .track-label, .track-step.active .track-label { color: var(--accent); }

.order-details-grid { display: grid; grid-template-columns: 1fr 300px; gap: 24px; }
.os-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.os-header h3 { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: var(--text-2); font-family: var(--font-body); }
.os-header span { font-size: 12px; color: var(--text-3); }
.order-items-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
.oi-row { display: flex; align-items: center; gap: 14px; }
.oi-img { width: 64px; height: 64px; border-radius: 10px; background: var(--surface-2); flex-shrink: 0; }
.oi-info { flex: 1; }
.oi-name { font-weight: 600; font-size: 14px; }
.oi-variant { font-size: 12px; color: var(--text-2); margin-top: 2px; }
.oi-price { font-weight: 700; font-size: 15px; }
.address-billing-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.ab-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 8px; }
.ab-name { font-size: 13.5px; font-weight: 600; margin-bottom: 4px; }
.ab-addr { font-size: 13px; color: var(--text-2); }
.billing-row { display: flex; justify-content: space-between; font-size: 12.5px; color: var(--text-2); margin-bottom: 6px; }
.billing-row.green span:last-child { color: var(--green); font-weight: 600; }
.billing-row.total-row { font-weight: 700; font-size: 15px; color: var(--text); margin-top: 6px; border-top: 1px solid var(--border); padding-top: 8px; }
.tracking-sidebar { display: flex; flex-direction: column; gap: 16px; }
.shipment-card { padding: 20px; }
.shipment-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.shipment-header h4 { font-size: 12px; letter-spacing: 0.1em; color: white; font-family: var(--font-body); }
.ship-info-row { margin-bottom: 8px; }
.sil { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #555; display: block; margin-bottom: 3px; }
.ship-info-row span:last-child { font-size: 13px; color: rgba(255,255,255,0.8); font-weight: 500; }
.ship-date { font-size: 11px; color: #444; margin-top: 8px; }
.track-link { display: inline-block; margin-top: 14px; font-size: 11.5px; font-weight: 700; letter-spacing: 0.06em; color: var(--accent); text-decoration: none; }
.support-card { padding: 20px; text-align: center; }
.support-icon { font-size: 24px; margin-bottom: 10px; }
.support-card h4 { font-size: 13px; font-weight: 700; margin-bottom: 8px; }
.support-card p { font-size: 12.5px; color: var(--text-2); line-height: 1.6; }
.pro-tip-card { background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px; }
.pt-header { margin-bottom: 10px; }
.pt-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: var(--accent); text-transform: uppercase; }
.pro-tip-card p { font-size: 12.5px; color: var(--text-2); line-height: 1.6; }
.read-guide { display: inline-block; margin-top: 10px; font-size: 12.5px; font-weight: 600; color: var(--text); text-decoration: underline; }
</style>
