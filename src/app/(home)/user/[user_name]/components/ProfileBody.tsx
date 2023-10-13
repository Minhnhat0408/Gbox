"use client";

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

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Chart } from "react-chartjs-2";
import {
  AiFillClockCircle,
  AiFillCloseCircle,
  AiFillTrophy,
} from "react-icons/ai";
import { RiSwordFill } from "react-icons/ri";
import { FaInfinity } from "react-icons/fa";
import PostItem from "@/components/post-ui/post-item";
import PostsScroll from "@/components/post-ui/posts-scroll";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProfileBody({
  params,
}: {
  params: { user_name: string };
}) {
  const [menuBar, setMenuBar] = useState<string>("Feed");

  const menuBars: Array<string> = [
    "Feed",
    "Favorites",
    "Tagged",
    "Activity",
    "Photo",
  ];

  const data = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [10, 4, 4, 2, 5],
        backgroundColor: [
          "#d33e3b",
          "#f4be32",
          "#539343",
          "#3fa6ed",
          "#174886",
        ],
        borderColor: ["transparent"],
      },
    ],
  };

  const dataStatus = [
    { bgColor: "#d33e3b", status: "Not Started" },
    { bgColor: "#f4be32", status: "Unfinished" },
    { bgColor: "#539343", status: "Beaten" },
    { bgColor: "#3fa6ed", status: "Completed" },
    { bgColor: "#174886", status: "Continuous" },
  ];

  let options = {
    cutout: "60%",
  };

  return (
    <div className="flex mt-8 justify-between">
      <div
        id="Left"
        className="w-[52%] xl:w-[calc(100%-33em)] bg-slate-900 bg-opacity-0"
      >
        <div id="Menu" className="flex relative text-[1.1rem]">
          {menuBars.map((menu) => (
            <div
              className={`cursor-pointer py-2 z-10 mr-8 border-b-2 border-transparent ${
                menuBar === menu ? "border-b-gray-900" : ""
              }`}
              onClick={() => setMenuBar(menu)}
              key={menu}
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
                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="League of Legends"
                    >
                      League of Legends
                    </SelectItem>

                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="Valorant"
                    >
                      Valorant
                    </SelectItem>

                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="Genshin Impact"
                    >
                      Genshin Impact
                    </SelectItem>

                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="CS:GO"
                    >
                      CS:GO
                    </SelectItem>

                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="Free Fire"
                    >
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
                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="Newest"
                    >
                      Newest
                    </SelectItem>

                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="Oldest"
                    >
                      Oldest
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className=" mt-10">
          <PostsScroll location="profile"/>
        </div>

       
      </div>

      <div id="Right" className="w-[23rem] xl:w-[30em] rounded-xl h-fit card-container">
        <div id="Top" className="flex items-center h-auto">
          <div
            id="Left"
            className="w-[60%] flex items-center justify-center p-4"
          >
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
              {dataStatus.map((dts) => (
                <div className="flex items-center" key={dts.status}>
                  <div
                    className="cursor-pointer w-2 h-5"
                    style={{ backgroundColor: dts.bgColor }}
                  />
                  <div className="ml-2">{dts.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="Bottom" className="flex  pb-8">
          <div>
            <table className="table-fixed w-full">
              <thead className="w-full h-12">
                <tr className="w-full">
                  <th></th>
                  <th>
                    <div className="w-full flex items-center justify-center">
                      <AiFillCloseCircle size={25} color="#d33e3b" />
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex items-center justify-center">
                      <AiFillClockCircle size={25} color="#f4be32" />
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex items-center justify-center">
                      <RiSwordFill size={25} color="#539343" />
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex items-center justify-center">
                      <AiFillTrophy size={25} color="#3fa6ed" />
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex items-center justify-center">
                      <FaInfinity size={25} color="#174886" />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="text-center">
                <tr className="h-12 ">
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
                <tr className="h-12 ">
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
                <tr className="h-12 ">
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
  );
}
