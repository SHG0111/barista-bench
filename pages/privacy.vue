<template>
  <div class="legal-landing">
    <div class="container">
      <!-- 1. Hero Section -->
      <div class="hero-section">
        <div class="hero-left">
          <div class="hero-label">DISCRETION &amp; DATA</div>
          <h1 class="hero-title">
            Privacy<br />
            <span class="hero-italic">Policy</span>
          </h1>
          <p class="hero-desc">
            Your privacy is as vital as your morning ritual. We prioritize the security 
            and discretion of your personal data at every step.
          </p>
        </div>
      </div>

      <!-- 2. Grid Sections -->
      <div class="details-grid">
        <!-- Section 1: Collection -->
        <div class="detail-card card-guarantee">
          <div class="guarantee-bg-icon">
             <svg viewBox="0 0 24 24" fill="none" class="bg-icon-svg" stroke="currentColor" stroke-width="0.5">
               <circle cx="12" cy="12" r="3"></circle>
               <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
             </svg>
          </div>
          <div class="badge-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-gold)">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.75-7 9.89-3.87-1.14-7-5.22-7-9.89V6.3l7-3.12z" />
            </svg>
          </div>
          <h2>Data Collection</h2>
          <p>
            We collect essential information to facilitate your brewing experience. This includes identity details provided durante sign-up and shipping logistics. Our collection is limited to the bare minimum required to ensure your precision tools reach your bench safely and that your profile remains secure.
          </p>
          <div class="guarantee-meta">
            <div class="meta-box">
              <div class="meta-label">DATA STORAGE</div>
              <div class="meta-value">ENCRYPTED CLOUD</div>
            </div>
            <div class="meta-box">
              <div class="meta-label">RETENTION</div>
              <div class="meta-value">AS REQUIRED</div>
            </div>
          </div>
        </div>

        <!-- Section 2: Usage Journey -->
        <div class="detail-card card-timeline">
          <h2>The Journey of Data</h2>
          <div class="timeline-list">
            <div class="tl-item">
              <div class="tl-num">1</div>
              <div>
                <div class="tl-title">Capture</div>
                <div class="tl-desc">Securely received during account creation.</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-num">2</div>
              <div>
                <div class="tl-title">Processing</div>
                <div class="tl-desc">Anonymous telemetry to improve our tools.</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-num">3</div>
              <div>
                <div class="tl-title">Optimization</div>
                <div class="tl-desc">Used solely to enhance the artisan experience.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Third Party Safety -->
        <div class="detail-card card-conditions">
          <h2>Logistical Partnerships</h2>
          <div class="conditions-list">
            <div class="cond-item">
              <div class="cond-icon">💳</div>
              <div class="cond-text">Stripe: End-to-end encrypted payments.</div>
            </div>
            <div class="cond-item">
              <div class="cond-icon">🌩️</div>
              <div class="cond-text">Supabase: Secure database architecture.</div>
            </div>
            <div class="cond-item">
              <div class="cond-icon">🚚</div>
              <div class="cond-text">DHL/FedEx: Verified shipping logistics.</div>
            </div>
          </div>
        </div>

        <!-- Section 4: Security Protocols -->
        <div class="detail-card card-path">
          <div class="path-info">
            <h2>Artisan Privacy Rights</h2>
            <p>
              Under global data privacy standards, you hold full authority over your data. You may request deletion or extraction of your ritual history at any time. We utilize advanced encryption to ensure your bench remains your own.
            </p>
            <NuxtLink to="/terms" class="view-labs">VIEW TERMS OF SERVICE <span class="arrow">→</span></NuxtLink>
          </div>
          <div class="path-widget">
            <div class="pw-header">
              <span class="pw-status">PRIVACY RATING</span>
              <span class="pw-id">GRADE A++</span>
            </div>
            <div class="pw-bar-track">
              <div class="pw-bar-fill"></div>
            </div>
            <div class="pw-item">
              <div class="pw-pkg-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <div class="pw-title">Privacy Shield</div>
                <div class="pw-desc">Global Compliance Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Final Note -->
      <div class="exceptions-note">
        <h3>Transparency Commitment</h3>
        <p>
          We will notify you immediately if our craftsmanship in data handling 
          undergoes any significant evolution. Contact <strong>privacy@baristabench.com</strong>.
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
