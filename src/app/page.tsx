"use client";

import { Button } from "@/components/ui/button";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { supabaseClient } = useSessionContext();

  return (
    <main className="bg-home flex flex-col items-center justify-between w-full min-h-screen p-24 bg-white">
      <Button
        onClick={async () => {
          await supabaseClient.auth.signOut();
          router.push("/sign-in");
        }}
      >
        Log out
      </Button>
    </main>
  );
}
