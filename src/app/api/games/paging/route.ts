import { queryPagingGames} from "@/services/server/rawgServerService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, currentPage, pageSize } = await req.json();

  const result = await queryPagingGames(name, currentPage, pageSize);

  if (result.status === 404)
    return NextResponse.json({ status: 404, data: [] });

  return NextResponse.json(result);
}
