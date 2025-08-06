import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    const { token } = request.nextauth;
    const { pathname } = request.nextUrl;

    // If user is logged in, redirect from login page to their dashboard
    if (token && pathname === "/login") {
      const role = token.role?.toLowerCase();
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }

    // Role-based protection
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    if (pathname.startsWith("/guru") && token?.role !== "GURU") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    if (pathname.startsWith("/siswa") && token?.role !== "SISWA") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  // Match all routes except for static files, api routes, and the auth pages
  matcher: [
    "/admin/:path*",
    "/guru/:path*",
    "/siswa/:path*",
    "/login",
  ],
};
