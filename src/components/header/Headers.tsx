/* eslint-disable @next/next/no-img-element */
import { ProfilesType } from "@/types/supabaseTableType";
import Notification from "./Notification";
import ProfileMenu from "./ProfileMenu";
import Search from "./Search";

type HeaderProps = {
  userInformation: ProfilesType | null;
};

function Headers({ userInformation }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mr-4">
      <Search />
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
