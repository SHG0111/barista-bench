<template>
  <div class="space-y-6">
    <!-- Stats Cards Row -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{{ stat.label }}</span>
          <button class="text-[10px] font-bold text-brand hover:underline">View More</button>
        </div>
        <p class="text-2xl font-bold text-slate-900">{{ stat.value }}</p>
        <p class="text-[10px] text-slate-500 mt-1">{{ stat.sublabel }}</p>
      </div>
    </div>

    <!-- Header Actions -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="relative flex-1 max-w-md group">
        <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" v-model="searchQuery" placeholder="Search inventory..." class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all" />
      </div>
      
      <button @click="showCsvModal = true" class="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-brand/90 transition-all">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Product
      </button>
      
      <!-- CSV Upload Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showCsvModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="closeCsvModal"></div>
            <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 z-10">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-text">Add Products via CSV</h3>
                <button @click="closeCsvModal" class="p-1 text-text-3 hover:text-text transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div class="space-y-4">
                <div class="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-brand transition-colors cursor-pointer" @click="csvFileInput?.click()" @dragover.prevent @drop.prevent="handleDrop">
                  <input ref="csvFileInput" type="file" accept=".csv" class="hidden" @change="handleFileSelect" />
                  <svg class="w-10 h-10 mx-auto text-text-3 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3" />
                  </svg>
                  <p class="text-sm font-semibold text-text mb-1">Drop CSV file here or click to browse</p>
                  <p class="text-xs text-text-3">Include `category` column with exact name from DB (e.g. Tampers, Portafilters)</p>
                </div>
                <div v-if="selectedFile" class="flex items-center gap-3 p-3 bg-surface-2 rounded-lg">
                  <svg class="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <span class="text-sm font-medium text-text truncate flex-1">{{ selectedFile.name }}</span>
                  <button @click="selectedFile = null" class="text-text-3 hover:text-text">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <div v-if="uploadError" class="p-3 bg-red-bg text-red text-sm rounded-lg">{{ uploadError }}</div>
                <div v-if="uploadSuccess" class="p-3 bg-green-bg text-green text-sm rounded-lg">{{ uploadSuccess }}</div>
              </div>
              <div class="flex gap-3 mt-6">
                <button @click="closeCsvModal" class="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold text-text-2 hover:bg-surface-2 transition-colors">Cancel</button>
                <button @click="uploadCsv" :disabled="!selectedFile || uploading" class="flex-1 px-4 py-2.5 bg-brand text-white rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors disabled:opacity-50">
                  {{ uploading ? 'Uploading...' : 'Upload' }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
      
      <!-- Delete Confirmation Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showDeleteModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="showDeleteModal = false"></div>
            <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 z-10">
              <div class="flex flex-col items-center text-center">
                <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                </div>
                <h3 class="text-lg font-bold text-text mb-2">Delete Product</h3>
                <p class="text-sm text-text-2 mb-6">Are you sure you want to delete <span class="font-semibold text-text">"{{ productToDelete?.name }}"</span>? This action cannot be undone.</p>
              </div>
              <div class="flex gap-3">
                <button @click="showDeleteModal = false" class="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold text-text-2 hover:bg-surface-2 transition-colors">Cancel</button>
                <button @click="deleteProduct" class="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors">Delete</button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
      
      <!-- Category Filter -->
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="filterCategory = cat.value"
          :class="[
            'px-4 py-2 rounded-lg text-xs font-semibold transition-all',
            filterCategory === cat.value 
              ? 'bg-brand text-white' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-brand hover:text-brand'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Product Table -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50">
              <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Product</th>
              <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</th>
              <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Price</th>
              <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Stock</th>
              <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="filteredProducts.length === 0">
              <td colspan="6" class="px-6 py-16 text-center">
                <div class="flex flex-col items-center gap-3">
                  <div class="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center">
                    <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p class="text-sm font-semibold text-slate-900">No products found</p>
                  <p class="text-xs text-slate-500 max-w-xs">
                    {{ searchQuery || filterCategory !== 'all' ? 'Try adjusting your search or filter to find what you\'re looking for.' : 'Start adding your products to manage inventory.' }}
                  </p>
                  <NuxtLink v-if="!searchQuery && filterCategory === 'all'" to="/admin/products-new" class="mt-1 flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg font-semibold text-xs hover:bg-brand/90 transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add First Product
                  </NuxtLink>
                </div>
              </td>
            </tr>
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                    <img :src="product.images?.[0] || 'https://placehold.co/100x100/e2e8f0/94a3b4?text=BB'" :alt="product.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-bold text-slate-900 truncate">{{ product.name }}</p>
                    <p class="text-[10px] font-mono text-slate-500 uppercase tracking-tight">{{ product.sku || 'NO-SKU' }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{{ product.category_name }}</span>
              </td>
              <td class="px-6 py-4 text-sm font-bold text-slate-900">${{ product.price }}</td>
              <td class="px-6 py-4">
                <div class="flex flex-col gap-1.5 w-24">
                  <div class="flex items-center justify-between text-[10px] font-bold">
                    <span :class="getStockTextColor(product.stock_count)">{{ product.stock_count }} units</span>
                  </div>
                  <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-500" :style="{ width: (product.stock_count / 200) * 100 + '%', backgroundColor: getStockColor(product.stock_count) }"></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="['px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider', product.in_stock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700']">
                  {{ product.in_stock ? 'In Stock' : 'Out' }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <button class="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all relative group/edit">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#001B22] text-white text-[10px] font-semibold rounded whitespace-nowrap opacity-0 invisible group-hover/edit:opacity-100 group-hover/edit:visible transition-all pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-t-[#001B22] after:border-x-transparent after:border-b-transparent">Edit</span>
                  </button>
                  <button @click="confirmDelete(product)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-all relative group/del">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#001B22] text-white text-[10px] font-semibold rounded whitespace-nowrap opacity-0 invisible group-hover/del:opacity-100 group-hover/del:visible transition-all pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-t-[#001B22] after:border-x-transparent after:border-b-transparent">Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
        <p class="text-xs text-slate-500">Showing {{ filteredProducts.length }} of {{ allProducts.length }} products</p>
        <div class="flex gap-2">
          <button class="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-brand hover:text-brand transition-all">
            Previous
          </button>
          <button class="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-brand hover:text-brand transition-all">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const client = useSupabaseClient()
const searchQuery = ref('')
const filterCategory = ref('all')
const showCsvModal = ref(false)
const selectedFile = ref(null)
const csvFileInput = ref(null)
const uploading = ref(false)
const uploadError = ref('')
const uploadSuccess = ref('')
const showDeleteModal = ref(false)
const productToDelete = ref(null)

const confirmDelete = (product) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const deleteProduct = async () => {
  if (!productToDelete.value) return
  
  try {
    await $fetch(`/api/admin/products/${productToDelete.value.id}`, { method: 'DELETE' })
    showDeleteModal.value = false
    productToDelete.value = null
    await refresh()
  } catch (err) {
    console.error('Delete error:', err)
  }
}

const categories = [
  { value: 'all', label: 'All' },
  { value: 'manual-grinders', label: 'Grinders' },
  { value: 'portafilters', label: 'Portafilters' },
  { value: 'tampers', label: 'Tampers' },
  { value: 'accessories', label: 'Accessories' },
]

const { data: products, refresh } = await useAsyncData('admin-products-list', async () => {
  const { data } = await client.from('products_with_category').select('*').order('created_at', { ascending: false })
  return data
})

const allProducts = computed(() => products.value || [])

const filteredProducts = computed(() => {
  let result = allProducts.value
  
  if (filterCategory.value !== 'all') {
    result = result.filter(p => p.category_slug === filterCategory.value)
  }
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.name?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q)
    )
  }
  
  return result
})

const stats = computed(() => {
  const productData = allProducts.value
  const totalProducts = productData.length
  const lowStock = productData.filter(p => p.stock_count < 10).length
  const outOfStock = productData.filter(p => p.stock_count === 0).length
  const totalValue = productData.reduce((sum, p) => sum + (parseFloat(p.price) * p.stock_count), 0)
  
  return [
    { label: 'Total Products', value: totalProducts, sublabel: 'In catalog' },
    { label: 'Total Value', value: `$${totalValue.toLocaleString()}`, sublabel: 'Inventory value' },
    { label: 'Low Stock', value: lowStock, sublabel: 'Need restock' },
    { label: 'Out of Stock', value: outOfStock, sublabel: 'Unavailable' }
  ]
})

const getStockColor = (count) => {
  if (count > 50) return '#10b981'
  if (count > 10) return '#f59e0b'
  return '#ef4444'
}

const getStockTextColor = (count) => {
  if (count > 50) return 'text-emerald-600'
  if (count > 10) return 'text-amber-600'
  return 'text-red-600'
}

const closeCsvModal = () => {
  showCsvModal.value = false
  selectedFile.value = null
  uploadError.value = ''
  uploadSuccess.value = ''
}

const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (file && file.type === 'text/csv') {
    selectedFile.value = file
    uploadError.value = ''
  } else {
    uploadError.value = 'Please select a valid CSV file'
  }
}

const handleDrop = (e) => {
  const file = e.dataTransfer.files[0]
  if (file && file.name.endsWith('.csv')) {
    selectedFile.value = file
    uploadError.value = ''
  } else {
    uploadError.value = 'Please select a valid CSV file'
  }
}

const uploadCsv = async () => {
  if (!selectedFile.value) return
  
  uploading.value = true
  uploadError.value = ''
  uploadSuccess.value = ''
  
  try {
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    
    const res = await $fetch('/api/admin/products/import', {
      method: 'POST',
      body: formData
    })
    
    if (res.success) {
      await refresh()
      if (res.count > 0) {
        uploadSuccess.value = `Successfully imported ${res.count} product${res.count === 1 ? '' : 's'}!`
        setTimeout(() => closeCsvModal(), 1500)
      }
      if (res.errors) {
        uploadError.value = res.errors.join('; ')
      }
    }
  } catch (err) {
    uploadError.value = err.data?.message || err.message || 'Failed to upload CSV'
    console.error('Upload error:', err)
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s ease;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(95%);
}
</style>