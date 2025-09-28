# 🎨 Theme System Usage Guide

## Overview

Your app now has a fully functional light/dark mode system that works throughout the entire application. The theme is managed by React Context and persists across browser sessions.

## 🚀 Quick Start

### 1. Using the Theme Toggle Component

Drop the `ThemeToggle` component anywhere in your app:

```tsx
import { ThemeToggle } from "@/components/ui/theme-toggle";

function MyComponent() {
  return (
    <div>
      <h1>My Component</h1>
      <ThemeToggle /> {/* Add theme toggle anywhere */}
    </div>
  );
}
```

### 2. Using the useTheme Hook

Access and control theme state in any component:

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function MyComponent() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Actual theme: {actualTheme}</p>
      <button onClick={() => setTheme("dark")}>Go Dark</button>
      <button onClick={() => setTheme("light")}>Go Light</button>
      <button onClick={() => setTheme("system")}>Follow System</button>
    </div>
  );
}
```

## 🎯 Theme Values

- **`theme`**: `'light' | 'dark' | 'system'` - The user's preference
- **`actualTheme`**: `'light' | 'dark'` - The resolved theme (system preference resolved)
- **`setTheme`**: Function to change the theme

## 🎨 Using Theme-Aware Styles

### Tailwind Classes

Use Tailwind's dark mode classes:

```tsx
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  This div changes color based on theme
</div>
```

### CSS Variables

Use the CSS custom properties:

```css
.my-component {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}
```

### Conditional Rendering

Render different content based on theme:

```tsx
function MyComponent() {
  const { actualTheme } = useTheme();

  return <div>{actualTheme === "dark" ? <MoonIcon /> : <SunIcon />}</div>;
}
```

## 📍 Where Theme Toggles Are Already Added

1. **Main Layout** (`src/layout/MainLayout.tsx`) - Top right corner
2. **Home Page** (`src/pages/Home.tsx`) - Header area
3. **Dashboard Header** (`src/components/dashboard/DashboardHeader.tsx`) - Action buttons area
4. **Settings Page** (`src/pages/Settings.tsx`) - Appearance section

## 🛠️ Adding Theme Toggle to New Components

### Option 1: Simple Toggle

```tsx
import { ThemeToggle } from "@/components/ui/theme-toggle";

function MyHeader() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle />
    </header>
  );
}
```

### Option 2: Custom Theme Controls

```tsx
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

function CustomThemeControls() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <Button
        variant={theme === "light" ? "default" : "outline"}
        onClick={() => setTheme("light")}
      >
        Light
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        onClick={() => setTheme("dark")}
      >
        Dark
      </Button>
      <Button
        variant={theme === "system" ? "default" : "outline"}
        onClick={() => setTheme("system")}
      >
        System
      </Button>
    </div>
  );
}
```

## 🎨 Theme-Aware Component Examples

### Card Component

```tsx
function ThemeAwareCard({ children }) {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-4">
      {children}
    </div>
  );
}
```

### Button Component

```tsx
function ThemeAwareButton({ children, ...props }) {
  return (
    <button
      className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded"
      {...props}
    >
      {children}
    </button>
  );
}
```

### Icon Component

```tsx
function ThemeAwareIcon({ icon: Icon }) {
  const { actualTheme } = useTheme();

  return (
    <Icon
      className={`w-5 h-5 ${
        actualTheme === "dark" ? "text-blue-400" : "text-blue-600"
      }`}
    />
  );
}
```

## 🔧 Advanced Usage

### Theme Persistence

The theme automatically persists in localStorage. No additional setup needed.

### System Theme Detection

When theme is set to 'system', it automatically follows the user's OS preference and updates when the OS theme changes.

### SSR Compatibility

The theme system is designed to work with SSR. The initial theme is applied on the client side to prevent hydration mismatches.

### Smooth Transitions

The theme system includes smooth transitions for all theme changes:

```tsx
import {
  smoothThemeTransition,
  themeTransitionClasses,
} from "@/utils/theme-transitions";

// Use smooth transition utility
const handleThemeChange = () => {
  smoothThemeTransition(() => {
    setTheme("dark");
  });
};

// Use transition classes
<div className={themeTransitionClasses.smooth}>
  This element will animate smoothly during theme changes
</div>;
```

Available transition classes:

- `themeTransitionClasses.smooth` - 300ms smooth transition
- `themeTransitionClasses.fast` - 200ms fast transition
- `themeTransitionClasses.slow` - 500ms slow transition
- `themeTransitionClasses.hover` - Hover effects with transitions
- `themeTransitionClasses.none` - Disable transitions

## 🎯 Best Practices

1. **Use CSS Variables**: Prefer `hsl(var(--background))` over hardcoded colors
2. **Test Both Themes**: Always test your components in both light and dark modes
3. **Consistent Spacing**: Use the same spacing values in both themes
4. **Accessibility**: Ensure sufficient contrast in both themes
5. **Icons**: Use theme-aware icons that change color appropriately

## 🚨 Common Issues

### Issue: Theme not applying

**Solution**: Make sure your component is wrapped in `ThemeProvider` (already done in `main.tsx`)

### Issue: Hydration mismatch

**Solution**: The theme system handles this automatically by applying theme on client-side only

### Issue: Custom colors not working

**Solution**: Use the CSS custom properties instead of hardcoded colors

## 🎨 Available CSS Variables

- `--background` / `--foreground`
- `--card` / `--card-foreground`
- `--popover` / `--popover-foreground`
- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--muted` / `--muted-foreground`
- `--accent` / `--accent-foreground`
- `--destructive`
- `--border`
- `--input`
- `--ring`

And many more! Check `src/index.css` for the complete list.
