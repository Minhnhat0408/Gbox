/* eslint-disable react-hooks/exhaustive-deps */
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
import Image from "next/image";
import { Button } from "../ui/button";
import { ImSpinner2 } from "react-icons/im";
import { useUser } from "@/hooks/useUser";
import { useSearchParams } from "next/navigation";

const UserGameLibrary = () => {
  const { supabaseClient } = useSessionContext();

  const { gameData, setGameData, sortType, setSortType } = useUserGameLibrary();

  const [countSort, setCountSort] = useState(0);

  const [loading, setLoading] = useState(false);

  const { userDetails } = useUser();

  const searchParams = useSearchParams();

  const status = searchParams.get("status");

  useEffect(() => {
    const fetchUserGames = async () => {
      try {
        if (userDetails?.id === undefined) return;
        setLoading(true);
        let fetchResults: unknown;

        if (status === null) {
          if (searchDebounce) {
            fetchResults = supabaseClient
              .from("user_game_data")
              .select()
              .eq("user_id", userDetails?.id)
              .order(convertSortType(sortType.sortBy), {
                ascending: sortType.isAscending,
              })
              .ilike("game_meta_data->>name", `%${searchDebounce}%`)
              .limit(10);
          } else if (searchDebounce === "" && firstTime) {
            fetchResults = supabaseClient
              .from("user_game_data")
              .select()
              .eq("user_id", userDetails?.id)
              .order(convertSortType(sortType.sortBy), {
                ascending: sortType.isAscending,
              })
              .limit(10);
          }
        } else {
          if (searchDebounce) {
            fetchResults = supabaseClient
              .from("user_game_data")
              .select()
              .eq("user_id", userDetails?.id)
              .eq("status", status)
              .order(convertSortType(sortType.sortBy), {
                ascending: sortType.isAscending,
              })
              .ilike("game_meta_data->>name", `%${searchDebounce}%`)
              .limit(10);
          } else if (searchDebounce === "" && firstTime) {
            fetchResults = supabaseClient
              .from("user_game_data")
              .select()
              .eq("user_id", userDetails?.id)
              .eq("status", status)
              .order(convertSortType(sortType.sortBy), {
                ascending: sortType.isAscending,
              })
              .limit(10);
          }
        }

        const { data, error } = (await fetchResults) as {
          data: UserGameDataType[];
          error: any;
        };

        if (!data) return;

        if (error) {
          throw error;
        }

        if (data.length < 10) {
          setLoadMore({ ...loadMore, hasMore: false, currentIndex: 10 });
        } else {
          setLoadMore({
            ...loadMore,
            currentIndex: data.length - 1,
            hasMore: true,
          });
        }
        setGameData(data);
      } catch (error) {
        // toast.error("something happened");
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserGames();
  }, [status]);

  const [loadMore, setLoadMore] = useState({
    loading: false,
    hasMore: true,
    currentIndex: 0,
  });

  const [search, setSearch] = useState("");

  const [firstTime, setFirstTime] = useState(false);

  const searchDebounce = useDebounce(search, 500);

  useEffect(() => {
    if (firstTime) {
      setCountSort(countSort + 1);
    }
  }, [searchDebounce]);

  useEffect(() => {
    const fetchUserGames = async () => {
      try {
        setLoading(true);
        if (countSort === 0) return;

        let fetchResults: unknown;

        if (searchDebounce) {
          if (status === null) {
            fetchResults = supabaseClient
              .from("user_game_data")
              .select()
              .eq("user_id", userDetails?.id)
              .order(convertSortType(sortType.sortBy), {
                ascending: sortType.isAscending,
              })
              .ilike("game_meta_data->>name", `%${searchDebounce}%`)
              .limit(10);
          } else {
            fetchResults = supabaseClient
              .from("user_game_data")
              .select()
              .eq("user_id", userDetails?.id)
              .eq("status", status)
              .order(convertSortType(sortType.sortBy), {
                ascending: sortType.isAscending,
              })
              .ilike("game_meta_data->>name", `%${searchDebounce}%`)
              .limit(10);
          }
        } else if (searchDebounce === "" && firstTime) {
          if (status === null) {
            fetchResults = supabaseClient
              .from("user_game_data")
              .select()
              .eq("user_id", userDetails?.id)
              .order(convertSortType(sortType.sortBy), {
                ascending: sortType.isAscending,
              })
              .limit(10);
          } else {
            fetchResults = supabaseClient
              .from("user_game_data")
              .select()
              .eq("user_id", userDetails?.id)
              .eq("status", status)
              .order(convertSortType(sortType.sortBy), {
                ascending: sortType.isAscending,
              })
              .limit(10);
          }
        }

        const { data, error } = (await fetchResults) as {
          data: UserGameDataType[];
          error: any;
        };

        if (error) {
          throw error;
        }
        if (data.length < 10) {
          setLoadMore({ ...loadMore, hasMore: false, currentIndex: 10 });
        } else {
          setLoadMore({
            ...loadMore,
            currentIndex: data.length - 1,
            hasMore: true,
          });
        }
        setGameData(data);
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
        if (userDetails?.id === undefined) return;
        setLoading(true);
        setSortType({ ...sortType, isAscending: false });

        let fetchResults: unknown;

        if (status === null) {
          fetchResults = supabaseClient
            .from("user_game_data")
            .select()
            .eq("user_id", userDetails?.id)
            .order("modified_date", { ascending: false })
            .limit(10);
        } else {
          fetchResults = supabaseClient
            .from("user_game_data")
            .select()
            .eq("user_id", userDetails?.id)
            .eq("status", status)
            .order("modified_date", { ascending: false })
            .limit(10);
        }

        const { data, error } = (await fetchResults) as {
          data: UserGameDataType[];
          error: any;
        };

        if (error) {
          throw error;
        }

        if (data.length < 10) {
          setLoadMore({ ...loadMore, hasMore: false, currentIndex: 10 });
        } else {
          setLoadMore({
            ...loadMore,
            currentIndex: data.length - 1,
            hasMore: true,
          });
        }
        setGameData(data);
      } catch (error) {
        toast.error("something happened");
      } finally {
        setLoading(false);
        setFirstTime(true);
      }
    };
    fetchUserGames();
  }, [userDetails?.id]);

  const getMoreGame = async () => {
    try {
      setLoadMore({ ...loadMore, loading: true });

      let fetchResults: unknown;

      if (searchDebounce) {
        if (status === null) {
          fetchResults = supabaseClient
            .from("user_game_data")
            .select()
            .eq("user_id", userDetails?.id)
            .order(convertSortType(sortType.sortBy), {
              ascending: sortType.isAscending,
            })
            .ilike("game_meta_data->>name", `%${searchDebounce}%`)
            .limit(10)
            .range(loadMore.currentIndex + 1, loadMore.currentIndex + 10);
        } else {
          fetchResults = supabaseClient
            .from("user_game_data")
            .select()
            .eq("user_id", userDetails?.id)
            .eq("status", status)
            .order(convertSortType(sortType.sortBy), {
              ascending: sortType.isAscending,
            })
            .ilike("game_meta_data->>name", `%${searchDebounce}%`)
            .limit(10)
            .range(loadMore.currentIndex + 1, loadMore.currentIndex + 10);
        }
      } else if (searchDebounce === "" && firstTime) {
        if (status === null) {
          fetchResults = supabaseClient
            .from("user_game_data")
            .select()
            .eq("user_id", userDetails?.id)
            .order(convertSortType(sortType.sortBy), {
              ascending: sortType.isAscending,
            })
            .limit(10)
            .range(loadMore.currentIndex + 1, loadMore.currentIndex + 10);
        } else {
          fetchResults = supabaseClient
            .from("user_game_data")
            .select()
            .eq("user_id", userDetails?.id)
            .eq("status", status)
            .order(convertSortType(sortType.sortBy), {
              ascending: sortType.isAscending,
            })
            .limit(10)
            .range(loadMore.currentIndex + 1, loadMore.currentIndex + 10);
        }
      }

      const { data, error } = (await fetchResults) as {
        data: UserGameDataType[];
        error: any;
      };

      if (error) {
        throw error;
      }

      if (data.length < 10) {
        setLoadMore({
          ...loadMore,
          hasMore: false,
          currentIndex: loadMore.currentIndex + 10,
          loading: false,
        });
      } else {
        setLoadMore({
          ...loadMore,
          currentIndex: loadMore.currentIndex + 10,
          loading: false,
        });
      }

      setGameData([...gameData, ...data]);
    } catch (error) {
      toast.error("something happened");
    }
  };

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
        {loading ? (
          [0, 1, 2, 3, 4, 5].map((e) => <GameLibLoading key={e} />)
        ) : gameData.length > 0 ? (
          gameData.map((e, index) => (
            <GameLibRow index={index} data={e} key={index} />
          ))
        ) : (
          <div className="w-full flex-col flex gap-y-4 items-center">
            <Image
              src={"/images/logo.png"}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="w-[180px] h-[180px]"
            />
            <p className="font-semibold text-2xl">No results found ☹️</p>
          </div>
        )}
      </div>
      <div className="center w-full pb-16">
        {loadMore.hasMore && (
          <Button
            onClick={getMoreGame}
            size={"lg"}
            className="shine w-[149px]"
            variant={"default"}
          >
            {loadMore.loading ? (
              <>
                Loading <ImSpinner2 className="text-xl ml-2 animate-spin" />
              </>
            ) : (
              "Load more"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserGameLibrary;
