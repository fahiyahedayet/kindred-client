
"use client";

import Link from "next/link";
import { useState } from "react";
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
  Leaf,
  Users,
  HandHeart,
  Clock,
} from "lucide-react";

const user = {
  name: "Alex Morgan",
  email: "alex@example.com",
  location: "Chattogram, Bangladesh",
  joinedDate: "October 2026",
  image: "https://i.pravatar.cc/300?img=47",
  bio: "Passionate about making a positive difference in the community. I believe every small act of kindness can create meaningful change.",
};

const activities = [
  {
    id: "1",
    title: "Beach Cleanup Drive",
    category: "Cleanup",
    date: "November 8, 2026",
    status: "Joined",
    icon: Leaf,
    color: "bg-surface-soft",
  },
  {
    id: "2",
    title: "Community Tree Plantation",
    category: "Plantation",
    date: "November 12, 2026",
    status: "Joined",
    icon: Leaf,
    color: "bg-secondary",
  },
  {
    id: "3",
    title: "Food Distribution Program",
    category: "Donation",
    date: "October 20, 2026",
    status: "Completed",
    icon: HandHeart,
    color: "bg-peach",
  },
  {
    id: "4",
    title: "Youth Education Support",
    category: "Education",
    date: "October 15, 2026",
    status: "Completed",
    icon: Users,
    color: "bg-secondary",
  },
];

const filters = ["All", "Joined", "Completed"] as const;

type ActivityFilter = (typeof filters)[number];

export default function ProfilePage() {
  const [activeFilter, setActiveFilter] =
    useState<ActivityFilter>("All");

  const filteredActivities = activities.filter((activity) => {
    if (activeFilter === "All") return true;
    return activity.status === activeFilter;
  });

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

              {/* User Information */}
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

              {/* About Me */}
              <div className="mt-8 border-t border-border pt-7">
                <h3 className="mb-3 font-semibold">About Me</h3>
                <p className="max-w-3xl text-sm leading-7 text-muted">
                  {user.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Statistics */}
          <div className="mt-8">
            <h2 className="mb-5 text-xl font-bold">Your Impact</h2>

            <div className="grid gap-5 sm:grid-cols-3">
              <button
                onClick={() => setActiveFilter("Joined")}
                className={`rounded-2xl border bg-surface p-6 text-left transition hover:-translate-y-1 hover:shadow-md ${
                  activeFilter === "Joined"
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border"
                }`}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                  <CalendarCheck size={21} />
                </div>
                <p className="text-3xl font-bold">08</p>
                <p className="mt-1 text-sm text-muted">Events Joined</p>
                <p className="mt-3 text-xs font-medium text-primary-dark">
                  View joined activities →
                </p>
              </button>

              <button
                onClick={() => setActiveFilter("Completed")}
                className={`rounded-2xl border bg-surface p-6 text-left transition hover:-translate-y-1 hover:shadow-md ${
                  activeFilter === "Completed"
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border"
                }`}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-peach">
                  <Heart size={21} />
                </div>
                <p className="text-3xl font-bold">12</p>
                <p className="mt-1 text-sm text-muted">Events Completed</p>
                <p className="mt-3 text-xs font-medium text-primary-dark">
                  View completed activities →
                </p>
              </button>

              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft">
                  <Settings size={21} />
                </div>
                <p className="text-3xl font-bold">Active</p>
                <p className="mt-1 text-sm text-muted">Account Status</p>
                <p className="mt-3 text-xs text-muted">
                  Your account is in good standing
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-10 rounded-2xl border border-border bg-surface p-6 md:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <p className="mt-1 text-sm text-muted">
                  Follow your journey and community contributions.
                </p>
              </div>

              <Link
                href="/joined-events"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark transition hover:gap-3"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>

            {/* Activity Filters */}
            <div className="mt-6 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-primary text-white"
                      : "bg-surface-soft text-muted hover:bg-primary/15"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Activity List */}
            <div className="mt-6 space-y-4">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => {
                  const ActivityIcon = activity.icon;

                  return (
                    <Link
                      key={activity.id}
                      href={`/events/${activity.id}`}
                      className="flex flex-col gap-4 rounded-xl border border-border p-4 transition hover:border-primary/50 hover:bg-surface-soft/50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${activity.color}`}
                        >
                          <ActivityIcon size={22} />
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {activity.title}
                          </h3>
                          <p className="mt-1 text-xs text-muted">
                            {activity.category} · {activity.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            activity.status === "Completed"
                              ? "bg-secondary text-foreground"
                              : "bg-surface-soft text-primary-dark"
                          }`}
                        >
                          {activity.status}
                        </span>

                        <ArrowRight
                          size={18}
                          className="text-muted"
                        />
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="rounded-xl bg-surface-soft px-4 py-10 text-center">
                  <Clock
                    size={30}
                    className="mx-auto mb-3 text-muted"
                  />
                  <p className="font-semibold">No activities found</p>
                  <p className="mt-1 text-sm text-muted">
                    Your activities will appear here.
                  </p>
                </div>
              )}
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
