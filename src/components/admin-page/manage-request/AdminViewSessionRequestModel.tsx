"use client";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaCheck, FaClock } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { MdSignalWifi2Bar } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useSessionRequestModal } from "@/hooks/useSessionRequestModal";
import Image from "next/image";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import Modal from "@/components/modals/Modal";
import { useAdminViewSessionRequestModal } from "@/hooks/useAdminViewSessionRequestModal";
import { useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { FaXmark } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";
import uuid from "react-uuid";
import { toast } from "sonner";
import createSessionApproveNotification from "@/lib/createSessionApproveNotification";

dayjs.extend(localizedFormat);

const AdminViewSessionRequestModal = () => {
  const { data, onClose, isOpen } = useAdminViewSessionRequestModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState<"accepted" | "rejected" | "pending">(
    data?.is_accepted || "pending"
  );

  const { supabaseClient } = useSessionContext();

  const router = useRouter();

  if (!data) return null;

  // 2. description
  // 4. price
  // 5. duration

  const acceptApply = async () => {
    try {
      if (loading) return;
      setLoading(true);
      setState("accepted");

      const { error } = await supabaseClient
        .from("session_application")
        .update({ is_accepted: "accepted", modified_at: new Date() })
        .eq("id", data.id)
        .single();

      if (error) throw error;

      const createNotifRequest = supabaseClient
        .from("notifications")
        .insert(
          createSessionApproveNotification(
            data,
            "Your session request has been accepted. Let's start your session!",
            "session_request_accepted"
          )
        );

      const createSessionRequest = supabaseClient
        .from("course_session")
        .insert({
          id: uuid(),
          name: data.name,
          description: data.description,
          price: data.price,
          duration: data.duration,
          game_meta_data: data.game_meta_data,
          created_at: new Date(),
          modified_at: new Date(),
          coach_id: data.coach_id,
          coach_profile_id: data.coach_profile_id,
        });

      const [notifResponse, sessionResponse] = await Promise.all([
        createNotifRequest,
        createSessionRequest,
      ]);

      if (notifResponse.error) throw notifResponse.error;
      if (sessionResponse.error) throw sessionResponse.error;

      setLoading(false);
      onClose();
      toast.success("Accept session request successfully");
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
      setState("pending");
    }
  };

  const rejectApply = async () => {
    try {
      if (loading) return;

      setLoading(true);
      setState("rejected");

      const { error } = await supabaseClient
        .from("session_application")
        .update({ is_accepted: "rejected", modified_at: new Date() })
        .eq("id", data.id)
        .single();

      if (error) throw error;

      const { error: notifyError } = await supabaseClient
        .from("notifications")
        .insert(
          createSessionApproveNotification(
            data,
            "Your session request has been rejected. Please try again later! ",
            "session_request_rejected"
          )
        );

      if (notifyError) throw notifyError;

      setLoading(false);
      onClose();
      toast.success("Reject session request successfully");
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
      setState("pending");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[900px] max-h-[900px] overflow-x-visible bg-background pt-10 pb-12 pl-9 pr-0 !rounded-2xl remove-button"
      style={{
        backgroundImage: `linear-gradient(319.38deg,#1d1e22 30%,rgba(29,30,34,.4)), url(${data?.game_meta_data.image})`,
      }}
    >
      {data.is_accepted === "pending" && (
        <div className="absolute top-1/2 -translate-y-1/2 -left-[100px] flex flex-col items-center">
          <button
            onClick={acceptApply}
            className="mb-5 cursor-pointer w-[80px] h-[120px] center rounded-xl bg-teal-500"
          >
            <div className="flex flex-col items-center">
              {loading && state === "accepted" ? (
                <ImSpinner8 className="text-white text-2xl animate-spin" />
              ) : (
                <FaCheck className="text-white text-2xl" />
              )}
            </div>
          </button>

          <button
            onClick={rejectApply}
            className="w-[80px] cursor-pointer h-[120px] center rounded-xl bg-rose-500"
          >
            <div className="flex flex-col items-center">
              {loading && state === "rejected" ? (
                <ImSpinner8 className="text-white text-2xl animate-spin" />
              ) : (
                <FaXmark className="text-white text-2xl" />
              )}
            </div>
          </button>
        </div>
      )}
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

export default AdminViewSessionRequestModal;
