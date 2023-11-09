"use client";

import { useUser } from "@/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import { useEventDetail } from "@/hooks/useEventDetail";
import { toast } from "sonner";
import { usePostFormModal } from "@/hooks/usePostFormModal";
import { useSearchGameForm } from "@/hooks/useSearchGameForm";
import PostsScroll from "../post-ui/posts-scroll";
import Image from "next/image";

const EventDiscussionZone = () => {
  const { userDetails } = useUser();

  const { isPariticpated, isHost, id, game_meta_data, event_name } = useEventDetail();

  const {
    onOpen: openPostForm,
    setIsEventPost,
    setEventID,
    setEventName
  } = usePostFormModal();

  const { setGameMetaData } = useSearchGameForm();

  return (
    <div className="w-3/5 flex flex-col h-full">
      <div className="card-container flex justify-between items-center rounded-2xl py-4 px-7">
        <Avatar className="w-[50px] h-[50px] mr-6">
          <AvatarImage
            className="object-cover object-center w-auto h-full"
            src={userDetails?.avatar || "/avatar.jpg"}
          />
          <AvatarFallback>{"A"}</AvatarFallback>
        </Avatar>
        <div className="flex justify-center flex-1">
          <Button
            onClick={() => {
              if (!isPariticpated && !isHost) {
                return toast.error(
                  "You must join the event to post a discussion"
                );
              }
              setIsEventPost(true);
              setEventID(id);
              openPostForm();
              setGameMetaData(game_meta_data);
              setEventName(event_name);
            }}
            className="text-white w-full super-bg"
          >
            <AiOutlinePlus className="text-white text-xl mr-3" />
            Start discussion by posting a post
          </Button>
        </div>
      </div>
      <div className="text-xl font-bold mt-8 mb-8 super">
        Event recent activity
      </div>
      {!isPariticpated && !isHost && (
        <div className="w-full center rounded-2xl flex-col flex flex-1">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-32 h-32  mt-4"
          />
          <span className="text-lg h-[120px] center w-full px-4">
            <span>You must join the event to see the discussion zone</span>
          </span>
        </div>
      )}
      {(isPariticpated || isHost) && (
        <PostsScroll location="event" eventID={id} />
      )}
    </div>
  );
};

export default EventDiscussionZone;
