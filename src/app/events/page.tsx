
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  SlidersHorizontal,
  Heart,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const events = [
  {
    id: "1",
    title: "A Cleaner Tomorrow",
    category: "Cleanup",
    date: "November 8, 2026",
    location: "Patenga Beach, Chattogram",
    description:
      "Join hands to clean our coastline and protect marine life from pollution.",
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=900",
    spots: 18,
  },
  {
    id: "2",
    title: "Plant a Little Hope",
    category: "Plantation",
    date: "November 12, 2026",
    location: "CRB, Chattogram",
    description:
      "Help us make our neighborhoods greener by planting trees together.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900",
    spots: 12,
  },
  {
    id: "3",
    title: "Warm Hearts, Warm Homes",
    category: "Donation",
    date: "November 15, 2026",
    location: "GEC Circle, Chattogram",
    description:
      "Collect and distribute warm clothes to families who need them most.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900",
    spots: 25,
  },
  {
    id: "4",
    title: "Food for Everyone",
    category: "Community",
    date: "November 18, 2026",
    location: "Agrabad, Chattogram",
    description:
      "Prepare and share meals with people in our local community.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900",
    spots: 10,
  },
  {
    id: "5",
    title: "Books Open Doors",
    category: "Education",
    date: "November 22, 2026",
    location: "Panchlaish, Chattogram",
    description:
      "Collect books and create learning opportunities for young students.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900",
    spots: 20,
  },
  {
    id: "6",
    title: "Care Beyond Borders",
    category: "Community",
    date: "November 26, 2026",
    location: "Chawkbazar, Chattogram",
    description:
      "Spend time supporting elderly members of our community.",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900",
    spots: 15,
  },
];

const categories = [
  "All",
  "Cleanup",
  "Plantation",
  "Donation",
  "Community",
  "Education",
];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

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
  }, [search, activeCategory]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        <section className="relative overflow-hidden bg-surface-soft px-5 py-20 lg:px-8">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-secondary/60 blur-3xl" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-peach/60 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-dark">
                <Heart size={14} />
                Make a difference
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Find your next
                <span className="text-primary-dark"> meaningful moment.</span>
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
            

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <SlidersHorizontal
                size={18}
                className="shrink-0 text-muted"
              />

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "border border-border bg-surface text-muted hover:bg-surface-soft"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <article
                  key={event.id}
                  className="group overflow-hidden rounded-3xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-primary-dark backdrop-blur">
                      {event.category}
                    </span>

                    <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700">
                      {event.spots} spots left
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-medium text-primary-dark">
                      <CalendarDays size={15} />
                      {event.date}
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
                        href={`/events/${event.id}`}
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

              <h3 className="mt-5 text-xl font-bold">No events found</h3>
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

      <Footer />
    </>
  );
}
