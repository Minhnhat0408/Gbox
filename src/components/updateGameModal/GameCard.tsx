"use client";

import { convertDate } from "@/lib/convertDate";
import { GameData } from "@/types/ign/GameSearchType";
import React, { Fragment, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { LiaGamepadSolid } from "react-icons/lia";
import { SiAdobefonts } from "react-icons/si";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { platform, platformkey } from "@/constants/platformIcon";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";

function GameCard({ game }: { game: GameData }) {
  const [openOption, setOpenOption] = useState<boolean>(false);

  const getIcon = () => {
    if (!game) return [];
    let datas: string[] = [];
    game.objectRegions.forEach((region) => {
      region.releases.forEach((release) => {
        release.platformAttributes.forEach((platform) => {
          datas.push(platform.slug);
        });
      });
    });
    const set = new Set(datas);
    let newArray: string[] = [];
    set.forEach((value) => {
      newArray.push(value);
    });
    return newArray.map((data, index) => {
      if (!platformkey.includes(data as keyof typeof platform)) {
        return <></>;
      }
      return (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger>
              {platform[data as keyof typeof platform].icon("")}
            </TooltipTrigger>
            <TooltipContent>
              <p>{platform[data as keyof typeof platform].name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    });
  };

  return (
    <React.Fragment>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <figure className="aspect-square w-24 h-24 overflow-hidden">
            {game?.primaryImage?.url ? (
              <div
                style={{
                  backgroundImage: `url(${
                    game?.primaryImage?.url || "/placeholder.jpg"
                  })`,
                }}
                className="w-full h-full bg-center bg-no-repeat bg-cover rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-600 rounded-lg">
                <LiaGamepadSolid className="text-5xl text-gray-400" />
              </div>
            )}
          </figure>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Link
                target="_blank"
                href={"https://www.ign.com" + game.url}
                className="line-clamp-1 hover:underline text-lg"
              >
                {game.metadata.names.short || game.metadata.names.name}
              </Link>
              <p className="font-bold tracking-wider text-[10px] uppercase">
                {game.producers[0]?.shortName !== null
                  ? game?.producers[0]?.shortName
                  : game?.producers[0]?.name}
              </p>
            </div>
            <div className="flex gap-2">
              {getIcon().map((icon, index) => {
                return <Fragment key={index}> {icon} </Fragment>;
              })}
            </div>
            <p className="font-bold tracking-wider text-[10px] uppercase">
              {convertDate(game.objectRegions[0]?.releases[0]?.date || null)}
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            setOpenOption(!openOption);
          }}
          className="flex items-center mr-4 text-green-400 cursor-pointer"
        >
          <AiFillPlusCircle
            className={cn("text-4xl transition-all", {
              "rotate-45": openOption,
            })}
          />
        </button>
      </div>
      <Separator className="bg-[rgba(138,147,153,0.25)]" />
    </React.Fragment>
  );
}

export default GameCard;
