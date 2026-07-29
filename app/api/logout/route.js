// Logout — clear the HttpOnly auth cookie (like .NET SignOut)
export async function POST() {
  const response = Response.json({ success: true });
  response.headers.set('Set-Cookie', [
    'cumilla-token=',
    'HttpOnly',
    'Path=/',
    'SameSite=Strict',
    'Max-Age=0',   // Expire immediately
  ].join('; '));
  return response;
}
