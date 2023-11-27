import { RiHomeLine, RiShoppingBagLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineSchool, MdOutlineGamepad } from "react-icons/md";
import { IconType } from "react-icons";
import { IoGameControllerOutline } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa6";
export type NavigationItem = {
  label: string;
  icon: IconType;
  href: string;
  tooltip: string;
};
export const navigation: NavigationItem[] = [
  {
    label: "Home",
    icon: RiHomeLine,
    href: "/",
    tooltip: "Home",
  },
  {
    label: "Events",
    icon: HiOutlineUserGroup,
    href: "/events",
    tooltip: "Events ",
  },
  {
    label: "Profile",
    icon: FaUserAstronaut,
    href: "/user",
    tooltip: "Profile",
  },
  {
    label: "Library",
    icon: IoGameControllerOutline,
    href: "/library",
    tooltip: "Game Library",
  },
  {
    label: "Coach",
    icon: MdOutlineSchool,
    href: "/coach",
    tooltip: "Coaching Sessions",
  },
];
