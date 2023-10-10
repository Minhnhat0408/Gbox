"use client";

import { convertDate } from "@/lib/convertDate";
import { GameData } from "@/types/ign/GameSearchType";
import React, { Fragment, useState } from "react";
import { AiFillPlusCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import { LiaGamepadSolid } from "react-icons/lia";
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
import gameProgress from "@/constants/progress";
import { GameProgress } from "@/types/gameProgressType";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { getGameMetaData, getGamePlatform } from "@/actions/getGameMetadata";
import { wait } from "@/lib/wait";
import useUpdateGameModal from "@/hooks/useUpdateGameModal";
import { shallow } from "zustand/shallow";

function GameCard({ game }: { game: GameData }) {
  const [openOption, setOpenOption] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentState, setCurrentState] = useState<GameProgress | undefined>(
    undefined
  );

  const { userGameData, setUserGameData, setPopularGames, popularGame } =
    useUpdateGameModal((set) => set, shallow);

  const { user } = useUser();

  const { supabaseClient } = useSessionContext();

  const getGameStatus = () => {
    if (!user) return undefined;
    const gameStatus = userGameData.find(
      (userGame) => userGame.game_meta_data.slug === game.slug
    );
    if (!gameStatus) return undefined;
    return (
      <div className="absolute bottom-0 right-0">
        {gameProgress[gameStatus.status as keyof typeof gameProgress].icon(
          "text-xl",
          "rounded-tr-none rounded-bl-none"
        )}
      </div>
    );
  };

  const handleSubmit = async (key: GameProgress) => {
    if (isLoading) return;
    setCurrentState(key as GameProgress);
    setIsLoading(true);
    const updateData: {
      [key: string]: any;
    } = {
      id: user?.id + "$" + game.slug,
      user_id: user?.id,
      status: key,
      game_meta_data: getGameMetaData(game),
    };

    // finish date is now
    if (key === "beat") updateData.finish_date = new Date().toISOString();
    const { data, error } = await supabaseClient
      .from("user_game_data")
      .upsert(updateData);
    if (error) console.log(error);

    // update user game data and push that game to the top
    const newUserGameData = [...userGameData];
    const index = newUserGameData.findIndex(
      (userGame) => userGame.game_meta_data.slug === game.slug
    );
    if (index !== -1) {
      newUserGameData.splice(index, 1);
    }
    newUserGameData.unshift(updateData as any);
    setUserGameData(newUserGameData);

    // update popular game and push that game to the top
    const newPopularGameData = [...popularGame];
    const popularGameIndex = newPopularGameData.findIndex(
      (userGame) => userGame.slug === game.slug
    );
    if (popularGameIndex !== -1) {
      newPopularGameData.splice(popularGameIndex, 1);
    }
    newPopularGameData.unshift(game);
    setPopularGames(newPopularGameData);

    setIsLoading(false);
    await wait(500);
    setOpenOption(false);
  };

  const getIcon = () => {
    if (!game) return [];
    const newArray = getGamePlatform(game);
    return newArray.map((data, index) => {
      if (!platformkey.includes(data as keyof typeof platform)) {
        return <></>;
      }
      return (
        <TooltipProvider delayDuration={200} key={index}>
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
      <div className="relative flex items-center justify-between w-full">
        <AnimatePresence>
          {openOption && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              className="pl-7 absolute top-0 bottom-0 right-0 z-10 flex items-center justify-between h-full pr-[110px] overflow-hidden bg-gray-800 rounded-lg"
            >
              {Object.entries(gameProgress).map(([key, value], index) => {
                const time = (index * 80) / 1000;
                return (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger
                        onClick={async () => {
                          await handleSubmit(key as GameProgress);
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ width: "fit", opacity: 1 }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{
                            ease: "easeIn",
                            duration: 0.3,
                            delay: time,
                          }}
                        >
                          {isLoading && currentState === key ? (
                            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
                          ) : (
                            value.icon("text-xl")
                          )}
                        </motion.div>
                      </TooltipTrigger>

                      <TooltipContent>
                        <p className="uppercase">
                          {isLoading && currentState === key
                            ? "submitting..."
                            : value.label}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center gap-3">
          {/* display update of that game */}
          <figure className="aspect-square relative w-24 h-24 overflow-hidden">
            {getGameStatus()}
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
          className="z-20 flex items-center mr-4 text-green-400 cursor-pointer"
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
