import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // Create the response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set COOP header specifically for Google OAuth
  response.headers.set(
    "Cross-Origin-Opener-Policy",
    "same-origin-allow-popups",
  );
  response.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none");

  // For Google OAuth redirects, use more relaxed COOP
  if (
    request.nextUrl.searchParams.has("access_token") ||
    request.nextUrl.hash.includes("access_token")
  ) {
    response.headers.set("Cross-Origin-Opener-Policy", "unsafe-none");
  }

  // Set CSP header with proper syntax
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com https://www.gstatic.com https://ssl.gstatic.com https://www.google.com https://www.googleapis.com blob: data:",
    "frame-src https://accounts.google.com https://content.googleapis.com",
    "connect-src 'self' https://accounts.google.com https://www.googleapis.com https://content.googleapis.com",
    "img-src 'self' data: https:",
    "style-src 'self' 'unsafe-inline' https://accounts.google.com",
    "font-src 'self' data: https:",
    "object-src 'none'",
    "base-uri 'self'",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
