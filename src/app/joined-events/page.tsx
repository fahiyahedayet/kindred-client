
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CalendarDays,
  TicketCheck,
  CheckCircle2,
  Heart,
  ArrowUpRight,
  Search,
} from "lucide-react";

type JoinedEvent = {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  status: "Upcoming" | "Completed";
};

const initialEvents: JoinedEvent[] = [
  {
    id: "1",
    title: "A Cleaner Tomorrow",
    category: "Cleanup",
    date: "November 8, 2026",
    location: "Patenga Beach, Chattogram",
    status: "Upcoming",
  },
  {
    id: "2",
    title: "Plant a Little Hope",
    category: "Plantation",
    date: "November 12, 2026",
    location: "CRB, Chattogram",
    status: "Upcoming",
  },
  {
    id: "3",
    title: "Warm Hearts, Warm Homes",
    category: "Donation",
    date: "November 15, 2026",
    location: "GEC Circle, Chattogram",
    status: "Upcoming",
  },
  {
    id: "4",
    title: "A Day of Giving",
    category: "Community",
    date: "October 10, 2026",
    location: "Agrabad, Chattogram",
    status: "Completed",
  },
];

export default function JoinedEventsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      const matchesTab =
        activeTab === "All" || event.status === activeTab;

      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const upcomingCount = initialEvents.filter(
    (event) => event.status === "Upcoming"
  ).length;

  const completedCount = initialEvents.filter(
    (event) => event.status === "Completed"
  ).length;

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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
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
                <TicketCheck size={20} className="text-primary-dark" />
              </div>
              <h2 className="mt-4 text-3xl font-bold">
                {initialEvents.length}
              </h2>
              <p className="mt-2 text-xs text-muted">
                Your community commitments
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Upcoming</p>
                <CalendarDays size={20} className="text-primary-dark" />
              </div>
              <h2 className="mt-4 text-3xl font-bold">{upcomingCount}</h2>
              <p className="mt-2 text-xs text-muted">
                Adventures waiting for you
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Completed</p>
                <CheckCircle2 size={20} className="text-primary-dark" />
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

            {filteredEvents.length === 0 && (
              <div className="mt-7 rounded-3xl border border-dashed border-border bg-surface px-5 py-16 text-center">
                <CalendarDays size={35} className="mx-auto text-muted" />
                <h3 className="mt-5 text-xl font-bold">No events found</h3>
                <p className="mt-2 text-sm text-muted">
                  Try another search term or choose a different category.
                </p>
              </div>
            )}

            {filteredEvents.length > 0 && (
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {filteredEvents.map((event) => (
                  <article
                    key={event.id}
                    className="rounded-2xl border border-border bg-surface p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold text-primary-dark">
                          {event.category}
                        </span>
                        <h3 className="mt-2 text-xl font-bold">
                          {event.title}
                        </h3>
                      </div>
                      <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-medium">
                        {event.status}
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-muted">{event.date}</p>
                    <p className="mt-2 text-sm text-muted">
                      {event.location}
                    </p>

                    <Link
                      href={`/events/${event.id}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark"
                    >
                      View Details
                      <ArrowUpRight size={16} />
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
