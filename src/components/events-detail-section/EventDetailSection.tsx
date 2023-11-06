"use client";

import EventControlZone from "./EventControlZone";
import EventTagScroll from "./EventTagScroll";
import { useEventDetail } from "@/hooks/useEventDetail";
import { EventRulesModal } from "../confirm-event-rules-modal/EventRulesModal";
import EventDiscussionZone from "./EventDiscussionZone";
import EventInformationZone from "./EventInformationZone";
import EventParticipate from "./EventParticipate";
import { Separator } from "../ui/separator";

const EventDetailSection = () => {
  const eventDetail = useEventDetail();

  return (
    <div
      className="mt-16 rounded-2xl pt-5 space-y-5 w-full py-10"
      id="event-section"
    >
      <EventRulesModal />
      <EventControlZone />
      <EventTagScroll />
      <div className="w-full mt-10 flex relative h-full space-x-6 ">
        {eventDetail.viewMode === "detail" ? (
          <EventInformationZone />
        ) : (
          <EventDiscussionZone />
        )}
        <div className="w-2/5 h-fit flex flex-col bottom-8 space-y-6 pl-3 sticky top-8">
          <EventParticipate />
          <div className="w-full card-container rounded-2xl py-4 h-fit px-6 overflow-hidden">
            <h1 className="font-bold text-xl text-white tracking-wider">
              Event Rules
            </h1>
            <Separator className="w-full bg-[rgba(138,147,153,0.6)] my-4" />
            {eventDetail.rules && eventDetail.rules.length > 0 ? (
              <div className="space-y-5 overflow-y-auto h-full">
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
