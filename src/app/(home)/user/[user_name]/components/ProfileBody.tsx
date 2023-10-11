"use client"

import { useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { BsThreeDotsVertical } from "react-icons/bs";
// import PostDetail from "@/app/(home)/post/postDetail";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Chart } from 'react-chartjs-2';
import { AiFillClockCircle, AiFillCloseCircle, AiFillTrophy } from "react-icons/ai";
import { RiSwordFill } from "react-icons/ri";
import { FaInfinity } from "react-icons/fa"

ChartJS.register( ArcElement, Tooltip, Legend );



export default function ProfileBody({ params } : { params: { user_name: string }}) {

  const [menuBar, setMenuBar] = useState<string>('Feed');

  const menuBars: Array<string> = [
    'Feed',
    'Favorites',
    'Tagged',
    'Activity',
    'Photo'
  ]

  const tag: Array<string> = [
    '#League of Legends',
    '#LOL',
    '#sylas'

  ]

  const feed = [
    {
      user_name: 'HeheOnBush',
      avatar: 'https://picsum.photos/99/99',
      image: 'https://i.redd.it/project-sylas-wallpaper-by-erisiar-and-freljord-sylas-v0-hpt76txexxb81.jpg?width=1280&format=pjpg&auto=webp&s=d25a6ce2673d32954919f6cead2bbe1a5055f4f0',
      title: 'This is a title and it goes here like this, fun!!!!!',
      tag: [
        '#League of Legends',
        '#LOL',
        '#sylas',
      ]
    },
    {
      user_name: 'Faker',
      avatar: 'https://picsum.photos/99/98',
      image: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/01/Federation-Of-Free.jpg',
      title: 'Lien quan mobile, thang bai tai ky nang',
      tag: [
        '#AOV',
        '#Lienquan',
        '#LQM',
      ]
    },
    {
      user_name: 'LeeSangHyeok',
      avatar: 'https://picsum.photos/99/97',
      image: 'https://cdn.tgdd.vn/Files/2023/08/31/1545294/code-free-fire-1-310823-210041.jpg',
      title: 'Free fire song dai moi tro thanh huyen thoai',
      tag: [
        '#FreeFire',
        '#sonsungtangdame',
        '#AK47'
      ]
    },
  ]

  const data = {
    labels: [],
    datasets: [{
      label: '',
      data: [10, 4, 4, 2, 5],
      backgroundColor: ['#d33e3b', '#f4be32', '#539343', '#3fa6ed', '#174886'],
      borderColor: ['transparent'],
    }],
  }

  const dataStatus = [
    { bgColor: '#d33e3b', status: 'Not Started'},
    { bgColor: '#f4be32', status: 'Unfinished'},
    { bgColor: '#539343', status: 'Beaten'},
    { bgColor: '#3fa6ed', status: 'Completed'},
    { bgColor: '#174886', status: 'Continuous'},
  ]

  let options = {
    cutout: '60%',
  }

  return (
    <div className="flex mt-8 justify-between">
      <div id="Left" className="w-[52%] xl:w-[calc(100%-33em)] bg-slate-900 bg-opacity-0">
        <div id="Menu" className="flex relative text-[1.1rem]">

          {menuBars.map(menu => (
            <div className={`cursor-pointer py-2 z-10 mr-8 border-b-2 border-transparent ${menuBar === menu ? 'border-b-gray-900' : ''}`}
              onClick={() => setMenuBar(menu)}
            >
              {menu}
            </div>
          ))}

          <div className="absolute bottom-0 z-0 w-full bg-gradient-to-r from-[#f1f1f1] to-[transparent] h-[2px]" />
        </div>

        <div>
          <div className="mt-4 w-full flex">
            <div id="Game_Filter" className="w-[30%]">
              <Select>
                <SelectTrigger className="">
                  <SelectValue className="" placeholder="Game filter" />
                </SelectTrigger>

                <SelectContent className="bg-background">
                  <SelectGroup>
                    <SelectItem className="bg-background hover:bg-muted" value="League of Legends">
                      League of Legends
                    </SelectItem>

                    <SelectItem className="bg-background hover:bg-muted" value="Valorant">
                      Valorant
                    </SelectItem>

                    <SelectItem className="bg-background hover:bg-muted" value="Genshin Impact">
                      Genshin Impact
                    </SelectItem>

                    <SelectItem className="bg-background hover:bg-muted" value="CS:GO">
                      CS:GO
                    </SelectItem>

                    <SelectItem className="bg-background hover:bg-muted" value="Free Fire">
                      Free Fire
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-[5%]" />

            <div id="Sort_by" className="w-[30%]">
            <Select>
                <SelectTrigger className="">
                  <SelectValue className="" placeholder="Sort by" />
                </SelectTrigger>

                <SelectContent className="bg-background">
                  <SelectGroup>
                    <SelectItem className="bg-background hover:bg-muted" value="Newest">
                      Newest
                    </SelectItem>

                    <SelectItem className="bg-background hover:bg-muted" value="Oldest">
                      Oldest
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* <div id="Feed" className="w-full h-[800px] mt-4 pr-2">
          {feed.map(fd => (
            <div className="h-auto w-full bg-gray-900 bg-opacity-90 rounded-xl border-gray-500 border mt-4">
              <div id="Top" className="flex justify-between">
                <div id="Left" className="p-2 flex items-center">
                  <img src={fd.avatar} alt="avatar" 
                    className="rounded-lg w-[40px]"
                  />
                  <p className="pl-2">{fd.user_name}</p>
                </div>
                
                <div id="Right" className="w-auto p-2 flex items-center justify-end">
                  <p className="w-auto cursor-pointer text-[0.8rem] text-gray-600"> 
                    <span className="text-white">Zzyzxx</span> is with {' '}
                    <span className="text-white">{fd.user_name}</span>
                  </p>
                  <BsThreeDotsVertical size={25} />
                </div>
              </div>

              <div id="Bottom">
                <div className="">
                  <img src={fd.image} alt="image" />
                </div>

                <div id="" className="p-4 mt-2 text-[1.1rem] font-medium">
                  <p>{fd.title}</p>
                  <div className="text-gray-600">
                    1459 Views
                  </div>
                </div>
              </div>

              <div id="Tag" className="flex p-4 w-full">
                {fd.tag.map(tag => (
                  <div className="py-0 px-2 mr-2 bg-gray-600 rounded-full cursor-pointer">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div> */}
        {/* <div className="mt-4 space-y-4">
          <PostDetail></PostDetail>
          <PostDetail></PostDetail>
          <PostDetail></PostDetail>
          <PostDetail></PostDetail>
        </div> */}
      </div>

      <div id="Right" className="w-[23rem] xl:w-[30em] rounded-xl bg-[#242832]">
          <div id="Top" className="flex items-center h-auto">
            <div id="Left" className="w-[60%] flex items-center justify-center p-4">
              <div className="w-full h-auto aspect-square flex items-center justify-center">
                <Doughnut data={data} options={options} className="w-full" />
              </div>
              <div className="absolute flex flex-col mt-2 cursor-pointer">
                <span className="font-bold text-[30px] h-[33kpx]">1853</span>
                <span className="text-center text-gray-600">Total</span>
              </div>
            </div>

            <div id="Right" className="w-[40%] h-[14em] xl:h-[16em] p-4">
              <div className="flex flex-col justify-around h-full cursor-pointer">
                {dataStatus.map(dts => (
                  <div className="flex items-center">
                    <div className="cursor-pointer w-2 h-5" style={{ backgroundColor: dts.bgColor }} />
                    <div className="ml-2">{dts.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="Bottom" className="flex pb-8">
            <div>
              <table className="table-fixed w-full">
                <thead className="w-full h-12">
                  <tr className="w-full">
                    <th></th>
                    <th><div className="w-full flex items-center justify-center"><AiFillCloseCircle size={25} color="#d33e3b" /></div></th>
                    <th><div className="w-full flex items-center justify-center"><AiFillClockCircle size={25} color="#f4be32" /></div></th>
                    <th><div className="w-full flex items-center justify-center"><RiSwordFill size={25} color="#539343" /></div></th>
                    <th><div className="w-full flex items-center justify-center"><AiFillTrophy size={25} color="#3fa6ed" /></div></th>
                    <th><div className="w-full flex items-center justify-center"><FaInfinity size={25} color="#174886" /></div></th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  <tr className="h-12 bg-[#2a303b]">
                    <td>PC</td>
                    <td>394</td>
                    <td>17</td>
                    <td>11</td>
                    <td>36</td>
                    <td>23</td>
                  </tr>
                  <tr className="h-12">
                    <td>PC</td>
                    <td>394</td>
                    <td>17</td>
                    <td>11</td>
                    <td>36</td>
                    <td>23</td>
                  </tr>
                  <tr className="h-12 bg-[#2a303b]">
                    <td>PC</td>
                    <td>394</td>
                    <td>17</td>
                    <td>11</td>
                    <td>36</td>
                    <td>23</td>
                  </tr>
                  <tr className="h-12">
                    <td>PC</td>
                    <td>394</td>
                    <td>17</td>
                    <td>11</td>
                    <td>36</td>
                    <td>23</td>
                  </tr>
                  <tr className="h-12 bg-[#2a303b]">
                    <td>PC</td>
                    <td>394</td>
                    <td>17</td>
                    <td>11</td>
                    <td>36</td>
                    <td>23</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        
      </div>
    </div>
  )
}