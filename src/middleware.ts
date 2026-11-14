import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isMaintenance =
    process.env.MAINTENANCE_MODE === "true" ||
    process.env.MAINTENANCE_MODE === "1" ||
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true" ||
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "1";

  const { pathname, searchParams } = request.nextUrl;

  // If maintenance mode is OFF:
  if (!isMaintenance) {
    // If a visitor directly accesses /maintenance when the site is live, redirect to home
    if (pathname === "/maintenance") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // If maintenance mode is ON:
  // Check bypass secret if configured
  const bypassSecret = process.env.MAINTENANCE_BYPASS_SECRET;
  if (bypassSecret) {
    const querySecret = searchParams.get("bypass");
    const cookieSecret = request.cookies.get("maintenance_bypass")?.value;

    if (querySecret === "clear") {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("maintenance_bypass");
      return response;
    }

    if (querySecret === bypassSecret) {
      const cleanUrl = new URL(request.url);
      cleanUrl.searchParams.delete("bypass");
      const response = NextResponse.redirect(cleanUrl);
      response.cookies.set("maintenance_bypass", bypassSecret, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });
      return response;
    }

    if (cookieSecret === bypassSecret) {
      if (pathname === "/maintenance") {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    }
  }

  // If already on /maintenance, allow rendering
  if (pathname === "/maintenance") {
    return NextResponse.next();
  }

  // Rewrite all other requests to /maintenance with 503 status code
  return NextResponse.rewrite(new URL("/maintenance", request.url), {
    status: 503,
    headers: {
      "Retry-After": "3600",
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (e.g. /api/revalidate)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest, logo.svg
     * - static file extensions (svg, png, jpg, jpeg, webp, gif, ico, css, js)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|logo.svg|.*\\.(?:jpg|jpeg|gif|png|svg|webp|ico|css|js)$).*)",
  ],
};
