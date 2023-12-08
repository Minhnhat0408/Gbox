"use client";

import { cn } from "@/lib/utils";
import { HiChatBubbleLeftRight, HiMiniUserGroup } from "react-icons/hi2";
import GamerAvatar from "./gamer-avatar";
import { MessageBox } from "../message-ui/message-box";
import useFriendMessages from "@/hooks/useFriendMessages";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { GroupChatBox } from "../group-chat-ui/group-chat-box";
import useGroupChat from "@/hooks/useGroupChat";
import GroupAvatar from "./group-avatar";

export default function SideBarRight() {
  const { setMessageHeads, messageHeads } = useFriendMessages((set) => set);
  const { groupChatHeads, setGroupChatHeads } = useGroupChat();
  const { supabaseClient } = useSessionContext();
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      (async () => {
        let { data, error } = await supabaseClient.rpc(
          "get_latest_message_heads",
          {
            user_id: user.id,
          }
        );
        const { data: groupData, error: groupError } = await supabaseClient.rpc(
          "get_latest_group_messages",
          {
            _user_id: user.id,
          }
        );

        if (error) console.error(error);

        if (data) {
          setMessageHeads(data);
        }
        if (groupData) {
          setGroupChatHeads(groupData);
        }
        setLoading(false);
      })();
    }
  }, [user]);
  return (
    <aside
      className={cn(
        "fixed  right-4 top-0 fade-in h-full py-6 flex flex-col  overflow-y-scroll gap-y-4 "
      )}
    >
      <div
        className={cn(
          " flex-1 bg-muted rounded-3xl flex flex-col items-center overflow-hidden   py-6  xl:px-4 px-2 "
        )}
      >
        <div className="mb-6 text-4xl">
          <GroupChatBox />
        </div>
        <div className="gap-y-6 scrollbar flex flex-col px-1 overflow-y-scroll">
          {!loading ? (
            groupChatHeads.map((msh, ind) => {
              return <GroupAvatar key={ind} groupHead={msh} />;
            })
          ) : (
            <>
              <GamerAvatar />
              <GamerAvatar />
              <GamerAvatar />
              <GamerAvatar />
              <GamerAvatar />
              <GamerAvatar />
            </>
          )}
        </div>
      </div>
      <div
        className={cn(
          " flex-1 bg-muted rounded-3xl flex flex-col items-center overflow-hidden py-6  xl:px-4 px-2  "
        )}
      >
        <div className=" mb-6 text-4xl">
          <MessageBox />
        </div>
        <div className="gap-y-6 scrollbar flex flex-col px-1 pt-1 overflow-y-auto h-full">
          {!loading ? (
            messageHeads.map((msh, ind) => {
              return <GamerAvatar key={ind} messageHead={msh} />;
            })
          ) : (
            <>
              <GamerAvatar />
              <GamerAvatar />
              <GamerAvatar />
              <GamerAvatar />
              <GamerAvatar />
              <GamerAvatar />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
