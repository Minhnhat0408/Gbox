import { getGameMetaData } from "@/actions/getGameMetadata";
import { Database } from "./supabaseTypes";

export type ProfilesType = Database["public"]["Tables"]["profiles"]["Row"];

export type UserGameDataType =
  Database["public"]["Tables"]["user_game_data"]["Row"] & {
    game_meta_data: ReturnType<typeof getGameMetaData>;
  };

export type ReactionsType = Database["public"]["Tables"]["reactions"]["Row"];
export type PostDataType = Database["public"]["Tables"]["posts"]["Row"] & {
  profiles: ProfilesType;
  media: { url: string[]; type: "video" | "image" };
  game_meta_data: ReturnType<typeof getGameMetaData>;
  reactions: ReactionReturnType,
  comments: {count: number}[]
};

export type CommentType = Database["public"]["Tables"]["comments"]["Row"] & {
  profiles: ProfilesType;
  media: { url: string; type: "video" | "image" };
}
export type ReactionReturnType = (ReactionsType & {profiles:ProfilesType})[]

export type UserGameUpdateType =
  Database["public"]["Tables"]["user_game_data"]["Row"] & {
    game_meta_data: ReturnType<typeof getGameMetaData>;
  };

  