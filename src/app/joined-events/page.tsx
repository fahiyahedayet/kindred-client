
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Search,
  Heart,
  ArrowUpRight,
  TicketCheck,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type JoinedEvent = {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  image: string;
  organizer: string;
  status: "Upcoming" | "Completed";
  joinedOn: string;
};

const initialEvents: JoinedEvent[] = [
  {
    id: "1",
    title: "A Cleaner Tomorrow",
    category: "Cleanup",
    date: "November 8, 2026",
    time: "8:00 AM – 12:00 PM",
    location: "Patenga Beach, Chattogram",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800",
    organizer: "Kindred Community",
    status: "Upcoming",
    joinedOn: "October 20, 2026",
  },
  {
    id: "2",
    title: "Plant a Little Hope",
    category: "Plantation",
    date: "November 12, 2026",
    time: "9:00 AM – 1:00 PM",
    location: "CRB, Chattogram",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    organizer: "Green Tomorrow",
    status: "Upcoming",
    joinedOn: "October 22, 2026",
  },
  {
    id: "3",
    title: "Warm Hearts, Warm Homes",
    category: "Donation",
    date: "November 15, 2026",
    time: "10:00 AM – 2:00 PM",
    location: "GEC Circle, Chattogram",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    organizer: "Kindred Community",
    status: "Upcoming",
    joinedOn: "October 25, 2026",
  },
  {
    id: "4",
    title: "A Day of Giving",
    category: "Community",
    date: "October 10, 2026",
    time: "10:00 AM – 2:00 PM",
    location: "Agrabad, Chattogram",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
    organizer: "Kindred Community",
    status: "Completed",
    joinedOn: "September 28, 2026",
  },
];

export default function JoinedEventsPage() {
  const [events, setEvents] = useState(initialEvents);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [leaveId, setLeaveId] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesTab =
        activeTab === "All" || event.status === activeTab;

      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [events, activeTab, search]);

  const upcomingCount = events.filter(
    (event) => event.status === "Upcoming"
  ).length;

  const completedCount = events.filter(
    (event) => event.status === "Completed"
  ).length;

  const confirmLeave = () => {
    if (!leaveId) return;

    setEvents((previous) =>
      previous.filter((event) => event.id !== leaveId)
    );

    setLeaveId(null);
    toast.success("You have left the event.");
  };

  const selectedEvent = events.find((event) => event.id === leaveId);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        <section className="relative overflow-hidden bg-surface-soft px-5 py-14 lg:px-8">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-secondary/70 blur-3xl" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-peach/60 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary-dark">
                  <Heart size={16} />
                  Your kindness journey
                </p>

                <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                  Events you've joined.
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
                  Every event you join is another opportunity to connect,
                  contribute, and create a little more good in the world.
                </p>
              </div>

              <Link
                href="/events"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Explore Events
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Total joined</p>
                <div className="rounded-xl bg-secondary p-3">
                  <TicketCheck size={20} className="text-primary-dark" />
                </div>
              </div>
              <h2 className="mt-4 text-3xl font-bold">{events.length}</h2>
              <p className="mt-2 text-xs text-muted">
                Your community commitments
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Upcoming</p>
                <div className="rounded-xl bg-peach p-3">
                  <CalendarDays size={20} className="text-primary-dark" />
                </div>
              </div>
              <h2 className="mt-4 text-3xl font-bold">{upcomingCount}</h2>
              <p className="mt-2 text-xs text-muted">
                Adventures waiting for you
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Completed</p>
                <div className="rounded-xl bg-surface-soft p-3">
                  <CheckCircle2 size={20} className="text-primary-dark" />
                </div>
              </div>
              <h2 className="mt-4 text-3xl font-bold">{completedCount}</h2>
              <p className="mt-2 text-xs text-muted">
                Moments you've made count
              </p>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">
                  Your participation
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  My joined events
                </h2>
              </div>

              <div className="relative w-full md:max-w-sm">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search joined events..."
                  className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-5 text-sm outline-none transition focus:border-primary"
                />
              </div>
            </div>

            <div className="mt-7 flex gap-2">
              {["All", "Upcoming", "Completed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                    activeTab === tab
                      ? "bg-primary text-white"
                      : "border border-border bg-surface text-muted hover:bg-surface-soft"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {filteredEvents.length > 0 ? (
              <div className="mt-7 grid gap-6 md:grid-cols-2">
                {filteredEvents.map((event) => (
                  <article
                    key={event.id}
                    className="overflow-hidden rounded-3xl border border-border bg-surface transition hover:shadow-lg"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />

                      <span
                        className={`absolute left-4 top-4 rounded-full px-4 py-2 text-xs font-semibold ${
                          event.status === "Upcoming"
                            ? "bg-white/90 text-primary-dark"
                            : "bg-gray-800/80 text-white"
                        }`}
                      >
                        {event.status}
                      </span>

                      <span className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-700">
                        {event.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <span className="shrink-0 text-xs text-muted">
                          Joined {event.joinedOn}
                        </span>
                      </div>

                      <div className="mt-5 space-y-3 text-sm text-muted">
                        <p className="flex items-center gap-2">
                          <CalendarDays size={16} />
                          {event.date}
                        </p>

                        <p className="flex items-center gap-2">
                          <Clock size={16} />
                          {event.time}
                        </p>

                        <p className="flex items-center gap-2">
                          <MapPin size={16} />
                          {event.location}
                        </p>

                        <p className="flex items-center gap-2">
                          <Users size={16} />
                          Organized by {event.organizer}
                        </p>
                      </div>

                      <div className="mt-6 flex gap-3 border-t border-border pt-5">
                        <Link
                          href={`/events/${event.id}`}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-surface-soft px-4 py-3 text-sm font-semibold transition hover:bg-secondary"
                        >
                          View Details
                          <ArrowUpRight size={16} />
                        </Link>

                        {event.status === "Upcoming" && (
                          <button
                            onClick={() => setLeaveId(event.id)}
                            className="rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Leave
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-7 rounded-3xl border border-dashed border-border bg-surface px-5 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-soft">
                  <CalendarDays size={26} className="text-muted" />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  No events found
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">
                  {search
                    ? "Try another search term."
                    : "You haven't joined any events in this category yet. Discover something meaningful to do!"}
                </p>

                <Link
                  href="/events"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Explore Events
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-secondary/70 px-7 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/70">
              <Sparkles size={25} className="text-primary-dark" />
            </div>
            <h2 className="text-2xl font-bold">
              There's always more good to do.
            </h2>
            <p className="max-w-lg text-sm leading-7 text-muted">
              Discover new opportunities, meet wonderful people, and keep
              making a difference in your community.
            </p>
            <Link
              href="/events"
              className="mt-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Find Your Next Event
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {leaveId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-surface p-7 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                <X size={23} className="text-red-600" />
              </div>

              <button
                onClick={() => setLeaveId(null)}
                aria-label="Close confirmation"
                className="rounded-full p-2 text-muted transition hover:bg-surface-soft"
              >
                <X size={19} />
              </button>
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Leave this event?
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted">
              Are you sure you want to leave{" "}
              <span className="font-semibold text-foreground">
                {selectedEvent?.title}
              </span>
              ? You can always explore other events.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setLeaveId(null)}
                className="flex-1 rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:bg-surface-soft"
              >
                Stay Joined
              </button>

              <button
                onClick={confirmLeave}
                className="flex-1 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Leave Event
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
