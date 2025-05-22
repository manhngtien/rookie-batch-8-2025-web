import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  username,
  password,
  loading,
  onChange,
  onSubmit,
}: {
  className?: string;
  username: string;

  password: string;
  loading?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const isDisabled = loading || !username || !password;
  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={onSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Login to your account</h1>

        <p className="text-muted-foreground text-center text-base">
          Enter your username and password below to login
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            className="text-primary"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            name="password"
            className="text-primary"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full py-5 hover:cursor-pointer"
          disabled={isDisabled}
        >
          {loading ? "LOGGING IN..." : "LOGIN"}
        </Button>
      </div>
    </form>
  );
}
