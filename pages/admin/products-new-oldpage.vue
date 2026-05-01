<template>
  <div class="p-8 max-w-6xl mx-auto w-full">
    <!-- Breadcrumb Header -->
    <div class="flex items-center gap-4 mb-2">
      <span class="text-sm text-stone-500">Inventory / Add New</span>
      <h2 class="text-lg font-bold tracking-tight text-amber-800">Add Barista Tool</h2>
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-10">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Product Details</h1>
        <p class="text-stone-600 mt-2">Configure specifications for new premium barista equipment.</p>
      </div>
      <div class="flex gap-4">
        <button class="px-6 py-2.5 rounded-lg border border-stone-200 text-slate-600 font-medium hover:bg-stone-50 transition-colors">Discard Draft</button>
        <button @click="handleSubmit" class="px-6 py-2.5 rounded-lg bg-amber-700 text-white font-semibold shadow-lg hover:brightness-110 transition-all">Publish Tool</button>
      </div>
    </div>

    <!-- Form Grid -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Main Info Card -->
      <div class="col-span-8 bg-white rounded-xl p-6 shadow-sm space-y-8">
        <div class="space-y-4">
          <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">Product Title</label>
          <input v-model="form.name" class="w-full bg-stone-100 rounded-lg p-4 text-xl font-semibold focus:ring-2 focus:ring-amber-800/20" placeholder="e.g., Precision Espresso Scale v2" type="text"/>
        </div>
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-4">
            <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">Category</label>
            <select v-model="form.category_id" class="w-full bg-stone-100 rounded-lg p-4 focus:ring-2 focus:ring-amber-800/20">
              <option value="">Select category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div class="space-y-4">
            <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">Brand / Manufacturer</label>
            <input v-model="form.brand" class="w-full bg-stone-100 rounded-lg p-4 focus:ring-2 focus:ring-amber-800/20" placeholder="Enter brand" type="text"/>
          </div>
        </div>
        <div class="space-y-4">
          <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">Description</label>
          <textarea v-model="form.description" class="w-full bg-stone-100 rounded-lg p-4 focus:ring-2 focus:ring-amber-800/20" placeholder="Highlight key features and craftsmanship..." rows="4"></textarea>
        </div>
      </div>

      <!-- Media Upload Card -->
      <div class="col-span-4 bg-white rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <label class="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4">Product Images</label>
        <input 
          ref="fileInput"
          type="file" 
          accept="image/*" 
          class="hidden" 
          @change="handleImageSelect"
        />
        <div 
          @click="fileInput?.click()"
          class="flex-1 border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center p-6 text-center space-y-4 hover:border-amber-800/30 transition-colors cursor-pointer"
        >
          <template v-if="!imagePreview">
            <div class="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-800">
              <Icon name="solar:upload-broken" class="w-10 h-10" />
            </div>
            <div>
              <p class="font-semibold text-slate-900">Upload high-res photos</p>
              <p class="text-xs text-stone-400 mt-1">Drag and drop or click to browse</p>
            </div>
          </template>
          <template v-else>
            <div class="relative w-32 h-32">
              <img :src="imagePreview" class="w-full h-full object-cover rounded-lg" />
              <button @click.stop="removeImage" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">✕</button>
            </div>
            <p class="text-xs text-stone-400">Click to change</p>
          </template>
        </div>
      </div>

      <!-- Technical Specifications Card -->
      <div class="col-span-12 bg-white rounded-xl p-6 shadow-sm">
        <div class="flex items-center gap-2 mb-6">
          <Icon name="solar:settings-broken" class="w-5 h-5 text-amber-700" />
          <h3 class="text-xl font-semibold text-slate-900">Technical Specifications</h3>
        </div>
        <div class="grid grid-cols-4 gap-6">
          <div class="space-y-4">
            <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">Material</label>
            <input v-model="form.material" class="w-full bg-stone-100 rounded-lg p-3 focus:ring-2 focus:ring-amber-800/20" placeholder="e.g. 304 Stainless Steel" type="text"/>
          </div>
          <div class="space-y-4">
            <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">Compatibility</label>
            <input v-model="form.compatibility" class="w-full bg-stone-100 rounded-lg p-3 focus:ring-2 focus:ring-amber-800/20" placeholder="e.g. 58mm Portafilters" type="text"/>
          </div>
          <div class="space-y-4">
            <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">Weight (g)</label>
            <div class="relative">
              <input v-model="form.weight" @input="form.weight = form.weight.replace(/[^0-9.]/g, '')" class="w-full bg-stone-100 rounded-lg p-3 focus:ring-2 focus:ring-amber-800/20" placeholder="450" type="text"/>
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">g</span>
            </div>
          </div>
          <div class="space-y-4">
            <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">Dimensions</label>
            <input v-model="form.dimensionsInput" @input="form.dimensionsInput = form.dimensionsInput.replace(/[^0-9xX ]/g, '')" class="w-full bg-stone-100 rounded-lg p-3 focus:ring-2 focus:ring-amber-800/20" placeholder="W x D x H" type="text"/>
          </div>
        </div>
      </div>

      <!-- Pricing & Inventory Card -->
      <div class="col-span-6 bg-white rounded-xl p-6 shadow-sm">
        <h3 class="text-xl font-semibold text-slate-900 mb-6">Pricing & Inventory</h3>
        <div class="space-y-8">
          <div class="grid grid-cols-2 gap-8">
            <div class="space-y-4">
              <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">MSRP</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 font-bold">$</span>
                <input v-model="form.price" class="w-full bg-stone-100 rounded-lg p-3 pl-8 focus:ring-2 focus:ring-amber-800/20 font-bold" placeholder="0.00" type="number" step="0.01"/>
              </div>
            </div>
            <div class="space-y-4">
              <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">Cost per Unit</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold">$</span>
                <input v-model="form.cost" class="w-full bg-stone-100 rounded-lg p-3 pl-8 focus:ring-2 focus:ring-amber-800/20" placeholder="0.00" type="number" step="0.01"/>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between p-4 bg-amber-50/30 rounded-lg border border-amber-800/10">
            <div>
              <p class="font-semibold text-amber-900">Track Stock Levels</p>
              <p class="text-xs text-amber-700/70">Automatic alerts when low</p>
            </div>
            <button @click="form.track_stock = !form.track_stock" class="w-12 h-6 bg-amber-800 rounded-full relative cursor-pointer shadow-inner">
              <div :class="['absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm', form.track_stock ? 'translate-x-6' : '']"></div>
            </button>
          </div>
        </div>
      </div>

      <!-- Logistics Card -->
      <div class="col-span-6 bg-white rounded-xl p-6 shadow-sm">
        <h3 class="text-xl font-semibold text-slate-900 mb-6">Logistics</h3>
        <div class="space-y-8">
          <div class="space-y-4">
            <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">Warehouse Location</label>
            <div class="flex items-center gap-3 p-3 bg-stone-100 rounded-lg">
              <Icon name="solar:map-point-broken" class="w-5 h-5 text-stone-400" />
              <span class="text-sm font-medium">Main Distribution Center - Portland</span>
              <Icon name="solar:alt-arrow-down-broken" class="w-5 h-5 text-stone-400 ml-auto" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-8">
            <div class="space-y-4">
              <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">Handling Time</label>
              <input v-model="form.handling_time" class="w-full bg-stone-100 rounded-lg p-3 focus:ring-2 focus:ring-amber-800/20" placeholder="1-2 Days" type="text"/>
            </div>
            <div class="space-y-4">
              <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">Fragile Item</label>
              <div class="flex items-center gap-3 h-full pt-3">
                <input v-model="form.fragile" class="w-5 h-5 rounded text-amber-800 focus:ring-amber-800/20 bg-stone-100" type="checkbox"/>
                <span class="text-sm">Requires reinforced packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Spacer -->
    <footer class="mt-auto h-20 flex items-center justify-center border-t border-stone-200/40 text-stone-400 text-xs uppercase tracking-widest font-semibold">
      © 2024 BrewTools Admin Ecosystem • Precision Equipment Portal
    </footer>
  </div>
</template>

<script setup> 
definePageMeta({ layout: 'admin', middleware: 'admin' })

const client = useSupabaseClient()
const router = useRouter()
const toast = useToast()

const fileInput = ref()
const selectedFile = ref()
const imagePreview = ref('')

const form = reactive({
  name: '',
  category_id: '',
  brand: '',
  description: '',
  material: '',
  compatibility: '',
  weight: '',
  dimensions: '',
  dimensionsInput: '',
  price: '',
  cost: '',
  track_stock: true,
  handling_time: '',
  fragile: false
})

const { data: categories } = await useAsyncData('admin-categories', async () => {
  const { data } = await client.from('categories').select('*').order('sort_order')
  return data
})

function generateSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function handleImageSelect(event) {
  const file = event.target.files[0]
  if (!file) return
  
  if (!file.type.startsWith('image/')) {
    toast.error('Please select an image file')
    return
  }
  
  selectedFile.value = file
  imagePreview.value = URL.createObjectURL(file)
}

function removeImage() {
  selectedFile.value = null
  imagePreview.value = ''
}
async function handleSubmit() {
  if (!form.name) { 
    toast.error('Product title is required')
    return 
  }
  
  const slug = generateSlug(form.name) + '-' + Date.now()
  
  const specs = {}
  if (form.material) specs.material = form.material
  if (form.compatibility) specs.compatibility = form.compatibility
  if (form.weight) specs.weight = parseFloat(form.weight)
  if (form.dimensionsInput) specs.dimensions = form.dimensionsInput
    // Skip image upload for now - will add later when storage is configured
  const imageUrl = null

  if (selectedFile.value && !selectedFile.value.type.startsWith('image/')) {
    toast.error('Please select an image file')
    return
  }
  
  if (selectedFile.value) {
    console.log('File selected:', selectedFile.value.name, selectedFile.value.type)
  }
  

  
  const { error: insertError } = await client.from('products').insert({
    name: form.name,
    slug: slug,
    category_id: form.category_id || null,
    price: parseFloat(form.price) || 0,
    compare_price: form.cost ? parseFloat(form.cost) : null,
    description: form.description || null,
    tagline: form.brand || null,
    specs: specs,
    stock_count: form.track_stock ? 100 : 0,
    in_stock: form.track_stock,
    series: form.handling_time || null,
    materials: form.material ? [form.material] : [],
    is_featured: false,
    is_bestseller: false,
    rating: 0,
    review_count: 0
  })
  
  if (insertError) {
    console.error('Insert error:', insertError)
    toast.error('Error creating product: ' + insertError.message)
    return
  }
  
  toast.success('Product created successfully!')
  router.push('/admin/products')
}
</script>
