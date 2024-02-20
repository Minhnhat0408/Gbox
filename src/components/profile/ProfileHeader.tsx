import { IoSchool } from "react-icons/io5";
import Image from "next/image";
import { ProfilesType } from "@/types/supabaseTableType";
import { platform } from "@/constants/platformIcon";
import CopyProfileButton from "./CopyProfileButton";
import { flag } from "@/constants/flag";
import FriendButton from "./FriendButton";
import { PiCrownFill } from "react-icons/pi";
import { ActionTooltip } from "../action-tooltips/ActionToolTips";
import { Button } from "../ui/button";
import Link from "next/link";
import UserStatusDisplay from "./UserStatus";
import ViewLarge from "../viewLarge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ProfileHeader({
  data,
  friendStatus,
  latestFriends,
  countUserFriends,
  isCoach,
}: {
  data: ProfilesType;
  friendStatus: string | null;
  latestFriends: any;
  countUserFriends: number | null;
  isCoach: boolean;
}) {
  return (
    <div className="rounded-xl w-full mt-2">
      <div
        id="Top"
        className="relative flex items-center justify-between w-full h-auto"
      >
        {data.is_admin && (
          <PiCrownFill className="absolute -rotate-45 top-6 left-4 text-6xl z-[20] text-yellow-400" />
        )}
        <Image
          src="/images/wallpaper.jpg"
          alt="bg-img"
          className="rounded-t-xl absolute z-0 object-cover object-top w-full h-full opacity-100 brightness-50"
          width={3840}
          priority
          height={2160}
          quality={100}
        />
        <div
          id="Left"
          className="w-[65%] flex justify-start items-center pl-12"
        >
          <div className="z-10 flex justify-start w-full h-auto">
            <div
              id="avatar"
              className="flex items-center rainbow h-[135px] w-[135px] mr-2 cursor-pointer"
            >
              <ViewLarge
                src={data.avatar || "/avatar.jpg"}
                alt="avatar"
                className={`rounded-2xl h-[135px] w-[135px] pointer-events-none select-none`}
              />
            </div>

            <div
              id="info"
              className="flex h-[135px] items-center justify-end pl-4"
            >
              <div className="flex flex-col justify-between w-full h-full">
                <div className="font-bold text-[2rem] super">{data.name}</div>

                <div className="text-gray-50 text-[1.1em] flex">
                  <p>
                    Joined since{" "}
                    <span className="text-primary">
                      {new Date(data.created_at).toUTCString().substring(0, 16)}
                    </span>
                  </p>
                </div>

                <FriendButton status={friendStatus} data={data} />
              </div>
            </div>
          </div>
        </div>

        <div id="Right" className="w-[35%] h-full py-8 pr-12">
          <div className="flex flex-col justify-between w-full h-full">
            <div className="h-[33%] w-full flex justify-end z-10">
              <div className="w-fit bg-opacity-90 rounded-xl flex h-full ">
                <div id="Image" className="py-1.5 flex px-2">
                  {latestFriends &&
                    (latestFriends as ProfilesType[]).map((friend, index) => {
                      const transform =
                      latestFriends.length - 1 > index
                          ? `translateX(  ${
                              (latestFriends.length - index - 1) * 20
                            }px)`
                          : "";
                      return (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={"/user/" + friend.name}>
                                <Avatar
                                  style={{
                                    transform: transform,
                                  }}
                                  className=" border-primary w-10 h-10 border-2 rounded-full"
                                >
                                  <AvatarImage src={friend.avatar || " "} />
                                  <AvatarFallback className=" bg-gray-700">
                                    Avatar
                                  </AvatarFallback>
                                </Avatar>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-home p-4">
                              <div className="gap-x-2 flex">
                                <Avatar className="w-12 h-12">
                                  <Link href={"/user/" + friend.name}>
                                    <AvatarImage src={friend.avatar || " "} />{" "}
                                  </Link>
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="gap-y-2">
                                  <p className="">{friend.name}</p>
                                  <span className="text-muted-foreground italic">
                                    {friend.location}
                                  </span>
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                </div>

                <div className="flex items-center  px-3 bg-secondary rounded-xl">
                  <p className="w-full">
                    {countUserFriends
                      ? countUserFriends > 1
                        ? `${countUserFriends} Gbox friends`
                        : `${countUserFriends} Gbox friend`
                      : ``}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[33%] w-full py-8 flex justify-end z-10">
              <div className="flex items-center">
                <CopyProfileButton />
              </div>
            </div>

            <div className="h-[33%]">
              <div className="z-10 flex justify-end space-x-2">
                {data.gaming_platform?.slice(0, 5).map((gp: any, index) => (
                  <div className="relative z-20" key={index}>
                    {platform[gp.slug as keyof typeof platform]?.icon(
                      "h-[2.4em] w-[2.4em]"
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="Bottom"
        className="rounded-b-xl flex items-center px-12 py-4 justify-between w-full h-full bg-secondary/70 bg-opacity-50"
      >
        <div id="Right" className="w-1/3   ">
          <UserStatusDisplay
            user_name={data.name || ""}
            status_message={data.status_message}
          />
          <p className="w-full h-full mt-2  ">{data.bio}</p>
        </div>

        {isCoach && (
          <div className="w-1/3 center">
            <ActionTooltip
              label={<p>🏆 This user is verified as Gbox Official Coach 🏆</p>}
            >
              <Link
                className="inline-block shine rounded-xl w-fit h-fit"
                href={`/coach/${data.name}`}
              >
                <Button>
                  <IoSchool className="text-xl mr-3" />
                  Coach Profile
                </Button>
              </Link>
            </ActionTooltip>
          </div>
        )}
        <div id="Left" className="w-1/3  ">
          <div className="flex flex-col items-end  w-full  ">
            <div className="flex text-gray-50">
              <div className="mr-1">
                {data.play_time && data.play_time[0] && data.play_time ? (
                  <div>
                    {" "}
                    Play time: {data.play_time[0].time} {data.play_time[0].type}
                  </div>
                ) : null}
              </div>
              {"-"}
              <div className="ml-1">
                {data.play_time ? (
                  <div>
                    {data.play_time[1].time} {data.play_time[1].type}
                  </div>
                ) : null}
              </div>
            </div>

            <div id="Flag" className="flex items-center mt-2">
              <div className="mr-1">Server: </div>
              <Image
                src={flag[data.location as keyof typeof flag]}
                alt="flag"
                className="h-[1.2em] w-[1.8em] rounded-[4px] ml-2"
                width={600}
                height={400}
              />
              <p className="ml-1.5">{data.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
