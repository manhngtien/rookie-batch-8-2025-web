"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format, isWeekend, differenceInYears, isBefore } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  gender: z.enum(["female", "male"], {
    required_error: "Gender is required",
  }),
  joinedDate: z.date({
    required_error: "Joined date is required",
  }),
  type: z.string({
    required_error: "Type is required",
  }),
})

export default function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      type: "",
    },
  })

  const [dobError, setDobError] = useState<string | null>(null)
  const [joinedDateError, setJoinedDateError] = useState<string | null>(null)

  const validateDates = (dob: Date | undefined, joinedDate: Date | undefined) => {
    // Reset errors
    setDobError(null)
    setJoinedDateError(null)

    if (!dob || !joinedDate) return

    // Check if user is at least 18 years old
    const age = differenceInYears(new Date(), dob)
    if (age < 18) {
      setDobError("User is under 18. Please select a different date")
      return false
    }

    // Check if joined date is earlier than DOB
    if (isBefore(joinedDate, dob)) {
      setJoinedDateError("Joined date is not later than Date of Birth. Please select a different date")
      return false
    }

    // Check if joined date is a weekend
    if (isWeekend(joinedDate)) {
      setJoinedDateError("Joined date is Saturday or Sunday. Please select a different date")
      return false
    }

    return true
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const isValid = validateDates(values.dateOfBirth, values.joinedDate)
    if (isValid) {
      console.log(values)
      // Submit the form data
      alert("User created successfully!")
    }
  }

  // Watch date fields to validate in real-time
  const dob = form.watch("dateOfBirth")
  const joinedDate = form.watch("joinedDate")

  useEffect(() => {
    if (dob && joinedDate) {
      validateDates(dob, joinedDate)
    }
  }, [dob, joinedDate])

  // Check if all required fields are filled
  const isFormComplete = () => {
    const values = form.getValues()
    const requiredFields = ["firstName", "lastName", "dateOfBirth", "gender", "joinedDate", "type"]

    const allFieldsFilled = requiredFields.every((field) => values[field as keyof typeof values])

    return allFieldsFilled && !dobError && !joinedDateError
  }

  return (
    <div className="min-w-md max-w-lg my-auto mx-auto p-6 bg-white">
      <h1 className="text-xl font-bold text-red-600 mb-6">Create New User</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-black">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="text-sm font-medium">First Name</div>
                <FormControl>
                  <Input {...field} className="w-full" />
                </FormControl>
                <FormMessage className="col-start-2" />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="text-sm font-medium">Last Name</div>
                <FormControl>
                  <Input {...field} className="w-full" />
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full justify-between pl-3 text-left font-normal ${
                            dobError ? "border-red-500 focus-visible:ring-red-500" : ""
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span className="text-muted-foreground">Select date</span>
                          )}
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {dobError && <p className="text-sm font-medium text-red-500 mt-1">{dobError}</p>}
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
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
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

          {/* Joined Date */}
          <FormField
            control={form.control}
            name="joinedDate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="text-sm font-medium">Joined Date</div>
                <div className="w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full justify-between pl-3 text-left font-normal ${
                            joinedDateError ? "border-red-500 focus-visible:ring-red-500" : ""
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span className="text-muted-foreground">Select date</span>
                          )}
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  {joinedDateError && <p className="text-sm font-medium text-red-500 mt-1">{joinedDateError}</p>}
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
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="col-start-2" />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex gap-3 pt-4 justify-end">
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white" disabled={!isFormComplete()}>
              Save
            </Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
