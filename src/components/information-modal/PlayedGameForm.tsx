import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import SlideLeft from "../animations/slide-left";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { shallow } from "zustand/shallow";
import Image from "next/image";
import { BsCheckCircleFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import useInformationModal from "@/hooks/useInformationModal";
import { usePlayedGameForm } from "@/hooks/usePlayedGameForm";
import SearchGame from "./SearchGame";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUser } from "@/hooks/useUser";
import { recommendGame } from "@/services/client/ignClientService";
import { getGameMetaData } from "@/actions/getGameMetadata";

export default function PlayedGameForm() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { playedGame, topGame, setPlayedgame, setTopGame } = usePlayedGameForm(
    (set) => set,
    shallow
  );
  const { setFormType } = useInformationModal();

  const { supabaseClient } = useSessionContext();

  const { user } = useUser();

  const handleSubmit = async () => {
    if (playedGame.length === 0)
      return setError("Please select at least 1 game");
    setIsSubmitting(true);

    const { data, error: uploadError } = await supabaseClient
      .from("user_game_data")
      .upsert(
        playedGame.map((e) => {
          return {
            id: `${user?.id}$${e.slug}`,
            user_id: user?.id,
            game_meta_data: getGameMetaData(e),
            status: "play",
          };
        })
      );
    if (uploadError) setError(uploadError.message);
    setIsSubmitting(false);
    setFormType("playtime-form");
  };

  useEffect(() => {
    const getTopGame = async () => {
      setLoading(true);
      const result = await recommendGame();

      if (result.status === 200 && result.data.length > 0) {
        setTopGame(result.data);
      }
      setLoading(false);
    };
    getTopGame();
  }, []);

  return (
    <SlideLeft>
      <DialogHeader className="flex flex-row items-center justify-between">
        <DialogTitle className="flex-1 text-[28px] capitalize">
          {"Tell us what you have played"}
        </DialogTitle>
        <SearchGame
          setTopGame={setTopGame}
          setLoading={setLoading}
          className="w-[180px]"
        />
      </DialogHeader>
      <div className="overflow-y-auto gap-x-4 gap-y-12 h-[466px] max-h-[466px] mt-4 grid grid-cols-3">
        {isLoading ? (
          <>
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
            <Skeleton className="w-auto h-[200px]" />
          </>
        ) : topGame.length === 0 ? (
          <div className="mt-10 text-xl font-bold text-center">
            No game found!
          </div>
        ) : (
          <>
            {topGame.map((e, index) => {
              const is_checked = playedGame.findIndex(
                (element) => element.slug === e.slug
              );
              const metadata = getGameMetaData(e);
              return (
                <div
                  key={index}
                  className={`w-[196.66px] h-[210px] rounded-lg relative cursor-pointer
                `}
                  onClick={() => {
                    const newArr = [...playedGame];
                    const index = newArr.findIndex(
                      (element) => element.slug === e.slug
                    );
                    if (index === -1) {
                      setError("");
                      newArr.push(e);
                    } else {
                      newArr.splice(index, 1);
                    }
                    setPlayedgame(newArr);
                  }}
                >
                  {is_checked !== -1 ? (
                    <div className="w-7 h-7 top-2 right-2 absolute z-10 flex items-center justify-center bg-white rounded-full">
                      <BsCheckCircleFill className="w-7 h-7 text-2xl text-green-500" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 top-2 right-2 bg-gray-400/70 absolute z-10 flex items-center justify-center rounded-full">
                      <BsCheckCircleFill className="w-7 h-7 opacity-90 text-2xl text-gray-900" />
                    </div>
                  )}
                  <div
                    className={cn(
                      `bg-center bg-no-repeat bg-cover transition-all border-transparent border-4 border-solid w-[196.66px] h-[180px] rounded-lg relative box-border`,
                      {
                        "opacity-100": is_checked !== -1,
                        "border-green-500": is_checked !== -1,
                      }
                    )}
                    style={{
                      backgroundImage: `url(${
                        metadata.image || "/placeholder.jpg"
                      })`,
                    }}
                  />
                  {is_checked !== -1 && (
                    <div className="absolute left-1 right-1 z-5 top-1 bg-black/60 h-[172px] rounded-sm"></div>
                  )}
                  <p className="line-clamp-2 mt-3 font-bold text-center">
                    {metadata.name}
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
      <Separator
        className={`bg-[rgb(74,136,96)] mb-5 h-[2.5px] translate-x-[-5.1%] ${
          topGame.length === 0 && "opacity-0"
        }`}
        style={{
          width: "111.55%",
        }}
      />
      <DialogFooter className=" relative items-center w-full mt-4">
        {!!error && (
          <p className="absolute left-0 max-w-[450px] self-start mt-2 font-bold text-red-400 truncate">
            {error}
          </p>
        )}
        {isSubmitting ? (
          <Button
            type="button"
            disabled
            className="disabled:opacity-25 flex items-center justify-center w-[125px]"
          >
            <AiOutlineLoading3Quarters className="animate-spin mr-3" />
            <p>Loading</p>
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit}
            className={`"opacity-0"} flex items-center justify-center w-[125px]`}
          >
            Save change
          </Button>
        )}
      </DialogFooter>
    </SlideLeft>
  );
}
