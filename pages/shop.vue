<template>
  <div class="page-top">
    <div class="container shop-layout">
      <!-- Sidebar -->
      <aside class="shop-sidebar">
        <div class="sidebar-section">
          <h5 class="sidebar-label">Categories</h5>
          <div class="cat-list">
            <button
              class="cat-item"
              :class="{ active: !activeCategory }"
              @click="setCategory(null)"
            >
              All Products <span class="cat-count">{{ totalCount }}</span>
            </button>
            <button
              v-for="cat in categories"
              :key="cat.id"
              class="cat-item"
              :class="{ active: activeCategory === cat.slug }"
              @click="setCategory(cat.slug)"
            >
              {{ cat.name }} <span class="cat-count">{{ cat.count }}</span>
            </button>
          </div>
        </div>

        <hr class="divider" />

        <div class="sidebar-section">
          <h5 class="sidebar-label">Price Range</h5>
          <div class="price-range">
            <div class="price-labels">
              <span>${{ priceMin }}</span>
              <span>${{ priceMax }}+</span>
            </div>
            <input
              type="range"
              v-model.number="priceMax"
              min="35"
              max="500"
              step="5"
              class="range-input"
            />
          </div>
        </div>

        <hr class="divider" />

        <div class="sidebar-section">
          <h5 class="sidebar-label">Material</h5>
          <div class="check-list">
            <label v-for="mat in materials" :key="mat" class="check-item">
              <input type="checkbox" :value="mat" v-model="activeMaterials" />
              <span class="check-box"></span>
              {{ mat }}
            </label>
          </div>
        </div>

        <hr class="divider" />

        <div class="bundle-promo">
          <div class="bundle-promo-icon">🎁</div>
          <h5>Bundle &amp; Save</h5>
          <p>
            Create your custom tool kit and get 15% off automatically at
            checkout.
          </p>
          <NuxtLink
            to="/bundle"
            class="btn btn-accent btn-sm btn-full btn-reveal"
            style="margin-top: 12px"
          >
            <span class="btn-text">Launch Builder</span>
            <span class="btn-arrow">→</span>
          </NuxtLink>
        </div>
      </aside>

      <!-- Main -->
      <div class="shop-main">
        <div class="shop-header">
          <div>
            <h1>{{ pageTitle }}</h1>
            <p class="shop-subtitle">Curated precision for the home barista.</p>
          </div>
          <div class="sort-wrap">
            <label class="sort-label">Sort by</label>
            <select v-model="sortBy" class="select" style="width: 160px">
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div class="products-grid-shop" v-if="!loading">
          <ProductCard
            v-for="p in sortedProducts"
            :key="p.id"
            :product="p"
            @add-to-cart="addItem(p.id)"
          />
          <div v-if="sortedProducts.length === 0" class="empty-state">
            <p>No products match your filters.</p>
            <button class="btn btn-outline" @click="resetFilters">
              Clear Filters
            </button>
          </div>
        </div>
        <div class="products-grid-shop" v-else>
          <div
            v-for="i in 6"
            :key="i"
            class="skeleton"
            style="height: 340px; border-radius: var(--radius-lg)"
          ></div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button class="page-btn" :disabled="page === 1" @click="page--">
            ‹
          </button>
          <button
            v-for="n in totalPages"
            :key="n"
            class="page-btn"
            :class="{ active: page === n }"
            @click="page = n"
          >
            {{ n }}
          </button>
          <button
            class="page-btn"
            :disabled="page === totalPages"
            @click="page++"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase: any = useSupabaseClient();
const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();
const { success } = useToast();

const products = ref<any[]>([]);
const categories = ref<any[]>([]);
const loading = ref(true);
const activeCategory = ref<string | null>(
  (route.query.category as string) || null,
);
const activeMaterials = ref<string[]>([]);
const priceMin = ref(0);
const priceMax = ref(500);
const sortBy = ref("featured");
const page = ref(1);
const perPage = 9;

const materials = ["American Walnut", "Anodized Aluminum", "Grade 304 Steel"];

const pageTitle = computed(() => {
  if (!activeCategory.value) return "The Tool Collection";
  const cat = categories.value.find((c) => c.slug === activeCategory.value);
  return cat?.name || "Products";
});

const totalCount = computed(() => products.value.length);

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    if (priceMax.value < 500 && p.price > priceMax.value) return false;
    if (activeMaterials.value.length) {
      const hasMatch = activeMaterials.value.some((m) =>
        p.materials?.includes(m),
      );
      if (!hasMatch) return false;
    }
    return true;
  });
});

const sortedProducts = computed(() => {
  const arr = [...filteredProducts.value];
  if (sortBy.value === "price_asc") arr.sort((a, b) => a.price - b.price);
  else if (sortBy.value === "price_desc") arr.sort((a, b) => b.price - a.price);
  else if (sortBy.value === "rating") arr.sort((a, b) => b.rating - a.rating);
  const start = (page.value - 1) * perPage;
  return arr.slice(start, start + perPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / perPage),
);

async function fetchProducts() {
  loading.value = true;
  let query = supabase.from("products_with_category").select("*");
  if (activeCategory.value)
    query = query.eq("category_slug", activeCategory.value);

  const { data } = await query;
  if (data) products.value = data;
  loading.value = false;
}

async function fetchCategories() {
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");
  if (!data) return;
  const counts = await Promise.all(
    data.map((c: any) =>
      supabase
        .from("products")
        .select("id", { count: "exact" })
        .eq("category_id", c.id),
    ),
  );
  categories.value = data.map((c: any, i: number) => ({
    ...c,
    count: counts[i].count || 0,
  }));
}

function setCategory(slug: string | null) {
  activeCategory.value = slug;
  page.value = 1;
  router.replace({ query: slug ? { category: slug } : {} });
  fetchProducts();
}

function resetFilters() {
  activeCategory.value = null;
  activeMaterials.value = [];
  priceMax.value = 500;
  fetchProducts();
}

async function addItem(id: string) {
  const ok = await addToCart(id);
  if (ok) success("Added to your bag");
}

watch(
  () => route.query.category,
  (v) => {
    activeCategory.value = (v as string) || null;
    fetchProducts();
  },
);

onMounted(() => {
  fetchCategories();
  fetchProducts();
});
</script>

<style scoped>
.shop-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;
  padding-top: 48px;
  padding-bottom: 80px;
  align-items: start;
}
.shop-sidebar {
  position: sticky;
  top: calc(var(--nav-h) + 24px);
}
.sidebar-label {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 14px;
  font-family: var(--font-body);
}
.sidebar-section {
  margin-bottom: 4px;
}
.cat-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.cat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  border: none;
  background: transparent;
  text-align: left;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13.5px;
  color: var(--text-2);
  font-family: var(--font-body);
  transition: all 0.15s;
  width: 100%;
}
.cat-item:hover {
  background: var(--surface-2);
  color: var(--text);
}
.cat-item.active {
  background: var(--text);
  color: white;
}
.cat-count {
  font-size: 11px;
  opacity: 0.6;
}
.check-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 13.5px;
  color: var(--text-2);
}
.check-item input[type="checkbox"] {
  display: none;
}
.check-box {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--border-hover);
  border-radius: 4px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.check-item input:checked + .check-box {
  background: var(--accent);
  border-color: var(--accent);
}
.check-item input:checked + .check-box::after {
  content: "✓";
  font-size: 10px;
  color: white;
  font-weight: 700;
}
.price-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-2);
  margin-bottom: 10px;
}
.range-input {
  width: 100%;
  accent-color: var(--accent);
}
.bundle-promo {
  background: var(--surface-2);
  border-radius: var(--radius-lg);
  padding: 20px;
}
.bundle-promo-icon {
  font-size: 22px;
  margin-bottom: 8px;
}
.bundle-promo h5 {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 6px;
}
.bundle-promo p {
  font-size: 12px;
  color: var(--text-2);
  line-height: 1.6;
}
.btn-reveal {
  background: #fff;
  color: var(--text);
  border: none;
  width: 48px;
  height: 48px;
  min-width: 48px;
  margin: 0 auto;
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
  width: 100%;
  padding: 0 16px;
  justify-content: center;
  gap: 10px;
}
.btn-reveal:hover .btn-text {
  opacity: 1;
  max-width: 140px;
}
.btn-reveal:hover .btn-arrow {
  transform: translateX(2px);
}
.shop-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 28px;
}
.shop-header h1 {
  font-size: 32px;
  margin-bottom: 4px;
}
.shop-subtitle {
  color: var(--text-2);
  font-size: 13.5px;
}
.sort-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}
.sort-label {
  font-size: 12px;
  color: var(--text-3);
  white-space: nowrap;
}
.products-grid-shop {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.empty-state {
  grid-column: 1/-1;
  text-align: center;
  padding: 60px 0;
  color: var(--text-2);
}
.empty-state p {
  margin-bottom: 16px;
}
.pagination {
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-top: 48px;
}
.page-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: var(--surface-2);
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s;
  color: var(--text-2);
  font-family: var(--font-body);
}
.page-btn:hover {
  border-color: var(--text);
  color: var(--text);
}
.page-btn.active {
  background: var(--text);
  border-color: var(--text);
  color: white;
}
.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .shop-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .shop-sidebar {
    position: static;
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
  }
  .sidebar-section {
    flex: 1;
    min-width: 200px;
  }
  .divider,
  .bundle-promo {
    display: none;
  }
}

@media (max-width: 768px) {
  .shop-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .products-grid-shop {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .shop-sidebar {
    flex-direction: column;
    gap: 20px;
  }
  .products-grid-shop {
    grid-template-columns: 1fr;
  }
}
</style>
