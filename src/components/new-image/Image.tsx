import Image from "next/image";

const ImageNew = ({ src, className }: { src: string; className: string }) => {
  return (
    <Image
      src={src}
      alt="image"
      width={0}
      height={0}
      sizes="100vw"
      className={className}
    />
  );
};

export default ImageNew;
