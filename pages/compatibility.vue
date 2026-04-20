<template>
  <div class="compatibility-landing">
    <div class="container">
      
      <!-- 1. Hero Section -->
      <div class="hero-section">
        <div class="hero-left">
          <div class="hero-label">TECHNICAL DATA</div>
          <h1 class="hero-title">
            Compatibility<br />
            <span class="hero-italic">Guide</span>
          </h1>
          <p class="hero-desc">
            Precision demands the perfect fit. Ensure your Barista Bench tools are technically compatible with your specific espresso machine model before purchasing.
          </p>
          <div class="hero-actions">
            <NuxtLink to="/shop" class="btn-primary-alt">SHOP GEAR</NuxtLink>
            <NuxtLink to="/contact" class="btn-secondary-alt">ASK SUPPORT</NuxtLink>
          </div>
        </div>
        <div class="hero-right">
          <NuxtImg src="/compat_hero.png" alt="Precision Portafilter" class="hero-img" />
        </div>
      </div>

      <!-- 2. Grid Sections -->
      <div class="details-grid">
        
        <!-- Standard E61 58mm -->
        <div class="detail-card card-e61">
          <div class="card-icon">⚡</div>
          <h2>E61 Commercial (58mm)</h2>
          <p>The global standard for professional and prosumer equipment. Our 58mm tampers, levelers, and portafilters are fully compatible with this standard.</p>
          <div class="compat-list">
            <div class="compat-tag">Rocket Espresso</div>
            <div class="compat-tag">ECM</div>
            <div class="compat-tag">Profitec</div>
            <div class="compat-tag">Lelit (Mara/Bianca)</div>
            <div class="compat-tag">Decent Espresso</div>
            <div class="compat-tag">Rancilio Silvia</div>
          </div>
          <div class="specs-box">
             <span>TAMPER SIZE</span>
             <strong>58.5mm (Precision Fit)</strong>
          </div>
        </div>

        <!-- Breville 54mm -->
        <div class="detail-card card-breville">
          <div class="card-icon">🔵</div>
          <h2>Breville / Sage (54mm)</h2>
          <p>Extremely popular for home enthusiasts. Make sure to select the "54mm Breville" variant when purchasing our tampers or dosing funnels.</p>
          <div class="compat-list">
            <div class="compat-tag">Barista Express</div>
            <div class="compat-tag">Barista Pro</div>
            <div class="compat-tag">Barista Touch</div>
            <div class="compat-tag">Bambino Plus</div>
            <div class="compat-tag">Infuser</div>
          </div>
          <div class="specs-box">
             <span>TAMPER SIZE</span>
             <strong>53.3mm (Precision Fit)</strong>
          </div>
        </div>

        <!-- La Marzocco -->
        <div class="detail-card card-lm">
          <div class="card-icon">🦁</div>
          <h2>La Marzocco (58mm)</h2>
          <p>While LM uses a 58mm standard, their distinct portafilter lugs require specific portafilter bodies. Our tampers and baskets fit flawlessly.</p>
          <div class="compat-list">
            <div class="compat-tag">Linea Mini</div>
            <div class="compat-tag">Linea Micra</div>
            <div class="compat-tag">GS3</div>
            <div class="compat-tag">All Commercial models</div>
          </div>
          <div class="specs-box">
             <span>TAMPER SIZE</span>
             <strong>58.5mm (Precision Fit)</strong>
          </div>
        </div>

        <!-- Breville 58mm -->
        <div class="detail-card card-other">
          <div class="card-icon">🔘</div>
          <h2>Breville / Sage (58mm)</h2>
          <p>Note: Breville's 58mm dual boiler machines use a proprietary 58mm grouphead that differs slightly from E61.</p>
          <div class="compat-list">
            <div class="compat-tag">Dual Boiler (BDB)</div>
            <div class="compat-tag">Oracle</div>
            <div class="compat-tag">Oracle Touch</div>
          </div>
          <div class="specs-box">
             <span>TAMPER SIZE</span>
             <strong>58.5mm (Precision Fit)</strong>
          </div>
        </div>

      </div>

      <!-- 3. Exceptions Note -->
      <div class="exceptions-note">
        <h3>Still Unsure?</h3>
        <p>If you don't see your machine listed or have questions about a vintage model, please <NuxtLink style="color:var(--accent-gold); text-decoration:none;" to="/contact">contact our support team</NuxtLink>. We can usually determine compatibility with a model number or photo of your current setup.</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' });
</script>

<style scoped>
/* Copied exact aesthetics from the Returns & Policy templates */
.compatibility-landing {
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
  height: 480px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

/* 2. Grid System */
.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 80px;
}

.detail-card {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-icon {
  font-size: 28px;
  margin-bottom: 16px;
}

.detail-card h2 {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #fff;
}

.detail-card p {
  font-size: 13.5px;
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 24px;
}

.compat-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.compat-tag {
  background-color: #1a1918;
  border: 1px solid #3b3732;
  color: #d1cfcc;
  padding: 6px 14px;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 600;
}

.specs-box {
  margin-top: auto;
  background-color: #1a1918;
  border-radius: 6px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.specs-box span {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--accent-gold);
}

.specs-box strong {
  font-size: 14px;
  color: #fff;
}

/* 3. Exceptions */
.exceptions-note {
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
}

.exceptions-note h3 {
  font-family: var(--font-display, "Playfair Display", serif);
  font-style: italic;
  font-weight: 500;
  font-size: 24px;
  color: #fff;
  margin-bottom: 16px;
}

.exceptions-note p {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.7;
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
