"use client";

import { FaFacebookSquare } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useCoachProfile } from "@/hooks/useCoachDetail";
import Image from "next/image";
import Link from "next/link";
import { FaYoutubeSquare } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";
import { convertSocialLinkToView } from "@/lib/convertSocialLinkToView";
import { Fragment } from "react";

// const social_links: {
//   discord: string;
//   youtube: string;
//   facebook: string;
// };

const CoachSocialLink = () => {
  const { data } = useCoachProfile();

  if (!data) return null;

  // count how many social links are available
  const availableSocialLinks = Object.values(data.social_links || []).filter(
    (link) => link !== ""
  ).length;

  if (availableSocialLinks === 0) {
    return (
      <div className="w-full h-full flex gap-x-7">
        <div className="h-full flex-1 relative rounded-xl border-[6px] border-primary overflow-hidden">
          <Image
            src="/images/logo.png"
            alt="discord"
            width={0}
            height={0}
            className="w-[70px] h-auto top-2 right-3 absolute z-10"
            sizes="100vw"
          />
          <div
            className="absolute w-full h-full blur-sm bg-cover bg-center z-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.profiles.avatar})`,
            }}
          ></div>
          <div className="relative center z-50 w-full h-full">
            <div className="center">
              <div className="flex gap-y-6 flex-col items-center">
                <div className="font-bold text-4xl tracking-wide text-shadow-green">
                  SEE MY{" "}
                </div>
                <div className="font-bold text-4xl tracking-wide text-shadow-green">
                  PROFILE
                </div>
                <div className="font-bold text-4xl tracking-wide text-shadow-green">
                  ON{" "}
                  <Link
                    href={"/user/" + data.profiles.name}
                    target="_blank"
                    className="super inline-block border-b-4 border-transparent w-fit hover:border-teal-500 transition-all duration-300"
                  >
                    GBOX
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full relative bg-background flex-1 rounded-xl border-[6px] border-primary">
          <MdAlternateEmail className="w-[70px] text-primary h-auto top-2 right-3 absolute z-10" />
          <div className="relative center z-50 w-full h-full">
            <div className="center">
              <div className="flex gap-y-6 flex-col items-center">
                <div className="font-bold text-4xl tracking-wide text-shadow-green">
                  EMAIL ME
                </div>
                <div className="font-bold text-4xl tracking-wide text-shadow-green super ">
                  <Link
                    href={"mailto:" + data.contact_email}
                    target="_blank"
                    className="super inline-block border-b-4 border-transparent w-fit hover:border-teal-500 transition-all duration-300"
                  >
                    HERE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (availableSocialLinks === 1 || availableSocialLinks === 2) {
    return (
      <div className="w-full h-full flex gap-x-5">
        <div className="h-full flex-1 relative border-[6px] border-primary rounded-xl">
          <Image
            src="/images/logo.png"
            alt="discord"
            width={0}
            height={0}
            className="w-[70px] h-auto top-2 right-3 absolute z-10"
            sizes="100vw"
          />
          <div
            className="absolute w-full h-full blur-sm bg-cover bg-center z-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.profiles.avatar})`,
            }}
          ></div>
          <div className="relative center z-50 w-full h-full">
            <div className="center">
              <div className="flex gap-y-5 flex-col items-center">
                <div className="font-bold text-3xl tracking-wide text-shadow-green">
                  SEE MY{" "}
                </div>
                <div className="font-bold text-3xl tracking-wide text-shadow-green">
                  PROFILE
                </div>
                <div className="font-bold text-3xl tracking-wide text-shadow-green">
                  ON{" "}
                  <Link
                    href={"/user/" + data.profiles.name || ""}
                    target="_blank"
                    className="super inline-block border-b-4 border-transparent w-fit hover:border-teal-500 transition-all duration-300"
                  >
                    GBOX
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full gap-y-5 flex flex-col flex-1 rounded-xl">
          <div className="relative group center hover:border-green-400 cursor-pointer transition-all duration-100 rounded-xl bg-background h-1/2 border-primary border-4">
            <MdAlternateEmail className="w-[40px] group-hover:text-green-400 text-primary h-auto top-2 right-2 absolute z-10" />
            <Link
              target="_blank"
              href={"mailto:" + data.contact_email || ""}
              className="font-bold inline-block  text-primary group-hover:text-green-400 text-2xl border-b-4 border-transparent hover:border-green-400 transition-all duration-300"
            >
              EMAIL
            </Link>
          </div>
          {Object.keys(data.social_links).map((_e, index) => (
            <Fragment key={index}>
              {convertSocialLinkToView(
                Object.keys(data.social_links)[index],
                Object.values(data.social_links)[index]
              )}
            </Fragment>
          ))}
        </div>
      </div>
    );
  }

  if (availableSocialLinks === 3) {
    return (
      <div className="w-full h-full flex gap-x-5">
        <div className="h-full flex-[2] relative border-[6px] border-primary rounded-xl">
          <Image
            src="/images/logo.png"
            alt="discord"
            width={0}
            height={0}
            className="w-[70px] h-auto top-2 right-3 absolute z-10"
            sizes="100vw"
          />
          <div
            className="absolute w-full h-full blur-sm bg-cover bg-center z-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.profiles.avatar})`,
            }}
          ></div>
          <div className="relative center z-50 w-full h-full">
            <div className="center">
              <div className="flex gap-y-5 flex-col items-center">
                <div className="font-bold text-3xl tracking-wide text-shadow-green">
                  SEE MY{" "}
                </div>
                <div className="font-bold text-3xl tracking-wide text-shadow-green">
                  PROFILE
                </div>
                <div className="font-bold text-3xl tracking-wide text-shadow-green">
                  ON{" "}
                  <Link
                    href={"/user/" + data.profiles.name}
                    target="_blank"
                    className="super inline-block border-b-4 border-transparent w-fit hover:border-teal-500 transition-all duration-300"
                  >
                    GBOX
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full gap-y-5 flex flex-col flex-[1.5] rounded-xl">
          <div className="relative group center hover:border-green-400 cursor-pointer transition-all duration-100 rounded-tl-xl rounded-br-xl bg-background rounded-bl-sm h-1/2 border-primary border-t-4 border-l-4">
            <MdAlternateEmail className="w-[40px] group-hover:text-green-400 text-primary h-auto top-2 left-2 absolute z-10" />
            <Link
              target="_blank"
              href={"mailto:" + data.contact_email}
              className="font-bold inline-block  text-primary group-hover:text-green-400 text-2xl border-b-4 border-transparent hover:border-green-400 transition-all duration-300"
            >
              EMAIL
            </Link>
          </div>
          <div className="rounded-bl-xl center group hover:border-indigo-400 transition-all duration-100 cursor-pointer relative rounded-tl-sm rounded-tr-xl bg-background h-1/2 border-l-4 border-primary border-b-4">
            <IoLogoDiscord className="w-[40px] text-primary h-auto top-2 group-hover:text-indigo-400 left-2 absolute z-10" />
            <Link
              target="_blank"
              href={data.social_links.discord}
              className="font-bold inline-block  text-primary group-hover:text-indigo-400 text-2xl border-b-4 border-transparent hover:border-indigo-400 transition-all duration-300"
            >
              DISCORD
            </Link>
          </div>
        </div>
        <div className="h-full  gap-y-5 flex flex-col flex-[1.5] rounded-xl">
          <div className="border-primary cursor-pointer center group hover:border-red-400 transition-all duration-100 relative rounded-br-sm border-t-4 border-r-4 rounded-tr-xl rounded-bl-xl bg-background h-1/2">
            <FaYoutubeSquare className="w-[40px] group-hover:text-red-400 text-primary h-auto top-2 right-2 absolute z-10" />
            <Link
              target="_blank"
              href={data.social_links.youtube}
              className="font-bold inline-block  text-primary group-hover:text-red-400 text-2xl border-b-4 border-transparent hover:border-red-400 transition-all duration-300"
            >
              YOUTUBE
            </Link>
          </div>
          <div className="border-primary cursor-pointer center group hover:border-blue-500 transition-all duration-100 border-b-4 relative rounded-tr-sm border-r-4 rounded-br-xl rounded-tl-xl bg-background h-1/2">
            <FaFacebookSquare className="w-[40px] group-hover:text-blue-500 text-primary h-auto top-2 right-2 absolute z-10" />
            <Link
              target="_blank"
              href={data.social_links.facebook}
              className="font-bold inline-block  text-primary group-hover:text-blue-500 text-2xl border-b-4 border-transparent hover:border-blue-500 transition-all duration-300"
            >
              FACEBOOK
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default CoachSocialLink;
