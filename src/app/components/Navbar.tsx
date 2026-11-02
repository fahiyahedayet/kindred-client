
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Sun,
  Moon,
  HeartHandshake,
  UserRound,
  ChevronDown,
  LogOut,
  CalendarPlus,
  ClipboardList,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/events" },
  { name: "About Us", href: "/#about" },
];

export default function Navbar() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { theme, setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Unable to log out.");
        return;
      }

      closeMenus();
      toast.success("You have logged out successfully.");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong while logging out.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const themeButton = (
    <button
      type="button"
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
  );

  const authLinks = (
    <>
      <Link
        href="/sign-in"
        onClick={closeMenus}
        className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:bg-surface-soft"
      >
        Log in
      </Link>

      <Link
        href="/sign-up"
        onClick={closeMenus}
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
      >
        Get Started
      </Link>
    </>
  );

  const profileLinks = (
    <>
      <Link
        href="/profile"
        onClick={closeMenus}
        className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition hover:bg-surface-soft"
      >
        <UserRound size={17} />
        My Profile
      </Link>

      <Link
        href="/create-event"
        onClick={closeMenus}
        className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition hover:bg-surface-soft"
      >
        <CalendarPlus size={17} />
        Create Event
      </Link>

      <Link
        href="/manage-events"
        onClick={closeMenus}
        className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition hover:bg-surface-soft"
      >
        <ClipboardList size={17} />
        Manage Events
      </Link>

      <Link
        href="/joined-events"
        onClick={closeMenus}
        className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition hover:bg-surface-soft"
      >
        <Users size={17} />
        Joined Events
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm text-red-500 transition hover:bg-red-500/10 disabled:opacity-60"
      >
        <LogOut size={17} />
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" onClick={closeMenus} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <HeartHandshake size={23} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight">kindred.</h1>
            <p className="text-[10px] tracking-wider text-muted">
              SMALL ACTS. GREATER CHANGE.
            </p>
          </div>
        </Link>

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

        <div className="hidden items-center gap-3 md:flex">
          {themeButton}

          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-surface-soft" />
          ) : user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
                className="flex items-center gap-2 rounded-full border border-border py-1.5 pl-1.5 pr-3 transition hover:bg-surface-soft"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <span className="max-w-28 truncate text-sm font-semibold">
                  {user.name || "My Account"}
                </span>

                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 rounded-xl border border-border bg-background p-2 shadow-xl">
                  <div className="border-b border-border px-4 py-3">
                    <p className="truncate text-sm font-semibold">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {user.email}
                    </p>
                  </div>

                  <div className="pt-2">{profileLinks}</div>
                </div>
              )}
            </div>
          ) : (
            authLinks
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {themeButton}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="rounded-lg border border-border p-2"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-border bg-background px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenus}
                className="text-sm font-medium text-muted transition hover:text-primary-dark"
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-border pt-4">
              {isPending ? (
                <div className="h-10 animate-pulse rounded-full bg-surface-soft" />
              ) : user ? (
                <div className="flex flex-col gap-1">
                  <div className="mb-2 flex items-center gap-3 border-b border-border pb-4">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-white">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {profileLinks}
                </div>
              ) : (
                <div className="flex gap-3">{authLinks}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
