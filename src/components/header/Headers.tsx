"use client";
import { FaInfoCircle } from "react-icons/fa";
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
import { ProfilesTypeWithCoach, useUser } from "@/hooks/useUser";
import { ActionTooltip } from "../action-tooltips/ActionToolTips";
import { useSessionContext } from "@supabase/auth-helpers-react";

function Headers() {
  const { scrollY } = useScroll();
  const [changeBg, setChangeBg] = useState(false);
  const [open, setOpen] = useState(true);
  const [userInformation, setUserInformation] =
    useState<ProfilesTypeWithCoach | null>(null);

  const { userDetails, isLoading } = useUser();

  const { supabaseClient } = useSessionContext();

  const [money, setMoney] = useState(userDetails?.gbox_money || 0);

  useEffect(() => {
    if (userDetails?.gbox_money) {
      setMoney(userDetails?.gbox_money);
    }
  }, [userDetails?.gbox_money]);

  useEffect(() => {
    if (userDetails && userDetails?.id && supabaseClient) {
      const channel = supabaseClient
        .channel("realtime_profiles_change_" + userDetails?.id)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "profiles",
            filter: `id=eq.${userDetails?.id}`,
          },
          async (payload) => {
            if (payload.new.id === userDetails?.id) {
              setMoney(payload.new.gbox_money);
            }
          }
        )
        .subscribe();

      return () => {
        supabaseClient.removeChannel(channel);
      };
    }
  }, [userDetails?.id, supabaseClient, userDetails]);

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
        <div className="text-3xl flex items-center font-bold">
          {money} <span className="text-[#3DBDA7] ml-1">G</span>
          <ActionTooltip
            side="bottom"
            className="bg-background py-4 !px-4"
            label={
              <div className="w-[300px] font-normal leading-relaxed">
                ・ This is <span className="super">Gbox</span> money. You can
                use it to buy some coaching sessions and exchange to some badge.
                <div className="mt-1">
                  ・ <span className="super">Gbox</span> money can be earned by
                  complete some quests, include:
                  {/* TODO: gbox money */}
                  <ul className="ml-3 mt-1">
                    <li>
                      <span className="mr-1">・</span>create an account.
                    </li>
                    <li>
                      <span className="mr-1">・</span>add friend.
                    </li>
                    <li>
                      <span className="mr-1">・</span>join an event.
                    </li>
                    <li>
                      <span className="mr-1">・</span>post a game review.
                    </li>
                    <li>
                      <span className="mr-1">・</span>achieve certain game
                      played.
                    </li>
                    <li>
                      <span className="mr-1">・</span>through being a coach.
                    </li>
                  </ul>
                </div>
              </div>
            }
          >
            <div className="group ml-4">
              <FaInfoCircle className="text-2xl group-hover:animate-none text-green-400 animate-pulse" />
            </div>
          </ActionTooltip>
        </div>
        <Notification />
        <ProfileMenu data={userInformation}>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src={userInformation?.avatar || "/avatar.jpg"}
            className="object-cover object-center w-10 h-10 rounded-full"
            alt="avatar"
          ></Image>
        </ProfileMenu>
      </div>
    </motion.header>
  );
}

export default Headers;
