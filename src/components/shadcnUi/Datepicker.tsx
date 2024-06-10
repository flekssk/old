/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { ru } from "date-fns/locale";

import { cn } from "@/utils/utils";
import { Button } from "./Button";
import { Calendar } from "./Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

type Props = {
  className?: string;
  date?: DateRange;
  onChangeDate: SelectRangeEventHandler;
  minDate?: Date;
  maxDate?: Date;
};

export function DatePickerWithRange({
  className,
  date,
  onChangeDate,
  minDate,
  maxDate,
}: Props) {
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
                  {format(date.from, "LLL dd, y", {
                    locale: ru,
                  })}{" "}
                  -{" "}
                  {format(date.to, "LLL dd, y", {
                    locale: ru,
                  })}
                </>
              ) : (
                format(date.from, "LLL dd, y", {
                  locale: ru,
                })
              )
            ) : (
              <span>Выберите дату</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={ru}
            initialFocus
            mode="range"
            className="bg-white"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onChangeDate}
            numberOfMonths={2}
            disabled={(date) =>
              (minDate && date < minDate) || (maxDate && date > maxDate)
                ? true
                : false
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
