
"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}
