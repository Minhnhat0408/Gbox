"use client";

import AboutApplyForm from "@/components/coach-application/about-form/AboutApplyForm";
import { useApplyProcess } from "@/hooks/useApplyProcess";
import { cn } from "@/lib/utils";

const ApplyCoachingPage = () => {
  const { applyProcess } = useApplyProcess();

  return (
    <div className="mx-8 !pt-[72px] px-16">
      <div className="mt-10 items-center justify-between flex mb-32 w-full gap-x-3">
        <div className="w-10 h-10 rounded-full bg-primary center">
          <span className="text-black">1</span>
        </div>
        <div className="border-t-2 border-dashed border-zinc-400 flex-1"></div>
        <div
          className={cn("w-10 h-10 rounded-full center ", {
            "border-2 border-primary ": applyProcess === "coach-profile",
            "bg-primary": applyProcess !== "coach-profile",
          })}
        >
          <span
            className={cn("text-black", {
              "text-white": applyProcess === "coach-profile",
            })}
          >
            2
          </span>
        </div>
        <div className="border-t-2 border-dashed border-zinc-400 flex-1"></div>

        <div
          className={cn("w-10 h-10 rounded-full center ", {
            "border-2 border-primary ": applyProcess === "social-media",
            "bg-primary": applyProcess !== "social-media",
          })}
        >
          <span
            className={cn("text-black", {
              "text-white": applyProcess === "social-media",
            })}
          >
            3
          </span>
        </div>
        <div className="border-t-2 border-dashed border-zinc-400 flex-1"></div>

        <div
          className={cn("w-10 h-10 rounded-full center ", {
            "border-2 border-primary ": applyProcess === "finish",
            "bg-primary": applyProcess !== "finish",
          })}
        >
          <span
            className={cn("text-black", {
              "text-white": applyProcess === "finish",
            })}
          >
            4
          </span>
        </div>
      </div>
      <AboutApplyForm />
    </div>
  );
};

export default ApplyCoachingPage;
