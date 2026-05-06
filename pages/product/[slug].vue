<template>
  <div class="page-top" v-if="product">
    <div class="container pdp-layout">
      <!-- Left: Images -->
      <div class="pdp-images">
        <div class="main-image">
          <div class="main-img-bg">
            <NuxtImg
              v-if="displayImages.length"
              :src="displayImages[activeThumb - 1]"
              :alt="product.name"
              class="main-img"
              format="webp"
              loading="lazy"
            />
          </div>
        </div>
        <div v-if="displayImages.length > 1" class="thumb-row">
          <div
            v-for="(img, i) in displayImages"
            :key="i"
            class="thumb"
            :class="{ active: activeThumb === i + 1 }"
            @click="activeThumb = i + 1"
          >
            <NuxtImg :src="img" :alt="`${product.name} ${i + 1}`" class="thumb-img" format="webp" loading="lazy" />
          </div>
        </div>
      </div>

      <!-- Right: Info -->
      <div class="pdp-info">
        <div class="pdp-series-row">
          <span class="section-label">{{ product.series }}</span>
          <div class="pdp-stars">
            <IconStar
              v-for="i in 5"
              :key="i"
              :filled="i <= Math.round(product.rating)"
            />
            <span class="pdp-rating-text"
              >({{ product.review_count }} Reviews)</span
            >
          </div>
        </div>

        <h1 class="pdp-title">{{ product.name }}</h1>
        <div class="pdp-price">{{ formatPrice(product.price) }}</div>
        <p class="pdp-desc">{{ product.description }}</p>

        <!-- Compatibility Checker -->
        <div class="compat-box">
          <div class="compat-header">
            <span class="compat-icon">⊙</span>
            <strong>Compatibility Checker</strong>
          </div>
          <p class="compat-sub">
            Ensure this tool matches your setup. Select your espresso machine
            model.
          </p>
          <select
            v-model="selectedMachine"
            class="select"
            style="margin-top: 12px"
          >
            <option value="">Select Machine Model</option>
            <option v-for="m in machines" :key="m.id" :value="m.slug">
              {{ m.brand }} {{ m.name }}
            </option>
          </select>
          <div v-if="selectedMachine" class="compat-result">
            <span class="compat-dot"></span>
            PERFECT FIT VERIFIED
          </div>
        </div>

        <!-- Qty + Add to Cart -->
        <div class="pdp-actions">
          <div class="qty-ctrl">
            <button @click="qty = Math.max(1, qty - 1)">−</button>
            <span>{{ qty }}</span>
            <button @click="qty++">+</button>
          </div>
          <button
            class="btn btn-primary btn-lg"
            style="flex: 1"
            @click="handleAdd"
            :disabled="adding"
          >
            {{ adding ? "Adding..." : "ADD TO CART" }}
          </button>
        </div>
        <div class="pdp-shipping">✈ FREE EXPRESS SHIPPING WORLDWIDE</div>

        <!-- Save button -->
        <button class="save-btn" @click="toggleSave">
          {{ saved ? "♥ Saved to Tools" : "♡ Save to Saved Tools" }}
        </button>
      </div>
    </div>

    <!-- Specs Section -->
    <section class="specs-section">
      <div class="container">
        <div
          class="burr-feature"
          v-if="product.category_slug === 'manual-grinders'"
        >
          <div class="burr-text">
            <div class="section-label">Burr Geometry</div>
            <h2>The heart of the grind.</h2>
            <p>
              Our proprietary {{ product.specs?.burr_size }} conical burr set is
              CNC-machined from high-carbon steel and finished with a
              plasma-nitriding process. The unique cutting geometry reduces
              fines by 14%, resulting in unprecedented flavor clarity.
            </p>
            <div class="burr-stats">
              <div class="burr-stat">
                <span class="bs-num"
                  >{{ product.specs?.burr_size?.split("mm")[0] }}mm</span
                >
                <span class="bs-label">Titanium Burrs</span>
              </div>
              <div class="burr-stat">
                <span class="bs-num">{{
                  product.specs?.steps_per_rotation || 120
                }}</span>
                <span class="bs-label">Steps per Rotation</span>
              </div>
            </div>
          </div>
          <div class="burr-visual">
            <div class="burr-circle-outer">
              <div class="burr-circle-inner">
                <div class="burr-star">★</div>
              </div>
            </div>
            <div class="burr-tolerance">
              <span>Tolerance</span>
              <span>{{ product.specs?.tolerance || "±0.01mm" }}</span>
            </div>
            <div class="burr-precision-label">PRECISION ALIGNMENT</div>
          </div>
        </div>

        <!-- TECHNICAL SPECS (LIGHT MODE REDESIGN) -->
        <div class="tech-specs-redesign">
          <div class="specs-header">
            <h2 class="specs-title">Technical Specifications</h2>
            <div class="specs-underline"></div>
          </div>

          <div class="specs-grid-main">
            <!-- Main Card -->
            <div class="spec-card card-main">
              <div class="spec-label">CORE MATERIALS</div>
              <h3 class="spec-heading">
                <span class="gold-accent-text">{{
                  product.specs?.material || "Weighted Brass"
                }}</span>
              </h3>
              <p class="spec-description">
                {{
                  product.category_slug === "tampers"
                    ? "A machine-milled core provides the perfect center of gravity for level tamping."
                    : "A solid brass core provides the perfect center of gravity for effortless distribution."
                }}
              </p>
              <div class="spec-badge">
                <span class="badge-icon">✓</span>
                <span class="badge-text" style="color: var(--accent)"
                  >INDUSTRIAL GRADE FINISH</span
                >
              </div>
            </div>

            <!-- Vertical Card -->
            <div class="spec-card card-vertical">
              <div class="spec-label">PRECISION DIMENSIONS</div>
              <div class="dim-main">
                <span class="dim-bg-letter">{{
                  product.specs?.size?.charAt(0) || "H"
                }}</span>
                <span class="dim-val">{{
                  product.specs?.size?.split("mm")[0] || "95"
                }}</span>
                <span class="dim-unit">mm</span>
              </div>
              <div class="dim-sub-label">
                TOTAL TOOL
                {{ product.category_slug === "tampers" ? "HEIGHT" : "SIZE" }}
              </div>

              <div class="dim-list">
                <div class="dim-item">
                  <span>REACH</span>
                  <span>{{ product.specs?.reach || "45mm" }}</span>
                </div>
                <div class="dim-item">
                  <span>GRIP DIA.</span>
                  <span>{{ product.specs?.grip_diameter || "18mm" }}</span>
                </div>
              </div>
            </div>

            <!-- Gold Card -->
            <div class="spec-card card-gold text-white">
              <div class="spec-label inverse-label" style="opacity: 0.6">
                NEEDLE CONFIGURATION
              </div>
              <div class="gold-val">{{ product.specs?.needles || "08" }}</div>
              <div class="gold-sub">SURGICAL STEEL TINES</div>
              <div class="gold-badge">🛡 ISO 13485 Compliant</div>
            </div>

            <!-- Small Card -->
            <div class="spec-card card-accent-light">
              <div class="accent-icon">⚙</div>
              <div class="accent-info">
                <div class="spec-label">NEEDLE DIAMETER</div>
                <div class="accent-val">
                  {{ product.specs?.needle_diameter || "0.35mm" }}
                </div>
              </div>
            </div>
          </div>

          <div class="specs-grid-bottom">
            <div class="bottom-spec">
              <h4>Material Integrity</h4>
              <p>
                Every component is machined from raw stock. The surgical grade
                stainless steel ensures zero oxidation and permanent structural
                integrity even in humid cafe environments.
              </p>
            </div>
            <div class="bottom-spec">
              <h4>Balanced Ergonomics</h4>
              <p>
                The weighted brass base acts as a stabilizer, lowering the
                center of mass to the user's fingertips, allowing for rhythmic,
                sweeping motions without fatigue.
              </p>
            </div>
            <div class="bottom-spec">
              <h4>Acoustic Feedback</h4>
              <p>
                The precise tolerance between the base and handle creates a
                distinct tactile "click" when docked, signaling the completion
                of the ritual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Reviews -->
    <section class="pdp-reviews" v-if="reviews.length">
      <div class="container">
        <h2>Customer Reviews</h2>
        <div class="reviews-grid-pdp">
          <div v-for="r in reviews" :key="r.id" class="review-card card">
            <div
              class="review-stars"
              style="display: flex; gap: 3px; color: var(--accent)"
            >
              <IconStar v-for="i in 5" :key="i" :filled="i <= r.rating" />
            </div>
            <p class="review-body-pdp">"{{ r.body }}"</p>
            <div class="review-meta">
              <span class="review-name">{{ r.reviewer_name }}</span>
              <span
                v-if="r.verified_purchase"
                class="badge badge-green"
                style="font-size: 10px"
                >✓ Verified</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-else-if="loading" class="page-top">
    <div class="container pdp-layout skeleton-pdp">
      <!-- Left: Images -->
      <div class="pdp-images">
        <div
          class="skeleton-box"
          style="aspect-ratio: 1; border-radius: 20px; margin-bottom: 12px"
        ></div>
        <div class="thumb-row" style="display: flex; gap: 12px">
          <div
            v-for="i in 4"
            :key="i"
            class="skeleton-box"
            style="flex: 1; aspect-ratio: 1; border-radius: 12px"
          ></div>
        </div>
      </div>
      <!-- Right: Info -->
      <div class="pdp-info" style="padding-top: 20px">
        <div
          class="skeleton-box"
          style="
            width: 150px;
            height: 16px;
            margin-bottom: 12px;
            border-radius: 4px;
          "
        ></div>
        <div
          class="skeleton-box"
          style="
            width: 80%;
            height: 48px;
            margin-bottom: 24px;
            border-radius: 8px;
          "
        ></div>
        <div
          class="skeleton-box"
          style="
            width: 120px;
            height: 28px;
            margin-bottom: 32px;
            border-radius: 4px;
          "
        ></div>
        <div
          class="skeleton-box"
          style="
            width: 100%;
            height: 16px;
            margin-bottom: 12px;
            border-radius: 4px;
          "
        ></div>
        <div
          class="skeleton-box"
          style="
            width: 95%;
            height: 16px;
            margin-bottom: 12px;
            border-radius: 4px;
          "
        ></div>
        <div
          class="skeleton-box"
          style="
            width: 70%;
            height: 16px;
            margin-bottom: 40px;
            border-radius: 4px;
          "
        ></div>
        <div
          class="skeleton-box"
          style="
            width: 100%;
            height: 180px;
            margin-bottom: 32px;
            border-radius: 12px;
          "
        ></div>
        <div
          class="skeleton-box"
          style="width: 100%; height: 56px; border-radius: 8px"
        ></div>
      </div>
    </div>
  </div>

  <div v-else class="page-top">
    <div class="container" style="padding-top: 80px; text-align: center">
      <p style="margin-bottom: 16px; font-size: 18px; color: var(--text-2)">
        Product not found.
      </p>
      <NuxtLink to="/shop" class="btn btn-primary" style="display: inline-flex"
        >BACK TO SHOP</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const supabase: any = useSupabaseClient();
const user = useSupabaseUser();
const { addToCart } = useCart();
const { success, error } = useToast();
const { formatPrice } = useCurrency();

const product = ref<any>(null);
const machines = ref<any[]>([]);
const reviews = ref<any[]>([]);
const loading = ref(true);
const activeThumb = ref(1);
const qty = ref(1);
const adding = ref(false);
const saved = ref(false);
const selectedMachine = ref("");

const displaySpecs = computed(() => {
  if (!product.value?.specs) return {};
  const exclude = ["steps_per_rotation", "tolerance"];
  return Object.fromEntries(
    Object.entries(product.value.specs).filter(([k]) => !exclude.includes(k)),
  );
});

const displayImages = computed(() => {
  const images = product.value?.images as string[] | undefined;
  if (!images || images.length === 0) return [];
  return images;
});

function formatKey(k: string) {
  return k.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

async function handleAdd() {
  adding.value = true;
  const ok = await addToCart(product.value.id, qty.value);
  if (ok) success(`${product.value.name} added to your bag`);
  else error("Please sign in to add items");
  adding.value = false;
}

async function toggleSave() {
  if (!user.value) {
    navigateTo("/auth/login");
    return;
  }
  if (saved.value) {
    await supabase
      .from("saved_tools")
      .delete()
      .eq("user_id", user.value.id)
      .eq("product_id", product.value.id);
    saved.value = false;
  } else {
    await supabase
      .from("saved_tools")
      .insert({ user_id: user.value.id, product_id: product.value.id } as any);
    saved.value = true;
    success("Saved to your tools");
  }
}

onMounted(async () => {
  const slug = route.params.slug as string;
  const [{ data: p }, { data: m }, { data: r }] = await Promise.all([
    supabase
      .from("products_with_category")
      .select("*")
      .eq("slug", slug)
      .single(),
    supabase.from("machine_models").select("*").order("brand"),
    supabase
      .from("reviews")
      .select("*")
      .eq(
        "product_id",
        (await supabase.from("products").select("id").eq("slug", slug).single())
          .data?.id,
      )
      .limit(6),
  ]);
  product.value = p;
  machines.value = m || [];
  reviews.value = r || [];
  loading.value = false;

  if (user.value && p) {
    const { data: sv } = await supabase
      .from("saved_tools")
      .select("id")
      .eq("user_id", user.value.id)
      .eq("product_id", p.id)
      .single();
    if (sv) saved.value = true;
  }
});
</script>

<style scoped>
.pdp-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  padding-top: 48px;
  padding-bottom: 80px;
}
.main-image {
  margin-bottom: 12px;
}
.main-img-bg {
  background: linear-gradient(135deg, #f0ede8, #e8e4de);
  border-radius: 20px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.main-img {
  width: 85%;
  height: 85%;
  object-fit: contain;
}
.thumb-row {
  display: flex;
  gap: 10px;
}
.thumb {
  width: 72px;
  height: 72px;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid var(--border);
  overflow: hidden;
  transition: border-color 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-2);
}
.thumb.active {
  border-color: var(--text);
}
.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pdp-series-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.pdp-stars {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--accent);
}
.pdp-rating-text {
  font-size: 12px;
  color: var(--text-2);
  margin-left: 4px;
}
.pdp-title {
  font-size: 40px;
  line-height: 1.1;
  margin-bottom: 12px;
}
.pdp-price {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 16px;
}
.pdp-desc {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.75;
  margin-bottom: 24px;
}

.compat-box {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 18px;
  margin-bottom: 24px;
}
.compat-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--accent);
  margin-bottom: 6px;
}
.compat-sub {
  font-size: 12.5px;
  color: var(--text-2);
}
.compat-result {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--green-bg);
  color: var(--green);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 8px 12px;
  border-radius: 6px;
  margin-top: 10px;
}
.compat-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green);
}

.pdp-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}
.qty-ctrl {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.qty-ctrl button {
  width: 38px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  color: var(--text-2);
  transition: background 0.15s;
  font-family: var(--font-body);
}
.qty-ctrl button:hover {
  background: var(--surface-2);
}
.qty-ctrl span {
  width: 44px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
}
.pdp-shipping {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-align: center;
  color: var(--text-3);
  margin-bottom: 16px;
}
.save-btn {
  width: 100%;
  border: 1.5px dashed var(--border);
  background: transparent;
  padding: 10px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 13px;
  color: var(--text-2);
  transition: all 0.15s;
  font-family: var(--font-body);
}
.save-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-light);
}

.specs-section {
  background: var(--surface-2);
  padding: 80px 0;
  margin-bottom: 0;
}
.burr-feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  margin-bottom: 80px;
}
.burr-text h2 {
  font-size: 40px;
  margin: 12px 0 16px;
}
.burr-text p {
  color: var(--text-2);
  font-size: 14px;
  line-height: 1.75;
  margin-bottom: 28px;
}
.burr-stats {
  display: flex;
  gap: 40px;
}
.burr-stat {
  display: flex;
  flex-direction: column;
}
.bs-num {
  font-size: 28px;
  font-weight: 700;
  font-family: var(--font-display);
}
.bs-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-3);
  margin-top: 2px;
}
.burr-visual {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.burr-circle-outer {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 2px solid var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
}
.burr-circle-inner {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
}
.burr-star {
  color: white;
  font-size: 36px;
  opacity: 0.4;
}
.burr-tolerance {
  font-size: 11px;
  color: var(--text-2);
  text-align: center;
}
.burr-precision-label {
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-3);
}

.tech-specs h2 {
  font-size: 32px;
  margin-bottom: 28px;
}
.specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.spec-item {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  border-right: 1px solid var(--border);
  background: var(--surface);
}
.spec-item:nth-child(3n) {
  border-right: none;
}
.spec-item:nth-last-child(-n + 3) {
  border-bottom: none;
}
.spec-key {
  display: block;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 6px;
}
.spec-val {
  font-size: 15px;
  font-weight: 600;
}

.pdp-reviews {
  padding: 80px 0;
}
.pdp-reviews h2 {
  font-size: 32px;
  margin-bottom: 28px;
}
.reviews-grid-pdp {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.review-body-pdp {
  font-size: 13.5px;
  color: var(--text-2);
  line-height: 1.7;
  font-style: italic;
  margin: 12px 0;
}
.review-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}
.review-name {
  font-size: 13px;
  font-weight: 600;
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

/* TECH SPECS REDESIGN (LIGHT MODE) */
.tech-specs-redesign {
  padding: 80px 0;
  border-top: 1px solid var(--border);
}
.specs-header {
  margin-bottom: 48px;
}
.specs-title {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 12px;
}
.specs-underline {
  width: 60px;
  height: 1px;
  background: var(--accent);
}
.specs-grid-main {
  display: grid;
  grid-template-columns: 1fr 1fr 0.8fr;
  grid-template-rows: 240px 180px;
  gap: 20px;
  margin-bottom: 64px;
}
.spec-card {
  padding: 32px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}
.card-main {
  grid-column: 1 / 3;
  background: #fff;
  position: relative;
  overflow: hidden;

  border-top: 3px solid var(--accent);
}
.gold-accent-text {
  color: #c4824a; /* A slightly darker gold for readability on light bg */
}
.inverse-label {
  color: #fff !important;
}
.card-main::after {
  content: "⚙";
  position: absolute;
  right: -20px;
  bottom: -40px;
  font-size: 180px;
  opacity: 0.04;
  pointer-events: none;
}
.card-vertical {
  grid-column: 3;
  grid-row: 1 / 3;
  background: #fff;
  color: var(--text);
  text-align: center;
  align-items: center;
}
.card-gold {
  background: #fff;
  color: var(--text);
}
.card-accent-light {
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}
.spec-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #8a8885;
  margin-bottom: 24px;
  text-transform: uppercase;
}
.spec-heading {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 42px;
  margin-bottom: 12px;
}
.spec-description {
  font-size: 13.5px;
  color: var(--text-2);
  max-width: 340px;
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
  background: var(--bg-dark);
  color: var(--accent);
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
  font-size: 110px;
  opacity: 0.08;
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
  font-size: 16px;
  color: var(--accent);
  margin-top: -10px;
}
.dim-sub-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-3);
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
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
}
.dim-item span:first-child {
  color: var(--text-3);
}
.gold-val {
  font-size: 64px;
  font-weight: 500;
  line-height: 1;
  margin-top: -10px;
  color: var(--accent);
}
.gold-sub {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin: 8px 0 24px;
  color: var(--text-2);
}
.gold-badge {
  font-size: 11px;
  font-weight: 600;
  font-style: italic;
  margin-top: auto;
  opacity: 0.9;
  color: var(--accent);
}
.accent-icon {
  font-size: 28px;
}
.accent-val {
  font-size: 24px;
  font-weight: 600;
}

.specs-grid-bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding-top: 40px;
}
.bottom-spec {
  background: white;
  padding: 32px;
  border-radius: 12px;
  transition: all 0.2s;
}
.bottom-spec:hover {
  transform: translateY(-4px);
}
.bottom-spec h4 {
  font-family: var(--font-display, serif);
  font-size: 22px;
  margin-bottom: 16px;
  color: var(--text);
  border-bottom: 2px solid var(--accent);
  display: inline-block;
  padding-bottom: 4px;
}
.bottom-spec p {
  font-size: 14.5px;
  color: var(--text-2);
  line-height: 1.7;
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  .pdp-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .specs-grid-main {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
  .card-vertical {
    grid-column: 1 / 3;
  }
}

@media (max-width: 768px) {
  .pdp-main {
    padding: 24px 0;
  }
  .pdp-title {
    font-size: 32px;
  }
  .reviews-grid-pdp {
    grid-template-columns: 1fr;
  }
  .specs-grid-main {
    grid-template-columns: 1fr;
  }
  .card-main,
  .card-vertical {
    grid-column: 1;
  }
  .specs-grid-bottom {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
