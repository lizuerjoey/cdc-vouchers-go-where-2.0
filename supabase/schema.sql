create extension if not exists vector;

create table if not exists merchants (
  id text primary key,
  name text not null,
  description text not null,
  address text not null,
  postal_code text not null,
  district text not null,
  lat double precision not null,
  lng double precision not null,
  categories text[] not null default '{}',
  tags text[] not null default '{}',
  opening_hours text not null,
  voucher_type text not null check (voucher_type in ('heartland', 'supermarket', 'both')),
  phone text,
  website text,
  google_place_id text,
  embedding vector(1536),
  updated_at timestamptz not null default now()
);

create index if not exists merchants_categories_idx on merchants using gin (categories);
create index if not exists merchants_tags_idx on merchants using gin (tags);
create index if not exists merchants_district_idx on merchants (district);
create index if not exists merchants_google_place_id_idx on merchants (google_place_id);
