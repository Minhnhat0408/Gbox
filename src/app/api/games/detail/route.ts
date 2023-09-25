import { queryGameDetail } from "@/services/server/rawgServerService";
import { NextRequest, NextResponse } from "next/server";

/**
 * /api/detail?id={gameID}
 */

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ status: 404, data: {} });
  }

  const result = await queryGameDetail(id);

  return NextResponse.json(result);
}
