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
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters" })
      .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/, {
        message:
          "Password must be at least 6 characters long and contain at least one letter, one number, and one special character.",
      }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password must be different from old password",
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm({
  onSubmit,
  onCancel,
  loading = false,
}: {
  onSubmit: (
    values: ChangePasswordFormValues,
    showErrors: (message: string) => void,
  ) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}) {
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    await onSubmit(values, (message: string) => {
      form.setError("oldPassword", {
        type: "manual",
        message,
      });
    });
  };

  const { watch } = form;
  const oldPassword = watch("oldPassword");
  const newPassword = watch("newPassword");

  const isDisabled = loading || !oldPassword || !newPassword;

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
          <Button
            id="password-change-save-button"
            type="submit"
            className="px-6 py-3"
            disabled={isDisabled}
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
