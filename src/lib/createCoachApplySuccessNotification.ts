import { CoachApplicationType } from "@/types/supabaseTableType";

export default function createCoachApplySuccessNotification(
  data: CoachApplicationType
) {
  return {
    id: data.profiles.id + "_" + "coach_apply_accepted",
    created_at: new Date(),
    content:
      "Your coach application has been accepted. Welcome to Gbox Coach Platform! 🏆🏆🏆",
    link_to: `/coach/${data.profiles.name}`,
    sender_id: data.profiles.id,
    receiver_id: data.profiles.id,
    notification_type: "coach_apply_accepted",
    notification_meta_data: {
      sender_avatar: data.profiles.avatar,
      sender_name: data.profiles.name,
    },
  };
}
