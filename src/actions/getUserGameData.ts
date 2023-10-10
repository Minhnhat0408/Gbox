"use client";

import { UserGameDataType } from "@/types/supabaseTableType";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getUserGameData(
  userID: string | undefined
): Promise<UserGameDataType[]> {
  if (!userID) return [];

  const supabaseClient = createClientComponentClient();

  // sort by released date descending
  const { data, error } = await supabaseClient
    .from("user_game_data")
    .select("*")
    .eq("user_id", userID)
    .order("modified_date", { ascending: false });

  if (error) return [];

  return data as UserGameDataType[];
}
