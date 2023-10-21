'use client';

import { ProfilesType } from '@/types/supabaseTableType'
import React, { useEffect } from 'react';
import { useSearchUser } from '@/hooks/useSearchUser';
import Image from 'next/image';
import { useUser } from "@/hooks/useUser";
import { AiOutlineUserAdd } from 'react-icons/ai';
import Link from 'next/link';
import { MdLogin } from 'react-icons/md';
import { useSearchParams } from 'next/navigation';
import axios from "axios";

export default function ResUser() {

  let { allUser, setAllUser }: any = useSearchUser();
  const currentUser = useUser();

  const searchParams = useSearchParams();
  const search = searchParams.get('q');

  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(`/api/userSearch?name=${search}`).then((res) => {
        setAllUser(res.data);
      })
    }
    fetchUser();
  }, [search])


  return (
    <div className='mx-20 mt-8'>
      {allUser?.length > 0 ? (
        <div className='w-full space-y-8'>
          {allUser?.map((user : ProfilesType) => (
            <div className="p-4 w-full flex justify-between h-full relative card-container rounded-xl" key={user.id}>
              <div className='flex h-[100px]'>
                <div id='Avatar' className=''>
                  <Link href={`/user/${user.name}`}>
                    <Image src={user.avatar || '/avatar.jpg'} alt='Avatar' width={100} height={100} 
                      className='rounded-full w-[100px] h-[100px]'
                    />
                  </Link>
                </div>

                <div className='ml-4 h-full flex flex-col justify-between'>
                  <div className='text-xl font-bold hover:underline'>
                    <Link href={`/user/${user.name}`}>
                      {user.name}
                    </Link>
                  </div>

                  <div className="text-gray-300 text-[0.9rem] flex font-medium">
                    <p>Join {user.created_at.substring(0, 7)}</p>
                    <div id="Flag" className="flex ml-3">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                        alt="flag"
                        className="h-[1.1rem]"
                        width={30}
                        height={0}
                      />
                      <p className="ml-1">{user.location}</p>
                    </div>
                  </div>

                  <div>{user.bio?.substring(0, 80)}</div>
                </div>
              </div>
            
              <div className="flex justify-end items-center">
                {currentUser.userDetails?.name == user.name ? (
                  <Link href={`/user/${currentUser.userDetails?.name}`}>
                    <button className="bg-gray-900 rounded-lg w-[130px] flex items-center justify-center h-10 text-[1rem] mr-4 bg-gradient-to-r from-[#067d71] to-[#3dbda7]">
                      <div className="flex items-center">
                        <MdLogin size="20" className="mr-1" />
                        Profile
                      </div>
                    </button>
                  </Link>
                ): (
                  <button className="bg-gray-900 rounded-lg w-[130px] flex items-center justify-center h-10 text-[1rem] mr-4 bg-gradient-to-r from-[#067d71] to-[#3dbda7]">
                    <div className="flex items-center">
                    <AiOutlineUserAdd size="20" className="mr-1" />
                      Add Friend
                    </div>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 mt-8 flex h-full relative card-container rounded-xl text-center items-center justify-center text-3xl font-bold">
          No User Found!
        </div>
      )}
    </div>
  )
}
