<template>
  <div class="pt-[calc(56px+48px)]">
    <div class="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 pb-20 items-start">
      <!-- Sidebar -->
      <aside class="lg:sticky lg:top-[calc(56px+24px)] flex flex-wrap lg:flex-col gap-8 lg:gap-0">
        <div class="flex-1 min-w-[200px] lg:mb-1">
          <h5 class="text-[10.5px] font-bold tracking-[0.1em] uppercase text-text-3 mb-3.5 font-body">Categories</h5>
          <div class="flex flex-col gap-0.5">
            <button
              class="flex justify-between items-center px-2.5 py-2 border-none bg-transparent text-left rounded-md cursor-pointer text-[13.5px] transition-all duration-150 font-body"
              :class="!activeCategory ? 'bg-text text-white' : 'text-text-2 hover:bg-surface-2 hover:text-text'"
              @click="setCategory(null)"
            >
              All Products <span class="text-[11px] opacity-60">{{ totalCount }}</span>
            </button>
            <button
              v-for="cat in categories"
              :key="cat.id"
              class="flex justify-between items-center px-2.5 py-2 border-none bg-transparent text-left rounded-md cursor-pointer text-[13.5px] transition-all duration-150 font-body"
              :class="activeCategory === cat.slug ? 'bg-text text-white' : 'text-text-2 hover:bg-surface-2 hover:text-text'"
              @click="setCategory(cat.slug)"
            >
              {{ cat.name }} <span class="text-[11px] opacity-60">{{ cat.count }}</span>
            </button>
          </div>
        </div>

        <hr class="hidden lg:block border-none border-t border-border my-6" />

        <div class="flex-1 min-w-[200px] lg:mb-1">
          <h5 class="text-[10.5px] font-bold tracking-[0.1em] uppercase text-text-3 mb-3.5 font-body">Price Range</h5>
          <div class="space-y-2.5">
            <div class="flex justify-between text-[12px] text-text-2">
              <span>${{ priceMin }}</span>
              <span>${{ priceMax }}+</span>
            </div>
            <input
              type="range"
              v-model.number="priceMax"
              min="35"
              max="500"
              step="5"
              class="w-full accent-accent"
            />
          </div>
        </div>

        <hr class="hidden lg:block border-none border-t border-border my-6" />

        <div class="flex-1 min-w-[200px] lg:mb-1">
          <h5 class="text-[10.5px] font-bold tracking-[0.1em] uppercase text-text-3 mb-3.5 font-body">Material</h5>
          <div class="flex flex-col gap-2.5">
            <label v-for="mat in materials" :key="mat" class="flex items-center gap-2.5 cursor-pointer text-[13.5px] text-text-2 group">
              <input type="checkbox" :value="mat" v-model="activeMaterials" class="hidden" />
              <div class="w-4 h-4 border-[1.5px] border-border-hover rounded flex items-center justify-center transition-all duration-150 group-has-[:checked]:bg-accent group-has-[:checked]:border-accent">
                <span class="hidden group-has-[:checked]:block text-[10px] text-white font-bold">✓</span>
              </div>
              {{ mat }}
            </label>
          </div>
        </div>

        <hr class="hidden lg:block border-none border-t border-border my-6" />

        <div class="hidden lg:block bg-surface-2 rounded-lg p-5">
          <div class="text-[22px] mb-2">🎁</div>
          <h5 class="text-[13px] font-bold mb-1.5">Bundle &amp; Save</h5>
          <p class="text-[12px] text-text-2 leading-[1.6]">
            Create your custom tool kit and get 15% off automatically at
            checkout.
          </p>
          <NuxtLink
            to="/bundle"
            class="group mt-3 flex items-center justify-center bg-white text-text w-12 h-12 min-w-[12px] rounded-xl overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:w-full hover:px-4 hover:gap-2.5"
          >
            <span class="opacity-0 max-w-0 whitespace-nowrap transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:max-w-[140px] font-bold tracking-tight text-[11px] uppercase">Launch Builder</span>
            <span class="text-lg transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </NuxtLink>
        </div>
      </aside>

      <!-- Main -->
      <div class="flex-1">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-7">
          <div>
            <h1 class="text-[32px] font-semibold mb-1 text-text">{{ pageTitle }}</h1>
            <p class="text-text-2 text-[13.5px]">Curated precision for the home barista.</p>
          </div>
          <div class="flex items-center gap-2.5">
            <label class="text-[12px] text-text-3 whitespace-nowrap">Sort by</label>
            <select v-model="sortBy" class="w-40 px-3.5 py-2.5 bg-surface border-[1.5px] border-border rounded-lg font-body text-sm text-text outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%2212%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%236B6862%22_stroke-width=%222%22%3E%3Cpath_d=%22M6_9l6_6_6-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] focus:border-accent">
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" v-if="!loading">
          <ProductCard
            v-for="p in sortedProducts"
            :key="p.id"
            :product="p"
            @add-to-cart="addItem(p.id)"
          />
          <div v-if="sortedProducts.length === 0" class="col-span-full text-center py-[60px] text-text-2">
            <p class="mb-4">No products match your filters.</p>
            <button class="btn btn-outline" @click="resetFilters">
              Clear Filters
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" v-else>
          <div
            v-for="i in 6"
            :key="i"
            class="h-[340px] bg-surface-2 rounded-lg skeleton"
          ></div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex gap-1.5 justify-center mt-12">
          <button class="w-9 h-9 border-none bg-surface-2 rounded-lg cursor-pointer text-[13px] font-medium transition-all duration-150 text-text-2 font-body hover:text-text disabled:opacity-35 disabled:cursor-not-allowed" :disabled="page === 1" @click="page--">
            ‹
          </button>
          <button
            v-for="n in totalPages"
            :key="n"
            class="w-9 h-9 border-none rounded-lg cursor-pointer text-[13px] font-medium transition-all duration-150 font-body"
            :class="page === n ? 'bg-text text-white' : 'bg-surface-2 text-text-2 hover:text-text'"
            @click="page = n"
          >
            {{ n }}
          </button>
          <button
            class="w-9 h-9 border-none bg-surface-2 rounded-lg cursor-pointer text-[13px] font-medium transition-all duration-150 text-text-2 font-body hover:text-text disabled:opacity-35 disabled:cursor-not-allowed"
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
@keyframes shimmer {
  0% { background-position: -600px 0; }
  100% { background-position: 600px 0; }
}
.skeleton {
  background: linear-gradient(90deg, #EFEDE9 25%, #E2DED8 50%, #EFEDE9 75%);
  background-size: 600px 100%;
  animation: shimmer 1.4s infinite;
}
</style>
