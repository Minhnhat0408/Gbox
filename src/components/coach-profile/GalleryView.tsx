"use client";

import { useCoachProfile } from "@/hooks/useCoachDetail";
import { useKeenSlider } from "keen-slider/react";
import ViewLarge from "../viewLarge";
import Image from "next/image";

const GalleryView = () => {
  const { data } = useCoachProfile();

  const [ref] = useKeenSlider<HTMLDivElement>({
    mode: "free",
    loop: true,
    slides: {
      perView: "auto",
      spacing: 30,
    },
  });

  if (!data.preview_images?.length) return null;

  return (
    <div className="h-full max-w-full  pb-8 justify-between">
      <div className="super text-2xl font-bold mb-10 mt-4">Coach Gallery</div>
      <div ref={ref} className="keen-slider w-full">
        {data.preview_images?.map((image, index) => (
          <ViewLarge
            key={index}
            alt="image"
            classNameParents="!w-[450px] !max-w-[450px] overflow-hidden max-h-[300px] !min-w-[450px] h-[300px] keen-slider__slide"
            className="object-center object-cover center w-[450px] max-w-[450px] h-full rounded-xl"
            src={image}
          ></ViewLarge>
        ))}
      </div>
    </div>
  );
};

export default GalleryView;
