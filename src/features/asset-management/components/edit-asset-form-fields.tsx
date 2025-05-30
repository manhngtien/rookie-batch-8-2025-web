import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { DateSelector } from "@/components/ui/dashboard-elements";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { editFormSchema } from "@/pages/asset-management/EditAssetPage";

interface EditAssetFormFieldsProps {
  form: UseFormReturn<z.infer<typeof editFormSchema>>;
}

export const EditAssetFormFields: React.FC<EditAssetFormFieldsProps> = ({
  form,
}) => {
  return (
    <>
      {/* Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <FormControl>
              <Input id="asset-name" {...field} className="w-full" />
            </FormControl>
            <FormMessage className="col-start-2" />
          </FormItem>
        )}
      />

      {/* Category */}
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="category" className="text-sm font-medium">
              Category
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={true}>
                <Button
                  id="category"
                  variant="outline"
                  className="w-full justify-between text-left"
                >
                  {field.value || "Select category"}
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </FormItem>
        )}
      />
      {/* Specification */}
      <FormField
        control={form.control}
        name="specification"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="specification" className="text-sm font-medium">
              Specification
            </Label>
            <FormControl>
              <Input id="specification" {...field} className="w-full" />
            </FormControl>
            <FormMessage className="col-start-2" />
          </FormItem>
        )}
      />
      {/* Installed Date */}
      <FormField
        control={form.control}
        name="installedDate"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="installedDate" className="text-sm font-medium">
              Installed Date
            </Label>
            <div className="w-full">
              <DateSelector
                title="Installed Date"
                selectedDate={field.value}
                setSelectedDate={field.onChange}
                className="w-full !max-w-full"
              />
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* State */}
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[120px_1fr] items-start gap-4">
            <Label className="text-sm font-medium">State</Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="available" id="available" />
                  <Label htmlFor="available" className="text-sm">
                    Available
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not_available" id="not_available" />
                  <Label htmlFor="not_available" className="text-sm">
                    Not available
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="waiting_for_recycling"
                    id="waiting_for_recycling"
                  />
                  <Label htmlFor="waiting_for_recycling" className="text-sm">
                    Waiting for recycling
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recycled" id="recycled" />
                  <Label htmlFor="recycled" className="text-sm">
                    Recycled
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage className="col-start-2" />
          </FormItem>
        )}
      />
    </>
  );
};
