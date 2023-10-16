"use client";

import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { ProfilesType } from "@/types/supabaseTableType";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

function ProfileMenu({
  children,
  data,
}: {
  children: React.ReactNode;
  data: ProfilesType | null;
}) {
  const { supabaseClient } = useSessionContext();

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const logout = async () => {
    toast.promise(supabaseClient.auth.signOut(), {
      loading: "Signing out",
      success: () => {
        router.push("/sign-in");
        return "Signed out";
      },
      error: "Error signing out",
    });
  };

  return (
    <Popover open={open}>
      <PopoverTrigger
        onClick={(e) => {
          setOpen(!open);
        }}
      >
        <div className="w-10 h-10 rounded-full cursor-pointer">{children}</div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="bg-muted max-w-[160px] flex flex-col gap-y-2"
      >
        <div className="super font-bold">{data?.name}</div>
        <Separator className="bg-muted-foreground" />
        <p
          onClick={(e: any) => {
            router.push("/");
            router.refresh();
            setOpen(false);
          }}
          className="hover:text-primary cursor-pointer"
        >
          Home
        </p>
        <p
          onClick={(e) => {
            router.push("/user/" + data?.name);
            setOpen(false);
          }}
          className="hover:text-primary cursor-pointer"
        >
          Profile
        </p>
        <div className="cursor-pointer hover:text-primary" onClick={logout}>
          Log out
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ProfileMenu;
