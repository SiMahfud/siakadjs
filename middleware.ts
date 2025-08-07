import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // 1. The main middleware function that runs after authorization.
  async function middleware(req) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    // @ts-ignore - token.role is a custom property added in the JWT callback.
    const userRole = token?.role;

    // 2. Redirect users who are already logged in from the login page.
    if (token && pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // 3. Enforce role-based access control for admin routes.
    if (token && pathname.startsWith("/dashboard")) {
      const isAdminManagementRoute =
        pathname.startsWith("/dashboard/guru") ||
        pathname.startsWith("/dashboard/siswa");

      // If a non-admin user tries to access an admin management route...
      if (isAdminManagementRoute && userRole !== "ADMIN") {
        // ...redirect them to the main dashboard page.
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // 4. If no special conditions are met, proceed with the request.
    return NextResponse.next();
  },
  // 5. Configuration for the `withAuth` middleware helper.
  {
    callbacks: {
      // This callback determines if the user is authorized.
      // It runs before the main middleware function above.
      authorized: ({ token }) => !!token,
    },
    pages: {
      // Specifies the login page, so unauthorized users are redirected there.
      signIn: "/login",
    },
  }
);

// 6. The matcher applies this middleware to specific paths.
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
