"use client";

import usePostDetailsModal from "@/hooks/usePostDetailsModal";
import Modal from "../modals/Modal";
import { DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoGameControllerSharp } from "react-icons/io5";
import gameProgress from "@/constants/progress";
import LikeButton from "./like-button";
import Slider from "../animations/slider";
import VideoPlayer from "../video-player/VideoPlayer";
import dayjs from "dayjs";
import CommentBox from "../comment-ui/comment.-box";
import CommentInput from "../comment-ui/comment-input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Separator } from "../ui/separator";
import ViewLarge from "../viewLarge";

export default function PostDetailsModal() {
  const {
    isOpen,
    postId,
    postData,
    isLoading,
    setPostData,
    setPostId,
    setIsLoading,
    onOpen,
    onClose,
    reset,
  } = usePostDetailsModal((set) => set, shallow);
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    if (postId === "") return;
    (async () => {
      setIsLoading(true);
      const { data, error } = await supabaseClient
        .from("posts")
        .select(
          "*,comments(count), profiles!posts_user_id_fkey(name, avatar, location)"
        )
        .eq("id", postId)
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        setPostData(data);
      }
      setIsLoading(false);
    })();
  }, [postId]);
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[800px] max-h-[90vh] bg-layout py-6 pb-5  flex flex-col  !rounded-3xl remove-button"
    >
      <DialogHeader>
        <DialogTitle className=" text-3xl super font-bold tracking-wider text-center ">
          {postData?.game_name ? "Game Review" : "User Sharing"}
        </DialogTitle>
      </DialogHeader>

      {!isLoading && postData ? (
        <article
          className={cn("w-full flex-1 scrollbar overflow-y-auto  space-y-6  ")}
        >
          <div className={cn("gap-y-5 flex flex-col w-full h-fit ")}>
            <div className="w-fit 2xl:gap-x-4 gap-x-3 flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={"/user/" + postData.profiles.name}>
                      <Avatar className=" h-14 w-14 border-primary border-2">
                        <AvatarImage src={postData.profiles.avatar || " "} />
                        <AvatarFallback className=" bg-gray-700">
                          Avatar
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-home p-4">
                    <div className="gap-x-2 flex">
                      <Avatar className="w-12 h-12">
                        <Link href={"/user/" + postData.profiles.name}>
                          <AvatarImage src={postData.profiles.avatar || " "} />{" "}
                        </Link>
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="gap-y-2">
                        <p className="">{postData.profiles.name}</p>
                        <span className="text-muted-foreground italic">
                          {postData.profiles.location}
                        </span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className=" relative inline-flex flex-1 flex-col">
                <div className=" flex gap-x-4">
                  <span className="font-bold text-xl  text-primary ">
                    {postData.profiles.name}
                  </span>{" "}
                  <div className="bg-primary rounded-3xl inline-flex items-center w-full px-3 select-none">
                    {postData.game_progress ? (
                      gameProgress[
                        postData.game_progress as keyof typeof gameProgress
                      ].icon("w-3 h-3 ", "2xl:w-5 2xl:h-5 h-4 w-4 mr-2")
                    ) : (
                      <IoGameControllerSharp
                        className={" 2xl:w-5 2xl:h-5 h-4 w-4 mr-2 text-muted"}
                      />
                    )}{" "}
                    {postData.game_name ? (
                      <Link
                        target="_blank"
                        href={
                          "https://www.ign.com" +
                          Object(postData.game_meta_data).url
                        }
                        className="2xl:text-base  text-sm"
                      >
                        {postData.game_name}
                      </Link>
                    ) : (
                      <p className="2xl:text-base  text-sm">Gbox Sharing</p>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground 2xl:text-base inline-flex text-sm italic">
                  {dayjs(postData.created_at).fromNow()}
                </p>
              </div>
            </div>
            <div className="gap-x-3 gap-y-3 flex flex-col">
              <h2 className="text-xl font-bold">{postData.title}</h2>
              <p className={cn("text-muted-foreground  leading-5 ")}>
                {postData.content}
              </p>
            </div>
          </div>

          <div className="flex-1 bg-muted  justify-center flex  overflow-hidden">
            {postData.media && postData.media.type === "image" && (
              <Slider
                className=" w-full h-full"
                delay={5000}
                loop={postData.media.url.length > 1}
              >
                {postData.media.url.map((item, ind) => {
                  return (
                    <ViewLarge
                      key={ind}
                      src={item}
                      alt="hello"
                      className=" object-cover w-auto h-full"
                      classNameParents="keen-slider__slide w-full h-full  flex justify-center bg-muted"
                    />
                  );
                })}
              </Slider>
            )}
            {postData.media && postData.media.type === "video" && (
              <VideoPlayer
                src={postData.media.url[0]}
                options={{
                  autopause: true,
                }}
              />
            )}
          </div>
          <LikeButton
            postId={postData.id}
            details
            comments={postData.comments[0].count}
          />
          <Separator className="text-muted-foreground" />
          <CommentBox />
        </article>
      ) : (
        <div className="h-[400px] w-full flex justify-center items-center ">
          <div className="text-3xl animate-spin">
            <AiOutlineLoading3Quarters />
          </div>
        </div>
      )}

      <DialogFooter>
        <CommentInput />
      </DialogFooter>
    </Modal>
  );
}
