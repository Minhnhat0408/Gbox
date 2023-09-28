import ModalProviders from "@/providers/ModalProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

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
      {/* TODO: set up supabase provider + user provider like spotify clone */}
      <body className={poppins.className}>
        <SupabaseProvider>
          {children}
          <ModalProviders />
        </SupabaseProvider>
      </body>
    </html>
  );
}
