import { sql } from '../../../lib/db';

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      ref,
      guest_name,
      guest_email,
      guest_phone,
      villa_slug,
      villa_name,
      check_in,
      check_out,
      nights,
      adults,
      children,
      price_per_night,
      total,
      notes,
    } = data;

    if (!ref || !guest_name || !guest_email || !villa_slug || !check_in || !check_out) {
      return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await sql`
      INSERT INTO bookings (
        ref,
        guest_name,
        guest_email,
        guest_phone,
        villa_slug,
        villa_name,
        check_in,
        check_out,
        nights,
        adults,
        children,
        price_per_night,
        total,
        advance_paid,
        channel,
        status,
        notes
      ) VALUES (
        ${ref},
        ${guest_name.trim()},
        ${guest_email.toLowerCase().trim()},
        ${guest_phone ? guest_phone.trim() : null},
        ${villa_slug},
        ${villa_name},
        ${check_in},
        ${check_out},
        ${Number(nights)},
        ${Number(adults)},
        ${Number(children)},
        ${Number(price_per_night)},
        ${Number(total)},
        0,
        'Direct',
        'pending',
        ${notes ? notes.trim() : null}
      )
    `;

    return Response.json({ success: true });
  } catch (err) {
    console.error('[API Bookings POST] Error:', err);
    return Response.json({ message: 'Error submitting booking' }, { status: 500 });
  }
}
