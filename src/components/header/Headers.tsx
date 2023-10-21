/* eslint-disable @next/next/no-img-element */
'use client';
import { ProfilesType } from "@/types/supabaseTableType";
import Notification from "./Notification";
import ProfileMenu from "./ProfileMenu";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import  Search  from "../search/Search";

type HeaderProps = {
  userInformation: ProfilesType | null;
};


function Headers({ userInformation }: HeaderProps) {

  return (
    <header className="z-10 flex items-center justify-between px-10">
      <div className=" flex items-center justify-center">
        <Link href={"/"} className="">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            className=" w-12 h-12"
          />
        </Link>

        {/* Test */}
        <Search />

      </div>
      <div className="gap-x-4 flex items-center">
        <div className="text-3xl font-bold">
          3000 <span className="text-[#3DBDA7]">G</span>
        </div>
        <Notification />
        <ProfileMenu data={userInformation}>
          <img
            src={userInformation?.avatar || "avatar.jpg"}
            className="object-cover object-center w-10 h-10 rounded-full"
            alt="avatar"
          ></img>
        </ProfileMenu>
      </div>
    </header>
  );
}

export default Headers;
