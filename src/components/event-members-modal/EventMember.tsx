import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEventMemberModal } from "@/hooks/useEventMemberModal";
import { toast } from "sonner";
import { useEventDetail } from "@/hooks/useEventDetail";
import { useUser } from "@/hooks/useUser";

dayjs.extend(relativeTime);

type EventMemberProps = {
  avatar: string | null;
  name: string | null;
  joined_date?: string;
  index: number;
  id: string;
};

const EventMember = ({
  avatar,
  name,
  joined_date,
  index,
  id,
}: EventMemberProps) => {
  const { supabaseClient } = useSessionContext();

  const { user_id } = useEventDetail();

  const { userDetails } = useUser();

  const { removeMember } = useEventMemberModal();

  const kickUser = async () => {
    toast.promise(
      async () => {
        return await supabaseClient
          .from("event_participations")
          .delete()
          .eq("participation_id", id);
      },
      {
        loading: `Removing ${name} from event... 😊`,
        success: (data) => {
          if (data.error) {
            return data.error.message;
          }
          removeMember(index);
          return `Success remove ${name} from event! 🎉`;
        },
        error: "Error removing user from event",
      }
    );
  };

  return (
    <div className="h-24 transition flex justify-between items-center rounded-xl w-full p-4 ">
      <div className="flex items-center space-x-4 ml-2">
        <Avatar className="w-[50px] h-[50px] mr-3">
          <AvatarImage
            className="object-cover object-center w-auto h-full"
            src={avatar || "/avatar.jpg"}
          />
          <AvatarFallback>{"A"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <Link
            href={`/user/${name}`}
            className="super font-bold text-xl mb-[6px]"
          >
            {name}
          </Link>
          {joined_date ? (
            <p className="text-sm text-gray-300">
              Joined {dayjs(joined_date).fromNow()}
            </p>
          ) : (
            <p className="text-sm text-gray-300">Owner</p>
          )}
        </div>
      </div>
      {joined_date && user_id === userDetails?.id && (
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="h-full">
              <BsThreeDots className="text-xl text-white" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={kickUser}>Kick this user</MenubarItem>
              <MenubarItem>See more information</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )}
    </div>
  );
};

export default EventMember;
