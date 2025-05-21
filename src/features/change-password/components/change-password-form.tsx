import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters" })
      .regex(/[a-zA-Z0-9]/, {
        message: "Password must be alphanumeric",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

// type ChangePasswordFormValues = {
//   currentPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// };

export function ChangePasswordForm({
  onSubmit,
  onCancel,
  onSuccess,
  loading = false,
}: {
  onSubmit?: (values: ChangePasswordFormValues) => void | Promise<void>;
  onSuccess?: () => void;
  onCancel?: () => void;
  loading?: boolean;
}) {
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // const form = useForm<ChangePasswordFormValues>({
  //   defaultValues: {
  //     currentPassword: "",
  //     newPassword: "",
  //     confirmPassword: "",
  //   },
  // });

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    if (values.newPassword !== values.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      await onSubmit?.(values);
      onSuccess?.(); // 🎯 Call onSuccess after successful submit
    } catch (error) {
      // Optionally handle errors here (e.g., set form errors)
      console.error("Change password failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          rules={{ required: "Current password is required" }}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="currentPassword" className="text-primary">
                Current Password
              </Label>
              <FormControl>
                <PasswordInput
                  className="text-primary"
                  id="currentPassword"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          rules={{
            required: "New password is required",
            minLength: { value: 6, message: "At least 6 characters" },
          }}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="newPassword" className="text-primary">
                New Password
              </Label>
              <FormControl>
                <PasswordInput
                  className="text-primary"
                  id="newPassword"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="confirmPassword"
          rules={{ required: "Please confirm your new password" }}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="confirmPassword" className="text-primary">
                Confirm New Password
              </Label>
              <PasswordInput
                className="text-primary"
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="submit" disabled={loading} className="px-6 py-3">
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="text-primary border-black px-6 py-3"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ChangePasswordForm;
