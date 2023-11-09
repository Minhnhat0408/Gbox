import ModalProviders from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import SideBarLeft from "@/components/sideBar/sidebar-left";
import SideBarRight from "@/components/sideBar/sidebar-right";
import Headers from "@/components/header/Headers";
import { Toaster } from "sonner";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupabaseProvider>
      <UserProvider>
        <ModalProviders />
        <SideBarLeft />
        <main className="bg-home xl:px-32 relative w-full min-h-screen px-24 pt-3">
          <Headers />
          {children}
        </main>
        <SideBarRight />
      </UserProvider>
    </SupabaseProvider>
  );
}
