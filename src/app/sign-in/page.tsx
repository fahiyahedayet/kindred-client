
"use client";

import Link from "next/link";
import { HeartHandshake, Mail, Lock, Heart, ArrowRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim() || !password) {
            toast.error("Please enter your email and password.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address.");
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
                            Welcome back to a community that cares.
                        </h1>

                        <p className="mt-6 text-base leading-8 text-muted">
                            Your next opportunity to make a difference is just around
                            the corner. Come back and keep the kindness going.
                        </p>

                        <div className="mt-10 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70">
                                <Heart size={22} className="text-primary-dark" />
                            </div>
                            <p className="text-sm font-medium text-muted">
                                Every small act matters.
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
                                Welcome back
                            </p>

                            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                                Sign in to Kindred
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-muted">
                                Continue your journey of bringing positive change to your community.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-9 space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-border bg-surface py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full rounded-xl border border-border bg-surface py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-semibold text-white transition hover:bg-primary-dark"
                            >
                                Sign In
                                <ArrowRight size={17} />
                            </button>
                        </form>

                        <p className="mt-7 text-center text-sm text-muted">
                            Don't have an account?{" "}
                            <Link
                                href="/sign-up"
                                className="font-semibold text-primary-dark hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
