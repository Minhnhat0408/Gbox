"use client";

import { GameProgressType } from "@/types/gameProgressType";
import { ProfilesType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { sortOption } from "@/constants/sort-option";
import { Button } from "../ui/button";
import { ChevronUp, ChevronsUp } from "lucide-react";
import { Command, CommandInput } from "../ui/command";

type UserGameLibraryProp = {
  profile: ProfilesType;
};

const UserGameLibrary = ({ profile }: UserGameLibraryProp) => {
  const { supabaseClient } = useSessionContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserGames = async () => {
      setLoading(true);
      const { data, error } = (await supabaseClient
        .from("user_game_data")
        .select()
        .eq("user_id", profile.id)
        .order("modified_date", { ascending: false })
        .limit(10)) as unknown as { data: GameProgressType[]; error: any };
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-2 w-1/2">
          <div className="rounded-md p-0 m-0 bg-[#1C1D21] min-w-10 w-10 h-10 center">
            <ChevronsUp className="w-5 h-5 text-white" />
          </div>

          <Select>
            <SelectTrigger className="w-32 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue className="" placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              <SelectGroup>
                {sortOption.map((e, index) => (
                  <SelectItem
                    key={index}
                    className="bg-background hover:bg-muted"
                    value={e.value}
                  >
                    {e.placeholder}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Command className="w-[240px] bg-[#1C1D21]">
          <CommandInput
            placeholder="Search game"
            className="bg-[#1C1D21]"
            onValueChange={(e) => {}}
          />
        </Command>
      </div>
    </div>
  );
};

export default UserGameLibrary;
