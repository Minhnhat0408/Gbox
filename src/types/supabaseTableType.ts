import { getGameMetaData } from "@/actions/getGameMetadata";
import { Database } from "./supabaseTypes";

export type ProfilesType = Database["public"]["Tables"]["profiles"]["Row"];

export type UserGameDataType =
  Database["public"]["Tables"]["user_game_data"]["Row"] & {
    game_meta_data: ReturnType<typeof getGameMetaData>;
  };

export type PostDataType = Database["public"]["Tables"]["posts"]["Row"] & {
  profiles: ProfilesType;
  media: { url: string[]; type: "video" | "image" };
  game_meta_data: ReturnType<typeof getGameMetaData>;
  game_progress: string;
};

export type UserGameUpdateType =
  Database["public"]["Tables"]["user_game_data"]["Row"] & {
    game_meta_data: ReturnType<typeof getGameMetaData>;
  };
