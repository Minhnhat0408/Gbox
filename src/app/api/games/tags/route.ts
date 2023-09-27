import { queryPopularTag } from "@/services/server/rawgServerService";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await queryPopularTag();

  return NextResponse.json(data);
}
