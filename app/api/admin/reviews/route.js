import { sql } from '../../../../lib/db';
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
    const admin = await verifyAdmin();
    if (!admin) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const reviews = await sql`
      SELECT id, guest_name, rating, comment, villa_name, approved, created_at
      FROM reviews
      ORDER BY created_at DESC
    `;
    return Response.json(reviews);
  } catch (err) {
    console.error('[API Admin Reviews GET] Error:', err);
    return Response.json({ message: 'Error fetching reviews' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return Response.json({ message: 'Review ID is required' }, { status: 400 });
    }

    await sql`
      UPDATE reviews
      SET approved = true
      WHERE id = ${id}
    `;

    return Response.json({ success: true });
  } catch (err) {
    console.error('[API Admin Reviews PUT] Error:', err);
    return Response.json({ message: 'Error approving review' }, { status: 500 });
  }
}
