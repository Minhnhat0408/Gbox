import ModalProviders from "@/providers/ModalProvider";
import "./globals.css";
import type { Metadata } from "next";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";

export const metadata: Metadata = {
  title: "Gbox - Online platform: Connect gamers",
  description:
    "An online platform which connects gamers from all around the globe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <UserProvider>
            <ModalProviders />
            {children}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
