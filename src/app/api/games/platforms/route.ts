import { queryAllPlatform } from "@/services/server/rawgServerService";
import { NextResponse } from "next/server";

/** get all game genres */
export async function GET() {
  const result = await queryAllPlatform();

  return NextResponse.json(result);
}
