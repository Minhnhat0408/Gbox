import { Database } from "@/types/supabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const sender_id = searchParams.get("id") as string;
  const sender_name = searchParams.get("username") as string;
  const receiver_id = searchParams.get("receiverID") as string;
  const sender_avatar = searchParams.get("avatar") as string;

  if (!sender_id || !receiver_id || sender_id === receiver_id) {
    return NextResponse.json({
      status: 400,
      data: { message: "invalid input" },
    });
  }

  const supabaseClient = createRouteHandlerClient<Database>({ cookies });
  const sendFriendReq = supabaseClient
    .from("sender_receivers")
    .upsert({ sender_id, receiver_id })
    .select("*");

  const sendNotificationReq = supabaseClient.from("notifications").insert({
    id: `${sender_id}-${receiver_id}-friend-req`,
    content: `${sender_name} has sent you a friend request`,
    link_to: `/user/${sender_id}`,
    sender_id: sender_id,
    receiver_id: receiver_id,
    notification_type: "add_friend",
    notification_meta_data: {
      sender_name: sender_name,
      sender_avatar: sender_avatar,
    },
    is_readed: false,
  });

  const [friendReq, notificationReq] = await Promise.all([
    sendFriendReq,
    sendNotificationReq,
  ]);

  return NextResponse.json(friendReq.data);
}
