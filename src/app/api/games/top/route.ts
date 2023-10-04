import { queryTopGame } from "@/services/server/rawgServerService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const result = await queryTopGame();

  if (result.status === 404)
    return NextResponse.json({ status: 404, data: [] });

  return NextResponse.json({
    status: result.status,
    data: (result.data as any).results.map((e: any) => {
      return {
        name: e.name,
        slug: e.slug,
        background_image: e.background_image,
      };
    }),
  });
}
