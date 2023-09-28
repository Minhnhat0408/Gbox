import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // const res = NextResponse.next();
  // const supabase = createMiddlewareClient({ req, res });
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // console.log("user", user);
  // // if user is not signed in and the current path is not / redirect the user to /
  // // if (!user) {
  // //   return NextResponse.redirect(new URL("/sign-in", req.url));
  // // }
  // // await supabase.auth.getSession();
  // return res;
}

export const config = {
  matcher: ["/", "/account"],
};
