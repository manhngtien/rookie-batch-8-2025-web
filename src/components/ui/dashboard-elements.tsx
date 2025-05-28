import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { CalendarIcon, Funnel, Search } from "lucide-react";
import type { IconName } from "lucide-react/dynamic";
import { DynamicIcon } from "lucide-react/dynamic";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn, kebabCase } from "@/lib/utils";

import { Button } from "./button";
import { Calendar as CalendarComponent } from "./calendar";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

function PageTitle({ children }: { children: string }) {
  return <h1 className="text-2xl font-bold text-red-600">{children}</h1>;
}

function CreateButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      id={`${kebabCase(props.children!.toString())}-create-button`}
      className={cn(
        "bg-red-600 text-white hover:cursor-pointer hover:bg-red-700",
        className,
      )}
    >
      {props.children || "Create New"}
    </Button>
  );
}

function ActionButton({
  className,
  iconName,
  ...props
}: React.ComponentProps<typeof Button> & {
  iconName: IconName;
}) {
  return (
    <Button
      {...props}
      id="edit-assignment-button"
      className="group/button hover:cursor-pointer"
      variant="ghost"
      size="icon"
    >
      <DynamicIcon
        name={iconName}
        className={cn(
          "transition-transform group-hover/button:scale-[1.2]",
          className,
        )}
      />
    </Button>
  );
}

function FilterButton({
  label = "Filter",
  options,
  defaultSelected = [],
  onChange,
  className,
}: React.ComponentProps<typeof Popover> & {
  label?: string;
  options: string[];
  defaultSelected?: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}) {
  const [selected, setSelected] = React.useState<string[]>(defaultSelected);
  const [indeterminate, setIndeterminate] = React.useState(false);

  const allSelected = selected.length === options.length;

  React.useEffect(() => {
    const isIndeterminate = selected.length > 0 && !allSelected;
    setIndeterminate(isIndeterminate);
    onChange(selected);
  }, [allSelected, onChange, selected]);

  const toggleAll = () => {
    setSelected(allSelected ? [] : [...options]);
  };

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="user-type-dropdown"
          variant="outline"
          className={cn(
            "max-w-full flex-1 justify-between text-black hover:cursor-pointer md:max-w-44",
            className,
          )}
        >
          {label}
          <Funnel color="black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-44 p-2" align="start">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="all"
              checked={allSelected || (indeterminate && "indeterminate")}
              onCheckedChange={toggleAll}
            />
            <label htmlFor="all">All</label>
          </div>
          {options.map((option) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={kebabCase(option) + "-sort"}
                checked={selected.includes(option)}
                onCheckedChange={() => toggleOption(option)}
              />
              <label htmlFor={kebabCase(option) + "-sort"}>{option}</label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function DetailDialog<T>({
  selectedEntity,
  closeModal,
  title,
  children,
}: React.ComponentProps<"div"> & {
  selectedEntity: T | null;
  closeModal: () => void;
}) {
  return (
    <Dialog open={!!selectedEntity} onOpenChange={closeModal}>
      <DialogContent className="max-w-2xl p-0 text-black">
        <DialogHeader className="w-full rounded-t-lg border-b-1 border-b-gray-400 bg-gray-100 p-4">
          <DialogTitle className="border-red-500 text-red-500">
            {title ?? "Detailed Information"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-8 pb-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

interface DateSelectorProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  title: string;
  className?: string;
}

function DateSelector({
  selectedDate,
  setSelectedDate,
  title,
  className,
}: DateSelectorProps) {
  const [open, setOpen] = useState(false);
  const currentYear = getYear(new Date());
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleYearChange = (year: string) => {
    const newYear = parseInt(year);
    let newDate: Date | null = selectedDate
      ? new Date(selectedDate)
      : new Date();
    newDate = setYear(newDate, newYear);

    if (newDate > new Date()) {
      newDate = new Date();
    }

    setSelectedDate(newDate);
  };

  const handleMonthChange = (month: string) => {
    const newMonth = months.indexOf(month);
    let newDate: Date | null = selectedDate
      ? new Date(selectedDate)
      : new Date();
    newDate = setMonth(newDate, newMonth);

    if (newDate > new Date()) {
      newDate = new Date();
    }

    setSelectedDate(newDate);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && date > new Date()) {
      setSelectedDate(new Date());
    } else {
      setSelectedDate(date ?? null);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={`${kebabCase(title)}-date-selector-button`}
          variant="outline"
          className={cn(
            "max-w-full flex-1 justify-between text-black md:max-w-44",
            className,
          )}
        >
          {selectedDate ? format(selectedDate, "dd/MM/yyyy") : title}
          <CalendarIcon className="ml-auto h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-10 w-auto rounded-md bg-white p-0 text-black shadow-md"
        align="start"
      >
        <div className="rounded-lg bg-white shadow-lg">
          <div className="flex justify-between p-2">
            <Select
              onValueChange={handleMonthChange}
              value={
                selectedDate
                  ? months[getMonth(selectedDate)]
                  : months[getMonth(new Date())]
              }
            >
              <SelectTrigger id="month-trigger" className="w-[110px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent id="month-content">
                {months.map((month) => (
                  <SelectItem id={`month-${month}`} key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleYearChange}
              value={
                selectedDate
                  ? getYear(selectedDate).toString()
                  : getYear(new Date()).toString()
              }
            >
              <SelectTrigger id="year-trigger" className="w-[110px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent
                id="year-content"
                className="max-h-100 overflow-y-auto"
              >
                {years.map((year) => (
                  <SelectItem
                    id={`year-${year}`}
                    key={year}
                    value={year.toString()}
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <CalendarComponent
            mode="single"
            onSelect={handleDateSelect}
            selected={selectedDate || undefined}
            initialFocus
            month={selectedDate || new Date()}
            onMonthChange={(newMonth) => setSelectedDate(newMonth)}
            toDate={new Date()}
            classNames={{
              day_selected: `bg-[#2F3132] border-[#2F3132] text-white`,
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative max-w-full min-w-25 md:max-w-50">
      <Input
        id="users-search-bar"
        className="max-w-full"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
      <Search className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 opacity-50" />
    </div>
  );
}

export {
  ActionButton,
  CreateButton,
  DateSelector,
  DetailDialog,
  FilterButton,
  PageTitle,
  SearchInput,
};
