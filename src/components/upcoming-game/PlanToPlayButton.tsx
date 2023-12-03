"use client";

import { ComingGameData } from "@/types/ign/ComingSoonGameType";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ActionTooltip } from "../action-tooltips/ActionToolTips";
import { MdOutlineGamepad } from "react-icons/md";
import { toast } from "sonner";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { getGameDetailBySlug } from "@/services/client/ignClientService";

export default function PlanToPlayButton({
  game,
  isInLibrary,
}: {
  game: ComingGameData;
  isInLibrary?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const { userDetails } = useUser();

  const [done, setDone] = useState(isInLibrary || false);

  const { supabaseClient } = useSessionContext();

  const planToPlay = async () => {
    try {
      if (done) return;
      setLoading(true);
      if (!userDetails?.id) {
        toast.error("Please wait until user data is loaded");
        return;
      }

      const { data: gameInformation, status } = await getGameDetailBySlug(
        game.slug
      );

      if (status === 400) {
        throw new Error("Game not found");
      }

      const { data, error } = await supabaseClient
        .from("user_game_data")
        .upsert({
          id: userDetails.id + "$" + game.slug,
          user_id: userDetails.id,
          status: "backlog",
          game_meta_data: {
            platform: game.platformSlugs,
            name: game.name,
            image: game.imageUrl,
            shortName: gameInformation.metadata.names.short,
            producer:
              gameInformation.producers[0]?.name ||
              gameInformation.producers[0].shortName,
            releaseDate: game.releaseDate,
            slug: game.slug,
            url: game.url,
          },
        });

      if (error) {
        throw error;
      }

      setDone(true);
    } catch (error) {
      toast.error((error as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute w-12 h-full right-6 top-0 center">
      <ActionTooltip
        side="top"
        label={
          isInLibrary ? (
            <p className="text-md font-semibold">Already in library</p>
          ) : (
            <p className="text-md font-semibold">Planned to play this game</p>
          )
        }
      >
        <div className="cursor-pointer group" onClick={planToPlay}>
          {!loading && !done && (
            <MdOutlineGamepad className="text-3xl text-green-500 group-hover:text-green-400" />
          )}
          {done && !loading && (
            <FiCheckCircle className="text-3xl text-green-500 group-hover:text-green-400" />
          )}
          {loading && (
            <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
          )}
        </div>
      </ActionTooltip>
    </div>
  );
}
