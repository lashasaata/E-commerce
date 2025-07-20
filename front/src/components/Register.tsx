import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";

interface RegisterProps {
  onToggleMode: () => void;
  onRegisterSuccess: () => void;
}

export function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "At least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    let modData = {
      ...formData,
      name: formData.firstName + "" + formData.lastName,
    };

    setIsLoading(true);

    // Simulate API call
    try {
      registerUser(modData);
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      setIsLoading(false);
      // onRegisterSuccess();
    }, 1000);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto bg-[#ffffff] rounded-lg shadow-lg border border-[#e5e7eb]">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-1">
        <h2 className="text-xl sm:text-2xl font-medium text-center text-[#111827]">
          Create an account
        </h2>
        <p className="text-xs sm:text-sm text-center text-[#6b7280]">
          Enter your details to get started with your account
        </p>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4">
        {/* Google Signup Button */}
        <button
          onClick={handleGoogleSignup}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-2 bg-[#ffffff] border border-[#d1d5db] text-[#374151] rounded-md shadow-sm text-sm font-medium hover:bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
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
          <span className="text-sm">Sign up with Google</span>
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

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-[#374151]"
              >
                First name
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={`w-full pl-10 pr-4 py-2.5 sm:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent text-base sm:text-sm ${
                    errors.firstName ? "border-[#ef4444]" : "border-[#d1d5db]"
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="text-sm text-[#ef4444]">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-[#374151]"
              >
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`w-full px-4 py-2.5 sm:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent text-base sm:text-sm ${
                  errors.lastName ? "border-[#ef4444]" : "border-[#d1d5db]"
                }`}
              />
              {errors.lastName && (
                <p className="text-sm text-[#ef4444]">{errors.lastName}</p>
              )}
            </div>
          </div>

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
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
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
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
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

          {/* Confirm Password Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#374151]"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className={`w-full pr-10 pl-4 py-2.5 sm:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent text-base sm:text-sm ${
                  errors.confirmPassword
                    ? "border-[#ef4444]"
                    : "border-[#d1d5db]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280] p-1"
              >
                {showConfirmPassword ? (
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
            {errors.confirmPassword && (
              <p className="text-sm text-[#ef4444]">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-4 w-4 mt-0.5 rounded accent-[#f97316] border-[#d1d5db] flex-shrink-0"
              />
              <label
                htmlFor="terms"
                className="text-sm text-[#374151] leading-5"
              >
                I agree to the{" "}
                <button
                  type="button"
                  className="text-[#f97316] hover:text-[#ea580c] hover:underline"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-[#f97316] hover:text-[#ea580c] hover:underline"
                >
                  Privacy Policy
                </button>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-[#ef4444]">{errors.terms}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#f97316] text-[#ffffff] py-2.5 sm:py-2 px-4 rounded-md hover:bg-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Toggle to Login */}
        <div className="text-center text-sm text-[#6b7280]">
          Already have an account?{" "}
          <button
            // onClick={onToggleMode}
            onClick={() => navigate("/login")}
            className="text-[#f97316] hover:text-[#ea580c] hover:underline font-medium"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
