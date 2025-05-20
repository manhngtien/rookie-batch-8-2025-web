import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CreateNewAssetPage() {
  const [date, setDate] = React.useState<Date>();

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
          <Select>
            <SelectTrigger id="category" className="flex-1">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
            </SelectContent>
          </Select>
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
          <Button variant="outline">Cancel</Button>
          <Button className="bg-red-600 text-white hover:bg-red-700">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewAssetPage;
