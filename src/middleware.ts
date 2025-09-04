import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("cpnx_t")?.value;
  const { pathname } = request.nextUrl;
  if (!token && !["/login", "/sign-up"].includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token && ["/login", "/sign-up"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/sign-up"],
};
