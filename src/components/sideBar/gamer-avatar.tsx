import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageHeadType } from "@/types/supabaseTableType";
import useFriendMessages from "@/hooks/useFriendMessages";
import useMessageBox from "@/hooks/useMessageBox";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
// @ts-ignore
import sound from "@/constants/sound";
import useThrottle from "@/hooks/useThrottle";
import useAudio from "@/hooks/useAudio";

export default function GamerAvatar({
  messageHead,
}: {
  messageHead?: MessageHeadType;
}) {
  const {
    onOpen,
    inComingMessage,
    setInComingMessage,
    isOpen,
    setMessageHeads,
    messageHeads,
  } = useFriendMessages((set) => set);
  const { setCurrentMessage, currentMessage } = useMessageBox((set) => set);
  const { supabaseClient } = useSessionContext();
  const { user, userDetails } = useUser();
  const [userStt, setUserStt] = useState<string>('');
  // const [play] = useSound(sound.message);
  // const playSound = useThrottle(() => {
  //   play();
  // }, 2000);
  const play = useAudio(sound.message);
  const playSound = useThrottle(() => {
    play();
  }, 2000);

  useEffect(() => {
    if (messageHead && userDetails && messageHead.name) {
      (async () => {
        const { count } = await supabaseClient
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("receiver_id", user?.id)
          .eq("sender_id", messageHead.id)
          .eq("is_seen", false)
          .order("created_at", { ascending: true });
        inComingMessage[messageHead.id] = count ? count : 0;
        setInComingMessage(inComingMessage);
      })();
      let newRoom = userDetails!.name + messageHead.name;
      newRoom = newRoom.split("").sort().join("");
      const channel = supabaseClient
        .channel(`incoming ${newRoom}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `sender_id=eq.${messageHead.id}`,
          },
          async (payload) => {
            if (payload.new.receiver_id === user?.id) {
              const index = messageHeads.findIndex(
                (item) => item.id === messageHead.id
              );

              messageHeads[index].message_time = payload.new.created_at;
              messageHeads[index].content = payload.new.content;
              messageHeads[index].is_seen = payload.new.is_seen;

              messageHeads[index].sender_id = payload.new.sender_id;

              setMessageHeads(messageHeads);
              if (isOpen) {
                if (currentMessage?.id !== messageHead.id) {
                  inComingMessage[messageHead.id] += 1;
                  setInComingMessage(inComingMessage);
                }
              } else {
                inComingMessage[messageHead.id] += 1;
                setInComingMessage(inComingMessage);
                // throttle(() => {
                //   console.log('hee')
                // }, 3000)()

                playSound();
              }
            }
          }
        )
        .subscribe();

      return () => {
        supabaseClient.removeChannel(channel);
      };
    }
  }, [messageHead?.id, userDetails]);

  useEffect(() => {
    const channel = supabaseClient
      .channel(`status ${messageHead?.id}`)
      .on('postgres_changes', {
        event: "UPDATE",
        schema: "public",
        table: "profiles",
        filter: `id=eq.${messageHead?.id}`,
      }, 
      async (payload) => {
        setUserStt(payload.new.user_status)
      }).subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    }
  })

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() => {
              if (messageHead) {
                setCurrentMessage(messageHead);
                onOpen();
              }
            }}
            className="relative flex justify-center cursor-pointer"
          >
            <Avatar className="w-12 h-12">
              <AvatarImage src={messageHead?.avatar || "image 1.png"} />
              <AvatarFallback className="bg-gray-700">CN</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "right-1 absolute top-0 z-10 w-3 h-3 bg-green-500 rounded-full",
                messageHead &&
                  inComingMessage[messageHead.id] &&
                  inComingMessage[messageHead.id] !== 0 &&
                  "bg-red-400 w-5 h-5 -top-1 right-0 flex items-center justify-center text-sm"
              )}
            >
              {messageHead
                ? inComingMessage[messageHead.id] &&
                  inComingMessage[messageHead.id] !== 0
                  ? inComingMessage[messageHead.id]
                  : ""
                : ""}
            </div>
            <span className="absolute -bottom-2  bg-primary p-1 py-[2px] rounded-sm text-[8px]">
              In Game
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-home p-4">
          <div className="gap-x-2 flex">
            <Avatar className="w-12 h-12">
              <AvatarImage src={messageHead?.avatar || "image 1.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="gap-y-2">
              <p className="">{messageHead ? messageHead.name : "GboxGamer"}</p>
              <span className="text-muted-foreground italic">
                {messageHead ? messageHead.location : "No Where"}
              </span>
            </div>
          </div>
          <p className="super mt-3 font-bold">{userStt.length > 0 ? userStt : 'Online'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
