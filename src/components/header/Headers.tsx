/* eslint-disable @next/next/no-img-element */
'use client';
import { ProfilesType } from "@/types/supabaseTableType";
import Notification from "./Notification";
import ProfileMenu from "./ProfileMenu";
import Search from "./Search";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { useState } from "react";

type HeaderProps = {
  userInformation: ProfilesType | null;
};

function Headers({ userInformation }: HeaderProps) {
  let [resUser, setResUser] = useState("");

  let [resUserArray, setResUserArray] = useState([]);

  let searchRes = async (name: any) => {
    await axios.get(`/api/userSearch?name=${name}`)
    .then((res) => {
      console.log(res.data);
      setResUserArray(res.data);
    });
  };

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
        <Search />

        {/* Test */}
        <div className="rounded-3xl w-[320px] max-h-14 bg-[#00453F] px-6 py-2 ml-4 flex items-center">
          <FiSearch className="mr-4 text-2xl text-gray-400" />
          <input
            value={resUser}
            className="w-full h-8 bg-[#00453F] focus-visible:outline-none placeholder:text-gray-400 pr-4"
            placeholder="Search user..."
            onChange={e => {
              setResUser(e.target.value);
              searchRes(e.target.value);
            }}
          />
          {resUserArray.length > 0 ? (
            <div>
              {resUserArray.map((user: any, index: number) => (
                <div className="cursor-pointer" key={index}>
                  <Link href={'/user/' + user.name} onClick={() => {
                    setResUser('');
                    setResUserArray([]);
                    }}
                  >
                    {user.name}
                  </Link>
                </div>
              ))}
            </div>
          ) : null}

          {resUserArray.length < 1 && resUser.length > 0  ? (
            <div>
              No User
            </div>
          ) : null }
        </div>

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
