/**
 * Utility functions for smooth theme transitions
 */

/**
 * Adds a smooth transition class to the document root during theme changes
 * This ensures all elements animate smoothly when switching themes
 */
export const enableSmoothThemeTransition = () => {
  const root = document.documentElement;
  root.classList.add("theme-transitioning");

  // Remove the class after transition completes
  setTimeout(() => {
    root.classList.remove("theme-transitioning");
  }, 300);
};

/**
 * Disables transitions for specific elements that shouldn't animate
 * Useful for elements that need to change instantly
 */
export const disableTransitions = (element: HTMLElement) => {
  element.classList.add("no-transition");

  // Re-enable transitions after a short delay
  setTimeout(() => {
    element.classList.remove("no-transition");
  }, 50);
};

/**
 * Creates a smooth theme transition with a callback
 * Useful for complex theme changes that need coordination
 */
export const smoothThemeTransition = (callback: () => void) => {
  enableSmoothThemeTransition();

  // Execute callback after a small delay to ensure transition starts
  setTimeout(() => {
    callback();
  }, 10);
};

/**
 * CSS classes for theme transition utilities
 */
export const themeTransitionClasses = {
  // Smooth transitions for any element
  smooth: "transition-all duration-300 ease-in-out",

  // Fast transitions for interactive elements
  fast: "transition-all duration-200 ease-in-out",

  // Slow transitions for dramatic effects
  slow: "transition-all duration-500 ease-in-out",

  // Disable transitions
  none: "no-transition",

  // Theme-aware hover effects
  hover:
    "transition-all duration-300 ease-in-out hover:scale-105 active:scale-95",
} as const;
