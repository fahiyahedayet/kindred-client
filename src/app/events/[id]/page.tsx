
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Heart,
  ArrowLeft,
  ArrowUpRight,
  Share2,
  CheckCircle2,
  Leaf,
  HandHeart,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const events = [
  {
    id: "1",
    title: "A Cleaner Tomorrow",
    category: "Cleanup",
    date: "November 8, 2026",
    time: "8:00 AM – 12:00 PM",
    location: "Patenga Beach, Chattogram",
    description:
      "Our oceans and coastlines are home to countless forms of life, but plastic waste and pollution threaten these beautiful ecosystems every day. It's time to take action together.",
    fullDescription:
      "Join Kindred for a meaningful morning at Patenga Beach. Together, we'll collect plastic waste, sort recyclable materials, and spread awareness about keeping our coastline clean. Whether you're a first-time volunteer or an experienced environmental enthusiast, your contribution matters. We'll provide gloves, collection bags, and refreshments. Just bring your energy and willingness to make a difference.",
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1400",
    spots: 18,
    volunteers: 32,
    organizer: "Kindred Community",
    organizerImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200",
    tags: ["Environment", "Beach Cleanup", "Community"],
    requirements: [
      "Bring a reusable water bottle.",
      "Wear comfortable clothes and shoes.",
      "Gloves and cleaning supplies will be provided.",
    ],
  },
  {
    id: "2",
    title: "Plant a Little Hope",
    category: "Plantation",
    date: "November 12, 2026",
    time: "9:00 AM – 1:00 PM",
    location: "CRB, Chattogram",
    description:
      "Help us make our neighborhoods greener by planting trees together.",
    fullDescription:
      "Every tree we plant is a promise to the future. Spend a refreshing morning with fellow volunteers as we plant trees and learn about caring for our local environment. Let's make our city greener, one little plant at a time.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400",
    spots: 12,
    volunteers: 28,
    organizer: "Green Tomorrow",
    organizerImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200",
    tags: ["Plantation", "Environment", "Nature"],
    requirements: [
      "Wear comfortable outdoor clothes.",
      "Bring a reusable water bottle.",
      "All plants and tools will be provided.",
    ],
  },
  {
    id: "3",
    title: "Warm Hearts, Warm Homes",
    category: "Donation",
    date: "November 15, 2026",
    time: "10:00 AM – 2:00 PM",
    location: "GEC Circle, Chattogram",
    description:
      "Collect and distribute warm clothes to families who need them most.",
    fullDescription:
      "Winter can be especially difficult for families who lack warm clothing. Join us in collecting, sorting, and distributing winter essentials to people in need. Every small contribution can bring warmth and comfort to someone.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400",
    spots: 25,
    volunteers: 45,
    organizer: "Kindred Community",
    organizerImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200",
    tags: ["Donation", "Winter Care", "Community"],
    requirements: [
      "Bring clean and usable winter clothing if possible.",
      "Wear comfortable clothes.",
      "Sorting materials will be provided.",
    ],
  },
  {
    id: "4",
    title: "Food for Everyone",
    category: "Community",
    date: "November 18, 2026",
    time: "11:00 AM – 3:00 PM",
    location: "Agrabad, Chattogram",
    description:
      "Prepare and share meals with people in our local community.",
    fullDescription:
      "A shared meal can create a sense of belonging. Help prepare and distribute nutritious meals to members of our community. You can help with food preparation, packaging, or distribution.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1400",
    spots: 10,
    volunteers: 35,
    organizer: "Kindred Community",
    organizerImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200",
    tags: ["Food Support", "Community", "Volunteering"],
    requirements: [
      "Wear comfortable clothes.",
      "Follow food safety instructions.",
      "All supplies will be provided.",
    ],
  },
  {
    id: "5",
    title: "Books Open Doors",
    category: "Education",
    date: "November 22, 2026",
    time: "9:00 AM – 12:00 PM",
    location: "Panchlaish, Chattogram",
    description:
      "Collect books and create learning opportunities for young students.",
    fullDescription:
      "Education opens doors to new possibilities. Help us collect books, organize learning materials, and spend time supporting young students. Your time and encouragement can make a lasting difference.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400",
    spots: 20,
    volunteers: 22,
    organizer: "Learning Together",
    organizerImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200",
    tags: ["Education", "Books", "Children"],
    requirements: [
      "Bring donated books if available.",
      "Be ready to interact with students.",
      "Learning materials will be provided.",
    ],
  },
  {
    id: "6",
    title: "Care Beyond Borders",
    category: "Community",
    date: "November 26, 2026",
    time: "10:00 AM – 1:00 PM",
    location: "Chawkbazar, Chattogram",
    description:
      "Spend time supporting elderly members of our community.",
    fullDescription:
      "Sometimes the most meaningful gift is simply being present. Spend a few hours with elderly community members, share stories, offer companionship, and help with small activities. A little kindness can brighten someone's day.",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400",
    spots: 15,
    volunteers: 19,
    organizer: "Kindred Community",
    organizerImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200",
    tags: ["Elderly Care", "Community", "Compassion"],
    requirements: [
      "Bring a kind and friendly attitude.",
      "Respect everyone's comfort and privacy.",
      "Activity materials will be provided.",
    ],
  },
];

export default function EventDetailsPage() {
  const params = useParams<{ id: string }>();
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  const event = events.find((item) => item.id === params.id);

  const handleJoin = () => {
    setJoining(true);

    setTimeout(() => {
      setJoining(false);
      setJoined(true);
      toast.success("You're on your way to making a difference!");
    }, 500);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied!");
    } catch {
      toast.error("Unable to copy the event link.");
    }
  };

  if (!event) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[65vh] flex-col items-center justify-center px-5 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-soft">
            <Heart size={32} className="text-primary-dark" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">Event not found</h1>
          <p className="mt-3 text-muted">
            This event may have been removed or the link is incorrect.
          </p>
          <Link
            href="/events"
            className="mt-7 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white"
          >
            Browse Events
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const relatedEvents = events
    .filter((item) => item.id !== event.id && item.category === event.category)
    .concat(events.filter((item) => item.id !== event.id && item.category !== event.category))
    .slice(0, 3);

  return (
    <>
      <Navbar />

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
              src={event.image}
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
                  <p className="mt-3 text-xs text-muted">Event date</p>
                  <p className="mt-1 text-sm font-semibold">{event.date}</p>
                </div>

                <div className="rounded-2xl bg-surface-soft p-5">
                  <Clock size={21} className="text-primary-dark" />
                  <p className="mt-3 text-xs text-muted">Event time</p>
                  <p className="mt-1 text-sm font-semibold">{event.time}</p>
                </div>

                <div className="col-span-2 rounded-2xl bg-surface-soft p-5 sm:col-span-1">
                  <Users size={21} className="text-primary-dark" />
                  <p className="mt-3 text-xs text-muted">Volunteers joined</p>
                  <p className="mt-1 text-sm font-semibold">
                    {event.volunteers} people
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
                <p className="mt-4 text-sm leading-8 text-muted sm:text-base">
                  {event.fullDescription}
                </p>
              </section>

              <section className="mt-10">
                <h2 className="text-xl font-bold">What to expect</h2>
                <div className="mt-5 space-y-4">
                  {event.requirements.map((requirement) => (
                    <div key={requirement} className="flex gap-3">
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-primary-dark"
                      />
                      <p className="text-sm leading-6 text-muted">
                        {requirement}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-xl font-bold">Event tags</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
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
                {event.spots} <span className="text-lg font-medium text-muted">spots left</span>
              </h2>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-surface-soft">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${(event.volunteers / (event.volunteers + event.spots)) * 100}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-xs text-muted">
                {event.volunteers} volunteers are already part of this event.
              </p>

              <button
                onClick={handleJoin}
                disabled={joined || joining}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {joined ? (
                  <>
                    <CheckCircle2 size={18} />
                    You're joining!
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

              <h3 className="text-sm font-bold">Organized by</h3>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={event.organizerImage}
                  alt={event.organizer}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{event.organizer}</p>
                  <p className="mt-1 text-xs text-muted">Event organizer</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-surface-soft p-4">
                <div className="flex items-center gap-2">
                  <Leaf size={17} className="text-primary-dark" />
                  <p className="text-xs font-semibold">Small acts matter</p>
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

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedEvents.map((related) => (
                <Link
                  key={related.id}
                  href={`/events/${related.id}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold text-primary-dark">
                      {related.category}
                    </p>
                    <h3 className="mt-2 font-bold">{related.title}</h3>
                    <p className="mt-3 flex items-center gap-2 text-xs text-muted">
                      <CalendarDays size={14} />
                      {related.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
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

      <Footer />
    </>
  );
}
