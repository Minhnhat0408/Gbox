"use client";

import { FaInfoCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import { DetailedAppointmentType } from "@/types/supabaseTableType";
import { useAppointmentInformationModal } from "@/hooks/useAppointmentInformationModal";

const ViewMoreButton = ({ data }: { data: DetailedAppointmentType }) => {
  const { onOpen } = useAppointmentInformationModal();

  return (
    <Button
      onClick={() => {
        onOpen(data);
      }}
      className="inline-flex"
      size="sm"
    >
      <FaInfoCircle className="mr-3 text-base" />
      Info
    </Button>
  );
};

export default ViewMoreButton;
