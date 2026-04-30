<template>
  <div class="bg-white border border-border rounded-3xl shadow-sm overflow-hidden">
    <!-- Table Controls -->
    <div v-if="$slots.controls" class="px-4 sm:px-8 py-4 sm:py-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <slot name="controls" />
    </div>

    <!-- Mobile Cards -->
    <div v-if="paginatedItems.length > 0" class="md:hidden divide-y divide-border/50">
      <div v-for="(item, index) in paginatedItems" :key="index" class="p-4">
        <slot name="mobile-card" :item="item" :index="index" />
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="hidden md:block">
      <table class="w-full text-left">
        <thead v-if="headers">
          <tr class="bg-surface-2/50">
            <th v-for="header in headers" :key="header.key" class="px-8 py-4 text-[11px] font-extrabold text-text-3 uppercase tracking-widest whitespace-nowrap" :class="{ 'text-right': header.align === 'right' }">
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border/50">
          <tr v-if="loading" class="animate-pulse">
            <td v-for="(header, n) in headers" :key="n" class="px-8 py-5">
              <div class="h-4 bg-surface-2 rounded-lg w-full"></div>
            </td>
          </tr>
          <tr v-else-if="items.length === 0">
            <td :colspan="headers?.length || 1" class="px-8 py-12 text-center text-text-3 font-medium text-sm">
              <slot name="empty">No results found.</slot>
            </td>
          </tr>
          <slot v-else name="default" :items="paginatedItems" />
        </tbody>
      </table>
    </div>

    <!-- Empty State (shared) -->
    <div v-if="!loading && items.length === 0" class="hidden md:block">
    </div>

    <!-- Pagination -->
    <div v-if="pagination" class="px-4 sm:px-8 py-4 sm:py-5 bg-surface-2/50 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex gap-2">
        <button @click="currentPage > 1 && currentPage--" :disabled="currentPage === 1" class="p-2 border border-border rounded-xl bg-white text-text-3 disabled:opacity-30 transition-all hover:bg-surface-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="['w-10 h-10 rounded-xl text-sm font-bold transition-all', currentPage === page ? 'bg-accent text-white shadow-md shadow-accent/20' : 'bg-white border border-border text-text-2 hover:bg-surface-2']">{{ page }}</button>
        <button @click="currentPage < totalPages && currentPage++" :disabled="currentPage === totalPages" class="p-2 border border-border rounded-xl bg-white text-text-3 disabled:opacity-30 transition-all hover:bg-surface-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <span class="text-xs text-text-3 font-bold uppercase tracking-tight">Items per page</span>
          <select v-model.number="itemsPerPage" class="bg-white border border-border rounded-xl text-xs font-bold py-1.5 px-3 focus:ring-2 focus:ring-accent/20 focus:border-accent/50 outline-none">
            <option v-for="opt in pagination?.options || [10, 25, 50]" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  headers: {
    type: Array,
    default: null
  },
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Object,
    default: null
  },
  initialPage: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:page', 'update:itemsPerPage'])

const currentPage = ref(props.initialPage)
const itemsPerPage = ref(props.pagination?.default || 10)

const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage.value))

const paginatedItems = computed(() => {
  if (!props.pagination) return props.items
  const start = (currentPage.value - 1) * itemsPerPage.value
  return props.items.slice(start, start + itemsPerPage.value)
})

const paginationStart = computed(() => props.items.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1)
const paginationEnd = computed(() => Math.min(currentPage.value * itemsPerPage.value, props.items.length))

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 3; i++) pages.push(i)
    } else if (current >= total - 2) {
      for (let i = total - 2; i <= total; i++) pages.push(i)
    } else {
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
    }
  }
  return pages
})

const goToPage = (page) => {
  currentPage.value = page
  emit('update:page', page)
}

watch(() => props.initialPage, (val) => {
  currentPage.value = val
})

watch(itemsPerPage, () => {
  currentPage.value = 1
  emit('update:itemsPerPage', itemsPerPage.value)
})

defineExpose({
  currentPage,
  itemsPerPage,
  paginatedItems,
  paginationStart,
  paginationEnd
})
</script>
