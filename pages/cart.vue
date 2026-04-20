<template>
  <div class="cart-landing">
    <div class="container">
      
      <div class="cart-header">
        <h1>Your Cart</h1>
        <NuxtLink to="/shop" class="btn-continue">CONTINUE SHOPPING</NuxtLink>
      </div>

      <div v-if="items.length === 0 && !loading" class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h2>Your cart is empty.</h2>
        <p>Looks like you haven't added any precision tools yet.</p>
        <NuxtLink to="/shop" class="btn-primary-alt">SHOP ALL HARDWARE</NuxtLink>
      </div>

      <div v-else-if="loading" class="cart-grid skeleton-cart">
        <!-- Left: Skeleton Items -->
        <div class="cart-items">
          <div v-for="i in 3" :key="i" class="card-item skeleton-item">
            <div class="item-img skeleton-box" style="border-radius: 8px;"></div>
            <div class="item-details">
              <div class="skeleton-box" style="width: 60%; height: 20px; margin-bottom: 12px; border-radius: 4px;"></div>
              <div class="skeleton-box" style="width: 30%; height: 14px; margin-bottom: 24px; border-radius: 4px;"></div>
              <div class="item-actions">
                 <div class="skeleton-box" style="width: 100px; height: 36px; border-radius: 4px;"></div>
              </div>
            </div>
            <div class="item-price">
              <div class="skeleton-box" style="width: 80px; height: 24px; border-radius: 4px;"></div>
            </div>
          </div>
        </div>
        <!-- Right: Skeleton Summary -->
        <div class="cart-summary-wrapper">
          <div class="cart-summary">
            <div class="skeleton-box" style="width: 150px; height: 24px; margin-bottom: 32px; border-radius: 4px;"></div>
            <div v-for="i in 3" :key="i" class="summary-line">
              <div class="skeleton-box" style="width: 100px; height: 16px; border-radius: 4px;"></div>
              <div class="skeleton-box" style="width: 60px; height: 16px; border-radius: 4px;"></div>
            </div>
            <div class="skeleton-box" style="width: 100%; height: 56px; margin-top: 32px; border-radius: 4px;"></div>
          </div>
        </div>
      </div>

      <div v-else class="cart-grid">
        
        <!-- Cart Items List -->
        <div class="cart-items">
          <div class="card-item" v-for="item in items" :key="item.id">
            <div class="item-img">
              <div class="img-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              </div>
            </div>
            
            <div class="item-details">
              <NuxtLink :to="`/product/${item.products.slug}`" class="item-name">{{ item.products.name }}</NuxtLink>
              <div class="item-meta">
                <span class="meta-tag" v-if="item.products.series">{{ item.products.series }}</span>
              </div>
              <div class="item-actions">
                <div class="qty-control">
                  <button @click="updateQuantity(item.product_id, item.quantity - 1)">−</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.product_id, item.quantity + 1)">+</button>
                </div>
                <button class="btn-remove" @click="removeFromCart(item.product_id)">Remove</button>
              </div>
            </div>

            <div class="item-price">
              ${{ (item.products.price * item.quantity).toFixed(2) }}
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="cart-summary-wrapper">
          <div class="cart-summary">
            <h2>Order Summary</h2>
            
            <div class="summary-line">
              <span>Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            
            <div class="summary-line accent-row" v-if="isBundle">
              <span>Bundle Discount (15%)</span>
              <span>−${{ discount.toFixed(2) }}</span>
            </div>
            
            <div class="summary-line">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            
            <div class="summary-line">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>

            <div class="summary-total">
              <span>Estimated Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>

            <NuxtLink to="/checkout" class="btn-checkout">PROCEED TO CHECKOUT</NuxtLink>

            <div class="payment-icons">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Amex</span>
              <span>Apple Pay</span>
            </div>

            <p class="secure-note">🔒 Secure checkout powered by Stripe</p>
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
.cart-landing {
  background-color: #f5f4f1; /* Light background */
  color: #1a1918;           /* Dark text */
  min-height: 100vh;
  padding: 80px 0 120px;
  --accent-gold: #c38a53;   /* Slightly darker gold for contrast */
  --card-bg: #ffffff;       /* White cards */
  --border: #e0ddd5;        /* Light grey border */
  --text-muted: #73706c;    /* Darker muted text */
  font-family: var(--font-body);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}

.cart-header h1 {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 48px;
  font-weight: 500;
  color: #1a1918;
}

.btn-continue {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--accent-gold);
  text-transform: uppercase;
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: all 0.2s;
}

.btn-continue:hover {
  border-color: var(--accent-gold);
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  padding: 80px 0;
  background-color: var(--card-bg);
  border-radius: 8px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 24px;
  opacity: 0.3;
}

.empty-cart h2 {
  font-size: 24px;
  margin-bottom: 12px;
}

.empty-cart p {
  color: var(--text-muted);
  margin-bottom: 32px;
}

.btn-primary-alt {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 4px;
  background-color: var(--accent-gold);
  color: #fff;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary-alt:hover {
  background-color: #a67243;
  transform: translateY(-2px);
}

/* Cart Grid */
.cart-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  align-items: flex-start;
}

/* Items List */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-item {
  display: flex;
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 24px;
  gap: 24px;
}

.item-img {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.img-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f5f4f1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.img-placeholder svg {
  width: 40px;
  height: 40px;
  opacity: 0.3;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1918;
  text-decoration: none;
  margin-bottom: 8px;
}

.item-name:hover {
  text-decoration: underline;
}

.item-meta {
  margin-bottom: auto;
}

.meta-tag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background-color: rgba(195, 138, 83, 0.1);
  color: var(--accent-gold);
  padding: 4px 8px;
  border-radius: 4px;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 16px;
}

.qty-control {
  display: flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  height: 36px;
}

.qty-control button {
  background: transparent;
  border: none;
  color: #1a1918;
  width: 32px;
  height: 100%;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
}

.qty-control button:hover {
  background: #ebe7e0;
}

.qty-control span {
  width: 32px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
}

.btn-remove {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
}

.btn-remove:hover {
  color: #d1cfcc;
}

.item-price {
  font-size: 18px;
  font-weight: 700;
  color: #1a1918;
}

/* Summary Box */
.cart-summary-wrapper {
  position: sticky;
  top: calc(var(--nav-h) + 24px);
}

.cart-summary {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 32px;
}

.cart-summary h2 {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 24px;
  margin-bottom: 24px;
  color: #1a1918;
  border-bottom: 1px solid var(--border);
  padding-bottom: 16px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 14px;
  color: var(--text-muted);
}

.summary-line span:last-child {
  color: #1a1918;
}

.accent-row {
  color: var(--accent-gold) !important;
  font-weight: 600;
}

.accent-row span:last-child {
  color: var(--accent-gold) !important;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  font-size: 18px;
  font-weight: 700;
  color: #1a1918;
}

.summary-total span:first-child {
  font-size: 15px;
}

.btn-checkout {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 18px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background-color: var(--accent-gold);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  margin-top: 32px;
}

.btn-checkout:hover {
  background-color: #a67243;
  transform: translateY(-2px);
}

.payment-icons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  opacity: 0.5;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #1a1918;
}

.secure-note {
  text-align: center;
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 16px;
}

/* Responsive */
@media (max-width: 900px) {
  .cart-grid {
    grid-template-columns: 1fr;
  }
}

/* Skeleton Loading CSS */
.skeleton-box {
  background: linear-gradient(90deg, #f0ede8 25%, #e8e4de 50%, #f0ede8 75%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.skeleton-item {
  border-color: #e8e4de;
  background-color: #fff;
}

@media (prefers-color-scheme: dark) {
  .skeleton-box {
    background: linear-gradient(90deg, #272524 25%, #3b3732 50%, #272524 75%);
    background-size: 400% 100%;
  }
  .skeleton-item {
    background-color: #272524;
    border-color: #3b3732;
  }
}
</style>
