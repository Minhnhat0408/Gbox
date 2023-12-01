/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Command, CommandInput } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect } from "react";
import {
  recommendGame,
  searchGameIGN,
} from "@/services/client/ignClientService";
import { useUser } from "@/hooks/useUser";
import { getUserGameData } from "@/actions/getUserGameData";
import { GameData } from "@/types/ign/GameSearchType";
import { converGameData } from "@/lib/convertGameData";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";
import { IoGameControllerOutline } from "react-icons/io5";
import { useApplyFormData } from "@/hooks/useApplyFormData";

export function ChooseGameInput() {
  const {
    openOption,
    setOpenOption,
    isLoading,
    setIsLoading,
    gameData,
    setGameData,
    searchValue,
    setSearchValue,
    initialGameData,
    setInitialGameData,
    addChoosedGame,
    setChooseGameError,
  } = useApplyFormData();

  const debouncedValue = useDebounce<string>(searchValue, 500);

  const { user } = useUser();

  useEffect(() => {
    const getGame = async () => {
      setIsLoading(true);
      const [popularGame, userGameData] = await Promise.all([
        recommendGame(),
        getUserGameData(user?.id),
      ]);

      if (popularGame.status === 200) {
        // merge 3 newest update game with other popular game
        const userGameArr: GameData[] = userGameData
          .map((game) => {
            return converGameData(game);
          })
          .splice(0, 3);
        const popularGameArr: any[] = popularGame.data.filter((game) => {
          return !userGameArr.some((userGame) => userGame.slug === game.slug);
        });
        const newGameArrData = [...userGameArr, ...popularGameArr];
        setGameData(newGameArrData);
        setInitialGameData(newGameArrData);
      }
      setIsLoading(false);
    };
    if (user?.id) {
      getGame();
    }
  }, [user?.id]);

  useEffect(() => {
    const searchGame = async () => {
      setIsLoading(true);
      const game = await searchGameIGN(debouncedValue, 30, 0);
      if (game.status === 200) {
        setGameData(game.data);
      }
      setIsLoading(false);
    };
    if (debouncedValue.trim() !== "") {
      searchGame();
    } else {
      if (initialGameData) {
        setGameData(initialGameData);
      }
    }
  }, [debouncedValue]);

  return (
    <Popover open={openOption} onOpenChange={setOpenOption}>
      <PopoverTrigger asChild>
        <div className="w-full rounded-lg justify-between h-[48px] inline-flex items-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2">
          <div className="truncate max-w-[100%] flex items-center">
            {/* <IoGameControllerOutline className="mr-4 text-2xl text-gray-400" /> */}
            <div className="truncate max-w-[350px] text-gray-400 text-sm">
              Choose coaching game...
            </div>
          </div>
          <ChevronDown className="shrink-0 w-4 h-4 ml-2 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="p-0 rounded-lg overflow-hidden w-[600px] max-w-[600px]"
      >
        <Command className="bg-background overflow-hidden">
          <CommandInput
            onValueChange={(e) => {
              setSearchValue(e);
            }}
            placeholder="Type in..."
          />
        </Command>
        <div className="bg-background max-h-[220px] h-[220px] items-center overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <AiOutlineLoading3Quarters className="animate-spin text-xl" />
            </div>
          ) : gameData.length > 0 ? (
            gameData.map((game, index) => {
              return (
                <TooltipProvider delayDuration={200} key={index}>
                  <Tooltip>
                    <TooltipTrigger className="bg-background hover:bg-muted h-14 w-full truncate cursor-pointer">
                      <div
                        className="bg-background hover:bg-muted h-14 w-full px-4 py-4 text-left truncate cursor-pointer"
                        key={index}
                        onClick={() => {
                          setOpenOption(false);
                          addChoosedGame({
                            data: game,
                          });
                          setChooseGameError("");
                        }}
                      >
                        {game.metadata.names.name || game.metadata.names.short}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>
                        {game.metadata.names.name || game.metadata.names.short}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })
          ) : debouncedValue.trim() !== "" ? (
            <div className="flex items-center justify-center w-full h-full px-4">
              <span className=" font-medium text-center text-gray-500">
                No result found {"😞"}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full px-4">
              <span className=" font-medium text-center text-gray-500">
                Please type in to search 😊
              </span>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
