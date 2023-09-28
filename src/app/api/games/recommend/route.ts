import { querySimilarGame } from "@/services/server/rawgServerService";
import { NextRequest, NextResponse } from "next/server";

// get similar game to current game
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ status: 404, data: [] });

  const result = await querySimilarGame(id);

  if (result.status === 404)
    return NextResponse.json({ status: 404, data: [] });

  return NextResponse.json(result);
}
