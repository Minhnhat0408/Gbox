import "./globals.css";
import type { Metadata } from "next";
import NetworkStatus from "@/components/networkstatus/NetworkStatus";

export const metadata: Metadata = {
  title: "Gbox - Online platform: Connect gamers",
  description:
    "An online platform which connects gamers from all around the globe.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </head>
      <body className="bg-muted ">
        {children}
        <NetworkStatus />
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
