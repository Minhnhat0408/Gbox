import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import SlideLeft from "../animations/slide-left";
import { useEffect, useState } from "react";
import { getAllTopGame } from "@/services/client/rawgClientService";
import { Skeleton } from "../ui/skeleton";
import { shallow } from "zustand/shallow";
import Image from "next/image";
import { BsCheckCircleFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import useInformationModal from "@/hooks/useInformationModal";
import { usePlayedGameForm } from "@/hooks/usePlayedGameForm";
import SearchGame from "./SearchGame";

export default function PlayedGameForm() {
  const { playedGame, topGame, setPlayedgame, setTopGame } = usePlayedGameForm(
    (set) => set,
    shallow
  );
  const [isLoading, setLoading] = useState<boolean>(true);
  const { setFormType } = useInformationModal();

  useEffect(() => {
    const getTopGame = async () => {
      setLoading(true);
      const result = await getAllTopGame();

      if (result.status === 200 && result.data.length > 0) {
        const topGameData = result.data.map((e) => {
          return {
            name: e.name,
            slug: e.slug,
            image_background: e.background_image,
          };
        });
        setTopGame(topGameData);
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
                  <Image
                    width={196.66}
                    height={160}
                    className={cn(
                      `object-cover transition-all border-transparent object-center border-4 border-solid w-[196.66px] h-[180px] rounded-lg relative box-border`,
                      {
                        "opacity-100": is_checked !== -1,
                        "border-green-500": is_checked !== -1,
                      }
                    )}
                    src={e.image_background || "/placeholder.jpg"}
                    alt="platform image"
                    onLoadStart={(event) => {
                      (event.target as HTMLImageElement)?.classList.add(
                        "opacity-0"
                      );
                    }}
                    onLoadingComplete={(image: HTMLImageElement) => {
                      if (image) {
                        image.classList.remove("opacity-0");
                      }
                    }}
                  />
                  {is_checked !== -1 && (
                    <div className="absolute left-1 right-1 z-5 top-1 bg-black/60 h-[172px] rounded-sm"></div>
                  )}
                  <p className="line-clamp-2 mt-3 font-bold text-center">
                    {e.name}
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
      <DialogFooter className="mt-4">
        <Button
          type="submit"
          onClick={() => {
            setFormType("playtime-form");
          }}
          className={`"opacity-0"}`}
        >
          Save change
        </Button>
      </DialogFooter>
    </SlideLeft>
  );
}
