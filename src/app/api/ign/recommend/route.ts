import { queryIGNGameRecommend } from "@/services/server/ignServerService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const result = await queryIGNGameRecommend();

  return NextResponse.json(result);
}
