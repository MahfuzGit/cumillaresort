import { sql } from '../../../lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

async function verifyAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('cumilla-token')?.value;
    if (!token) return null;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role_key === 'superadmin' || payload.role_key === 'gm') {
      return payload;
    }
  } catch {}
  return null;
}

export async function GET() {
  try {
    const rows = await sql`
      SELECT * FROM cms_settings
      WHERE id = 1
      LIMIT 1
    `;
    return Response.json(rows[0] || null);
  } catch (err) {
    console.error('[API CMS GET] Error:', err);
    return Response.json({ message: 'Error fetching CMS settings' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const row = await req.json();

    // Upsert into Neon Postgres cms_settings
    await sql`
      INSERT INTO cms_settings (
        id,
        hero_img,
        hero_video,
        hero_eyebrow,
        hero_title1,
        hero_title_em,
        hero_title2,
        hero_sub,
        sanctuary_json,
        villas_sec_json,
        exp_sec_json,
        gallery_sec_json,
        testimonials_sec_json,
        cta_sec_json,
        nav_json,
        sections_json,
        custom_json,
        full_data,
        updated_at
      ) VALUES (
        1,
        ${row.hero_img || ''},
        ${row.hero_video || ''},
        ${JSON.stringify(row.hero_eyebrow || {})},
        ${JSON.stringify(row.hero_title1 || {})},
        ${JSON.stringify(row.hero_title_em || {})},
        ${JSON.stringify(row.hero_title2 || {})},
        ${JSON.stringify(row.hero_sub || {})},
        ${JSON.stringify(row.sanctuary_json || {})},
        ${JSON.stringify(row.villas_sec_json || {})},
        ${JSON.stringify(row.exp_sec_json || {})},
        ${JSON.stringify(row.gallery_sec_json || {})},
        ${JSON.stringify(row.testimonials_sec_json || {})},
        ${JSON.stringify(row.cta_sec_json || {})},
        ${JSON.stringify(row.nav_json || {})},
        ${JSON.stringify(row.sections_json || {})},
        ${JSON.stringify(row.custom_json || [])},
        ${JSON.stringify(row)},
        NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        hero_img = EXCLUDED.hero_img,
        hero_video = EXCLUDED.hero_video,
        hero_eyebrow = EXCLUDED.hero_eyebrow,
        hero_title1 = EXCLUDED.hero_title1,
        hero_title_em = EXCLUDED.hero_title_em,
        hero_title2 = EXCLUDED.hero_title2,
        hero_sub = EXCLUDED.hero_sub,
        sanctuary_json = EXCLUDED.sanctuary_json,
        villas_sec_json = EXCLUDED.villas_sec_json,
        exp_sec_json = EXCLUDED.exp_sec_json,
        gallery_sec_json = EXCLUDED.gallery_sec_json,
        testimonials_sec_json = EXCLUDED.testimonials_sec_json,
        cta_sec_json = EXCLUDED.cta_sec_json,
        nav_json = EXCLUDED.nav_json,
        sections_json = EXCLUDED.sections_json,
        custom_json = EXCLUDED.custom_json,
        full_data = EXCLUDED.full_data,
        updated_at = NOW()
    `;

    return Response.json({ success: true });
  } catch (err) {
    console.error('[API CMS POST] Error:', err);
    return Response.json({ message: 'Error saving CMS settings' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await sql`DELETE FROM cms_settings WHERE id = 1`;
    return Response.json({ success: true });
  } catch (err) {
    console.error('[API CMS DELETE] Error:', err);
    return Response.json({ message: 'Error deleting CMS settings' }, { status: 500 });
  }
}
