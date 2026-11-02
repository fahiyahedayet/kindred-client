
"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import toast from "react-hot-toast";
import {
  CalendarDays,
  MapPin,
  Users,
  Heart,
  ArrowLeft,
  ArrowUpRight,
  Share2,
  CheckCircle2,
  Leaf,
  HandHeart,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "../../../lib/auth-client";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Event = {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  location: string;
  eventDate: string;
  tags: string[];
  creatorId: string;
  creatorEmail: string;
  volunteerCount: number;
};



export default function EventDetailsPage() {
  const params = useParams<{ id: string }>();
  const eventId = params.id;
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/events`);

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load event details.");
        }

        setEvents(result.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading the event."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const checkJoinStatus = async () => {
      try {
        const { data: tokenData, error: tokenError } =
          await authClient.token();

        if (tokenError || !tokenData?.token) {
          return;
        }

        const response = await fetch(
          `${API_URL}/api/events/${eventId}/join-status`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
          }
        );

        const result = await response.json();

        if (response.ok && result.success) {
          setHasJoined(Boolean(result.data.hasJoined));
        }
      } catch (error) {
        console.error("Failed to check join status:", error);
      }
    };

    if (eventId) {
      checkJoinStatus();
    }
  }, [eventId]);

  const event = events.find((item) => item._id === eventId);

  const relatedEvents = useMemo(() => {
    if (!event) return [];

    return events
      .filter(
        (item) =>
          item._id !== event._id &&
          item.category === event.category
      )
      .concat(
        events.filter(
          (item) =>
            item._id !== event._id &&
            item.category !== event.category
        )
      )
      .slice(0, 3);
  }, [events, event]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied!");
    } catch {
      toast.error("Unable to copy the event link.");
    }
  };

  const handleJoin = async () => {
    if (joining || hasJoined) return;

    setJoining(true);

    try {
      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        toast.error("Please sign in to join this event.");
        router.push("/sign-in");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/events/${eventId}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (response.status === 409) {
          setHasJoined(true);
        }

        throw new Error(result.message || "Failed to join this event.");
      }

      setHasJoined(true);

      setEvents((previous) =>
        previous.map((item) =>
          item._id === eventId
            ? {
              ...item,
              volunteerCount: result.data.volunteerCount,
            }
            : item
        )
      );

      toast.success("You have successfully joined this event!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setJoining(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <>


        <main className="flex min-h-[65vh] flex-col items-center justify-center bg-background px-5">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="mt-4 text-sm text-muted">
            Loading event details...
          </p>
        </main>


      </>
    );
  }

  if (error || !event) {
    return (
      <>


        <main className="flex min-h-[65vh] flex-col items-center justify-center bg-background px-5 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-soft">
            <Heart size={32} className="text-primary-dark" />
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            {error ? "Unable to load event" : "Event not found"}
          </h1>

          <p className="mt-3 max-w-md text-sm leading-7 text-muted">
            {error ||
              "This event may have been removed or the link is incorrect."}
          </p>

          <Link
            href="/events"
            className="mt-7 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Browse Events
          </Link>
        </main>


      </>
    );
  }

  return (
    <>


      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary-dark"
          >
            <ArrowLeft size={17} />
            Back to events
          </Link>
        </div>

        <section className="mx-auto max-w-7xl px-5 pb-16 pt-7 lg:px-8">
          <div className="relative h-[300px] overflow-hidden rounded-3xl sm:h-[420px] lg:h-[500px]">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <span className="inline-flex rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-primary-dark">
                {event.category}
              </span>

              <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                {event.title}
              </h1>

              <p className="mt-3 flex items-center gap-2 text-sm text-white/85 sm:text-base">
                <MapPin size={18} />
                {event.location}
              </p>
            </div>

            <button
              onClick={handleShare}
              aria-label="Share event"
              className="absolute right-5 top-5 rounded-full bg-white/90 p-3 text-gray-700 transition hover:bg-white"
            >
              <Share2 size={19} />
            </button>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_350px]">
            <div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-surface-soft p-5">
                  <CalendarDays size={21} className="text-primary-dark" />

                  <p className="mt-3 text-xs text-muted">
                    Event date
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {formatDate(event.eventDate)}
                  </p>
                </div>

                <div className="rounded-2xl bg-surface-soft p-5">
                  <MapPin size={21} className="text-primary-dark" />

                  <p className="mt-3 text-xs text-muted">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {event.location}
                  </p>
                </div>

                <div className="col-span-2 rounded-2xl bg-surface-soft p-5 sm:col-span-1">
                  <Users size={21} className="text-primary-dark" />

                  <p className="mt-3 text-xs text-muted">
                    Volunteers joined
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {event.volunteerCount} people
                  </p>
                </div>
              </div>

              <section className="mt-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">
                  About this event
                </p>

                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                  A little effort can create a big impact.
                </h2>

                <p className="mt-5 text-sm leading-8 text-muted sm:text-base">
                  {event.description}
                </p>
              </section>

              <section className="mt-10">
                <h2 className="text-xl font-bold">
                  Event information
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-primary-dark"
                    />

                    <p className="text-sm leading-6 text-muted">
                      Be part of a meaningful community initiative.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-primary-dark"
                    />

                    <p className="text-sm leading-6 text-muted">
                      Connect with other volunteers and make a difference.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-primary-dark"
                    />

                    <p className="text-sm leading-6 text-muted">
                      Contact the event organizer for additional information.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-xl font-bold">
                  Event tags
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {event.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-muted"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <aside className="h-fit rounded-3xl border border-border bg-surface p-6 shadow-sm lg:sticky lg:top-28">
              <p className="text-sm font-medium text-muted">
                Your presence matters
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {event.volunteerCount}
                <span className="text-lg font-medium text-muted">
                  {" "}volunteers
                </span>
              </h2>

              <p className="mt-3 text-xs leading-6 text-muted">
                {event.volunteerCount === 0
                  ? "Be the first to join this event."
                  : `${event.volunteerCount} volunteers are already part of this event.`}
              </p>

              <button
                onClick={handleJoin}
                disabled={joining || hasJoined}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {hasJoined ? (
                  <>
                    <CheckCircle2 size={18} />
                    Already Joined
                  </>
                ) : joining ? (
                  "Joining..."
                ) : (
                  <>
                    <Heart size={18} />
                    Join this event
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-muted">
                By joining, you become part of something meaningful.
              </p>

              <div className="my-7 border-t border-border" />

              <h3 className="text-sm font-bold">
                Organized by
              </h3>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-soft">
                  <Users size={22} className="text-primary-dark" />
                </div>

                <div className="min-w-0">
                  <p className="break-all text-sm font-semibold">
                    {event.creatorEmail || "Kindred Community"}
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    Event organizer
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-surface-soft p-4">
                <div className="flex items-center gap-2">
                  <Leaf size={17} className="text-primary-dark" />

                  <p className="text-xs font-semibold">
                    Small acts matter
                  </p>
                </div>

                <p className="mt-2 text-xs leading-6 text-muted">
                  Every volunteer brings us one step closer to a kinder,
                  stronger community.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-surface-soft py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">
                  Keep exploring
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  More ways to make a difference
                </h2>
              </div>

              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark"
              >
                View all events
                <ArrowUpRight size={18} />
              </Link>
            </div>

            {relatedEvents.length > 0 ? (
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedEvents.map((related) => (
                  <Link
                    key={related._id}
                    href={`/events/${related._id}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={related.imageUrl}
                        alt={related.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-semibold text-primary-dark">
                        {related.category}
                      </p>

                      <h3 className="mt-2 font-bold">
                        {related.title}
                      </h3>

                      <p className="mt-3 flex items-center gap-2 text-xs text-muted">
                        <CalendarDays size={14} />
                        {formatDate(related.eventDate)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-sm text-muted">
                No other events are available yet. Check back soon!
              </p>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-primary/15 px-7 py-10 text-center sm:px-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface">
              <HandHeart size={27} className="text-primary-dark" />
            </div>

            <h2 className="text-2xl font-bold">
              Have an idea of your own?
            </h2>

            <p className="max-w-lg text-sm leading-7 text-muted">
              Bring people together around something you care about. Create
              an event and inspire your community.
            </p>

            <Link
              href="/create-event"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Create an Event
            </Link>
          </div>
        </section>
      </main>


    </>
  );
}
