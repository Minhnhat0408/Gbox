import { Database } from "./supabaseTypes";

export type ProfilesType = Database["public"]["Tables"]["profiles"]["Row"];
