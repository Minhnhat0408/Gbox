import { IoMdInformationCircle } from "react-icons/io";
import { FaClockRotateLeft } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePickTimeLineModal } from "@/hooks/usePickTimeLineModal";
import { useProcessBuySessionModal } from "@/hooks/useProcessBuySessionModal";
import { convertScheduleDateToRefundPolicy } from "@/lib/convertScheduleDateToRefundPolicy";
import { convertStarttimeAndDurationToString } from "@/lib/convertStarttimeAndDurationToString";
import { Trash } from "lucide-react";
import { FaCalendarAlt } from "react-icons/fa";
import { ActionTooltip } from "@/components/action-tooltips/ActionToolTips";

const ScheduleSession = ({ index }: { index: number }) => {
  const { onOpen } = usePickTimeLineModal();

  const { schedules, setQuantity, courseData, quantity, removeSchedule } =
    useProcessBuySessionModal();

  if (!courseData) return null;

  const schedule = schedules[index];

  // schedule: type Schedule = {
  //   startTime: string;
  //   date: Date;
  // };

  return (
    <div className="flex flex-col bg-zinc-900 rounded-xl items-center p-4">
      <div className="w-full flex ">
        <div className="w-14 h-14 center">
          {schedule ? (
            <div className="flex flex-col items-center">
              {/* display day and month */}
              <h3 className="leading-none tracking-0.01 mb-2 font-semibold">
                {schedule.date.getDate()}
              </h3>
              <h3 className="text-sm leading-none">
                {schedule.date.toLocaleString("default", { month: "short" })}
              </h3>
            </div>
          ) : (
            <FaCalendarAlt className="text-2xl text-zinc-600" />
          )}
        </div>
        <div className="flex-1 pl-3 flex w-full items-center">
          {schedule ? (
            <div className="flex flex-col ml-2">
              <div className="leading-none tracking-0.01 mb-3 font-semibold">
                {convertStarttimeAndDurationToString(
                  schedule.startTime,
                  courseData?.duration
                )}
              </div>
              <div className="text-sm leading-none">{courseData.duration}</div>
              {/* TODO: reschedule for 2 case => 24 hours from now and future  */}
              {/* TODO: add to notion logic */}
            </div>
          ) : (
            <h3 className="text-white ml-2 font-medium">
              Schedule your session
            </h3>
          )}
          <div className="ml-auto pr-3 flex w-auto">
            {schedule ? (
              <div
                onClick={() => {
                  setQuantity(quantity - 1);
                  removeSchedule(index);
                }}
                className="w-8 cursor-pointer h-8 center bg-gray-600 rounded-lg"
              >
                <Trash className="text-white text-xs w-4 h-4" />
              </div>
            ) : (
              <Button
                onClick={() => {
                  onOpen(index);
                }}
              >
                Pick a time
              </Button>
            )}
          </div>
        </div>
      </div>
      {schedule && (
        <>
          <Separator className="bg-zinc-800 mt-4 mb-3" />
          <div className="w-full flex gap-x-2 items-center">
            <span>
              <FaClockRotateLeft className="text-green-400 text-sm" />
            </span>
            {convertScheduleDateToRefundPolicy(
              schedule.date,
              schedule.startTime
            )}
            <ActionTooltip
              className="bg-layout"
              label={
                <div className="text-xs text-left leading-[140%] tracking-0.01 pt-1 pb-2 pr-1">
                  <h1 className="super font-medium mb-3">Cancelation policy</h1>
                  <ul className="max-w-[15.75rem] space-y-2">
                    <li className="flex space-x-2">
                      <div className="h-1 w-1 shrink-0 bg-green-400 rounded-full mt-[0.4rem]"></div>
                      <p className="text-ondark-primary">
                        Cancel or reschedule your session for free up to 24
                        hours ahead of the start time.
                      </p>
                    </li>
                    <li className="flex space-x-2">
                      <div className="h-1 w-1 shrink-0 bg-green-400 rounded-full mt-[0.4rem]"></div>
                      <p className="text-ondark-primary">
                        50% of the lesson price is applied as a fee to
                        reschedule or cancel a session within 24 hours of the
                        start time.
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
        </>
      )}
    </div>
  );
};

export default ScheduleSession;
