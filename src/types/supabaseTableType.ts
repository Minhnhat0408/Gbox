import { getGameMetaData } from "@/actions/getGameMetadata";
import { Database } from "./supabaseTypes";

export type ProfilesType = Database["public"]["Tables"]["profiles"]["Row"] & {
  play_time: {time:string,type: "AM" | "PM"}[] | null;
};

export type UserGameDataType =
  Database["public"]["Tables"]["user_game_data"]["Row"] & {
    game_meta_data: ReturnType<typeof getGameMetaData>;
  };

export type ReactionsType = Database["public"]["Tables"]["reactions"]["Row"];
export type PostDataType = Database["public"]["Tables"]["posts"]["Row"] & {
  profiles: ProfilesType;
  media: { url: string[]; type: "video" | "image" };
  game_meta_data: ReturnType<typeof getGameMetaData>;
  comments: {count: number}[]

};

export type CommentType = Database["public"]["Tables"]["comments"]["Row"] & {
  profiles: ProfilesType;
  media: { url: string; type: "video" | "image" } | null;
  reactions: ReactionsType[] | [];
}

export type ReactionReturnType = (ReactionsType & {profiles:ProfilesType})[]

export type UserGameUpdateType =
  Database["public"]["Tables"]["user_game_data"]["Row"] & {
    game_meta_data: ReturnType<typeof getGameMetaData>;
  };

export type MessageType = Omit<Database["public"]["Tables"]["messages"]["Row"],'media' | 'application' > & {
  media: { url: string; type: "video" | "image" }[] | null;
  application: { name: string; url:string,type:string } | null;
}