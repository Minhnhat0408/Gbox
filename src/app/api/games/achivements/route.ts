import { queryGameAchivement } from "@/services/server/rawgServerService";
import { NextRequest, NextResponse } from "next/server";

// get post from game's subreddit
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ status: 404, data: [] });

  const result = await queryGameAchivement(id);

  if (result.status === 404)
    return NextResponse.json({ status: 404, data: [] });

  return NextResponse.json(result);
}
