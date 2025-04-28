import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TLoginInput } from "@/types/auth";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit,reset } = useForm<TLoginInput>();

  const onSubmit: SubmitHandler<TLoginInput> = (data) => {
    console.log(data);
    reset();
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-5">
          <h1 className=" text-2xl font-bold text-slate-600">
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
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
