<template>
  <div class="landing">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-inner container">
        <div class="hero-content">
          <div class="section-label">New Precision Collection</div>
          <h1 class="hero-title">
            The standard for<br />
            <span class="accent-text">the perfect shot.</span>
          </h1>
          <p class="hero-desc">
            Curated high-performance espresso tools for the meticulous home
            barista. Elevate your daily ritual with laboratory-grade precision.
          </p>
          <div class="hero-actions">
            <NuxtLink to="/shop" class="btn btn-primary btn-lg"
              >Explore Collection</NuxtLink
            >
            <NuxtLink to="/bundle" class="btn btn-outline btn-lg"
              >Build Your Coffee Kit</NuxtLink
            >
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-num">15k+</span>
              <span class="stat-label">Baristas joined</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">4.9/5</span>
              <span class="stat-label">Average rating</span>
            </div>
          </div>
        </div>
        <div class="hero-img-wrap">
          <div class="hero-img-box">
            <div class="hero-img-placeholder">
              <div class="hero-product-mock">
                <div class="mock-grinder">
                  <div class="mock-g-body"></div>
                  <div class="mock-g-handle"></div>
                  <div class="mock-g-knob"></div>
                </div>
                <div class="mock-portafilter"></div>
              </div>
            </div>
            <div class="hero-badge">
              <div class="badge-icon">🏆</div>
              <div>
                <div class="badge-title">
                  Voted Best {{ new Date().getFullYear() }}
                </div>
                <div class="badge-sub">Barista Choice Awards</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED IN -->
    <section class="featured-in">
      <div class="container">
        <span class="fi-label">Featured in global coffee media</span>
        <div class="fi-logos">
          <span>☕ Sprudge</span>
          <span>◆ Blue Bottle</span>
          <span>✓ Nestle</span>
          <span>○ Coffee Brand</span>
          <span>◈ Roaster's Guild</span>
        </div>
      </div>
    </section>

    <!-- PROBLEM / SOLUTION -->
    <section class="problem-solution page-section">
      <div class="container ps-grid">
        <div class="problem-card card">
          <h3 class="problem-title">The Home Barista Dilemma</h3>
          <p class="problem-desc">
            Buying high-end espresso tools is often a game of compatibility
            guesswork. Will this 58mm portafilter fit your specific machine? Is
            this needs distributor precise enough?
          </p>
          <div class="problem-list">
            <div class="problem-item bad">
              <span class="pi-icon">✕</span>
              Incompatible sizes causing messy, wasted shots.
            </div>
            <div class="problem-item good">
              <span class="pi-icon">✓</span>
              Barista Bench curated kits are verified for perfect machine
              compatibility.
            </div>
          </div>
        </div>
        <div class="solution-side">
          <div class="section-label">Your Ritual, Perfected</div>
          <h2 class="solution-title">
            Precision is not a luxury, it's a requirement.
          </h2>
          <p class="solution-desc">
            We spend hundreds of hours testing every portafilter, tamper, and
            grinder to ensure they meet the rigorous demands of
            professional-grade extraction at home.
          </p>
        </div>
      </div>
    </section>

    <!-- BUNDLE CTA -->
    <section class="bundle-cta">
      <div class="container">
        <div class="bundle-banner">
          <div class="bundle-banner-text">
            <div class="section-label" style="color: var(--accent-light)">
              Personalized Experience
            </div>
            <h2>Everything you need,<br />nothing you don't.</h2>
            <ul class="bundle-features">
              <li>
                <span class="bf-dot"></span>Step-by-step sizing verification
              </li>
              <li><span class="bf-dot"></span>Curated tool matching</li>
            </ul>
            <NuxtLink
              to="/bundle"
              class="btn btn-outline btn-reveal"
              style="
                margin-top: 8px;
              "
            >
              <span class="btn-text">Launch Builder</span>
              <span class="btn-arrow">→</span>
            </NuxtLink>
          </div>
          <div class="bundle-banner-visual">
            <div class="tool-scatter">
              <div class="scatter-item s1"></div>
              <div class="scatter-item s2"></div>
              <div class="scatter-item s3"></div>
              <div class="scatter-item s4"></div>
              <div class="scatter-item s5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BEST SELLERS -->
    <section class="bestsellers page-section">
      <div class="container">
        <div class="section-header">
          <h2>The Best Sellers</h2>
          <p>
            The most trusted tools by our community of 15,000+ baristas.
            Essential for every serious espresso setup.
          </p>
        </div>
        <div class="products-grid" v-if="products.length">
          <ProductCard
            v-for="p in products"
            :key="p.id"
            :product="p"
            @add-to-cart="addToCartNow(p.id)"
          />
        </div>
        <div class="products-grid" v-else>
          <div v-for="i in 4" :key="i" class="product-skeleton card"></div>
        </div>
        <div class="section-footer-action">
          <NuxtLink to="/shop" class="btn btn-outline"
            >View All Products</NuxtLink
          >
        </div>
      </div>
    </section>

    <!-- REVIEWS -->
    <section
      class="reviews page-section"
      style="background: var(--surface-2); padding: 80px 0"
    >
      <div class="container">
        <div class="reviews-carousel-wrap">
          <div class="carousel-header">
            <h2 class="carousel-title">Consumer Voices</h2>
            <div class="carousel-controls">
              <button class="carousel-btn" @click="scrollReviews('left')" aria-label="Previous review">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
              <button class="carousel-btn" @click="scrollReviews('right')" aria-label="Next review">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
          <div class="reviews-carousel" ref="reviewsList">
            <div v-for="r in reviews" :key="r.id" class="review-card card">
              <div class="review-stars">
                <div v-for="i in 5" :key="i" class="star" :class="{ filled: i <= r.rating }">★</div>
              </div>
              <p class="review-body">"{{ r.body }}"</p>
              <div class="review-author">
                <div class="review-avatar">{{ r.reviewer_name[0] }}</div>
                <div>
                  <div class="review-name">{{ r.reviewer_name }}</div>
                  <div class="review-title-label">{{ r.reviewer_title }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ REDESIGN -->
    <section class="faq-section page-section">
      <div class="container faq-layout">
        <div class="faq-left">
          <div class="section-label" style="color: var(--accent-gold); margin-bottom: 12px;">SUPPORT</div>
          <h2 class="faq-headline">Common<br>Inquiries</h2>
          <p class="faq-subtext">
            Can’t find the answer you’re looking for? Reach out to our sommelier team for personalized assistance.
          </p>
          <NuxtLink to="/contact" class="contact-cta">
            <div class="cta-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <span>CONTACT SUPPORT</span>
          </NuxtLink>
        </div>
        <div class="faq-right">
          <div class="faq-list">
            <div
              v-for="(faq, i) in faqs"
              :key="i"
              class="faq-card"
              :class="{ open: openFaq === i }"
              @click="openFaq = openFaq === i ? null : i"
            >
              <div class="faq-card-header">
                <span class="faq-question">{{ faq.q }}</span>
                <span class="faq-chevron" :class="{ rotated: openFaq === i }">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </div>
              <Transition name="faq-slide">
                <div v-if="openFaq === i" class="faq-card-body">
                  <p>{{ faq.a }}</p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const { addToCart } = useCart();
const { success } = useToast();

const products = ref<any[]>([]);
const reviews = ref<any[]>([]);
const openFaq = ref<number | null>(null);
const reviewsList = ref<HTMLElement | null>(null);

function scrollReviews(dir: 'left' | 'right') {
  if (!reviewsList.value) return;
  const cardWidth = reviewsList.value.querySelector('.review-card')?.clientWidth || 400;
  const gap = 24;
  const scrollAmount = cardWidth + gap;
  reviewsList.value.scrollBy({
    left: dir === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  });
}

const faqs = [
  {
    q: "How do I know which portafilter size I need?",
    a: "Your machine's portafilter size depends on the group head diameter. Most home machines use either 54mm (Breville) or 58mm (Gaggia, ECM, La Marzocco). Use our compatibility checker on any product page to verify your fit.",
  },
  {
    q: "Are the wooden handles real hardwood?",
    a: "Yes. All wooden handles are crafted from sustainably sourced American Walnut, individually finished with food-safe natural oil. Each piece has a unique grain pattern.",
  },
  {
    q: "What is your return policy for tools?",
    a: "All tools are eligible for return within 30 days of delivery. Items must be in their original packaging with no visible wear. Initiate a return directly from your account dashboard.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide with FedEx Priority. Free shipping applies to orders over $150 to the US, Canada, and EU. International orders ship within 2 business days.",
  },
];

onMounted(async () => {
  const [{ data: p }, { data: r }] = await Promise.all([
    supabase.from("products").select("*").eq("is_bestseller", true).limit(4),
    supabase.from("reviews").select("*").limit(3),
  ]);
  if (p) products.value = p;
  if (r) reviews.value = r;
});

async function addToCartNow(id: string) {
  const ok = await useCart().addToCart(id);
  if (ok) success("Added to your bag");
}
</script>

<style scoped>
.landing {
  overflow: hidden;
}

/* HERO */
.hero {
  padding: calc(var(--nav-h) + 64px) 0 80px;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.hero-title {
  font-size: 56px;
  line-height: 1.08;
  color: var(--text);
}
.accent-text {
  color: var(--accent);
}
.hero-desc {
  font-size: 15px;
  color: var(--text-2);
  line-height: 1.75;
  max-width: 420px;
}
.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.hero-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 8px;
}
.stat {
  display: flex;
  flex-direction: column;
}
.stat-num {
  font-size: 22px;
  font-weight: 700;
  font-family: var(--font-display);
}
.stat-label {
  font-size: 11px;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.stat-divider {
  width: 1px;
  height: 36px;
  background: var(--border);
}
.hero-img-wrap {
  position: relative;
}
.hero-img-box {
  background: linear-gradient(135deg, #2a2825 0%, #1a1816 100%);
  border-radius: 24px;
  aspect-ratio: 1/1.05;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-product-mock {
  position: relative;
}
.mock-grinder {
  position: relative;
}
.mock-g-body {
  width: 80px;
  height: 180px;
  background: linear-gradient(160deg, #3a3835, #1c1a18);
  border-radius: 12px 12px 20px 20px;
  margin: 0 auto;
  box-shadow: inset -4px 0 12px rgba(0, 0, 0, 0.4);
}
.mock-g-handle {
  width: 100px;
  height: 6px;
  background: #5a4a3a;
  border-radius: 3px;
  margin: -80px auto 0;
  transform: rotate(-15deg);
}
.mock-g-knob {
  width: 20px;
  height: 20px;
  background: #6b5a48;
  border-radius: 50%;
  margin: 4px auto 0;
}
.mock-portafilter {
  width: 110px;
  height: 28px;
  background: linear-gradient(180deg, #4a3828, #2a2018);
  border-radius: 4px 4px 16px 16px;
  margin: 24px auto 0;
}
.hero-badge {
  position: absolute;
  bottom: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
}
.badge-icon {
  font-size: 22px;
}
.badge-title {
  font-size: 13px;
  font-weight: 600;
}
.badge-sub {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 1px;
}

/* FEATURED IN */
.featured-in {
  padding: 28px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}
.featured-in .container {
  display: flex;
  align-items: center;
  gap: 40px;
}
.fi-label {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
  white-space: nowrap;
}
.fi-logos {
  display: flex;
  gap: 40px;
  align-items: center;
  flex-wrap: wrap;
}
.fi-logos span {
  font-size: 13px;
  color: var(--text-3);
  font-weight: 500;
  letter-spacing: 0.04em;
}

/* PROBLEM/SOLUTION */
.ps-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.problem-title {
  font-size: 24px;
  margin-bottom: 14px;
}
.problem-desc {
  color: var(--text-2);
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 20px;
}
.problem-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.problem-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 13.5px;
}
.problem-item.bad {
  background: var(--red-bg);
  color: var(--red);
}
.problem-item.good {
  background: var(--green-bg);
  color: var(--green);
}
.pi-icon {
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}
.solution-title {
  font-size: 42px;
  line-height: 1.1;
  margin: 12px 0 20px;
}
.solution-desc {
  font-size: 15px;
  color: var(--text-2);
  line-height: 1.75;
}

/* BUNDLE BANNER */
.bundle-banner {
  background: linear-gradient(135deg, #1c1b19 60%, #2a2520);
  border-radius: 24px;
  padding: 64px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.bundle-banner h2 {
  font-size: 40px;
  color: white;
  line-height: 1.15;
  margin: 12px 0 24px;
}
.bundle-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
}
.bundle-features li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
}
.bf-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}
.tool-scatter {
  position: relative;
  width: 100%;
  height: 280px;
}
.scatter-item {
  position: absolute;
  border-radius: 8px;
  background: linear-gradient(135deg, #3a3530, #252220);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.btn-reveal {
  background: #fff;
  color: var(--text);
  border: none;
  width: 52px;
  height: 52px;
  min-width: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 0;
}
.btn-reveal .btn-text {
  opacity: 0;
  max-width: 0;
  white-space: nowrap;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  font-weight: 700;
  letter-spacing: 0.02em;
}
.btn-reveal .btn-arrow {
  transition: transform 0.3s ease;
  font-size: 18px;
  flex-shrink: 0;
}
.btn-reveal:hover {
  width: 190px;
  background: #fff;
  color: var(--text);
  padding: 0 20px;
  justify-content: flex-start;
  gap: 12px;
}
.btn-reveal:hover .btn-text {
  opacity: 1;
  max-width: 140px;
}
.btn-reveal:hover .btn-arrow {
  transform: translateX(2px);
}
.s1 {
  width: 80px;
  height: 200px;
  top: 10px;
  left: 40px;
  border-radius: 12px 12px 20px 20px;
  transform: rotate(-8deg);
}
.s2 {
  width: 120px;
  height: 18px;
  top: 80px;
  left: 10px;
  border-radius: 6px;
  transform: rotate(-8deg);
  background: #4a3828;
}
.s3 {
  width: 60px;
  height: 60px;
  top: 60px;
  right: 30px;
  border-radius: 50%;
  background: #2e2a26;
}
.s4 {
  width: 140px;
  height: 22px;
  bottom: 60px;
  left: 30px;
  border-radius: 4px 4px 14px 14px;
}
.s5 {
  width: 40px;
  height: 40px;
  bottom: 40px;
  right: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a3520, #2a1e14);
}

/* PRODUCTS GRID */
.section-header {
  text-align: center;
  margin-bottom: 48px;
}
.section-header h2 {
  font-size: 38px;
  margin-bottom: 10px;
}
.section-header p {
  color: var(--text-2);
  font-size: 14.5px;
  max-width: 480px;
  margin: 0 auto;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.product-skeleton {
  height: 340px;
}
.section-footer-action {
  text-align: center;
  margin-top: 40px;
}

/* REVIEWS CAROUSEL */
.reviews-carousel-wrap {
  position: relative;
}
.carousel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}
.carousel-title {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 32px;
  font-weight: 500;
}
.carousel-controls {
  display: flex;
  gap: 12px;
}
.carousel-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.carousel-btn:hover {
  background: var(--text);
  color: white;
  border-color: var(--text);
}
.reviews-carousel {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 20px; /* Space for hidden scrollbar */
  margin-bottom: -20px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.reviews-carousel::-webkit-scrollbar {
  display: none;
}
.review-card {
  flex: 0 0 calc(33.333% - 16px);
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 240px;
}
.review-stars {
  display: flex;
  gap: 3px;
  font-size: 14px;
  color: #ddd;
}
.review-stars .star.filled {
  color: var(--accent-gold, #c4a882);
}
.review-body {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.75;
  font-style: italic;
  flex: 1;
}
.review-author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
}
.review-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent-light);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}
.review-name {
  font-size: 13px;
  font-weight: 600;
}
.review-title-label {
  font-size: 11.5px;
  color: var(--text-3);
}

/* FAQ REDESIGN */
.faq-section {
  background: #121211;
  color: #fff;
  padding: 100px 0;
}
.faq-layout {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 80px;
}
.faq-headline {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 56px;
  line-height: 1.1;
  margin-bottom: 24px;
}
.faq-subtext {
  font-size: 15px;
  color: #888;
  line-height: 1.7;
  max-width: 320px;
  margin-bottom: 40px;
}
.contact-cta {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  transition: all 0.2s;
}
.contact-cta:hover .cta-icon-box {
  background: #f1bf8b;
  transform: translateY(-2px);
}
.cta-icon-box {
  width: 52px;
  height: 44px;
  background: var(--accent-gold, #e2b382);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #121211;
  transition: all 0.2s;
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.faq-card {
  background: #1a1a19;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
.faq-card:hover {
  background: #222221;
}
.faq-card-header {
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.faq-question {
  font-size: 18px;
  font-weight: 400;
  color: #f7f5f2;
}
.faq-chevron {
  color: var(--accent-gold);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.faq-chevron.rotated {
  transform: rotate(180deg);
}
.faq-card-body {
  padding: 0 32px 24px;
  font-size: 15px;
  line-height: 1.7;
  color: #888;
}

/* Transitions */
.faq-slide-enter-active, .faq-slide-leave-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}
.faq-slide-enter-from, .faq-slide-leave-to {
  opacity: 0;
  max-height: 0;
}
.faq-slide-enter-to, .faq-slide-leave-from {
  opacity: 1;
  max-height: 300px;
}

/* TECH SPECS REDESIGN (LIGHT MODE) */
.tech-specs-section {
  background: #fbf9f7;
  color: #1a1918;
  padding: 100px 0;
}
.specs-header {
  margin-bottom: 60px;
}
.specs-title {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 38px;
  font-weight: 500;
  margin-bottom: 12px;
}
.specs-underline {
  width: 80px;
  height: 1px;
  background: var(--accent-gold);
}
.specs-grid-main {
  display: grid;
  grid-template-columns: 1fr 1fr 0.8fr;
  grid-template-rows: 240px 180px;
  gap: 24px;
  margin-bottom: 64px;
}
.spec-card {
  padding: 32px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
.card-main {
  grid-column: 1 / 3;
  background: #f3f1ed;
  position: relative;
  overflow: hidden;
}
.card-main::after {
  content: "⚙";
  position: absolute;
  right: -20px;
  bottom: -40px;
  font-size: 180px;
  opacity: 0.05;
  pointer-events: none;
}
.card-vertical {
  grid-column: 3;
  grid-row: 1 / 3;
  background: #1a1918;
  color: #fff;
  text-align: center;
  align-items: center;
}
.card-gold {
  background: var(--accent-gold);
  color: #1a1918;
}
.card-accent-light {
  background: #e5e2dd;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}
.spec-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #888;
  margin-bottom: 24px;
  text-transform: uppercase;
}
.spec-heading {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 42px;
  margin-bottom: 12px;
}
.spec-description {
  font-size: 14px;
  color: #666;
  max-width: 300px;
  line-height: 1.6;
}
.spec-badge {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
}
.badge-icon {
  width: 24px;
  height: 24px;
  background: #1a1918;
  color: var(--accent-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dim-main {
  position: relative;
  margin: 10px 0;
}
.dim-bg-letter {
  font-family: var(--font-display, serif);
  font-size: 120px;
  opacity: 0.1;
  line-height: 1;
}
.dim-val {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 64px;
  font-weight: 500;
}
.dim-unit {
  display: block;
  font-size: 18px;
  color: var(--accent-gold);
  margin-top: -10px;
}
.dim-sub-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #555;
  margin-bottom: 40px;
}
.dim-list {
  width: 100%;
  border-top: 1px solid #333;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.dim-item {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
}
.dim-item span:first-child { color: #888; }
.gold-val { font-size: 48px; font-weight: 500; line-height: 1; margin-top: -10px; }
.gold-sub { font-size: 11px; font-weight: 700; letter-spacing: 0.05em; margin: 8px 0 24px; }
.gold-badge { font-size: 11px; font-weight: 600; font-style: italic; margin-top: auto; }
.accent-icon { font-size: 24px; }
.accent-val { font-size: 24px; font-weight: 500; }

.specs-grid-bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  padding-top: 64px;
  border-top: 1px solid #eee;
}
.bottom-spec h4 {
  font-family: var(--font-display, serif);
  font-size: 20px;
  margin-bottom: 16px;
}
.bottom-spec p {
  font-size: 13.5px;
  color: #666;
  line-height: 1.7;
}

/* RESPONSIVE DESIGN */

/* Tablet & Smaller Desktop */
@media (max-width: 1024px) {
  .hero-inner,
  .ps-grid,
  .bundle-banner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .hero-inner {
    text-align: center;
    padding-top: 40px;
  }
  
  .hero-content {
    align-items: center;
  }
  
  .hero-desc {
    max-width: 100%;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-img-box {
    max-width: 500px;
    margin: 0 auto;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .review-card {
    flex: 0 0 calc(50% - 12px);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .hero-title {
    font-size: 40px;
  }
  
  .section-label {
    font-size: 10px;
  }
  
  .featured-in .container {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .fi-logos {
    justify-content: center;
    gap: 24px;
  }
  
  .solution-title {
    font-size: 32px;
  }
  
  .bundle-banner {
    padding: 40px 24px;
  }
  
  .bundle-banner h2 {
    font-size: 28px;
  }
  
  .section-header h2 {
    font-size: 28px;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .reviews-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
  
  .stat-divider {
    width: 36px;
    height: 1px;
  }

  .hero-img-box {
    aspect-ratio: 1.2 / 1;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-actions .btn {
    width: 100%;
  }

  .fi-logos span {
    font-size: 11px;
  }

  .review-card {
    flex: 0 0 85%;
  }

  .carousel-title {
    font-size: 24px;
  }

  .faq-layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .faq-headline {
    font-size: 38px;
  }
  .faq-card-header {
    padding: 20px 24px;
  }

  /* TECH SPECS MOBILE */
  .specs-grid-main {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  .card-main, .card-vertical {
    grid-column: 1;
  }
  .specs-grid-bottom {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .spec-heading {
    font-size: 32px;
  }
}
</style>
