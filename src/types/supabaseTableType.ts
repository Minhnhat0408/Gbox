import { getGameMetaData } from "@/actions/getGameMetadata";
import { Database } from "./supabaseTypes";

export type ProfilesType = Database["public"]["Tables"]["profiles"]["Row"];

export type GameMetaData = ReturnType<typeof getGameMetaData>;

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

export type EventReturnType = Database["public"]["Tables"]["events"]["Row"] & {
  profiles: ProfilesType;
  game_meta_data: GameMetaData;
};
