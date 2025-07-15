import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import ThemeToggle from "@/components/ui/theme-toggle";

function App() {
  return (
    <>
      <ThemeToggle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
