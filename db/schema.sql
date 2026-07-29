-- ═══════════════════════════════════════════════════════════
--  Cumilla Resort — Neon Postgres Schema
--  Run this entire file in your Neon SQL Editor
-- ═══════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────
--  1. BOOKINGS
-- ─────────────────────────────────────────────
create table if not exists public.bookings (
  id            uuid primary key default gen_random_uuid(),
  ref           text unique not null,          -- e.g. NR-2026-1001
  guest_name    text not null,
  guest_email   text not null,
  guest_phone   text,
  villa_slug    text not null,                 -- matches villas[].slug in data.js
  villa_name    text not null,                 -- human label (en)
  check_in      date not null,
  check_out     date not null,
  nights        int  not null default 1,
  adults        int  not null default 2,
  children      int  not null default 0,
  price_per_night int not null default 0,      -- BDT
  total         int  not null default 0,       -- BDT
  advance_paid  int  not null default 0,       -- BDT
  channel       text not null default 'Direct',
  status        text not null default 'pending'
                  check (status in ('pending','confirmed','checkedIn','checkedOut','cancelled')),
  notes         text,
  created_at    timestamptz not null default now()
);

-- Index for fast status + date queries
create index if not exists bookings_status_idx   on public.bookings (status);
create index if not exists bookings_checkin_idx  on public.bookings (check_in);
create index if not exists bookings_email_idx    on public.bookings (guest_email);

-- ─────────────────────────────────────────────
--  2. GUESTS
-- ─────────────────────────────────────────────
create table if not exists public.guests (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text unique not null,
  phone         text,
  nid           text,                          -- NID / Passport number
  from_city     text,
  tier          text not null default 'silver'
                  check (tier in ('silver','gold','platinum')),
  preferences   text,
  notes         text,
  since_year    int,
  visit_count   int not null default 1,
  total_spend   int not null default 0,        -- BDT lifetime
  created_at    timestamptz not null default now()
);

create index if not exists guests_email_idx on public.guests (email);
create index if not exists guests_tier_idx  on public.guests (tier);

-- ─────────────────────────────────────────────
--  3. REVIEWS
-- ─────────────────────────────────────────────
create table if not exists public.reviews (
  id            uuid primary key default gen_random_uuid(),
  guest_name    text not null,
  rating        int  not null check (rating between 1 and 5),
  comment       text not null,
  villa_slug    text,
  villa_name    text,
  approved      boolean not null default false,
  created_at    timestamptz not null default now()
);

create index if not exists reviews_approved_idx on public.reviews (approved);

-- ─────────────────────────────────────────────
--  4. CONTACT MESSAGES
-- ─────────────────────────────────────────────
create table if not exists public.contact_messages (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  phone         text,
  message       text not null,
  resolved      boolean not null default false,
  created_at    timestamptz not null default now()
);

-- ─────────────────────────────────────────────
--  5. CMS SETTINGS (single-row keyed by id=1)
-- ─────────────────────────────────────────────
create table if not exists public.cms_settings (
  id            int  primary key default 1,    -- always 1 — single row
  hero_img      text,
  hero_eyebrow  jsonb,                         -- {en, bn}
  hero_title1   jsonb,
  hero_title_em jsonb,
  hero_title2   jsonb,
  hero_sub      jsonb,
  nav_json      jsonb,                         -- full nav visibility object
  sections_json jsonb,                         -- full sections visibility object
  custom_json   jsonb,                         -- array of custom sections
  updated_at    timestamptz not null default now()
);

-- Enforce single row
create unique index if not exists cms_settings_single on public.cms_settings ((true));

-- ─────────────────────────────────────────────
--  6. ROLES
-- ─────────────────────────────────────────────
create table if not exists public.roles (
  key          text primary key,               -- e.g., 'superadmin'
  label        jsonb not null,                 -- {"en":"Super Admin"}
  permissions  jsonb not null                  -- ["*"] or list of page keys
);

-- Insert default roles
insert into public.roles (key, label, permissions) values
('superadmin',   '{"en":"Super Admin"}',      '["*"]'),
('gm',          '{"en":"General Manager"}', '["dashboard","bookings","guests","feedback","cms","finance"]'),
('frontdesk',   '{"en":"Front Desk"}',      '["bookings","guests","frontdesk"]'),
('housekeeping','{"en":"Housekeeping"}',   '["housekeeping","rooms","inventory"]')
on conflict (key) do nothing;

-- ─────────────────────────────────────────────
--  7. USERS (Custom authentication table)
-- ─────────────────────────────────────────────
create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  password_hash text not null,
  role_key      text references public.roles(key) not null default 'frontdesk',
  name          text,
  created_at    timestamptz default now()
);
