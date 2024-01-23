"use client";

import { IoChatboxSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import useFriendMessages from "@/hooks/useFriendMessages";
import { useCoachProfile } from "@/hooks/useCoachDetail";
import { MessageHeadType } from "@/types/supabaseTableType";
import useMessageBox from "@/hooks/useMessageBox";

export default function CoachChatButton() {
  const { onOpen, isOpen, setMessageHeads, messageHeads } = useFriendMessages();
  const { setCurrentMessage } = useMessageBox((set) => set);
  const { data } = useCoachProfile();

  return (
    <Button
      className="flex items-center flex-1"
      variant={"outline"}
      onClick={() => {
        // check if the messagehead already exist
        const exist = messageHeads.find(
          (messageHead) => messageHead.id === data.profiles.id
        );

        // if it exist, set it as the current message
        if (exist) {
          setCurrentMessage(exist);
          onOpen();
          return;
        }

        // if it doesn't exist, create a new messagehead
        const messageHead = {
          content: null,
          is_seen: null,
          sender_id: null,
          message_time: null,
          ...data.profiles,
        } as MessageHeadType;

        // move it to the top of the messagehead list
        messageHeads.unshift(messageHead);
        
        setMessageHeads(messageHeads);
        setCurrentMessage(messageHead);

        onOpen();
      }}
    >
      <IoChatboxSharp className="mr-3" />
      Chat
    </Button>
  );
}
