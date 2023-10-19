import { Database } from "@/types/supabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // get sender_uuid
  // get receiver_uuid
  // get status
  // get created_at
  
  // let sender_uuid = "";
  // let receiver_uuid = "";
  // sender !== receiver

  // Test
  const supabaseClient = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabaseClient
  .from('sender_receivers')
  .insert({sender_id:"", receiver_id:""})

  return NextResponse.json(data);
}