import { queryIGNSearchGame } from "@/services/server/ignServerService";
import { NextRequest, NextResponse } from "next/server";

/**
 * /api/detail?id={gameID}
 */

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const word = searchParams.get("word");

  if (!word) {
    return NextResponse.json({ status: 400, data: {} });
  }

  const result = await queryIGNSearchGame(word, 20, 0);

  return NextResponse.json(result);
}
