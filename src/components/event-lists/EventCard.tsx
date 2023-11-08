import { IoGameController } from "react-icons/io5";
import { EventReturnType } from "@/types/supabaseTableType";
import Link from "next/link";
import { formatDateString } from "@/lib/formatDateString";
import { BiSolidTime } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { SiRiotgames } from "react-icons/si";
import JoinEventButton from "./JoinEventButton";
import CountDown from "./CountDown";

type EventCardProps = { data: EventReturnType };

const EventCard = ({ data }: EventCardProps) => {
  return (
    <div
      className="h-[400px] py-3 px-5 max-w-[326px] overflow-hidden bg-image transition-all rounded-2xl group shine-2 cursor-pointer relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${data.cover_image})`,
      }}
    >
      <CountDown date={data.start_date} />
      <div className="z-50 group-hover:bg-black/60 bg-transparent transition absolute left-0 right-0 bottom-0 top-0 grid place-items-center">
        <JoinEventButton eventID={data.id} />
      </div>
      <div className="line-clamp-2 z-10 w-full !inline-flex items-center justify-center h-[56px] mt-14 text-center uppercase text-xl font-bold super">
        <span>{data.event_name}</span>
      </div>
      <div className="space-y-6 mt-6">
        <div className="flex items-center gap-x-5">
          <SiRiotgames className="text-xl text-emerald-400" />
          <p className=" text-sm">
            hosted by{" "}
            <Link
              className="text-emerald-400 font-semibold"
              href={`/user/${data.profiles.name}`}
            >
              {data.profiles.name}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-x-5">
          <IoGameController className="text-xl text-emerald-400" />
          <p className="font-semibold text-sm text-emerald-400">
            {data?.game_name || "Free Event"}
          </p>
        </div>
        <div className="flex items-center gap-x-5">
          <BiSolidTime className="text-xl text-emerald-400" />
          <span className="text-sm">{formatDateString(data.start_date)}</span>
        </div>
        <div className="flex items-center gap-x-5">
          <BsFillPeopleFill className="text-xl text-emerald-400" />
          <span className="text-sm">
            {data.total_people === "no-limit" ? "Unlimited" : data.total_people}{" "}
            people
          </span>
        </div>
      </div>
      <div className="max-w-[100%] w-full flex gap-x-4 mt-8">
        {data.tags && data.tags[0] && (
          <div className="text-xs p-[2px] rounded-2xl w-[150px] text-center border border-solid border-teal-400 line-clamp-1">
            # {data.tags[0]}
          </div>
        )}
        {data.tags && data.tags[1] && (
          <div className="text-xs p-[2px] rounded-2xl w-[150px] text-center border border-solid border-teal-400 line-clamp-1">
            # {data.tags[1]}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
