"use client";

import { Separator } from "../ui/separator";
import EventControlZone from "./EventControlZone";
import EventParticipate from "./EventParticipate";
import EventTagScroll from "./EventTagScroll";
import { BsCalendar2EventFill, BsFillClockFill } from "react-icons/bs";
import Link from "next/link";
import { IoGameController } from "react-icons/io5";
import { SiRiotgames } from "react-icons/si";
import { HiMiniUsers } from "react-icons/hi2";
import { useEventDetail } from "@/hooks/useEventDetail";
import { formatDateString } from "@/lib/formatDateString";

const EventDetailSection = () => {
  const eventDetail = useEventDetail();

  return (
    <div
      className="mt-16 rounded-2xl pt-5 space-y-5 w-full py-10"
      id="event-section"
    >
      <EventControlZone />
      <EventTagScroll />
      <div className="w-full mt-10 flex space-x-6">
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
        <div className="w-2/5 space-y-6">
          <EventParticipate />
          <div className="w-full card-container rounded-2xl py-4 px-6">
            <h1 className="font-bold text-xl text-white tracking-wider">
              Event Rules
            </h1>
            <Separator className="w-full bg-[rgba(138,147,153,0.6)] my-4" />
            {eventDetail.rules && eventDetail.rules.length > 0 ? (
              <div className="space-y-5">
                {eventDetail.rules.map((e, index) => (
                  <div key={index} className="text-white leading-7">
                    <span className="mr-5 super font-bold">{index + 1}.</span>
                    {e}
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-24 center">
                <span className="text-gray-300 text-lg uppercase">
                  there no rule at current event
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailSection;
