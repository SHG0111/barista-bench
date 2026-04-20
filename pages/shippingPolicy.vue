<template>
  <div class="shipping-landing">
    <div class="container">
      <!-- 1. Hero Section -->
      <div class="hero-section">
        <div class="hero-left">
          <div class="hero-label">LOGISTICS &amp; DELIVERY</div>
          <h1 class="hero-title">
            Shipping &amp;<br />
            <span class="hero-italic">Handling</span>
          </h1>
          <p class="hero-desc">
            Precision tools delivered with care. We partner with the world's
            leading logistics providers to ensure your equipment arrives safely
            and efficiently.
          </p>
          <div class="hero-actions">
            <NuxtLink to="/account" class="btn-primary-alt"
              >TRACK ORDER</NuxtLink
            >
            <NuxtLink to="/shop" class="btn-secondary-alt"
              >CONTINUE SHOPPING</NuxtLink
            >
          </div>
        </div>
        <div class="hero-right">
          <NuxtImg
            src="/shipping_hero.png"
            alt="Premium Shipping Box"
            class="hero-img"
          />
        </div>
      </div>

      <!-- 2. Grid Sections -->
      <div class="details-grid">
        <!-- Methods -->
        <div class="detail-card card-guarantee">
          <div class="guarantee-bg-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="bg-icon-svg"
              stroke="currentColor"
              stroke-width="0.5"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path
                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
              ></path>
              <path d="M2 12h20"></path>
            </svg>
          </div>
          <div class="badge-wrap">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="var(--accent-gold)"
            >
              <path
                d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10zM12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm-2 11.5l-3.5-3.5 1.4-1.4 2.1 2.1 5.3-5.3 1.4 1.4z"
              />
            </svg>
          </div>
          <h2>Global Delivery Methods</h2>
          <p>
            We offer complimentary express shipping globally. Your tools are
            packed with the same meticulous precision you expect in your craft,
            ensuring they travel safely across borders. Tracking is provided to
            you for every single order.
          </p>
          <div class="guarantee-meta">
            <div class="meta-box">
              <div class="meta-label">DISPATCH</div>
              <div class="meta-value">1–2 Business Days</div>
            </div>
            <div class="meta-box">
              <div class="meta-label">EXPRESS DELIVERY</div>
              <div class="meta-value">3–7 Transit Days</div>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="detail-card card-timeline">
          <h2>The Journey</h2>
          <div class="timeline-list">
            <div class="tl-item">
              <div class="tl-num">1</div>
              <div>
                <div class="tl-title">Processing</div>
                <div class="tl-desc">Checked and packed within 1-2 days.</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-num">2</div>
              <div>
                <div class="tl-title">Dispatch</div>
                <div class="tl-desc">
                  Handed directly to our premier couriers.
                </div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-num">3</div>
              <div>
                <div class="tl-title">Transit</div>
                <div class="tl-desc">
                  Global shipping in just 3-7 business days.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Restrictions (Conditions Style) -->
        <div class="detail-card card-conditions">
          <h2>Shipping Restrictions</h2>
          <div class="conditions-list">
            <div class="cond-item">
              <div class="cond-icon">🚫</div>
              <div class="cond-text">
                We cannot deliver to P.O. Box addresses.
              </div>
            </div>
            <div class="cond-item">
              <div class="cond-icon">🗺️</div>
              <div class="cond-text">
                Restricted handling required for select regions.
              </div>
            </div>
            <div class="cond-item">
              <div class="cond-icon">🛂</div>
              <div class="cond-text">
                No delivery to: Russia, Belarus, North Korea, Syria, Cuba.
              </div>
            </div>
          </div>
        </div>

        <!-- Path -->
        <div class="detail-card card-path">
          <div class="path-info">
            <h2>Logistics Partners</h2>
            <p>
              We partner with leading global logistics providers to ensure your
              equipment arrives safely and efficiently. Our established networks
              offer unmatched reliability.
            </p>
            <div
              class="couriers"
              style="display: flex; gap: 16px; margin-top: 20px"
            >
              <span style="font-weight: 700; color: #fff; font-size: 18px"
                >DHL</span
              >
              <span style="font-weight: 700; color: #fff; font-size: 18px"
                >FEDEX</span
              >
              <span style="font-weight: 700; color: #fff; font-size: 18px"
                >UPS</span
              >
            </div>
          </div>
          <div class="path-widget">
            <div class="pw-header">
              <span class="pw-status">IN TRANSIT</span>
              <span class="pw-id">TRACKING PREVIEW</span>
            </div>
            <div class="pw-bar-track">
              <div class="pw-bar-fill"></div>
            </div>
            <div class="pw-item">
              <div class="pw-pkg-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <div>
                <div class="pw-title">Local Distribution Center</div>
                <div class="pw-desc">Departed Facility</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Exceptions Note -->
      <div class="exceptions-note">
        <h3>Customs and Duties</h3>
        <p>
          International orders may be subject to customs duties and taxes levied
          by the destination country upon arrival. <br />These mandatory charges
          are the sole responsibility of the customer.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });
</script>

<style scoped>
/* Copied exact aesthetics from the Returns & Refunds template */
.shipping-landing {
  background-color: #1a1918;
  color: #f7f5f2;
  min-height: 100vh;
  padding: 80px 0 100px;
  --accent-gold: #e2b382;
  --card-bg: #272524;
  --text-muted: #aca9a4;
  font-family: var(--font-body);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 1. Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  gap: 80px;
  margin-bottom: 80px;
}

.hero-left {
  flex: 1;
}

.hero-label {
  color: var(--accent-gold);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.hero-title {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 82px;
  line-height: 1.05;
  margin-bottom: 24px;
  color: #fff;
  font-weight: 600;
}

.hero-italic {
  font-style: italic;
  color: var(--accent-gold);
  font-weight: 500;
}

.hero-desc {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-muted);
  max-width: 440px;
  margin-bottom: 40px;
}

.hero-actions {
  display: flex;
  gap: 16px;
}

.btn-primary-alt,
.btn-secondary-alt {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 28px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary-alt {
  background-color: var(--accent-gold);
  color: #1a1918;
}

.btn-primary-alt:hover {
  background-color: #f1bf8b;
  transform: translateY(-2px);
}

.btn-secondary-alt {
  background-color: #383633;
  color: #fff;
}

.btn-secondary-alt:hover {
  background-color: #4a4845;
}

.hero-right {
  flex: 1;
}

.hero-img {
  width: 100%;
  max-height: 600px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

/* 2. Grid System */
.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  margin-bottom: 80px;
}

.detail-card {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.detail-card h2 {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #fff;
}

.detail-card p {
  font-size: 13.5px;
  color: var(--text-muted);
  line-height: 1.65;
}

/* Guarantee Card */
.card-guarantee {
  padding-bottom: 120px;
}
.card-guarantee,
.card-path {
  grid-column: span 2;
}

.badge-wrap {
  margin-bottom: 24px;
}

.guarantee-bg-icon {
  position: absolute;
  right: -40px;
  top: 40px;
  opacity: 0.05;
  color: #fff;
  width: 250px;
  height: 250px;
  pointer-events: none;
}

.guarantee-bg-icon svg {
  width: 100%;
  height: 100%;
}

.guarantee-meta {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 40px;
  gap: 64px;
}

.meta-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--accent-gold);
  margin-bottom: 8px;
  text-transform: uppercase;
}

.meta-value {
  font-size: 14px;
  color: #fff;
}

/* Timeline Card */
.timeline-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
}

.tl-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.tl-num {
  width: 28px;
  height: 28px;
  background-color: #3b3732;
  color: var(--accent-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.tl-title {
  font-size: 13.5px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.tl-desc {
  font-size: 12.5px;
  color: var(--text-muted);
}

/* Conditions Card */
.conditions-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 32px;
}

.cond-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cond-icon {
  background-color: #3b3732;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.cond-text {
  font-size: 13px;
  color: var(--text-muted);
  flex: 1;
}

/* Path Card */
.card-path {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 30px;
}

.path-info {
  flex: 1;
}

.view-labs {
  display: inline-block;
  margin-top: 24px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--accent-gold);
  text-decoration: none;
  text-transform: uppercase;
}

.view-labs .arrow {
  margin-left: 6px;
  font-size: 14px;
  vertical-align: middle;
}

.path-widget {
  width: 100%;
  background-color: #1a1918;
  border-radius: 6px;
  padding: 20px;
}

.pw-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.pw-status {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.pw-id {
  font-size: 10px;
  color: #666;
}

.pw-bar-track {
  width: 100%;
  height: 2px;
  background-color: #333;
  border-radius: 2px;
  margin-bottom: 20px;
  position: relative;
}

.pw-bar-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 25%;
  background-color: var(--accent-gold);
  border-radius: 2px;
}

.pw-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pw-pkg-icon {
  width: 36px;
  height: 36px;
  background-color: #272524;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.pw-title {
  font-size: 12.5px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2px;
}

.pw-desc {
  font-size: 11px;
  color: var(--text-muted);
}

/* 3. Exceptions */
.exceptions-note {
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
}

.exceptions-title {
  font-family: var(--font-display, "Playfair Display", serif);
  font-style: italic;
  font-weight: 500;
  font-size: 24px;
  color: #fff;
  margin-bottom: 16px;
}

.exceptions-note p {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Responsive Overrides */
@media (max-width: 900px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }
  .hero-title {
    font-size: 56px;
  }
  .hero-actions {
    justify-content: center;
  }
  .details-grid {
    grid-template-columns: 1fr;
  }
  .card-path {
    flex-direction: column;
    align-items: stretch;
  }
  .path-widget {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 40px;
  }
  .btn-primary-alt, .btn-secondary-alt {
    width: 100%;
  }
}
</style>
