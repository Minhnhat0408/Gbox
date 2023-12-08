import { SessionApplicationTypeWithProfile } from "@/types/supabaseTableType";
import uuid from "react-uuid";

export default function createSessionApproveNotification(
  data: SessionApplicationTypeWithProfile,
  message: string,
  type: string
) {
  return {
    id: uuid() + "_" + data.profiles.id + "_" + type,
    created_at: new Date(),
    content: message,
    link_to: `/request-history`,
    sender_id: data.profiles.id,
    receiver_id: data.profiles.id,
    notification_type: type,
    notification_meta_data: {
      sender_avatar: data.profiles.avatar,
      sender_name: data.profiles.name,
    },
  };
}
