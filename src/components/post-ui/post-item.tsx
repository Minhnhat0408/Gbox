"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { FaShieldHalved, FaCommentDots } from "react-icons/fa6";
import { LuSwords } from "react-icons/lu";
import { useState } from "react";
import Slider from "../animations/slider";
import gameProgress from "@/constants/progress";
export default function PostItem() {
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
    <article className={cn("w-full h-80 bg-post rounded-[40px] flex p-6 ")}>
      <div className="2xl:w-2/5 w-1/2 gap-y-3 flex flex-col h-full">
        <div className="flex w-fit 2xl:gap-x-4 gap-x-3">
          <Avatar className="2xl:w-16 2xl:h-16 h-12 w-12 border-2 border-primary  ">
            <AvatarImage src="/image 1.png" />
            <AvatarFallback className="bg-gray-700 ">
              Avatar
            </AvatarFallback>
          </Avatar>
          <div className="inline-flex flex-col relative  justify-evenly">
            <div className="px-3 py-1 bg-primary w-full  rounded-3xl inline-flex items-center">
              {gameProgress.wishlist.icon('w-3 h-3 ','w-5 h-5 mr-2')} <div className=" line-clamp-1">League of Legends</div>
            </div>
            <p className="italic text-muted-foreground inline-flex 2xl:text-base text-sm">10:34 pm</p>
          </div>
        </div>
        <div className="flex flex-col gap-x-3 gap-y-3 pr-10">
          <h2 className="text-xl font-bold">
            Minh sieu dep trai fasd sdaf sa fd asds
          </h2>
          <p className="text-muted-foreground font-bold line-clamp-2 leading-5 ">
            Minh sieu dep trai dafsj hello azi ngon moto this is the first tiem
            I try this
          </p>
        </div>
        <div className={cn(" mt-auto flex gap-x-2 ")}>
          <div className="flex w-16 h-8 relative">
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
      <div className="flex-1 bg-muted rounded-[40px] justify-center flex  overflow-hidden">
        <Slider className="h-full w-full" delay={5000}>
          <div className="keen-slider__slide w-full h-full rounded-[40px] bg-muted">
            <Image
              src={"/images/login-bg.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="hello"
              className=" w-auto h-full  object-cover  "
            />
          </div>
          <div className="keen-slider__slide w-full h-full rounded-[40px] bg-muted">
            <Image
              src={"/images/login-bg.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="hello"
              className=" w-auto h-full  object-cover  "
            />
          </div>
          <div className="keen-slider__slide w-full h-full rounded-[40px] bg-muted">
            <Image
              src={"/images/login-bg.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="hello"
              className=" w-auto h-full  object-cover  "
            />
          </div>
          <div className="keen-slider__slide w-full h-full rounded-[40px] bg-muted">
            <Image
              src={"/images/login-bg.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="hello"
              className=" w-auto h-full  object-cover  "
            />
          </div>
          <div className="keen-slider__slide w-full h-full rounded-[40px] bg-muted">
            <Image
              src={"/images/login-bg.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="hello"
              className=" w-auto h-full  object-cover  "
            />
          </div>
          <div className="keen-slider__slide w-full h-full rounded-[40px] bg-muted">
            <Image
              src={"/images/login-bg.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="hello"
              className=" w-auto h-full  object-cover  "
            />
          </div>
          <div className="keen-slider__slide w-full h-full rounded-[40px] bg-muted">
            <Image
              src={"/images/login-bg.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="hello"
              className=" w-auto h-full  object-cover  "
            />
          </div>
        </Slider>
      </div>
    </article>
  );
}
