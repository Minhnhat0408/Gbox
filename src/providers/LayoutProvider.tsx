"use client";

import SideBarLeft from "@/components/sidebar-left";
import SideBarRight from "@/components/sidebar-right";
import { usePathname } from "next/navigation";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  // Prevent modal open when SSR
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/sign-in" && pathname !== "/sign-up" && <SideBarLeft />}
      {children}
      {pathname !== "/sign-in" && pathname !== "/sign-up" && <SideBarRight />}
    </>
  );
}

export default LayoutProvider;
