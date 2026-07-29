import { sql } from '../../../lib/db';

export async function GET() {
  try {
    const reviews = await sql`
      SELECT id, guest_name, rating, comment, villa_name, created_at
      FROM reviews
      WHERE approved = true
      ORDER BY created_at DESC
      LIMIT 20
    `;
    return Response.json(reviews);
  } catch (err) {
    console.error('[API Reviews GET] Error:', err);
    return Response.json({ message: 'Error fetching reviews' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { guest_name, rating, comment, villa_slug, villa_name } = await req.json();
    if (!guest_name || !rating || !comment) {
      return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await sql`
      INSERT INTO reviews (guest_name, rating, comment, villa_slug, villa_name, approved)
      VALUES (${guest_name.trim()}, ${Number(rating)}, ${comment.trim()}, ${villa_slug}, ${villa_name}, false)
    `;

    return Response.json({ success: true });
  } catch (err) {
    console.error('[API Reviews POST] Error:', err);
    return Response.json({ message: 'Error submitting review' }, { status: 500 });
  }
}
