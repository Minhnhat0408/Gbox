'use client';

import React, { useEffect, useState } from 'react';
import { useSearchUser, userSearchInput } from '@/hooks/useSearchUser';
import Image from 'next/image';
import { useUser } from "@/hooks/useUser";
import Link from 'next/link';
import { MdLogin } from 'react-icons/md';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from "axios";

export default function ResUser() {

  let { allUser, setAllUser }: any = useSearchUser();
  let { searchIp, setSearchIp }: any = userSearchInput();
  const currentUser = useUser();

  const searchParams = useSearchParams();
  const search = searchParams.get("q");

  const router = useRouter();

  useEffect(() => {

    if (searchIp.length <= 1) {
      router.push('/');
      return;
    }
    setSearchIp(search);
    
    const fetchUser = async () => {
      await axios.get(`/api/userSearch?query=${search}&id=${currentUser.userDetails?.id}`).then((res) => {
        setAllUser(res.data);
      });
    }
    fetchUser();

  }, [search, currentUser.userDetails?.id])

  return (
    <div className='mx-20 mt-24 pb-8'>
      {allUser?.length > 0 ? (
        <div className='w-full space-y-8'>
          {allUser?.map((user: any) => (
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

                  {user.bio ? (
                    <div>
                      {user.bio.length > 50 ? (
                        <div>{user.bio.substring(0, 50)} . . .</div>
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
                    <button className="bg-gray-900 rounded-lg w-[130px] flex items-center justify-center h-10 text-[1rem] mr-4 bg-gradient-to-r from-[#067d71] to-[#3dbda7]">
                      <div className="flex items-center">
                        <MdLogin size="20" className="mr-1" />
                        Profile
                      </div>
                    </button>
                  </Link>
                ) : (
                  <div>
                    {user.friend_request_status == 'unfriend' ? (
                      <button className="bg-gray-900 rounded-lg w-[150px] flex items-center justify-center h-10 text-[1rem] mr-4 bg-gradient-to-r from-[#067d71] to-[#3dbda7]"
                        onMouseDown={async () => {
                          await axios.post(`/api/friends/sendFriendReqs?id=${currentUser.userDetails?.id}&receiverID=${user.id}`);
                          await axios.get(`/api/userSearch?query=${search}&id=${currentUser.userDetails?.id}`).then((res) => {
                            setAllUser(res.data);
                          })
                        }}
                      >
                      <div className="flex items-center">
                        {/* <AiOutlineUserAdd size="20" className="mr-1" /> */}
                        Add Friend
                      </div>
                    </button>
                    ) : null}

                    {user.friend_request_status == 'waiting' ? (
                      <button className="bg-gray-900 rounded-lg w-[150px] flex items-center justify-center h-10 text-[1rem] mr-4 bg-gradient-to-r from-[#067d71] to-[#3dbda7]"
                        onMouseDown={async () => {
                          await axios.post(`/api/friends/cancelFriendReqs?id=${currentUser.userDetails?.id}&receiverID=${user.id}`);
                          await axios.get(`/api/userSearch?query=${search}&id=${currentUser.userDetails?.id}`).then((res) => {
                            setAllUser(res.data);
                          });
                        }}
                      >
                      <div className="flex items-center">
                          Cancel Request
                      </div>
                    </button>
                    ) : null}

                    {user.friend_request_status == 'accepting' ? (
                      <button className="bg-gray-900 rounded-lg w-[150px] flex items-center justify-center h-10 text-[1rem] mr-4 bg-gradient-to-r from-[#067d71] to-[#3dbda7]"
                        onMouseDown={async () => {
                          await axios.post(`/api/friends/acceptFriendReqs?id=${user.id}&receiverID=${currentUser.userDetails?.id}`);
                          await axios.get(`/api/userSearch?query=${search}&id=${currentUser.userDetails?.id}`).then((res) => {
                            setAllUser(res.data);
                          });
                        }}
                      >
                      <div className="flex items-center">
                        Confirm
                      </div>
                    </button>
                    ) : null}

                    {user.friend_request_status == 'friend' ? (
                      <button className="bg-gray-900 rounded-lg w-[150px] flex items-center justify-center h-10 text-[1rem] mr-4 bg-gradient-to-r from-[#067d71] to-[#3dbda7]"
                        
                      >
                      <div className="flex items-center">
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
  )
}
