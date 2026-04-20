-- ============================================================
-- BARISTA BENCH — Supabase Database Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PROFILES ──────────────────────────────────────────────────────
-- Extends Supabase auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT,
  avatar_url    TEXT,
  barista_tier  TEXT DEFAULT 'Enthusiast' CHECK (barista_tier IN ('Enthusiast','Home Barista','Expert Home Barista','Master')),
  barista_points INTEGER DEFAULT 0,
  academy_rank  TEXT DEFAULT 'Beginner' CHECK (academy_rank IN ('Beginner','Amateur','Pro','Expert','Master')),
  courses_completed INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ─── CATEGORIES ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  sort_order  INTEGER DEFAULT 0
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);

INSERT INTO public.categories (name, slug, description, sort_order) VALUES
  ('Manual Grinders',     'manual-grinders',    'Hand grinders with precision burr sets',    1),
  ('Portafilters',        'portafilters',        'Bottomless and spouted portafilters',       2),
  ('Distribution Tools',  'distribution-tools',  'WDT and distribution tools',                3),
  ('Tampers',             'tampers',             'Precision calibrated tampers',              4),
  ('Scales & Precision',  'scales-precision',    'Brewing scales and measuring tools',        5),
  ('Accessories',         'accessories',         'Cups, cleaning, and more',                  6)
ON CONFLICT (slug) DO NOTHING;

-- ─── PRODUCTS ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id     UUID REFERENCES public.categories(id),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  tagline         TEXT,
  description     TEXT,
  price           NUMERIC(10,2) NOT NULL,
  compare_price   NUMERIC(10,2),
  sku             TEXT UNIQUE,
  series          TEXT,
  images          JSONB DEFAULT '[]',
  specs           JSONB DEFAULT '{}',
  tags            TEXT[] DEFAULT '{}',
  in_stock        BOOLEAN DEFAULT TRUE,
  stock_count     INTEGER DEFAULT 100,
  is_featured     BOOLEAN DEFAULT FALSE,
  is_bestseller   BOOLEAN DEFAULT FALSE,
  rating          NUMERIC(2,1) DEFAULT 0,
  review_count    INTEGER DEFAULT 0,
  materials       TEXT[] DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);

-- Seed products
INSERT INTO public.products (category_id, name, slug, tagline, description, price, compare_price, sku, series, specs, tags, is_featured, is_bestseller, rating, review_count, materials) VALUES
(
  (SELECT id FROM categories WHERE slug='manual-grinders'),
  'Apex Manual Grinder v2', 'apex-manual-grinder-v2',
  'The culmination of two years of engineering.',
  'Features 48mm high-nitrogen steel burrs and a stepless adjustment mechanism capable of grinding from Turkish to Cold Brew with laboratory precision.',
  249.00, 299.00, 'BB-APX-421', 'Professional Series',
  '{"burr_material":"Nitrogen-Hardened Steel","burr_size":"48mm Conical","adjustment":"Stepless (0.012mm per click)","capacity":"35-40g Coffee","body_material":"Anodized Aluminum","warranty":"2 Years Limited","steps_per_rotation":120,"tolerance":"±0.01mm"}',
  ARRAY['STEPLESS','TITANIUM'], TRUE, TRUE, 4.9, 142,
  ARRAY['Anodized Aluminum']
),
(
  (SELECT id FROM categories WHERE slug='portafilters'),
  'Walnut Bottomless PF', 'walnut-bottomless-pf',
  '58mm precision bottomless portafilter.',
  'Handcrafted walnut handle meets Grade 304 stainless steel basket. Bottomless design reveals extraction quality in real time.',
  85.00, NULL, 'BB-WBP-58', 'Artisan Series',
  '{"size":"58mm","material":"Grade 304 Steel","handle":"American Walnut","basket_type":"Bottomless","compatibility":"E61, La Marzocco, Breville"}',
  ARRAY['58MM','WALNUT'], TRUE, TRUE, 4.8, 89,
  ARRAY['American Walnut','Grade 304 Steel']
),
(
  (SELECT id FROM categories WHERE slug='distribution-tools'),
  'Precision WDT Tool', 'precision-wdt-tool',
  '0.35mm surgical needles for perfect distribution.',
  'Eliminates channeling before every shot. 8 surgical-grade needles set in a weighted brass base.',
  35.00, NULL, 'BB-WDT-001', 'Precision Series',
  '{"needle_count":8,"needle_diameter":"0.35mm","material":"Surgical Steel","base":"Weighted Brass","height":"95mm"}',
  ARRAY['0.35MM','SURGICAL'], FALSE, FALSE, 4.7, 203,
  ARRAY['Surgical Steel','Brass']
),
(
  (SELECT id FROM categories WHERE slug='tampers'),
  'Gravitas Tamper', 'gravitas-tamper',
  'Spring-calibrated at 15lbs. Every time.',
  'Precision spring mechanism ensures consistent 15lb tamping pressure. 58.5mm flat base with anodized aluminum handle.',
  115.00, NULL, 'BB-GRV-585', 'Pro Series',
  '{"calibration":"15lb Spring","base_size":"58.5mm","material":"Stainless Steel","handle":"Anodized Aluminum","finish":"Matte"}',
  ARRAY['15LB','CALIBRATED'], TRUE, TRUE, 4.9, 67,
  ARRAY['Stainless Steel','Anodized Aluminum']
),
(
  (SELECT id FROM categories WHERE slug='manual-grinders'),
  'Nomad Oak Grinder', 'nomad-oak-grinder',
  'Compact travel-ready design with genuine oak handle.',
  'Compact travel-ready design with genuine oak handle and stainless steel mechanism. Perfect for adventurous baristas.',
  195.00, NULL, 'BB-NOG-001', 'Travel Series',
  '{"burr_size":"38mm Conical","adjustment":"Stepless","capacity":"20-25g Coffee","handle":"Genuine Oak","weight":"480g"}',
  ARRAY['TRAVEL-SIZE','OAK HANDLE'], FALSE, FALSE, 4.6, 44,
  ARRAY['American Walnut','Grade 304 Steel']
),
(
  (SELECT id FROM categories WHERE slug='scales-precision'),
  'Nano Precision Scale', 'nano-precision-scale',
  '0.10g accuracy. Shot-timer built in.',
  'Ultra-thin brewing scale with 0.1g precision and auto-tare. USB-C rechargeable. Fits under any portafilter.',
  45.00, NULL, 'BB-NPS-001', 'Precision Series',
  '{"accuracy":"0.1g","capacity":"2000g","timer":"Built-in","charging":"USB-C","dimensions":"130×130×8mm"}',
  ARRAY['0.1G','USB-C'], FALSE, FALSE, 4.8, 118,
  ARRAY['Anodized Aluminum']
),
(
  (SELECT id FROM categories WHERE slug='tampers'),
  'Oak Tamping Block', 'oak-tamping-block',
  'Natural finish walnut tamping station.',
  'Handcrafted solid walnut tamping block with a recessed 58mm base. Protects your countertop and provides a stable tamping surface.',
  65.00, NULL, 'BB-OTB-001', 'Artisan Series',
  '{"material":"Solid Walnut","base_size":"58mm","finish":"Natural Oil","dimensions":"150×90×40mm"}',
  ARRAY['WALNUT','HANDCRAFTED'], FALSE, FALSE, 4.7, 56,
  ARRAY['American Walnut']
),
(
  (SELECT id FROM categories WHERE slug='portafilters'),
  'Apex Pro Series v2', 'apex-pro-series-v2',
  '48mm Titanium-coated burrs for micro-adjustments.',
  'The pinnacle of manual grinding. 48mm titanium-coated burrs with 120 precision clicks per rotation for the most demanding baristas.',
  285.00, NULL, 'BB-APX-PRO-V2', 'Professional Series',
  '{"burr_material":"Titanium-Coated Steel","burr_size":"48mm Conical","adjustment":"Stepless","clicks":120}',
  ARRAY['STEPLESS','TITANIUM'], FALSE, FALSE, 4.9, 38,
  ARRAY['Anodized Aluminum','Titanium-Coated Steel']
)
ON CONFLICT (slug) DO NOTHING;

-- ─── PRODUCT COMPATIBILITY ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.machine_models (
  id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand TEXT NOT NULL,
  name  TEXT NOT NULL,
  slug  TEXT UNIQUE NOT NULL,
  portafilter_size INTEGER -- in mm
);

ALTER TABLE public.machine_models ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view machines" ON public.machine_models FOR SELECT USING (true);

INSERT INTO public.machine_models (brand, name, slug, portafilter_size) VALUES
  ('Breville','Barista Express','breville-barista-express', 54),
  ('Breville','Barista Pro','breville-barista-pro', 54),
  ('De''Longhi','La Specialista','delonghi-la-specialista', 54),
  ('Gaggia','Classic Pro','gaggia-classic-pro', 58),
  ('ECM','Synchronika','ecm-synchronika', 58),
  ('Lelit','Bianca','lelit-bianca', 58),
  ('La Marzocco','Linea Mini','la-marzocco-linea-mini', 58),
  ('Rocket','Appartamento','rocket-appartamento', 58),
  ('Profitec','Pro 300','profitec-pro-300', 58)
ON CONFLICT (slug) DO NOTHING;

-- ─── ORDERS ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number  TEXT UNIQUE NOT NULL,
  user_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status        TEXT DEFAULT 'placed' CHECK (status IN ('placed','processed','in_transit','out_for_delivery','delivered','cancelled','returned')),
  shipping_info JSONB DEFAULT '{}',
  billing_info  JSONB DEFAULT '{}',
  subtotal      NUMERIC(10,2) NOT NULL,
  shipping_cost NUMERIC(10,2) DEFAULT 0,
  tax           NUMERIC(10,2) DEFAULT 0,
  discount      NUMERIC(10,2) DEFAULT 0,
  total         NUMERIC(10,2) NOT NULL,
  carrier       TEXT,
  tracking_number TEXT,
  notes         TEXT,
  placed_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ─── ORDER ITEMS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.order_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id    UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES public.products(id),
  product_name TEXT NOT NULL,
  product_sku  TEXT,
  variant_info JSONB DEFAULT '{}',
  quantity    INTEGER NOT NULL DEFAULT 1,
  unit_price  NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(10,2) NOT NULL
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );
CREATE POLICY "Users insert own order items" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

-- ─── CART ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cart_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity    INTEGER NOT NULL DEFAULT 1,
  added_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own cart" ON public.cart_items
  USING (auth.uid() = user_id);

-- ─── WISHLIST / SAVED TOOLS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.saved_tools (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES public.products(id) ON DELETE CASCADE,
  saved_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE public.saved_tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own saved tools" ON public.saved_tools
  USING (auth.uid() = user_id);

-- ─── REVIEWS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reviews (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_title TEXT,
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title       TEXT,
  body        TEXT NOT NULL,
  verified_purchase BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can write reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Seed reviews
INSERT INTO public.reviews (product_id, reviewer_name, reviewer_title, rating, title, body, verified_purchase) VALUES
(
  (SELECT id FROM products WHERE slug='apex-manual-grinder-v2'),
  'Liam Henderson', 'Home Barista Enthusiast', 5,
  'The attention to detail is incredible',
  'The attention to detail on the Walnut Portafilter is incredible. It''s not just a tool, it''s a piece of art that actually improved my consistency.',
  true
),
(
  (SELECT id FROM products WHERE slug='walnut-bottomless-pf'),
  'Sarah Jenkins', 'Coffee Blogger', 5,
  'Bundle builder saved me so much time',
  'The bundle builder saved me so much time. I didn''t have to worry about compatibility issues with my Gaggia Classic. Everything fits perfectly.',
  true
),
(
  (SELECT id FROM products WHERE slug='gravitas-tamper'),
  'Marcus Thorne', 'Professional Roaster', 5,
  'Precision tools that actually make a difference',
  'Precision tools that actually make a difference. My extraction times have leveled out and the flavor profile of my shots is finally consistent.',
  true
)
ON CONFLICT DO NOTHING;

-- ─── RETURNS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.returns (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      UUID REFERENCES public.orders(id),
  user_id       UUID REFERENCES auth.users(id),
  status        TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','completed')),
  items         JSONB NOT NULL,
  reason        TEXT,
  resolution    TEXT CHECK (resolution IN ('refund','exchange','store_credit')),
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.returns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own returns" ON public.returns
  USING (auth.uid() = user_id);

-- ─── BUNDLES ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bundle_configs (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id   UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name      TEXT DEFAULT 'My Kit',
  items     JSONB DEFAULT '[]',  -- [{product_id, step_name, quantity}]
  discount  NUMERIC(5,2) DEFAULT 15.00,
  total     NUMERIC(10,2),
  saved_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.bundle_configs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own bundles" ON public.bundle_configs
  USING (auth.uid() = user_id);

-- ─── ORDER STATUS HELPER ────────────────────────────────────────────
-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  num TEXT;
BEGIN
  num := 'BB-' || LPAD(FLOOR(RANDOM() * 99999999)::TEXT, 8, '0');
  RETURN num;
END;
$$;

-- ─── USEFUL VIEWS ──────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.products_with_category AS
SELECT
  p.*,
  c.name AS category_name,
  c.slug AS category_slug
FROM public.products p
LEFT JOIN public.categories c ON c.id = p.category_id;

-- Grant select on views
GRANT SELECT ON public.products_with_category TO anon, authenticated;
