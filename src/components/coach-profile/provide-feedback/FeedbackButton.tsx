"use client";

import { Button } from "@/components/ui/button";
import { useProvideFeedbackModal } from "@/hooks/useProvideFeedbackModal";
import { MdRateReview } from "react-icons/md";
import ProvideFeedbackModal from "./ProvideFeedbackModel";

const FeedbackButton = () => {
  const { onOpen } = useProvideFeedbackModal();

  return (
    <>
      <ProvideFeedbackModal />
      <Button
        onClick={() => {
          onOpen();
        }}
        className="flex items-center flex-1"
        variant={"outline"}
      >
        <MdRateReview className="mr-3" />
        Write Feedback
      </Button>
    </>
  );
};

export default FeedbackButton;
