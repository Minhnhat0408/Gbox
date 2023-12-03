"use client";

import { IoGameController, IoLocationSharp, IoTime } from "react-icons/io5";
import { useCoachProfile } from "@/hooks/useCoachDetail";
import { useKeenSlider } from "keen-slider/react";
import { FaUser } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaStar } from "react-icons/fa6";
import { platform } from "@/constants/platformIcon";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import Link from "next/link";
import { SiRiotgames } from "react-icons/si";

dayjs.extend(relativeTime);

const CoachInformation = () => {
  const { data } = useCoachProfile();

  const [ref] = useKeenSlider<HTMLDivElement>({
    mode: "free",
    slides: {
      perView: "auto",
      spacing: 30,
    },
  });

  return (
    <div className="w-full card-container mt-12 sticky top-8 rounded-xl bg-card p-6">
      <h1 className="text-xl super font-bold">About Me</h1>
      <div className="py-6 flex flex-col gap-y-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-3 text-base">
            <IoLocationSharp className="text-green-400 text-lg" />
            <div className="text-zinc-300">Location</div>
          </div>
          <div className="text-base">{data.country}</div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-3 text-base">
            <IoTime className="text-green-400 text-lg" />
            <div className="text-zinc-300">Joined</div>
          </div>
          <div className="text-base">{dayjs(data.created_at).format("ll")}</div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-3 text-base">
            <FaStar className="text-green-400 text-lg" />
            <div className="text-zinc-300">Birthday</div>
          </div>
          <div className="text-base">
            {dayjs(data.profiles.dob).format("L")}
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-3 text-base">
            <SiRiotgames className="text-green-400 text-lg" />
            <div className="text-zinc-300">Profile</div>
          </div>
          <Link
            href={"/user/" + data.profiles.name}
            className="text-base italic hover:underline"
          >
            @{data.profiles.name}
          </Link>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-3 text-base">
            <IoGameController className="text-green-400 text-lg" />
            <div className="text-zinc-300">Platform</div>
          </div>
          <div className="flex items-center gap-x-2">
            {data.profiles.gaming_platform
              ?.slice(0, 5)
              .map((gp: any, index) => (
                <TooltipProvider delayDuration={50} key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      {platform[gp.slug as keyof typeof platform].icon(
                        "w-7 h-7"
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{platform[gp.slug as keyof typeof platform].name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
          </div>
        </div>
      </div>
      <h1 className="text-xl super font-bold">Game Experience</h1>
      <div ref={ref} className="keen-slider py-6">
        {data.coach_games.map((game, index) => (
          <div
            key={index}
            className="keen-slider__slide center overflow-hidden rounded-xl !min-w-[180px] !max-w-[180px] h-[260px]"
          >
            <div
              className="absolute z-0 w-full h-full bg-image"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${game.data.image})`,
              }}
            ></div>
            <div className="z-10 relative w-full p-4 center flex-col">
              <div className="font-bold text-center text-green-400 line-clamp-2 text-base">
                {game.data.shortName || game.data.name}
              </div>
              {game.ingameName && (
                <div className="mt-4 flex gap-x-4 items-center">
                  <FaUser className="text-sm text-yellow-400" />
                  <div className="text-yellow-400 text-sm">
                    #{game.ingameName}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachInformation;
