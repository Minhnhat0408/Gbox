import { getGameMetaData } from "@/actions/getGameMetadata";
import { Database } from "./supabaseTypes";

export type ProfilesType = Database["public"]["Tables"]["profiles"]["Row"];

export type UserGameDataType =
  Database["public"]["Tables"]["user_game_data"]["Row"] & {
    game_meta_data: ReturnType<typeof getGameMetaData>;
  };

export type ReactionsType = Database["public"]["Tables"]["reactions"]["Row"];
export type PostDataType = Database["public"]["Tables"]["posts"]["Row"] & {
  user_meta_data: ProfilesType;
  media: { url: string[] };
  game_meta_data: ReturnType<typeof getGameMetaData>;
  reactions:ReactionsType[]
};

export type UserGameUpdateType =
  Database["public"]["Tables"]["user_game_data"]["Row"] & {
    game_meta_data: ReturnType<typeof getGameMetaData>;
  };
