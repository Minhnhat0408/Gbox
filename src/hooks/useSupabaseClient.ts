import { Database } from "@/types/supabaseTypes";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function useSupabase() {
  return useSupabaseClient<Database>();
}
