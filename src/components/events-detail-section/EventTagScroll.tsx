"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function EventTagScroll() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    mode: "free",
    slides: {
      perView: "auto",
      spacing: 15,
    },
  });
  return (
    <div ref={ref} className="keen-slider py-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
        <div
          key={index}
          className="rounded-2xl keen-slider__slide !max-w-[250px] !min-w-[200px]  select-none px-6 py-2 border-2 border-solid border-[#3dbda7] text-white"
        >
          <div className="!max-w-[150px] text-base text-center !min-w-[100px] truncate">
            # League of legends
          </div>
        </div>
      ))}
    </div>
  );
}
