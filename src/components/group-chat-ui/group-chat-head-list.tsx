"use client";

import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { MessageHeadType } from "@/types/supabaseTableType";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useFriendMessages from "@/hooks/useFriendMessages";
import useGroupChat from "@/hooks/useGroupChat";
import GroupChatHead from "./group-chat-head";

export default function GroupChatHeadList() {
  const { groupChatHeads, setGroupChatHeads } = useGroupChat();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();

  let [searchIp, setSearchIp] = useState<string>("");
  useEffect(() => {
    (async () => {
      setLoading(true);
      let { data, error } = await supabaseClient.rpc(
        "get_latest_group_messages",
        {
          _user_id: user?.id,
        }
      );

      if (error) console.error(error);
      if (data) {
        setGroupChatHeads(data);
      }
      setLoading(false);
    })();
  }, []);
  return (
    <div className="w-[360px] h-full px-4 border-r pt-10 ">
      <div
        id="Search Bar"
        className="flex items-center bg-muted rounded-full mb-4"
      >
        <FiSearch className="ml-2 mr-2 text-2xl text-gray-400" />
        <input
          value={searchIp}
          type="text"
          name=""
          id=""
          onChange={(e) => setSearchIp(e.target.value.trim())}
          placeholder="Search"
          className="bg-transparent outline-none py-2"
        />
      </div>

      <div id="GroupHeadList">
        {groupChatHeads.map((groupHead) => (
          <div key={groupHead.id}>
            {groupHead.name?.toLowerCase().includes(searchIp.toLowerCase()) ? (
              <GroupChatHead groupHead={groupHead} />
            ) : null}
          </div>
        ))}
        {loading && (
          <div className="h-[400px] w-full flex justify-center items-center ">
            <div className="text-3xl animate-spin">
              <AiOutlineLoading3Quarters />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
