import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { BsThreeDotsVertical } from "react-icons/bs";
// import PostDetail from "@/app/(home)/post/postDetail";
import Image from "next/image";
import { ProfilesType } from "@/types/supabaseTableType";
import CurrentGame from "./CurrentGame";
import ChartGame from "./ChartGame";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabaseTypes";

import { cookies } from "next/headers";
import { GameProgressType } from "@/types/gameProgressType";

import PostItem from "@/components/post-ui/post-item";
import PostsScroll from "@/components/post-ui/posts-scroll";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Chart } from 'react-chartjs-2';
import { AiFillClockCircle, AiFillCloseCircle, AiFillTrophy } from "react-icons/ai";
import { RiSwordFill } from "react-icons/ri";
import { FaInfinity } from "react-icons/fa"

ChartJS.register( ArcElement, Tooltip, Legend );



export default async function ProfileBody({ profile } : { profile: ProfilesType }) {
  
  const supabase = createServerComponentClient<Database>({ cookies });  
  
  const { data, error } = await supabase.from('user_game_data').select().eq('user_id', profile.id).order('modified_date', { ascending: false }) as unknown as { data: GameProgressType[], error: any }

  return (
    <div className="flex mt-8 justify-between gap-10 xl:gap-x-20 2xl:gap-x-32">
      <div id="Left" className="w-3/5 bg-slate-900 bg-opacity-0">
      <div id="CurrentGame" className="w-full">
          <h1 className="font-semibold text-2xl uppercase">Currently <span className="super">playing</span></h1>
          <CurrentGame data={data} />
      </div>
        <div className="mt-4 w-full flex">
          <div id="Game_Filter" className="w-[30%]">
            <Select>
              <SelectTrigger className="">
                <SelectValue className="" placeholder="Game filter" />
              </SelectTrigger>

                <SelectContent className="bg-background">
                  <SelectGroup>
                    <SelectItem className="bg-background hover:bg-muted" value="League of Legends">
                      League of Legends
                    </SelectItem>

                    <SelectItem className="bg-background hover:bg-muted" value="Valorant">
                      Valorant
                    </SelectItem>

                    <SelectItem className="bg-background hover:bg-muted" value="Genshin Impact">
                      Genshin Impact
                    </SelectItem>

                    <SelectItem className="bg-background hover:bg-muted" value="CS:GO">
                      CS:GO
                    </SelectItem>

                    <SelectItem className="bg-background hover:bg-muted" value="Free Fire">
                      Free Fire
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

          <div className="w-[5%]" />

            <div id="Sort_by" className="w-[30%]">
            <Select>
                <SelectTrigger className="">
                  <SelectValue className="" placeholder="Sort by" />
                </SelectTrigger>

                <SelectContent className="bg-background">
                  <SelectGroup>
                    <SelectItem className="bg-background hover:bg-muted" value="Newest">
                      Newest
                    </SelectItem>

                    <SelectItem className="bg-background hover:bg-muted" value="Oldest">
                      Oldest
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
              <div className=" mt-10">
              <PostsScroll location="profile" username={profile.name ? profile.name : undefined} />
            </div>
            <div className="absolute bottom-0 z-0 w-full bg-gradient-to-r from-[#f1f1f1] to-[transparent] h-[2px]" />
          
      </div>


      <ChartGame data={data} />
    </div>
  );
}
