"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
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
  Sparkles,
  Compass,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "../../lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const filters = ["All", "Joined", "Completed"] as const;

type ActivityFilter = (typeof filters)[number];

type JoinedEvent = {
  _id: string;
  title: string;
  category: string;
  eventDate: string;
  location: string;
  imageUrl?: string;
  volunteerCount: number;
  joinedAt?: string;
};

type Activity = {
  id: string;
  title: string;
  category: string;
  date: string;
  status: "Joined" | "Completed";
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Cleanup":
    case "Plantation":
      return Leaf;
    case "Donation":
    case "Animal Welfare":
    case "Healthcare":
      return HandHeart;
    default:
      return Users;
  }
};

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [activeFilter, setActiveFilter] =
    useState<ActivityFilter>("All");

  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  const user = session?.user;

  const fetchActivities = useCallback(async () => {
    if (!user) {
      setActivities([]);
      setLoadingActivities(false);
      return;
    }

    try {
      setLoadingActivities(true);

      const tokenData = await authClient.token();
      const token = tokenData.data?.token;

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`${API_URL}/api/events/joined`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load activities.");
      }

      const mappedActivities: Activity[] = (
        result.data as JoinedEvent[]
      ).map((event) => {
        const eventDate = new Date(event.eventDate);

        return {
          id: event._id,
          title: event.title,
          category: event.category,
          date: eventDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          status:
            eventDate < new Date() ? "Completed" : "Joined",
        };
      });

      setActivities(mappedActivities);
    } catch (error) {
      console.error("Fetch profile activities error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not load your activities."
      );
    } finally {
      setLoadingActivities(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!isPending) {
      fetchActivities();
    }
  }, [isPending, fetchActivities]);

  const filteredActivities = useMemo(() => {
    if (activeFilter === "All") return activities;

    return activities.filter(
      (activity) => activity.status === activeFilter
    );
  }, [activities, activeFilter]);

  const completedCount = activities.filter(
    (activity) => activity.status === "Completed"
  ).length;

  const joinedCount = activities.length;

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Member";

  const profileFields = [
    user?.name,
    user?.email,
    user?.image,
    user?.location,
    user?.bio,
  ];

  const completedProfileFields = profileFields.filter(
    (field) => typeof field === "string" && field.trim().length > 0
  ).length;

  const profileCompletion = Math.round(
    (completedProfileFields / profileFields.length) * 100
  );

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="mt-4 text-sm text-muted">
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="max-w-md rounded-3xl border border-border bg-surface p-8 text-center">
          <UserRound size={36} className="mx-auto text-primary-dark" />
          <h1 className="mt-4 text-2xl font-bold">
            Sign in to view your profile
          </h1>
          <p className="mt-3 text-sm text-muted">
            Your profile and community activities will appear here after
            you sign in.
          </p>
          <Link
            href="/sign-in"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-dark">
              Your Space
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">
              My Profile
            </h1>
            <p className="mt-2 text-sm text-muted md:text-base">
              Manage your information and celebrate your community journey.
            </p>
          </div>

          <Link
            href="/profile/update"
            className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark sm:self-auto"
          >
            <Pencil size={16} />
            Edit Profile
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
          <div className="relative h-36 overflow-hidden bg-gradient-to-r from-primary/30 via-secondary to-peach md:h-44">
            <div className="absolute -right-8 -top-16 h-48 w-48 rounded-full border-[25px] border-white/20" />
            <div className="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            <Sparkles
              className="absolute right-10 top-10 text-foreground/40"
              size={26}
            />
          </div>

          <div className="px-6 pb-8 md:px-10">
            <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={`${user.name}'s profile`}
                    className="h-28 w-28 rounded-2xl border-4 border-surface object-cover shadow-md md:h-32 md:w-32"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-surface bg-secondary text-3xl font-bold shadow-md md:h-32 md:w-32">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-bold md:text-3xl">
                      {user.name || "Community Member"}
                    </h2>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                      Member
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    Making a difference, one act at a time.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-5 border-t border-border pt-7 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-surface-soft p-3">
                  <Mail size={19} className="text-primary-dark" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted">Email Address</p>
                  <p className="truncate text-sm font-medium">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-surface-soft p-3">
                  <MapPin size={19} className="text-primary-dark" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted">Location</p>
                  <p className="truncate text-sm font-medium text-muted">
                    {user.location?.trim() || "Location not added yet"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-surface-soft p-3">
                  <CalendarDays size={19} className="text-primary-dark" />
                </div>
                <div>
                  <p className="text-xs text-muted">Member Since</p>
                  <p className="text-sm font-medium">{joinedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-surface-soft p-3">
                  <UserRound size={19} className="text-primary-dark" />
                </div>
                <div>
                  <p className="text-xs text-muted">Account Type</p>
                  <p className="text-sm font-medium">
                    Community Member
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-7">
              <h3 className="mb-3 font-semibold">About Me</h3>
              <p className="max-w-3xl whitespace-pre-wrap text-sm leading-7 text-muted">
                {user.bio?.trim() ||
                  "Your community journey starts with small acts of kindness. Add a personal introduction when you update your profile."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-6 md:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-primary-dark" />
                <h2 className="font-bold">Your Profile Progress</h2>
              </div>
              <p className="mt-2 text-sm text-muted">
                Keep your information updated so your community can know you better.
              </p>
            </div>

            <span className="text-2xl font-bold text-primary-dark">
              {profileCompletion}%
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-surface-soft">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>

          <Link
            href="/profile/update"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:gap-3"
          >
            Complete your profile <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">
              Your Contribution
            </p>
            <h2 className="mt-1 text-xl font-bold md:text-2xl">
              Your Impact
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <button
              onClick={() => setActiveFilter("Joined")}
              className={`group rounded-2xl border bg-surface p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-md ${
                activeFilter === "Joined"
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary transition group-hover:scale-110">
                <CalendarCheck size={21} />
              </div>
              <p className="text-3xl font-bold">
                {loadingActivities ? "..." : joinedCount}
              </p>
              <p className="mt-1 text-sm text-muted">Events Joined</p>
              <p className="mt-3 text-xs font-medium text-primary-dark">
                View joined activities →
              </p>
            </button>

            <button
              onClick={() => setActiveFilter("Completed")}
              className={`group rounded-2xl border bg-surface p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-md ${
                activeFilter === "Completed"
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-peach transition group-hover:scale-110">
                <Heart size={21} />
              </div>
              <p className="text-3xl font-bold">
                {loadingActivities ? "..." : completedCount}
              </p>
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
                Your account is in good standing.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">
                Your Journey
              </p>
              <h2 className="mt-1 text-xl font-bold md:text-2xl">
                Recent Activity
              </h2>
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

          <div className="mt-6 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-soft text-muted hover:bg-primary/15"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {loadingActivities ? (
              <div className="py-10 text-center text-sm text-muted">
                Loading your activities...
              </div>
            ) : filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => {
                const ActivityIcon = getCategoryIcon(activity.category);

                return (
                  <Link
                    key={activity.id}
                    href={`/events/${activity.id}`}
                    className="group flex flex-col gap-4 rounded-xl border border-border p-4 transition duration-300 hover:border-primary/50 hover:bg-surface-soft/50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-soft">
                        <ActivityIcon size={22} />
                      </div>

                      <div>
                        <h3 className="font-semibold transition group-hover:text-primary-dark">
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
                        className="text-muted transition group-hover:translate-x-1 group-hover:text-primary-dark"
                      />
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="rounded-xl bg-surface-soft px-4 py-10 text-center">
                <Clock size={30} className="mx-auto mb-3 text-muted" />
                <p className="font-semibold">No activities found</p>
                <p className="mt-1 text-sm text-muted">
                  Your joined events will appear here.
                </p>
                <Link
                  href="/events"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark"
                >
                  Explore Events <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-secondary via-surface-soft to-peach p-7 md:p-10">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-surface/70">
              <Compass size={24} />
            </div>

            <h2 className="text-2xl font-bold md:text-3xl">
              There&apos;s More Good to Do.
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted md:text-base">
              Discover meaningful events, meet people who care, and turn
              small acts into greater change.
            </p>

            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Explore Events <ArrowRight size={17} />
            </Link>
          </div>

          <Trophy
            size={150}
            className="absolute -bottom-8 -right-5 hidden rotate-12 text-foreground/5 md:block"
          />
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold">Your Activities</h2>
          <p className="mt-1 text-sm text-muted">
            Manage your events and community participation.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/joined-events"
              className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <p className="font-semibold">Joined Events</p>
                <p className="mt-1 text-xs text-muted">
                  View events you have joined.
                </p>
              </div>
              <ArrowRight
                size={19}
                className="text-muted transition group-hover:translate-x-1 group-hover:text-primary-dark"
              />
            </Link>

            <Link
              href="/manage-events"
              className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <p className="font-semibold">Manage Events</p>
                <p className="mt-1 text-xs text-muted">
                  Manage events you have created.
                </p>
              </div>
              <ArrowRight
                size={19}
                className="text-muted transition group-hover:translate-x-1 group-hover:text-primary-dark"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}