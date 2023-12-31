import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

type NewsItemProps = {
  title: string;
  src: string;
  first?: boolean;
  last?: boolean;
  href: string;
  className?: string;
};
const NewsItem = forwardRef<HTMLAnchorElement, NewsItemProps>(
  ({ title, href, src, first, last }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        target="_blank"
        className=" 2xl:w-56 2xl:h-56 xl:h-48 xl:w-48 relative w-40 h-40"
      >
        <article
          className={cn(
            " 2xl:w-56 2xl:h-56 xl:h-48 xl:w-48 w-40 h-40 bg-muted duration-500 delay-200 z-[10] rotate-0 rounded-3xl group relative overflow-hidden  ",
            first && "-rotate-6"
          )}
        >
          <Image
            src={src || "/placeholder.jpg"}
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            className={cn(
              "h-full rounded-3xl  w-auto  duration-500 object-cover cursor-pointer",
              !last && "group-hover:scale-110"
            )}
          />
          <div className="bg-muted/80 h-fit absolute bottom-0 flex items-center justify-center w-full px-4 py-2">
            <p className="line-clamps-3 2xl:text-base group-hover:underline w-full my-2 text-sm leading-5 duration-500 cursor-pointer">
              {title}
            </p>
          </div>
          {/* {last && (
          <div className="delay-0 duration-0 backdrop-blur-sm rounded-3xl bg-black/50 absolute top-0 left-0 w-full h-full"></div>
        )} */}
        </article>

        <div
          className={cn(
            "absolute h-full w-full top-0 -left-4 border-2 rounded-3xl rotate-0 duration-500 delay-200 opacity-0  border-primary ",
            first && " opacity-100 -rotate-12 "
          )}
        ></div>
      </Link>
    );
  }
);

NewsItem.displayName = "NewsItem";
export default NewsItem;
