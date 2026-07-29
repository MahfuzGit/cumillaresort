import { createClient } from '@supabase/supabase-js';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { sql } from '../../../lib/db';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

async function recordMediaAsset(fileName, fileUrl, fileType, fileSize) {
  try {
    const type = fileType.includes('video') ? 'video' : 'image';
    await sql`
      INSERT INTO public.cms_media_assets (
        file_name, file_url, file_type, file_size
      ) VALUES (
        ${fileName}, ${fileUrl}, ${type}, ${fileSize || 0}
      )
      ON CONFLICT (file_url) DO NOTHING
    `;
  } catch (err) {
    console.warn('[Record Media Asset] Error:', err.message);
  }
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

export async function POST(req) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) {
      return Response.json({ message: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${Date.now()}_${(file.name || 'image.png').replace(/[^a-zA-Z0-9._-]/g, '')}`;
    const fileType = file.type || 'image/png';
    const fileSize = buffer.length;

    // 1. Try Supabase Storage first
    if (supabase) {
      try {
        const { data, error } = await supabase.storage
          .from('cumilla-resort-media')
          .upload(fileName, buffer, {
            contentType: fileType,
            upsert: true,
          });

        if (!error && data) {
          const { data: publicData } = supabase.storage
            .from('cumilla-resort-media')
            .getPublicUrl(fileName);

          if (publicData?.publicUrl) {
            await recordMediaAsset(fileName, publicData.publicUrl, fileType, fileSize);
            return Response.json({ url: publicData.publicUrl });
          }
        }
      } catch (sbErr) {
        console.warn('[Supabase Upload Warning]:', sbErr.message);
      }
    }

    // 2. Cloudinary fallback
    if (process.env.CLOUDINARY_API_KEY) {
      return new Promise((resolve) => {
        cloudinary.uploader.upload_stream(
          { folder: 'cumilla-resort-media' },
          (error, result) => {
            if (error) {
              console.error('[Cloudinary Upload] Error:', error);
              resolve(Response.json({ message: 'Upload failed', error }, { status: 500 }));
            } else {
              resolve(Response.json({ url: result.secure_url }));
            }
          }
        ).end(buffer);
      });
    }

    // 3. Fallback: Base64 data URL
    const mimeType = file.type || 'image/png';
    const base64Url = `data:${mimeType};base64,${buffer.toString('base64')}`;
    return Response.json({ url: base64Url });

  } catch (err) {
    console.error('[API Upload] Error:', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}

