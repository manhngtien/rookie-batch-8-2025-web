import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

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
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

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
              <Input
                className="text-primary"
                id="currentPassword"
                type="password"
                autoComplete="current-password"
                {...field}
              />
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
              <Input
                className="text-primary"
                id="newPassword"
                type="password"
                autoComplete="new-password"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          rules={{ required: "Please confirm your new password" }}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="confirmPassword" className="text-primary">
                Confirm New Password
              </Label>
              <Input
                className="text-primary"
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                {...field}
              />
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
