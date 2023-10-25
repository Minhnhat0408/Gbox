'use client';

import React, { useEffect, useState } from 'react';
import { useSearchUser, userSearchInput } from '@/hooks/useSearchUser';
import Image from 'next/image';
import { useUser } from "@/hooks/useUser";
import Link from 'next/link';
import { MdLogin } from 'react-icons/md';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from "axios";
import AddFriend from '@/components/friendStatus/AddFriend';
import CancelRequest from '@/components/friendStatus/CancelRequest';
import Confirm from '@/components/friendStatus/Confirm';
import { flag } from "@/constants/flag";
import { FaUserCheck } from 'react-icons/fa6';


export default function ResUser() {

  let { allUser, setAllUser }: any = useSearchUser();
  let { searchIp, setSearchIp }: any = userSearchInput();
  const currentUser = useUser();

  const searchParams = useSearchParams();
  const search = searchParams.get("q");

  const router = useRouter();

  let [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setSearchIp(search);

    if (search && search.trim().length < 1) {
      router.push('/');
      return;
    }

    setLoading(true);
    
    const fetchUser = async () => {
      await axios.get(`/api/userSearch?query=${search}&id=${currentUser.userDetails?.id}`).then((res) => {
        setAllUser(res.data);
      });

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    fetchUser();
    
  }, [search, currentUser.userDetails?.id])

  return (                                            
   <>
    {loading ? (
      <div className='mx-20 mt-24 pb-8 flex'>
        <div className='p-4 w-full flex justify-between relative bg-[#067d71] rounded-[20px] animate-pulse'>
          <div className='flex h-[100px]'>
            <div className='rounded-full w-[100px] h-[100px] bg-muted' />

            <div className='ml-4 h-full flex flex-col justify-evenly'>
              <div className='text-xl h-[28px] w-[150px] bg-muted rounded-full' />

              <div className="text-gray-300 text-[1em] flex font-medium h-[20px] bg-muted w-[250px] rounded-full" />

              <div className='h-[20px] w-[20em] bg-muted rounded-full' />
            </div>
          </div>

          <div className='flex justify-end items-center'>
            <div className='w-[170px] h-10 bg-muted flex items-center rounded-lg' />
          </div>
        </div>
      </div>
    ) : (
      <div className='mx-20 mt-24 pb-8'>
        {allUser?.length > 0 ? (
          <div className='w-full space-y-8'>
            {allUser?.map((user: any) => (
              <div className="p-4 w-full flex justify-between h-full relative bg-[#067d71] rounded-[20px]" key={user.id}>
                <div className='flex h-[100px]'>
                  <div id='Avatar' className=''>
                    <Link href={`/user/${user.name}`}>
                      <Image src={user.avatar || '/avatar.jpg'} alt='Avatar' width={270} height={270} 
                        className={`rounded-full w-[100px] h-[100px] border-[3.5px] 
                        ${user.gender == 'female' ? 'border-[#ec49a7]' : ''} 
                        ${user.gender == 'male' ? 'border-[#03a3ff]' : ''}
                        ${user.gender == 'other' ? 'border-[#3cb179]' : ''}`}
                      />
                    </Link>
                  </div>

                  <div className='ml-4 h-full flex flex-col justify-evenly'>
                    <div className='text-2xl font-bold hover:underline'>
                      <Link href={`/user/${user.name}`}>
                        {user.name}
                      </Link>
                    </div>

                    <div className="text-gray-300 text-[1em] flex font-medium">
                      <p>Join {new Date(user.created_at).toUTCString().substring(0, 16)}</p>
                      <div id="Flag" className="flex ml-4">
                        <Image
                          src={flag[user.location as keyof typeof flag]}
                          alt="flag"
                          className="h-[1.2em] w-[1.8em] rounded-[4px]"
                          width={600}
                          height={400}
                        />
                        <p className="ml-1">{user.location}</p>
                      </div>
                    </div>

                    {user.bio ? (
                      <div>
                        {user.bio.length > 50 ? (
                          <>
                            <div className='block 2xl:hidden'>{user.bio.substring(0, 50)} . . .</div>
                            <div className='hidden 2xl:block'>{user.bio.substring(0, 100)}. . .</div>
                          </>
                        ): (
                          <div>{user.bio}</div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              
                <div className="flex justify-end items-center">
                  {user?.name == currentUser.userDetails?.name ? (
                    <Link href={`/user/${currentUser.userDetails?.name}`}>
                      <button className="bg-gray-900 rounded-lg w-[170px] flex items-center justify-center h-10 text-[1rem] mr-4 bg-gradient-to-r from-[#067d71] to-[#3dbda7]">
                        <div className="flex items-center">
                          <MdLogin size="20" className="mr-1" />
                          Profile
                        </div>
                      </button>
                    </Link>
                  ) : (
                    <div>
                      {user.friend_request_status == 'unfriend' ? (
                        <AddFriend search={search || ''} currentUserID={currentUser.userDetails?.id || ''} id={user.id} />
                      ) : null}

                      {user.friend_request_status == 'waiting' ? (
                        <CancelRequest search={search || ''} currentUserID={currentUser.userDetails?.id || ''} id={user.id} />
                      ) : null}

                      {user.friend_request_status == 'accepting' ? (
                        <Confirm search={search || ''} currentUserID={currentUser.userDetails?.id || ''} id={user.id} />
                      ) : null}

                      {user.friend_request_status == 'friend' ? (
                        <button className="rounded-lg w-[170px] flex items-center justify-center h-10 text-[1rem] bg-[#3dbda7]">
                          <div className="flex items-center">
                            <FaUserCheck className="mr-2 text-xl mb-1" />
                            Friend
                          </div>
                        </button>
                      ) : null}
                    </div>
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
    )}
   </>
  )
}
