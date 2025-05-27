import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInYears, isBefore, isWeekend } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DateSelector } from "@/components/ui/dashboard-elements";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Gender is required",
  }),
  joinedDate: z.date({
    required_error: "Joined date is required",
  }),
  type: z.string({
    required_error: "Type is required",
  }),
});

interface CreateUserFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel?: () => void;
}

export default function CreateUserForm({
  onSubmit,
  onCancel,
}: CreateUserFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      type: "",
    },
  });

  const [dobError, setDobError] = useState<string | null>(null);
  const [joinedDateError, setJoinedDateError] = useState<string | null>(null);

  const validateDates = (
    dob: Date | undefined,
    joinedDate: Date | undefined,
  ) => {
    setDobError(null);
    setJoinedDateError(null);

    if (!dob || !joinedDate) return;

    const age = differenceInYears(new Date(), dob);
    if (age < 18) {
      setDobError("User is under 18. Please select a different date");
      return false;
    }

    if (isBefore(joinedDate, dob)) {
      setJoinedDateError(
        "Joined date is not later than Date of Birth. Please select a different date",
      );
      return false;
    }

    if (isWeekend(joinedDate)) {
      setJoinedDateError(
        "Joined date is Saturday or Sunday. Please select a different date",
      );
      return false;
    }

    return true;
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const isValid = validateDates(values.dateOfBirth, values.joinedDate);
    if (isValid) {
      onSubmit(values);
    }
  };

  const dob = form.watch("dateOfBirth");
  const joinedDate = form.watch("joinedDate");

  useEffect(() => {
    if (dob && joinedDate) {
      validateDates(dob, joinedDate);
    }
  }, [dob, joinedDate]);

  const isFormComplete = () => {
    const values = form.getValues();
    const requiredFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "joinedDate",
      "type",
    ];

    const allFieldsFilled = requiredFields.every(
      (field) => values[field as keyof typeof values],
    );

    return allFieldsFilled && !dobError && !joinedDateError;
  };

  return (
    <Form {...form}>
      <form
        id="create-user-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 text-black"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <div className="text-sm font-medium">First Name</div>
              <FormControl>
                <Input id="first-name-input" {...field} className="w-full" />
              </FormControl>
              <FormMessage className="col-start-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <div className="text-sm font-medium">Last Name</div>
              <FormControl>
                <Input id="last-name-input" {...field} className="w-full" />
              </FormControl>
              <FormMessage className="col-start-2" />
            </FormItem>
          )}
        />

        {/* Date of Birth */}
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <div className="text-sm font-medium">Date of Birth</div>
              <div className="w-full">
                <DateSelector
                  title="Date of birth"
                  selectedDate={field.value}
                  setSelectedDate={field.onChange}
                  className="w-full !max-w-full"
                />
                {dobError && (
                  <p className="mt-1 text-sm font-medium text-red-500">
                    {dobError}
                  </p>
                )}
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <div className="text-sm font-medium">Gender</div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" className="" />
                    <label htmlFor="female" className="text-sm">
                      Female
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <label htmlFor="male" className="text-sm">
                      Male
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage className="col-start-2" />
            </FormItem>
          )}
        />

        {/* Joined Date */}
        <FormField
          control={form.control}
          name="joinedDate"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <div className="text-sm font-medium">Joined Date</div>
              <div className="w-full">
                <DateSelector
                  title="Joined Date"
                  selectedDate={field.value}
                  setSelectedDate={field.onChange}
                  className="w-full !max-w-full"
                />
                {joinedDateError && (
                  <p className="mt-1 text-sm font-medium text-red-500">
                    {joinedDateError}
                  </p>
                )}
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <div className="text-sm font-medium">Type</div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger id="user-type-select">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="col-start-2" />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            id="user-create-save"
            type="submit"
            className="bg-red-600 text-white hover:bg-red-700"
            disabled={!isFormComplete()}
          >
            Save
          </Button>
          <Button
            id="user-create-cancel"
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
