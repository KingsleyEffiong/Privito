import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const customToken = req.cookies.get("session")?.value;
  const isAuthenticated = !!customToken;

  const { pathname } = req.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isLoginPage = pathname === "/login";

  // 🔒 Block unauthenticated access to dashboard
  if (!isAuthenticated && isDashboardRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Redirect authenticated users away from login page
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // or /dashboard/post
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
