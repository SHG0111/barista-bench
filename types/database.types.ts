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

export interface Profiles {
  id: string
  full_name: string | null
  avatar_url: string | null
  barista_tier: BaristaTier
  barista_points: number
  academy_rank: AcademyRank
  courses_completed: number
  created_at: string
  updated_at: string
  role?: string
}

export interface Categories {
  id: string
  name: string
  slug: string
  description: string | null
  sort_order: number
}

export interface Products {
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

export interface Products_with_category extends Products {
  category_name: string | null
  category_slug: string | null
}

export interface Machine_models {
  id: string
  brand: string
  name: string
  slug: string
  portafilter_size: number | null
}

export interface Orders {
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

export interface Order_items {
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

export interface Cart_items {
  id: string
  user_id: string | null
  product_id: string | null
  quantity: number
  added_at: string
}

export interface Saved_tools {
  id: string
  user_id: string | null
  product_id: string | null
  saved_at: string
}

export interface Reviews {
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

export interface Returns {
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

export interface Bundle_configs {
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
        Row: Profiles
        Insert: Omit<Profiles, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profiles, 'id'>>
      }
      categories: {
        Row: Categories
        Insert: Omit<Categories, 'id'>
        Update: Partial<Omit<Categories, 'id'>>
      }
      products: {
        Row: Products
        Insert: Omit<Products, 'id' | 'created_at'>
        Update: Partial<Omit<Products, 'id' | 'created_at'>>
      }
      machine_models: {
        Row: Machine_models
        Insert: Omit<Machine_models, 'id'>
        Update: Partial<Omit<Machine_models, 'id'>>
      }
      orders: {
        Row: Orders
        Insert: Omit<Orders, 'id' | 'placed_at' | 'updated_at'>
        Update: Partial<Omit<Orders, 'id' | 'order_number'>>
      }
      order_items: {
        Row: Order_items
        Insert: Omit<Order_items, 'id'>
        Update: Partial<Omit<Order_items, 'id'>>
      }
      cart_items: {
        Row: Cart_items
        Insert: Omit<Cart_items, 'id' | 'added_at'>
        Update: Partial<Omit<Cart_items, 'id'>>
      }
      saved_tools: {
        Row: Saved_tools
        Insert: Omit<Saved_tools, 'id' | 'saved_at'>
        Update: Partial<Omit<Saved_tools, 'id'>>
      }
      reviews: {
        Row: Reviews
        Insert: Omit<Reviews, 'id' | 'created_at'>
        Update: Partial<Omit<Reviews, 'id' | 'created_at'>>
      }
      returns: {
        Row: Returns
        Insert: Omit<Returns, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Returns, 'id' | 'order_id' | 'user_id'>>
      }
      bundle_configs: {
        Row: Bundle_configs
        Insert: Omit<Bundle_configs, 'id' | 'saved_at'>
        Update: Partial<Omit<Bundle_configs, 'id' | 'user_id'>>
      }
    }
    Views: {
      products_with_category: {
        Row: Products_with_category
      }
    }
  }
}