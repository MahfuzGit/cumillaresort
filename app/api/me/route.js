import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// GET /api/me — return current user info from the HttpOnly cookie
// Like accessing User.Identity in .NET MVC
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('cumilla-token')?.value;

    if (!token) {
      return Response.json({ authenticated: false }, { status: 401 });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return Response.json({
      authenticated: true,
      user: {
        id: payload.user_id,
        email: payload.email,
        role_key: payload.role_key,
        name: payload.name,
      }
    });
  } catch (err) {
    return Response.json({ authenticated: false, message: 'Invalid or expired token' }, { status: 401 });
  }
}
