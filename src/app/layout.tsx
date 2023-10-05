import ModalProviders from "@/providers/ModalProvider";
import "./globals.css";
import type { Metadata } from "next";
import SupabaseProvider from "@/providers/SupabaseProvider";
import SideBarLeft from "@/components/sidebar-left";
export const metadata: Metadata = {
  title: "Gbox - Online platform: Connect gamers",
  description:
    "An online platform which connects gamers from all around the globe.",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    images: ["/login-bg.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* TODO: set up supabase provider + user provider like spotify clone */}
      <body>
        <SupabaseProvider>
        <SideBarLeft/>{children}
          <ModalProviders />
        </SupabaseProvider>
      </body>
    </html>
  );
}
