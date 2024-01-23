"use client";

import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import MessageHead from "./message-head";
import useFriendMessages from "@/hooks/useFriendMessages";

export default function MessageHeadList() {
  const { messageHeads } = useFriendMessages((set) => set);
  let [searchIp, setSearchIp] = useState<string>("");

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

      <div id="MessageHeadList" className="h-full overflow-y-auto pb-20">
        {messageHeads.map((messageHead) => (
          <div key={messageHead.id}>
            {messageHead.name
              ?.toLowerCase()
              .includes(searchIp.toLowerCase()) ? (
              <MessageHead messageHead={messageHead} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
