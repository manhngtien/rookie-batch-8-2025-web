import { Funnel } from "lucide-react";
import React from "react";

import { kebabCase } from "@/lib/utils";

import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

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
