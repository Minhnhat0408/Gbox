"use client";

import { useCoachProfile } from "@/hooks/useCoachDetail";
import { Separator } from "../ui/separator";
import { useState } from "react";
import CoachSocialLink from "./CoachSocialLink";
import GalleryView from "./GalleryView";
import CoachSessionView from "./CoachSessionView";
import PostsScroll from "@/components/post-ui/posts-scroll";

type ViewMode = "Social" | "Session" | "Feedback" | "Gallery";

const viewModeList: ViewMode[] = ["Social", "Session", "Feedback", "Gallery"];

const CoachProfileViewMode = () => {
  const { data } = useCoachProfile();
  const [viewMode, setViewMode] = useState<ViewMode>("Social");

  return (
    <>
      <div className="w-full">
        <div className="w-full flex justify-center">
          <div className="flex gap-x-6">
            {viewModeList.map((mode, index) => {
              if (mode === "Gallery" && !data.preview_images?.length)
                return null;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center gap-y-2 cursor-pointer ${
                    viewMode === mode ? "text-primary " : ""
                  }`}
                  onClick={() => setViewMode(mode)}
                >
                  <div>{mode}</div>
                  {viewMode === mode && (
                    <div className="w-full h-[2px] rounded-sm bg-primary"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <Separator className="w-full mt-6 mb-9 bg-black/20" />
        {viewMode === "Social" && (
          <div className="w-full h-[400px] my-5">
            <CoachSocialLink />
          </div>
        )}
        {viewMode === "Session" && <CoachSessionView />}
        {viewMode === "Feedback" && <div className="my-5"></div>}
        {viewMode === "Gallery" && (
          <div className="w-full h-[400px] my-5">
            <GalleryView />
          </div>
        )}
      </div>
      {viewMode === "Social" && (
        <div className="w-full ">
          <div className="w-full mt-12">
            <div className="super text-2xl font-bold">
              {data.full_name}
              {"'s Feed"}
            </div>
          </div>
          <div className="w-full h-full overflow-x-hidden pb-20">
            <PostsScroll
              location="profile"
              userID={data.profiles.id ? data.profiles.id : undefined}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CoachProfileViewMode;
