<template>
  <div class="legal-landing">
    <div class="container">
      <!-- 1. Hero Section -->
      <div class="hero-section">
        <div class="hero-left">
          <div class="hero-label">LEGAL FRAMEWORK</div>
          <h1 class="hero-title">
            Terms of<br />
            <span class="hero-italic">Service</span>
          </h1>
          <p class="hero-desc">
            The formal agreement governing your ritual. Our terms ensure a 
            transparent partnership between the artisan and the bench.
          </p>
        </div>
      </div>

      <!-- 2. Grid Sections -->
      <div class="details-grid">
        <!-- Section 1: Agreement -->
        <div class="detail-card card-guarantee">
          <div class="guarantee-bg-icon">
            <Icon name="solar:shield-broken" class="bg-icon-svg" />
          </div>
          <div class="badge-wrap">
            <Icon name="solar:check-circle-broken" width="24" height="24" />
          </div>
          <h2>Acceptance of Terms</h2>
          <p>
            By entering the Bench, you acknowledge that you have read and agreed to these protocols. We provide precision tools designed for the meticulous preparation of coffee. Your use of these services constitutes a formal acceptance of our standards and liabilities.
          </p>
          <div class="guarantee-meta">
            <div class="meta-box">
              <div class="meta-label">LAST REVISED</div>
              <div class="meta-value">APRIL 2026</div>
            </div>
            <div class="meta-box">
              <div class="meta-label">JURISDICTION</div>
              <div class="meta-value">GLOBAL STANDARDS</div>
            </div>
          </div>
        </div>

        <!-- Section 2: Order Lifecycle -->
        <div class="detail-card card-timeline">
          <h2>Order Protocol</h2>
          <div class="timeline-list">
            <div class="tl-item">
              <div class="tl-num">1</div>
              <div>
                <div class="tl-title">Verification</div>
                <div class="tl-desc">Payments are checked for precision via Stripe.</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-num">2</div>
              <div>
                <div class="tl-title">Commitment</div>
                <div class="tl-desc">Orders are final once the ritual begins at dispatch.</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-num">3</div>
              <div>
                <div class="tl-title">Resolution</div>
                <div class="tl-desc">Disputes are handled with artisan attention.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Restrictions -->
        <div class="detail-card card-conditions">
          <h2>Prohibited Rituals</h2>
          <div class="conditions-list">
            <div class="cond-item">
              <div class="cond-icon">🚫</div>
              <div class="cond-text">Reverse engineering tool components.</div>
            </div>
            <div class="cond-item">
              <div class="cond-icon">⚖️</div>
              <div class="cond-text">Unauthorized resale of Bench-exclusive items.</div>
            </div>
            <div class="cond-item">
              <div class="cond-icon">🔒</div>
              <div class="cond-text">Compromising the security of artisan accounts.</div>
            </div>
          </div>
        </div>

        <!-- Section 4: Use & Liability -->
        <div class="detail-card card-path">
          <div class="path-info">
            <h2>Artisan Liability</h2>
            <p>
              Barista Bench provides tools that require professional handling. We are not responsible for injuries resulting from the misuse of precision grinders or high-temp brewing equipment. Responsibility lies with the practitioner.
            </p>
            <NuxtLink to="/shippingPolicy" class="view-labs">VIEW SHIPPING TERMS <span class="arrow">→</span></NuxtLink>
          </div>
          <div class="path-widget">
            <div class="pw-header">
              <span class="pw-status">PROTECTION SCALE</span>
              <span class="pw-id">ENCRYPTED</span>
            </div>
            <div class="pw-bar-track">
              <div class="pw-bar-fill"></div>
            </div>
            <div class="pw-item">
              <div class="pw-pkg-icon">
                <Icon name="solar:lock-broken" width="18" height="18" />
              </div>
              <div>
                <div class="pw-title">Secure Commerce</div>
                <div class="pw-desc">SSL 256-bit Protection</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Final Note -->
      <div class="exceptions-note">
        <h3>Contact Legal</h3>
        <p>
          Questions concerning the bench protocol should be directed to our 
          central dispatch at <strong>legal@baristabench.com</strong>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });
</script>

<style scoped>
.legal-landing {
  background-color: #f7f5f2;
  color: #1a1918;
  min-height: 100vh;
  padding: 80px 0 100px;
  --accent-gold: #b38a5d;
  --card-bg: #ffffff;
  --text-muted: #666461;
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
  color: #1a1918;
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
  background-color: #1a1918;
  color: #fff;
}

.btn-primary-alt:hover {
  background-color: #333;
  transform: translateY(-2px);
}

.btn-secondary-alt {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #1a1918;
}

.btn-secondary-alt:hover {
  background-color: #faf9f8;
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
  border: 1px solid #eee;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}

.detail-card h2 {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #1a1918;
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
  color: #1a1918;
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
  border-top: 1px solid #f9f9f9;
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
  color: #1a1918;
  font-weight: 600;
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
  background-color: #f9f8f6;
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
  color: #1a1918;
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
  background-color: #f9f8f6;
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
  color: #888;
}

.pw-id {
  font-size: 10px;
  color: #555;
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
  width: 100%;
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
  color: #888;
}

/* 3. Exceptions */
.exceptions-note {
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
}

.exceptions-note h3 {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 24px;
  color: #1a1918;
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
