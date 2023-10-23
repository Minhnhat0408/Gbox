'use client'

import React, { useRef, useState } from 'react';
import axios from "axios";
import { FiSearch } from 'react-icons/fi';
import { ProfilesType } from '@/types/supabaseTableType';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { userSearchInput } from '@/hooks/useSearchUser';
import { BiLoaderAlt } from 'react-icons/bi';

export default function SearchUser() {

  let { searchIp, setSearchIp }: any = userSearchInput();

  let [resUserArray, setResUserArray] = useState([]);

  let [isFocus, setIsFocus] = useState<boolean>(false);

  let [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const ipRef = useRef<HTMLInputElement | null>(null);

  const currentUser = useUser();

  return (
    <div className="rounded-3xl w-[300px] max-h-14 bg-[#00453F] px-6 py-2 ml-4 flex items-center relative">
      <FiSearch className="mr-4 text-2xl text-gray-400" />
      <input 
        value={searchIp} ref={ipRef}
        className="w-full h-8 bg-[#00453F] focus-visible:outline-none placeholder:text-gray-400 pr-4"
        placeholder="Search in Gbox"
        onChange={async (e) => {
          setSearchIp(e.target.value);
          setLoading(true);
          await axios.get(`/api/userSearch?query=${e.target.value.replace(/\s/g, "")}&id=${currentUser.userDetails?.id}`).then((res) => {
            setResUserArray(res.data);
          })
          setLoading(false);
        }}
        onFocus={async () => {
            setLoading(false);
            setIsFocus(true);
            await axios.get(`/api/userSearch?query=${searchIp}&id=${currentUser.userDetails?.id}`).then((res) => {
              setResUserArray(res.data);
            })

          }
        }
        onBlur={() => setTimeout(() => {
          setIsFocus(false);
        }, 200)}
        onKeyDown={(e) => {
          if (e.key == 'Enter' && searchIp.replace(/\s/g, "").length > 0) {
            ipRef.current?.blur();
            router.push(`/search?q=${searchIp.replace(/\s/g, "")}`);
          }
        }}
      />

      {(loading || resUserArray.length < 1) && isFocus && searchIp.length > 0 ? (
        <BiLoaderAlt  className="animate-spin w-[40px] text-gray-300 text-2xl" />
      ) : (
        <div className='w-[40px]'>

        </div>
      )}

      {isFocus ? (
        <div className='absolute top-14 left-0 card-container rounded-2xl w-full flex flex-col'>
          {resUserArray?.length > 0 && !loading  ? (
            <div className={`left-0 w-full z-20 px-2 pt-2 ${searchIp.length > 0 ? '' : 'pb-2'}`}>
              {resUserArray.slice(0, 100).map((user: ProfilesType) => (
                <div className="cursor-pointer pl-2 py-2 h-fit flex items-center hover:bg-[#3dbda7] rounded-xl"
                  onMouseDown={() => {
                    setSearchIp('');
                    router.push(`/user/${user.name}`);
                    setTimeout(() => {
                      setResUserArray([]);
                    }, 200);
                  }}  
                  key={user.id}
                >
                  <Image src={user.avatar || '/avatar.jpg'} height={270} width={270} alt="avatar" 
                    className={`rounded-full h-[40px] w-[40px] mr-4 border-[2px]
                    ${user.gender == 'female' ? 'border-[#ec49a7]' : ''} 
                    ${user.gender == 'male' ? 'border-[#03a3ff]' : ''}
                    ${user.gender == 'other' ? 'border-[#3cb179]' : ''}`}
                  />
                    {user.name}
                </div>
              ))}
            </div>
          ) : null}

          {searchIp.replace(/\s/g, "").length > 0 ? (        
            <div className={`cursor-pointer h-fit px-2 pb-2 w-full flex flex-col ${resUserArray?.length < 1 ? 'pt-2' : ''}`}
              onMouseDown={() => {
                router.push(`/search?q=${searchIp.replace(/\s/g, "")}`);
              }}
            >
              <div className='w-full h-[56px] pl-2 hover:bg-[#3dbda7] flex items-center rounded-xl'>
                <FiSearch className="mr-2 text-2xl text-gray-50 w-[40px]" />
                  search {searchIp.replace(/\s/g, "")}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
