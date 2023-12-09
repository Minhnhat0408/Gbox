"use client";
import { FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  CoachApplicationType,
  SessionApplicationTypeWithProfile,
} from "@/types/supabaseTableType";
import { useAdminViewApplicationModel } from "@/hooks/useAdminViewApplicationModel";
import { useAdminViewSessionRequestModal } from "@/hooks/useAdminViewSessionRequestModal";

const AdminSeeMoreButton = ({
  data,
}: {
  data: CoachApplicationType | SessionApplicationTypeWithProfile;
}) => {
  const { onOpen } = useAdminViewApplicationModel();

  const { onOpen: openSessionModal } = useAdminViewSessionRequestModal();

  return (
    <Button
      onClick={() => {
        if (!!(data as CoachApplicationType).coach_games) {
          return onOpen(data as CoachApplicationType);
        }
        openSessionModal(data as SessionApplicationTypeWithProfile);
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
