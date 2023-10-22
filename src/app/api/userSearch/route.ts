import { Database } from "@/types/supabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { profile } from "console";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const searchWord = searchParams.get("query");
  const userID = searchParams.get("id");
  const guessID = searchParams.get("guessID");

  if (!userID) {
    return NextResponse.json({ status: 500, data: {} });
  }
  const supabaseClient = createRouteHandlerClient({ cookies });
  
  const { data, error } = await supabaseClient.rpc(
    "get_friend_request_status",
    {
      searchword: searchWord,
      currentuserid: userID,
    }
  );
  console.log(data, error);

  if (error) {
    console.error(error);
    return NextResponse.json({ status: 500, data: {} });
  }
  return NextResponse.json(data);
}