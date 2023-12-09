"use client";
import { FaInfoCircle } from "react-icons/fa";

import {
  CoachApplicationType,
  SessionApplicationTypeWithProfile,
  StudentRequestTypeWithStudentAndCourse,
} from "@/types/supabaseTableType";
import { Button } from "../ui/button";
import { useApplyInformationModal } from "@/hooks/useApplyInformationModa";
import { useSessionRequestModal } from "@/hooks/useSessionRequestModal";
import { useJoinSessionRequestModal } from "@/hooks/useJoinSessionRequestModal";

const SeeMoreButton = ({
  data,
}: {
  data:
    | CoachApplicationType
    | SessionApplicationTypeWithProfile
    | StudentRequestTypeWithStudentAndCourse;
}) => {
  const { onOpen } = useApplyInformationModal();

  const { onOpen: openSessionModal } = useSessionRequestModal();

  const { onOpen: openJoinSessionRequestModal } = useJoinSessionRequestModal();

  return (
    <Button
      onClick={() => {
        if (!!(data as CoachApplicationType).coach_games) {
          return onOpen(data as CoachApplicationType);
        }
        if (
          !!(data as StudentRequestTypeWithStudentAndCourse).request_user_id
        ) {
          return openJoinSessionRequestModal(
            data as StudentRequestTypeWithStudentAndCourse
          );
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
