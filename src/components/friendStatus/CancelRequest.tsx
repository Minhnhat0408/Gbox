'use client';

import { useSearchUser } from '@/hooks/useSearchUser';
import axios from 'axios';
import React, { useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { FaUserTimes } from 'react-icons/fa';

export default function CancelRequest({ search, currentUserID, id }: { search: string, currentUserID: string, id: string }) {


  let { allUser, setAllUser }: any = useSearchUser();

  let [cancelRequestLoading, setCancelRequestLoading] = useState<boolean>(false);

  return (
    <button className="rounded-lg w-[170px] flex items-center justify-center h-10 text-[1rem] bg-[#3dbda7]"
      onMouseDown={async () => {
        setCancelRequestLoading(true);
        await axios.post(`/api/friends/cancelFriendReqs?id=${currentUserID}&receiverID=${id}`);
        await axios.get(`/api/userSearch?query=${search}&id=${currentUserID}`).then((res) => {
          setAllUser(res.data);
        });
        setCancelRequestLoading(false);
      }}
    >
      {cancelRequestLoading ? (
        <BiLoaderAlt className="text-2xl animate-spin" />
      ) : (
        <div className="flex items-center">
          <FaUserTimes className="mr-2 text-xl mb-1" />
          Cancel Request
        </div>
      )}
    </button>
  )
}
