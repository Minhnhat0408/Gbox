'use client'

import React, { useRef, useState } from 'react';
import axios from "axios";
import { FiSearch } from 'react-icons/fi';
import { ProfilesType } from '@/types/supabaseTableType';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { userSearchInput } from '@/hooks/useSearchUser';

export default function SearchUser() {

  let { searchIp, setSearchIp }: any = userSearchInput();

  let [resUserArray, setResUserArray] = useState([]);

  let [isFocus, setIsFocus] = useState<boolean>(false);

  const router = useRouter();

  const ipRef = useRef<HTMLInputElement | null>(null);

  const currentUser = useUser();

  return (
    <div className="rounded-3xl w-[400px] max-h-14 bg-[#00453F] px-6 py-2 ml-4 flex items-center relative">
      <FiSearch className="mr-4 text-2xl text-gray-400" />
      <input 
        value={searchIp} ref={ipRef}
        className="w-full h-8 bg-[#00453F] focus-visible:outline-none placeholder:text-gray-400 pr-4"
        placeholder="Search in Gbox"
        onChange={async e => {
          setSearchIp(e.target.value);
          await axios.get(`/api/userSearch?query=${e.target.value.replace(/\s/g, "")}&id=${currentUser.userDetails?.id}`).then((res) => {
            setResUserArray(res.data);
          })
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setTimeout(() => {
          setIsFocus(false)
        },150)}
        onKeyDown={(e) => {
          if (e.key == 'Enter' && searchIp.replace(/\s/g, "").length > 0) {
            ipRef.current?.blur();
            setTimeout(() => {
              router.push(`/search?q=${searchIp.replace(/\s/g, "")}`);
            }, 500);
          }
        }}
      />
      {resUserArray?.length > 0 && isFocus  ? (
        <div className="absolute top-14 left-0 w-full card-container rounded-xl z-20 p-2">
          {resUserArray.slice(0, 10).map((user: ProfilesType) => (
            <div className="cursor-pointer pl-2 py-2 h-fit flex items-center hover:bg-[#3dbda7] rounded-lg"
              onMouseDown={() => {
                setSearchIp('');
                setResUserArray([]);
                router.push(`/user/${user.name}`)
              }}  
              key={user.id}
            >
              <Image src={user.avatar || '/avatar.jpg'} height={40} width={40} className="rounded-full h-[40px] w-[40px] mr-2" alt="avatar" />
                {user.name}
            </div>
          ))}

          {searchIp.replace(/\s/g, "").length > 0 && isFocus ? (
            <div className="cursor-pointer pl-2 py-2 h-[56px] flex items-center hover:bg-[#3dbda7] rounded-lg"
              onMouseDown={() => {
                setTimeout(() => {
                  router.push(`/search?q=${searchIp.replace(/\s/g, "")}`);
                }, 500);
              }}
            >
              <FiSearch className="mr-2 text-2xl text-gray-50 w-[40px]" />
                search {searchIp.replace(/\s/g, "")}
            </div>
          ) : null}
          
        </div>
      ) : (
        <div className={`absolute top-14 left-0 w-full card-container rounded-xl z-10 ${searchIp.replace(/\s/g, "").length > 0 && isFocus ? 'p-2' : ''}`}>
          {searchIp.replace(/\s/g, "").length > 0 && isFocus ? (
            <div className="cursor-pointer pl-2 py-2 h-[56px] flex items-center hover:bg-[#3dbda7] rounded-lg"
              onMouseDown={() => {
                setTimeout(() => {
                  router.push(`/search?q=${searchIp.replace(/\s/g, "")}`);
                }, 500);
              }}
            >
              <FiSearch className="mr-2 text-2xl text-gray-50 w-[40px]" />
                search {searchIp.replace(/\s/g, "")}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
