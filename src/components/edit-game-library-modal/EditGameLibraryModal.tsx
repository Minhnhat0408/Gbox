"use client";

import {
  EditDataProps,
  useEditGameLibraryModal,
} from "@/hooks/useEditGameLibraryModal";
import Modal from "../modals/Modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { convertScoreColor } from "@/lib/convertScoreColor";
import convertScoreToEmoji from "@/lib/convertScoreToEmoji";
import { gameProgressArray } from "@/constants/progress";
import { GameProgress } from "@/types/gameProgressType";
import { cn } from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";
import DeleteGameDataButton from "./DeleteGameDataButton";
import { toast } from "sonner";
import LoadingAnimation from "../loading-components/LoadingAnimation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUserGameLibrary } from "@/hooks/useUserGameLibrary";

const progressColorMap = {
  wishlist: "bg-zinc-500",
  backlog: "bg-violet-700",
  play: "bg-blue-500",
  pause: "bg-yellow-600",
  beat: "bg-green-500",
  quit: "bg-red-500",
};

const EditGameLibraryModal = () => {
  const { onOpen, isOpen, onClose, editData, setEditData, data } =
    useEditGameLibraryModal();

  const { gameData, setGameData } = useUserGameLibrary();

  const [loading, setLoading] = useState(false);

  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!data) return;
    const initialData: EditDataProps = {};
    if (data?.score_rate) {
      initialData.score = data.score_rate;
    }
    if (data?.status) {
      initialData.status = data.status as GameProgress;
    }
    if (data?.comment) {
      initialData.comment = data.comment;
    }
    setEditData(initialData);
  }, [data, isOpen]);

  if (!data) return null;

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleUpdateGame = async () => {
    try {
      setLoading(true);
      const updateData: any = {
        comment: editData?.comment,
        score_rate: editData?.score,
        status: editData?.status,
      };

      if (editData?.status && editData.status === "beat") {
        updateData.finish_date = new Date().toISOString();
      }

      const { data: updateResult, error } = await supabaseClient
        .from("user_game_data")
        .update(updateData)
        .eq("id", data.id)
        .single();

      if (error) {
        throw error;
      }

      // update game data
      const gameIndex = gameData.findIndex((game) => game.id === data.id);
      const newGameData = gameData;
      newGameData[gameIndex] = {
        ...newGameData[gameIndex],
        comment: updateData?.comment || data.comment,
        score_rate: updateData?.score_rate,
        status: updateData?.status || data.status,
        finish_date: updateData?.finish_date || data.finish_date,
      };
      setGameData(newGameData);

      toast.success("Game updated successfully");
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[800px] overflow-hidden !px-10 py-10 !rounded-3xl gap-0 remove-button"
      style={{
        backgroundImage: `linear-gradient(319.38deg,#1d1e22 30%,rgba(29,30,34,.5)), url(${data?.game_meta_data.image})`,
      }}
    >
      {loading && (
        <div className="absolute center z-30 w-full h-full bg-black/40">
          <div
            className="center"
            style={{
              transitionProperty: "opacity",
              transitionDuration: "300ms",
              transitionTimingFunction: "ease",
              opacity: 1,
              zIndex: 400,
            }}
          >
            <LoadingAnimation
              fill="#00e3d7"
              className="w-14 h-14 text-green-400"
            />
          </div>
        </div>
      )}
      <div className="z-10">
        <div className="flex h-[130px] mb-5">
          <Image
            src={data?.game_meta_data.image || "/avatar.jpg"}
            alt={
              data?.game_meta_data.name ||
              data?.game_meta_data.shortName ||
              "image"
            }
            width={0}
            height={0}
            sizes="100vw"
            className="w-[90px] h-[130px] object-center rounded-2xl object-cover mr-6"
          />
          <div className="h-full flex flex-col justify-center">
            <div
              className={`font-bold text-6xl mb-1 flex items-center ${
                editData && editData.score && editData.score >= 0
                  ? convertScoreColor(editData.score)
                  : "text-zinc-300"
              }`}
            >
              {editData && editData.score && editData.score >= 0
                ? editData.score
                : "NS"}
              <span className="ml-2 text-black text-5xl transition-transform duration-300 ease-in-out">
                {convertScoreToEmoji(editData?.score)}
              </span>
            </div>
            <div className="text-lg line-clamp-2 font-bold">
              {data.game_meta_data.name || data.game_meta_data.shortName}
            </div>
          </div>
        </div>
        <div className="flex w-full gap-x-5 mb-5">
          {Object.values(gameProgressArray).map((progress, index) => (
            <div
              key={index}
              className="w-full h-full rounded-full overflow-hidden"
              onClick={() => {
                setEditData({
                  ...editData,
                  status: progress as GameProgress,
                });
              }}
            >
              <button
                className={cn(
                  ` text-white backdrop-blur-xl border border-white/20 rounded-full py-[.875rem] text-xs cursor-pointer grid place-items-center outline-none hover:border-white/30 hover:bg-opacity-100 w-full`,
                  editData &&
                    editData.status &&
                    editData.status === progress &&
                    `${progressColorMap[progress]}`,
                  editData &&
                    editData.status &&
                    editData.status !== progress &&
                    "hover:bg-white/5"
                )}
              >
                {progress}
              </button>
            </div>
          ))}
        </div>
        <div className="w-full h-14 center relative rounded-2xl border-white/20 border mt-8">
          <SliderPrimitive.Root
            className={cn(
              "relative flex w-full touch-none select-none items-center z-20"
            )}
            defaultValue={[editData ? editData?.score! * 10 || 0 : 0]}
            onValueChange={(value) => {
              setEditData({
                ...editData,
                score: value[0] / 10,
              });
            }}
            max={100}
            step={1}
          >
            <SliderPrimitive.Thumb className="block h-10 w-10 rounded-full border-2 border-primary bg-background/80 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          </SliderPrimitive.Root>
          <div className="absolute px-3 rounded-2xl items-center z-0 select-none text-white/40 left-0 top-0 right-0 bottom-0 w-full h-full flex justify-between">
            <div className="z-30 font-bold">NS</div>
            <div>
              <span className="mr-5 font-bold">Slide to rate</span>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_e, index) => (
                <span key={index} className="mr-4">
                  {">"}
                </span>
              ))}
            </div>
            <div className="z-30 font-bold">10</div>
          </div>
        </div>
        <div className="py-4 mt-8 px-1 overflow-hidden border rounded-2xl h-[200px] border-white/20">
          <textarea
            value={editData?.comment || ""}
            onChange={(e) => {
              setEditData({
                ...editData,
                comment: e.target.value,
              });
            }}
            placeholder="Write your review about this game..."
            className="w-full h-full text-base leading-[1.25] bg-transparent p-0 px-4 appearance-none resize-none focus:outline-none placeholder-white/20 text-neutral-100"
          ></textarea>
        </div>
        <div className="flex mt-7 gap-4">
          <DeleteGameDataButton loading={loading} setLoading={setLoading} />
          <button
            onClick={handleUpdateGame}
            className="border hover:bg-primary/80 rounded-2xl text-white bg-primary/50 border-primary/70 hover:border-primary w-full h-[63px] center"
          >
            Update Game
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditGameLibraryModal;
