import { sql } from '../../../lib/db';

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();
    if (!name || !email || !message) {
      return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await sql`
      INSERT INTO contact_messages (name, email, phone, message)
      VALUES (${name.trim()}, ${email.trim()}, ${phone ? phone.trim() : null}, ${message.trim()})
    `;

    return Response.json({ success: true });
  } catch (err) {
    console.error('[API Contact POST] Error:', err);
    return Response.json({ message: 'Error submitting contact message' }, { status: 500 });
  }
}
