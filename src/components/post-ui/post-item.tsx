"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { FaShieldHalved, FaCommentDots } from "react-icons/fa6";
import { LuSwords } from "react-icons/lu";
import { useState } from "react";
import Slider from "../animations/slider";
import gameProgress from "@/constants/progress";
import { PostDataType, ProfilesType } from "@/types/supabaseTableType";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { FaGamepad } from "react-icons/fa";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IoGameControllerSharp } from "react-icons/io5";
dayjs.extend(relativeTime);
export default function PostItem({
  content,
  created_at,
  event_id,
  game_name,
  game_progress,
  game_meta_data,
  user_id,
  media,
  user_meta_data,
  title,
}: PostDataType) {
  const [status, setStatus] = useState(0);
  const handleClickDown = () => {
    if (status === -1) {
      setStatus(0);
    } else {
      setStatus(-1);
    }
  };
  const handleClickUp = () => {
    if (status === 1) {
      setStatus(0);
    } else {
      setStatus(1);
    }
  };
  return (
    <article
      className={cn(
        "w-full  rounded-[40px] flex p-6 ",
        !media ? " h-fit card-container" : "  h-80 bg-post"
      )}
    >
      <div
        className={cn(
          "2xl:w-2/5 w-1/2 gap-y-5 flex flex-col h-full pr-4",
          !media && " !w-full"
        )}
      >
        <div className="flex w-fit 2xl:gap-x-4 gap-x-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="2xl:w-16 2xl:h-16 h-14 w-14 border-2 border-primary  ">
                  <AvatarImage src={user_meta_data.avatar || " "} />

                  <AvatarFallback className="bg-gray-700 ">
                    Avatar
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-home p-4">
                <div className="gap-x-2 flex">
                  <Avatar className="w-12 h-12">
                    <Link href={"/user/" + user_meta_data.name}>
                      <AvatarImage src={user_meta_data.avatar || " "} />{" "}
                    </Link>
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="gap-y-2">
                    <p className="">{user_meta_data.name}</p>
                    <span className="text-muted-foreground italic">
                      {user_meta_data.location}
                    </span>
                  </div>
                </div>
                {/* <div className="flex mt-3 font-bold">{Object.values(user_meta_data.gaming_platform).map((item,ind)  => {
                  return {
                    item.
                  }
                })
                </div> */}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="inline-flex flex-col relative  justify-evenly">
            <div className="px-3 py-1 bg-primary w-full  rounded-3xl inline-flex items-center select-none">
              {game_progress ? (
                gameProgress[game_progress as keyof typeof gameProgress].icon(
                  "w-3 h-3 ",
                  "2xl:w-5 2xl:h-5 h-4 w-4 mr-2"
                )
              ) : (
                <IoGameControllerSharp
                  className={" 2xl:w-5 2xl:h-5 h-4 w-4 mr-2 text-muted"}
                />
              )}{" "}
              {game_name ? (
                <Link
                  target="_blank"
                  href={"https://www.ign.com" + Object(game_meta_data).url}
                  className="2xl:text-base text-sm line-clamp-1"
                >
                  {game_name}
                </Link>
              ) : (
                <p className="2xl:text-base text-sm line-clamp-1">
                  Gbox Sharing
                </p>
              )}
            </div>
            <p className="italic text-muted-foreground inline-flex mt-2 2xl:text-base text-sm">
              {dayjs(created_at).fromNow()}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-x-3 gap-y-3 ">
          <h2 className="text-xl font-bold">{title}</h2>
          <p
            className={cn(
              "text-muted-foreground font-bold leading-5 ",
              !media ? " " : " line-clamp-3"
            )}
          >
            {content}
          </p>
        </div>
        <div className={cn(" mt-auto flex h-8 gap-x-2 ")}>
          <div className="xl:flex hidden w-16 h-8  relative">
            <Image
              src={"/images/login-bg.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="hello"
              className=" w-8 h-8 rounded-full absolute top-0 left-0  border-2 border-primary"
            />
            <Image
              src={"/images/login-bg.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="hello"
              className=" w-8 h-8 rounded-full absolute top-0 left-4 border-2   border-primary"
            />
            <Image
              src={"/images/login-bg.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="hello"
              className=" w-8 h-8 rounded-full absolute top-0 left-8 border-2   border-primary"
            />
          </div>
          <div
            className={cn(
              "flex text-muted rounded-3xl  overflow-hidden items-center relative bg-white ",
              status === 0
                ? " bg-white"
                : status === 1
                ? "bg-primary text-white"
                : "bg-red-400 text-white"
            )}
          >
            <button
              onClick={handleClickUp}
              className=" 2xl:text-xl text-lg px-2 cursor-pointer h-full flex  items-center  justify-center   group/up "
            >
              <div className="absolute top-0 left-0 h-full opacity-0 font-bold text-white 2xl:text-base text-sm flex justify-center items-center w-0 group-hover/up:w-full !bg-primary duration-500 group-hover/up:opacity-100">
                Win
              </div>
              <LuSwords />
            </button>
            <p className=" h-full 2xl:text-base text-sm flex items-center justify-center ">
              {10000 + status}
            </p>
            <button
              onClick={handleClickDown}
              className=" 2xl:text-xl text-lg h-full flex items-center justify-center px-2 cursor-pointer group/down"
            >
              <div className="absolute top-0 right-0 h-full w-0 opacity-0 font-bold text-base flex justify-center text-white items-center group-hover/down:w-full bg-red-400 duration-500 group-hover/down:opacity-100">
                Lose
              </div>
              <FaShieldHalved />
            </button>
          </div>
          <button className="text-muted bg-white duration-500 hover:bg-primary  rounded-3xl 2xl:text-xl text-lg px-2 flex items-center justify-center gap-x-2">
            <FaCommentDots />
            <span className="2xl:text-base text-sm ">100</span>
          </button>
        </div>
      </div>

      {media && (
        <div className="flex-1 bg-muted rounded-[40px] justify-center flex  overflow-hidden">
          <Slider
            className="h-full w-full "
            delay={5000}
            loop={media.url.length > 1}
          >
            {media.url.map((item, ind) => {
              return (
                <div
                  key={ind}
                  className="keen-slider__slide w-full h-full rounded-[40px] flex justify-center bg-muted"
                >
                  <Image
                    src={item}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="hello"
                    className=" w-auto h-full  object-cover  "
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      )}
    </article>
  );
}
