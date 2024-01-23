import { ProfilesType, UserGameDataType } from "@/types/supabaseTableType";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaFileWord, FaLocationCrosshairs, FaUser } from "react-icons/fa6";
import { IoGameController, IoTimeSharp } from "react-icons/io5";

type ProfileViewModeProps = {
  profile: ProfilesType;
  isCoach: boolean;
};

const BasicInformation = ({ profile, isCoach }: ProfileViewModeProps) => {
  // Name
  // BIo
  // Location
  // joined at
  // DOB
  // gender
  // playtime
  // is_admin
  // is_coach

  // get role
  // "Admin + Coaching" if is_admin && is_coach

  // "Admin" if is_admin

  // "Coaching" if is_coach
  const getRole = () => {
    if (profile.is_admin && isCoach) {
      return "Offical Admin + Verified Coaching";
    } else if (profile.is_admin) {
      return "Offical Admin";
    } else if (isCoach) {
      return "Verfied Coaching";
    } else {
      return "Gbox's User";
    }
  };

  return (
    <div className="mt-10 flex flex-col gap-y-14 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full center bg-green-600 mr-5">
            <FaUser className="text-2xl" />
          </div>
          <div className="text-xl">Name </div>
        </div>
        <div className="text-xl super font-bold">{profile.name}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full center bg-pink-400 mr-5">
            <FaFileWord className="text-3xl" />
          </div>
          <div className="text-xl">Bio </div>
        </div>
        <div className="text-xl super text-right w-1/2 font-bold">
          {profile.bio}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full center bg-blue-400 mr-5">
            <FaLocationCrosshairs className="text-3xl" />
          </div>
          <div className="text-xl">Location</div>
        </div>
        <div className="text-xl super font-bold">{profile.location}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full center bg-rose-500 mr-5">
            <IoTimeSharp className="text-3xl " />
          </div>
          <div className="text-xl">Joined At</div>
        </div>
        <div className="text-xl super font-bold">
          {new Date(profile.created_at).toLocaleString()}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full center bg-orange-400 mr-5">
            <IoGameController className="text-3xl " />
          </div>
          <div className="text-xl">Gender</div>
        </div>
        <div className="text-xl capitalize super font-bold">
          {profile.gender}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full center bg-indigo-500 mr-5">
            <MdAdminPanelSettings className="text-3xl " />
          </div>
          <div className="text-xl">Role</div>
        </div>
        <div className="text-xl super font-bold">{getRole()}</div>
      </div>
    </div>
  );
};

export default BasicInformation;
