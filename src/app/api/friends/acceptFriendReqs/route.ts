import { Database } from "@/types/supabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const sender_id = searchParams.get("id") as string;
  const receiver_id = searchParams.get("receiverID") as string;

  if (!sender_id || !receiver_id || sender_id === receiver_id) {
    return NextResponse.json({ status: 400, data: {message: "invalid input"} });
  }

  const supabaseClient = createRouteHandlerClient<Database>({ cookies });
  const { data, error } = await supabaseClient
  .from('sender_receivers')
  .update({is_accepted: true})
  .eq('sender_id', sender_id)
  .eq('receiver_id', receiver_id)

  return NextResponse.json(data);
}