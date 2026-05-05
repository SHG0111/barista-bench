import { createClient } from '@supabase/supabase-js'

function parseCSV(text: string) {
  const lines = text.replace(/\r/g, '').split('\n').filter(line => line.trim())
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
  
  const rows: Record<string, string>[] = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    const values: string[] = []
    let current = ''
    let inQuotes = false
    
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    values.push(current.trim())

    const obj: Record<string, string> = {}
    headers.forEach((header, j) => {
      obj[header] = values[j] || ''
    })
    rows.push(obj)
  }
  
  return rows
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const formData = await readMultipartFormData(event)
  
  const file = formData?.find(item => item.name === 'file')
  if (!file) {
    throw createError({ statusCode: 400, message: 'No file provided' })
  }

  const csvContent = Buffer.from(file.data).toString('utf-8')
  const rows = parseCSV(csvContent)
  
  if (rows.length === 0) {
    throw createError({ statusCode: 400, message: 'CSV file has no data rows' })
  }

  const supabaseAdmin = createClient(config.public.supabaseUrl, config.supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  // Fetch categories from database
  const { data: categories } = await supabaseAdmin.from('categories').select('id, name, slug')

  // Build category lookup maps
  const categoryById: Record<string, { name: string; slug: string }> = {}
  const categoryByName: Record<string, { id: string; slug: string }> = {}
  const categoryBySlug: Record<string, { id: string; name: string }> = {}
  
  if (categories) {
    categories.forEach(cat => {
      categoryById[cat.id] = { name: cat.name, slug: cat.slug }
      categoryByName[cat.name.toLowerCase()] = { id: cat.id, slug: cat.slug }
      categoryBySlug[cat.slug.toLowerCase()] = { id: cat.id, name: cat.name }
    })
  }

  console.log('Categories in DB:', categories)
  
  // Fetch existing products to determine next SKU sequence
  const { data: existingProducts } = await supabaseAdmin.from('products').select('sku').not('sku', 'is', null)
  
  // Track sequence per category prefix
  const skuSequences: Record<string, number> = {}
  if (existingProducts) {
    existingProducts.forEach(p => {
      const parts = p.sku.split('-')
      if (parts.length >= 3) {
        const prefix = parts[1]
        const seq = parseInt(parts[parts.length - 1])
        if (!isNaN(seq)) {
          skuSequences[prefix] = Math.max(skuSequences[prefix] || 0, seq)
        }
      }
    })
  }

  // Category name/slug to SKU prefix mapping
  const categoryPrefixes: Record<string, string> = {
    'grinder': 'GRD',
    'manual-grinders': 'GRD',
    'manual-grinder': 'GRD',
    'tampers': 'TAM',
    'tamper': 'TAM',
    'portafilter': 'POR',
    'portafilters': 'POR',
    'distributor': 'DST',
    'wdt': 'WDT',
    'scale': 'SCL',
    'scales': 'SCL',
    'accessories': 'ACC',
    'accessory': 'ACC',
    'other': 'MISC'
  }

  const getNextSku = (categoryId: string | null) => {
    let prefix = 'MISC'
    if (categoryId && categoryById[categoryId]) {
      const name = categoryById[categoryId].name.toLowerCase()
      const slug = categoryById[categoryId].slug.toLowerCase()
      for (const [key, val] of Object.entries(categoryPrefixes)) {
        if (name.includes(key) || slug.includes(key)) {
          prefix = val
          break
        }
      }
    }
    skuSequences[prefix] = (skuSequences[prefix] || 0) + 1
    return `BB-${prefix}-${String(skuSequences[prefix]).padStart(3, '0')}`
  }

  const resolveCategoryId = (categoryInput: string | undefined): { id: string | null; name: string } => {
    if (!categoryInput || categoryInput === '') return { id: null, name: '' }
    
    const input = categoryInput.trim()
    
    // Try matching by direct ID first (UUID)
    if (categoryById[input]) {
      return { id: input, name: categoryById[input].name }
    }
    
    // Try matching by slug
    if (categoryBySlug[input.toLowerCase()]) {
      return { id: categoryBySlug[input.toLowerCase()].id, name: categoryBySlug[input.toLowerCase()].name }
    }
    
    // Try matching by name
    if (categoryByName[input.toLowerCase()]) {
      return { id: categoryByName[input.toLowerCase()].id, name: categoryByName[input.toLowerCase()].name }
    }
    
    // Try partial match
    for (const [key, val] of Object.entries(categoryByName)) {
      if (key.includes(input.toLowerCase()) || input.toLowerCase().includes(key)) {
        return { id: val.id, name: categories?.find(c => c.id === val.id)?.name || '' }
      }
    }
    
    return { id: null, name: '' }
  }

  let count = 0
  const errors: string[] = []

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    console.log(`Row ${i + 1} data:`, row)
    
    if (!row.name) {
      errors.push(`Row ${i + 1}: missing name`)
      continue
    }

    const slug = row.slug || row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    // Resolve category from database
    const categoryInput = row.category_name || row.category_slug || row.category || row.category_id || ''
    const category = resolveCategoryId(categoryInput)
    console.log(`Row ${i + 1} category resolution: input="${categoryInput}" => id=${category.id} name=${category.name}`)
    
    // Auto-generate SKU if not provided
    const sku = row.sku || getNextSku(category.id)

    // Parse images (pipe or comma separated)
    let images: string[] = []
    if (row.images) {
      images = row.images.split('|').map(s => s.trim()).filter(Boolean)
      if (images.length === 0) {
        images = row.images.split(',').map(s => s.trim()).filter(Boolean)
      }
    }

    // Parse specs (JSON or key:value format)
    let specs: Record<string, string> = {}
    if (row.specs) {
      try {
        specs = JSON.parse(row.specs)
      } catch {
        const specParts = row.specs.split(',').map(s => s.trim())
        specParts.forEach(part => {
          const [key, ...valParts] = part.split(':')
          if (key && valParts.length) specs[key.trim()] = valParts.join(':').trim()
        })
      }
    }

    // Parse tags (comma or pipe separated)
    let tags: string[] = []
    if (row.tags) {
      tags = row.tags.split(/[|,]/).map(s => s.trim()).filter(Boolean)
    }

    // Parse materials (comma or pipe separated)
    let materials: string[] = []
    if (row.materials) {
      materials = row.materials.split(/[|,]/).map(s => s.trim()).filter(Boolean)
    }

    const productData: Record<string, any> = {
      name: row.name,
      slug,
      sku,
      tagline: row.tagline || '',
      description: row.description || '',
      price: parseFloat(row.price) || 0,
      series: row.series || null,
      images: images.length > 0 ? images : [],
      specs: specs,
      tags: tags.length > 0 ? tags : [],
      materials: materials.length > 0 ? materials : [],
      stock_count: parseInt(row.stock_count) || 0,
      in_stock: (parseInt(row.stock_count) || 0) > 0,
      is_bestseller: row.is_bestseller === 'true' || row.is_bestseller === '1',
      created_at: new Date().toISOString()
    }

    if (category.id) {
      productData.category_id = category.id
    }

    const { error } = await supabaseAdmin.from('products').insert(productData)

    if (error) {
      console.error(`Row ${i + 1} error:`, error)
      let message = error.message
      if (error.code === '23505' && error.message.includes('products_slug_key')) {
        continue
      }
      errors.push(`Row ${i + 1} (${row.name}): ${message}`)
    } else {
      count++
    }
  }

  return { 
    success: true, 
    count, 
    errors: errors.length > 0 ? errors : undefined 
  }
})
