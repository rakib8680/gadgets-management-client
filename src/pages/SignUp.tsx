import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { TSignUpInput } from "@/types/auth";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, reset } = useForm<TSignUpInput>();
  const [registerUser] = useRegisterMutation();

  const onSubmit: SubmitHandler<TSignUpInput> = async (data) => {
    if (data.password !== data.confirmPassword) {
      return toast.error("Passwords do not match", { position: "top-center" });
    }

    const toastId = toast.loading("Signing up...");
    try {
      const res = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();

      if (res.success) {
        toast.success("Registration successful!", { id: toastId });
        reset();
      }
    } catch (error: any) {
      toast.error(error.data.errorMessage || "Registration Failed", {
        id: toastId,
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <div className="w-full max-w-md bg-white px-8 py-14 rounded-xl shadow-md dark:bg-zinc-900">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-bold text-center text-neutral-800 dark:text-neutral-200">
            Create an account
          </h2>

          {/* Name */}
          <LabelInputContainer>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Rakib Hasan"
              {...register("name", { required: true })}
            />
          </LabelInputContainer>

          {/* Email */}
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
            />
          </LabelInputContainer>

          {/* Password */}
          <LabelInputContainer className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password", { required: true })}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </LabelInputContainer>

          {/* Confirm Password */}
          <LabelInputContainer className="relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("confirmPassword", { required: true })}
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-500 cursor-pointer"
            >
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </LabelInputContainer>

          {/* Submit Button */}
          <Button
            type="submit"
            className="cursor-pointer relative w-full h-10 rounded-md bg-gradient-to-br from-black to-neutral-700 text-white font-medium hover:opacity-90 transition"
          >
            Sign Up &rarr;
            <BottomGradient />
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
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

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
