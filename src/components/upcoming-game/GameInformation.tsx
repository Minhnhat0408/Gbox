import { platform, platformkey } from "@/constants/platformIcon";
import { formatDate } from "@/lib/formatDate";
import { ComingGameData } from "@/types/ign/ComingSoonGameType";
import { LiaGamepadSolid } from "react-icons/lia";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "../ui/tooltip";
import Link from "next/link";
import PLanToPlayButton from "./PlanToPlayButton";
import { Fragment } from "react";

function GameInformation({
  game,
  isInLibrary,
}: {
  game: ComingGameData;
  isInLibrary?: boolean;
}) {
  if ((game as any).type !== "Game") return;

  return (
    <div>
      <div className="flex gap-3 relative">
        <figure className="aspect-square relative w-24 h-24">
          {game?.imageUrl ? (
            <div
              style={{
                backgroundImage: `url(${game?.imageUrl || "/placeholder.jpg"})`,
              }}
              className="w-full h-full bg-center bg-no-repeat bg-cover rounded-lg"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-600 rounded-lg">
              <LiaGamepadSolid className="text-5xl text-gray-400" />
            </div>
          )}
        </figure>
        <div className="flex flex-col justify-between gap-2">
          <div className="flex flex-col gap-1">
            <Link
              target="_blank"
              href={"https://www.ign.com" + game.url}
              className="line-clamp-1 hover:underline text-base font-bold max-w-[250px]"
            >
              {game.name || game.slug}
            </Link>
          </div>
          <div className="flex gap-2">
            {game.platformSlugs.map((data, index) => {
              if (!platformkey.includes(data as keyof typeof platform)) {
                return <Fragment key={index}></Fragment>;
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
            })}
          </div>
          <p className="text-[12px] font-bold tracking-wider uppercase">
            {formatDate(game.releaseDate)}
          </p>
          <PLanToPlayButton isInLibrary={isInLibrary || false} game={game} />
        </div>
      </div>
    </div>
  );
}

export default GameInformation;
