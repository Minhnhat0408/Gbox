'use client'

import { useUser } from "@/hooks/useUser";
import { ProfilesType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai"

export function AddFriendButton({data}: {data: ProfilesType}) {
  const searchWord = "x";

  const {userDetails} = useUser();

  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    const fetchs = async () => {
      const result = await axios.get('/api/userSearch', {
        params: {
          query: searchWord,
          authID: userDetails?.id,
          guessID: data!.id,
        }
      })
      console.log(result.data);
    };
    fetchs();
  }, []);

    return <div className="flex items-center">
    <AiOutlineUserAdd size="20" className="mr-1" />
    Follow
  </div>
}