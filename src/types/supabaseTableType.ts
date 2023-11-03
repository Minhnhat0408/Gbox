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
  reactions: ReactionReturnType;
};

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
