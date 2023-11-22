"use client";

import { ProfilesType, UserGameDataType } from "@/types/supabaseTableType";
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
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { Command, CommandInput } from "../ui/command";
import { useDebounce } from "@/hooks/useDebounce";
import {
  SortType,
  convertSortType,
  useUserGameLibrary,
} from "@/hooks/useUserGameLibrary";
import { toast } from "sonner";
import GameLibLoading from "./GameLibLoading";
import GameLibRow from "./GameLibRow";

type UserGameLibraryProp = {
  profile: ProfilesType;
};

const UserGameLibrary = ({ profile }: UserGameLibraryProp) => {
  const { supabaseClient } = useSessionContext();

  const { gameData, setGameData, sortType, setSortType } = useUserGameLibrary();

  const [countSort, setCountSort] = useState(0);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const searchDebounce = useDebounce(search, 500);

  useEffect(() => {
    if (searchDebounce) {
      //TODO: logic for searching game
    }
  }, [searchDebounce]);

  useEffect(() => {
    const fetchUserGames = async () => {
      try {
        setLoading(true);
        if (countSort === 0) return;

        const { data, error } = (await supabaseClient
          .from("user_game_data")
          .select()
          .eq("user_id", profile.id)
          .order(convertSortType(sortType.sortBy), {
            ascending: sortType.isAscending,
          })
          .limit(10)) as unknown as { data: UserGameDataType[]; error: any };

        if (error) {
          throw error;
        }

        setGameData(data);
        console.log(data);
      } catch (error) {
        toast.error("something happened");
      } finally {
        setLoading(false);
      }
    };
    fetchUserGames();
  }, [countSort]);

  useEffect(() => {
    const fetchUserGames = async () => {
      try {
        setLoading(true);
        setSortType({ ...sortType, isAscending: true });
        const { data, error } = (await supabaseClient
          .from("user_game_data")
          .select()
          .eq("user_id", profile.id)
          .order("modified_date", { ascending: false })
          .limit(10)) as unknown as { data: UserGameDataType[]; error: any };

        if (error) {
          throw error;
        }

        setGameData(data);
        console.log(data);
      } catch (error) {
        toast.error("something happened");
      } finally {
        setLoading(false);
      }
    };
    fetchUserGames();
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-2 w-1/2">
          <div
            onClick={() => {
              setSortType({
                ...sortType,
                isAscending: !sortType.isAscending,
              });
              setCountSort(countSort + 1);
            }}
            className="rounded-md p-0 m-0 bg-[#1C1D21] min-w-10 w-10 h-10 center"
          >
            {sortType.isAscending === false ? (
              <ChevronsUp className="w-5 h-5 text-white" />
            ) : (
              <ChevronsDown className="w-5 h-5 text-white" />
            )}
          </div>
          <Select
            onValueChange={(e) => {
              setSortType({
                ...sortType,
                sortBy: e as SortType,
              });
              setCountSort(countSort + 1);
            }}
          >
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
            onValueChange={(e) => {
              setSearch(e.trim());
            }}
          />
        </Command>
      </div>
      <div className="space-y-7">
        {loading
          ? [0, 1, 2, 3, 4, 5].map((e) => <GameLibLoading key={e} />)
          : gameData.map((e, index) => (
              <GameLibRow index={index} data={e} key={e.id} />
            ))}
      </div>
    </div>
  );
};

export default UserGameLibrary;
