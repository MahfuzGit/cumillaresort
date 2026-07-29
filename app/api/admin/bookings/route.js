import { sql } from '../../../../lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

async function verifyStaff() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('cumilla-token')?.value;
    if (!token) return null;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const role = payload.role_key;
    if (role === 'superadmin' || role === 'gm' || role === 'frontdesk') {
      return payload;
    }
  } catch {}
  return null;
}

export async function GET() {
  try {
    const staff = await verifyStaff();
    if (!staff) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const bookings = await sql`
      SELECT ref, guest_name, villa_name, check_in, check_out, channel, total, status, created_at
      FROM bookings
      ORDER BY created_at DESC
    `;
    return Response.json(bookings);
  } catch (err) {
    console.error('[API Admin Bookings GET] Error:', err);
    return Response.json({ message: 'Error fetching bookings' }, { status: 500 });
  }
}
