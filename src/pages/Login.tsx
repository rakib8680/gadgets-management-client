import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TLoginInput } from "@/types/auth";
import verifyToken from "@/utils/verifyToken";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm<TLoginInput>({
    defaultValues: {
      email: "rakib@gmail.com",
      password: "rakib",
    },
  });

  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  // console.log(data,error);

  const onSubmit: SubmitHandler<TLoginInput> = async (
    loginInfo: TLoginInput
  ) => {
    const toastId = toast.loading("Loading...");

    try {
      const res = await login(loginInfo).unwrap();
      const user = verifyToken(res.data.token);
      dispatch(setUser({ user, token: res.data.token }));
      if (res.success) {
        toast.success("Login successful", { id: toastId, duration: 2000 });
        reset();
      }
    } catch (error) {
      toast.error("Invalid Email or Password", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <div className="bg-white border border-gray-200 rounded-md shadow-sm px-6 py-8 space-y-6">
          <h1 className="text-xl font-semibold text-gray-800 text-center">
            Login to Your Account
          </h1>

          <div className="space-y-4">
            <div className="flex flex-col">
              <Label htmlFor="email" className="mb-1 text-sm text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="border-gray-3"
                {...register("email", { required: true })}
              />
            </div>

            <div className="flex flex-col relative">
              <Label htmlFor="password" className="mb-1 text-sm text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="border-gray-3"
                {...register("password", { required: true })}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-800 text-white hover:bg-gray-700 transition font-medium py-2 rounded"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
