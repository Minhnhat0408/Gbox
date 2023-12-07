"use client";
import { MdSignalWifiStatusbar2Bar } from "react-icons/md";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { FaCalendarMinus } from "react-icons/fa6";
import { useViewStudentBookingRequestModal } from "@/hooks/useViewStudentBookingRequestModal";
import Modal from "../modals/Modal";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { FaCheck, FaUserAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Image from "next/image";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { IoGameController, IoSchool } from "react-icons/io5";
import { Separator } from "../ui/separator";
import { ActionTooltip } from "../action-tooltips/ActionToolTips";
import { IoMdInformationCircle } from "react-icons/io";
import SessionDesicion from "./SessionDecision";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import uuid from "react-uuid";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { wait } from "@/lib/wait";
import { Input } from "../ui/input";
import { getSessionEndDate } from "@/lib/getSessionEndDate";

dayjs.extend(localizedFormat);

const ViewStudentBookingRequestModal = () => {
  const { onClose, isOpen, data } = useViewStudentBookingRequestModal();

  const [state, setState] = useState<"accepted" | "rejected" | "pending">(
    data?.status || "pending"
  );

  const [message, setMessage] = useState("");

  const [error, setError] = useState(false);

  const [openMsg, setOpenMsg] = useState(false);

  const [loading, setLoading] = useState(false);

  const { supabaseClient } = useSessionContext();

  const { userDetails } = useUser();

  const router = useRouter();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (!data) return null;

  const handleAccept = async () => {
    try {
      setLoading(true);
      setState("accepted");
      const { error } = await supabaseClient
        .from("appointment_request")
        .update({
          status: "accepted",
          modified_at: new Date(),
        })
        .eq("id", data.id);
      if (error) {
        throw error;
      }

      const createNotification = supabaseClient.from("notifications").insert({
        id: `${uuid()}_${userDetails?.id}_${
          data.profiles.id
        }_appointment-accepted`,
        content: `Your appointment request with ${userDetails?.name} has been accepted. Please check your appointment in Request History`,
        link_to: "/appointment",
        sender_id: userDetails?.id,
        receiver_id: data.request_user_id,
        notification_type: "appointment_accepted",
        notification_meta_data: {
          sender_avatar: userDetails?.avatar,
          sender_name: userDetails?.name,
        },
      });

      const createAppointment = supabaseClient.from("appointment").insert({
        student_id: data.request_user_id,
        course_id: data.course_session.id,
        coach_id: data.coach_id,
        coach_profile_id: data.coach_profile_id,
        money_hold: data.money_hold,
        appointment_time: data.sessions,
        coach_verify: false,
        student_verify: false,
        appointment_request_id: data.id,
        end_date: getSessionEndDate(
          data.sessions,
          data.course_session.duration
        ),
      });

      const [notiRes, appoRes] = await Promise.all([
        createNotification,
        createAppointment,
      ]);

      if (notiRes.error) {
        throw notiRes.error;
      }

      if (appoRes.error) {
        throw appoRes.error;
      }

      toast.success(
        `Your appoinment with ${data.profiles.name} has beeen set. Please join on time !`
      );
      setLoading(false);

      onClose();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
      setState("pending");
    }
  };

  const handleReject = async () => {
    setOpenMsg(true);
  };

  const sendRejectMsg = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      if (!message.trim()) {
        setError(true);
        return;
      }
      setOpenMsg(false);
      setLoading(true);
      setState("rejected");
      const { error } = await supabaseClient
        .from("appointment_request")
        .update({
          status: "rejected",
          modified_at: new Date(),
        })
        .eq("id", data.id);
      if (error) {
        throw error;
      }

      const createNotification = supabaseClient.from("notifications").insert({
        id: `${uuid()}_${userDetails?.id}_${
          data.profiles.id
        }_appointment-rejected`,
        content: `Your appoinment has been rejected. Check your message for more information !`,
        link_to: "/request-history",
        sender_id: userDetails?.id,
        receiver_id: data.request_user_id,
        notification_type: "appointment_rejected",
        notification_meta_data: {
          sender_avatar: userDetails?.avatar,
          sender_name: userDetails?.name,
        },
      });

      const messageToStudent_1 = `🤖 Bot's message 🤖`;

      const messageToStudent_2 = `Your "${data.course_session.name}" appointment with ${userDetails?.name} has been rejected. Please reappointment based on coach reason below !`;

      const messageToStudent_3 = ` Detail 📃: "${
        data.course_session.name
      }" - "${data.course_session.game_meta_data.name}" - "${dayjs(
        data.sessions
      ).format("LLLL")}"`;

      const messageToStudent_4 = `🧑‍💻 Coach's message 🧑‍💻`;
      const messageToStudent_5 = message;
      let date = new Date();

      const dataSend = [
        messageToStudent_5,
        messageToStudent_4,
        messageToStudent_3,
        messageToStudent_2,
        messageToStudent_1,
      ].map((item, ind) => {
        let newDate = date;
        newDate.setTime(date.getTime() - ind * 1000);
        return {
          sender_id: userDetails?.id,
          receiver_id: data.request_user_id,
          content: item,
          created_at: newDate.toISOString(),
        };
      });

      const createMessageFromCoachToStudent = supabaseClient
        .from("messages")
        .insert(dataSend);

      const [notiRes, msgRes] = await Promise.all([
        createNotification,
        createMessageFromCoachToStudent,
      ]);

      // fetch to refund user money
      const { data: userMoney } = await supabaseClient
        .from("profiles")
        .select("gbox_money")
        .eq("id", data.request_user_id)
        .single();

      const { error: refundError } = await supabaseClient
        .from("profiles")
        .update({
          gbox_money: userMoney?.gbox_money + data.money_hold,
        })
        .eq("id", data.request_user_id);

      if (refundError) {
        throw refundError;
      }

      if (notiRes.error) {
        throw notiRes.error;
      }

      if (msgRes.error) {
        throw msgRes.error;
      }
      setLoading(false);
      setMessage("");
      toast.success("Your message has been sent to your student !");
      onClose();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[800px] max-h-[900px] overflow-x-visible bg-background pt-10 pb-12 pr-0 pl-9 !rounded-2xl remove-button"
    >
      {data.status === "pending" && (
        <div className="absolute top-1/2 -translate-y-1/2 -left-[100px] flex flex-col items-center">
          <button
            onClick={handleAccept}
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
            onClick={handleReject}
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

      <div className="overflow-y-scroll pr-8 gap-y-4 flex flex-col custom-scroll-bar-3 max-h-[812px] w-full">
        <div className="font-bold w-full text-center  text-2xl text-teal-500">
          Session Request Information
        </div>
        <AlertDialog
          open={openMsg}
          onOpenChange={(open: boolean) => {
            setOpenMsg(open);
            setError(false);
          }}
        >
          <AlertDialogTrigger className="hidden">Open</AlertDialogTrigger>
          <AlertDialogContent className="bg-layout">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Specific reason to your student so that they can reschedule the
                session if possible
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input
              value={message}
              onChange={(e) => {
                if (e.target.value.trim()) {
                  setError(false);
                }
                setMessage(e.target.value);
              }}
              className="w-full"
            />
            {error && (
              <div className=" text-rose-400 text-sm">
                Please provie specific reason or another schedule for your
                student
              </div>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={sendRejectMsg}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
              <div className="font-bold text-right">
                {data.course_session.name}
              </div>
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

export default ViewStudentBookingRequestModal;
