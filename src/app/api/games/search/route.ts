import { querySearchGames } from "@/services/server/rawgServerService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const result = await querySearchGames(query);

  if (result.status === 404)
    return NextResponse.json({ status: 404, data: [] });

  return NextResponse.json(result);
}
