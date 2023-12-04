"use client";
import { FaInfoCircle } from "react-icons/fa";

import {
  CoachApplicationType,
  SessionApplicationTypeWithProfile,
} from "@/types/supabaseTableType";
import { Button } from "../ui/button";
import { useApplyInformationModal } from "@/hooks/useApplyInformationModa";
import { useSessionRequestModal } from "@/hooks/useSessionRequestModal";

const SeeMoreButton = ({
  data,
}: {
  data: CoachApplicationType | SessionApplicationTypeWithProfile;
}) => {
  const { onOpen } = useApplyInformationModal();

  const { onOpen: openSessionModal } = useSessionRequestModal();

  return (
    <Button
      onClick={() => {
        console.log();

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

export default SeeMoreButton;
