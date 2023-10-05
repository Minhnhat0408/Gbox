"use client";
import { navigation } from "@/constants/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col pl-5 pr-8 justify-center mt-20 gap-y-8">
      {navigation.map((item, ind) => (
        <Link
          key={ind}
          href={item.href}
          className={cn(" text-4xl flex justify-between items-center group  ")}
        >
          <div
            className={cn(
              " rounded-full p-2 duration-500 group-hover:text-primary",
              pathname.includes(item.href) && " shine scale-125 bg-primary "
            )}
          >
            <item.icon />
          </div>
          <h3
            className={cn(
              "text-xl  duration-500 group-hover:text-primary",
              pathname.includes(item.href) && " scale-125 font-bold"
            )}
          >
            {item.label}
          </h3>
        </Link>
      ))}
    </nav>
  );
}
