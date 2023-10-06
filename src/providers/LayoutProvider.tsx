"use client";

import SideBarLeft from "@/components/sideBar/sidebar-left";
import SideBarRight from "@/components/sideBar/sidebar-right";
import { usePathname } from "next/navigation";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  // Prevent modal open when SSR
  const pathname = usePathname();

  return (
    <>
      {<SideBarLeft />}
      {children}
      {<SideBarRight />}
    </>
  );
}

export default LayoutProvider;
