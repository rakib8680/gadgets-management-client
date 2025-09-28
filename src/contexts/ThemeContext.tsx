import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
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
  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement;

    // Add transition class for smooth animation
    root.classList.add("theme-transitioning");

    // Remove existing theme classes
    root.classList.remove("light", "dark");

    // Add the new theme class
    root.classList.add(newTheme);

    setActualTheme(newTheme);

    // Remove transition class after animation completes
    setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 300);
  };

  // Update theme function
  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "system") {
      applyTheme(getSystemTheme());
    } else {
      applyTheme(newTheme);
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
