import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4 text-yellow-500" />;
      case "dark":
        return <Moon className="h-4 w-4 text-blue-400" />;
      case "system":
        return <Monitor className="h-4 w-4 text-gray-500" />;
      default:
        return <Sun className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={cycleTheme}
      className="gap-2 transition-all duration-300 ease-in-out hover:bg-accent hover:scale-105 active:scale-95 cursor-pointer"
    >
      <div className="transition-transform duration-300 ease-in-out">
        {getIcon()}
      </div>
      <span className="capitalize text-sm font-medium transition-all duration-300">
        {theme}
      </span>
    </Button>
  );
}
