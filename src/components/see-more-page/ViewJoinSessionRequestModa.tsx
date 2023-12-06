"use client";
import { MdSignalWifiStatusbar2Bar } from "react-icons/md";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { FaCalendarMinus } from "react-icons/fa6";
import Modal from "../modals/Modal";
import { FaUserAlt } from "react-icons/fa";
import Image from "next/image";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { IoGameController, IoSchool } from "react-icons/io5";
import { Separator } from "../ui/separator";
import { ActionTooltip } from "../action-tooltips/ActionToolTips";
import { IoMdInformationCircle } from "react-icons/io";
import SessionDesicion from "../student-booking-page/SessionDecision";
import { useJoinSessionRequestModal } from "@/hooks/useJoinSessionRequestModal";

dayjs.extend(localizedFormat);

const ViewJoinSessionRequestModal = () => {
  const { onClose, isOpen, data } = useJoinSessionRequestModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (!data) return null;

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[800px] max-h-[900px] overflow-x-visible bg-background pt-10 pb-12 pr-0 pl-9 !rounded-2xl remove-button"
    >
      <div className="overflow-y-scroll pr-8 gap-y-4 flex flex-col custom-scroll-bar-3 max-h-[812px] w-full">
        <div className="font-bold w-full text-center  text-2xl text-teal-500">
          Session Request Information
        </div>
        <div className="flex justify-between items-center">
          <div className="flex">
            <Image
              src={data.profiles.avatar!}
              alt="image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-12 h-12 rounded-full mr-3"
            />
            <div className="flex flex-col justify-center gap-y-1">
              <div className="text-lg">{data.profiles.name}</div>
              <div className="text-xs italic text-zinc-500">
                @{data.profiles.location}
              </div>
            </div>
          </div>
        </div>
        {/* 
            1. request information
              - course name
              - game name
              - send date
              - request user 
              - status
              - hold money
              - booked sessions 
            */}
        <div className="flex mt-5 gap-x-6">
          <div className="w-3/5 space-y-7 text-base">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-x-3">
                <IoSchool className="text-orange-500 text-lg" />
                <div className="text-zinc-400">Course Name</div>
              </div>
              <div className="font-bold">{data.course_session.name}</div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-x-3">
                <FaUserAlt className="text-teal-500 text-lg" />
                <div className="text-zinc-400">Request User</div>
              </div>
              <div className="font-bold">{data.profiles.name}</div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-x-3">
                <FaCalendarMinus className="text-yellow-500 text-lg" />
                <div className="text-zinc-400">Send Date</div>
              </div>
              <div className="font-bold">
                {dayjs(data.created_at).format("lll")}
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-x-3">
                <MdSignalWifiStatusbar2Bar className="text-red-400 text-xl" />
                <div className="text-zinc-400">Status</div>
              </div>
              <div className="font-bold">{data.status}</div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-x-3">
                <IoGameController className="text-blue-400 text-xl" />
                <div className="text-zinc-400 max-w-[230px] line-clamp-1">
                  Coach Game
                </div>
              </div>
              <div className="font-bold">
                {data.course_session.game_meta_data.shortName ||
                  data.course_session.game_meta_data.name}
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-x-3">
                <RiMoneyEuroCircleFill className="text-green-400 text-lg" />
                <div className="text-zinc-400">Hold Money</div>
              </div>
              <div className="font-bold flex items-center">
                <span>{data.money_hold}</span>
                <span className="ml-2 text-lg text-teal-500">G</span>
              </div>
            </div>
          </div>
          <div className="w-2/5 center">
            <Image
              src={data.course_session.game_meta_data.image}
              alt="image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[90%] h-[350px] object-cover object-start brightness-75 rounded-xl"
            />
          </div>
        </div>
        <Separator className="my-4 bg-zinc-600" />
        <div className="font-bold flex items-center w-full text-xl text-teal-500">
          Booked Sessions{" "}
          <ActionTooltip
            className="bg-layout"
            label={
              <div className="text-xs text-left font-medium leading-[140%] tracking-0.01 pt-1 pb-2 pr-1">
                <div className="max-w-[15.75rem]">
                  Provide your availability for each session then press the
                  confirm button. In case you need to reschedule, please leave a
                  message to the student !
                </div>
              </div>
            }
            side="top"
          >
            <div>
              <IoMdInformationCircle className="text-xl ml-3 text-teal-400 cursor-pointer" />
            </div>
          </ActionTooltip>
        </div>
        <div className="w-full leading-[180%] text-sm text-zinc-400">
          Provide your availability for each session then press the confirm
          button. In case you need to reschedule, please leave a message to the
          student !
        </div>
        <div className="flex flex-col gap-y-4 mt-3">
          {[data.sessions].map((session, index) => {
            return (
              <SessionDesicion session={session} data={data} key={index} />
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ViewJoinSessionRequestModal;
