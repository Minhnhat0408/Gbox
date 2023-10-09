'use client'

import { cn } from "@/lib/utils";
import Image from "next/image";

export default function NewsItem({title,src,className} : {title:string,src:string,className?:string}) {
    return (
        <article className={cn("w-40 h-40 bg-primary rounded-3xl group relative overflow-hidden",className)}>
            {/* <div className="absolute h-full w-full top-0 left-0 border-2 border-primary "></div> */}
            <Image src={src} alt="logo" width={0} height={0} sizes="100vw" className="h-full w-auto group-hover:scale-110 duration-500 object-cover cursor-pointer" />
            <p className=" absolute bottom-0 w-full px-4 py-3 leading-5 group-hover:underline duration-500 cursor-pointer ">{title}</p>
        </article>
  );
}