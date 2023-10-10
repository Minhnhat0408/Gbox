"use client";

import useUpdateGameModal from "@/hooks/useUpdateGameModal";
import Modal from "../modals/Modal";
import { DialogHeader, DialogTitle } from "../ui/dialog";

import SearchGame from "./SearchGame";
import { shallow } from "zustand/shallow";
import { Separator } from "../ui/separator";
import GameLoader from "./GameLoader";
import { useEffect } from "react";
import { recommendGame } from "@/services/client/ignClientService";
import React from "react";
import GameCard from "./GameCard";
import { getUserGameData } from "@/actions/getUserGameData";
import { useUser } from "@/hooks/useUser";
import { GameData } from "@/types/ign/GameSearchType";
import { converGameData } from "@/lib/convertGameData";

function UpdateGameModal() {
  const {
    isOpen,
    onClose,
    gameData,
    setGameData,
    isLoading,
    setIsLoading,
    setPopularGames,
    userGameData,
    setUserGameData,
  } = useUpdateGameModal((set) => set, shallow);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const { user } = useUser();

  useEffect(() => {
    const getGame = async () => {
      setIsLoading(true);
      const [recommendData, userGameData] = await Promise.all([
        recommendGame(),
        getUserGameData(user?.id),
      ]);
      if (recommendData.status === 200) {
        // merge 3 newest update game with other popular game
        setUserGameData(userGameData);
        const userGameArr: GameData[] = userGameData
          .map((game) => {
            return converGameData(game);
          })
          .splice(0, 3);
        const popularGameArr: GameData[] = recommendData.data.filter((game) => {
          return !userGameArr.some((userGame) => userGame.slug === game.slug);
        });
        const newGameArrData = [...userGameArr, ...popularGameArr];
        setGameData(newGameArrData);
        setPopularGames(newGameArrData);
      }
      setIsLoading(false);
    };
    if (isOpen && gameData.length === 0) {
      getGame();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[700px] bg-layout pt-7 pb-10 px-9 !rounded-3xl remove-button"
    >
      <DialogHeader>
        <DialogTitle className="mb-4 text-xl font-normal text-center capitalize">
          Update your game
        </DialogTitle>
      </DialogHeader>
      <SearchGame />
      <div className="custom-scroll-bar gap-y-3 mt-2 flex flex-col px-5 w-full h-[60vh] max-h-[60vh] overflow-y-auto overflow-x-hidden">
        {isLoading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <React.Fragment key={index}>
                  <GameLoader />
                  <Separator className="bg-[rgba(138,147,153,0.25)]" />
                </React.Fragment>
              );
            })}
          </>
        ) : (
          gameData.map((game, index) => {
            return <GameCard game={game} key={index} />;
          })
        )}
      </div>
    </Modal>
  );
}

export default UpdateGameModal;
