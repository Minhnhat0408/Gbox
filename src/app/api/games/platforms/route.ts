import { getAllPlatform } from "@/services/server/rawgServerService";
import { NextResponse } from "next/server";

/** get all game genres */
export async function GET() {
  const result = await getAllPlatform();

  return NextResponse.json(result);
}
