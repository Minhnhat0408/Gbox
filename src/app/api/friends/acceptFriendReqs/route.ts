import { Database } from "@/types/supabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const sender_id = searchParams.get("id") as string;
  const sender_name = searchParams.get("username") as string;
  const sender_avatar = searchParams.get("avatar") as string;
  const receiver_id = searchParams.get("receiverID") as string;
  const receiver_name = searchParams.get("receiverName") as string;
  const receiver_avatar = searchParams.get("receiverAvatar") as string;

  if (!sender_id || !receiver_id || sender_id === receiver_id) {
    return NextResponse.json({
      status: 400,
      data: { message: "invalid input" },
    });
  }

  const supabaseClient = createRouteHandlerClient<Database>({ cookies });
  const acceptFriendReq = supabaseClient
    .from("sender_receivers")
    .update({ is_accepted: true })
    .eq("sender_id", sender_id)
    .eq("receiver_id", receiver_id);

  const sendNotification = supabaseClient.from("notifications").insert([
    {
      id: `${sender_id}-${receiver_id}-friend-req-accepted`,
      content: `${receiver_name} has accepted your friend request`,
      link_to: `/user/${receiver_id}`,
      sender_id: receiver_id,
      receiver_id: sender_id,
      notification_type: "accepted_friend",
      notification_meta_data: {
        sender_name: receiver_name,
        sender_avatar: receiver_avatar,
      },
    },
    {
      id: `${receiver_id}-${sender_id}-friend-req-accepted`,
      content: `You and ${sender_name} are now friends`,
      link_to: `/user/${sender_id}`,
      sender_id: sender_id,
      receiver_id: receiver_id,
      notification_type: "accepted_friend",
      notification_meta_data: {
        sender_name: sender_name,
        sender_avatar: sender_avatar,
      },
    },
  ]);

  const deleteOldNotification = supabaseClient
    .from("notifications")
    .delete()
    .eq("id", `${sender_id}-${receiver_id}-friend-req`);

  const [friendReq, notification, updateNotify] = await Promise.all([
    acceptFriendReq,
    sendNotification,
    deleteOldNotification,
  ]);

  return NextResponse.json(friendReq.data);
}
