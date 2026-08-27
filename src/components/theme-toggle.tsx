"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full bg-transparent"
        aria-label="Toggle theme"
      >
        <Laptop className="h-4 w-4 text-[#86868b]" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="h-9 w-9 rounded-full bg-transparent hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/10 transition-colors"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4 text-[#F59E0B] transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-[#2D5A3D] transition-transform hover:-rotate-12" />
      )}
    </Button>
  );
}