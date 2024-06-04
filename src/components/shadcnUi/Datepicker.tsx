/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange, SelectRangeEventHandler } from "react-day-picker";

import { cn } from "@/utils/utils";
import { Button } from "./Button";
import { Calendar } from "./Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

type Props = {
  className?: string;
  date?: DateRange;
  onChangeDate: SelectRangeEventHandler;
};

export function DatePickerWithRange({ className, date, onChangeDate }: Props) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Выберите дату</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            className="bg-white"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onChangeDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
