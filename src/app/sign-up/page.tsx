
"use client";

import Link from "next/link";
import {
  HeartHandshake,
  Mail,
  Lock,
  User,
  Camera,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, image, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (image && !/^https?:\/\/.+\..+/.test(image)) {
      toast.error("Please enter a valid profile photo URL.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      toast.error("Password needs uppercase and lowercase letters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    toast.success("Form validation successful!");
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-surface-soft p-12 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-secondary blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-peach blur-3xl" />

          <Link href="/" className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
              <HeartHandshake size={25} />
            </div>
            <span className="text-2xl font-bold">Kindred</span>
          </Link>

          <div className="relative max-w-lg">
            <span className="rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-dark">
              Small Acts. Greater Change.
            </span>

            <h1 className="mt-7 text-5xl font-bold leading-tight">
              A little kindness can change someone&apos;s world.
            </h1>

            <p className="mt-6 text-base leading-8 text-muted">
              Join a community of people who believe in showing up, helping
              out, and making every small act count.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
                  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100",
                ].map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt="Kindred community member"
                    className="h-11 w-11 rounded-full border-4 border-surface-soft object-cover"
                  />
                ))}
              </div>

              <p className="text-sm text-muted">
                Be part of something meaningful.
              </p>
            </div>
          </div>

          <p className="relative text-sm text-muted">
            © 2026 Kindred. Making kindness contagious.
          </p>
        </section>

        <section className="flex items-center justify-center px-5 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <Link href="/" className="mb-10 flex items-center gap-2 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <HeartHandshake size={23} />
              </div>
              <span className="text-xl font-bold">Kindred</span>
            </Link>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">
                Join our community
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted">
                Start your journey of making a difference, one small act at a
                time.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    size={18}
                  />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    className="w-full rounded-xl border border-border bg-surface py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    size={18}
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-border bg-surface py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold"
                >
                  Profile Photo URL
                  <span className="ml-2 text-xs font-normal text-muted">
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <Camera
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    size={18}
                  />

                  <input
                    id="image"
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full rounded-xl border border-border bg-surface py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    size={18}
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-xl border border-border bg-surface py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-primary"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-muted">
                  At least 6 characters, including uppercase and lowercase
                  letters.
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    size={18}
                  />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-xl border border-border bg-surface py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-primary"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-primary py-4 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Create Account
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted">OR CONTINUE WITH</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => toast("Google sign-up will be connected soon.")}
                className="flex items-center justify-center gap-2 rounded-full border border-border bg-surface py-3.5 text-sm font-semibold transition hover:bg-surface-soft"
              >
                <FcGoogle size={20} />
                Google
              </button>

              <button
                type="button"
                onClick={() => toast("GitHub sign-up will be connected soon.")}
                className="flex items-center justify-center gap-2 rounded-full border border-border bg-surface py-3.5 text-sm font-semibold transition hover:bg-surface-soft"
              >
                <FaGithub size={20} />
                GitHub
              </button>
            </div>

            <p className="mt-7 text-center text-sm text-muted">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-primary-dark hover:underline"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-6 text-muted">
              By creating an account, you agree to be part of a community built
              on kindness and respect.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
