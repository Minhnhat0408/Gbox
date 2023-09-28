import { queryTagDetail } from "@/services/server/rawgServerService";
import { NextRequest, NextResponse } from "next/server";

type TagRouteParams = {
  params: {
    id: string | null;
  };
};

export async function GET(req: NextRequest, { params }: TagRouteParams) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ status: 404, data: {} });
  }

  const result = await queryTagDetail(id);

  return NextResponse.json(result);
}
