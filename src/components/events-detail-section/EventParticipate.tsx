import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BiSolidMessageDetail } from "react-icons/bi";

const EventParticipate = () => {
  return (
    <div className="w-full card-container rounded-2xl py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl text-white tracking-wider">
          Participants
        </h1>
        <h3 className="text-base cursor-pointer hover:underline text-teal-400">
          See all members
        </h3>
      </div>
      <div className="flex w-full pt-7 pb-4 border-b border-solid border-[rgba(138,147,153,0.6)]">
        <div className="w-1/2 flex flex-col items-center space-y-2">
          <h1 className="text-xl font-bold">8</h1>
          <p className="text-xs">Members</p>
        </div>
        <div className="w-1/2 flex flex-col items-center space-y-2">
          <h1 className="text-xl font-bold">10</h1>
          <p className="text-xs">Total members</p>
        </div>
      </div>
      <div className="mt-4">
        <Link
          href="/user/thanhdung0207"
          className="flex items-center justify-between rounded-lg py-3 px-2 cursor-pointer hover:bg-black/10"
        >
          <div className="flex items-center">
            <Avatar className="w-[40px] h-[40px] mr-4">
              <AvatarImage
                className="object-cover object-center w-auto h-full"
                src={"/avatar.jpg"}
              />
              <AvatarFallback>{"X"}</AvatarFallback>
            </Avatar>
            <p>thanhdung0207</p>
          </div>
          <BiSolidMessageDetail className="text-3xl text-teal-400 mr-1" />
        </Link>
        <Link
          href="/user/thanhdung0207"
          className="flex items-center justify-between rounded-lg py-3 px-2 cursor-pointer hover:bg-black/10"
        >
          <div className="flex items-center">
            <Avatar className="w-[40px] h-[40px] mr-4">
              <AvatarImage
                className="object-cover object-center w-auto h-full"
                src={"/avatar.jpg"}
              />
              <AvatarFallback>{"X"}</AvatarFallback>
            </Avatar>
            <p>thanhdung0207</p>
          </div>
          <BiSolidMessageDetail className="text-3xl text-teal-400 mr-1" />
        </Link>
        <Link
          href="/user/thanhdung0207"
          className="flex items-center justify-between rounded-lg py-3 px-2 cursor-pointer hover:bg-black/10"
        >
          <div className="flex items-center">
            <Avatar className="w-[40px] h-[40px] mr-4">
              <AvatarImage
                className="object-cover object-center w-auto h-full"
                src={"/avatar.jpg"}
              />
              <AvatarFallback>{"X"}</AvatarFallback>
            </Avatar>
            <p>thanhdung0207</p>
          </div>
          <BiSolidMessageDetail className="text-3xl text-teal-400 mr-1" />
        </Link>
      </div>
    </div>
  );
};

export default EventParticipate;
