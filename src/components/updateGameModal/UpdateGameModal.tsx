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
import { GameData } from "@/types/ign/GameSearchType";

function UpdateGameModal() {
  const {
    isOpen,
    onClose,
    gameData,
    setGameData,
    isLoading,
    setIsLoading,
    setPopularGames,
  } = useUpdateGameModal((set) => set, shallow);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    const getGame = async () => {
      setIsLoading(true);
      // const { status, data } = await searchGameIGN("legend of zelda", 20, 0);
      const { status, data } = await recommendGame();

      if (status === 200) {
        setGameData(data);
        setPopularGames(data);
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
      <div className="custom-scroll-bar gap-y-3 mt-2 flex flex-col px-5 w-full h-[60vh] max-h-[60vh] overflow-y-auto">
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
