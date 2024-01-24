import { useEventFormBodyModal } from "@/hooks/useEventFormBody";
import { useEffect, useMemo, useState } from "react";
import { shallow } from "zustand/shallow";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { SelectSingleEventHandler } from "react-day-picker";
import { DateTime } from "luxon";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { dayTimes } from "@/constants/time";
import findNearestTimeIndex from "@/lib/findNearestTimeIndex";

function PickTimeline() {
  const {
    setStartDate,
    setEndDate,
    endDate,
    endTime,
    startDate,
    startTime,
    setStartTime,
    setEndTime,
    error,
    setError,
  } = useEventFormBodyModal((set) => set, shallow);

  const indexNow = useMemo(() => {
    return findNearestTimeIndex(startDate);
  }, [startDate?.toDateString()]);

  const endIndexNow = useMemo(() => {
    return findNearestTimeIndex(endDate);
  }, [endDate?.toDateString()]);

  useEffect(() => {
    if (!endDate) {
      setEndDate(startDate);
    }
  }, [startDate?.toDateString()]);

  const [open, setOpen] = useState(false);

  const handleSelectStartDate: SelectSingleEventHandler = (day, selected) => {
    const selectedDay = DateTime.fromJSDate(selected);
    setError({ ...error, startDate: null });
    setStartDate(selectedDay.toJSDate());
  };

  const handleSelectEndDate: SelectSingleEventHandler = (day, selected) => {
    const selectedDay = DateTime.fromJSDate(selected);
    setEndDate(selectedDay.toJSDate());
    setError({ ...error, endDate: null });
  };

  return (
    <div className="space-y-4">
      <div className="flex w-full gap-x-4">
        <Popover>
          <PopoverTrigger asChild className="z-10">
            <Button
              variant={"outline"}
              className={cn(
                "w-[80%] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="w-5 h-5 mr-4" />
              {startDate ? (
                DateTime.fromJSDate(startDate).toFormat("DDD")
              ) : (
                <span>Event start date...</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" className="w-auto p-0">
            <Calendar
              mode="single"
              onSelect={handleSelectStartDate}
              initialFocus
              fromDate={new Date()}
              selected={startDate!}
            />
          </PopoverContent>
        </Popover>
        <Select
          onValueChange={(value) => {
            setStartTime(value);
            setError({ ...error, startTime: null });
          }}
          value={startTime !== null ? startTime : undefined}
        >
          <SelectTrigger className="w-[278px]">
            <SelectValue className="" placeholder="Event start time..." />
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
      </div>
      {(error.startDate || error.startTime) && (
        <div className="text-red-400 font-bold">
          {error.startDate || error.startTime}
        </div>
      )}
      {open ? (
        <div
          onClick={() => {
            setOpen(false);
          }}
          className="flex text-sm items-center cursor-pointer w-[200px] text-emerald-400 font-bold"
        >
          <FaMinus className="text-sm text-emerald-400 mr-1 font-bold" />
          <span>Event end date and time</span>
        </div>
      ) : (
        <div
          onClick={() => {
            setOpen(true);
          }}
          className="flex text-sm items-center cursor-pointer w-[200px] text-emerald-400 font-bold"
        >
          <FaPlus className="text-sm text-emerald-400 mr-1 font-bold" />
          <span>Event end date and time</span>
        </div>
      )}
      {open && (
        <div className="flex w-full gap-x-4">
          <Popover>
            <PopoverTrigger asChild className="z-10">
              <Button
                variant={"outline"}
                className={cn(
                  "w-[80%] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="w-5 h-5 mr-4" />
                {endDate ? (
                  DateTime.fromJSDate(endDate).toFormat("DDD")
                ) : (
                  <span>Event end date...</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="w-auto p-0">
              <Calendar
                mode="single"
                onSelect={handleSelectEndDate}
                initialFocus
                selected={endDate!}
                fromDate={startDate!}
              />
            </PopoverContent>
          </Popover>
          <Select
            value={endTime !== null ? endTime : undefined}
            onValueChange={(value) => {
              setEndTime(value);
              setError({ ...error, endTime: null });
            }}
          >
            <SelectTrigger className="w-[278px]">
              <SelectValue className="" placeholder="Event end time..." />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              className="max-h-[230px] overflow-y-hidden bg-background"
            >
              <SelectGroup>
                {dayTimes.map((item, index) => {
                  if (index < endIndexNow) return;
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
        </div>
      )}
    </div>
  );
}

export default PickTimeline;
