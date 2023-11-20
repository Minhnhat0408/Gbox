'use client';

import { useSessionContext } from '@supabase/auth-helpers-react';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from "sonner";

export default function UserStatus({ id, userStt } : { id: string, userStt: string }) {

  let [gameStt, setGameStt] = useState<string>(userStt);

  let [showIp, setShowIp] = useState<boolean>(false);

  const { supabaseClient } = useSessionContext();
  
  const updateUserStatus = async (user_status: string) => {
    await supabaseClient.from('profiles').update({ user_status:  user_status}).eq('id', id);    
  }

  return (
    <div className='h-[28px] w-[400px] text-lg'>
      {!showIp && 
        <div onClick={() => setShowIp(true)}> 
          
          {gameStt.trim().length < 1 ? (
            <p className='cursor-pointer'>Set game Status</p>)
           : (
            <p className='cursor-pointer'>{gameStt}</p>
          )}
        </div>
      }

      {showIp && (
        <input type="text" value={gameStt} onChange={(e) => setGameStt(e.target.value)} 
          className='bg-[#067d71] rounded-lg px-4 py-2 outline-none' 
          onBlur={() => {
            setShowIp(false);
            updateUserStatus(gameStt)
            toast(
              <div className=''>
                <p className='text-white'>Save status successfully!</p>
              </div>
            )
          }} 
          autoFocus maxLength={25}
          onKeyDown={(e) => {
            if (e.key == "Enter" && gameStt.trim().length > 0) {
              updateUserStatus(gameStt)
              setShowIp(false);
              toast(
                <div className=''>
                  <p className='text-white'>Save status successfully!</p>
                </div>
              )
            }
          }}
        />
      )}
    </div>
  )
}
