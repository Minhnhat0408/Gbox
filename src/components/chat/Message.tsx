import Image from 'next/image'
import React from 'react'
import { BiSolidImage } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { IoCall } from 'react-icons/io5'

export default function Message() {
  return (
    <div className="w-[500px]">
      <div className='p-2 pr-6'>
        <div className='flex gap-4 py-4 w-full border-b-2'>
          <div className='w-[400px] flex'>
            <Image src='https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/images/profile-91a4f96f-1c89-4907-910e-82a244e9d7fa-lno1fele' 
              alt='image' width={1000} height={1000}  className='rounded-full h-[60px] w-[60px]'
            />
            <div className='h-full flex items-center ml-2'>
              Messiiiii
            </div>
          </div>

          <div className='flex items-center'>
            <div className='flex items-center'>
              <IoCall className="w-[40px] h-[40px] hover:bg-[#333345] rounded-full p-2" size="30" />
              <BsThreeDots className="w-[40px] h-[40px] ml-6 hover:bg-[#333345] rounded-full p-2"/>
            </div>
          </div>
        </div>
      </div>
      <div id='Time' className='text-sm w-full text-center mt-6 pl-2'>
        09:56 PM
      </div>

      <div id='Chat' className='mt-6 space-y-6 h-[67vh] overflow-y-auto pl-2'>
        <div id='Sender' className='max-w-[300px] bg-[#333345] p-4 rounded-tr-2xl rounded-bl-2xl flex float-left break-all'>
          Hello,

          Thank you for reaching out. I'm currently unavailable as I'm offline or away from my desk. 
          Your message is important to me, and I will get back to you as soon as I'm back online ˚ʚ♡ɞ˚
        </div>

        <div id='Receiver' className='max-w-[300px] mr-6 bg-[#333345] p-4 rounded-tl-2xl rounded-br-2xl flex float-right break-all mt-6'>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>

        <div id='Sender' className='max-w-[300px] bg-[#333345] p-4 rounded-tr-2xl rounded-bl-2xl flex float-left break-all'>
          Hello,

          Thank you for reaching out. I'm currently unavailable as I'm offline or away from my desk. 
          Your message is important to me, and I will get back to you as soon as I'm back online ˚ʚ♡ɞ˚
        </div>

        <div id='Receiver' className='max-w-[300px] mr-6 bg-[#333345] p-4 rounded-tl-2xl rounded-br-2xl flex float-right break-all mt-6'>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>

        <div id='Sender' className='max-w-[300px] bg-[#333345] p-4 rounded-tr-2xl rounded-bl-2xl flex float-left break-all'>
          Hello,

          Thank you for reaching out. I'm currently unavailable as I'm offline or away from my desk. 
          Your message is important to me, and I will get back to you as soon as I'm back online ˚ʚ♡ɞ˚
        </div>

        <div id='Receiver' className='max-w-[300px] mr-6 bg-[#333345] p-4 rounded-tl-2xl rounded-br-2xl flex float-right break-all mt-6'>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>

        <div id='Sender' className='max-w-[300px] bg-[#333345] p-4 rounded-tr-2xl rounded-bl-2xl flex float-left break-all'>
          Hello,

          Thank you for reaching out. I'm currently unavailable as I'm offline or away from my desk. 
          Your message is important to me, and I will get back to you as soon as I'm back online ˚ʚ♡ɞ˚
        </div>

        <div id='Receiver' className='max-w-[300px] mr-6 bg-[#333345] p-4 rounded-tl-2xl rounded-br-2xl flex float-right break-all mt-6'>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>
      </div>

      <div id='Send' className='absolute bottom-4 w-[476px] pl-2 flex items-center'>
        <input type="file" hidden id='file' />
        <label htmlFor="file" className='mr-4 cursor-pointer'>
          <BiSolidImage size="25" color="#004741" />
        </label>
        <input type="text" className='outline-none bg-[#333345] py-2 px-6 rounded-full w-full' placeholder='Aa' />

      </div>
    
    </div>

  )
}
