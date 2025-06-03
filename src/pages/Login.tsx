import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import verifyToken from "@/utils/verifyToken";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import GM_Form from "@/components/form/GM_Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "@/utils/formValidation";
import GM_Input from "@/components/form/GM_Input";

export default function Login() {
  // states & hooks
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  //Form submission handler
  const handleLogin = async (
    loginInfo: FieldValues,
    methods: UseFormReturn<any>
  ) => {
    setIsLoading(true);
    const toastId = toast.loading("Logging in...", { position: "top-center" });

    try {
      const res = await login(loginInfo).unwrap();
      const user = verifyToken(res.data.token);
      dispatch(setUser({ user, token: res.data.token }));

      if (res.success) {
        toast.success("Login successful", {
          id: toastId,
          position: "top-center",
          className: "!bg-green-700 !text-white",
        });
        methods.reset();
        navigate(from); // navigate to the page that the user tried to access before login
      }
    } catch (error: any) {
      toast.error(error.data?.errorMessage || "Invalid Email or Password", {
        id: toastId,
        position: "top-center",
        className: "!bg-pink-800 !text-white",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <div className="w-full max-w-md bg-white px-8 py-14 rounded-xl shadow-md dark:bg-zinc-900">
        <GM_Form
          onSubmit={handleLogin}
          defaultValues={{ email: "rakib@gmail.com", password: "rakib" }}
          resolver={zodResolver(loginValidationSchema)}
          className="space-y-6"
        >
          <h2 className="text-xl font-bold text-center text-neutral-800 dark:text-neutral-200">
            Login to your account
          </h2>

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
              placeholder="Your password"
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
              <>Login &rarr;</>
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
