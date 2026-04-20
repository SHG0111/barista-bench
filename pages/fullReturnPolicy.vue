<template>
  <div class="returns-landing">
    <div class="container">
      <!-- 1. Hero Section -->
      <div class="hero-section">
        <div class="hero-left">
          <div class="hero-label">CARE &amp; COMMITMENT</div>
          <h1 class="hero-title">
            Returns &amp;<br />
            <span class="hero-italic">Refunds</span>
          </h1>
          <p class="hero-desc">
            Your mastery of the craft begins with peace of mind. Every precision
            tool and small-batch roast is backed by our sensory excellence
            guarantee.
          </p>
          <div class="hero-actions">
            <NuxtLink to="/returns" class="btn-primary-alt"
              >START A RETURN</NuxtLink
            >
            <NuxtLink to="/account" class="btn-secondary-alt"
              >TRACK ORDER</NuxtLink
            >
          </div>
        </div>
        <div class="hero-right">
          <NuxtImg
            src="/hero-2.jpg"
            alt="Premium Espresso Machine"
            class="hero-img"
          />
        </div>
      </div>

      <!-- 2. Grid Sections -->
      <div class="details-grid">
        <!-- Guarantee -->
        <div class="detail-card card-guarantee">
          <div class="guarantee-bg-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="bg-icon-svg"
              stroke="currentColor"
              stroke-width="0.5"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
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
                d="M12 2l3.09 3.26L19.4 5l-.6 4.34L22 12l-3.2 2.66.6 4.34-4.31-.26L12 22l-3.09-3.26L4.6 19l.6-4.34L2 12l3.2-2.66-.6-4.34 4.31.26L12 2z"
              />
              <polyline
                points="9 12 11 14 15 10"
                stroke="#1c1b1a"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h2>The Sensory Guarantee</h2>
          <p>
            We believe that every brew should be a revelation. If your equipment
            does not meet the technical specifications or your coffee profile is
            not as described, we offer a 30-day window for exchange or credit.
          </p>
          <div class="guarantee-meta">
            <div class="meta-box">
              <div class="meta-label">DURATION</div>
              <div class="meta-value">30 Days Post-Delivery</div>
            </div>
            <div class="meta-box">
              <div class="meta-label">RESTOCKING</div>
              <div class="meta-value">Zero Fees for Gear</div>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="detail-card card-timeline">
          <h2>Timeline</h2>
          <div class="timeline-list">
            <div class="tl-item">
              <div class="tl-num">1</div>
              <div>
                <div class="tl-title">Authorization</div>
                <div class="tl-desc">Approved within 24 business hours.</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-num">2</div>
              <div>
                <div class="tl-title">Inspection</div>
                <div class="tl-desc">3-5 days after receipt at our lab.</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-num">3</div>
              <div>
                <div class="tl-title">Reimbursement</div>
                <div class="tl-desc">
                  Processed instantly to original method.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Conditions -->
        <div class="detail-card card-conditions">
          <h2>Conditions of Craft</h2>
          <div class="conditions-list">
            <div class="cond-item">
              <div class="cond-icon">📦</div>
              <div class="cond-text">
                Original ritual packaging must be intact.
              </div>
            </div>
            <div class="cond-item">
              <div class="cond-icon">💧</div>
              <div class="cond-text">
                Gear must be free of mineral deposits.
              </div>
            </div>
            <div class="cond-item">
              <div class="cond-icon">🏷️</div>
              <div class="cond-text">All tags and certifications attached.</div>
            </div>
          </div>
        </div>

        <!-- Path -->
        <div class="detail-card card-path">
          <div class="path-info">
            <h2>The Return Path</h2>
            <p>
              A seamless journey from your counter back to our laboratory. We
              provide pre-paid insured shipping labels for all domestic returns.
            </p>
            <a href="#" class="view-labs"
              >VIEW LAB LOCATIONS <span class="arrow">→</span></a
            >
          </div>
          <div class="path-widget">
            <div class="pw-header">
              <span class="pw-status">STATUS: TRANSIT</span>
              <span class="pw-id">#BB-90210</span>
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
                  <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                  ></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <div>
                <div class="pw-title">Acaia Pearl S</div>
                <div class="pw-desc">Out for inspection</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Exceptions Note -->
      <div class="exceptions-note">
        <h3>Exceptions to the Rule</h3>
        <p>
          Customized portafilter handles, opened coffee bags (unless
          quality-deficient), and final sale archive items are non-returnable.
          Please contact our Sommelier Support for specialized cases.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });
</script>

<style scoped>
/* Page Level Overrides for True Dark Theme */
.returns-landing {
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
@media (min-width: 768px) {
  .card-guarantee {
    grid-column: 1 / 3;
  }
  .card-timeline {
    grid-column: 3 / 4;
  }
  .card-conditions {
    grid-column: 1 / -3;
  }
  .card-path {
    grid-column: 2/ 4;
  }
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
  align-items: center;
  gap: 40px;
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
  width: 260px;
  background-color: #1a1918;
  border-radius: 6px;
  padding: 20px;
  flex-shrink: 0;
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
  width: 65%;
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
  .btn-primary-alt,
  .btn-secondary-alt {
    width: 100%;
  }
  .card-guarantee {
    padding-bottom: 40px;
  }
  .guarantee-meta {
    position: static;
    flex-direction: column;
    gap: 24px;
    padding: 0;
    margin-top: 32px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 32px;
  }
  .hero-desc {
    font-size: 14px;
  }
  .detail-card {
    padding: 24px;
  }
  .timeline-list {
    gap: 16px;
  }
  .tl-item {
    flex-direction: column;
    align-items: flex-start;
  }
  .tl-num {
    width: 24px;
    height: 24px;
    font-size: 10px;
  }
  .tl-content {
    width: 100%;
  }
  .tl-badge {
    position: static;
    margin-top: 8px;
  }
  .conditions-list {
    gap: 16px;
  }
  .cond-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .cond-icon {
    font-size: 20px;
  }
  .path-widget {
    padding: 16px;
  }
  .pw-item {
    flex-direction: column;
    align-items: flex-start;
  }
  .pw-pkg-icon {
    width: 32px;
    height: 32px;
  }
  .pw-title {
    font-size: 11px;
  }
  .pw-desc {
    font-size: 10px;
  }
}
</style>
