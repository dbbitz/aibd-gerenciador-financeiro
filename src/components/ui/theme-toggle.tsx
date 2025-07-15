import { Button } from "./button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Alternar tema"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
