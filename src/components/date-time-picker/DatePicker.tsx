import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { SelectSingleEventHandler } from "react-day-picker";
import { DateTime } from "luxon";

type DatePickerProps = {
  label: string;
  date: Date | null;
  setDate: (date: Date) => void;
};

function DatePicker({ label, date, setDate }: DatePickerProps) {
  const handleSelect: SelectSingleEventHandler = (day, selected) => {
    const selectedDay = DateTime.fromJSDate(selected);
    setDate(selectedDay.toJSDate());
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="z-10">
        <Button
          variant={"outline"}
          className={cn(
            "w-[250px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {date ? (
            DateTime.fromJSDate(date).toFormat("DDD")
          ) : (
            <span>{label}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="w-auto p-0">
        <Calendar
          mode="single"
          onSelect={handleSelect}
          initialFocus
          fromDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
