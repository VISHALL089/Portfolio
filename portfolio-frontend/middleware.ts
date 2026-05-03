import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if it's an admin dashboard route
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    // Get token from cookies
    const token = request.cookies.get('token')?.value;

    if (!token) {
      // Redirect to login if no token found
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
