import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/types/supabaseTypes";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is signed in and the current path is / redirect the user to /account
  // if user is not signed in and the current path is not / redirect the user to /
  const { pathname } = new URL(req.url);

  if (
    !user &&
    pathname !== "/sign-in" &&
    pathname !== "/sign-up" &&
    pathname !== "/forgot-password" &&
    pathname !== "/update-password"
  ) {
    return NextResponse.redirect(
      new URL(`/sign-in?redirect=${encodeURIComponent(pathname)}`, req.url)
    );
  } else {
    if (user && (pathname === "/sign-in" || pathname === "/sign-up")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  await supabase.auth.getSession();
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
