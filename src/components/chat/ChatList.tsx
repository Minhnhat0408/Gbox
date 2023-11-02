'use client';
import Image from 'next/image';
import React from 'react'
import { FiSearch } from 'react-icons/fi'

export default function ChatList() {



  return (
    <div className='w-[400px] h-full pr-6 border-r'>
      <div id='Search Bar' className='flex items-center bg-[#333345] rounded-full mb-4'>
        <FiSearch className="ml-2 mr-2 text-2xl text-gray-400" />
        <input type="text" name="" id="" placeholder='Search' className='bg-transparent outline-none py-2' />
      </div>

      <div id='ChatList' className='space-y-4'>
        <div className='flex px-[10px] justify-between bg-[#333345] h-20 rounded-xl cursor-pointer'>
          <div className='flex'>
            <div id='Image' className='h-full rounded-full flex items-center'>
              <Image src='https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/images/profile-91a4f96f-1c89-4907-910e-82a244e9d7fa-lno1fele' 
              alt='image' width={1000} height={1000}  className='rounded-full h-[60px] w-[60px]'
              />
            </div>

            <div className='h-full flex justify-center items-center ml-2'>
              <div className='h-[60px] flex flex-col justify-center'>
                <p className='font-semibold text-lg'>Hieu Minh</p>
                <p className='w-full text-sm text-gray-400'>May biet bo may...</p>
              </div>
            </div>
          </div>
          <div id='Time' className='flex items-center text-xs'>
            09:56 PM
          </div>
        </div>

        <div className='flex px-[10px] justify-between h-20 rounded-xl cursor-pointer'>
          <div className='flex'>
            <div id='Image' className='h-full rounded-full flex items-center'>
              <Image src='https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/images/profile-91a4f96f-1c89-4907-910e-82a244e9d7fa-lno1fele' 
              alt='image' width={1000} height={1000}  className='rounded-full h-[60px] w-[60px]'
              />
            </div>

            <div className='h-full flex justify-center items-center ml-2'>
              <div className='h-[60px] flex flex-col justify-center'>
                <p className='font-semibold text-lg'>Hieu Minh</p>
                <p className='w-full text-sm text-gray-400'>May biet bo may...</p>
              </div>
            </div>
          </div>
          <div id='Time' className='flex items-center text-xs w-fit'>
            09:56 PM
          </div>
        </div>

        <div className='flex px-[10px] justify-between h-20 rounded-xl cursor-pointer'>
          <div className='flex'>
            <div id='Image' className='h-full rounded-full flex items-center'>
              <Image src='https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/images/profile-91a4f96f-1c89-4907-910e-82a244e9d7fa-lno1fele' 
              alt='image' width={1000} height={1000}  className='rounded-full h-[60px] w-[60px]'
              />
            </div>

            <div className='h-full flex justify-center items-center ml-2'>
              <div className='h-[60px] flex flex-col justify-center'>
                <p className='font-semibold text-lg'>Hieu Minh</p>
                <p className='w-full text-sm text-gray-400'>May biet bo may...</p>
              </div>
            </div>
          </div>
          <div id='Time' className='flex items-center text-xs w-fit'>
            09:56 PM
          </div>
        </div>
      </div>
      
    </div>
  )
}
