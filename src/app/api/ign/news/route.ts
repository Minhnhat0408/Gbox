import { queryIGNNewsOverall } from "@/services/server/ignServerService";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await queryIGNNewsOverall();

  return NextResponse.json(result);
}
