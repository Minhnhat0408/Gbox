import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GroupChatHeadType, MessageHeadType } from "@/types/supabaseTableType";
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
import useGroupChat from "@/hooks/useGroupChat";
import useGroupChatBox from "@/hooks/useGroupChatBox";
import useGroupMembers from "@/hooks/useGroupMembers";
import { toast } from "sonner";

export default function GroupAvatar({
  groupHead,
}: {
  groupHead?: GroupChatHeadType;
}) {
  const {
    onOpen,
    inComingMessage,
    setInComingMessage,
    isOpen,
    setGroupChatHeads,
    groupChatHeads,
  } = useGroupChat();
  const { setCurrentGroup, currentGroup } = useGroupChatBox();
  const { supabaseClient } = useSessionContext();
  const { setCurrentMember, currentMember, members } = useGroupMembers();
  const { user, userDetails } = useUser();
  const play = useAudio(sound.message);
  const playSound = useThrottle(() => {
    play.play();
  }, 2000);

  useEffect(() => {
    if (groupHead && !isOpen) {
      (async () => {
        const { data: userGroupData, error } = await supabaseClient
          .from("group_users")
          .select("joined_at")
          .eq("group_id", groupHead.id)
          .eq("user_id", user?.id)
          .maybeSingle();
        if (error) toast.error(error.message);

        const { count } = await supabaseClient
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("group_id", groupHead?.id)
          .neq("sender_id", user?.id)
          .not("group_seen", "cs", `{"${user?.id}"}`)
          .gte("created_at", userGroupData?.joined_at);
        inComingMessage[groupHead.id] = count ? count : 0;
        setInComingMessage(inComingMessage);
      })();
      const channel = supabaseClient
        .channel(`incoming ${groupHead.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `group_id=eq.${groupHead.id}`,
          },
          async (payload) => {
            if (payload.new.sender_id !== user?.id) {
              const index = groupChatHeads.findIndex(
                (item) => item.id === groupHead.id
              );
              if (index !== -1) {
                const temp = groupChatHeads[index];
                temp.message_time = payload.new.created_at;
                temp.content = payload.new.content;
                temp.group_seen = payload.new.group_seen;
                temp.sender_id = payload.new.sender_id;
                groupChatHeads.splice(index, 1);
                groupChatHeads.unshift(temp);
                setGroupChatHeads(groupChatHeads);
              }
              if (isOpen) {
                if (currentGroup?.id !== groupHead.id) {
                  inComingMessage[groupHead.id] += 1;
                  setInComingMessage(inComingMessage);
                }
              } else {
                inComingMessage[groupHead.id] += 1;
                setInComingMessage(inComingMessage);
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
  }, [groupHead, groupChatHeads, isOpen]);

  useEffect(() => {
    const channel = supabaseClient
      .channel(`realtime group ${user?.id} delete`)
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "group_users",
        },
        async (payload) => {
          const { data: groupUsers, error } = await supabaseClient
            .from("group_users")
            .select("*")
            .eq("group_id", groupHead?.id)
            .eq("user_id", user?.id)
            .maybeSingle();
          if (error) console.error(error);

          if (!groupUsers) {
            const { data, error } = await supabaseClient.rpc(
              "get_latest_group_messages",
              {
                _user_id: user?.id,
              }
            );
            if (error) console.error(error);
            if (data) {
              setGroupChatHeads(data);
              setCurrentGroup(undefined);
              setCurrentMember(undefined);
            }
          }
        }
      );
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [groupHead]);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() => {
              if (groupHead) {
                setCurrentGroup(groupHead);
                onOpen();
              }
            }}
            className="relative flex justify-center cursor-pointer"
          >
            <Avatar className="w-12 h-12">
              <AvatarImage src={groupHead?.image || "image 1.png"} />
              <AvatarFallback className="bg-gray-700">CN</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "right-1 absolute top-0 z-10 w-3 h-3 bg-green-500 rounded-full",
                groupHead &&
                  inComingMessage[groupHead.id] &&
                  inComingMessage[groupHead.id] !== 0 &&
                  "bg-red-400 w-5 h-5 -top-1 right-0 flex items-center justify-center text-sm"
              )}
            >
              {groupHead
                ? inComingMessage[groupHead.id] &&
                  inComingMessage[groupHead.id] !== 0
                  ? inComingMessage[groupHead.id]
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
              <AvatarImage src={groupHead?.image || "image 1.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="gap-y-2">
              <p className="">{groupHead ? groupHead.name : "Gbox Group"}</p>
              <span className="text-muted-foreground italic">
                is created by{" "}
                {groupHead?.creator_id === user?.id
                  ? "You"
                  : groupHead?.creator_name}
              </span>
            </div>
          </div>
          <p className=" mt-2 text-sm">currently have <span className="text-primary font-bold">{members.length} members</span> </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
