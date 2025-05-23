import { Funnel } from "lucide-react";
import type { IconName } from "lucide-react/dynamic";
import { DynamicIcon } from "lucide-react/dynamic";
import React from "react";

import { cn } from "@/lib/utils";
import { kebabCase } from "@/lib/utils";

import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function PageTitle({ children }: { children: string }) {
  return <h1 className="text-2xl font-bold text-red-600">{children}</h1>;
}

export function ActionButton({
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

export type FilterButtonItems = {
  title: string;
  // checked: boolean;
  // onCheckedChange: () => void;
};

export function FilterButton({
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
