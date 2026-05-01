<template>
  <div class="overflow-hidden">
    <!-- HERO -->
    <section class="pt-[calc(56px+64px)] pb-20 lg:pt-[calc(56px+64px)] lg:pb-20">
      <div class="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-center lg:text-left">
        <div class="flex flex-col gap-5 items-center lg:items-start">
          <div class="text-[11px] font-semibold tracking-[0.12em] uppercase text-accent">New Precision Collection</div>
          <h1 class="text-4xl md:text-[56px] font-display font-semibold leading-[1.08] text-text">
            The standard for<br />
            <span class="text-accent">the perfect shot.</span>
          </h1>
          <p class="text-[15px] text-text-2 leading-[1.75] max-w-none lg:max-w-[420px]">
            Curated high-performance espresso tools for the meticulous home
            barista. Elevate your daily ritual with laboratory-grade precision.
          </p>
          <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
            <NuxtLink to="/shop" class="btn btn-primary btn-lg w-full sm:w-auto">Explore Collection</NuxtLink>
            <NuxtLink to="/bundle" class="btn btn-outline btn-lg w-full sm:w-auto">Build Your Coffee Kit</NuxtLink>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-2">
            <div class="flex flex-col">
              <span class="text-[22px] font-bold font-display leading-tight">15k+</span>
              <span class="text-[11px] text-text-3 uppercase tracking-[0.08em]">Baristas joined</span>
            </div>
            <div class="hidden sm:block w-px h-9 bg-border"></div>
            <div class="sm:hidden w-9 h-px bg-border"></div>
            <div class="flex flex-col">
              <span class="text-[22px] font-bold font-display leading-tight">4.9/5</span>
              <span class="text-[11px] text-text-3 uppercase tracking-[0.08em]">Average rating</span>
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="bg-gradient-to-br from-[#2a2825] to-[#1a1816] rounded-[24px] aspect-[1/1.05] sm:aspect-[1.2/1] lg:aspect-[1/1.05] overflow-hidden relative flex items-center justify-center max-w-[500px] mx-auto lg:max-w-none">
            <div class="w-full h-full flex items-center justify-center">
              <div class="relative">
                <div class="relative">
                  <div class="w-20 h-[180px] bg-gradient-to-br from-[#3a3835] to-[#1c1a18] rounded-t-xl rounded-b-[20px] mx-auto shadow-[inset_-4px_0_12px_rgba(0,0,0,0.4)]"></div>
                  <div class="w-[100px] h-1.5 bg-[#5a4a3a] rounded-[3px] mx-auto mt-[-80px] -rotate-[15deg]"></div>
                  <div class="w-5 h-5 bg-[#6b5a48] rounded-full mx-auto mt-1"></div>
                </div>
                <div class="w-[110px] h-7 bg-gradient-to-b from-[#4a3828] to-[#2a2018] rounded-t-sm rounded-b-[16px] mx-auto mt-6"></div>
              </div>
            </div>
            <div class="absolute bottom-6 right-6 bg-white/10 backdrop-blur-xl border border-white/15 rounded-xl p-3 sm:p-4 flex items-center gap-3 text-white">
              <div class="text-[22px]">🏆</div>
              <div class="text-left">
                <div class="text-[13px] font-semibold leading-tight">Voted Best {{ new Date().getFullYear() }}</div>
                <div class="text-[11px] text-white/50 mt-0.5">Barista Choice Awards</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED IN -->
    <section class="py-7 border-y border-border bg-surface">
      <div class="container mx-auto px-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-10">
        <span class="text-[11px] tracking-widest uppercase text-text-3 whitespace-nowrap">Featured in global coffee media</span>
        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-10">
          <span v-for="brand in ['☕ Sprudge', '◆ Blue Bottle', '✓ Nestle', '○ Coffee Brand', '◈ Roaster\'s Guild']" :key="brand" class="text-[11px] sm:text-[13px] text-text-3 font-medium tracking-tight whitespace-nowrap">
            {{ brand }}
          </span>
        </div>
      </div>
    </section>

    <!-- PROBLEM / SOLUTION -->
    <section class="py-20">
      <div class="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div class="bg-surface rounded-lg p-6 lg:p-8 shadow-sm border border-border/50">
          <h3 class="text-2xl font-display font-semibold mb-3.5 text-text">The Home Barista Dilemma</h3>
          <p class="text-text-2 text-sm leading-[1.7] mb-5">
            Buying high-end espresso tools is often a game of compatibility
            guesswork. Will this 58mm portafilter fit your specific machine? Is
            this distributor precise enough?
          </p>
          <div class="flex flex-col gap-3">
            <div class="flex items-start gap-2.5 p-3 rounded-lg text-[13.5px] bg-red-bg text-red">
              <span class="font-bold shrink-0 mt-0.5">✕</span>
              Incompatible sizes causing messy, wasted shots.
            </div>
            <div class="flex items-start gap-2.5 p-3 rounded-lg text-[13.5px] bg-green-bg text-green">
              <span class="font-bold shrink-0 mt-0.5">✓</span>
              Barista Bench curated kits are verified for perfect machine compatibility.
            </div>
          </div>
        </div>
        <div class="text-center lg:text-left">
          <div class="text-[11px] font-semibold tracking-[0.12em] uppercase text-accent">Your Ritual, Perfected</div>
          <h2 class="text-[32px] lg:text-[42px] font-display font-semibold leading-[1.1] my-3 lg:my-5 text-text">
            Precision is not a luxury, it's a requirement.
          </h2>
          <p class="text-[15px] text-text-2 leading-[1.75]">
            We spend hundreds of hours testing every portafilter, tamper, and
            grinder to ensure they meet the rigorous demands of
            professional-grade extraction at home.
          </p>
        </div>
      </div>
    </section>

    <!-- BUNDLE CTA -->
    <section class="pb-20 lg:pb-28">
      <div class="container mx-auto px-8">
        <div class="bg-gradient-to-br from-[#1c1b19] via-[#1c1b19] to-[#2a2520] rounded-[24px] p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
          <div class="relative z-10 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div class="text-[11px] font-semibold tracking-[0.12em] uppercase text-accent-light mb-2">Personalized Experience</div>
            <h2 class="text-[28px] lg:text-[40px] font-display font-semibold text-white leading-[1.15] mb-6">Everything you need,<br />nothing you don't.</h2>
            <ul class="flex flex-col gap-2.5 mb-7 list-none">
              <li class="flex items-center gap-2.5 text-white/65 text-sm">
                <span class="w-2 h-2 rounded-full bg-accent shrink-0"></span>Step-by-step sizing verification
              </li>
              <li class="flex items-center gap-2.5 text-white/65 text-sm">
                <span class="w-2 h-2 rounded-full bg-accent shrink-0"></span>Curated tool matching
              </li>
            </ul>
            <NuxtLink
              to="/bundle"
              class="group flex items-center justify-center bg-white text-text w-[52px] h-[52px] min-w-[52px] rounded-xl overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:w-[190px] hover:px-5 hover:justify-start hover:gap-3"
            >
              <span class="opacity-0 max-w-0 whitespace-nowrap transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:max-w-[140px] font-bold tracking-tight">Launch Builder</span>
              <span class="text-lg transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </NuxtLink>
          </div>
          <div class="relative w-full h-[280px] hidden lg:block">
            <div class="absolute w-20 h-[200px] top-2.5 left-10 rounded-t-xl rounded-b-[20px] -rotate-[8deg] bg-gradient-to-br from-[#3a3530] to-[#252220] border border-white/5"></div>
            <div class="absolute w-[120px] h-4.5 top-20 left-2.5 rounded-md -rotate-[8deg] bg-[#4a3828] border border-white/5"></div>
            <div class="absolute w-[60px] h-[60px] top-[60px] right-[30px] rounded-full bg-[#2e2a26] border border-white/5"></div>
            <div class="absolute w-[140px] h-[22px] bottom-[60px] left-[30px] rounded-t-sm rounded-b-[14px] bg-gradient-to-br from-[#3a3530] to-[#252220] border border-white/5"></div>
            <div class="absolute w-10 h-10 bottom-10 right-[60px] rounded-full bg-gradient-to-br from-[#4a3520] to-[#2a1e14] border border-white/5"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- BEST SELLERS -->
    <section class="py-20 lg:py-28 bg-white">
      <div class="container mx-auto px-8">
        <div class="text-center mb-12">
          <h2 class="text-[28px] lg:text-[38px] font-display font-semibold mb-2.5 text-text">The Best Sellers</h2>
          <p class="text-text-2 text-[14.5px] max-w-[480px] mx-auto">
            The most trusted tools by our community of 15,000+ baristas.
            Essential for every serious espresso setup.
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5" v-if="products.length">
          <ProductCard
            v-for="p in products"
            :key="p.id"
            :product="p"
            @add-to-cart="addToCartNow(p.id)"
            class="group"
          />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5" v-else>
          <div v-for="i in 4" :key="i" class="h-[340px] bg-surface-2 rounded-lg skeleton"></div>
        </div>
        <div class="text-center mt-10">
          <NuxtLink to="/shop" class="btn btn-outline">View All Products</NuxtLink>
        </div>
      </div>
    </section>

    <!-- REVIEWS -->
    <section class="py-20 lg:py-28 bg-surface-2">
      <div class="container mx-auto px-8">
        <div class="relative">
          <div class="flex justify-between items-end mb-10">
            <h2 class="text-2xl lg:text-[32px] font-display font-medium text-text">Consumer Voices</h2>
            <div class="flex gap-3">
                <button @click="scrollReviews('left')" class="w-11 h-11 rounded-full border border-border bg-surface text-text flex items-center justify-center hover:bg-text hover:text-white hover:border-text transition-all duration-200">
                  <Icon name="solar:arrow-left-broken" width="20" height="20" />
                </button>
                <button @click="scrollReviews('right')" class="w-11 h-11 rounded-full border border-border bg-surface text-text flex items-center justify-center hover:bg-text hover:text-white hover:border-text transition-all duration-200">
                  <Icon name="solar:arrow-right-broken" width="20" height="20" />
                </button>
            </div>
          </div>
          <div ref="reviewsList" class="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-5 -mb-5">
            <div v-for="r in reviews" :key="r.id" class="flex-none w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start bg-surface rounded-lg p-6 lg:p-8 flex flex-col gap-3.5 min-h-[240px] shadow-sm">
              <div class="flex gap-[3px] text-sm text-[#ddd]">
                <div v-for="i in 5" :key="i" :class="['star', i <= r.rating ? 'text-[#c4a882]' : '']">★</div>
              </div>
              <p class="text-sm text-text-2 italic leading-[1.75] flex-1">"{{ r.body }}"</p>
              <div class="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                <div class="w-9 h-9 rounded-full bg-accent-light text-accent flex items-center justify-center text-sm font-bold shrink-0">
                  {{ r.reviewer_name[0] }}
                </div>
                <div class="min-w-0">
                  <div class="text-[13px] font-semibold text-text truncate">{{ r.reviewer_name }}</div>
                  <div class="text-[11.5px] text-text-3 truncate">{{ r.reviewer_title }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="py-20 lg:py-28 bg-[#121211] text-white">
      <div class="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
        <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div class="text-[11px] font-semibold tracking-[0.12em] uppercase text-accent mb-3">SUPPORT</div>
          <h2 class="text-[38px] lg:text-[56px] font-display font-semibold leading-[1.1] mb-6">Common<br class="hidden lg:block">Inquiries</h2>
          <p class="text-[15px] text-[#888] leading-[1.7] max-w-[320px] mb-10">
            Can’t find the answer you’re looking for? Reach out to our sommelier team for personalized assistance.
          </p>
          <NuxtLink to="/contact" class="group flex items-center gap-4 text-[11px] font-bold tracking-[0.15em] text-white no-underline">
              <div class="w-[52px] h-11 bg-[#e2b382] rounded-lg flex items-center justify-center text-[#121211] transition-all duration-200 group-hover:bg-[#f1bf8b] group-hover:-translate-y-0.5">
                <Icon name="solar:letter-broken" width="20" height="20" />
              </div>
            <span>CONTACT SUPPORT</span>
          </NuxtLink>
        </div>
        <div class="space-y-4">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="bg-[#1a1a19] rounded px-6 py-6 lg:px-8 cursor-pointer hover:bg-[#222221] transition-colors"
            @click="openFaq = openFaq === i ? null : i"
          >
            <div class="flex justify-between items-center">
              <span class="text-lg font-normal text-[#f7f5f2]">{{ faq.q }}</span>
              <Icon
                name="solar:alt-arrow-down-broken"
                class="text-accent transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] w-5 h-5"
                :class="{ 'rotate-180': openFaq === i }"
              />
            </div>
            <Transition
              enter-active-class="transition-all duration-300 ease-out overflow-hidden"
              leave-active-class="transition-all duration-300 ease-out overflow-hidden"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-[300px]"
              leave-from-class="opacity-100 max-h-[300px]"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="openFaq === i" class="pt-4 text-[15px] leading-[1.7] text-[#888]">
                <p>{{ faq.a }}</p>
              </div>
            </Transition>
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
  const cardWidth = reviewsList.value.querySelector('div')?.clientWidth || 400;
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
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  scrollbar-width: none;
}

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
