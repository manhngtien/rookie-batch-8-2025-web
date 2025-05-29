import type React from "react";

import { kebabCase } from "@/lib/utils";

import { FormControl, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";

// TODO: Separate more stuff here

function OneLineFormControl({
  label,
  children,
}: React.ComponentProps<typeof FormItem> & {
  label: string;
}) {
  return (
    <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
      <FormLabel className="m-0 text-sm font-medium text-black">
        {label}
      </FormLabel>
      <FormControl>{children}</FormControl>
      <FormMessage className="col-start-2" />
    </FormItem>
  );
}

function TextInput({
  label,
  control,
}: React.ComponentProps<typeof FormItem> & {
  label: string;
  control: React.ComponentProps<typeof Input>;
}) {
  return (
    <OneLineFormControl label={label}>
      <Input id={kebabCase(label) + "-input"} {...control} className="w-full" />
    </OneLineFormControl>
  );
}

export { OneLineFormControl, TextInput };
