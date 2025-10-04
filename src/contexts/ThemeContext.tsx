import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme, event?: React.MouseEvent) => void;
  actualTheme: "light" | "dark"; // The actual theme being applied (resolved from system if needed)
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or default to 'system'
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "system";
  });

  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

  // Function to get system theme preference
  const getSystemTheme = (): "light" | "dark" => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Function to apply theme to document using Tailwind's dark mode approach
  const applyTheme = (newTheme: "light" | "dark", event?: React.MouseEvent) => {
    // Fallback for browsers that don't support the View Transitions API
    if (!document.startViewTransition) {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
      setActualTheme(newTheme);
      return;
    }

    // Get click coordinates or default to top-right corner
    const x = event?.clientX ?? window.innerWidth;
    const y = event?.clientY ?? 0;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Use the View Transitions API
    const transition = document.startViewTransition(() => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
      setActualTheme(newTheme);
    });

    // Pass custom data to the animation
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  // Update theme function
  const updateTheme = (newTheme: Theme, event?: React.MouseEvent) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "system") {
      applyTheme(getSystemTheme());
    } else {
      applyTheme(newTheme, event);
    }
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme(getSystemTheme());
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  // Initialize theme on mount
  useEffect(() => {
    if (theme === "system") {
      applyTheme(getSystemTheme());
    } else {
      applyTheme(theme);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme: updateTheme, actualTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
