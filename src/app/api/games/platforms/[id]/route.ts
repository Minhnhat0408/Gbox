import { queryPlatformDetail } from "@/services/server/rawgServerService";
import { NextRequest, NextResponse } from "next/server";

type PlatformRouteParams = {
  params: {
    id: string | null;
  };
};

export async function GET(req: NextRequest, { params }: PlatformRouteParams) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ status: 404, data: {} });
  }

  const result = await queryPlatformDetail(id);

  return NextResponse.json(result);
}
