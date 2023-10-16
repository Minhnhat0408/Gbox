'use client'

import { AiOutlineUserAdd } from "react-icons/ai";
import Image from "next/image";
import React, { useEffect } from "react";
import { ProfilesType } from "@/types/supabaseTableType";
import { platform } from "@/constants/platformIcon";

export default function ProfileHeader({ data } : { data: ProfilesType }) {

  return (
    <div className="mt-4 w-full rounded-xl">
      <div id="Top" className="relative w-full flex justify-between items-center h-auto">
        <Image src="https://i.pinimg.com/originals/84/61/c9/8461c9936150222db6460a57c636f3b3.jpg" alt="bg-img" 
          className="z-0 absolute w-full h-full rounded-t-xl opacity-100" width={100} height={100}
        />
        <div id="Left" className="w-[65%] flex justify-start items-center pl-12">
          <div className="w-full flex justify-start z-10 h-auto">
            <div id="avatar" className="flex items-center">
              <Image src={data.avatar || '/avatar.jpg'} alt="avatar" 
                className="rounded-3xl h-[135px] w-[135px]" width={135} height={135}
              />
            </div>

            <div id="info" className="flex h-[135px] items-center justify-end pl-4">
              <div className="w-full h-full flex flex-col justify-between">
                <div className="font-medium text-[1.7rem]">
                  {data.name} 
                </div>

                <div className="text-gray-300 text-[0.9rem] flex">
                  <p>Join {data.created_at.substring(0, 7)}</p>
                  <div id="Flag" className="ml-3 flex">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png" alt="flag" 
                      className="h-[1.1rem]" width={30} height={0}
                    />
                    <p className="ml-1">{data.location}</p>
                  </div>
                </div>

                <div className="w-full flex justify-start mt-4">
                  <button className="bg-gray-900 rounded-lg w-[130px] flex items-center justify-center h-10 text-[1rem] mr-4 bg-gradient-to-r from-[#067d71] to-[#3dbda7]">
                    <div className="flex items-center"><AiOutlineUserAdd size="20" className="mr-1" /> 
                      Follow
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="Right" className="w-[35%] h-full py-8 pr-12">
          <div className="w-full flex flex-col justify-between h-full">
            <div className="h-[33%] w-full flex justify-end z-10">
              <div className="w-fit h-full bg-gray-400 bg-opacity-90 rounded-xl flex">
                <div id="Image" className="py-1.5 flex translate-x-4">
                    <Image src="https://picsum.photos/id/50/99/99" alt="picture" 
                      className="rounded-full" width={30} height={30}
                    />
                    <Image src="https://picsum.photos/id/223/99/99" alt="picture" 
                      className="rounded-full -translate-x-4" width={30} height={30}
                    />
                    <Image src="https://picsum.photos/id/199/99/99" alt="picture" 
                      className="rounded-full -translate-x-8" width={30} height={30}
                    />
                </div>

                <div className="flex items-center text-[0.75rem] pr-3 text-gray-800">
                  <p className="w-full">
                    You and <span className="text-white text-center cursor-pointer">{}</span>{' '}
                    also follow <span className="text-white text-center cursor-pointer">3 others</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[33%] w-full py-8 flex justify-end z-10">
              <div className="flex items-center">
                <button className="bg-gray-400 bg-opacity-90 py-1.5 px-3 rounded-lg text-[0.75rem]">
                  Copy Profile Link
                </button> 
              </div>
            </div>

            <div className="h-[33%]">
              <div className="flex justify-end z-10 space-x-2">

                {data.gaming_platform?.slice(0, 5).map(((gp: any, index) => (
                  <div className="z-20 relative" key={index}>
                    {platform[gp.slug as keyof typeof platform]?.icon('h-[2.4em] w-[2.4em]')}
                  </div>
                )))}
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="Bottom" className="bg-gray-800 bg-opacity-50 w-full h-full rounded-b-xl flex items-center justify-between">
        <div id="Left" className="w-[50%] py-6 flex items-center">
          <div className="flex w-full justify-between xl:p-0 px-2">
            <div className="w-[25%] flex flex-col justify-center items-center border-r-[3px] border-r-gray-50">
              <span>230K</span>
              <span>CLIP VIEWS</span>
            </div>
            <div className="w-[25%] flex flex-col justify-center items-center border-r-[3px] border-r-gray-50">
              <span>11</span>
              <span>CLIPS</span>
            </div>
            <div className="w-[25%] flex flex-col justify-center items-center border-r-[3px] border-r-gray-50">
              <span>5.7K</span>
              <span>FOLLOWERS</span>
            </div>
            <div className="w-[25%] flex flex-col justify-center items-center">
              <span>26</span>
              <span>FOLLOWING</span>
            </div>
          </div>
        </div>

        <div id="Right" className="w-[50%] h-full">
          <p className="w-full h-full text-center px-4">
            {data.bio}
          </p>
        </div>
      </div>
    </div>
  )
}