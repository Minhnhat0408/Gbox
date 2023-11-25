import { useGameLibInformationModal } from "@/hooks/useGameLibInformationModal";
import Modal from "../modals/Modal";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import { convertScoreColor } from "@/lib/convertScoreColor";
import convertGameStatus from "@/lib/convertGameStatus";
import { GameProgress } from "@/types/gameProgressType";
import React from "react";
import { platform } from "@/constants/platformIcon";

dayjs.extend(localizedFormat);

const GameLibInformationModal = () => {
  const { isOpen, onClose, onOpen, gameData } = useGameLibInformationModal();

  const { userDetails } = useUser();

  if (!gameData) return <></>;

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[900px] !ring-0 !ring-offset-0 overflow-hidden !focus-visible:ring-0 !focus-visible:ring-offset-0 !px-10 bg-top bg-cover bg-no-repeat py-10 !rounded-3xl gap-0 remove-button"
      style={{
        backgroundImage: `linear-gradient(319.38deg,#1d1e22 30%,rgba(29,30,34,.5)), url(${gameData?.game_meta_data.image})`,
      }}
    >
      <div className="z-10 w-full">
        <div className="flex items-start mb-6 ml-3">
          <Image
            src={userDetails?.avatar || "/avatar.jpg"}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="w-12 h-12 object-center rounded-full object-cover mr-3"
          />
          <div className="super text-lg font-bold">{userDetails?.name}</div>
        </div>
        <div className="flex w-full">
          <div
            className="bg-image w-[265px] h-[374px] rounded-xl mr-7"
            style={{
              backgroundImage: `url(${gameData?.game_meta_data.image})`,
            }}
          ></div>
          <div className="flex-1 overflow-y-auto max-h-[600px]">
            <div className="text-gray-400 text-sm mb-3">
              {dayjs(gameData?.modified_date).format("LT LL")}
            </div>
            <div className="flex items-center">
              <div
                className={`text-5xl font-bold mr-4 ${convertScoreColor(
                  gameData?.score_rate
                )}`}
              >
                {gameData?.score_rate && gameData?.score_rate >= 0
                  ? `${gameData?.score_rate}`
                  : "NS"}
              </div>
              {convertGameStatus(
                gameData?.status as GameProgress,
                "py-2 px-4 h-fit !text-base"
              )}
            </div>
            <div className="mt-4 text-2xl font-bold max-w-[80%]">
              {gameData?.game_meta_data.name ||
                gameData?.game_meta_data.shortName}
            </div>
            <div className="text-xs text-zinc-200 mt-3">
              <span>
                {gameData.game_meta_data.producer || "Unknown Producer"}
              </span>
              <span className="mx-1">|</span>
              <span>
                {gameData.game_meta_data.releaseDate ? (
                  dayjs(gameData.game_meta_data.releaseDate).format("YYYY")
                ) : (
                  <span className="text-zinc-200">Unknown</span>
                )}
              </span>
            </div>
            <div className="flex gap-x-3 mt-3">
              {gameData.game_meta_data.platform &&
                gameData.game_meta_data.platform.length > 0 &&
                gameData.game_meta_data.platform.map((e, index) => (
                  <React.Fragment key={index}>
                    {platform[e as keyof typeof platform] &&
                      platform[e as keyof typeof platform].icon("w-6 h-6")}
                  </React.Fragment>
                ))}
            </div>
            {gameData.comment && (
              <div className="text-sm mt-8 text-white max-w-[80%]">
                {gameData.comment}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GameLibInformationModal;
