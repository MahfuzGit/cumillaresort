import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sql } from '../../../lib/db';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return Response.json({ message: 'Email and password required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Look up user in the database
    const rows = await sql`
      SELECT u.id, u.email, u.password_hash, u.name, u.role_key
      FROM users u
      WHERE u.email = ${cleanEmail}
      LIMIT 1
    `;

    if (!rows || rows.length === 0) {
      return Response.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const user = rows[0];

    // Verify password against bcrypt hash
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return Response.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Sign JWT with user info
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        user_id: user.id,
        email:   user.email,
        role_key: user.role_key,
        name:    user.name || user.email,
      },
      secret,
      { expiresIn: '7d' }
    );

    // Set HttpOnly cookie
    const response = Response.json({ success: true, role_key: user.role_key });
    response.headers.set('Set-Cookie', [
      `cumilla-token=${token}`,
      'HttpOnly',
      'Path=/',
      'SameSite=Strict',
      'Max-Age=604800',
      process.env.NODE_ENV === 'production' ? 'Secure' : '',
    ].filter(Boolean).join('; '));

    return response;
  } catch (err) {
    console.error('[Login] Error:', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
