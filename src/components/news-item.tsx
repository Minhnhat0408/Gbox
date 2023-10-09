"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function NewsItem({
  title,
  src,
  first,
  last,
  href,
  className,
}: {
  title: string;
  src: string;
  className?: string;
  href: string | '';
  first?: boolean;
  last?: boolean;
}) {
  return (
    <Link href={href} className=" relative w-52 h-52">
      <article
        className={cn(
          " w-52 h-52 bg-primary duration-500 delay-200 z-[10] rotate-0 rounded-3xl group relative overflow-hidden  ",
          first && "-rotate-6"
        )}
      >
        <Image
          src={src}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className={cn("h-full rounded-3xl  w-auto  duration-500 object-cover cursor-pointer",!last && "group-hover:scale-110")}
        />
        <p className=" absolute bottom-0 w-full px-4 py-3 leading-5 group-hover:underline duration-500 cursor-pointer ">
          {title}
        </p>
        {last && <div className="absolute top-0 left-0 w-full delay-0 duration-0 backdrop-blur-sm rounded-3xl h-full bg-black/50"></div>}

      </article>
      
        <div className={cn("absolute h-full w-full top-0 -left-4 border-2 rounded-3xl rotate-0 duration-500 delay-200 opacity-0  border-primary ",first && " opacity-100 -rotate-12 ")}></div>
      
    </Link>
  );
}
