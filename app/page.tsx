"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { useLoginMutation } from "../redux/services/api"; // Import the login mutation hook
import { setToken } from "@/utils";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

// Define the validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

// Create a type from the Yup schema
type FormData = yup.InferType<typeof schema>;

export default function LoginForm() {
  const [login, { isLoading, error }] = useLoginMutation(); // Use login mutation hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await login(data).unwrap(); // Unwrap to get the result directly
      // Assuming the response contains a token that needs to be stored in cookies
      // setToken('token', response.)
      console.log(response);
      // Store token in cookies for 7 days
      toast.success("Login successful.");
      setToken("token", response.access_token, 7);
      // Navigate to the home page upon successful login
      window.location.reload(); // Navigate to the home page upon successful login
    } catch (err) {
      console.error("Login failed:", err); // Error will be handled in the UI
    }
  };

  if (error && isFetchBaseQueryError(error)) {
    const errorMessage =
      error.data && typeof error.data === "object" && "message" in error.data
        ? (error.data as { message: string }).message
        : "An error occurred. Please try again.";
    toast.error(errorMessage);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <Input
              {...register("email")}
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              color={errors.email ? "danger" : "default"}
              fullWidth
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <Input
              {...register("password")}
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              color={errors.password ? "danger" : "default"}
              fullWidth
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            color="primary"
            fullWidth
            isDisabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* API Error Message */}

        {/* Link to Create Account */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Forget password?{" "}
            <Link
              href="/auth/forget-password"
              className="text-blue-500 hover:underline"
            >
              Reset your password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
