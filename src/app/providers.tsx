
"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

function RouteProtection({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const protectedRoutes = [
    "/create-event",
    "/manage-events",
    "/joined-events",
    "/profile",
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isProtectedRoute && !isPending && !session) {
      router.replace("/sign-in");
    }
  }, [mounted, isPending, isProtectedRoute, session, router]);

  if (isProtectedRoute && (!mounted || isPending || !session)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="mt-4 text-sm text-muted">
            Checking your account...
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      scriptProps={{ type: "application/json" }}
    >
      <RouteProtection>{children}</RouteProtection>
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}
