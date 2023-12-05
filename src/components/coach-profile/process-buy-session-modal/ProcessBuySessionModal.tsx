import { IoMdInformationCircle } from "react-icons/io";
import { ActionTooltip } from "@/components/action-tooltips/ActionToolTips";
import Modal from "@/components/modals/Modal";
import { useCoachProfile } from "@/hooks/useCoachDetail";
import { useProcessBuySessionModal } from "@/hooks/useProcessBuySessionModal";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsClamped } from "@/hooks/useIsClamped";
import { Separator } from "@/components/ui/separator";
import ScheduleSession from "./ScheduleSession";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { convertScheduleDateToRefundPolicy } from "@/lib/convertScheduleDateToRefundPolicy";
import { convertScheduleToDateArray } from "@/lib/convertScheduleToDateObject";
import LoadingAnimation from "@/components/loading-components/LoadingAnimation";
import { wait } from "@/lib/wait";
import uuid from "react-uuid";

const ProcessBuySessionModal = () => {
  const {
    isOpen,
    onClose,
    reset,
    courseData,
    quantity,
    setQuantity,
    schedules,
  } = useProcessBuySessionModal();

  const { data } = useCoachProfile();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
      setOpen(false);
    }
  };

  // count total schedule not empty
  const totalSchedule = schedules.filter((schedule) => schedule !== undefined);

  const { userDetails } = useUser();

  const ref = useRef<HTMLDivElement>(null);

  const isClamped = useIsClamped(ref);

  const { supabaseClient } = useSessionContext();

  if (!courseData) return null;

  if (!userDetails) return null;

  const handlePayment = async () => {
    if (totalSchedule.length === 0) {
      toast.error("Please select time for your session");
      return;
    }
    if (totalSchedule.length * courseData.price > userDetails?.gbox_money!) {
      toast.error("You don't have enough money");
      return;
    }
    // TODO: create request for session to coach
    try {
      setLoading(true);

      let selectedSchedule = schedules.filter(
        (schedule) => schedule !== undefined && schedule !== null
      );

      const { error } = await supabaseClient
        .from("appointment_request")
        .insert({
          created_at: new Date(),
          modified_at: new Date(),
          request_user_id: userDetails.id,
          course_id: courseData.id,
          coach_id: courseData.coach_id,
          coach_profile_id: courseData.coach_profile_id,
          money_hold: selectedSchedule.length * courseData.price,
          sessions: convertScheduleToDateArray(selectedSchedule),
        });

      if (error) {
        setLoading(false);
        throw error;
      }

      const { error: errorMoney } = await supabaseClient
        .from("profiles")
        .upsert({
          id: userDetails.id,
          gbox_money:
            userDetails.gbox_money! -
            selectedSchedule.length * courseData.price,
        });

      if (errorMoney) {
        setLoading(false);
        throw errorMoney;
      }
      //TODO: update user money

      // TODO: create notification to coach
      const createCoachNotification = await supabaseClient
        .from("notifications")
        .insert({
          id:
            uuid() +
            "_" +
            data.id +
            "_" +
            userDetails.id +
            "_appointment-receive",
          created_at: new Date(),
          content: `You have a new appointment request from ${userDetails.name}`,
          link_to: "/request-history/booking",
          sender_id: userDetails.id,
          receiver_id: data.profiles.id,
          notification_meta_data: {
            sender_name: userDetails.name,
            sender_avatar: userDetails.avatar,
          },
          notification_type: "appointment_request_receive",
        });

      toast.success(
        "Request send to coach successfully! This will expire in 24 hours and you'll be refunded if not accepted"
      );
      onClose();
      reset();
      setOpen(false);

      if (createCoachNotification.error) {
        setLoading(false);
        throw createCoachNotification.error;
      }

      setLoading(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[1000px] remove-button overflow-hidden flex flex-col items-center !p-0  !rounded-2xl gap-4"
    >
      <div className="w-full h-full relative">
        {loading && (
          <div className="center absolute bg-black/40 top-0 right-0 z-50 left-0 bottom-0">
            <LoadingAnimation
              className="w-20 h-20 text-primary"
              fill="#00F0FF"
            />
          </div>
        )}
        <div className="w-full h-full pt-8 px-10 py-24 gap-4 flex  flex-col max-h-[90vh] overflow-y-scroll rounded-2xl">
          <h1 className="super font-bold text-3xl w-full text-center">
            Schedule & Payment
          </h1>
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-x-4">
              <Image
                src={data.profiles.avatar!}
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                className="w-16 h-16 rounded-full"
              />
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-xl mb-1">{data.profiles.name}</h4>
                <div className="text-zinc-400 gap-x-3 flex text-sm">
                  <span>Live Sessions ({courseData?.duration}) </span>
                  <ActionTooltip
                    side="bottom"
                    className="bg-layout"
                    label={
                      <div className="text-xs w-[200px]">
                        Live 1:1 sessions are calls with the expert during which
                        they share their wisdom with you as you play.
                      </div>
                    }
                  >
                    <span>
                      <IoMdInformationCircle className="text-green-400 text-xl cursor-pointer" />
                    </span>
                  </ActionTooltip>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6 items-center w-full">
            <div className="flex items-center gap-x-4">
              <Image
                src={courseData?.game_meta_data.image}
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                className="w-12 h-12 rounded-lg"
              />
              <div className="uppercase max-w-[80%] text-lg font-bold">
                {courseData.name}
              </div>
            </div>
            <div className="py-2 px-3 flex w-[200px] bg-gray-600 select-none justify-between items-center rounded-lg">
              <FaMinus
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
                className="text-zinc-200 text-xl cursor-pointer"
              />
              <div className="w-10 text-center text-lg">{quantity}</div>
              <FaPlus
                onClick={() => {
                  if (
                    quantity < 10 &&
                    quantity * courseData.price < userDetails?.gbox_money!
                  ) {
                    setQuantity(quantity + 1);
                  }
                }}
                className="text-zinc-200 text-xl cursor-pointer"
              />
            </div>
          </div>
          <div className="w-full">
            <div
              ref={ref}
              className={cn("w-full text-left line-clamp-3 mt-4 mb-1", {
                "line-clamp-none": open,
              })}
            >
              {courseData.description}
            </div>
            {isClamped && (
              <div className="flex justify-start w-full">
                {!open ? (
                  <div
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="text-primary cursor-pointer select-none"
                  >
                    View More
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="text-primary cursor-pointer select-none"
                  >
                    View Less
                  </div>
                )}
              </div>
            )}
          </div>
          <Separator className="bg-zinc-400 my-2" />
          <h2 className="uppercase w-full mb-3 font-bold">Sessions</h2>
          <div className="flex flex-col gap-y-3 w-full">
            {quantity > 0 ? (
              Array.from({ length: quantity }).map((_, i) => (
                <ScheduleSession key={i} index={i} />
              ))
            ) : (
              <ScheduleSession index={0} />
            )}
          </div>
          <div
            onClick={() => {
              if (
                quantity < 10 &&
                quantity * courseData.price < userDetails?.gbox_money!
              ) {
                setQuantity(quantity + 1);
              }
            }}
            className="w-full center mt-2 cursor-pointer items-center rounded-xl bg-zinc-800 p-4"
          >
            <div className="flex items-center">
              <FaPlus className="text-green-400 text-lg" />
              <div className="text-white ml-2">Add more session</div>
            </div>
          </div>
        </div>
        <div className="flex w-full right-0 left-0 py-4 px-10 bg-background absolute bottom-0 rounded-b-xl mt-3 justify-between items-center">
          <div className="flex flex-col gap-y-1">
            <div className="">Total</div>
            <div className="text-2xl flex items-center font-bold">
              <span>{totalSchedule.length * courseData.price} </span>
              <span className="text-[#3DBDA7] text-2xl ml-2">G</span>
            </div>
          </div>
          <Button
            onClick={handlePayment}
            className="w-[200px] shine"
            size={"lg"}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProcessBuySessionModal;
