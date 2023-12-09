"use client";

import ImageNew from "@/components/new-image/Image";
import { useIsClamped } from "@/hooks/useIsClamped";
import { convertScoreColor } from "@/lib/convertScoreColor";
import convertScoreToEmoji from "@/lib/convertScoreToEmoji";
import { cn } from "@/lib/utils";
import { FeedbackWithStudentProfiles } from "@/types/supabaseTableType";
import { useRef, useState } from "react";

const FeedbackDrawerItem = ({
  item,
}: {
  item: FeedbackWithStudentProfiles;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isClapmed = useIsClamped(ref);

  const [show, setShow] = useState(false);

  return (
    <div className="rounded-xl p-4 bg-background w-full">
      <div
        ref={ref}
        className={cn("line-clamp-5 whitespace-pre-line break-words", {
          "line-clamp-none": show,
        })}
      >
        {item.content}
      </div>
      {isClapmed && (
        <button
          onClick={() => {
            setShow(!show);
          }}
          className="mt-2 text-xs font-medium leading-4 text-primary"
        >
          {show ? "Show less" : "Show more"}
        </button>
      )}
      <div className="w-full flex items-center justify-between">
        <div className="flex mt-4 items-center gap-x-3">
          <ImageNew
            className={cn("w-12 h-12 rounded-full border-2", {
              "border-blue-400": item.profiles.gender === "male",
              "border-pink-400": item.profiles.gender === "female",
            })}
            src={item.profiles.avatar!}
          />
          <div className="flex flex-col justify-center items-start gap-y-[6px]">
            <p className="text-zinc-300 font-bold text-base">
              {item.profiles.name}
            </p>
            <div className="text-zinc-400 text-xs line-clamp-1">
              {item.course_session.name}
            </div>
          </div>
        </div>
        <div
          className={`font-bold text-3xl mt-1 flex items-center ${
            item && item.rate && item.rate >= 0
              ? convertScoreColor(item.rate)
              : "text-zinc-300"
          }`}
        >
          {item && item.rate && item.rate >= 0 ? item.rate : "NS"}{" "}
          <span className="text-xl mx-2">/</span>
          10
          <span className="ml-2 text-black text-2xl transition-transform duration-300 ease-in-out">
            {convertScoreToEmoji(item?.rate)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDrawerItem;
