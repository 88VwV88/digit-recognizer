import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/app";
import RootLayout from "@/layouts/root-layout";
import ThemeProvider from "@/components/theme-provider";

import "@/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <RootLayout>
        <App />
      </RootLayout>
    </ThemeProvider>
  </StrictMode>
);
