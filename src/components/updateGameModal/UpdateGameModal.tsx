"use client";

import useUpdateGameModal from "@/hooks/useUpdateGameModal";
import Modal from "../modals/Modal";
import { DialogHeader, DialogTitle } from "../ui/dialog";

import SearchGame from "./SearchGame";
import { shallow } from "zustand/shallow";
import { Separator } from "../ui/separator";
import GameLoader from "./GameLoader";
import Image from "next/image";
import Link from "next/link";
import { SiAdobefonts } from "react-icons/si";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect } from "react";
import {
  recommendGame,
  searchGameIGN,
} from "@/services/client/ignClientService";
import React from "react";
import { convertDate } from "@/lib/convertDate";
import { LiaGamepadSolid } from "react-icons/lia";

function UpdateGameModal() {
  const {
    isOpen,
    onOpen,
    onClose,
    gameData,
    setGameData,
    isLoading,
    setIsLoading,
    reset,
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
            console.log(game.producers[0]?.shortName);

            return (
              <React.Fragment key={index}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <figure className="aspect-square w-24 h-24 overflow-hidden">
                      {game?.primaryImage?.url ? (
                        <Image
                          src={game?.primaryImage?.url || "/avatar.jpg"}
                          alt="10"
                          width={96}
                          height={96}
                          className="object-cover object-center w-full h-full rounded-lg"
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
                          {game.metadata.names.short ||
                            game.metadata.names.name}
                        </Link>
                        <p className="font-bold tracking-wider text-[10px] uppercase">
                          {game.producers[0]?.shortName !== null
                            ? game?.producers[0]?.shortName
                            : game?.producers[0]?.name}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <SiAdobefonts className="text-base" />
                        <SiAdobefonts className="text-base" />
                      </div>
                      <p className="font-bold tracking-wider text-[10px] uppercase">
                        {convertDate(game.objectRegions[0].releases[0].date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mr-4 text-green-400 cursor-pointer">
                    <AiFillPlusCircle className="text-4xl" />
                  </div>
                </div>
                <Separator className="bg-[rgba(138,147,153,0.25)]" />
              </React.Fragment>
            );
          })
        )}
      </div>
    </Modal>
  );
}

export default UpdateGameModal;
