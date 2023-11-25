"use client";

import { UserGameDataType } from "@/types/supabaseTableType";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import { platform } from "@/constants/platformIcon";
import React, { useState } from "react";
import Link from "next/link";
import convertGameStatus from "@/lib/convertGameStatus";
import { GameProgress } from "@/types/gameProgressType";
import { convertScoreColor } from "@/lib/convertScoreColor";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { IoInformationCircleSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { IoInformationOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { useGameLibInformationModal } from "@/hooks/useGameLibInformationModal";
import { useEditGameLibraryModal } from "@/hooks/useEditGameLibraryModal";
import convertScoreToEmoji from "@/lib/convertScoreToEmoji";

dayjs.extend(localizedFormat);

type GameLibRowData = {
  data: UserGameDataType;
  index: number;
};

const GameLibRow = ({ data, index }: GameLibRowData) => {
  const { userDetails } = useUser();

  const { onOpen } = useGameLibInformationModal();

  const { onOpen: openEditModal } = useEditGameLibraryModal();

  const [seeMore, setSeeMore] = useState(false);

  return (
    <div className="w-full">
      <div className="flex w-full min-h-[160px] px-2 py-4">
        <div className="w-32 h-full">
          <div
            className="bg-image group relative w-full min-h-[160px] rounded-lg cursor-pointer overflow-hidden"
            style={{
              backgroundImage: `url(${data.game_meta_data.image})`,
            }}
          >
            <div
              onClick={() => {
                onOpen(data);
              }}
              className="absolute top-0 bottom-0 right-0 left-0 hidden group-hover:flex items-center justify-center bg-black/60"
            >
              <IoInformationCircleSharp className="text-green-400 text-4xl" />
            </div>
          </div>
        </div>
        <div className="flex-1 w-[calc(100%-96px)] flex min-h-[160px]">
          <div className="flex-1 p-3 ml-2 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-zinc-600 mr-2 inline-block px-2 py-1 rounded-lg text-xs font-bold">
                  <div>{index + 1}</div>
                </div>
                <Link
                  href={"https://www.ign.com/games/" + data.game_meta_data.slug}
                  target="_blank"
                  className="truncate hover:underline max-w-[80%] text-neutral-100 text-base font-bold select-none"
                >
                  {data.game_meta_data.name || data.game_meta_data.shortName}
                </Link>
              </div>
              <div className="text-sm text-zinc-200">
                <span>
                  {data.game_meta_data.producer || "Unknown Producer"}
                </span>
                <span className="mx-1">|</span>
                <span>
                  {data.game_meta_data.releaseDate ? (
                    dayjs(data.game_meta_data.releaseDate).format("YYYY")
                  ) : (
                    <span className="text-zinc-200">Unknown</span>
                  )}
                </span>
              </div>
              <div className="flex gap-x-3 mt-3">
                {data.game_meta_data.platform &&
                  data.game_meta_data.platform.length > 0 &&
                  data.game_meta_data.platform.map((e, index) => (
                    <React.Fragment key={index}>
                      {platform[e as keyof typeof platform] &&
                        platform[e as keyof typeof platform].icon("w-6 h-6")}
                    </React.Fragment>
                  ))}
              </div>
            </div>
            <div className="text-zinc-200 flex gap-x-3 text-sm items-center">
              <div>{dayjs(data.modified_date).format("ll LT")}</div>
              <div
                onClick={() => {
                  onOpen(data);
                }}
                className="w-[15px] h-[15px] cursor-pointer center rounded-md border-solid border-2 border-zinc-200"
              >
                <IoInformationOutline className="text-zinc-200" />
              </div>
              <FiEdit
                onClick={() => {
                  openEditModal(data);
                }}
                className="text-zinc-200 text-base cursor-pointer"
              />
            </div>
          </div>
          <div className="w-32 h-full center flex-col mt-2 items-center">
            <div
              className={`text-4xl font-bold mb-2 ${
                data.score_rate && data.score_rate >= 0
                  ? convertScoreColor(data.score_rate)
                  : "text-zinc-300"
              }`}
            >
              {data.score_rate && data.score_rate >= 0 ? data.score_rate : "NS"}
            </div>
            {convertGameStatus(data.status as GameProgress)}
          </div>
        </div>
      </div>
      {data.comment && (
        <div className="flex">
          <div className="w-32 px-2 py-4"></div>
          <div className="flex-1 ml-2 w-[calc(100%-96px)] flex pl-5 items-center">
            <Image
              src={userDetails?.avatar || "/avatar.jpg"}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="w-6 h-6 object-center rounded-full object-cover mr-3"
            />
            <div>
              <div
                className={cn(
                  "max-w-[70%] text-zinc-300 line-clamp-2 text-xs italic",
                  {
                    "line-clamp-none": seeMore,
                  }
                )}
              >
                {data.comment}
              </div>
              <div
                onClick={() => {
                  setSeeMore(!seeMore);
                }}
                className="text-green-400 w-fit pb-[2px] text-xs border-b-[2px] border-b-solid border-b-green-400 italic mt-1  cursor-pointer"
              >
                {seeMore ? "Show Less" : "Show More"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameLibRow;
