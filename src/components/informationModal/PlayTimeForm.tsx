"use client";

import { useState } from "react";
import SlideLeft from "../animations/slide-left";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import CircularSlider from "@fseehawer/react-circular-slider";
import { formattedTimes, hour } from "@/constants/time";
import DayNightButton from "../dayNightButton/DayNightButton";

function PlayTimeForm() {
  const [isDraggingFirst, setIsDraggingFirst] = useState<boolean>(false);
  const [isDraggingSecond, setIsDraggingSecond] = useState<boolean>(false);
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
          dataIndex={0}
          label="Start"
          data={formattedTimes}
          labelColor="#00F5A0"
          valueFontSize="3rem"
          knobColor={isDraggingFirst ? "#F0A367" : "#00bfbd"}
          progressColorFrom={isDraggingFirst ? "#F0A367" : "#00bfbd"}
          progressColorTo={isDraggingFirst ? "#F65749" : "#009c9a"}
          progressSize={8}
          trackColor="#eeeeee"
          trackSize={4}
          isDragging={(value: any) => setIsDraggingFirst(value)}
        />
        <DayNightButton />
        <CircularSlider
          width={200}
          progressLineCap="flat"
          dataIndex={0}
          label="End"
          data={formattedTimes}
          labelColor="#00F5A0"
          valueFontSize="3rem"
          progressColorFrom={isDraggingSecond ? "#F0A367" : "#00bfbd"}
          progressColorTo={isDraggingSecond ? "#F65749" : "#009c9a"}
          knobColor={isDraggingSecond ? "#F0A367" : "#00bfbd"}
          progressSize={8}
          trackColor="#eeeeee"
          trackSize={4}
          isDragging={(value: any) => setIsDraggingSecond(value)}
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
