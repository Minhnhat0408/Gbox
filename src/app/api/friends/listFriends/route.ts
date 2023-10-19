import { Database } from "@/types/supabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // get user_uuid
  // get status
  // get created_at

  let user_uuid = ""; // To do

  const supabaseClient = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabaseClient
  .from('sender_receivers')
  .select("*")
  .eq("is_accepted", "TRUE")
  .or(`sender_id.eq.${user_uuid},receiver_id.eq.${user_uuid}`)

  return NextResponse.json(data);

}