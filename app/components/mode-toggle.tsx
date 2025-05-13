import { useTheme } from "app/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
    
    // Respect device preference on first load
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!theme && prefersDark) {
      setTheme("dark");
    }
  }, [setTheme, theme]);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
