import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { TLoginInput } from "@/types/auth";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm<TLoginInput>();
  const [login] = useLoginMutation();
  // const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<TLoginInput> = async (
    loginInfo: TLoginInput
  ) => {
    const toastId = toast.loading("Loading...");

    try {
      const res = await login(loginInfo).unwrap();
      if (res.success) {
        toast.success("Login successful", { id: toastId, duration: 2000 });
        reset();
      }
      // const { user, token } = res.data;
      // dispatch(setUser({user,token}))
      // console.log(user,token);
    } catch (error) {
      toast.error("Invalid Email or Password", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-5 border px-5 py-10 rounded-lg shadow">
          <h1 className=" text-2xl font-bold text-gray-700">
            Please Login to continue
          </h1>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="flex flex-col space-y-1.5 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-4 cursor-pointer"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
