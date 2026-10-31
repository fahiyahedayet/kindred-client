
"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  UserRound,
  Mail,
  MapPin,
  CalendarDays,
  Heart,
  CalendarCheck,
  ArrowRight,
  Pencil,
  Settings,
} from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Alex Morgan",
    email: "alex@example.com",
    location: "Chattogram, Bangladesh",
    joinedDate: "October 2026",
    image: "https://i.pravatar.cc/300?img=47",
    bio: "Passionate about making a positive difference in the community. I believe every small act of kindness can create meaningful change.",
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
          {/* Page Heading */}
          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-dark">
              Your Space
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">
              My Profile
            </h1>
            <p className="mt-2 text-muted">
              Manage your information and keep track of your community journey.
            </p>
          </div>

          {/* Profile Card */}
          <div className="overflow-hidden rounded-3xl border border-border bg-surface">
            <div className="h-36 bg-gradient-to-r from-primary/30 via-secondary to-peach" />

            <div className="px-6 pb-8 md:px-10">
              <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-28 w-28 rounded-2xl border-4 border-surface object-cover shadow-md"
                  />

                  <div className="pb-1">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="mt-1 text-sm text-muted">
                      Kindred Community Member
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile/update"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  <Pencil size={16} />
                  Edit Profile
                </Link>
              </div>

              <div className="mt-8 grid gap-5 border-t border-border pt-7 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-surface-soft p-3">
                    <Mail size={19} className="text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Email Address</p>
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-surface-soft p-3">
                    <MapPin size={19} className="text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Location</p>
                    <p className="text-sm font-medium">{user.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-surface-soft p-3">
                    <CalendarDays size={19} className="text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Member Since</p>
                    <p className="text-sm font-medium">{user.joinedDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-surface-soft p-3">
                    <UserRound size={19} className="text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Account Type</p>
                    <p className="text-sm font-medium">Community Member</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-border pt-7">
                <h3 className="mb-3 font-semibold">About Me</h3>
                <p className="max-w-3xl text-sm leading-7 text-muted">
                  {user.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Statistics */}
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                <CalendarCheck size={21} />
              </div>
              <p className="text-3xl font-bold">08</p>
              <p className="mt-1 text-sm text-muted">Events Joined</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-peach">
                <Heart size={21} />
              </div>
              <p className="text-3xl font-bold">12</p>
              <p className="mt-1 text-sm text-muted">Events Completed</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft">
                <Settings size={21} />
              </div>
              <p className="text-3xl font-bold">Active</p>
              <p className="mt-1 text-sm text-muted">Account Status</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 rounded-2xl border border-border bg-surface p-6 md:p-8">
            <h3 className="text-lg font-bold">Your Activities</h3>
            <p className="mt-1 text-sm text-muted">
              Continue making a difference in your community.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                href="/joined-events"
                className="flex items-center justify-between rounded-xl bg-surface-soft p-5 transition hover:bg-primary/15"
              >
                <div>
                  <p className="font-semibold">Joined Events</p>
                  <p className="mt-1 text-xs text-muted">
                    View events you have joined
                  </p>
                </div>
                <ArrowRight size={19} />
              </Link>

              <Link
                href="/manage-events"
                className="flex items-center justify-between rounded-xl bg-surface-soft p-5 transition hover:bg-primary/15"
              >
                <div>
                  <p className="font-semibold">Manage Events</p>
                  <p className="mt-1 text-xs text-muted">
                    Manage events you have created
                  </p>
                </div>
                <ArrowRight size={19} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
