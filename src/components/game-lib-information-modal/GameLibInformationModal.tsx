import { useGameLibInformationModal } from "@/hooks/useGameLibInformationModal";
import Modal from "../modals/Modal";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import { convertScoreColor } from "@/lib/convertScoreColor";
import convertGameStatus from "@/lib/convertGameStatus";
import { GameProgress } from "@/types/gameProgressType";

dayjs.extend(localizedFormat);

const GameLibInformationModal = () => {
  const { isOpen, onClose, onOpen, gameData } = useGameLibInformationModal();

  const { userDetails } = useUser();

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
      <div className="z-10">
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
        <div className="flex">
          <div
            className="bg-image w-[265px] h-[374px] rounded-xl mr-7"
            style={{
              backgroundImage: `url(${gameData?.game_meta_data.image})`,
            }}
          ></div>
          <div>
            <div className="text-gray-400 text-sm mb-3">
              {dayjs(gameData?.modified_date).format("LT LL")}
            </div>
            <div className="flex items-center">
              <div
                className={`text-5xl font-bold mr-4 ${convertScoreColor(
                  gameData?.score_rate
                )}`}
              >
                {gameData?.score_rate ? `${gameData?.score_rate}` : "NS"}
              </div>
              {convertGameStatus(
                gameData?.status as GameProgress,
                "py-2 px-4 h-fit !text-base"
              )}
            </div>
            <div className="mt-4 text-2xl font-bold">
              {gameData?.game_meta_data.name ||
                gameData?.game_meta_data.shortName}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GameLibInformationModal;
