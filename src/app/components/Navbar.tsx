
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Sun,
  Moon,
  HeartHandshake,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/events" },
  { name: "About Us", href: "/#about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <HeartHandshake size={23} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight">
              kindred.
            </h1>
            <p className="text-[10px] tracking-wider text-muted">
              SMALL ACTS. GREATER CHANGE.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted transition hover:text-primary-dark"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-surface-soft"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )
            ) : (
              <span className="h-[18px] w-[18px]" />
            )}
          </button>

          <Link
            href="/sign-in"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:bg-surface-soft"
          >
            Log in
          </Link>

          <Link
            href="/sign-up"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )
            ) : (
              <span className="h-[18px] w-[18px]" />
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="rounded-lg border border-border p-2"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-border bg-background px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-muted transition hover:text-primary-dark"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex gap-3 border-t border-border pt-4">
              <Link
                href="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-full border border-border py-3 text-center text-sm font-semibold"
              >
                Log in
              </Link>

              <Link
                href="/sign-up"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-full bg-primary py-3 text-center text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
