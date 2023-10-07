import { queryIGNSearchGame } from "@/services/server/ignServerService";
import { NextRequest, NextResponse } from "next/server";

/**
 * /api/word?word={word}&limit={limit}&startIndex={startIndex}
 */

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const word = searchParams.get("word");
  const limit = parseInt(searchParams.get("limit") as string) | 20;
  const startIndex = parseInt(searchParams.get("startIndex") as string) | 0;

  if (!word) {
    return NextResponse.json({ status: 400, data: {} });
  }

  const result = await queryIGNSearchGame(word, limit, startIndex);

  return NextResponse.json(result);
}
