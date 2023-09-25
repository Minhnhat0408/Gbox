import { searchGames } from "@/services/server/rawgServerService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const result = await searchGames(query);

  if (result.status === 404) return NextResponse.json({ result: [] });

  return NextResponse.json({ result: result.data });
}
