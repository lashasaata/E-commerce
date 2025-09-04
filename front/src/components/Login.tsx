import { useEffect, useState } from "react";
import { getUser, loginUser } from "../services/auth";
import { Mycontext } from "../App";
import { useContext } from "react";

interface LoginType {
  email: string;
  password: string;
}

export function Login() {
  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const { isAuthenticated, setIsAuthenticated, navigate, setUser } =
    useContext(Mycontext);

  console.log(isAuthenticated);
  // if (isAuthenticated) {
  //   console.log("authorized nigaa");
  //   navigate("/");
  // }

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = validateForm();
    if (!isValid) return;

    setIsLoading(true);
    const result = await loginUser(formData);
    console.log(result);
    setIsLoading(false);
    if (result.detail == "Invalid email") {
      setErrors({ email: result.detail });
      return;
    } else if (result.detail == "Incorrect password") {
      setErrors({ password: result.detail });
      return;
    }

    const userData = await getUser();
    localStorage.setItem("user", userData);
    setIsAuthenticated(true);

    // navigate("/");
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      setIsLoading(false);
      // onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto bg-[#ffffff] rounded-lg shadow-lg border border-[#e5e7eb]">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-1">
        <h2 className="text-xl sm:text-2xl font-medium text-center text-[#111827]">
          Welcome back
        </h2>
        <p className="text-xs sm:text-sm text-center text-[#6b7280]">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4">
        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-2 bg-[#ffffff] hover:bg-[#f97316] border border-[#d1d5db] text-[#374151] rounded-md shadow-sm text-sm font-medium hover:bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="mr-2 h-4 w-4 sm:h-4 sm:w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-sm sm:text-sm hover:text-[#fff]">
            Continue with Google
          </span>
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#d1d5db]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#ffffff] px-2 text-[#6b7280]">
              Or continue with
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#374151]"
            >
              Email
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#9ca3af]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value.trim() })
                }
                className={`w-full pl-10 pr-4 py-2.5 sm:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent text-base sm:text-sm ${
                  errors.email ? "border-[#ef4444]" : "border-[#d1d5db]"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-[#ef4444]">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#374151]"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value.trim() })
                }
                className={`w-full pr-10 pl-4 py-2.5 sm:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent text-base sm:text-sm ${
                  errors.password ? "border-[#ef4444]" : "border-[#d1d5db]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280] p-1"
              >
                {showPassword ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-[#ef4444]">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded accent-[#f97316] border-[#d1d5db]"
              />
              <label htmlFor="remember" className="text-sm text-[#374151]">
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-[#f97316] hover:text-[#ea580c] hover:underline text-left sm:text-right"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#f97316] text-[#ffffff] py-2.5 sm:py-2 px-4 rounded-md hover:bg-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Toggle to Register */}
        <div className="text-center text-sm text-[#6b7280]">
          Don't have an account?{" "}
          <button
            // onClick={onToggleMode}
            onClick={() => navigate("/register")}
            className="text-[#f97316] hover:text-[#ea580c] hover:underline font-medium"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
