"use client";

import { useState } from "react";
import SlideLeft from "../animations/slide-left";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import CircularSlider from "@fseehawer/react-circular-slider";
import { formattedTimes } from "@/constants/time";
import DayNightButton from "../dayNightButton/DayNightButton";
import { usePlayTimeForm } from "@/hooks/usePlayTimeForm";
import { shallow } from "zustand/shallow";
import TimeDisplay from "../timeDisplay/TimeDisplay";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { alertUser } from "./InformationModal";

function PlayTimeForm() {
  const [isDraggingFirst, setIsDraggingFirst] = useState<boolean>(false);
  const [isDraggingSecond, setIsDraggingSecond] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("Please select your time range");

  const { startTime, endTime, setStartTime, setEndTime, currentTimeSetting } =
    usePlayTimeForm((set) => set, shallow);

  const { supabaseClient } = useSessionContext();

  const user = useUser();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const { data, error } = await supabaseClient
      .from("profiles")
      .update({
        play_time: [startTime, endTime],
      })
      .eq("id", user?.id);
    if (error) setError(error.message);
    window.removeEventListener("beforeunload", alertUser);
    // window reload
    setIsSubmitting(false);
    window.location.reload();
  };

  return (
    <SlideLeft>
      <DialogHeader>
        <DialogTitle className="mb-5 text-3xl capitalize">
          {"When do you often play game ?"}
        </DialogTitle>
      </DialogHeader>
      <div className="flex justify-between my-6">
        <CircularSlider
          width={200}
          progressLineCap="flat"
          dataIndex={36}
          label="Start"
          data={formattedTimes}
          renderLabelValue={
            <TimeDisplay
              isDragging={isDraggingFirst}
              time={startTime.time}
              type={startTime.type}
              color="#F0A367"
              dragColor="#f7b733"
              label="From"
            />
          }
          appendToValue={startTime.type}
          knobColor={isDraggingFirst ? "#ff9966" : "#fcb69f"}
          progressColorFrom={isDraggingFirst ? "#f7b733" : "#fcb69f"}
          progressColorTo={isDraggingFirst ? "#ff9966" : "#F0A367"}
          progressSize={8}
          trackColor="#eeeeee"
          trackSize={4}
          isDragging={(value: any) => setIsDraggingFirst(value)}
          onChange={(value: string) => {
            setError("");
            setStartTime({
              type: currentTimeSetting,
              time: value,
            });
          }}
        />
        <DayNightButton />
        <CircularSlider
          width={200}
          progressLineCap="flat"
          dataIndex={36}
          label="End"
          data={formattedTimes}
          valueFontSize="3rem"
          appendToValue={endTime.type}
          progressColorFrom={isDraggingSecond ? "#48c6ef" : "#48c6ef"}
          progressColorTo={isDraggingSecond ? "#89f7fe" : "#749DD6"}
          knobColor={isDraggingSecond ? "#48c6ef" : "#749DD6"}
          progressSize={8}
          trackColor="#eeeeee"
          renderLabelValue={
            <TimeDisplay
              isDragging={isDraggingSecond}
              dragColor="#b7f8db"
              color="#48c6ef"
              time={endTime.time}
              type={endTime.type}
              label="To"
            />
          }
          trackSize={4}
          isDragging={(value: any) => setIsDraggingSecond(value)}
          onChange={(value: string) => {
            setError("");
            setEndTime({
              type: currentTimeSetting,
              time: value,
            });
          }}
        />
      </div>
      <DialogFooter className=" relative items-center w-full mt-4">
        {error !== "" && (
          <p className="absolute left-0 max-w-[450px] self-start mt-2 font-bold text-red-400 truncate">
            {error}
          </p>
        )}
        {isSubmitting ? (
          <Button
            type="button"
            disabled
            className="disabled:opacity-25 flex items-center justify-center w-[125px]"
          >
            <AiOutlineLoading3Quarters className="animate-spin mr-3" />
            <p>Loading</p>
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit}
            className={`"opacity-0"} flex items-center justify-center w-[125px]`}
          >
            Save change
          </Button>
        )}
      </DialogFooter>
    </SlideLeft>
  );
}

export default PlayTimeForm;
