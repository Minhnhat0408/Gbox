import { Database } from "@/types/supabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const nameUser = searchParams.get("name");

  if (!nameUser) {
    return NextResponse.json({ status: 400, data: {} });
  }

  const supabaseClient = createRouteHandlerClient<Database>({ cookies });
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .ilike("name", `${nameUser}%`);

  return NextResponse.json(data);
}