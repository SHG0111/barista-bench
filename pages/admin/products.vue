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

    <!-- Admin Table -->
    <AdminTable :headers="tableHeaders" :items="filteredProducts" :loading="loadingData" :pagination="{ default: 10, options: [5, 10, 25, 50] }">
      <!-- Controls Slot -->
      <template #controls>
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
          <div class="relative flex-1 max-w-md group">
            <Icon name="solar:magnifer-broken" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" />
            <input type="text" v-model="searchQuery" placeholder="Search inventory..." class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all" />
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <button
                v-for="cat in primaryCategories"
                :key="cat.value"
                @click="filterCategory = cat.value"
                :class="[
                  'px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap',
                  filterCategory === cat.value 
                    ? 'bg-brand text-white' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-brand hover:text-brand'
                ]"
              >
                {{ cat.label }}
              </button>

              <!-- More Categories Dropdown -->
              <div ref="moreCatsDropdown" class="relative">
                <button @click="showMoreCats = !showMoreCats" :class="['p-2 rounded-lg text-xs font-semibold transition-all border', hasMoreActive ? 'bg-brand text-white border-brand' : 'bg-white text-slate-600 border-slate-200 hover:border-brand hover:text-brand']">
                  <Icon name="solar:menu-dots-broken" class="w-4 h-4" />
                </button>
                <div v-if="showMoreCats" class="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <button
                    v-for="cat in secondaryCategories"
                    :key="cat.value"
                    @click="filterCategory = cat.value; showMoreCats = false"
                    :class="[
                      'w-full text-left px-3 py-2 text-xs font-semibold transition-colors',
                      filterCategory === cat.value 
                        ? 'bg-brand text-white' 
                        : 'text-slate-600 hover:bg-slate-50'
                    ]"
                  >
                    {{ cat.label }}
                  </button>
                </div>
              </div>
            </div>

            <button @click="showCsvModal = true" class="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-brand/90 transition-all whitespace-nowrap">
              <Icon name="solar:add-square-broken" class="w-4 h-4" />
              New Product
            </button>
          </div>
        </div>
      </template>

      <!-- Empty Slot -->
      <template #empty>
        <div class="flex flex-col items-center gap-3 px-6 py-16">
          <div class="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center">
            <Icon name="solar:box-broken" class="w-8 h-8 text-slate-300" />
          </div>
          <p class="text-sm font-semibold text-slate-900">No products found</p>
          <p class="text-xs text-slate-500 max-w-xs">
            {{ searchQuery || filterCategory !== 'all' ? 'Try adjusting your search or filter to find what you\'re looking for.' : 'Start adding your products to manage inventory.' }}
          </p>
          <NuxtLink v-if="!searchQuery && filterCategory === 'all'" to="/admin/products-new" class="mt-1 flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg font-semibold text-xs hover:bg-brand/90 transition-all">
            <Icon name="solar:add-square-broken" class="w-4 h-4" />
            Add First Product
          </NuxtLink>
        </div>
      </template>

      <!-- Mobile Card Slot -->
      <template #mobile-card="{ item }">
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="relative flex-shrink-0">
              <div class="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                <div v-if="coverImages[item.id] || item.images?.[0]" class="relative w-full h-full">
                  <div v-if="thumbLoading[item.id]" class="absolute inset-0 bg-slate-100 flex items-center justify-center z-10">
                    <svg class="animate-spin w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <NuxtImg :src="coverImages[item.id] || item.images[0]" :alt="item.name" class="w-full h-full object-cover" width="56" height="56" format="webp" loading="lazy" @load="thumbLoading[item.id] = false" />
                </div>
                <template v-else>
                  <div class="w-full h-full flex items-center justify-center text-slate-300">
                    <Icon name="solar:gallery-broken" class="w-5 h-5" />
                  </div>
                </template>
              </div>
            </div>
             <div class="min-w-0 flex-1" v-if="editingProductId !== item.id">
               <p class="text-sm font-bold text-slate-900 truncate">{{ item.name }}</p>
               <p class="text-[10px] font-mono text-slate-500 uppercase">{{ item.sku || 'NO-SKU' }}</p>
             </div>
             <div class="min-w-0 flex-1 space-y-2" v-else>
               <input v-model="editForm.name" class="w-full px-2 py-1 text-sm border border-brand rounded-md focus:outline-none focus:ring-2 focus:ring-brand/20" placeholder="Product name" />
             </div>
           </div>
           <div class="flex items-center gap-3" v-if="editingProductId !== item.id">
             <span class="text-xs font-bold px-2 py-1 rounded-md" :style="getCategoryBadgeStyle(item.category_slug)">{{ item.category_name }}</span>
             <span class="text-sm font-bold text-slate-900">${{ item.price }}</span>
           </div>
           <div class="flex items-center gap-3" v-else>
              <select v-model="editForm.category_slug" class="px-2 py-1 text-xs border border-brand rounded-md focus:outline-none focus:ring-2 focus:ring-brand/20">
                <option value="" disabled>Select a category</option>
                <option v-for="cat in categories.filter(c => c.value !== 'all')" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
              </select>
             <input v-model="editForm.price" type="number" step="0.01" class="w-24 px-2 py-1 text-sm border border-brand rounded-md focus:outline-none focus:ring-2 focus:ring-brand/20" placeholder="0.00" />
           </div>
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-1.5 w-24">
              <div class="flex items-center justify-between text-[10px] font-bold">
                <span :class="getStockTextColor(item.stock_count)">{{ item.stock_count }} units</span>
              </div>
              <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-500" :style="{ width: (item.stock_count / 200) * 100 + '%', backgroundColor: getStockColor(item.stock_count) }"></div>
              </div>
            </div>
            <span :class="['px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider', item.in_stock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700']">
              {{ item.in_stock ? 'In Stock' : 'Out' }}
            </span>
          </div>
           <div class="flex gap-2 pt-2 border-t border-slate-100" v-if="editingProductId !== item.id">
             <button @click="toggleImageUpload(item.id)" class="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
               <Icon name="solar:gallery-broken" class="w-3.5 h-3.5" />
               Images
             </button>
             <button @click="startEdit(item)" class="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-brand bg-brand/5 rounded-lg hover:bg-brand/10 transition-colors">
               <Icon name="solar:pen-broken" class="w-3.5 h-3.5" />
               Edit
             </button>
             <button @click="confirmDelete(item)" class="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
               <Icon name="solar:trash-bin-minimalistic-broken" class="w-3.5 h-3.5" />
               Delete
             </button>
           </div>
           <div class="flex gap-2 pt-2 border-t border-slate-100" v-else>
             <button @click="saveEdit(item)" :disabled="saving" class="flex-1 px-3 py-2 text-xs font-bold text-white bg-brand rounded-lg hover:bg-brand/90 transition-all disabled:opacity-50">
               {{ saving ? 'Saving...' : 'Save' }}
             </button>
             <button @click="cancelEdit" class="flex-1 px-3 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all">
               Cancel
             </button>
           </div>

          <!-- Inline Image Upload Area (Mobile) -->
          <div v-if="expandedProduct === item.id" class="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Product Images</h4>
              <button @click="toggleImageUpload(item.id)" class="text-slate-400">
                 <Icon name="solar:close-circle-broken" class="w-4 h-4" />
               </button>
            </div>
            <div v-if="item.images?.length" class="mb-2">
              <div class="flex flex-wrap gap-1.5">
                <div v-for="(img, idx) in item.images" :key="idx" class="relative w-12 h-12 rounded-md overflow-hidden border-2 cursor-pointer" :class="img === (coverImages[item.id] || item.images?.[0]) ? 'border-brand' : 'border-slate-200'" @click="setAsCover(item, img)">
                  <NuxtImg :src="img" class="w-full h-full object-cover" width="48" height="48" format="webp" loading="lazy" />
                  <button @click.stop="removeImage(item, idx)" class="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
                    <Icon name="solar:close-circle-broken" class="w-2 h-2" />
                  </button>
                  <span v-if="img === (coverImages[item.id] || item.images?.[0])" class="absolute bottom-0 left-0 right-0 bg-brand/90 text-white text-[6px] font-bold text-center py-px">Cover</span>
                </div>
              </div>
            </div>
            <div v-if="(item.images?.length || 0) < 4" class="border-2 border-dashed border-slate-300 rounded-lg p-3 text-center hover:border-brand transition-colors cursor-pointer" @click="getImageInput(item.id)?.click()" @dragover.prevent @drop.prevent="handleImageDrop($event, item)">
              <input :ref="el => setImageInputRef(item.id, el)" type="file" accept="image/*" multiple class="hidden" @change="handleImageSelect($event, item)" />
                   <Icon name="solar:upload-broken" class="w-5 h-5 mx-auto text-slate-300 mb-1" />
              <p class="text-[10px] font-semibold text-slate-500">Tap to upload</p>
              <p class="text-[8px] text-slate-400">PNG, JPG, WEBP up to 5MB. Max 4 images.</p>
            </div>
            <div v-if="imageErrors[item.id]?.length" class="mt-2 space-y-1">
              <div v-for="(err, idx) in imageErrors[item.id]" :key="idx" class="text-[9px] text-red-600 bg-red-50 px-2 py-0.5 rounded">{{ err }}</div>
            </div>
            <div v-if="uploadingImages[item.id]" class="mt-2 flex items-center gap-2">
              <div class="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div class="h-full bg-brand rounded-full transition-all duration-300" :style="{ width: uploadProgress[item.id] + '%' }"></div>
              </div>
              <span class="text-[8px] font-bold text-slate-500">{{ uploadProgress[item.id] }}%</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Default Row Slot -->
      <template #default="{ items }">
        <tr v-for="product in items" :key="product.id" class="hover:bg-slate-50/50 transition-colors group">
          <td class="px-8 py-5">
            <div class="flex items-center gap-4 ">
              <div class="relative flex-shrink-0 group/thumb">
                <div class="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 cursor-pointer relative" @click="toggleImageUpload(product.id)">
                  <div v-if="coverImages[product.id] || product.images?.[0]" class="relative w-full h-full">
                    <div v-if="thumbLoading[product.id]" class="absolute inset-0 bg-slate-100 flex items-center justify-center z-10">
                      <svg class="animate-spin w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <NuxtImg
                      :src="coverImages[product.id] || product.images[0]"
                      :alt="product.name"
                      class="w-full h-full object-cover"
                      width="48"
                      height="48"
                      format="webp"
                      loading="lazy"
                      decoding="async"
                      @load="thumbLoading[product.id] = false"
                    />
                  </div>
                  <template v-else>
                    <div class="w-full h-full flex items-center justify-center text-slate-300">
                  <Icon name="solar:gallery-broken" class="w-5 h-5" />
                    </div>
                  </template>
                </div>
                <div class="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover/thumb:opacity-100 transition-opacity pointer-events-none"></div>
                <button @click="toggleImageUpload(product.id)" class="absolute inset-0 m-auto w-7 h-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-all hover:bg-white hover:scale-105">
                  <svg class="w-4 h-4 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" /></svg>
                  <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] font-semibold rounded whitespace-nowrap opacity-0 invisible group-hover/thumb:opacity-100 group-hover/thumb:visible transition-all pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[4px] after:border-t-slate-900 after:border-x-transparent after:border-b-transparent">Manage Images</span>
                </button>
              </div>
              <div class="min-w-0 flex-1" v-if="editingProductId !== product.id">
                <p class="text-sm font-bold text-slate-900 truncate">{{ product.name }}</p>
                <p class="text-[10px] font-mono text-slate-500 uppercase tracking-tight">{{ product.sku || 'NO-SKU' }}</p>
                <div v-if="product.images?.length > 1" class="text-[10px] text-slate-400 mt-0.5">{{ product.images.length }}/4 images</div>
              </div>
              <div class="min-w-0 flex-1 space-y-2" v-else>
                <input v-model="editForm.name" class="w-full px-2 py-1 text-sm border border-brand rounded-md focus:outline-none focus:ring-2 focus:ring-brand/20" placeholder="Product name" />
              </div>
            </div>

            <!-- Inline Image Upload Area -->
            <div v-if="expandedProduct === product.id" class="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Product Images</h4>
               <button @click="toggleImageUpload(product.id)" class="text-slate-400 hover:text-slate-600">
                <Icon name="solar:close-circle-broken" class="w-4 h-4" />
              </button>
              </div>

              <!-- Existing Images Preview Grid -->
              <div v-if="product.images?.length" class="mb-3">
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(img, idx) in product.images"
                    :key="idx"
                    class="relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer group/img"
                    :class="img === (coverImages[product.id] || product.images?.[0]) ? 'border-brand' : 'border-slate-200 hover:border-slate-300'"
                    @click="setAsCover(product, img)"
                  >
                    <div class="relative w-full h-full">
                      <div v-if="imageLoading[img]" class="absolute inset-0 bg-slate-100 flex items-center justify-center z-10">
                        <svg class="animate-spin w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                      <NuxtImg
                        :src="img"
                        :alt="`${product.name} - ${idx + 1}`"
                        class="w-full h-full object-cover"
                        width="64"
                        height="64"
                        format="webp"
                        loading="lazy"
                        decoding="async"
                        @load="imageLoading[img] = false"
                      />
                    </div>
                    <button @click.stop="removeImage(product, idx)" class="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity shadow-sm z-10 hover:bg-red-600">
                      <Icon name="solar:close-circle-broken" class="w-2.5 h-2.5" />
                      <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 bg-slate-900 text-white text-[8px] font-semibold rounded whitespace-nowrap opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">Delete</span>
                    </button>
                    <span v-if="img === (coverImages[product.id] || product.images?.[0])" class="absolute bottom-0 left-0 right-0 bg-brand/90 text-white text-[7px] font-bold text-center py-0.5">Cover</span>
                    <div v-else class="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center">
                      <span class="text-white text-[7px] font-semibold opacity-0 group-hover/img:opacity-100 transition-opacity">Make Cover</span>
                    </div>
                  </div>
                </div>
                <p class="text-[10px] text-slate-400 mt-2">Click an image to set as cover.</p>
              </div>

              <!-- Upload Drop Zone -->
              <div
                v-if="(product.images?.length || 0) < 4"
                class="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-brand transition-colors cursor-pointer"
                :class="{ 'border-brand bg-brand/5': isDragging === product.id }"
                @click="getImageInput(product.id)?.click()"
                @dragover.prevent="isDragging = product.id"
                @dragleave="isDragging = null"
                @drop.prevent="handleImageDrop($event, product)"
              >
                <input :ref="el => setImageInputRef(product.id, el)" type="file" accept="image/*" multiple class="hidden" @change="handleImageSelect($event, product)" />
                 <Icon name="solar:upload-broken" class="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p class="text-xs font-semibold text-slate-600">Drop images here or click to upload</p>
                <p class="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP up to 5MB each. Max 4 images.</p>
              </div>
              <div v-else class="border-2 border-dashed border-slate-200 rounded-lg p-3 text-center bg-slate-50">
                 <Icon name="solar:check-circle-broken" class="w-6 h-6 mx-auto text-brand mb-1" />
                <p class="text-xs font-semibold text-brand">Maximum 4 images reached</p>
                <p class="text-[10px] text-slate-400 mt-0.5">Delete an image to upload a new one</p>
              </div>

              <!-- Upload Validation Errors -->
              <div v-if="imageErrors[product.id]?.length" class="mt-3 space-y-1">
                <div v-for="(err, idx) in imageErrors[product.id]" :key="idx" class="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded">{{ err }}</div>
              </div>

              <!-- Upload Progress -->
              <div v-if="uploadingImages[product.id]" class="mt-3 flex items-center gap-2">
                <div class="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full bg-brand rounded-full transition-all duration-300" :style="{ width: uploadProgress[product.id] + '%' }"></div>
                </div>
                <span class="text-[10px] font-bold text-slate-500">{{ uploadProgress[product.id] }}%</span>
              </div>
            </div>
          </td>
          <td class="px-8 py-5" v-if="editingProductId !== product.id">
            <span class="text-xs font-bold px-2 py-1 rounded-md" :style="getCategoryBadgeStyle(product.category_slug)">{{ product.category_name }}</span>
          </td>
            <td class="px-8 py-5" v-else>
              <select v-model="editForm.category_slug" class="w-full px-2 py-1 text-xs border border-brand rounded-md focus:outline-none focus:ring-2 focus:ring-brand/20">
                <option value="" disabled>Select a category</option>
                <option v-for="cat in categories.filter(c => c.value !== 'all')" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
              </select>
            </td>
          <td class="px-8 py-5 text-sm font-bold text-slate-900" v-if="editingProductId !== product.id">${{ product.price }}</td>
          <td class="px-8 py-5" v-else>
            <input v-model="editForm.price" type="number" step="0.01" class="w-full px-2 py-1 text-sm border border-brand rounded-md focus:outline-none focus:ring-2 focus:ring-brand/20" placeholder="0.00" />
          </td>
          <td class="px-8 py-5">
            <div class="flex flex-col gap-1.5 w-24">
              <div class="flex items-center justify-between text-[10px] font-bold">
                <span :class="getStockTextColor(product.stock_count)">{{ product.stock_count }} units</span>
              </div>
              <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-500" :style="{ width: (product.stock_count / 200) * 100 + '%', backgroundColor: getStockColor(product.stock_count) }"></div>
              </div>
            </div>
          </td>
          <td class="px-8 py-5">
            <span :class="['whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider', product.in_stock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700']">
              {{ product.in_stock ? 'In Stock' : 'Out' }}
            </span>
          </td>
          <td class="px-8 py-5 text-right">
            <div class="flex justify-end gap-2" v-if="editingProductId !== product.id">
              <button @click="startEdit(product)" class="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all relative group/edit">
                <Icon name="solar:pen-broken" class="w-4 h-4" />
                <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#001B22] text-white text-[10px] font-semibold rounded whitespace-nowrap opacity-0 invisible group-hover/edit:opacity-100 group-hover/edit:visible transition-all pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-t-[#001B22] after:border-x-transparent after:border-b-transparent">Edit</span>
              </button>
              <button @click="confirmDelete(product)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-all relative group/del">
                <Icon name="solar:trash-bin-minimalistic-broken" class="w-4 h-4" />
                <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#001B22] text-white text-[10px] font-semibold rounded whitespace-nowrap opacity-0 invisible group-hover/del:opacity-100 group-hover/del:visible transition-all pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-t-[#001B22] after:border-x-transparent after:border-b-transparent">Delete</span>
              </button>
            </div>
            <div class="flex justify-end gap-2" v-else>
              <button @click="saveEdit(product)" :disabled="saving" class="px-3 py-1.5 text-xs font-bold text-white bg-brand rounded-lg hover:bg-brand/90 transition-all disabled:opacity-50">
                {{ saving ? 'Saving...' : 'Save' }}
              </button>
              <button @click="cancelEdit" class="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all">
                Cancel
              </button>
            </div>
          </td>
        </tr>
      </template>
    </AdminTable>

    <!-- CSV Upload Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showCsvModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="closeCsvModal"></div>
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 z-10">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-text">Add Products via CSV</h3>
              <button @click="closeCsvModal" class="p-1 text-text-3 hover:text-text transition-colors">
                <Icon name="solar:close-circle-broken" class="w-5 h-5" />
              </button>
            </div>
            <div class="space-y-4">
              <div class="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-brand transition-colors cursor-pointer" @click="csvFileInput?.click()" @dragover.prevent @drop.prevent="handleDrop">
                <input ref="csvFileInput" type="file" accept=".csv" class="hidden" @change="handleFileSelect" />
                <Icon name="solar:upload-broken" class="w-10 h-10 mx-auto text-text-3 mb-3" />
                <p class="text-sm font-semibold text-text mb-1">Drop CSV file here or click to browse</p>
                <p class="text-xs text-text-3">Include `category` column with exact name from DB (e.g. Tampers, Portafilters)</p>
              </div>
              <div v-if="selectedFile" class="flex items-center gap-3 p-3 bg-surface-2 rounded-lg">
                <Icon name="solar:file-bold-broken" class="w-5 h-5 text-brand" />
                <span class="text-sm font-medium text-text truncate flex-1">{{ selectedFile.name }}</span>
                <button @click="selectedFile = null" class="text-text-3 hover:text-text">
                  <Icon name="solar:close-circle-broken" class="w-4 h-4" />
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
                <Icon name="solar:danger-broken" class="w-6 h-6 text-red-600" />
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
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { nextTick } from 'vue'

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
const expandedProduct = ref(null)
const isDragging = ref(null)
const imageInputRefs = ref({})
const imageErrors = ref({})
const uploadingImages = ref({})
const uploadProgress = ref({})
const coverImages = ref({})
const imageLoading = ref({})
const thumbLoading = ref({})
const editingProductId = ref(null)
const editForm = ref({ name: '', price: '', category_slug: '' })
const saving = ref(false)

const tableHeaders = [
  { key: 'product', label: 'Product' },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions', align: 'right' },
]

const toggleImageUpload = (productId) => {
  expandedProduct.value = expandedProduct.value === productId ? null : productId
  if (expandedProduct.value) {
    imageErrors.value[productId] = []
    const product = allProducts.value.find(p => p.id === productId)
    if (product?.images?.length) {
      for (const img of product.images) {
        if (!imageLoading.value[img]) {
          imageLoading.value[img] = true
        }
      }
    }
  }
}

const setImageInputRef = (productId, el) => {
  if (el) {
    imageInputRefs.value[productId] = el
  }
}

const getImageInput = (productId) => {
  return imageInputRefs.value[productId]
}

const handleImageSelect = (event, product) => {
  const files = Array.from(event.target.files)
  processFiles(files, product)
  event.target.value = ''
}

const handleImageDrop = (event, product) => {
  isDragging.value = null
  const files = Array.from(event.dataTransfer.files)
  processFiles(files, product)
}

const extractStoragePath = (url) => {
  const prefix = `/storage/v1/object/public/products/`
  const idx = url.indexOf(prefix)
  if (idx === -1) return null
  return url.substring(idx + prefix.length)
}

const processFiles = async (files, product) => {
  const errors = []
  const validFiles = []
  const maxSize = 5 * 1024 * 1024
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
  const maxImages = 4
  const currentCount = product.images?.length || 0
  const slotsLeft = maxImages - currentCount

  if (slotsLeft <= 0) {
    imageErrors.value[product.id] = ['Maximum 4 images reached. Delete one to upload a new image.']
    return
  }

  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      errors.push(`"${file.name}" is not a supported image format`)
    } else if (file.size > maxSize) {
      errors.push(`"${file.name}" exceeds 5MB limit`)
    } else if (validFiles.length >= slotsLeft) {
      errors.push(`"${file.name}" exceeds the limit of ${maxImages} images. ${slotsLeft} slot(s) remaining.`)
    } else {
      validFiles.push(file)
    }
  }

  imageErrors.value[product.id] = errors

  if (validFiles.length === 0) return

  uploadingImages.value[product.id] = true
  uploadProgress.value[product.id] = 0

  const currentImages = product.images ? [...product.images] : []
  let completed = 0

  for (const file of validFiles) {
    try {
      const fileExt = file.name.split('.').pop().toLowerCase()
      const categoryFolder = product.category_slug || 'uncategorized'
      const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '-').substring(0, 40)
      const fileName = `${categoryFolder}/${product.id}/${baseName}.${fileExt}`

      const { error: uploadError } = await client.storage
        .from('products')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        errors.push(`Failed to upload "${file.name}": ${uploadError.message}`)
      } else {
        const { data: { publicUrl } } = client.storage
          .from('products')
          .getPublicUrl(fileName)

        if (!currentImages.includes(publicUrl)) {
          currentImages.push(publicUrl)
          imageLoading.value[publicUrl] = true
        }
      }
    } catch (err) {
      errors.push(`Failed to upload "${file.name}": ${err.message}`)
    }

    completed++
    uploadProgress.value[product.id] = Math.round((completed / validFiles.length) * 100)
  }

  if (currentImages.length !== (product.images?.length || 0)) {
    const { error: updateError } = await client
      .from('products')
      .update({ images: currentImages })
      .eq('id', product.id)

    if (updateError) {
      errors.push('Failed to update product images')
    } else {
      product.images = currentImages
      if (!thumbLoading.value[product.id]) {
        thumbLoading.value[product.id] = true
      }
      if (errors.length === 0) {
        imageErrors.value[product.id] = []
      }
    }
  }

  uploadingImages.value[product.id] = false
  imageErrors.value[product.id] = errors
}

const setAsCover = async (product, imgUrl) => {
  const currentCover = coverImages.value[product.id] || product.specs?.cover || product.images?.[0]
  if (imgUrl === currentCover) return

  coverImages.value[product.id] = imgUrl
  thumbLoading.value[product.id] = true

  const currentSpecs = product.specs ? { ...product.specs } : {}
  const { error } = await client
    .from('products')
    .update({ specs: { ...currentSpecs, cover: imgUrl } })
    .eq('id', product.id)

  if (error) {
    delete coverImages.value[product.id]
    thumbLoading.value[product.id] = false
  }
}

const removeImage = async (product, index) => {
  const removedImg = product.images[index]
  const currentCover = coverImages.value[product.id] || product.specs?.cover || product.images?.[0]

  delete imageLoading.value[removedImg]

  const storagePath = extractStoragePath(removedImg)
  if (storagePath) {
    await client.storage
      .from('products')
      .remove([storagePath])
  }

  const images = [...product.images]
  images.splice(index, 1)

  if (removedImg === currentCover) {
    const newCover = images[0] || null
    if (newCover) {
      coverImages.value[product.id] = newCover
      const currentSpecs = product.specs ? { ...product.specs } : {}
      await client
        .from('products')
        .update({ specs: { ...currentSpecs, cover: newCover }, images })
        .eq('id', product.id)
    } else {
      delete coverImages.value[product.id]
      await client
        .from('products')
        .update({ images })
        .eq('id', product.id)
    }
  } else {
    await client
      .from('products')
      .update({ images })
      .eq('id', product.id)
  }

  product.images = images
  imageErrors.value[product.id] = []
}

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

const categories = ref([
  { value: 'all', label: 'All' },
])

const showMoreCats = ref(false)
const moreCatsDropdown = ref(null)

if (process.client) {
  onClickOutside(moreCatsDropdown, () => {
    showMoreCats.value = false
  })
}

const { data: cats } = await useAsyncData('admin-categories', async () => {
  const { data } = await client.from('categories').select('slug, name, id')
  if (data) {
    categories.value = [
      { value: 'all', label: 'All' },
      ...data.map(c => ({ value: c.slug, label: c.name, id: c.id }))
    ]
  }
  return data
})

const primaryCategories = computed(() => categories.value.filter(c => ['all', 'manual-grinders', 'portafilters'].includes(c.value)))
const secondaryCategories = computed(() => categories.value.filter(c => !['all', 'manual-grinders', 'portafilters'].includes(c.value)))
const hasMoreActive = computed(() => secondaryCategories.value.some(c => c.value === filterCategory.value))

const categoryColors = {
  'manual-grinders': { bg: '#ECE0D1', text: '#6F4E37' },
  'portafilters': { bg: '#F3E5DC', text: '#A67B5B' },
  'tampers': { bg: '#E6DED8', text: '#4B3621'},
  'accessories': { bg: '#F8F1EA', text: '#D2B48C' },
  'distributors': { bg: '#E9D9C9', text: '#8e6141' },
  'scales': { bg: '#E2E1DA', text: '#A0987D' },
}

const getCategoryBadgeStyle = (slug) => {
  const color = categoryColors[slug]
  if (!color) return { backgroundColor: '#f8ddca', color: '#8e6141' }
  return {
    backgroundColor: color.bg,
    color: color.text
  }
}

const { data: products, refresh, pending } = await useAsyncData('admin-products-list', async () => {
  try {
    const { data, error } = await client.from('products_with_category').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error('Supabase fetch error:', error)
      return []
    }
    return data || []
  } catch (err) {
    console.error('Products fetch failed:', err)
    return []
  }
})

const allProducts = ref([])
const loadingData = computed(() => pending.value || allProducts.value.length === 0)

watch(products, (val) => {
  allProducts.value = val ? JSON.parse(JSON.stringify(val)) : []
  if (val) {
    for (const p of val) {
      if (p.specs?.cover) {
        coverImages.value[p.id] = p.specs.cover
      }
      const coverUrl = p.specs?.cover || p.images?.[0]
      if (coverUrl) {
        thumbLoading.value[p.id] = true
      }
    }
  }
}, { immediate: true })

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

const startEdit = (product) => {
  editingProductId.value = product.id;

  // Ensure product's current category exists in categories list
  const slug = product.category_slug || ''
  if (slug && !categories.value.some(c => c.value === slug)) {
    categories.value.push({ value: slug, label: product.category_name || slug, id: product.category_id || '' })
  }

  // Set form values directly (update properties, don't replace object)
  editForm.value.name = product.name
  editForm.value.price = product.price?.toString() || '0'
  editForm.value.category_slug = slug
  // Set form values after nextTick so the select options are ready
  nextTick(() => {
    editForm.value = {
      name: product.name,
      price: product.price?.toString() || '0',
      category_slug: slug
    }
    console.log('After nextTick, editForm.category_slug:', editForm.value.category_slug)

  })
}





const cancelEdit = () => {
  editingProductId.value = null
  editForm.value = { name: '', price: '', category_slug: '' }
}

const saveEdit = async (product) => {
  saving.value = true
  try {
    const updates = {}
    if (editForm.value.name !== product.name) updates.name = editForm.value.name
    if (parseFloat(editForm.value.price) !== product.price) updates.price = parseFloat(editForm.value.price)

    const newSlug = editForm.value.category_slug
    if (newSlug !== (product.category_slug || '')) {
      if (!newSlug) {
        updates.category_id = null
      } else {
        const { data: cat } = await client
          .from('categories')
          .select('id')
          .eq('slug', newSlug)
          .single()
        if (cat) updates.category_id = cat.id
      }
    }

    if (Object.keys(updates).length > 0) {
      const { error } = await client
        .from('products')
        .update(updates)
        .eq('id', product.id)

      if (error) throw error

      await refresh()
    }
    editingProductId.value = null
  } catch (err) {
    console.error('Save error:', err)
  } finally {
    saving.value = false
  }
}

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
