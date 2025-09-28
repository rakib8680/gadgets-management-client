import { useTheme } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Moon, Monitor } from "lucide-react";

/**
 * Example component showing how to use the theme system
 * This demonstrates various ways to make components theme-aware
 */
export function ThemeExample() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Theme System Example
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current theme info */}
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Current Theme Preference:
            </p>
            <p className="font-semibold capitalize">{theme}</p>
            <p className="text-sm text-muted-foreground">
              Actual Theme Applied:
            </p>
            <p className="font-semibold capitalize">{actualTheme}</p>
          </div>

          {/* Theme toggle component */}
          <div>
            <p className="text-sm font-medium mb-2">Theme Toggle Component:</p>
            <ThemeToggle />
          </div>

          {/* Custom theme controls */}
          <div>
            <p className="text-sm font-medium mb-2">Custom Theme Controls:</p>
            <div className="flex gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className="gap-2"
              >
                <Sun className="w-4 h-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="gap-2"
              >
                <Moon className="w-4 h-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
                className="gap-2"
              >
                <Monitor className="w-4 h-4" />
                System
              </Button>
            </div>
          </div>

          {/* Theme-aware content */}
          <div>
            <p className="text-sm font-medium mb-2">Theme-Aware Content:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                <p className="font-semibold">Primary Card</p>
                <p className="text-sm opacity-90">
                  This card uses primary colors that change with theme
                </p>
              </div>
              <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
                <p className="font-semibold">Secondary Card</p>
                <p className="text-sm opacity-90">
                  This card uses secondary colors that change with theme
                </p>
              </div>
            </div>
          </div>

          {/* Conditional rendering based on theme */}
          <div>
            <p className="text-sm font-medium mb-2">Conditional Rendering:</p>
            <div className="flex items-center gap-2 p-4 bg-accent rounded-lg">
              {actualTheme === "dark" ? (
                <>
                  <Moon className="w-5 h-5 text-blue-400" />
                  <span>Dark mode is active! 🌙</span>
                </>
              ) : (
                <>
                  <Sun className="w-5 h-5 text-yellow-500" />
                  <span>Light mode is active! ☀️</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
