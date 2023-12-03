"use client";

import { useCoachProfile } from "@/hooks/useCoachDetail";
import { useKeenSlider } from "keen-slider/react";
import ViewLarge from "../viewLarge";

const GalleryView = () => {
  const { data } = useCoachProfile();

  const [ref] = useKeenSlider<HTMLDivElement>({
    mode: "free",
    slides: {
      perView: "auto",
      spacing: 30,
    },
  });

  if (!data.preview_images?.length) return null;

  return (
    <div className="h-full max-w-full w-fit pb-8 justify-between">
      <div className="super text-2xl font-bold mb-10 mt-4">Coach Gallery</div>
      <div ref={ref} className="keen-slider w-full min-h-[300px] mt-0 pt-0">
        {data.preview_images?.map((image, index) => (
          <ViewLarge
            key={index}
            alt="image"
            classNameParents="!w-[450px] !max-w-[450px] !min-w-[450px] keen-slider__slide"
            className="object-center !w-[450px] !max-w-[450px] !min-w-[450px] center  object-cover h-[300px] rounded-xl"
            src={image}
          ></ViewLarge>
        ))}
      </div>
    </div>
  );
};

export default GalleryView;
