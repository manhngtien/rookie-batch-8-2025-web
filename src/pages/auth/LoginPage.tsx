import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import NashLogo from "@/assets/nash_tech_logo.png";
import { LoginForm } from "@/components/login-form";
import type { AppDispatch } from "@/store";
import type { RootState } from "@/store"; // adjust path as needed
import { loginUser } from "@/store/thunks/authThunk";

function LoginPage() {
  const loading = useSelector((state: RootState) => state.auth.loading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: { username: string; password: string },
    showErrors: (message: string) => void,
  ) => {
    const result = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    } else if (result.payload === "Unauthorized") {
      showErrors("Username or password is incorrect");
    } else {
      showErrors(result.payload || "Unexpected login error");
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="mb-6 flex justify-center lg:hidden">
          <img src={NashLogo} alt="Nash Tech Logo" className="h-24 w-auto" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-90">
            <LoginForm loading={loading} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="relative hidden items-center justify-center bg-white lg:flex">
        <img src={NashLogo} alt="Nash Tech Logo" className="h-1/2 w-1/2" />
      </div>
    </div>
  );
}

export default LoginPage;
