"use client";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { useUser } from "@/hooks/useUser";
import gameProgress from "@/constants/progress";
import { AvatarImage, AvatarFallback, Avatar } from "../ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import { SearchPostGame } from "./SearchPostGame";

import { GameProgress } from "@/types/gameProgressType";
import { usePostFormModal } from "@/hooks/usePostFormModal";
import { useEffect } from "react";
import { useSupabase } from "@/hooks/useSupabaseClient";
import { toast } from "sonner";
import { useSearchGameForm } from "@/hooks/useSearchGameForm";
import { GameData } from "@/types/ign/GameSearchType";
import { GameMetaData } from "@/types/supabaseTableType";

export default function PostFormHeader() {
  const { userDetails } = useUser();
  const { setProgress, postEditID, progress } = usePostFormModal();
  const supabase = useSupabase();
  const { setCurrentGame, setGameMetaData } = useSearchGameForm();
  useEffect(() => {
    if (postEditID) {
      (async () => {
        try {
          const { data, error } = await supabase
            .from("posts")
            .select("game_meta_data, game_progress")
            .eq("id", postEditID)
            .single();

          if (error) {
            return toast.error(error.message, {
              duration: 1600,
            });
          }

          if (data) {
            setProgress(data!.game_progress as GameProgress);
            setGameMetaData(data!.game_meta_data as GameMetaData);
            setCurrentGame(data!.game_meta_data as GameData);
          }
        } catch (error) {}
      })();
    }
  }, [postEditID]);
  return (
    <DialogHeader>
      <div className="gap-x-3 flex">
        <Avatar className="w-[90px] h-[90px] border-solid border-4 border-primary">
          <AvatarImage
            className="object-cover object-center w-auto h-full"
            src={userDetails?.avatar || "/avatar.jpg"}
          />
          <AvatarFallback>{userDetails?.name || "X"}</AvatarFallback>
        </Avatar>
        <div className="gap-y-4 flex flex-col justify-center">
          <DialogTitle>{userDetails?.name}</DialogTitle>
          <div className="gap-x-4 flex justify-center">
            <Select
              onValueChange={(e: GameProgress) => {
                setProgress(e);
              }}
              value={progress as GameProgress}
            >
              <SelectTrigger className="w-[158px] h-[48px] rounded-xl">
                <SelectValue placeholder="Select progress" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-background">
                  {Object.keys(gameProgress).map((key, index) => {
                    return (
                      <SelectItem
                        key={index}
                        className="bg-background hover:bg-muted flex items-center justify-center w-full"
                        value={key}
                      >
                        <div className="flex items-center justify-between py-[5px]">
                          <span className="w-[80px]">{key}</span>
                          {gameProgress[key as keyof typeof gameProgress].icon(
                            "w-5 h-5",
                            "w-6 h-6 mr-3"
                          )}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <SearchPostGame />
          </div>
        </div>
      </div>
    </DialogHeader>
  );
}
