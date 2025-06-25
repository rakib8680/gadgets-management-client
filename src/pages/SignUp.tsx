import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import GM_Form from "@/components/form/GM_Form";
import GM_Input from "@/components/form/GM_Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { registerValidationSchema } from "@/utils/formValidation";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [registerUser] = useRegisterMutation();

  // Form submission handler
  const handleSignUp = async (
    signUpInfo: FieldValues,
    methods: UseFormReturn<any>
  ) => {
    if (signUpInfo.password !== signUpInfo.confirmPassword) {
      return toast.error("Passwords do not match", {
        position: "top-center",
        duration: 2000,
      });
    }
    setIsLoading(true);
    const toastId = toast.loading("Signing up...", {
      position: "top-center",
      duration: 2000,
    });

    try {
      const res = await registerUser({
        name: signUpInfo.name,
        email: signUpInfo.email,
        password: signUpInfo.password,
      }).unwrap();

      if (res.success) {
        toast.success("Registration successful!", {
          id: toastId,
          position: "top-center",
          className: "!bg-green-700 !text-white",
        });
        methods.reset();
      }
    } catch (error: any) {
      toast.error(error.data?.errorMessage || "Registration Failed", {
        id: toastId,
        position: "top-center",
        className: "!bg-pink-800 !text-white",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-10 justify-center min-h-screen bg-gray-100 dark:bg-black">
      {/* Left Side: Welcome Message */}
      <div className=" py-12 px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-snug tracking-tight">
          Welcome to
          <br />
          <span
            className="
              text-transparent bg-clip-text bg-gradient-to-r 
              from-gray-700 to-gray-500 
              dark:from-gray-300 dark:to-gray-200
            "
          >
            Gadget Management
          </span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          Simplify your workflow and manage your gadgets with ease using our
          intuitive platform.
        </p>
      </div>
      <div className="w-full max-w-md bg-white px-8 py-14 rounded-xl shadow-md dark:bg-zinc-900">
        {/* Sign Up Form */}
        <GM_Form
          onSubmit={handleSignUp}
          defaultValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          resolver={zodResolver(registerValidationSchema)}
          className="space-y-6"
        >
          <h2 className="text-xl font-bold text-center text-neutral-800 dark:text-neutral-200">
            Create an account
          </h2>

          {/* Name */}
          <LabelInputContainer>
            <GM_Input
              type="text"
              placeholder="Your Name"
              name="name"
              label="Full Name"
              disabled={isLoading}
              required={true}
            />
          </LabelInputContainer>

          {/* Email */}
          <LabelInputContainer>
            <GM_Input
              type="email"
              placeholder="you@example.com"
              name="email"
              label="Email Address"
              disabled={isLoading}
              required={true}
            />
          </LabelInputContainer>

          {/* Password */}
          <LabelInputContainer className="relative">
            <GM_Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              name="password"
              label="Password"
              disabled={isLoading}
              required={true}
            />
            <div
              onClick={() => !isLoading && setShowPassword(!showPassword)}
              className={cn(
                "absolute right-3 top-9 text-gray-500",
                isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              )}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </LabelInputContainer>

          {/* Confirm Password */}
          <LabelInputContainer className="relative">
            <GM_Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              name="confirmPassword"
              label="Confirm Password"
              disabled={isLoading}
            />
            <div
              onClick={() =>
                !isLoading && setShowConfirmPassword(!showConfirmPassword)
              }
              className={cn(
                "absolute right-3 top-9 text-gray-500",
                isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              )}
            >
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </LabelInputContainer>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              "relative w-full h-10 rounded-md bg-gradient-to-br from-black to-neutral-700 text-white font-medium transition",
              isLoading
                ? "cursor-not-allowed opacity-70"
                : "cursor-pointer hover:opacity-90"
            )}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing up...</span>
              </div>
            ) : (
              <>Sign Up &rarr;</>
            )}
          </Button>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          {/* Login Link */}
          <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="font-medium underline underline-offset-4 text-neutral-700 hover:text-black dark:text-neutral-200 dark:hover:text-white"
            >
              Login
            </NavLink>
          </div>
        </GM_Form>
      </div>
    </div>
  );
}

// Reusable component to use common styles for label and input
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
