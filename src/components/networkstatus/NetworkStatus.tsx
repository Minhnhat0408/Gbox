'use client';

import React, { useEffect } from 'react';
import { BsWifi, BsWifiOff } from 'react-icons/bs';
import { Toaster, toast } from "sonner";

export default function NetworkStatus() {


  useEffect(() => {

    window.addEventListener('online', () =>  {
      toast(
        <div className='flex items-center justify-center'>
          <BsWifi size={25} className='text-[#067d71]' />
          <p className='ml-2 mt-1 font-semibold text-white'>Your internet connection was restored.</p>
        </div>
        )
    })

    window.addEventListener('offline', () =>  {
      toast(
        <div className='flex items-center'>
          <BsWifiOff size={25} className='text-gray-100' />
          <p className='ml-2 font-semibold text-white'>You are currently offline. <span className='text-[#067d71]'>Refresh</span></p>
        </div>
      )
    })

    return () => {
      window.removeEventListener('online', () =>  {
        toast(
          <div className='flex items-center justify-center'>
            <BsWifi size={25} className='text-[#067d71]' />
            <p className='ml-2 mt-1 font-semibold text-white'>Your internet connection was restored.</p>
          </div>
        )
      })

      window.removeEventListener('offline', () =>  {
        toast(
          <div className='flex items-center'>
            <BsWifiOff size={25} className='text-gray-100' />
            <p className='ml-2 font-semibold text-white'>You are currently offline. <span className='text-[#067d71]'>Refresh</span></p>
          </div>
        )
      })
    }
    
  })

  return (
    <>
      <Toaster toastOptions={{ duration: 3000, style: { backgroundColor: '#3dbda7', border: 0, width: 300 } }} position='bottom-left' closeButton={true} />
    </>
  )
}
