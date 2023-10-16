'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import {  AiFillStar } from 'react-icons/ai';
import { FaCheckCircle, FaStopCircle, FaPauseCircle } from 'react-icons/fa';
import { PiCirclesThreeFill } from 'react-icons/pi';
import { RiMenu5Fill } from 'react-icons/ri';

export default function CurrentGame({ data } : { data: any }) {

  const calBgcolor = (stt: string) => {
    if (stt === 'play') {
      return '#0b97ac'
    }
    else if (stt === 'beat') {
      return '#7faa36'
    }
    else if (stt === 'pause') {
      return '#e38523'
    }
    else if (stt === 'backlog') {
      return '#174787'
    }
    else if (stt === 'quit') {
      return '#f65f58'
    }
    else if (stt === 'wishlist') {
      return '#42495b'
    }
  }


  return (
    <div className="flex space-x-4 mt-2 overflow-x-auto scroll-smooth [&>div]:flex-shrink-0 w-full h-[270px] rounded-lg">
      {data.map((currentgame: any) => (
        <div className='mb-2 w-[150px]'>
          <Link href={currentgame.game_meta_data.url}>
            <div id='Image' className='relative'>
              <Image src={currentgame.game_meta_data.image} alt='' width={300} height={400} className="rounded-lg w-[150px] h-[200px]" />
              <div className="absolute bottom-2 right-2 flex px-2 py-1 rounded-lg text-[13px]" style={{ backgroundColor: calBgcolor(currentgame.status) }}>
                <p className='flex items-center justify-center text-center mr-1'>{currentgame.status}</p>
                {currentgame.status === 'pause' ? <FaPauseCircle size="25" /> : null}
                {currentgame.status === 'beat' ? <FaCheckCircle size="25" /> : null}
                {currentgame.status === 'play' ? <PiCirclesThreeFill size="25" className='rotate-90' /> : null}
                {currentgame.status === 'quit' ? <FaStopCircle size="25" /> : null}
                {currentgame.status === 'backlog' ? <RiMenu5Fill size="25" /> : null}
                {currentgame.status === 'wishlist' ? <AiFillStar size="25" />: null}
              </div>
            </div>

            <div className="text-center w-full h-7 font-semibold text-[12px]">
            <p className="text-black">{currentgame.game_meta_data.name}</p>
            <p className="uppercase text-gray-300">{currentgame.game_meta_data.producer}</p>
          </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
