"use client";
import { SiGooglemeet, SiRiotgames } from "react-icons/si";
import { PiStudentBold } from "react-icons/pi";
import { MdVideoChat } from "react-icons/md";
import { useAppointmentInformationModal } from "@/hooks/useAppointmentInformationModal";
import Modal from "../modals/Modal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { MdKeyboardAlt } from "react-icons/md";
import Link from "next/link";
import { MdMeetingRoom } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { convertStarttimeAndDurationToString } from "@/lib/convertStarttimeAndDurationToString";
import { getFormattedTime } from "@/lib/getFormattedTime";
import {
  RiMoneyDollarBoxFill,
  RiMoneyDollarCircleFill,
  RiVideoChatLine,
} from "react-icons/ri";
import { RxLapTimer } from "react-icons/rx";
import { Separator } from "../ui/separator";
import { FaClockRotateLeft, FaUser } from "react-icons/fa6";
import { ActionTooltip } from "../action-tooltips/ActionToolTips";
import { IoMdInformationCircle } from "react-icons/io";
import { convertScheduleToRefundPolicy } from "@/lib/convertScheduleToRefundPolicy";
import { useUser } from "@/hooks/useUser";
import { AiTwotoneVideoCamera } from "react-icons/ai";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import ViewMoreButton from "@/components/appointment-page/ViewMoreButton";
import { BsCalendar2Date } from "react-icons/bs";

dayjs.extend(relativeTime);

const AppointmentInformationModal = () => {
  const { isOpen, onClose, data } = useAppointmentInformationModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const { userDetails } = useUser();

  if (!data) return null;

  //TODO: Cancel + reschedule logic
  //TODO: handle display when appointment is over

  const selfRoleData =
    userDetails?.id === data.coach_profile_id
      ? data.coach_data
      : data.student_data;

  const date = new Date(data.appointment_time);

  const { free, html } = convertScheduleToRefundPolicy(
    date,
    date.getHours().toString(),
    date.getMinutes().toString()
  );

  return (
    <Modal
      className="max-w-[900px] h-[750px] border-none bg-layout shadow-none max-h-[900px] overflow-x-visible p-8 flex flex-col !rounded-2xl remove-button"
      isOpen={isOpen}
      onChange={onChange}
    >
      <h1 className="super tracking-wider mb-8 mt-4 h-fit text-4xl font-bold w-full text-center">
        Appointment Detail
      </h1>
      <div className="w-full flex gap-x-14">
        <div className="w-3/5 flex flex-col gap-y-10">
          <div className="flex mb-5 items-center gap-x-4">
            <Image
              src={selfRoleData.avatar!}
              alt="Student Avatar"
              width={0}
              height={0}
              sizes="100vw"
              className={cn("w-20 h-20 rounded-full border-2", {
                "border-blue-400": selfRoleData.gender === "male",
                "border-pink-400": selfRoleData.gender === "female",
              })}
            />
            <div className="flex flex-col gap-y-3">
              <h1 className="super font-bold text-2xl">{selfRoleData.name}</h1>
              <p className="italic text-zinc-300 text-sm">
                {selfRoleData.location}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <FaUser className="text-xl text-green-400 mr-5" />
            <p className="font-bold">Role</p>
            <div className="flex-1 text-right font-bold">
              {userDetails?.id === data.coach_profile_id ? "Coach" : "Student"}
            </div>
          </div>
          <div className="flex items-center">
            <BsCalendar2Date className="text-xl text-green-400 mr-5" />
            <p className="font-bold">Created At</p>
            <div className="flex-1 text-right font-bold">
              {dayjs(data.created_at).format("LLL")}
            </div>
          </div>

          <div className="flex items-center">
            <SiRiotgames className="text-xl text-green-400 mr-5" />
            <p className="font-bold">Course Name</p>
            <div className="flex-1 text-right font-bold">
              {data.course_session.name}
            </div>
          </div>
          <div className="flex items-center">
            <IoGameController className="text-xl text-green-400 mr-5" />
            <p className="font-bold">Course Game</p>
            <div className="flex-1 text-right font-bold">
              {data.course_session.game_meta_data.name}
            </div>
          </div>
        </div>
        <div
          className="w-2/5 relative bg-cover rounded-xl bg-center h-[400px]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${data.course_session.game_meta_data.image})`,
          }}
        >
          <div className="absolute w-full top-1/2 -translate-y-1/2 z-50 left-1/2 flex items-center flex-col -translate-x-1/2">
            <RiVideoChatLine className="text-7xl text-green-400 animate-bounce" />
            <Link
              target="_blank"
              className="mt-4 uppercase tracking-widest font-bold text-green-400 text-2xl hover:underline"
              href={`/live-session?room=${data.id}&userID=${selfRoleData.id}`}
            >
              Room Link
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex-col mt-6 select-none flex bg-black/30 rounded-xl items-center p-4">
        <div className="flex w-full items-center">
          <div className="w-14 h-14 center">
            <div className="flex flex-col items-center">
              <h3 className="leading-none tracking-[0.01] mb-2 font-semibold">
                {date.getDate()}
              </h3>
              <h3 className="text-sm leading-none">
                {date.toLocaleString("default", {
                  month: "short",
                })}
              </h3>
            </div>
          </div>
          <div className="flex-1 pl-3 flex w-full items-center">
            <div className="flex flex-col ml-2">
              <div className="leading-none tracking-0.01 mb-3 font-semibold">
                {convertStarttimeAndDurationToString(
                  getFormattedTime(date),
                  data.course_session.duration
                )}
              </div>
              <div className="text-sm leading-none">
                {data.course_session.duration}
              </div>
            </div>
          </div>
          <div className="ml-auto pr-3 flex w-auto">
            <Button size={"sm"} className="mr-3">
              Reschedule
            </Button>
            <Button size={"sm"} variant={"destructive"}>
              Cancel
            </Button>
          </div>
        </div>
        <Separator className="bg-zinc-500 mt-4 mb-3" />
        <div className="w-full flex gap-x-2 items-center">
          <span>
            <FaClockRotateLeft className="text-green-400 text-sm" />
          </span>
          {html}
          <ActionTooltip
            className="bg-layout"
            label={
              <div className="text-xs text-left leading-[140%] tracking-0.01 pt-1 pb-2 pr-1">
                <h1 className="super font-medium mb-3">Cancelation policy</h1>
                <ul className="max-w-[15.75rem] space-y-2">
                  <li className="flex space-x-2">
                    <div className="h-1 w-1 shrink-0 bg-green-400 rounded-full mt-[0.4rem]"></div>
                    <p className="text-ondark-primary">
                      Cancel or reschedule your session for free up to 24 hours
                      ahead of the start time.
                    </p>
                  </li>
                  <li className="flex space-x-2">
                    <div className="h-1 w-1 shrink-0 bg-green-400 rounded-full mt-[0.4rem]"></div>
                    <p className="text-ondark-primary">
                      50% of the lesson price is applied as a fee to reschedule
                      or cancel a session within 24 hours of the start time.
                    </p>
                  </li>
                </ul>
              </div>
            }
            side="top"
          >
            <div>
              <IoMdInformationCircle className="text-base cursor-pointer" />
            </div>
          </ActionTooltip>
        </div>
      </div>
    </Modal>
  );
};

export default AppointmentInformationModal;
