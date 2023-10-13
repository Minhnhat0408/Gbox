import { getGameMetaData } from "@/actions/getGameMetadata";
import { Database } from "./supabaseTypes";

export type ProfilesType = Database["public"]["Tables"]["profiles"]["Row"];

export type UserGameDataType =
  Database["public"]["Tables"]["user_game_data"]["Row"] & {
    game_meta_data: ReturnType<typeof getGameMetaData>;
  };

export type PostDataType = Database["public"]["Tables"]["posts"]["Row"] & {
  user_meta_data: ProfilesType;
  media: {url:string[]};
  game_meta_data: ReturnType<typeof getGameMetaData>;
  game_progress: string;
};

