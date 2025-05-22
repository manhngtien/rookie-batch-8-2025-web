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
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
        message:
          "Password must be alphanumeric and contain at least one letter and one number",
      }),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password must be different from current password",
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

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
    try {
      await onSubmit?.(values);
      console.log(values);
      onSuccess?.(); // 🎯 Call onSuccess after successful submit
    } catch (error) {
      console.error("Change password failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        id="change-password-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="currentPassword" className="text-primary">
                Current Password
              </Label>
              <FormControl>
                <PasswordInput
                  className="text-primary"
                  id="currentPassword"
                  // autoComplete="current-password"
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
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="newPassword" className="text-primary">
                New Password
              </Label>
              <FormControl>
                <PasswordInput
                  className="text-primary"
                  id="newPassword"
                  // autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button
            id="password-change-save-button"
            type="submit"
            disabled={loading}
            className="px-6 py-3"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            id="password-change-cancel-button"
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
