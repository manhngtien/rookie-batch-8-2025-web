import { format, getYear } from "date-fns";
import { CalendarIcon, ChevronDown, Funnel, Search } from "lucide-react";
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
  disableFutureDates?: boolean;
  defaultToToday?: boolean;
}

function DateSelector({
  selectedDate,
  setSelectedDate,
  title,
  className,
  disableFutureDates = true,
  defaultToToday = false,
}: DateSelectorProps) {
  const [open, setOpen] = useState(false);
  const currentYear = getYear(new Date());

  const handleDateSelect = (date: Date | undefined) => {
    if (disableFutureDates && date && date > new Date()) {
      setSelectedDate(new Date());
    } else {
      setSelectedDate(date ?? null);
    }
    setOpen(false);
  };

  React.useEffect(() => {
    if (defaultToToday && !selectedDate) {
      setSelectedDate(new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultToToday]);

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
          <CalendarComponent
            mode="single"
            classNames={{
              caption_dropdowns: "flex flex-col gap-2 items-center",
              caption_label: "hidden",
            }}
            onSelect={handleDateSelect}
            selected={selectedDate || undefined}
            initialFocus
            month={selectedDate || new Date()}
            onMonthChange={(newMonth) => setSelectedDate(newMonth)}
            toDate={disableFutureDates ? new Date() : undefined}
            captionLayout="dropdown-buttons"
            fromYear={currentYear - 100}
            toYear={currentYear + 20}
            components={{
              Dropdown: ({ className, ...props }) => (
                <div className="relative w-full flex-1">
                  <select
                    id={`calendar-${props.name}-select`}
                    className={cn(
                      "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex w-full appearance-none items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 pr-9 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                      className,
                    )}
                    {...props}
                  />
                  <ChevronDown className="pointer-events-none absolute top-2.5 right-3 h-4 w-4" />
                </div>
              ),
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SearchInput({ ...props }: React.ComponentProps<typeof Input>) {
  return (
    <div
      className={cn(
        "relative w-full min-w-25 flex-1 text-black",
        props.className,
      )}
    >
      <Input
        id={props.id || "search-input"}
        className="w-full pr-9"
        placeholder="Search..."
        {...props}
      />
      <Search className="pointer-events-none absolute top-2.5 right-3 h-4 w-4" />
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
