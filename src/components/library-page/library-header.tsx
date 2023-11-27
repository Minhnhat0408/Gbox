"use client";

import { gameProgressArray } from "@/constants/progress";
import { cn } from "@/lib/utils";
import { GameProgress } from "@/types/gameProgressType";
import { ProfilesType } from "@/types/supabaseTableType";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AiFillPauseCircle, AiFillStar } from "react-icons/ai";
import { BsCheckCircleFill, BsFillStopCircleFill } from "react-icons/bs";
import { PiGameControllerFill } from "react-icons/pi";
import { RiGamepadLine } from "react-icons/ri";
import { TbAlignRight } from "react-icons/tb";

export type StatisticType = {
  status_type: GameProgress;
  count: number;
}[];

type LibraryHeaderProps = {
  data: ProfilesType;
  statistics: StatisticType;
};

const statisticMap = {
  wishlist: AiFillStar,
  backlog: TbAlignRight,
  play: PiGameControllerFill,
  pause: AiFillPauseCircle,
  beat: BsCheckCircleFill,
  quit: BsFillStopCircleFill,
};

const progressColor = {
  wishlist: "border-b-gray-400",
  backlog: "border-b-violet-400",
  play: "border-b-blue-400",
  pause: "border-b-yellow-400",
  beat: "border-b-green-400",
  quit: "border-b-rose-400",
};

const progressColorText = {
  wishlist: "text-gray-400",
  backlog: "text-violet-400",
  play: "text-blue-400",
  pause: "text-yellow-400",
  beat: "text-green-400",
  quit: "text-rose-400",
};

const progressColorTextHover = {
  wishlist: "group-hover:text-gray-400",
  backlog: "group-hover:text-violet-400",
  play: "group-hover:text-blue-400",
  pause: "group-hover:text-yellow-400",
  beat: "group-hover:text-green-400",
  quit: "group-hover:text-rose-400",
};

const LibraryHeader = ({ data, statistics }: LibraryHeaderProps) => {
  const params = useSearchParams();

  const router = useRouter();

  const handleFilter = (status: GameProgress) => {
    router.push(`/library?status=${status}`);
  };

  const status = params.get("status");

  return (
    <div className="flex w-full  items-center my-10 px-2 justify-between">
      <div className="flex">
        <Image
          src={data?.avatar || "/avatar.jpg"}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-16 h-16 object-center rounded-full object-cover mr-5"
        />
        <div className="super text-xl font-bold">{data?.name}</div>
      </div>
      <div className="flex gap-x-1">
        <div
          onClick={() => {
            router.push(`/library`);
          }}
          className={cn(
            "flex h-[55px] border-solid px-2 flex-col cursor-pointer items-center border-b-4 border-b-transparent",
            status === null && "border-white"
          )}
        >
          <div className="flex items-center">
            <span className="text-xs">All</span>
            <RiGamepadLine className="ml-2 text-xs" />
          </div>
          <div className="mt-1 font-bold">
            {statistics?.reduce((acc, curr) => acc + curr.count, 0)}
          </div>
        </div>
        {gameProgressArray.map((item, index) => {
          const data = statistics?.find((stat) => stat.status_type === item)!;
          const Icon = statisticMap[item as GameProgress];

          return (
            <div
              onClick={() => handleFilter(item as GameProgress)}
              key={index}
              className={cn(
                "flex h-[55px] border-b-4 group border-transparent px-2 flex-col cursor-pointer items-center group",
                status === item && progressColor[item as GameProgress]
              )}
            >
              <div className="flex items-center">
                <span
                  className={cn(
                    "text-xs ",
                    status === item && progressColorText[item as GameProgress],
                    progressColorTextHover[item as GameProgress]
                  )}
                >
                  {item}
                </span>
                <Icon
                  className={cn(
                    "ml-2 text-xs",
                    status === item && progressColorText[item as GameProgress],
                    progressColorTextHover[item as GameProgress]
                  )}
                />
              </div>
              <div
                className={cn(
                  "mt-1 font-bold",
                  status === item && progressColorText[item as GameProgress],
                  progressColorTextHover[item as GameProgress]
                )}
              >
                {data?.count || 0}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LibraryHeader;
