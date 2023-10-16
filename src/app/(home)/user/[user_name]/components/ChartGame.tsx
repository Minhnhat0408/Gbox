'use client';


import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import {  AiFillStar } from 'react-icons/ai';
import { FaCheckCircle, FaStopCircle, FaPauseCircle } from 'react-icons/fa';
import { PiCirclesThreeFill } from 'react-icons/pi';
import { RiMenu5Fill } from 'react-icons/ri';

import { platform } from '@/constants/platformIcon';


ChartJS.register( ArcElement, Tooltip, Legend );

export default function Chartgame({ data } : { data: any}) {

  let quit = 0;
  let play = 0;
  let wishlist = 0;
  let beat = 0;
  let backlog = 0;
  let pause = 0;

  data.forEach((dt: any) => {
    if (dt.status == 'play') {
      play++;
    }
    if (dt.status == 'quit') {
      quit++;
    }
    if (dt.status == 'wishlist') {
      wishlist++;
    }
    if (dt.status == 'beat') {
      beat++;
    }
    if (dt.status == 'backlog') {
      backlog++;
    }
    if (dt.status == 'pause') {
      pause++;
    }
  })

  const datas = {
    labels: [],
    datasets: [{
      label: '',
      data: [ quit, pause, beat, play, backlog, wishlist],
      backgroundColor: ['#d33d3c', '#e38523', '#529143', '#0b97ac',  '#174787', '#42495b'],
      borderColor: ['transparent'],
    }],
  }

  const dataStatus = [
    {bgColor: '#42495b', status: 'Wishlist'},
    { bgColor: '#174787', status: 'Backlog'},
    { bgColor: '#0b97ac', status: 'Play'},
    { bgColor: '#529143', status: 'Beat'},
    { bgColor: '#e38523', status: 'Paused'},
    { bgColor: '#d33d3c', status: 'Quit'},
  ]

  let options = {
    cutout: '60%',
  }

  let arraydt: string[] = [];

  data.map((dt: any) => {
    arraydt.push(dt.game_meta_data.platform[0]);
  })

  let arrayplatform = arraydt.filter((item: string, index: number) => 
    arraydt.indexOf(item) == index
  )


  const chartData = arrayplatform.map((ap: string) => {
    let quitchart = 0;
    let pausedchart = 0;
    let beatchart = 0;
    let playchart = 0;
    let backlogchart = 0;
    let wishlistchart = 0;

    data.map((dt: any) => {
      if (dt.game_meta_data.platform[0] == ap) {
        if (dt.status == 'quit') {
          quitchart++;
        }
        if (dt.status == 'pause') {
          pausedchart++;
        }
        if (dt.status == 'beat') {
          beatchart++;
        }
        if (dt.status == 'play') {
          playchart++;
        }
        if (dt.status == 'backlog') {
          backlogchart++;
        }
        if (dt.status == 'wishlist') {
          wishlistchart++;
        }
      }
    })

    return {
      platform: ap,
      quit: quitchart,
      paused: pausedchart,
      beat: beatchart,
      play: playchart,
      backlog: backlogchart,
      wishlist: wishlistchart
    }
  })

  return (
    <div id="Right" className="flex-1 rounded-xl card-container h-fit">
          <div id="Top" className="flex items-center h-fit">
            <div id="Left" className="w-[60%] xl:w-[65%] 2xl:w-[70%] flex items-center justify-center p-4">
              <div className="w-full h-auto aspect-square flex items-center justify-center">
                <Doughnut data={datas} options={options} className="w-full" />
              </div>
              <div className="absolute flex flex-col mt-2 cursor-pointer">
                <span className="font-bold text-[30px] h-[33px] text-center">{data.length}</span>
                <span className="text-center">Total</span>
              </div>
            </div>

            <div id="Right" className="w-[40%] xl:w-[35%] 2xl:w-[30%] h-[11em] xl:h-[15em] 2xl:h-[19em] py-4">
              <div className="flex flex-col justify-around h-full cursor-pointer">
                {dataStatus.map((dts, index) => (
                  <div className="flex items-center" key={index}>
                    <div className="cursor-pointer w-2 h-5" style={{ backgroundColor: dts.bgColor }} />
                    <div className="ml-2">{dts.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="Bottom" className="flex pb-6 px-2">
            <div className='w-full'>
              <table className="table-auto w-full">
                <thead className="w-full h-12">
                  <tr className="w-full">
                    <th></th>
                    <th><div className="w-full flex items-center justify-center"><FaStopCircle size={20} color="#d33d3c" /></div></th>
                    <th><div className="w-full flex items-center justify-center"><FaPauseCircle size={20} color="#e38523" /></div></th>
                    <th><div className="w-full flex items-center justify-center"><FaCheckCircle size={20} color="#539343" /></div></th>
                    <th><div className="w-full flex items-center justify-center rotate-90"><PiCirclesThreeFill size={20} color="#3fa6ed" /></div></th>
                    <th><div className="w-full flex items-center justify-center"><RiMenu5Fill size={20} color='#174787' /></div></th>
                    <th><div className="w-full flex items-center justify-center"><AiFillStar size={20} color='#42495b' /></div></th>
                  </tr>
                </thead>

                <tbody className="text-center">  
                  {chartData?.map((cd: any, index: number) => (
                    <tr className={`h-12`} key={index}>
                    {platform[cd.platform as keyof typeof platform]?.name ? (
                      <td className='w-[105px]'>{platform[cd.platform as keyof typeof platform]?.name}</td>
                    ): (
                      <td className='w-[105px]'>{cd.platform}</td>
                    )}
                    <td>{cd.quit}</td>
                    <td>{cd.paused}</td>
                    <td>{cd.beat}</td>
                    <td>{cd.play}</td>
                    <td>{cd.backlog}</td>
                    <td>{cd.wishlist}</td>
                  </tr>
                  ))}            
                </tbody>
              </table>
            </div>
          </div>
        
      </div>
  )
}
