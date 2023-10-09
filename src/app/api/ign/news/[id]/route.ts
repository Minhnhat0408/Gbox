import { queryIGNNewsForGame } from "@/services/server/ignServerService";
import { NextRequest, NextResponse } from "next/server";

type GameNewsParams = {
  params: {
    id: string | null;
  };
};

export async function GET(req: NextRequest, { params }: GameNewsParams) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ status: 404, data: {} });
  }

  const result = await queryIGNNewsForGame(id, 0, 12);

  return NextResponse.json(result);
}
