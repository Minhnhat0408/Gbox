"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { navigation } from "@/constants/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsImages, BsPlusCircleFill } from "react-icons/bs";
import { RiSwordFill } from "react-icons/ri";
import { BiMenu } from "react-icons/bi";
import useUpdateGameModal from "@/hooks/useUpdateGameModal";
import { IoLogoGameControllerB } from "react-icons/io";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { usePostFormModal } from "@/hooks/usePostFormModal";
export default function SideBarLeft() {
  const [expand, setExpand] = useState(false);
  const [openTools, setOpenTools] = useState(false);

  const pathname = usePathname();

  const { onOpen } = useUpdateGameModal();

  const { onOpen: openPostForm, setIsEventPost } = usePostFormModal();

  return (
    <aside className={cn("fixed  left-4 fade-in h-full py-6 z-50  ")}>
      {expand && (
        <div
          className={cn(
            "fixed  w-screen top-0 left-0 h-screen bg-black/60 z-20 "
          )}
          onClick={() => setExpand(false)}
        ></div>
      )}

      <div
        className={cn(
          "h-full bg-muted z-50 rounded-3xl flex relative xl:py-6 py-3  xl:px-4 px-2  "
        )}
      >
        <div className="flex flex-col items-center h-full">
          <div
            className="w-16 2xl:text-[46px] text-4xl flex justify-center  2xl:py-2   cursor-pointer"
            onClick={() => setExpand(!expand)}
          >
            <BiMenu />
          </div>

          <nav
            className={cn(
              "flex flex-col   justify-center 2xl:mt-20  mt-8 2xl:gap-y-6 gap-y-4"
            )}
          >
            {navigation.map((item, ind) => {
              const isAtLocation =
                item.href !== "/"
                  ? pathname.includes(item.href)
                  : item.href === pathname;

              return (
                <Link
                  key={ind}
                  href={item.href}
                  className={cn(
                    " 2xl:text-4xl text-3xl flex justify-between items-center group  "
                  )}
                >
                  <div
                    className={cn(
                      " rounded-full p-2 duration-500 group-hover:text-primary  ",
                      isAtLocation &&
                        " shine scale-125 bg-primary group-hover:text-white  "
                    )}
                  >
                    <item.icon />
                  </div>
                </Link>
              );
            })}
          </nav>
          <ul
            className={cn(
              "flex-col flex h-full justify-end  pt-6 pb-4 gap-y-3 duration-500"
            )}
          >
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <li
                    className={cn(
                      "2xl:text-3xl hover:bg-primary/70 cursor-pointer  text-xl duration-500 xl:p-2 p-1 bg-primary opacity-0 translate-y-20 delay-200 text-muted rounded-full ",
                      openTools && "translate-y-0 opacity-100"
                    )}
                  >
                    <RiSwordFill />
                  </li>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Find teammate</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <li
                    className={cn(
                      "2xl:text-3xl hover:bg-primary/70 cursor-pointer  text-xl duration-500 xl:p-2 p-1 bg-primary opacity-0 translate-y-20 delay-100 text-muted rounded-full ",
                      openTools && "translate-y-0 opacity-100"
                    )}
                    onClick={() => {
                      openPostForm();
                      setIsEventPost(false);
                    }}
                  >
                    <BsImages />
                  </li>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Post game review</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <li
                    onClick={() => {
                      onOpen();
                      setExpand(false);
                    }}
                    className={cn(
                      "2xl:text-3xl hover:bg-primary/70 cursor-pointer  text-xl duration-500 xl:p-2 p-1 bg-primary opacity-0 translate-y-20 text-muted rounded-full ",
                      openTools && "translate-y-0 opacity-100"
                    )}
                  >
                    <IoLogoGameControllerB />
                  </li>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Update game library</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ul>
          <button
            className="2xl:text-5xl text-4xl z-10 hover:bg-primary/20 p-2 mt-auto duration-500 rounded-lg border-[1px] cursor-pointer border-dotted border-primary text-primary "
            onClick={() => setOpenTools(!openTools)}
          >
            <BsPlusCircleFill />
          </button>
        </div>
        <div
          className={cn(
            "flex flex-col items-end h-full duration-500 w-0 overflow-hidden ",
            expand && "xl:w-32 w-28 pr-4"
          )}
        >
          <h1
            className={cn(
              "super 2xl:text-[40px] text-3xl font-bold 2xl:mt-3 2xl:mb-[14px] duration-500 opacity-0",
              expand && " opacity-100  "
            )}
          >
            Gbox
          </h1>
          <nav
            className={cn(
              "flex flex-col justify-center 2xl:mt-20 mt-8 2xl:gap-y-6 gap-y-4"
            )}
          >
            {navigation.map((item, ind) => (
              <Link
                key={ind}
                href={item.href}
                className={cn(
                  " text-4xl 2xl:h-[52px] hover:text-primary h-[46px] flex justify-end items-center group  "
                )}
                onClick={() => setExpand(false)}
              >
                <h3
                  className={cn(
                    "2xl:text-xl text-lg  duration-500   opacity-0 ",
                    pathname === item.href && "  scale-125 font-bold ",
                    expand && " opacity-100 "
                  )}
                >
                  {item.label}
                </h3>
              </Link>
            ))}
          </nav>
          <ul
            className={cn(
              "flex-col flex flex-1 justify-end pb-4 pt-6 gap-y-3 duration-500"
            )}
          >
            <li
              className={cn(
                " text-muted-foreground cursor-pointer  duration-500 2xl:h-[46px] xl:h-[36px] h-[28px] flex items-center justify-end  opacity-0 translate-y-20 delay-200   ",
                openTools && "translate-y-0 opacity-100"
              )}
            >
              Matching
            </li>
            <li
              className={cn(
                " text-muted-foreground cursor-pointer  duration-500 2xl:h-[46px] xl:h-[36px] h-[28px] flex items-center justify-end  opacity-0 translate-y-20 delay-100   ",
                openTools && "translate-y-0 opacity-100"
              )}
            >
              Posting
            </li>
            <li
              className={cn(
                " text-muted-foreground cursor-pointer  duration-500 2xl:h-[46px] xl:h-[36px] h-[28px] flex items-center justify-end  opacity-0 translate-y-20   ",
                openTools && "translate-y-0 opacity-100"
              )}
            >
              Gaming
            </li>
          </ul>

          <h3
            className={cn(
              "2xl:text-xl text-lg z-10  duration-500  cursor-pointer  opacity-0 2xl:h-[66px] h-[53px] flex items-center text-right mt-auto ",

              expand && " opacity-100 "
            )}
            onClick={() => setOpenTools(!openTools)}
          >
            Tools
          </h3>
        </div>
      </div>
    </aside>
  );
}
