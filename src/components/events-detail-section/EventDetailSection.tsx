import { FaUserClock } from "react-icons/fa";
import { Separator } from "../ui/separator";
import EventControlZone from "./EventControlZone";
import EventParticipate from "./EventParticipate";
import EventTagScroll from "./EventTagScroll";
import {
  BsCalendar2EventFill,
  BsCalendarEventFill,
  BsFillClockFill,
} from "react-icons/bs";
import Link from "next/link";
import { IoGameController } from "react-icons/io5";
import { SiRiotgames } from "react-icons/si";
import { HiMiniUserGroup, HiMiniUsers } from "react-icons/hi2";

const EventDetailSection = () => {
  return (
    <div
      className="mt-16 rounded-2xl pt-5 space-y-5 w-full h-[5000px]"
      id="event-section"
    >
      <EventControlZone />
      <EventTagScroll />
      <div className="w-full mt-10 flex space-x-6">
        <div
          className="w-3/5 bg-image rounded-2xl pt-4 pb-10 px-6 h-fit shine-2"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url(/syndra.jpg)`,
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
                Flex rank saturday
              </p>
            </div>
            <div className="center-item">
              <SiRiotgames className="text-2xl mr-6 text-emerald-300" />
              <p className="text-lg">
                is hosted by{" "}
                <Link className="super font-bold" href={`/user/thanhdung0207`}>
                  ThanhDung0207
                </Link>
              </p>
            </div>
            <div className="center-item">
              <IoGameController className="text-2xl mr-6 text-emerald-300" />
              <p className="text-lg">League of legends</p>
            </div>
            <div className="center-item">
              <BsFillClockFill className="text-2xl mr-6 text-emerald-300" />
              <p className="text-lg">
                Novermber 1, 2023 23:00 - Novermber 3, 2023 24:00
              </p>
            </div>
            <div className="center-item">
              <HiMiniUsers className="text-2xl mr-6 text-emerald-300" />
              <p className="text-lg">10 people</p>
            </div>
            <div className="text-lg leading-8">
              Sunt consectetur laborum est aute sit proident deserunt aliqua
              velit qui. Excepteur adipisicing occaecat deserunt in labore et
              cupidatat excepteur. Ipsum do voluptate ea cupidatat exercitation
              labore adipisicing eu anim veniam est. Anim aute consequat nostrud
              nostrud proident sint cillum quis culpa esse proident ad nisi et.
            </div>
          </div>
        </div>
        <div className="w-2/5 space-y-6">
          <EventParticipate />
          <div className="w-full card-container rounded-2xl py-4 px-6">
            <h1 className="font-bold text-xl text-white tracking-wider">
              Event Rules
            </h1>
            <Separator className="w-full bg-[rgba(138,147,153,0.6)] my-4" />
            <div className="space-y-5">
              <div className="text-white leading-7">
                <span className="mr-5 super font-bold">1.</span>
                Enim ut ullamco nisi officia qui voluptate Lorem consequat
              </div>
              <div className="text-white leading-7">
                <span className="mr-5 super font-bold">2.</span>
                Enim ut ullamco nisi officia qui voluptate Lorem consequat
              </div>
              <div className="text-white leading-7">
                <span className="mr-5 super font-bold">3.</span>
                Enim ut ullamco nisi officia qui voluptate Lorem consequat
              </div>
              <div className="text-white leading-7">
                <span className="mr-5 super font-bold">4.</span>
                Enim ut ullamco nisi officia qui voluptate Lorem consequat
              </div>
              <div className="text-white leading-7">
                <span className="mr-5 super font-bold">5.</span>
                Enim ut ullamco nisi officia qui voluptate Lorem consequat
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailSection;
