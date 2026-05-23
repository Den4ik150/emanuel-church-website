import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_STREAMS = ["ro", "ru"];
const COOKIE_NAME = "preferred-stream";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const stream = pathname.split("/")[1];

  // If visiting a stream page — save the preference
  if (VALID_STREAMS.includes(stream)) {
    const response = NextResponse.next();
    response.cookies.set(COOKIE_NAME, stream, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(ro|ru)/:path*"],
};
