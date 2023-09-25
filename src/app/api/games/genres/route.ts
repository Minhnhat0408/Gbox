import { getAllGameGenres } from "@/services/server/rawgServerService";
import { NextRequest, NextResponse } from "next/server";

/** get all game genres */
export async function GET(req: NextRequest) {
  const result = await getAllGameGenres();

  return NextResponse.json(result);
}
