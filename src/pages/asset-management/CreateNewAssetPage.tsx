import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Category {
  value: string;
  label: string;
}

function CreateNewAssetPage() {
  const [date, setDate] = useState<Date>();
  const [categories, setCategories] = useState<Category[]>([
    { value: "electronics", label: "Electronics" },
    { value: "furniture", label: "Furniture" },
    { value: "equipment", label: "Equipment" },
  ]);
  const [selected, setSelected] = useState<string | undefined>();

  const handleAddCategory = () => {
    const newCategoryName = prompt("Enter new category name:");
    if (!newCategoryName) return;

    const formatted = newCategoryName.toLowerCase().replace(/\s+/g, "-");

    if (categories.some((c) => c.value === formatted)) {
      alert("Category already exists!");
      return;
    }

    const newCategory = {
      value: formatted,
      label: newCategoryName,
    };

    setCategories((prev) => [...prev, newCategory]);
    setSelected(newCategory.value); // optionally auto-select the new one
  };

  return (
    <div className="mx-auto max-w-md p-6 text-black">
      <h2 className="mb-6 text-2xl font-bold text-red-600">Create New Asset</h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Label htmlFor="name" className="w-32">
            Name
          </Label>
          <Input id="name" className="flex-1" />
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="category" className="w-32">
            Category
          </Label>

          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger id="select-category" className="flex-1">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}

              {/* "Add new category" at bottom (styled like item, but not selectable) */}
              <div
                className="hover:bg-muted text-foreground relative cursor-pointer px-2 py-1.5 text-sm select-none"
                onClick={handleAddCategory}
              >
                + Add new category
              </div>
            </SelectContent>
          </Select>

          {/* <Select>
            <SelectTrigger id="category" className="flex-1">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="specification" className="w-32">
            Specification
          </Label>
          <Input id="specification" className="flex-1" />
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="installedDate" className="w-32">
            Installed Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="installed-date"
                variant={"outline"}
                className={cn(
                  "flex-1 justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-32">State</Label>
          <RadioGroup defaultValue="available" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="available" id="available" />
              <Label htmlFor="available">Available</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-available" id="not-available" />
              <Label htmlFor="not-available">Not available</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-end space-x-4">
          <Button id="cancel-button" variant="outline">
            Cancel
          </Button>
          <Button
            id="save-button"
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewAssetPage;
