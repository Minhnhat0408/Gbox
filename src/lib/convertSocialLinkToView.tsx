import { FaFacebookSquare } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useCoachProfile } from "@/hooks/useCoachDetail";
import Image from "next/image";
import Link from "next/link";
import { FaYoutubeSquare } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";
import { ReactNode } from "react";

export function convertSocialLinkToView(
  social: string,
  link: string
): ReactNode {
  if (social === "discord") {
    return (
      <div className="center group hover:border-indigo-400 transition-all duration-100 cursor-pointer relative  bg-background h-1/2 border-primary rounded-xl border-4">
        <IoLogoDiscord className="w-[40px] text-primary h-auto top-2 group-hover:text-indigo-400 right-2 absolute z-10" />
        <Link
          target="_blank"
          href={link || ""}
          className="font-bold inline-block  text-primary group-hover:text-indigo-400 text-2xl border-b-4 border-transparent hover:border-indigo-400 transition-all duration-300"
        >
          DISCORD
        </Link>
      </div>
    );
  }
  if (social === "facebook") {
    return (
      <div className="cursor-pointer center group hover:border-blue-500 transition-all duration-100 border-4 border-primary relative rounded-xl bg-background h-1/2">
        <FaFacebookSquare className="w-[40px] group-hover:text-blue-500 text-primary h-auto top-2 right-2 absolute z-10" />
        <Link
          target="_blank"
          href={link || ""}
          className="font-bold inline-block  text-primary group-hover:text-blue-500 text-2xl border-b-4 border-transparent hover:border-blue-500 transition-all duration-300"
        >
          FACEBOOK
        </Link>
      </div>
    );
  }

  if (social === "youtube") {
    return (
      <div className="border-primary cursor-pointer center group hover:border-red-400 transition-all duration-100 relative rounded-xl border-4 bg-background h-1/2">
        <FaYoutubeSquare className="w-[40px] group-hover:text-red-400 text-primary h-auto top-2 right-2 absolute z-10" />
        <Link
          target="_blank"
          href={link || ""}
          className="font-bold inline-block  text-primary group-hover:text-red-400 text-2xl border-b-4 border-transparent hover:border-red-400 transition-all duration-300"
        >
          YOUTUBE
        </Link>
      </div>
    );
  }
}
