import { format } from "date-fns";
import { Calendar, Funnel } from "lucide-react";
import type { IconName } from "lucide-react/dynamic";
import { DynamicIcon } from "lucide-react/dynamic";
import React from "react";

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

type FilterButtonItems = {
  title: string;
  // checked: boolean;
  // onCheckedChange: () => void;
};

function FilterButton({
  filterTitle,
  items,
  checkedItem,
  onCheckedItemChange,
}: React.ComponentProps<typeof Popover> & {
  filterTitle: string;
  items: FilterButtonItems[];
  checkedItem: "all" | number;
  onCheckedItemChange: (value: "all" | number) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="user-type-dropdown"
          variant="outline"
          className="max-w-44 justify-between text-black hover:cursor-pointer"
        >
          {filterTitle}
          <Funnel color="black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-2">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="all"
              checked={checkedItem === "all"}
              onCheckedChange={() => onCheckedItemChange("all")}
            />
            <label htmlFor="all">All</label>
          </div>
          {items.map((value, idx) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={kebabCase(value.title) + "-sort"}
                checked={checkedItem === idx}
                onCheckedChange={() => onCheckedItemChange(idx)}
              />
              <label htmlFor={kebabCase(value.title)}>{value.title}</label>
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
        <DialogHeader className="w-full rounded-t-lg border-b-1 border-b-gray-400 bg-gray-200 p-4">
          <DialogTitle className="border-red-500 text-red-500">
            {title || "Detailed Information"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-8 pb-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

function DateSelector({
  selectedDate,
  setSelectedDate,
  title,
}: {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  title: string;
}) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={`${kebabCase(title)}-date-selector-button`}
            variant="outline"
            className="max-w-44 justify-between text-black"
          >
            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : title}
            <Calendar className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-10 w-auto rounded-md bg-white p-0 text-black shadow-md"
          align="start"
        >
          <CalendarComponent
            mode="single"
            onSelect={(date) => setSelectedDate(date ?? null)}
            selected={selectedDate || undefined}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}

export {
  ActionButton,
  CreateButton,
  DateSelector,
  DetailDialog,
  FilterButton,
  type FilterButtonItems,
  PageTitle,
};
