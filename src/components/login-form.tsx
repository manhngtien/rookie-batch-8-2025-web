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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  loading = false,
  onSubmit,
}: {
  className?: string;
  loading?: boolean;
  onSubmit: (
    values: LoginFormValues,
    showErrors: (message: string) => void,
  ) => Promise<void>;
}) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // <--- Important
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    await onSubmit(values, (message) => {
      form.setError("password", {
        type: "manual",
        message,
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("flex flex-col gap-6", className)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-base">
            Enter your username and password below to login
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="username">Username</Label>
                <FormControl>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    className="text-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="password">Password</Label>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="text-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            id="login-button"
            type="submit"
            className="w-full py-5 hover:cursor-pointer"
            disabled={loading || !form.formState.isValid}
          >
            LOGIN
          </Button>
        </div>
      </form>
    </Form>
  );
}
