"use client";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { Check, Pen, X } from "lucide-react";
import {
  GrStatusGood,
  GrStatusCritical,
  GrStatusDisabled,
} from "react-icons/gr";
import {
  RiHexagonFill,
  RiIndeterminateCircleLine,
  RiRadioButtonLine,
} from "react-icons/ri";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useSupabase } from "@/hooks/useSupabaseClient";
import { UserStatus } from "@/types/supabaseTableType";
import { toast } from "sonner";
export default function UserStatusDisplay({
  user_name,
  status_message,
}: {
  user_name: string;
  status_message: string | null;
}) {
  const { userDetails, usersStatus } = useUser();
  const [edit, setEdit] = useState(false);
  const supabase = useSupabase();
  const [currrentStatus, setCurrentStatus] = useState<UserStatus>("offline");
  const [messageValue, setMessageValue] = useState<string | null>(
    status_message
  );
  useEffect(() => {
    if (usersStatus) {
      const userStatus = usersStatus.find(
        (user) => user.username === user_name
      );
      if (userStatus) {
        setCurrentStatus("online");
      } else {
        setCurrentStatus("offline");
      }
    }
  }, [usersStatus]);
  // const handleSwitchStatus = async () => {
  //   if (userDetails?.id === id) {
  //     if (currrentStatus === "online") {
  //       await supabase.from("profiles").update({ status: "away" }).eq("id", id);
  //       setCurrentStatus("away");
  //     } else {
  //       await supabase
  //         .from("profiles")
  //         .update({ status: "online" })
  //         .eq("id", id);
  //       setCurrentStatus("online");
  //     }
  //   } else {
  //     toast.error("You can only edit your own status message");
  //     return;
  //   }
  // };

  const handleUpdateMessage = async () => {
    if (messageValue === null || messageValue === "") {
      toast.error("Status message cannot be empty");
      return;
    }
    if (userDetails?.name !== user_name) {
      toast.error("You can only edit your own status message");
      return;
    }
    if (messageValue.length > 40) {
      toast.error("Status message cannot be more than 40 characters");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ status_message: messageValue })
      .eq("name", user_name);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Status message updated");
    setEdit(false);
  };

  return (
    <div
      className={cn(
        "flex flex-end gap-x-2 items-center border-2 w-fit px-3 rounded-full group relative ",
        currrentStatus === "online" && "text-green-400 border-green-400",
        currrentStatus === "offline" &&
          "text-muted-foreground border-muted-foreground",
        currrentStatus === "away" && "text-red-400  border-red-400",
        userDetails?.name === user_name && "cursor-pointer "
      )}
    >
      <div className="text-base">
        <StatusIcon status={currrentStatus} />
      </div>

      {edit ? (
        <>
          <Input
            maxLength={40}
            value={messageValue || ""}
            onChange={(e) => {
              setMessageValue(e.target.value);
            }}
            className=" bg-transparent focus-visible:ring-0 focus-visible:ring-transparent p-0 text-base h-fit focus-visible:ring-offset-0 border-0  "
          />
          <Check
            onClick={handleUpdateMessage}
            className="absolute w-4 h-4 -right-6 cursor-pointer top-1/2 -translate-y-1/2"
          />
          <X
            onClick={() => {
              setEdit(false);
            }}
            className="absolute w-4 h-4 -right-12 cursor-pointer top-1/2 -translate-y-1/2"
          />
        </>
      ) : (
        <StatusMessage status_message={messageValue} status={currrentStatus} />
      )}
      {userDetails?.name === user_name && !edit && (
        <Pen
          onClick={() => {
            setEdit(true);
          }}
          className="group-hover:opacity-100 opacity-0 absolute w-4 h-4 -right-6 cursor-pointer top-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "online":
      return <RiRadioButtonLine />;
    case "offline":
      return <RiIndeterminateCircleLine />;
    default:
      return <RiIndeterminateCircleLine />;
  }
}

export function StatusMessage({
  status_message,
  status,
}: {
  status_message: string | null;
  status: string;
}) {
  if (status_message) {
    switch (status) {
      case "online":
        return <span className="text-green-400">{status_message}</span>;
      case "offline":
        return <span className="text-muted-foreground ">{status_message}</span>;
      default:
        return <span className="text-muted-foreground ">{status_message}</span>;
    }
  } else {
    switch (status) {
      case "online":
        return <span className="text-green-400">Online Gbox&apos;s gamer</span>;
      case "offline":
        return (
          <span className="text-muted-foreground ">
            Offline Gbox&apos;s gamer
          </span>
        );
      case "away":
        return <span>Busied Gbox&apos;s gamer</span>;
      default:
        return (
          <span className="text-muted-foreground ">
            Offline Gbox&apos;s gamer
          </span>
        );
    }
  }
}
