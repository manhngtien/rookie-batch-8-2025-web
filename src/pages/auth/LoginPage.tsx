import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import NashLogo from "@/assets/nash_tech_logo.png";
import { LoginForm } from "@/components/login-form";
import type { AppDispatch, RootState } from "@/store";
import { checkAuth, loginUser } from "@/store/thunks/authThunk";

function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await dispatch(checkAuth()).unwrap();
      } catch (error) {
        console.error("checkAuth failed in LoginPage:", error);
      }
      setIsAuthChecked(true);
    };

    if (!isAuthChecked) {
      verifyAuth();
    }
  }, [dispatch, isAuthChecked]);

  if (isAuthChecked && isAuthenticated) {
    console.info("Redirecting authenticated user to /");
    navigate("/", { replace: true });
    return null;
  }

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await dispatch(loginUser(form));
    setLoading(false);

    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    } else {
      alert(result.payload ?? "Login failed");
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Show logo on top for small screens */}
        <div className="mb-6 flex justify-center lg:hidden">
          <img src={NashLogo} alt="Nash Tech Logo" className="h-24 w-auto" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-90">
            <LoginForm
              username={form.username}
              password={form.password}
              loading={loading}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
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
