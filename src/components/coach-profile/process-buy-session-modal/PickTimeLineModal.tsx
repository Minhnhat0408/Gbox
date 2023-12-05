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
import Modal from "@/components/modals/Modal";
import { dayTimes } from "@/constants/time";
import { usePickTimeLineModal } from "@/hooks/usePickTimeLineModal";
import findNearestTimeIndex from "@/lib/findNearestTimeIndex";
import { useProcessBuySessionModal } from "@/hooks/useProcessBuySessionModal";

const PickTimeLineModal = () => {
  const { onClose, isOpen, reset, index, setDate, date, time, setTime } =
    usePickTimeLineModal();

  const { addSchedule } = useProcessBuySessionModal();

  const [tempTime, setTempTime] = useState<string | undefined>(undefined);

  const [tempDate, setTempDate] = useState<Date | undefined>(undefined);

  const close = () => {
    reset();
    onClose();
    setTempDate(undefined);
    setTempTime(undefined);
  };

  const onChange = (open: boolean) => {
    if (!open) {
      close();
    }
  };

  const handleChooseDate: SelectSingleEventHandler = (day, selected) => {
    const selectedDay = DateTime.fromJSDate(selected);
    setTempDate(selectedDay.toJSDate());
  };

  const indexNow = useMemo(() => {
    return findNearestTimeIndex(tempDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempDate?.toDateString()]);

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[450px] remove-button flex flex-col items-center p-7 bg-layout  !rounded-2xl gap-4"
    >
      <div className="w-full">
        <Popover>
          <PopoverTrigger asChild className="z-10">
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !tempDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="w-5 h-5 mr-4" />
              {tempDate ? (
                DateTime.fromJSDate(tempDate).toFormat("DDD")
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
              fromDate={new Date()}
              selected={new Date()}
            />
          </PopoverContent>
        </Popover>
        <Select
          onValueChange={(value) => {
            setTempTime(value);
          }}
        >
          <SelectTrigger className="w-full flex justify-between mt-4">
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
      </div>
      <div className="mt-3 w-full flex justify-end">
        <Button
          onClick={() => {
            close();
          }}
          className="bg-gray-700"
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button
          className="ml-3"
          onClick={() => {
            if (tempDate) {
              setDate(tempDate);
            }
            if (tempTime) {
              setTime(tempTime);
            }

            if (!tempDate || !tempTime || index === undefined) {
              return close();
            }

            addSchedule(
              {
                startTime: tempTime || time,
                date: tempDate || date,
              },
              index
            );
            close();
          }}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default PickTimeLineModal;
