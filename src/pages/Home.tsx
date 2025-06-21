import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-red-50 min-h-svh">
      <h1 className="text-3xl font-mono">
        Welcome To Gadget Management System
      </h1>
      <Button variant="outline">Click me</Button>
    </div>
  );
};

export default Home;
