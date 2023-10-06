import ModalProviders from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabaseTypes";
import SideBarLeft from "@/components/sideBar/sidebar-left";
import SideBarRight from "@/components/sideBar/sidebar-right";
import { ProfilesType } from "@/types/supabaseTableType";
import Headers from "@/components/header/Headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = (await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single()) as { data: ProfilesType; error: any };

  return (
    <SupabaseProvider>
      <UserProvider>
        <ModalProviders />
        <SideBarLeft />
        <main className="bg-home w-full min-h-screen px-32 pt-6">
          <Headers userInformation={data} />
          {children}
        </main>
        <SideBarRight />
      </UserProvider>
    </SupabaseProvider>
  );
}
