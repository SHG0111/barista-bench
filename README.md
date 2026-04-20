# Barista Bench

A full-stack e-commerce platform for precision espresso tools, built with **Nuxt 3**, **Vue 3**, and **Supabase**.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 3 (SSR/SPA) |
| Frontend | Vue 3 Composition API |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email + OAuth) |
| State | Vue composables + `useState` |
| Styling | CSS custom properties (no UI library) |
| Fonts | Google Fonts (Playfair Display + DM Sans + DM Mono) |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, bestsellers, reviews, FAQ |
| `/shop` | Product listing with filters (category, price, material) |
| `/product/[slug]` | Product detail — images, compatibility checker, specs, reviews |
| `/bundle` | 4-step kit builder with live pricing and 15% bundle discount |
| `/checkout` | Shipping + payment form, order placement |
| `/order/[id]` | Order tracking with live status progress bar |
| `/account` | User dashboard — orders, saved tools, profile settings |
| `/returns` | Returns & exchanges portal with multi-step flow |
| `/auth/login` | Sign in / register with Google OAuth support |

---

## Setup Instructions

### 1. Clone and install

```bash
git clone <your-repo>
cd barista-bench
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your **Project URL** and **anon public key** from Settings → API

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env`:
```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your-anon-public-key
```

### 4. Run the database schema

1. Open your Supabase dashboard → **SQL Editor** → **New Query**
2. Paste the entire contents of `supabase-schema.sql`
3. Click **Run**

This creates all tables, RLS policies, seed data (products, categories, reviews, machine models), and a trigger for auto-creating user profiles on signup.

### 5. Enable Auth providers (optional)

- **Email auth** is enabled by default in Supabase
- **Google OAuth**: Dashboard → Authentication → Providers → Google → add your Google client ID + secret

### 6. Run development server

```bash
npm run dev
```

Open http://localhost:3000

---

## Database Schema

```
auth.users (Supabase managed)
  └── profiles (extended user data, barista tier, academy rank)

categories
  └── products (with specs JSONB, tags, materials)
       ├── reviews
       └── product compatibility → machine_models

orders
  └── order_items

cart_items (per-user, soft state)
saved_tools (wishlist)
returns
bundle_configs
```

### Key design decisions

- **RLS (Row Level Security)** enabled on all tables — users can only access their own data
- **`products_with_category` view** joins products with category names/slugs for efficient queries
- **JSONB specs column** allows flexible product specifications without schema migrations
- **`materials` text[]** enables filter-by-material on the shop page

---

## Project Structure

```
barista-bench/
├── assets/css/main.css       # Design tokens + global styles
├── components/
│   ├── AppNav.vue             # Fixed navigation with search
│   ├── AppFooter.vue          # Footer with newsletter
│   ├── ProductCard.vue        # Reusable product card
│   ├── ToastContainer.vue     # Global toast notifications
│   └── Icon*.vue              # SVG icon components
├── composables/
│   ├── useCart.ts             # Cart state + Supabase sync
│   └── useToast.ts            # Toast notification system
├── layouts/
│   ├── default.vue            # Nav + Footer wrapper
│   └── clean.vue              # Minimal (checkout, auth)
├── middleware/
│   └── auth.ts                # Route guard for account pages
├── pages/
│   ├── index.vue              # Landing page
│   ├── shop.vue               # Product listing
│   ├── product/[slug].vue     # Product detail
│   ├── bundle.vue             # Bundle builder
│   ├── checkout.vue           # Checkout
│   ├── order/[id].vue         # Order tracking
│   ├── account/index.vue      # User dashboard
│   ├── returns.vue            # Returns portal
│   └── auth/
│       ├── login.vue          # Auth page
│       └── confirm.vue        # OAuth callback
├── supabase-schema.sql        # Full DB schema + seed data
└── nuxt.config.ts             # Nuxt configuration
```

---

## Build for Production

```bash
npm run build
npm run preview
```

Or deploy to Vercel/Netlify — Nuxt 3 supports edge rendering out of the box.

### Environment variables for deployment

Set the same `.env` variables in your hosting platform's dashboard.

---

## Customization

### Changing the color scheme
Edit CSS custom properties in `assets/css/main.css`:
```css
:root {
  --accent: #C4824A;      /* amber/gold — brand color */
  --bg: #F5F4F1;          /* warm off-white background */
  --text: #1A1916;        /* near-black text */
}
```

### Adding products
Insert directly via Supabase dashboard or SQL:
```sql
INSERT INTO products (category_id, name, slug, price, ...)
VALUES (...);
```

### Adding product images
Update the `images` JSONB column with Supabase Storage URLs:
```sql
UPDATE products
SET images = '["https://your-bucket.supabase.co/storage/v1/object/public/products/img.jpg"]'
WHERE slug = 'apex-manual-grinder-v2';
```
