import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/types/supabaseTypes";
import { tSignInSchema } from "@/app/(auth)/sign-in/page";
import { SignInSchema } from "@/schema/auth-schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData: tSignInSchema = await request.json();
  const result = SignInSchema.safeParse(formData);
  let zodError = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodError = { ...zodError, [issue.path[0]]: issue.message };
    });
    return NextResponse.json({ error: zodError }, { status: 400 });
  }

  const email = formData.email;
  const password = formData.password;
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const res = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return NextResponse.json({ data: res.data, error: res.error });
}
