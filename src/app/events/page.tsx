
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  SlidersHorizontal,
  Heart,
} from "lucide-react";


type Event = {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  location: string;
  eventDate: string;
  tags: string[];
  volunteerCount: number;
};

const categories = [
  "All",
  "Cleanup",
  "Plantation",
  "Donation",
  "Community",
  "Education",
  "Other",
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load events.");
        }

        setEvents(result.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading events."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        activeCategory === "All" || event.category === activeCategory;

      const searchText = search.toLowerCase();

      const matchesSearch =
        event.title.toLowerCase().includes(searchText) ||
        event.location.toLowerCase().includes(searchText) ||
        event.category.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [events, search, activeCategory]);

  return (
    <>



      <main className="min-h-screen bg-background">
        <section className="relative overflow-hidden bg-surface-soft px-5 py-20 lg:px-8">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-secondary/60 blur-3xl" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-peach/60 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest !text-[#303A33]">
                <Heart size={14} className="!text-[#303A33]" />
                Make a difference
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Find your next
                <span className="text-primary-dark">
                  {" "}meaningful moment.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-muted sm:text-lg">
                Discover local events, meet kind people, and turn small acts
                of kindness into something greater.
              </p>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted">
                <span className="flex items-center gap-2">
                  <CalendarDays size={17} />
                  Community events
                </span>

                <span className="flex items-center gap-2">
                  <Heart size={17} />
                  Meaningful connections
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">
                Explore opportunities
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Upcoming Events
              </h2>

              <p className="mt-3 text-sm text-muted">
                Find an event that speaks to your heart.
              </p>
            </div>

            <p className="text-sm font-medium text-muted">
              {filteredEvents.length}{" "}
              {filteredEvents.length === 1 ? "event" : "events"} found
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by event, category, or location..."
                className="w-full rounded-full border border-border bg-surface py-3.5 pl-12 pr-5 text-sm outline-none transition placeholder:text-muted focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <SlidersHorizontal
                size={18}
                className="shrink-0 text-muted"
              />

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition ${activeCategory === category
                      ? "bg-primary text-white"
                      : "border border-border bg-surface text-muted hover:bg-surface-soft"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

              <p className="mt-4 text-sm text-muted">
                Loading upcoming events...
              </p>
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-border bg-surface px-5 py-16 text-center">
              <h3 className="text-xl font-bold">
                Unable to load events
              </h3>

              <p className="mt-2 text-sm text-muted">
                {error}
              </p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <article
                  key={event._id}
                  className="group overflow-hidden rounded-3xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-primary-dark backdrop-blur">
                      {event.category}
                    </span>

                    <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700">
                      {event.volunteerCount} volunteers joined
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-medium text-primary-dark">
                      <CalendarDays size={15} />

                      {new Date(event.eventDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </div>

                    <h3 className="mt-4 text-xl font-bold transition group-hover:text-primary-dark">
                      {event.title}
                    </h3>

                    <p className="mt-3 min-h-12 text-sm leading-6 text-muted">
                      {event.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-sm text-muted">
                      <MapPin size={16} className="shrink-0" />

                      <span>{event.location}</span>
                    </div>

                    <div className="mt-6 border-t border-border pt-5">
                      <Link
                        href={`/events/${event._id}`}
                        className="flex items-center justify-between text-sm font-semibold text-primary-dark transition hover:gap-3"
                      >
                        Explore event
                        <ArrowUpRight size={19} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-surface px-5 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-soft">
                <Search size={26} className="text-muted" />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No events found
              </h3>

              <p className="mt-2 text-sm text-muted">
                Try another search term or choose a different category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-secondary/70 px-7 py-10 text-center sm:px-12 md:flex-row md:text-left">
            <div>
              <h2 className="text-2xl font-bold">
                Have an idea that could help?
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                Bring your community together. Start an event of your own.
              </p>
            </div>

            <Link
              href="/create-event"
              className="shrink-0 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Create an Event
            </Link>
          </div>
        </section>
      </main>

    </>
  );
}
