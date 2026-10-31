
"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CalendarDays,
  TicketCheck,
  CheckCircle2,
  Heart,
  ArrowUpRight,
} from "lucide-react";

export default function JoinedEventsPage() {
  const totalJoined = 4;
  const upcomingCount = 3;
  const completedCount = 1;

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
              <h2 className="mt-4 text-3xl font-bold">{totalJoined}</h2>
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
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">
              Your participation
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              My joined events
            </h2>

            <div className="mt-8 rounded-3xl border border-dashed border-border bg-surface px-5 py-16 text-center">
              <CalendarDays size={35} className="mx-auto text-muted" />
              <h3 className="mt-5 text-xl font-bold">
                Your events will appear here
              </h3>
              <p className="mt-2 text-sm text-muted">
                Explore events and start your kindness journey.
              </p>
              <Link
                href="/events"
                className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
              >
                Explore Events
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
