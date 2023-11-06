/* eslint-disable @next/next/no-img-element */
"use client";
import { ProfilesType } from "@/types/supabaseTableType";
import Notification from "./Notification";
import ProfileMenu from "./ProfileMenu";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Search from "../search/Search";
import { useUser } from "@/hooks/useUser";

function Headers() {
  const { scrollY } = useScroll();
  const [changeBg, setChangeBg] = useState(false);
  const [open, setOpen] = useState(true);
  const [userInformation, setUserInformation] = useState<ProfilesType | null>(
    null
  );

  const { userDetails, isLoading } = useUser();

  useEffect(() => {
    if (isLoading || !userDetails) return;

    setUserInformation(userDetails);
  }, [userDetails, isLoading]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 50) {
      setOpen(false);
      setChangeBg(true);
    } else {
      setOpen(true);
    }
    if (latest <= 0) {
      setChangeBg(false);
    }
  });
  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-110%", opacity: 0 },
      }}
      animate={!open ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={cn(
        "z-[30] fixed left-32 right-32 py-3 flex items-center justify-between bg-transparent px-10  rounded-3xl ",
        changeBg && "bg-form"
      )}
    >
      <div className=" flex items-center justify-center">
        <Link
          href="/"
          onClick={() => {
            if (window.location.href == window.location.origin + "/")
              window.scrollTo({ top: 0 });
          }}
        >
          <Image
            src="/images/logo.png"
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            className=" w-12 h-12"
          />
        </Link>
        <Search />
      </div>
      <div className="gap-x-4 flex items-center">
        <div className="text-3xl font-bold">
          3000 <span className="text-[#3DBDA7]">G</span>
        </div>
        <Notification />
        <ProfileMenu data={userInformation}>
          <img
            src={userInformation?.avatar || "avatar.jpg"}
            className="object-cover object-center w-10 h-10 rounded-full"
            alt="avatar"
          ></img>
        </ProfileMenu>
      </div>
    </motion.header>
  );
}

export default Headers;
