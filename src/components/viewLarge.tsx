"use client";

import { useFullscreenModal } from "@/hooks/useFullscreenModal";
import Image from "next/image";
export default function ViewLarge({
  src,
  alt,
  className,
  classNameParents
}: {
  src: string;
  alt: string;
  className?: string;
  classNameParents?: string
}) {
  const { onOpen, setSrc } = useFullscreenModal();

  const handleClickInside = () => {
    setSrc(src);
    onOpen();
  };

  return (
    <div
      onClick={handleClickInside}
      className= {classNameParents}
    >
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        className={className}
      />
    </div>
  );
}
