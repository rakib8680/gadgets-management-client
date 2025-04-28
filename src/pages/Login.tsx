import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient ">
      <div className="flex flex-col space-y-5">
        <h1 className=" text-2xl font-bold text-slate-600">
          Please Login to continue
        </h1>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="Enter your email" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input type="password" placeholder="Enter your password" />
        </div>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Login;
