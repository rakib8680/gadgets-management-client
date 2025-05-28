import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TLoginInput } from "@/types/auth";
import verifyToken from "@/utils/verifyToken";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<TLoginInput>({
    defaultValues: {
      email: "rakib@gmail.com",
      password: "rakib",
    },
  });

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<TLoginInput> = async (loginInfo) => {
    setIsLoading(true);
    const toastId = toast.loading("Logging in...", { position: "top-center" });

    try {
      const res = await login(loginInfo).unwrap();
      const user = verifyToken(res.data.token);
      dispatch(setUser({ user, token: res.data.token }));

      if (res.success) {
        console.log(res.success);
        toast.success("Login successful", {
          id: toastId,
          position: "top-center",
        });
        reset();
      }
    } catch (error) {
      toast.error("Invalid Email or Password", {
        id: toastId,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <div className="w-full max-w-md bg-white px-8 py-14 rounded-xl shadow-md dark:bg-zinc-900">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-bold text-center text-neutral-800 dark:text-neutral-200">
            Login to your account
          </h2>

          {/* Email */}
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
              disabled={isLoading}
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
              disabled={isLoading}
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
                <span>Logging in...</span>
              </div>
            ) : (
              <>
                Login &rarr;
                <BottomGradient />
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          {/* Sign up */}
          <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            Don't have an account yet?{" "}
            <NavLink
              to="/signup"
              className="font-medium underline underline-offset-4 text-neutral-700 hover:text-black dark:text-neutral-200 dark:hover:text-white"
            >
              Sign up
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
