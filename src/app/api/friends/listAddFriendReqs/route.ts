import { Database } from "@/types/supabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // get user_uuid
  // get status
  // get created_at

  const searchParams = req.nextUrl.searchParams;
  const user_id = searchParams.get("id") as string;

  const supabaseClient = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabaseClient
  .from('sender_receivers')
  .select("*")
  .eq("is_accepted", "FALSE")
  .eq("receiver_id",`${user_id}`)

  return NextResponse.json(data);
}