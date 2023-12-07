import { IoTimeOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { SelectSingleEventHandler } from "react-day-picker";
import { DateTime } from "luxon";
import { dayTimes } from "@/constants/time";
import findNearestTimeIndex from "@/lib/findNearestTimeIndex";
import findNearestTimeIndexInFuture from "@/lib/findNearestIndexInFuture";

const PickNewSchedule = ({
  time,
  setTime,
  dateNew,
  setDateNew,
  appointment_time,
}: {
  time: string | undefined;
  setTime: React.Dispatch<React.SetStateAction<string | undefined>>;
  dateNew: Date | undefined;
  setDateNew: React.Dispatch<React.SetStateAction<Date | undefined>>;
  appointment_time: string;
}) => {
  const handleChooseDate: SelectSingleEventHandler = (day, selected) => {
    const selectedDay = DateTime.fromJSDate(selected);
    setDateNew(selectedDay.toJSDate());
  };

  // if the date choose is also date in appointment + 24 hours => allow choose time after the time in appointment

  // if the date choose not date in appointment + 24 hours => allow choose time from 00:00

  const newDate = new Date(appointment_time);

  newDate.setDate(newDate.getDate() + 1);

  const indexNow = useMemo(() => {
    // increase appointment time by 1 day
    return findNearestTimeIndexInFuture(new Date(newDate), dateNew);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNew?.toDateString()]);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild className="z-10">
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal !my-4",
              !dateNew && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-5 h-5 mr-4" />
            {dateNew ? (
              DateTime.fromJSDate(dateNew).toFormat("DDD")
            ) : (
              <span>Choose session date...</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="w-auto p-0">
          <Calendar
            mode="single"
            onSelect={handleChooseDate}
            initialFocus
            fromDate={newDate}
          />
        </PopoverContent>
      </Popover>
      <Select
        onValueChange={(value) => {
          setTime(value);
        }}
      >
        <SelectTrigger className="w-full !mb-[8px] flex justify-between mt-4">
          <div className="flex items-center">
            <IoTimeOutline className="w-5 ml-1 mr-4 h-5" />
            <SelectValue
              className="w-full text-left flex-1"
              placeholder="Choose session time..."
            />
          </div>
        </SelectTrigger>
        <SelectContent
          side="bottom"
          className="max-h-[230px] overflow-y-hidden bg-background"
        >
          <SelectGroup>
            {dayTimes.map((item, index) => {
              if (index < indexNow) return;
              return (
                <SelectItem
                  key={index}
                  className="bg-background hover:bg-muted transition"
                  value={item}
                >
                  {item}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default PickNewSchedule;
