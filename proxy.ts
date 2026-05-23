import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_STREAMS = ["ro", "ru"];
const COOKIE_NAME = "preferred-stream";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export default withAuth(
  function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const stream = pathname.split("/")[1];

    // Set stream preference cookie when visiting a stream page
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
  },
  {
    pages: {
      signIn: "/admin/login",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        // Admin routes require authentication (except /admin/login)
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token;
        }
        // All other routes (stream pages) are public
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/(ro|ru)/:path*", "/admin/((?!login$).*)"],
};
