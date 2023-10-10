import { queryIGNNewsOverall } from "@/services/server/ignServerService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const startIndex = parseInt(searchParams.get("startIndex") || "0")
  const count = parseInt(searchParams.get("count") || "10")

  const result = await queryIGNNewsOverall(startIndex, count);

  return NextResponse.json(result);
}
