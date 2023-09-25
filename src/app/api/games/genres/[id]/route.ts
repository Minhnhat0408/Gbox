import { queryGenreDetail } from "@/services/server/rawgServerService";
import { NextRequest, NextResponse } from "next/server";

type GenresRouteParams = {
  params: {
    id: string | null;
  };
};

export async function GET(req: NextRequest, { params }: GenresRouteParams) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ status: 404, data: {} });
  }

  const result = await queryGenreDetail(id);

  return NextResponse.json(result);
}
