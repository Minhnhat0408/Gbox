"use client";
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
import { SiRiotgames } from "react-icons/si";
import { useAppointmentInformationModal } from "@/hooks/useAppointmentInformationModal";
import Modal from "../modals/Modal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { IoGameController } from "react-icons/io5";
import { convertStarttimeAndDurationToString } from "@/lib/convertStarttimeAndDurationToString";
import { getFormattedTime } from "@/lib/getFormattedTime";
import { RiVideoChatLine } from "react-icons/ri";
import { Separator } from "../ui/separator";
import { FaClockRotateLeft, FaUser } from "react-icons/fa6";
import { ActionTooltip } from "../action-tooltips/ActionToolTips";
import { IoMdInformationCircle } from "react-icons/io";
import { convertScheduleToRefundPolicy } from "@/lib/convertScheduleToRefundPolicy";
import { useUser } from "@/hooks/useUser";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { BsCalendar2Date } from "react-icons/bs";
import { useEffect, useState } from "react";
import { canFreeReschedule } from "@/lib/canFreeSchedule";
import PickNewSchedule from "./PickNewSchedule";
import { toast } from "sonner";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { updateScheduleDate } from "@/lib/updateScheduleDate";
import uuid from "react-uuid";
import { useRouter } from "next/navigation";
import LoadingAnimation from "../loading-components/LoadingAnimation";

dayjs.extend(relativeTime);

const AppointmentInformationModal = () => {
  const { isOpen, onClose, data } = useAppointmentInformationModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const [openRescheduleModal, setOpenRescheduleModal] = useState(false);

  const [openCancelModal, setOpenCancelModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [time, setTime] = useState<string | undefined>(undefined);

  const [dateNew, setDateNew] = useState<Date | undefined>(undefined);

  const { userDetails } = useUser();

  const { supabaseClient } = useSessionContext();

  const [free, setFree] = useState(false);

  useEffect(() => {
    if (isOpen && data) {
      if (canFreeReschedule(data.appointment_time)) {
        setFree(true);
      } else {
        setFree(false);
      }
    }
  }, [isOpen, data]);

  const router = useRouter();

  if (!data) return null;

  //TODO: handle display when appointment is over
  //TODO: cancel or reschedule both refund user 50% of the price + coach gets 50% of the price

  const selfRoleData =
    userDetails?.id === data.coach_profile_id
      ? data.coach_data
      : data.student_data;

  const isCoach = userDetails?.id === data.coach_profile_id;

  const date = new Date(data.appointment_time);

  const { free: frees, html } = convertScheduleToRefundPolicy(
    date,
    date.getHours().toString(),
    date.getMinutes().toString()
  );

  // only for student
  const rescheduleSessions = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      if (!time || !dateNew) {
        return toast.error("Please choose new time and date to reschedule");
      }
      setLoading(true);

      // TODO: remove old schedule

      const newSchedule = updateScheduleDate(dateNew, time);

      const deleteOldAppointmentReq = supabaseClient
        .from("appointment")
        .delete()
        .eq("id", data.id);

      // TODO: change old appointment request + hold money * 1.5 of the old appointment_request

      const updateOldAppointmentReq = supabaseClient
        .from("appointment_request")
        .update({
          money_hold: data.money_hold * 1.5,
          status: "pending",
          modified_at: new Date().toISOString(),
          sessions: newSchedule,
        })
        .eq("id", data.appointment_request_id);

      // TODO: notification to coach

      const notificationToCoach = supabaseClient.from("notifications").insert({
        id: data.appointment_request_id + "_" + uuid() + "_" + "reschedule",
        content: `Your student "${data.student_data.name}" has reschedule session. Please check in student booking page.`,
        link_to: `/request-history/booking`,
        sender_id: data.student_data.id,
        receiver_id: data.coach_profile_id,
        notification_type: "reschedule_sessions",
        notification_meta_data: {
          sender_avatar: data.student_data.avatar,
          sender_name: data.student_data.name,
        },
      });

      // TODO: cost 50% of the price to user

      const studentMoney = supabaseClient
        .from("profiles")
        .select("gbox_money")
        .eq("id", data.student_data.id);

      // promise all

      const [
        deleteOldAppointmentRes,
        updateOldAppointmentRes,
        notificationToCoachRes,
        studentMoneyRes,
      ] = await Promise.all([
        deleteOldAppointmentReq,
        updateOldAppointmentReq,
        notificationToCoach,
        studentMoney,
      ]);

      if (deleteOldAppointmentRes.error) {
        throw deleteOldAppointmentRes.error;
      }

      if (updateOldAppointmentRes.error) {
        throw updateOldAppointmentRes.error;
      }

      if (notificationToCoachRes.error) {
        throw notificationToCoachRes.error;
      }

      if (studentMoneyRes.error) {
        throw studentMoneyRes.error;
      }

      if (!free) {
        const updateStudentMoney = await supabaseClient
          .from("profiles")
          .update({
            gbox_money:
              studentMoneyRes.data![0].gbox_money - data.money_hold * 0.5,
          })
          .eq("id", data.student_data.id);

        if (updateStudentMoney.error) {
          throw updateStudentMoney.error;
        }
      }

      toast.success(
        "Reschedule successfully! Please check in your request-history page "
      );
      setLoading(false);
      setOpenRescheduleModal(false);
      onClose();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const cancelSessions = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setLoading(true);

      const deleteOldAppointmentReq = supabaseClient
        .from("appointment")
        .delete()
        .eq("id", data.id);

      const updateOldAppointmentReq = supabaseClient
        .from("appointment_request")
        .update({
          money_hold: 0,
          status: "rejected",
          modified_at: new Date().toISOString(),
        })
        .eq("id", data.appointment_request_id);

      const notificationToCoach = supabaseClient.from("notifications").insert({
        id: data.appointment_request_id + "_" + uuid() + "_" + "cancel",
        content: `You receive Your student "${data.student_data.name}" has cancel session. Please check in student booking page.`,
        link_to: `/request-history/booking`,
        sender_id: data.student_data.id,
        receiver_id: data.coach_profile_id,
        notification_type: "cancel_sessions",
        notification_meta_data: {
          sender_avatar: data.student_data.avatar,
          sender_name: data.student_data.name,
        },
      });

      const studentMoney = supabaseClient
        .from("profiles")
        .select("gbox_money")
        .eq("id", data.student_data.id);

      const coachMoney = supabaseClient
        .from("profiles")
        .select("gbox_money")
        .eq("id", data.coach_profile_id);

      const [
        deleteOldAppointmentRes,
        updateOldAppointmentRes,
        notificationToCoachRes,
        studentMoneyRes,
        coachMoneyRes,
      ] = await Promise.all([
        deleteOldAppointmentReq,
        updateOldAppointmentReq,
        notificationToCoach,
        studentMoney,
        coachMoney,
      ]);

      if (deleteOldAppointmentRes.error) {
        throw deleteOldAppointmentRes.error;
      }

      if (updateOldAppointmentRes.error) {
        throw updateOldAppointmentRes.error;
      }

      if (notificationToCoachRes.error) {
        throw notificationToCoachRes.error;
      }

      if (studentMoneyRes.error) {
        throw studentMoneyRes.error;
      }

      if (coachMoneyRes.error) {
        throw coachMoneyRes.error;
      }

      if (!free) {
        // becasue of that student have deposit the session fee, so we have to refund 50% of the fee to student
        const updateStudentMoney = supabaseClient
          .from("profiles")
          .update({
            gbox_money:
              studentMoneyRes.data![0].gbox_money + data.money_hold * 0.5,
          })
          .eq("id", data.student_data.id);

        // coach also get 50% of the fee

        const updateCoachMoney = supabaseClient
          .from("profiles")
          .update({
            gbox_money:
              coachMoneyRes.data![0].gbox_money + data.money_hold * 0.5,
          })
          .eq("id", data.coach_profile_id);

        const [updateStudentMoneyRes, updateCoachMoneyRes] = await Promise.all([
          updateStudentMoney,
          updateCoachMoney,
        ]);

        if (updateStudentMoneyRes.error) {
          throw updateStudentMoneyRes.error;
        }

        if (updateCoachMoneyRes.error) {
          throw updateCoachMoneyRes.error;
        }
      }

      toast.success(
        "Cancel successfully! Please check in your request-history page "
      );

      setLoading(false);
      setOpenCancelModal(false);
      onClose();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  console.log(free);

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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <SiRiotgames className="text-xl text-green-400 mr-5" />
              <p className="font-bold">Course Name</p>
            </div>
            <div className="flex-1 max-w-[60%] line-clamp-1 text-right font-bold">
              {data.course_session.name}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IoGameController className="text-xl text-green-400 mr-5" />
              <p className="font-bold">Course Game</p>
            </div>
            <div className="flex-1 text-right font-bold max-w-[60%] line-clamp-1">
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
            {!isCoach && (
              <>
                <AlertDialog
                  open={openRescheduleModal}
                  onOpenChange={(open: boolean) => {
                    if (open) {
                      if (canFreeReschedule(data.appointment_time)) {
                        setFree(true);
                      } else {
                        setFree(false);
                      }
                    } else {
                      setDateNew(undefined);
                      setTime(undefined);
                    }
                    setOpenRescheduleModal(open);
                  }}
                >
                  <AlertDialogTrigger asChild>
                    <Button size={"sm"} className="mr-3">
                      Reschedule
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    {loading && (
                      <div className="bg-black/30 z-50 rounded-lg w-full h-full absolute top-0 right-0 left-0 bottom-0 center">
                        <LoadingAnimation
                          className="w-16 h-16 text-primary"
                          fill="#00F0FF"
                        />
                      </div>
                    )}
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <div className="flex mt-5 mb-3 w-full gap-x-2 items-start">
                        <div className="w-[6px] h-[6px] shrink-0 mt-[0.4rem] mr-1 rounded-full bg-green-400"></div>
                        <div className="text-sm">
                          {free ? (
                            <span>
                              Due to reschedule before 24 hours session start,
                              this will be{" "}
                              <span className="font-bold text-teal-500">
                                free
                              </span>
                            </span>
                          ) : (
                            <span>
                              You will lost{" "}
                              <span className="font-bold text-teal-500">
                                50%
                              </span>{" "}
                              fee to reschedule
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex mt-5 mb-3 w-full gap-x-2 items-start">
                        <div className="w-[6px] h-[6px] shrink-0 mt-[0.4rem] mr-1 rounded-full bg-green-400"></div>
                        <div className="text-sm">
                          After you reschedule, please wait for the coach to
                          accept the new schedule.
                        </div>
                      </div>
                      <div className="flex w-full gap-x-2 items-start">
                        <div className="w-[6px] h-[6px] shrink-0 mt-[0.4rem] mr-1 rounded-full bg-green-400"></div>
                        <div className="text-sm">
                          You can only reschedule your new sessions after 24
                          hours of the old session time. So if you want to
                          reschedule earlier, please cancel the session and book
                          a new one.
                        </div>
                      </div>
                      <PickNewSchedule
                        appointment_time={data.appointment_time}
                        dateNew={dateNew}
                        setDateNew={setDateNew}
                        time={time}
                        setTime={setTime}
                      />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={rescheduleSessions}
                        className={cn("flex items-center w-[119px]")}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog
                  open={openCancelModal}
                  onOpenChange={(open: boolean) => {
                    if (open) {
                      if (canFreeReschedule(data.appointment_time)) {
                        setFree(true);
                      } else {
                        setFree(false);
                      }
                    } else {
                      setDateNew(undefined);
                      setTime(undefined);
                    }
                    setOpenCancelModal(open);
                  }}
                >
                  <AlertDialogTrigger asChild>
                    <Button size={"sm"} variant={"destructive"}>
                      Cancel
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    {loading && (
                      <div className="bg-black/30 z-50 rounded-lg  w-full h-full absolute top-0 right-0 left-0 bottom-0 center">
                        <LoadingAnimation
                          className="w-16 h-16 text-primary"
                          fill="#00F0FF"
                        />
                      </div>
                    )}
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <div className="flex mt-5 mb-3 w-full gap-x-2 items-start">
                        <div className="w-[6px] h-[6px] shrink-0 mt-[0.4rem] mr-1 rounded-full bg-green-400"></div>
                        <div className="text-sm">
                          {free ? (
                            <span>
                              Due to reschedule before 24 hours session start,
                              this will be{" "}
                              <span className="font-bold text-teal-500">
                                free
                              </span>
                            </span>
                          ) : (
                            <span>
                              You will lost{" "}
                              <span className="font-bold text-teal-500">
                                50%
                              </span>{" "}
                              fee to cancel this sessions !
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex w-full gap-x-2 items-start">
                        <div className="w-[6px] h-[6px] shrink-0 mt-[0.4rem] mr-1 rounded-full bg-green-400"></div>
                        <div className="text-sm">
                          Cancellation fee only free if you cancel before 24
                          hours the session start.
                        </div>
                      </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={cancelSessions}
                        className={cn("flex items-center w-[119px]")}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
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
