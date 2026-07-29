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

export async function GET(req) {
  try {
    const rows = await sql`
      SELECT * FROM public.cms_media_assets
      ORDER BY created_at DESC
    `;
    return Response.json(rows);
  } catch (err) {
    console.error('[API Media GET] Error:', err);
    return Response.json({ message: 'Error fetching media assets' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { file_name, file_url, file_type, file_size, section_tag } = await req.json();
    if (!file_url) {
      return Response.json({ message: 'file_url is required' }, { status: 400 });
    }

    const name = file_name || file_url.split('/').pop() || 'media_asset';
    const type = file_type || (file_url.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image');
    const tag = section_tag || 'general';

    const rows = await sql`
      INSERT INTO public.cms_media_assets (
        file_name, file_url, file_type, file_size, section_tag
      ) VALUES (
        ${name}, ${file_url}, ${type}, ${file_size || 0}, ${tag}
      )
      ON CONFLICT (file_url) DO UPDATE SET
        file_name = EXCLUDED.file_name,
        file_type = EXCLUDED.file_type,
        section_tag = EXCLUDED.section_tag
      RETURNING *
    `;

    return Response.json(rows[0]);
  } catch (err) {
    console.error('[API Media POST] Error:', err);
    return Response.json({ message: 'Error creating media asset' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return Response.json({ message: 'Missing id parameter' }, { status: 400 });
    }

    await sql`
      DELETE FROM public.cms_media_assets
      WHERE id = ${id}
    `;

    return Response.json({ success: true });
  } catch (err) {
    console.error('[API Media DELETE] Error:', err);
    return Response.json({ message: 'Error deleting media asset' }, { status: 500 });
  }
}
