"use client";

import { useProfileViewMode } from "@/hooks/useProfileViewMode";
import { GameProgressType } from "@/types/gameProgressType";
import { ProfilesType } from "@/types/supabaseTableType";
import CurrentGame from "./CurrentGame";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import PostsScroll from "../post-ui/posts-scroll";
import UserGameLibrary from "./UserGameLibrary";

type ProfileViewModeProps = {
  profile: ProfilesType;
  data: GameProgressType[];
};

const ProfileViewMode = ({ profile, data }: ProfileViewModeProps) => {
  const { viewMode, setViewMode } = useProfileViewMode();

  return (
    <div>
      <div className="w-fit relative flex mb-16">
        <div
          onClick={() => {
            setViewMode("feed");
          }}
          className="center relative p-3 min-w-[160px] text-lg cursor-pointer hover:bg-black/30 rounded-lg transition"
        >
          <span>Feed</span>
          {viewMode === "feed" && (
            <div className="w-full z-10 rounded-t-lg absolute h-1 super-bg left-0 right-0 -bottom-[4px]"></div>
          )}
        </div>
        <div
          onClick={() => {
            setViewMode("information");
          }}
          className="center relative p-3 min-w-[160px] text-lg cursor-pointer hover:bg-black/30 rounded-lg transition"
        >
          <span>Information</span>
          {viewMode === "information" && (
            <div className="w-full z-10 rounded-t-lg absolute h-1 super-bg left-0 right-0 -bottom-[4px]"></div>
          )}
        </div>
        <div
          onClick={() => {
            setViewMode("library");
          }}
          className="center relative p-3 min-w-[200px] text-lg cursor-pointer hover:bg-black/30 rounded-lg transition"
        >
          <span>Game Library</span>
          {viewMode === "library" && (
            <div className="w-full z-10 rounded-t-lg absolute h-1 super-bg left-0 right-0 -bottom-[4px]"></div>
          )}
        </div>
        <div className="w-full rounded-t-lg absolute h-1 bg-zinc-500 left-0 right-0 -bottom-[4px]"></div>
      </div>
      {viewMode === "library" && <UserGameLibrary profile={profile} />}
      {viewMode === "information" && <div>User Basic Information</div>}
      {viewMode === "feed" && (
        <div className="gap-10 xl:gap-x-18 2xl:gap-x-32">
          <div id="CurrentGame" className="w-full">
            <h1 className="mb-6 text-xl font-semibold uppercase">
              Currently <span className="super">playing</span>
            </h1>
            <CurrentGame data={data} />
          </div>

          <div className="mt-10">
            <h1 className="mb-6 text-xl font-semibold uppercase">
              Gaming <span className="super">feed</span>
            </h1>
            <div className="gap-x-3 flex w-full">
              <div id="Game_Filter" className="w-[30%]">
                <Select>
                  <SelectTrigger className="">
                    <SelectValue className="" placeholder="Game filter" />
                  </SelectTrigger>

                  <SelectContent className="bg-background">
                    <SelectGroup>
                      <SelectItem
                        className="bg-background hover:bg-muted"
                        value="League of Legends"
                      >
                        League of Legends
                      </SelectItem>

                      <SelectItem
                        className="bg-background hover:bg-muted"
                        value="Valorant"
                      >
                        Valorant
                      </SelectItem>

                      <SelectItem
                        className="bg-background hover:bg-muted"
                        value="Genshin Impact"
                      >
                        Genshin Impact
                      </SelectItem>

                      <SelectItem
                        className="bg-background hover:bg-muted"
                        value="CS:GO"
                      >
                        CS:GO
                      </SelectItem>

                      <SelectItem
                        className="bg-background hover:bg-muted"
                        value="Free Fire"
                      >
                        Free Fire
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div id="Sort_by" className="w-[30%]">
                <Select>
                  <SelectTrigger className="">
                    <SelectValue className="" placeholder="Sort by" />
                  </SelectTrigger>

                  <SelectContent className="bg-background">
                    <SelectGroup>
                      <SelectItem
                        className="bg-background hover:bg-muted"
                        value="Newest"
                      >
                        Newest
                      </SelectItem>

                      <SelectItem
                        className="bg-background hover:bg-muted"
                        value="Oldest"
                      >
                        Oldest
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <PostsScroll
              location="profile"
              userID={profile.id ? profile.id : undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileViewMode;
