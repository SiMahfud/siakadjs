import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth'; // Import from auth.ts

export async function middleware(req: NextRequest) {
  const session = await auth(); // Get the session
  const { pathname } = req.nextUrl;

  // Check if user is trying to access login page while logged in
  if (session && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Check if user is trying to access a protected route without a session
  if (!session && pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url); // Add callbackUrl
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control
  if (session && pathname.startsWith('/dashboard')) {
    const isAdminManagementRoute =
      pathname.startsWith('/dashboard/guru') ||
      pathname.startsWith('/dashboard/siswa');

    // @ts-ignore - session.user.role is a custom property
    if (isAdminManagementRoute && session.user?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths starting with:
     * - /dashboard
     * - /login
     */
    "/dashboard/:path*",
    "/login",
  ],
};
