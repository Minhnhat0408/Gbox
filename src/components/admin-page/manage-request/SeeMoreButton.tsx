"use client";
import { FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { CoachApplicationType } from "@/types/supabaseTableType";
import { useAdminViewApplicationModel } from "@/hooks/useAdminViewApplicationModel";

const AdminSeeMoreButton = ({ data }: { data: CoachApplicationType }) => {
  const { onOpen } = useAdminViewApplicationModel();

  return (
    <Button
      onClick={() => {
        onOpen(data);
      }}
      className="inline-flex"
      size={"sm"}
    >
      <FaInfoCircle className="mr-3 text-base" />
      Info
    </Button>
  );
};

export default AdminSeeMoreButton;
