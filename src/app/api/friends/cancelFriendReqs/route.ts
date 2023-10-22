import { Database } from "@/types/supabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // get user_uuid
  // get status
  // get created_at

  const searchParams = req.nextUrl.searchParams;
  const sender_id = searchParams.get("id") as string;
  const receiver_id = searchParams.get("receiverID") as string;

  const supabaseClient = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabaseClient
  .from('sender_receivers')
  .delete()
  .eq("sender_id", sender_id)
  .eq("receiver_id", receiver_id)

  return NextResponse.json(data);

}