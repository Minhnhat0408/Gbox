import { RiHomeLine, RiShoppingBagLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineSchool, MdOutlineGamepad } from "react-icons/md";
import { IconType } from "react-icons";
export type NavigationItem = {
  label: string;
  icon: IconType;
  href: string;
};
export const navigation: NavigationItem[] = [
  {
    label: "Home",
    icon: RiHomeLine,
    href: "/",
  },
  {
    label: "Events",
    icon: HiOutlineUserGroup,
    href: "/events",
  },
  {
    label: "Coach",
    icon: MdOutlineSchool,
    href: "/coach",
  },
  {
    label: "Shop",
    icon: RiShoppingBagLine,
    href: "/shop",
  },
  {
    label: "Gaming",
    icon: MdOutlineGamepad,
    href: "/gaming",
  },
  // {
  //   label: 'CONTACT',
  //   // icon: Settings,
  //   href: '/contact',
  //   tag: "contact",
  // },
];
