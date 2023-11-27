import { queryGameDetailBySlug } from "@/services/server/ignServerService";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (!slug) {
    return new NextResponse("Slug is missing", {
      status: 400,
    });
  }

  const result = await queryGameDetailBySlug(slug);

  return NextResponse.json(result);
}
