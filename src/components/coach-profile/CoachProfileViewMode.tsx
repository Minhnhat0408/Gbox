"use client";

import { useCoachProfile } from "@/hooks/useCoachDetail";
import { Separator } from "../ui/separator";
import { useState } from "react";
import CoachSocialLink from "./CoachSocialLink";
import GalleryView from "./GalleryView";

type ViewMode = "Social" | "Session" | "Feedback" | "Gallery";

const viewModeList: ViewMode[] = ["Social", "Session", "Feedback", "Gallery"];

const CoachProfileViewMode = () => {
  const { data } = useCoachProfile();
  const [viewMode, setViewMode] = useState<ViewMode>("Social");

  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
        <div className="flex gap-x-6">
          {viewModeList.map((mode, index) => {
            if (mode === "Gallery" && !data.preview_images?.length) return null;
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
      <div className="w-full h-[400px] my-5">
        {viewMode === "Social" && <CoachSocialLink />}
        {viewMode === "Session" && (
          <div className="w-full h-full bg-card"></div>
        )}
        {viewMode === "Feedback" && <div></div>}
        {viewMode === "Gallery" && <GalleryView />}
      </div>
    </div>
  );
};

export default CoachProfileViewMode;
