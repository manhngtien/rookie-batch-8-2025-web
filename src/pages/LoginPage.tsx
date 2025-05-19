import { LoginForm } from "@/components/login-form";
import NashLogo from "@/assets/nash_tech_logo.png";

function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Show logo on top for small screens */}
        <div className="mb-6 flex justify-center lg:hidden">
          <img src={NashLogo} alt="Nash Tech Logo" className="h-24 w-auto" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-90">
            <LoginForm />
          </div>
        </div>
      </div>
      {/* Show logo on right for large screens */}
      <div className="relative hidden items-center justify-center bg-white lg:flex">
        <img src={NashLogo} alt="Nash Tech Logo" className="h-1/2 w-1/2" />
      </div>
    </div>
  );
}

export default LoginPage;
