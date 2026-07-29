import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

// ───────────────────────────────────────────────
// Middleware — runs BEFORE any page renders
// This is the Next.js equivalent of [Authorize] in .NET MVC
// ───────────────────────────────────────────────

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow login page and API routes through (they handle their own auth)
  if (pathname === '/admin/login' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Read the HttpOnly cookie
  const token = request.cookies.get('cumilla-token')?.value;

  if (!token) {
    // No token → redirect to login (like .NET returning 302 to /Account/Login)
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    // Verify the JWT signature and expiry
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Attach user info to request headers so server components can read it
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.user_id || '');
    response.headers.set('x-user-role', payload.role_key || '');
    response.headers.set('x-user-email', payload.email || '');
    return response;
  } catch (err) {
    // Invalid or expired token → redirect to login
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    // Clear the bad cookie
    response.cookies.delete('cumilla-token');
    return response;
  }
}

// Only protect /admin/* routes (public pages remain open)
export const config = {
  matcher: ['/admin/:path*'],
};
