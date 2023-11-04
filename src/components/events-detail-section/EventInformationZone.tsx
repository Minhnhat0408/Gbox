import { useEventDetail } from "@/hooks/useEventDetail";
import { Separator } from "../ui/separator";
import { BsCalendar2EventFill, BsFillClockFill } from "react-icons/bs";
import Link from "next/link";
import { IoGameController } from "react-icons/io5";
import { SiRiotgames } from "react-icons/si";
import { HiMiniUsers } from "react-icons/hi2";
import { formatDateString } from "@/lib/formatDateString";

const EventInformationZone = () => {
  const eventDetail = useEventDetail();

  return (
    <div
      className="w-3/5 bg-image rounded-2xl pt-4 pb-10 px-6 shine-2"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.55)), url(${eventDetail.cover_image})`,
      }}
    >
      <h1 className="font-bold text-xl text-white tracking-wider">
        Event Detail
      </h1>
      <Separator className="w-full bg-[rgba(138,147,153,0.6)] mt-6 mb-8" />
      <div className="space-y-8">
        <div className="center-item">
          <BsCalendar2EventFill className="text-2xl mr-6 text-emerald-300" />
          <p className="super text-lg font-bold uppercase">
            {eventDetail.event_name}
          </p>
        </div>
        <div className="center-item">
          <SiRiotgames className="text-2xl mr-6 text-emerald-300" />
          <p className="text-lg">
            is hosted by{" "}
            <Link
              className="super font-bold"
              href={`/user/${eventDetail.profiles.name}`}
            >
              {eventDetail.profiles.name}
            </Link>
          </p>
        </div>
        <div className="center-item">
          <IoGameController className="text-2xl mr-6 text-emerald-300" />
          <p className="text-lg">{eventDetail.game_meta_data.name}</p>
        </div>
        <div className="center-item">
          <BsFillClockFill className="text-2xl mr-6 text-emerald-300" />
          <p className="text-lg">
            {eventDetail.end_date ? (
              <span>
                {formatDateString(eventDetail.start_date)}
                <span className="mx-2">-</span>
                {formatDateString(eventDetail.end_date)}
              </span>
            ) : (
              formatDateString(eventDetail.start_date)
            )}
          </p>
        </div>
        <div className="center-item">
          <HiMiniUsers className="text-2xl mr-6 text-emerald-300" />
          <p className="text-lg">
            {eventDetail.total_people === "no-limit"
              ? "Unlimited"
              : eventDetail.total_people}{" "}
            people
          </p>
        </div>
        <div className="text-lg leading-8">{eventDetail.description}</div>
      </div>
    </div>
  );
};

export default EventInformationZone;
