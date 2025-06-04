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
  FormLabel,
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
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(128, "First name must not exceed 128 characters")
    .regex(/^[a-zA-Z0-9 ]*$/, "First name must not contain special characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(128, "Last name must not exceed 128 characters")
    .regex(/^[a-zA-Z0-9 ]*$/, "Last name must not exceed 128 characters"),
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
  location: z.string().optional(),
});

interface UserFormProps {
  isEditing?: boolean;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel?: () => void;
  defaultValues?: z.infer<typeof formSchema>;
}

export default function UserForm({
  isEditing,
  onSubmit,
  onCancel,
  defaultValues,
}: UserFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      gender: undefined,
      type: "staff", // Set default type to "staff" for new users
      location: "",
    },
  });

  const [dobError, setDobError] = useState<string | null>(null);
  const [joinedDateError, setJoinedDateError] = useState<string | null>(null);

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const validateDates = (
    dob: Date | undefined,
    joinedDate: Date | undefined,
  ) => {
    setDobError(null);
    setJoinedDateError(null);

    if (dob) {
      const age = differenceInYears(new Date(), dob);
      if (age < 18) {
        setDobError("User is under 18. Please select a different date");
        return false;
      }
    }

    if (dob && joinedDate) {
      if (isBefore(joinedDate, dob)) {
        setJoinedDateError(
          "Joined date is not later than Date of Birth. Please select a different date",
        );
        return false;
      }

      const yearsBetween = differenceInYears(joinedDate, dob);
      if (yearsBetween < 18) {
        setJoinedDateError(
          "User must be at least 18 years old at the time of joining. Please select a different joined date",
        );
        return false;
      }

      if (isWeekend(joinedDate)) {
        setJoinedDateError(
          "Joined date is Saturday or Sunday. Please select a different date",
        );
        return false;
      }
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
  const type = form.watch("type");

  useEffect(() => {
    validateDates(dob, joinedDate);
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

    if (type === "admin" && !values.location) {
      return false;
    }

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
          render={({ field, fieldState }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <FormLabel className="text-sm font-medium">First Name</FormLabel>
              <div className="w-full">
                <FormControl>
                  <Input
                    id="first-name-input"
                    {...field}
                    maxLength={128}
                    className="w-full"
                    disabled={isEditing}
                  />
                </FormControl>
                {fieldState.error && (
                  <p className="mt-1 text-sm font-medium text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field, fieldState }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <FormLabel className="text-sm font-medium">Last Name</FormLabel>
              <div className="w-full">
                <FormControl>
                  <Input
                    id="last-name-input"
                    {...field}
                    maxLength={128}
                    className="w-full"
                    disabled={isEditing}
                  />
                </FormControl>
                {fieldState.error && (
                  <p className="mt-1 text-sm font-medium text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <FormLabel className="text-sm font-medium">
                Date of Birth
              </FormLabel>
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

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <FormLabel className="text-sm font-medium">Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
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

        <FormField
          control={form.control}
          name="joinedDate"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <FormLabel className="text-sm font-medium">Joined Date</FormLabel>
              <div className="w-full">
                <DateSelector
                  title="Joined Date"
                  selectedDate={field.value}
                  setSelectedDate={field.onChange}
                  className="w-full !max-w-full"
                  disableFutureDates={false}
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

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <FormLabel className="text-sm font-medium">Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toLowerCase() || "staff"} // Default to "staff"
              >
                <FormControl className="w-full">
                  <SelectTrigger id="user-type-select">
                    <SelectValue placeholder="" />
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

        {type === "admin" && !isEditing && (
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
                <FormLabel className="text-sm font-medium">Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger id="user-location-select">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HCM">Ho Chi Minh</SelectItem>
                    <SelectItem value="HN">Ha Noi</SelectItem>
                    <SelectItem value="DN">Da Nang</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="col-start-2" />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button
            id="user-create-save"
            type="submit"
            className="bg-red-600 text-white hover:cursor-pointer hover:bg-red-700"
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
