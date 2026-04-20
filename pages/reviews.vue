<template>
  <div class="reviews-landing">
    <!-- Hero Section -->
    <div class="reviews-hero">
      <NuxtImg src="/reviews_hero.png" alt="Reviews Hero" class="hero-bg" />
      <div class="hero-overlay"></div>
      <div class="hero-content container">
        <div class="hero-label">TESTIMONIALS</div>
        <h1 class="hero-title">
          Sensory<br />
          <span class="hero-italic">Feedback</span>
        </h1>
        <p class="hero-desc">
          Read what the world's finest roasters, professional baristas, and passionate home enthusiasts have to say about the Barista Bench experience.
        </p>
        <div class="stats-overview">
          <div class="stat-rating">
            <span class="star-icon">★</span>
            <span class="star-icon">★</span>
            <span class="star-icon">★</span>
            <span class="star-icon">★</span>
            <span class="star-icon">★</span>
            <span class="score">4.9 / 5</span>
          </div>
          <div class="stat-text">Based on 2,400+ Verified Buyers</div>
        </div>
      </div>
    </div>

    <!-- Reviews Filter / Header -->
    <div class="container review-header">
      <h2>Latest Reviews</h2>
      <div class="review-filters">
        <button class="filter-btn active">All Gear</button>
        <button class="filter-btn">Manual Grinders</button>
        <button class="filter-btn">Portafilters</button>
        <button class="filter-btn">Tampers</button>
      </div>
    </div>

    <!-- Reviews Grid -->
    <div class="container reviews-grid">
      
      <!-- Review Card 1 -->
      <div class="review-card">
        <div class="rc-header">
          <div class="rc-avatar">MC</div>
          <div class="rc-meta">
            <div class="rc-name">Michael C. <span class="verified">✓ Verified</span></div>
            <div class="rc-date">2 weeks ago</div>
          </div>
        </div>
        <div class="rc-stars">★★★★★</div>
        <h3 class="rc-title">Incredible craftsmanship.</h3>
        <p class="rc-body">The precision on the unibody tamper is unlike anything I've used before. It fits my E61 basket perfectly with zero channeling. It feels heavy and substantial in the hand. Absolutely elevated my morning ritual.</p>
        <div class="rc-product">
          <div class="rc-product-img pkg-icon">📦</div>
          <div class="rc-product-name">Precision Calibrated Tamper (58.5mm)</div>
        </div>
      </div>

      <!-- Review Card 2 -->
      <div class="review-card">
        <div class="rc-header">
          <div class="rc-avatar img-bg-1"></div>
          <div class="rc-meta">
            <div class="rc-name">Sarah T. <span class="verified">✓ Verified</span></div>
            <div class="rc-date">1 month ago</div>
          </div>
        </div>
        <div class="rc-stars">★★★★★</div>
        <h3 class="rc-title">The bottomless portafilter is a game changer.</h3>
        <p class="rc-body">Bought this for my Breville Bambino. The build quality is stunning, the walnut handle is gorgeous, and being able to actually diagnose my shots visually has improved my espresso ten-fold.</p>
        <div class="rc-product">
          <div class="rc-product-img pkg-icon">📦</div>
          <div class="rc-product-name">Walnut Bottomless Portafilter (54mm)</div>
        </div>
      </div>

      <!-- Review Card 3 -->
      <div class="review-card">
        <div class="rc-header">
          <div class="rc-avatar">DK</div>
          <div class="rc-meta">
            <div class="rc-name">David K. <span class="verified">✓ Verified</span></div>
            <div class="rc-date">1 month ago</div>
          </div>
        </div>
        <div class="rc-stars">★★★★★</div>
        <h3 class="rc-title">Aesthetically perfect.</h3>
        <p class="rc-body">Everything from the packaging to the actual product screams premium. It looks incredible next to my Linea Micra. Customer support was also extremely helpful when I accidentally ordered the wrong size.</p>
        <div class="rc-product">
          <div class="rc-product-img pkg-icon">📦</div>
          <div class="rc-product-name">Acaia Pearl Scale Mount</div>
        </div>
      </div>

      <!-- Review Card 4 -->
      <div class="review-card">
        <div class="rc-header">
          <div class="rc-avatar img-bg-2"></div>
          <div class="rc-meta">
            <div class="rc-name">Elena R. <span class="verified">✓ Verified</span></div>
            <div class="rc-date">2 months ago</div>
          </div>
        </div>
        <div class="rc-stars">★★★★☆</div>
        <h3 class="rc-title">Great grinder, steep learning curve.</h3>
        <p class="rc-body">The manual burr grinder is phenomenally well-machined. Stepless adjustment means infinite dialing in. Because it's manual, it does take some elbow grease for light roasts, but the cup clarity is insane.</p>
        <div class="rc-product">
          <div class="rc-product-img pkg-icon">📦</div>
          <div class="rc-product-name">K-Pro Manual Burr Grinder</div>
        </div>
      </div>

      <!-- Review Card 5 -->
      <div class="review-card">
        <div class="rc-header">
          <div class="rc-avatar">JW</div>
          <div class="rc-meta">
            <div class="rc-name">James W. <span class="verified">✓ Verified</span></div>
            <div class="rc-date">3 months ago</div>
          </div>
        </div>
        <div class="rc-stars">★★★★★</div>
        <h3 class="rc-title">Best WDT tool on the market.</h3>
        <p class="rc-body">No more clumps. The magnetic stand setup is genius and the needles are perfectly thin (0.3mm) so they actually distribute the beans rather than pushing large clumps around. Worth every penny.</p>
        <div class="rc-product">
          <div class="rc-product-img pkg-icon">📦</div>
          <div class="rc-product-name">Magnetic WDT Distribution Tool</div>
        </div>
      </div>

      <!-- Review Card 6 -->
      <div class="review-card">
        <div class="rc-header">
          <div class="rc-avatar">AT</div>
          <div class="rc-meta">
            <div class="rc-name">Alex T. <span class="verified">✓ Verified</span></div>
            <div class="rc-date">3 months ago</div>
          </div>
        </div>
        <div class="rc-stars">★★★★★</div>
        <h3 class="rc-title">Absolutely beautiful distribution.</h3>
        <p class="rc-body">This compliments the unibody tamper so well. I get flat, level pucks every single time. My workflow consistency is night and day compared to my old setup.</p>
        <div class="rc-product">
          <div class="rc-product-img pkg-icon">📦</div>
          <div class="rc-product-name">Precision Distribution Leveler</div>
        </div>
      </div>

    </div>

    <!-- More Button -->
    <div class="load-more-container">
      <button class="btn-secondary-alt">LOAD MORE REVIEWS (2,394)</button>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' });
</script>

<style scoped>
/* Adhering back to the dark-mode aesthetic */
.reviews-landing {
  background-color: #1a1918;
  color: #f7f5f2;
  min-height: 100vh;
  padding-bottom: 120px;
  --accent-gold: #e2b382;
  --card-bg: #22211f;
  --border: #3b3732;
  --text-muted: #aca9a4;
  font-family: var(--font-body);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 1. Hero Section (Parallax style) */
.reviews-hero {
  position: relative;
  height: 550px;
  display: flex;
  align-items: center;
  margin-bottom: 80px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(to right, rgba(26,25,24,1) 10%, rgba(26,25,24,0.7) 60%, rgba(26,25,24,0) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  width: 100%;
}

.hero-label {
  color: var(--accent-gold);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.hero-title {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 72px;
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
  font-size: 16px;
  line-height: 1.7;
  color: #d1cfcc;
  margin-bottom: 40px;
}

.stats-overview {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: rgba(226, 179, 130, 0.1);
  padding: 8px 16px;
  border-radius: 40px;
  border: 1px solid rgba(226, 179, 130, 0.3);
}

.star-icon {
  color: var(--accent-gold);
  font-size: 16px;
}

.score {
  color: #fff;
  font-weight: 700;
  margin-left: 8px;
  font-size: 14px;
}

.stat-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
}

/* 2. Reviews Header */
.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 20px;
}

.review-header h2 {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 32px;
  color: #fff;
  font-weight: 500;
}

.review-filters {
  display: flex;
  gap: 12px;
}

.filter-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 10px 20px;
  border-radius: 40px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-body);
}

.filter-btn:hover {
  border-color: #666;
  color: #fff;
}

.filter-btn.active {
  background: var(--accent-gold);
  color: #1a1918;
  border-color: var(--accent-gold);
}

/* 3. Review Cards Grid */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 60px;
}

.review-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 32px;
  display: flex;
  flex-direction: column;
}

.rc-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.rc-avatar {
  width: 44px;
  height: 44px;
  background-color: #383633;
  color: var(--accent-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.img-bg-1 {
  background-image: url('https://i.pravatar.cc/150?u=a042581f4e29026704d');
  background-size: cover;
}
.img-bg-2 {
  background-image: url('https://i.pravatar.cc/150?u=a048581f4e29026701d');
  background-size: cover;
}

.rc-meta {
  display: flex;
  flex-direction: column;
}

.rc-name {
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.verified {
  font-size: 10px;
  color: #8cc38a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
}

.rc-date {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
}

.rc-stars {
  color: var(--accent-gold);
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.rc-title {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 18px;
  color: #fff;
  margin-bottom: 12px;
  font-weight: 500;
}

.rc-body {
  font-size: 13.5px;
  color: var(--text-muted);
  line-height: 1.6;
  flex: 1; /* Pushes product box to bottom */
  margin-bottom: 24px;
}

.rc-product {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.pkg-icon {
  width: 32px;
  height: 32px;
  background-color: #1a1918;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.rc-product-name {
  font-size: 12px;
  font-weight: 600;
  color: #d1cfcc;
}

/* 4. Load More */
.load-more-container {
  text-align: center;
}

.btn-secondary-alt {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 4px;
  border: 1px solid var(--border);
  background-color: transparent;
  color: #fff;
  transition: all 0.2s;
  cursor: pointer;
  font-family: var(--font-body);
}

.btn-secondary-alt:hover {
  background-color: #2a2927;
  border-color: #4a4845;
}

/* Responsive */
@media (max-width: 1024px) {
  .reviews-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .review-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
}
@media (max-width: 768px) {
  .reviews-grid {
    grid-template-columns: 1fr;
  }
  .hero-title {
    font-size: 56px;
  }
  .hero-overlay {
    background: linear-gradient(to bottom, rgba(26,25,24,0.5) 0%, rgba(26,25,24,1) 100%);
  }
}
</style>
