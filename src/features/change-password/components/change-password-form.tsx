import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
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
import type { AppDispatch } from "@/store";
import { changePassword } from "@/store/slices/authSlice";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
        message: "Password must contain at least one letter and one number",
      }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password must be different from old password",
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm({
  onCancel,
  onSuccess,
  loading = false,
}: {
  onSuccess?: () => void;
  onCancel?: () => void;
  loading?: boolean;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    try {
      const result = await dispatch(
        changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        }),
      );

      console.info("dwuhdw" + result.payload);
      if (changePassword.fulfilled.match(result)) {
        onSuccess?.(); // ✅ success callback (e.g., open success dialog)
      } else {
        console.error("Password change failed:", result.payload);
      }
    } catch (error) {
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
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="oldPassword" className="text-primary">
                Old Password
              </Label>
              <FormControl>
                <PasswordInput
                  className="text-primary"
                  id="oldPassword"
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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
