/* eslint-disable @next/next/no-img-element */
import { ProfilesType } from "@/types/supabaseTableType";
import Notification from "./Notification";
import ProfileMenu from "./ProfileMenu";
import Search from "./Search";
import Image from "next/image";

type HeaderProps = {
  userInformation: ProfilesType | null;
};

function Headers({ userInformation }: HeaderProps) {
  return (
    <header className="flex items-center px-10 justify-between ">
    
      <div className=" flex justify-center items-center">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-12 h-12  "
              
            />
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
