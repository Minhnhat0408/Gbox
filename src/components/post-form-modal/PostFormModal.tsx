import { usePostFormModal } from "@/hooks/usePostFormModal";
import Modal from "../modals/Modal";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { useUser } from "@/hooks/useUser";
import gameProgress from "@/constants/progress";
import { AvatarImage, AvatarFallback, Avatar } from "../ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import { SearchPostGame } from "./SearchPostGame";
import PostFormBody from "./PostFormBody";
import { GameProgress } from "@/types/gameProgressType";
import { useEffect } from "react";
import { useSearchGameForm } from "@/hooks/useSearchGameForm";
import PostFormHeader from "./PostFormHeader";

function PostFormModal() {
  const { isOpen, onClose, setProgress, reset, isPosting } = usePostFormModal(
    (set) => set
  );

  const { reset: resetGameData } = useSearchGameForm();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
      resetGameData();
    }
  }, [isOpen]);


  return (
    <Modal
      isOpen={isOpen || isPosting}
      onChange={onChange}
      className="max-w-[900px] bg-layout pt-7 pb-7 px-9 !rounded-3xl remove-button"
    >
      <PostFormHeader />
      <PostFormBody />
    </Modal>
  );
}

export default PostFormModal;
