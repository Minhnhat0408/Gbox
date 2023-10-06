import SideBarLeft from "@/components/sideBar/sidebar-left";
import SideBarRight from "@/components/sideBar/sidebar-right";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {<SideBarLeft />}
      {children}
      {<SideBarRight />}
    </>
  );
}

export default LayoutProvider;
