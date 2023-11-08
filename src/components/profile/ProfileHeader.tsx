import Image from "next/image";
import { ProfilesType } from "@/types/supabaseTableType";
import { platform } from "@/constants/platformIcon";
import CopyProfileButton from "./CopyProfileButton";
import { flag } from "@/constants/flag";
import FriendButton from "./FriendButton";

export default function ProfileHeader({
  data,
  friendStatus,
}: {
  data: ProfilesType;
  friendStatus: string | null;
}) {
  return (
    <div className="rounded-xl w-full mt-2">
      <div
        id="Top"
        className="relative flex items-center justify-between w-full h-auto"
      >
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
              className="flex items-center rainbow h-[135px] w-[135px] mr-2"
            >
              <Image
                src={data.avatar || "/avatar.jpg"}
                alt="avatar"
                className={`rounded-2xl h-[135px] w-[135px] pointer-events-none select-none`}
                width={0}
                height={0}
                sizes="100vw"
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
                    Join{" "}
                    {new Date(data.created_at).toUTCString().substring(0, 16)}
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
              <div className="w-fit bg-opacity-90 rounded-xl flex h-full bg-gray-400">
                <div id="Image" className="py-1.5 flex translate-x-4">
                  <Image
                    src="https://picsum.photos/id/50/99/99"
                    alt="picture"
                    className="rounded-full"
                    width={30}
                    height={30}
                  />
                  <Image
                    src="https://picsum.photos/id/223/99/99"
                    alt="picture"
                    className="-translate-x-4 rounded-full"
                    width={30}
                    height={30}
                  />
                  <Image
                    src="https://picsum.photos/id/199/99/99"
                    alt="picture"
                    className="-translate-x-8 rounded-full"
                    width={30}
                    height={30}
                  />
                </div>

                <div className="flex items-center text-[0.75rem] pr-3 text-gray-800">
                  <p className="w-full">
                    You and{" "}
                    <span className="text-center text-white cursor-pointer">
                      {}
                    </span>{" "}
                    also follow{" "}
                    <span className="text-center text-white cursor-pointer">
                      3 others
                    </span>
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
        className="rounded-b-xl flex items-center justify-between w-full h-full bg-gray-800 bg-opacity-50"
      >
        <div id="Left" className="w-[50%] flex items-center">
          <div className="flex flex-col justify-between h-[84px] w-full pl-12 py-4">
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

            <div id="Flag" className="flex">
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

        <div id="Right" className="w-[50%] h-full py-4">
          <p className="w-full h-full pr-12 text-right truncate">{data.bio}</p>
        </div>
      </div>
    </div>
  );
}
