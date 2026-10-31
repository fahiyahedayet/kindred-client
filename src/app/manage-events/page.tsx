"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
    Plus,
    Search,
    CalendarDays,
    MapPin,
    Users,
    Pencil,
    Trash2,
    Eye,
    ArrowUpRight,
    HeartHandshake,
    X,
    LayoutList,
    Clock,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Event = {
    id: string;
    title: string;
    category: string;
    date: string;
    location: string;
    image: string;
    volunteers: number;
    spots: number;
    status: "Upcoming" | "Completed";
};

const initialEvents: Event[] = [
    {
        id: "1",
        title: "A Cleaner Tomorrow",
        category: "Cleanup",
        date: "November 8, 2026",
        location: "Patenga Beach, Chattogram",
        image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800",
        volunteers: 32,
        spots: 18,
        status: "Upcoming",
    },
    {
        id: "2",
        title: "Plant a Little Hope",
        category: "Plantation",
        date: "November 12, 2026",
        location: "CRB, Chattogram",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
        volunteers: 28,
        spots: 12,
        status: "Upcoming",
    },
    {
        id: "3",
        title: "Warm Hearts, Warm Homes",
        category: "Donation",
        date: "November 15, 2026",
        location: "GEC Circle, Chattogram",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
        volunteers: 45,
        spots: 25,
        status: "Upcoming",
    },
    {
        id: "4",
        title: "Community Food Drive",
        category: "Community",
        date: "October 10, 2026",
        location: "Agrabad, Chattogram",
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
        volunteers: 40,
        spots: 0,
        status: "Completed",
    },
];

export default function ManageEventsPage() {
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesFilter =
        activeFilter === "All" || event.status === activeFilter;

      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [events, activeFilter, search]);

  const upcomingCount = events.filter(
    (event) => event.status === "Upcoming"
  ).length;

  const totalVolunteers = events.reduce(
    (total, event) => total + event.volunteers,
    0
  );

  const confirmDelete = () => {
    if (!deleteId) return;

    setEvents((previous) =>
      previous.filter((event) => event.id !== deleteId)
    );

    setDeleteId(null);
    toast.success("Event removed successfully.");
  };

  const selectedEvent = events.find((event) => event.id === deleteId);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        <section className="bg-surface-soft px-5 py-12 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">
                  Your community dashboard
                </p>
                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Manage your events
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
                  Keep track of the events you organize and the people
                  joining your mission.
                </p>
              </div>

              <Link
                href="/create-event"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                <Plus size={19} />
                Create New Event
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Total events</p>
                <div className="rounded-xl bg-secondary p-3">
                  <LayoutList size={20} className="text-primary-dark" />
                </div>
              </div>
              <h2 className="mt-4 text-3xl font-bold">{events.length}</h2>
              <p className="mt-2 text-xs text-muted">Events in your dashboard</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Upcoming events</p>
                <div className="rounded-xl bg-peach p-3">
                  <CalendarDays size={20} className="text-primary-dark" />
                </div>
              </div>
              <h2 className="mt-4 text-3xl font-bold">{upcomingCount}</h2>
              <p className="mt-2 text-xs text-muted">Waiting for volunteers</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Total volunteers</p>
                <div className="rounded-xl bg-surface-soft p-3">
                  <Users size={20} className="text-primary-dark" />
                </div>
              </div>
              <h2 className="mt-4 text-3xl font-bold">{totalVolunteers}</h2>
              <p className="mt-2 text-xs text-muted">People you've brought together</p>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <h2 className="text-2xl font-bold">Your events</h2>
                <p className="mt-2 text-sm text-muted">
                  View and organize your community activities.
                </p>
              </div>

              <div className="relative w-full md:max-w-sm">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search your events..."
                  className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-5 text-sm outline-none transition focus:border-primary"
                />
              </div>
            </div>

            <div className="mt-7 flex gap-2">
              {["All", "Upcoming", "Completed"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-primary text-white"
                      : "border border-border bg-surface text-muted hover:bg-surface-soft"
                  }`}
                >
                  {filter}
                  {filter === "All" && ` (${events.length})`}
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
                        className="h-full w-full object-cover"
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
                      <h3 className="text-xl font-bold">{event.title}</h3>

                      <div className="mt-4 space-y-3 text-sm text-muted">
                        <p className="flex items-center gap-2">
                          <CalendarDays size={16} />
                          {event.date}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin size={16} />
                          {event.location}
                        </p>
                        <p className="flex items-center gap-2">
                          <Users size={16} />
                          {event.volunteers} volunteers joined
                        </p>
                      </div>

                      <div className="mt-5 h-2 overflow-hidden rounded-full bg-surface-soft">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{
                            width: `${
                              (event.volunteers /
                                Math.max(event.volunteers + event.spots, 1)) *
                              100
                            }%`,
                          }}
                        />
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
                        <Link
                          href={`/events/${event.id}`}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-surface-soft px-4 py-2.5 text-xs font-semibold transition hover:bg-secondary"
                        >
                          <Eye size={16} />
                          View
                        </Link>

                        <Link
                          href={`/manage-events/edit/${event.id}`}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-surface-soft px-4 py-2.5 text-xs font-semibold transition hover:bg-secondary"
                        >
                          <Pencil size={16} />
                          Edit
                        </Link>

                        <button
                          onClick={() => setDeleteId(event.id)}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-7 rounded-3xl border border-dashed border-border bg-surface px-5 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-soft">
                  <Search size={25} className="text-muted" />
                </div>
                <h3 className="mt-5 text-xl font-bold">No events found</h3>
                <p className="mt-2 text-sm text-muted">
                  Try another search or change your filter.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveFilter("All");
                  }}
                  className="mt-5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-5 rounded-3xl bg-secondary/70 px-7 py-9 sm:flex-row sm:px-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/70">
                <HeartHandshake size={24} className="text-primary-dark" />
              </div>
              <div>
                <h3 className="font-bold">Ready to make another difference?</h3>
                <p className="mt-1 text-xs text-muted">
                  Start a new initiative with your community.
                </p>
              </div>
            </div>

            <Link
              href="/create-event"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Create Event
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-surface p-7 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                <Trash2 size={23} className="text-red-600" />
              </div>

              <button
                onClick={() => setDeleteId(null)}
                aria-label="Close confirmation"
                className="rounded-full p-2 text-muted transition hover:bg-surface-soft"
              >
                <X size={19} />
              </button>
            </div>

            <h2 className="mt-5 text-xl font-bold">Delete this event?</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {selectedEvent?.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:bg-surface-soft"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

