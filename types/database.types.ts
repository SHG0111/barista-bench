export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type BaristaTier = 'Enthusiast' | 'Home Barista' | 'Expert Home Barista' | 'Master'
export type AcademyRank = 'Beginner' | 'Amateur' | 'Pro' | 'Expert' | 'Master'
export type OrderStatus = 'placed' | 'processed' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned'
export type ReturnStatus = 'pending' | 'approved' | 'rejected' | 'completed'
export type ReturnResolution = 'refund' | 'exchange' | 'store_credit'

export interface profiles {
  id: string
  full_name: string | null
  avatar_url: string | null
  barista_tier: BaristaTier
  barista_points: number
  academy_rank: AcademyRank
  courses_completed: number
  created_at: string
  updated_at: string
}

export interface categories {
  id: string
  name: string
  slug: string
  description: string | null
  sort_order: number
}

export interface products {
  id: string
  category_id: string | null
  name: string
  slug: string
  tagline: string | null
  description: string | null
  price: number
  compare_price: number | null
  sku: string | null
  series: string | null
  images: Json[]
  specs: Json
  tags: string[]
  in_stock: boolean
  stock_count: number
  is_featured: boolean
  is_bestseller: boolean
  rating: number
  review_count: number
  materials: string[]
  created_at: string
}

export interface products_with_category extends products {
  category_name: string | null
  category_slug: string | null
}

export interface machine_models {
  id: string
  brand: string
  name: string
  slug: string
  portafilter_size: number | null
}

export interface orders {
  id: string
  order_number: string
  user_id: string | null
  status: OrderStatus
  shipping_info: Json
  billing_info: Json
  subtotal: number
  shipping_cost: number
  tax: number
  discount: number
  total: number
  carrier: string | null
  tracking_number: string | null
  notes: string | null
  placed_at: string
  updated_at: string
}

export interface order_items {
  id: string
  order_id: string
  product_id: string | null
  product_name: string
  product_sku: string | null
  variant_info: Json
  quantity: number
  unit_price: number
  total_price: number
}

export interface cart_items {
  id: string
  user_id: string | null
  product_id: string | null
  quantity: number
  added_at: string
}

export interface saved_tools {
  id: string
  user_id: string | null
  product_id: string | null
  saved_at: string
}

export interface reviews {
  id: string
  product_id: string | null
  user_id: string | null
  reviewer_name: string
  reviewer_title: string | null
  rating: number
  title: string | null
  body: string
  verified_purchase: boolean
  created_at: string
}

export interface returns {
  id: string
  order_id: string | null
  user_id: string | null
  status: ReturnStatus
  items: Json
  reason: string | null
  resolution: ReturnResolution | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface bundle_configs {
  id: string
  user_id: string | null
  name: string
  items: Json
  discount: number
  total: number | null
  saved_at: string
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: profiles
        Insert: Omit<profiles, 'created_at' | 'updated_at'>
        Update: Partial<Omit<profiles, 'id'>>
      }
      categories: {
        Row: categories
        Insert: Omit<categories, 'id'>
        Update: Partial<Omit<categories, 'id'>>
      }
      products: {
        Row: products
        Insert: Omit<products, 'id' | 'created_at'>
        Update: Partial<Omit<products, 'id' | 'created_at'>>
      }
      machine_models: {
        Row: machine_models
        Insert: Omit<machine_models, 'id'>
        Update: Partial<Omit<machine_models, 'id'>>
      }
      orders: {
        Row: orders
        Insert: Omit<orders, 'id' | 'placed_at' | 'updated_at'>
        Update: Partial<Omit<orders, 'id' | 'order_number'>>
      }
      order_items: {
        Row: order_items
        Insert: Omit<order_items, 'id'>
        Update: Partial<Omit<order_items, 'id'>>
      }
      cart_items: {
        Row: cart_items
        Insert: Omit<cart_items, 'id' | 'added_at'>
        Update: Partial<Omit<cart_items, 'id'>>
      }
      saved_tools: {
        Row: saved_tools
        Insert: Omit<saved_tools, 'id' | 'saved_at'>
        Update: Partial<Omit<saved_tools, 'id'>>
      }
      reviews: {
        Row: reviews
        Insert: Omit<reviews, 'id' | 'created_at'>
        Update: Partial<Omit<reviews, 'id' | 'created_at'>>
      }
      returns: {
        Row: returns
        Insert: Omit<returns, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<returns, 'id' | 'order_id' | 'user_id'>>
      }
      bundle_configs: {
        Row: bundle_configs
        Insert: Omit<bundle_configs, 'id' | 'saved_at'>
        Update: Partial<Omit<bundle_configs, 'id' | 'user_id'>>
      }
    }
    Views: {
      products_with_category: {
        Row: products_with_category
      }
    }
  }
}