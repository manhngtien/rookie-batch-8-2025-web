import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import NashLogo from "@/assets/nash_tech_logo.png";
import { LoginForm } from "@/components/login-form";
import { Spinner } from "@/components/ui/spinner";
import type { AppDispatch } from "@/store";
import { checkAuth, loginUser } from "@/store/thunks/authThunk";

function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await dispatch(checkAuth()).unwrap();
        if (response) {
          navigate("/");
        }
      } catch (error) {
        console.error("checkAuth failed in LoginPage:", error);
      }
      setIsAuthChecked(true);
    };

    if (!isAuthChecked) {
      verifyAuth();
    }
  }, [dispatch, isAuthChecked]);

  if (!isAuthChecked) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <Spinner className="text-foreground" size="large" />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      await dispatch(loginUser(form)).unwrap();
      navigate("/");
    } catch (error: unknown) {
      setLoading(false);
      const err = error as { code?: number; message?: string };
      if (err.code == 704) {
        setErrorMessage("Invalid username or password. Please try again.");
      } else {
        setErrorMessage(err.message ?? "An unexpected error occurred");
      }
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
            <LoginForm
              username={form.username}
              password={form.password}
              loading={loading}
              errorMessage={errorMessage}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
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
