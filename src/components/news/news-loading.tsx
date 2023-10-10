"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export default function NewsLoading({ first }: { first?: boolean }) {
  return (
    <div className=" relative 2xl:w-56 2xl:h-56 xl:h-48 xl:w-48 w-40 animate-pulse h-40">
      <article
        className={cn(
          " 2xl:w-56 2xl:h-56 xl:h-48 xl:w-48 w-40 h-40 bg-primary duration-500 delay-200 z-[10] rotate-0 rounded-3xl group relative overflow-hidden  ",
          first && "-rotate-6"
        )}
      >
        <Image
          src={"/images/login-bg.png"}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className={cn(
            "h-full rounded-3xl  w-auto  duration-500 object-cover cursor-pointer"
          )}
        />

        <div className="absolute top-0 left-0 w-full delay-0 duration-0 backdrop-blur-sm rounded-3xl h-full bg-black/50"></div>
      </article>

      <div
        className={cn(
          "absolute h-full w-full top-0 -left-4 border-2 rounded-3xl rotate-0 duration-500 delay-200 opacity-0  border-primary ",
          first && " opacity-100 -rotate-12 "
        )}
      ></div>
    </div>
  );
}
