"use client";
import { FaInfoCircle } from "react-icons/fa";

import { CoachApplicationType } from "@/types/supabaseTableType";
import { Button } from "../ui/button";
import { useApplyInformationModal } from "@/hooks/useApplyInformationModa";

const SeeMoreButton = ({ data }: { data: CoachApplicationType }) => {
  const { onOpen } = useApplyInformationModal();

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

export default SeeMoreButton;
