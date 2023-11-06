import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
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

  // wating 3
  // accepting 2
  //unfriend 4
  // friend 1

  const supabaseClient = createRouteHandlerClient({ cookies });

  const { data, error } = await supabaseClient.rpc(
    "get_friend_request_status",
    {
      searchword: searchWord,
      currentuserid: userID,
    }
  );

  if (error) {
    console.error(error);
    return NextResponse.json({ status: 500, data: {} });
  }
  return NextResponse.json(data);
}
