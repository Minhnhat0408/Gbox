"use client";

import { cn } from "@/lib/utils";
import { CommentType, MessageType } from "@/types/supabaseTableType";
import dayjs from "dayjs";
import Image from "next/image";
import ViewLarge from "../viewLarge";
import { FaFile } from "react-icons/fa6";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
export default function MessageItem({
  sender = false,
  content,
  created_at,
  id,
  receiver_id,
  room_id,
  media,
  application,
  sender_id,
  isLastSeen,
  isNewDay,
}: MessageType & {
  sender?: boolean;
  isLastSeen?: string;
  isNewDay?: string;
}) {
  return (
    <>
      {isNewDay && (
        <div className="text-center font-bold super text-sm mt-4 mb-2">
          {isNewDay}
        </div>
      )}
      <div
        className={cn(
          " group flex items-center w-fit",
          sender ? " self-end chat-right  " : "  chat-left"
        )}
      >
        {sender && (
          <p className="px-3 group-hover:block hidden text-sm text-muted-foreground">
            {dayjs(created_at).format("LT")}
          </p>
        )}
        {content && (
          <p className="bg-primary max-w-[360px] w-fit p-4 py-2 rounded-2xl flex  break-all">
            {content}
          </p>
        )}
        {application && (
          <a
            href={application.url}
            target="_blank"
            className="flex  items-center  w-fit max-w-[280px]  card-container rounded-2xl py-4 px-4"
          >
            <div className="text-2xl text-white">
              <FaFile />
            </div>
            <p className="text-white  line-clamp-2 ml-2 ">{application.name}</p>
          </a>
        )}
        {media && (
          <div className=" flex-wrap max-w-[360px] justify-end  overflow-hidden   w-fit gap-x-2 gap-y-2 rounded-2xl flex  break-all">
            {media.map((item, ind) => {
              const width = media.length === 1 ? "w-auto" : "w-[170px]";
              if (item.type === "image") {
                return (
                  <ViewLarge
                    key={ind}
                    alt="ava"
                    src={item.url}
                    className={cn(
                      " object-cover   h-[150px] w-auto ml-auto ",
                      width
                    )}
                  />
                );
              } else {
                return (
                  <video
                    key={ind}
                    src={item.url}
                    className="w-auto object-cover  h-fit max-h-[280px]  "
                  />
                );
              }
            })}
          </div>
        )}

        {!sender && (
          <p className="px-3 text-sm group-hover:block hidden text-muted-foreground">
            {dayjs(created_at).format("LT")}
          </p>
        )}
      </div>
      {isLastSeen && (
        <div  className="h-fit self-end  mt-1 mb-4">
          <Image
            src={isLastSeen || "/image 1.png"}
            width={0}
            height={0}
            sizes="100vw"
            alt="ava"
            className="w-6 h-6  object-cover   bg-center border-2 border-primary rounded-full "
          />
        </div>
      )}
    </>
  );
}
