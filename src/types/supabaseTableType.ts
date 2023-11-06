import { getGameMetaData } from "@/actions/getGameMetadata";
import { Database } from "./supabaseTypes";

export type PlayTime = {
  time: string;
  type: string;
};

export type ProfilesType = Database["public"]["Tables"]["profiles"]["Row"] & {
  play_time: PlayTime[];
};

export type GameMetaData = {
  platform: string[];
  image: string;
  url: string;
  shortName: string;
  name: string;
  producer: string | undefined;
  releaseDate: string | null;
  slug: string;
};

export type UserGameDataType =
  Database["public"]["Tables"]["user_game_data"]["Row"] & {
    game_meta_data: GameMetaData;
  };

export type ReactionsType = Database["public"]["Tables"]["reactions"]["Row"];
export type PostDataType = Database["public"]["Tables"]["posts"]["Row"] & {
  profiles: ProfilesType;
  media: { url: string[]; type: "video" | "image" };
  game_meta_data: GameMetaData;
  comments: {count: number}[]
};

export type CommentType = Database["public"]["Tables"]["comments"]["Row"] & {
  profiles: ProfilesType;
  media: { url: string; type: "video" | "image" };
  reactions: ReactionsType;[] | [];
}

export type ReactionReturnType = (ReactionsType & { profiles: ProfilesType })[];

export type UserGameUpdateType =
  Database["public"]["Tables"]["user_game_data"]["Row"] & {
    game_meta_data: GameMetaData;
  };

export type EventParticipationsType =
  Database["public"]["Tables"]["event_participations"]["Row"];

export type EventParticipationsDetailType = EventParticipationsType & {
  profiles: ProfilesType;
};

export type EventReturnType = Database["public"]["Tables"]["events"]["Row"] & {
  profiles: ProfilesType;
  game_meta_data: GameMetaData;
  event_participations: EventParticipationsDetailType[];
};

export type EventDetailType = Database["public"]["Tables"]["events"]["Row"];

export type NotificationsProps =
  Database["public"]["Tables"]["notifications"]["Row"];

export type NotificationType =
  | "add_friend"
  | "accepted_friend"
  | "like_post"
  | "reply_comment"
  | "like_comment"
  | "event_invite"
  | "event_notify";

export type EventInviteMetadataType = {
  event_id: string;
  sender_name: string;
  sender_avatar: string;
  is_accepted?: boolean;
};

export type EventInviteNotificationType = NotificationsProps & {
  notification_meta_data: EventInviteMetadataType;
  notification_type: "event_invite";
};

// this will be the latest information of the joined person
export type EventNotifyMetadataType = {
  event_id: string;
  sender_name: string;
  sender_avatar: string;
  total_participations?: number;
};

// id of the event will have format of yourID-eventID-event_notify
// how event notify will work
// 1. when user hit join button, check if how many notification have made with the link_to = event/eventID
// 2. Check the amount of notification relate to the eventID
// 3a. - If there is no notification, create a individual notification for that user
//     - Notification = user has join your "event_name" event
// 3b. - If there is >= 3 notification, create a group notification for that user
//     - Notification = user and total_participations other people has join your "event_name" event
export type EventNotifyNotificationType = NotificationsProps & {
  notification_meta_data: EventNotifyMetadataType;
  notification_type: "event_notify";
};
