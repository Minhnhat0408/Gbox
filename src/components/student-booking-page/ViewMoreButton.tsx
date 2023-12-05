"use client";

import { FaInfoCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import { StudentRequestTypeWithStudentAndCourse } from "@/types/supabaseTableType";
import { useViewStudentBookingRequestModal } from "@/hooks/useViewStudentBookingRequestModal";

const ViewMoreButton = ({
  requestData,
}: {
  requestData: StudentRequestTypeWithStudentAndCourse;
}) => {
  const { onOpen } = useViewStudentBookingRequestModal();

  return (
    <Button
      onClick={() => {
        onOpen(requestData);
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
