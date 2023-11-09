"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEventDetail } from "@/hooks/useEventDetail";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function EventTagScroll() {
  const { tags } = useEventDetail();

  const [ref] = useKeenSlider<HTMLDivElement>({
    mode: "free",
    slides: {
      perView: "auto",
      spacing: 15,
    },
  });

  return (
    tags &&
    tags?.length > 0 && (
      <div ref={ref} className="keen-slider py-4">
        {tags.map((e, index) => (
          <TooltipProvider delayDuration={200} key={index}>
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-2xl flex justify-center keen-slider__slide !max-w-[250px] !min-w-[200px]  select-none px-6 py-2 border-2 border-solid border-[#3dbda7] text-white">
                  <div className="!max-w-[150px] text-base text-center !min-w-[100px] truncate">
                    # {e}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2 text-center rounded-xl">{e}</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    )
  );
}
