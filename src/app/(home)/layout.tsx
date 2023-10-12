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
import { Toaster } from "sonner";
// import { TanstackQueryProvider } from "@/providers/TanstackQueryProvider";

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
      {/* <TanstackQueryProvider> */}
      <UserProvider>
        <ModalProviders />
        <SideBarLeft />
        <main className="bg-home xl:px-32 w-full min-h-screen px-24 pt-6">
          <Headers userInformation={data} />
          {children}
        </main>
        <SideBarRight />
        <Toaster richColors theme="dark" />
      </UserProvider>
      {/* </TanstackQueryProvider> */}
    </SupabaseProvider>
  );
}
