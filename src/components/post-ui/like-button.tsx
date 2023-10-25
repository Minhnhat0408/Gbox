"use client";

import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { ProfilesType, ReactionReturnType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { use, useEffect, useRef, useState } from "react";
import { FaShieldHalved, FaCommentDots } from "react-icons/fa6";
import { LuSwords } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import usePostDetailsModal from "@/hooks/usePostDetailsModal";
import { shallow } from "zustand/shallow";
import { toast } from "sonner";
type LikeButtonProps = {
  postId: string;
  comments: number;
  details?: boolean;
};

const LikeButton = ({
  postId,
  comments,
  details = false,
}: LikeButtonProps) => {
  const { supabaseClient } = useSessionContext();
  const { onOpen, setPostId } = usePostDetailsModal((set) => set, shallow);
  const { user, userDetails } = useUser();
  const [latestProfile, setLatestProfile] = useState<ProfilesType[]>([]);
  const baseReactions = useRef(0);
  const [reactor, setReactor] = useState<ReactionReturnType>([]);

  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const { data } = await supabaseClient
        .from("reactions")
        .select("*, profiles(*)")
        .range(0, 2)
        .eq("post_id", postId)
        .is("comment_id", null)
        .order("modified_at", { ascending: false });

      const { data: more, error } = await supabaseClient
        .from("reactions")
        .select("*")
        .range(3, 1000)
        .eq("post_id", postId)
        .is("comment_id", null)
        .order("modified_at", { ascending: false });
      if (error) {
        toast.error(error.message);
      }
      let latestProfileData = data?.map((item) => item.profiles);
      latestProfileData = latestProfileData?.reverse();
      const newData = [...data!, ...more!];
      setLatestProfile(latestProfileData!);
      setReactor(newData as ReactionReturnType);

      let status = 0;
      let up = 0;
      let down = 0;
      newData.forEach((item) => {
        if (item.user_id === user?.id) {
          if (item.reaction_type === "up") {
            status = 1;
          } else if (item.reaction_type === "down") {
            status = -1;
          } else {
            status = 0;
          }
        } else {
          if (item.reaction_type === "up") {
            up++;
          } else {
            down++;
          }
        }
      });
      baseReactions.current = up - down;
      setStatus(status);

      // console.log(data, "hello");
    })();
  }, []);
  const handleClickDown = async () => {
    const userPosition = latestProfile.findIndex(
      (item) => item.id === user?.id
    );
    console.log(userPosition, "status", status);
    if (status === -1) {
      setStatus(0);
      const newProfiles = [...latestProfile];
      const a = newProfiles.filter((item) => item.id !== user!.id);
      // push front the third element in reactions to a

      setLatestProfile(a);
      await supabaseClient
        .from("reactions")
        .delete()
        .eq("user_id", user?.id)
        .eq("post_id", postId);
    } else {
      setStatus(-1);

      // push reactor to first and deletet the last element

      if (userPosition !== 2) {
        const newProfile = [...latestProfile];
        if (userPosition > -1) {
          newProfile.splice(userPosition, 1);
        }

        newProfile.push({
          id: user!.id,
          created_at: userDetails!.created_at,
          name: userDetails!.name,
          avatar: userDetails!.avatar,
          location: userDetails!.location,
          bio: userDetails!.bio,
          dob: userDetails!.dob,
          gaming_platform: userDetails!.gaming_platform,
          gender: null,
          modified_at: null,
          play_time: null,
          role: null,
        });
        setLatestProfile(newProfile);
      }
      await supabaseClient.from("reactions").upsert({
        id: userPosition > -1 ? reactor[userPosition].id : undefined,
        post_id: postId,
        user_id: user?.id,
        reaction_type: "down",
        modified_at: new Date(),
      });
    }
  };

  const handleClickUp = async () => {
    const userPosition = latestProfile.findIndex(
      (item) => item.id === user?.id
    );
    console.log(userPosition, "status", status)
    if (status === 1) {
      setStatus(0);
      const newProfiles = [...latestProfile];
      const a = newProfiles.filter((item) => item.id !== user!.id);
      // push front the third element in reactions to a

      setLatestProfile(a);
      await supabaseClient
        .from("reactions")
        .delete()
        .eq("user_id", user?.id)
        .eq("post_id", postId);
    } else {
      setStatus(1);

      // push reactor to first and deletet the last element
      if (userPosition !== 2) {
        const newProfile = [...latestProfile];
        if (userPosition > -1) {
          newProfile.splice(userPosition, 1);
        }

        newProfile.push({
          id: user!.id,
          created_at: userDetails!.created_at,
          name: userDetails!.name,
          avatar: userDetails!.avatar,
          location: userDetails!.location,
          bio: userDetails!.bio,
          dob: userDetails!.dob,
          gaming_platform: userDetails!.gaming_platform,
          gender: null,
          modified_at: null,
          play_time: null,
          role: null,
        });
        
        setLatestProfile(newProfile);
      }

      await supabaseClient.from("reactions").upsert({
        id: userPosition > -1 ? reactor[userPosition].id : undefined,
        post_id: postId,
        user_id: user?.id,
        reaction_type: "up",
        modified_at: new Date(),
      });
    }
  };
  return (
    <div className={cn(" mt-auto flex h-8 gap-x-2 ", details && " gap-x-6")}>
      {reactor.length > 0 && (
        <div
          className={cn(
            " relative flex   w-16 h-8",
            !details && "xl:flex hidden"
          )}
        >
          {latestProfile.slice(-3).map((profile, ind) => {
            return (
              <TooltipProvider key={ind}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={"/user/" + profile.name}>
                      <Avatar
                        style={{ transform: `translateX(${ind * 16}px)` }}
                        className=" border-primary absolute top-0 left-0 w-8 h-8 border-2 rounded-full"
                      >
                        <AvatarImage src={profile.avatar || " "} />
                        <AvatarFallback className=" bg-gray-700">
                          Avatar
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-home p-4">
                    <div className="gap-x-2 flex">
                      <Avatar className="w-12 h-12">
                        <Link href={"/user/" + profile.name}>
                          <AvatarImage src={profile.avatar || " "} />{" "}
                        </Link>
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="gap-y-2">
                        <p className="">{profile.name}</p>
                        <span className="text-muted-foreground italic">
                          {profile.location}
                        </span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      )}
      <div
        className={cn(
          "flex text-muted rounded-3xl 2xl:min-w-[90px] min-w-[80px] justify-between overflow-hidden items-center relative bg-white ",
          status === 0
            ? " bg-white"
            : status === 1
            ? "bg-primary text-white"
            : "bg-red-400 text-white"
        )}
      >
        <button
          onClick={handleClickUp}
          className=" 2xl:text-xl group/up flex items-center justify-center h-8 px-2 text-lg cursor-pointer"
        >
          <div className="absolute top-0 left-0 h-full opacity-0 font-bold text-white 2xl:text-base text-sm flex justify-center items-center w-0 group-hover/up:w-full !bg-primary duration-500 group-hover/up:opacity-100">
            Win
          </div>
          <LuSwords />
        </button>
        <p className=" 2xl:text-base flex items-center justify-center h-full text-sm">
          {baseReactions.current + status}
        </p>
        <button
          onClick={handleClickDown}
          className=" 2xl:text-xl group/down flex items-center justify-center h-full px-2 text-lg cursor-pointer"
        >
          <div className="group-hover/down:w-full group-hover/down:opacity-100 absolute top-0 right-0 flex items-center justify-center w-0 h-full text-base font-bold text-white duration-500 bg-red-400 opacity-0">
            Lose
          </div>
          <FaShieldHalved />
        </button>
      </div>
      <button
        onClick={() => {
          if (!details) {
            setPostId(postId);
            onOpen();
          }
        }}
        className="text-muted hover:bg-primary rounded-3xl 2xl:text-xl gap-x-2 flex items-center h-8 justify-center px-2 text-lg duration-500 bg-white"
      >
        <FaCommentDots />
        <span className="2xl:text-base text-sm">{comments}</span>
      </button>
    </div>
  );
};

export default LikeButton;
