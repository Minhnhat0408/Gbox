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

  const { userDetails } = useUser();

  return (
    <Modal
      isOpen={isOpen || isPosting}
      onChange={onChange}
      className="max-w-[900px] bg-layout pt-7 pb-7 px-9 !rounded-3xl remove-button"
    >
      <DialogHeader>
        <div className="gap-x-3 flex">
          <Avatar className="w-[90px] h-[90px] border-solid border-4 border-primary">
            <AvatarImage
              className="object-cover object-center w-auto h-full"
              src={userDetails?.avatar || "/avatar.jpg"}
            />
            <AvatarFallback>{userDetails?.name || "X"}</AvatarFallback>
          </Avatar>
          <div className="gap-y-4 flex flex-col justify-center">
            <DialogTitle>{userDetails?.name}</DialogTitle>
            <div className="gap-x-4 flex justify-center">
              <Select
                onValueChange={(e: GameProgress) => {
                  setProgress(e);
                }}
              >
                <SelectTrigger className="w-[158px] h-[48px] rounded-xl">
                  <SelectValue placeholder="Select progress" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="bg-background">
                    {Object.keys(gameProgress).map((key, index) => {
                      return (
                        <SelectItem
                          key={index}
                          className="bg-background hover:bg-muted flex items-center justify-center w-full"
                          value={key}
                        >
                          <div className="flex items-center justify-between py-[5px]">
                            <span className="w-[80px]">{key}</span>
                            {gameProgress[
                              key as keyof typeof gameProgress
                            ].icon("w-5 h-5", "w-6 h-6 mr-3")}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <SearchPostGame />
            </div>
          </div>
        </div>
      </DialogHeader>
      <PostFormBody />
    </Modal>
  );
}

export default PostFormModal;
