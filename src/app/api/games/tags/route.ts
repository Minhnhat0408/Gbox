import { getPopularTag } from "@/services/server/rawgServerService";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getPopularTag();

  return NextResponse.json(data);
}
