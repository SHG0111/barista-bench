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
            <span class="current">Information</span>
            <span class="sep">›</span>
            <span class="inactive">Shipping</span>
            <span class="sep">›</span>
            <span class="inactive">Payment</span>
          </nav>

          <!-- Contact Info -->
          <section class="form-section">
            <div class="section-header">
              <h2>Account</h2>
              <div class="login-prompt" v-if="!user">
                Already have an account? <NuxtLink to="/auth/login">Log in</NuxtLink>
              </div>
            </div>

            <div v-if="user" class="logged-in-box">
              <div class="user-info">
                <span class="user-email">{{ user.email }}</span>
                <button class="logout-link" @click="supabase.auth.signOut()">Log out</button>
              </div>
            </div>

            <div v-else>
              <div class="input-group">
                <input type="email" placeholder="Email Address" required />
              </div>
              <div class="checkbox-group">
                <input type="checkbox" id="news" checked />
                <label for="news">Email me with news and offers regarding gear drops</label>
              </div>
            </div>
          </section>

          <!-- Shipping Address -->
          <section class="form-section">
            <div class="section-header">
              <h2>Shipping Address</h2>
            </div>
            
            <div class="input-group">
              <select required>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="EU">European Union</option>
              </select>
            </div>

            <div class="form-row">
              <div class="input-group">
                <input type="text" placeholder="First name" required />
              </div>
              <div class="input-group">
                <input type="text" placeholder="Last name" required />
              </div>
            </div>

            <div class="input-group">
              <input type="text" placeholder="Address (P.O. Boxes not permitted)" required />
            </div>

            <div class="input-group">
              <input type="text" placeholder="Apartment, suite, etc. (optional)" />
            </div>

            <div class="form-row three-col">
              <div class="input-group">
                <input type="text" placeholder="City" required />
              </div>
              <div class="input-group">
                <select required>
                  <option value="" disabled selected>State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                </select>
              </div>
              <div class="input-group">
                <input type="text" placeholder="ZIP Code" required />
              </div>
            </div>
            
            <div class="input-group">
              <input type="tel" placeholder="Phone" required />
            </div>
          </section>

          <!-- Continue Button -->
          <div class="checkout-actions">
            <NuxtLink to="/cart" class="return-link">‹ Return to cart</NuxtLink>
            <button class="btn-primary-alt" @click="proceed">CONTINUE TO SHIPPING</button>
          </div>
          
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                  </div>
                </div>
                <div class="si-details">
                  <div class="si-name">{{ item.products.name }}</div>
                  <div class="si-meta" v-if="item.products.series">{{ item.products.series }}</div>
                </div>
                <div class="si-price">
                  ${{ (item.products.price * item.quantity).toFixed(2) }}
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
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="tl-line" v-if="isBundle">
                <span>Bundle Discount (15%)</span>
                <span>−${{ discount.toFixed(2) }}</span>
              </div>
              <div class="tl-line">
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div class="tl-line">
                <span>Taxes</span>
                <span>Calculated at next step</span>
              </div>
            </div>

            <!-- Final -->
            <div class="summary-total">
              <div class="st-main">
                <span>Total</span>
                <span class="st-cur">USD</span>
                <span class="st-val">${{ total.toFixed(2) }}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

definePageMeta({ layout: 'default' });

const { items, subtotal, discount, total, isBundle, fetchCart } = useCart();
const user = useSupabaseUser();
const supabase = useSupabaseClient();

onMounted(() => {
  if (user.value) {
    fetchCart();
  }
});

const proceed = () => {
  alert("Validation successful. Moving to shipping rates!");
};
</script>

<style scoped>
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
  width: 20px; height: 20px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700;
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

  .form-row, .form-row.three-col {
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
