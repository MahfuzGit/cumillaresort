const { Client } = require('pg');

const databaseUrl = 'postgresql://postgres.vxncrshdjxixhryizgly:321%40%23MahfuzProton@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true';

const INITIAL_ASSETS = [
  {
    file_name: 'hero_video1.mp4',
    file_url: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/hero_video1.mp4',
    file_type: 'video',
    section_tag: 'hero'
  },
  {
    file_name: 'cumilla_hero_villas.png',
    file_url: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_hero_villas.png',
    file_type: 'image',
    section_tag: 'hero'
  },
  {
    file_name: 'cumilla_villa_royal.png',
    file_url: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_villa_royal.png',
    file_type: 'image',
    section_tag: 'villas'
  },
  {
    file_name: 'cumilla_villa_water.png',
    file_url: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_villa_water.png',
    file_type: 'image',
    section_tag: 'villas'
  },
  {
    file_name: 'cumilla_villa_forest.png',
    file_url: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_villa_forest.png',
    file_type: 'image',
    section_tag: 'villas'
  },
  {
    file_name: 'cumilla_villa_pool.png',
    file_url: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_villa_pool.png',
    file_type: 'image',
    section_tag: 'villas'
  },
  {
    file_name: 'cumilla_villa_hilltop.png',
    file_url: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_villa_hilltop.png',
    file_type: 'image',
    section_tag: 'villas'
  },
  {
    file_name: 'cumilla_sanctuary_pool.png',
    file_url: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_sanctuary_pool.png',
    file_type: 'image',
    section_tag: 'sanctuary'
  },
  {
    file_name: 'cumilla_sanctuary_spa.png',
    file_url: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_sanctuary_spa.png',
    file_type: 'image',
    section_tag: 'sanctuary'
  },
  {
    file_name: 'cumilla_couple_dining.png',
    file_url: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_couple_dining.png',
    file_type: 'image',
    section_tag: 'cta'
  },
  {
    file_name: 'cumilla_shalban_vihara.png',
    file_url: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_shalban_vihara.png',
    file_type: 'image',
    section_tag: 'experiences'
  },
  {
    file_name: 'cumilla_dining_roshomalai.png',
    file_url: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_dining_roshomalai.png',
    file_type: 'image',
    section_tag: 'experiences'
  },
  {
    file_name: 'sylhet_tea_garden_hero.png',
    file_url: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/sylhet_tea_garden_hero.png',
    file_type: 'image',
    section_tag: 'general'
  }
];

async function main() {
  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL...');

    // 1. Create public.cms_media_assets table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.cms_media_assets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        file_name TEXT NOT NULL,
        file_url TEXT UNIQUE NOT NULL,
        file_type TEXT NOT NULL DEFAULT 'image',
        file_size INT DEFAULT 0,
        section_tag TEXT DEFAULT 'general',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log('✅ Created table public.cms_media_assets');

    // 2. Seed initial media assets
    for (const asset of INITIAL_ASSETS) {
      await client.query(`
        INSERT INTO public.cms_media_assets (file_name, file_url, file_type, section_tag)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (file_url) DO NOTHING;
      `, [asset.file_name, asset.file_url, asset.file_type, asset.section_tag]);
    }
    console.log(`✅ Pre-populated ${INITIAL_ASSETS.length} resort media records in public.cms_media_assets!`);

  } catch (err) {
    console.error('Error setting up cms_media_assets table:', err.message);
  } finally {
    await client.end();
  }
}

main();
