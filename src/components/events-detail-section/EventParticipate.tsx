import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BiSolidMessageDetail } from "react-icons/bi";
import { useEventDetail } from "@/hooks/useEventDetail";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { useEventMemberModal } from "@/hooks/useEventMemberModal";
import EventMemberModal from "../event-members-modal/EventMembersModal";
import { useEffect } from "react";

const EventParticipate = () => {
  const {
    event_participations,
    isPariticpated,
    profiles: event_owner,
    total_people,
  } = useEventDetail();

  const { userDetails } = useUser();

  const { onOpen, setMembers, members } = useEventMemberModal();

  const seeAllMembers = () => {
    if (!isPariticpated && userDetails?.id !== event_owner.id) {
      return toast.error("You must join this event to see member lists 😢");
    }
    onOpen();
  };

  useEffect(() => {
    setMembers(event_participations);
  }, []);

  return (
    <>
      <EventMemberModal />
      <div className="w-full card-container rounded-2xl py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl text-white tracking-wider">
            Participants
          </h1>
          <h3
            onClick={seeAllMembers}
            className="text-base cursor-pointer hover:underline text-teal-400"
          >
            See all members
          </h3>
        </div>
        <div className="flex w-full pt-7 pb-4 border-b border-solid border-[rgba(138,147,153,0.6)]">
          <div className="w-1/2 flex flex-col items-center space-y-2">
            <h1 className="text-xl font-bold">{members.length + 1}</h1>
            <p className="text-xs">Members</p>
          </div>
          <div className="w-1/2 flex flex-col items-center space-y-2">
            <h1 className="text-xl font-bold">
              {total_people === "no-limit" ? "Unlimited" : total_people}
            </h1>
            <p className="text-xs">Total members</p>
          </div>
        </div>
        <div className="mt-4">
          <Link
            href={`/user/${event_owner.name}`}
            className="flex items-center justify-between rounded-lg py-3 px-2 cursor-pointer hover:bg-black/10"
          >
            <div className="flex items-center">
              <Avatar className="w-[40px] h-[40px] mr-4">
                <AvatarImage
                  className="object-cover object-center w-auto h-full"
                  src={event_owner.avatar || "/avatar.jpg"}
                />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <p>{event_owner.name}</p>
            </div>
            <BiSolidMessageDetail className="text-3xl text-teal-400 mr-1" />
          </Link>
          {[...members].slice(0, 2).map((e, index) => (
            <Link
              key={index}
              href={`/user/${e.profiles.name}`}
              className="flex items-center justify-between rounded-lg py-3 px-2 cursor-pointer hover:bg-black/10"
            >
              <div className="flex items-center">
                <Avatar className="w-[40px] h-[40px] mr-4">
                  <AvatarImage
                    className="object-cover object-center w-auto h-full"
                    src={e.profiles.avatar || "/avatar.jpg"}
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <p>{e.profiles.name}</p>
              </div>
              <BiSolidMessageDetail className="text-3xl text-teal-400 mr-1" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventParticipate;
