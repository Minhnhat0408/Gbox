"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabaseTypes";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

// can using this to call some supabase methods
// const supabaseclient = useSupabaseClient();
// const { session } = useSessionContext();

function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [supabaseClient, setSupabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}

export default SupabaseProvider;
