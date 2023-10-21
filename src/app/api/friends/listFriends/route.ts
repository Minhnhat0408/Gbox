import { Database } from "@/types/supabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  
  const searchParams = req.nextUrl.searchParams;
  const sender_id = searchParams.get("id") as string;

  const supabaseClient = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabaseClient
  .from('sender_receivers')
  .select("*")
  .eq("is_accepted", "TRUE")
  .or(`sender_id.eq.${sender_id},receiver_id.eq.${sender_id}`)

  return NextResponse.json(data);

}