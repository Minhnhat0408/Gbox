"use client";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { MdSignalWifi2Bar } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useSessionRequestModal } from "@/hooks/useSessionRequestModal";
import Modal from "../modals/Modal";
import Image from "next/image";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";

dayjs.extend(localizedFormat);

const ViewSessionRequestModal = () => {
  const { data, onClose, isOpen } = useSessionRequestModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (!data) return null;

  // 2. description
  // 4. price
  // 5. duration

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[900px] max-h-[900px] overflow-hidden bg-background pt-10 pb-12 pl-9 pr-0 !rounded-2xl remove-button"
      style={{
        backgroundImage: `linear-gradient(319.38deg,#1d1e22 30%,rgba(29,30,34,.4)), url(${data?.game_meta_data.image})`,
      }}
    >
      <div className="flex z-50 flex-col gap-y-4 pl-2 pr-4 overflow-auto">
        <div className="flex justify-between">
          <div className="flex">
            <Image
              src={data.profiles.avatar!}
              alt="image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-12 h-12 rounded-full mr-3"
            />
            <div className="super font-bold text-lg">{data.profiles.name}</div>
          </div>
        </div>
        <div className="w-full flex mt-4">
          <div
            className="bg-image w-[265px] h-[374px] rounded-xl mr-7"
            style={{
              backgroundImage: `url(${data?.game_meta_data.image})`,
            }}
          ></div>
          <div className="flex-1 flex-col flex gap-y-6">
            <div className="super font-bold text-2xl">Session Request</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <FaStar className="text-yellow-400 text-xl" />
                <div className="text-zinc-300 text-base">Session Name</div>
              </div>
              <div>{data.name}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <BsCalendar2CheckFill className="text-rose-400 text-xl" />
                <div className="text-zinc-300 text-base">Submitted Date</div>
              </div>
              <div>{dayjs(data.created_at).format("llll")}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <IoGameController className="text-green-400 text-xl" />
                <div className="text-zinc-300 text-base">Coaching Game</div>
              </div>
              <div>
                {data.game_meta_data.shortName || data.game_meta_data.name}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <MdSignalWifi2Bar className="text-blue-500 text-xl" />
                <div className="text-zinc-300 text-base">Status</div>
              </div>
              <div className="capitalize">{data.is_accepted}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <FaMoneyBill className="text-orange-400 text-xl" />
                <div className="text-zinc-300 text-base">Session Price</div>
              </div>
              <div className="capitalize">{data.price}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <FaClock className="text-teal-500 text-xl" />
                <div className="text-zinc-300 text-base">Duration</div>
              </div>
              <div className="capitalize">{data.duration}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <IoDocumentTextSharp className=" text-cyan-400 text-xl" />
                <div className="text-zinc-300 text-base">Description</div>
              </div>
            </div>
            <div className="">{data.description}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewSessionRequestModal;
