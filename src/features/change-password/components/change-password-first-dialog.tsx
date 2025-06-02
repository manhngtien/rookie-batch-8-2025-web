import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import type { AppDispatch, RootState } from "@/store";
import { setUser } from "@/store/slices/authSlice";
import { changePassword } from "@/store/thunks/authThunk";

import type { User } from "../../users/types/User";

function ChangePasswordFirstDialog({ user }: { user: User }) {
  const dispatch = useDispatch<AppDispatch>();
  // const [error, setError] = useState<string | null>(null);
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  function getInitialPassword(user: User) {
    const dob = user.dateOfBirth?.split("T")[0];
    if (!user.userName || !dob) return "";
    const [year, month, day] = dob.split("-");
    const ddmmyyyy = `${day}${month}${year}`;
    return `${user.userName}@${ddmmyyyy}`;
  }

  const initialPassword = getInitialPassword(user);

  const passwordSchema = z.object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((val) => /\d/.test(val), {
        message: "Password must contain at least one number",
      })
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: "Password must contain at least one special character",
      })
      .refine((val) => val !== initialPassword, {
        message: "New password must not be the same as your default password",
      }),
  });

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      const response = await dispatch(
        changePassword({
          oldPassword: initialPassword,
          newPassword: values.newPassword,
        }),
      ).unwrap();

      if (response && response.code === 204) {
        if (currentUser) {
          dispatch(setUser({ ...currentUser, isFirstLogin: false } as User));
        }
      }
    } catch (err) {
      console.error("Failed to change password:", err);
      // setError("Failed to change password. Please try again.");
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-md p-0 text-black"
        onEscapeKeyDown={(e) => e.preventDefault()}
        isClosable={false}
      >
        <DialogHeader className="w-full rounded-t-lg border-b-1 border-b-gray-400 bg-gray-200 p-4">
          <DialogTitle className="text-red-500">Change Password</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-8 pb-4">
          <p className="text-sm">
            This is the first time you logged in. <br />
            You have to change your password to continue.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className="w-24 !flex-none">
                        New Password
                      </FormLabel>
                      <FormControl className="!grow">
                        <PasswordInput
                          className="w-full"
                          id="new-password"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                id="change-password-first-button"
                type="submit"
                disabled={!form.formState.isValid}
                className="flex justify-self-end bg-red-600 text-white hover:cursor-pointer hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordFirstDialog;
