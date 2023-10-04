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

function PlayTimeForm() {
  const [isDraggingFirst, setIsDraggingFirst] = useState<boolean>(false);
  const [isDraggingSecond, setIsDraggingSecond] = useState<boolean>(false);
  const { startTime, endTime, setStartTime, setEndTime, currentTimeSetting } =
    usePlayTimeForm((set) => set, shallow);

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
            setEndTime({
              type: currentTimeSetting,
              time: value,
            });
          }}
        />
      </div>
      <DialogFooter className="mt-10">
        <Button
          type="submit"
          onClick={() => {
            // setFormType("information-form");
          }}
        >
          Save change
        </Button>
      </DialogFooter>
    </SlideLeft>
  );
}

export default PlayTimeForm;
