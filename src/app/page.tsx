
"use client";

import Link from "next/link";
import { FormEvent } from "react";
import toast from "react-hot-toast";

import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Users,
  TreePine,
  HandHeart,
  CalendarDays,
  MapPin,
  Clock,
  Sparkles,
  Leaf,
  Sprout,
  Globe2,
  Mail,
  Quote,
} from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "A Greener Tomorrow",
    category: "Environment",
    date: "NOV 08, 2026",
    time: "9:00 AM",
    location: "Patenga Beach, Chattogram",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900",
    color: "bg-[#dce8dd]",
    participants: 42,
  },
  {
    id: 2,
    title: "Meals With Love",
    category: "Community",
    date: "NOV 12, 2026",
    time: "11:00 AM",
    location: "GEC Circle, Chattogram",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900",
    color: "bg-[#f3ddd1]",
    participants: 28,
  },
  {
    id: 3,
    title: "Books Open Doors",
    category: "Education",
    date: "NOV 15, 2026",
    time: "10:00 AM",
    location: "Agrabad, Chattogram",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900",
    color: "bg-[#e9e3f2]",
    participants: 35,
  },
  {
    id: 4,
    title: "Little Hands, Big Hearts",
    category: "Children",
    date: "NOV 18, 2026",
    time: "10:30 AM",
    location: "Nasirabad, Chattogram",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900",
    color: "bg-[#f3ddd1]",
    participants: 19,
  },
  {
    id: 5,
    title: "Plant One, Grow Hope",
    category: "Environment",
    date: "NOV 22, 2026",
    time: "8:00 AM",
    location: "Foy's Lake, Chattogram",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900",
    color: "bg-[#dce8dd]",
    participants: 51,
  },
  {
    id: 6,
    title: "Warmth for Everyone",
    category: "Donation",
    date: "NOV 26, 2026",
    time: "2:00 PM",
    location: "Chawkbazar, Chattogram",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900",
    color: "bg-[#e9e3f2]",
    participants: 31,
  },
];

const pastEvents = [
  {
    title: "A Day of Giving",
    date: "October 18, 2026",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=700",
  },
  {
    title: "Clean Streets, Happy Hearts",
    date: "October 12, 2026",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=700",
  },
  {
    title: "Reading Together",
    date: "October 05, 2026",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700",
  },
  {
    title: "A Little More Sunshine",
    date: "September 28, 2026",
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=700",
  },
  {
    title: "Green Community Day",
    date: "September 20, 2026",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700",
  },
  {
    title: "Sharing Is Caring",
    date: "September 12, 2026",
    image:
      "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=700",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=700",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=700",
  "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=700",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=700",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700",
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-dark">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  const handleNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast("Newsletter subscriptions will be available soon!");
  };

  return (
    <>
    

      <main className="overflow-hidden">
       
        <section className="px-5 pb-16 pt-8 lg:px-8 lg:pb-24 lg:pt-12">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#dce8dd]">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1800')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#dce8dd] via-[#dce8dd]/90 to-[#dce8dd]/20" />

            <div className="relative grid min-h-[560px] items-center gap-10 px-7 py-16 sm:px-12 lg:grid-cols-2 lg:px-16 lg:py-20">
              <div className="max-w-xl">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#829b82]/30 bg-white/50 px-4 py-2 text-xs font-semibold text-[#526b53]">
                  <Sparkles size={15} />
                  A community built on kindness
                </div>

                <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-[#303a33] sm:text-6xl lg:text-7xl">
                  Small acts.
                  <br />
                  <span className="font-serif font-normal italic text-[#708b70]">
                    Greater change.
                  </span>
                </h1>

                <p className="mt-7 max-w-md text-base leading-8 text-[#59675b]">
                  Big changes begin with little things. Find your people,
                  discover meaningful events, and make a difference in the
                  community around you.
                </p>

                <div className="mt-9 flex flex-wrap gap-4">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 rounded-full bg-[#647e65] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#647e65]/20 transition hover:-translate-y-1 hover:bg-[#526b53]"
                  >
                    Explore Events <ArrowRight size={17} />
                  </Link>

                  <Link
                    href="/create-event"
                    className="inline-flex items-center gap-2 rounded-full border border-[#647e65]/40 bg-white/50 px-7 py-4 text-sm font-semibold text-[#435d45] transition hover:bg-white"
                  >
                    Start an Initiative
                  </Link>
                </div>

                <div className="mt-12 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[
                      "photo-1534528741775-53994a69daeb",
                      "photo-1500648767791-00dcc994a43e",
                      "photo-1531123897727-8f129e1688ce",
                      "photo-1506794778202-cad84cf45f1d",
                    ].map((photo) => (
                      <img
                        key={photo}
                        src={`https://images.unsplash.com/${photo}?w=80`}
                        alt="Kindred community member"
                        className="h-10 w-10 rounded-full border-2 border-[#dce8dd] object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#303a33]">
                      Good people. Great impact.
                    </p>
                    <p className="text-xs text-[#59675b]">
                      Growing together, one event at a time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative hidden h-[430px] lg:block">
                <img
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1000"
                  alt="People coming together as a community"
                  className="absolute right-0 top-1/2 h-[390px] w-[85%] -translate-y-1/2 rounded-[2rem] object-cover shadow-2xl"
                />
                <div className="absolute bottom-7 left-0 rounded-2xl bg-white p-5 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#e9e3f2] p-3 text-[#76688b]">
                      <Heart size={23} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#303a33]">100%</p>
                      <p className="text-xs text-[#747b70]">
                        Heart in everything we do
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute right-[-12px] top-8 rounded-full bg-[#f3ddd1] px-5 py-3 text-sm font-semibold text-[#78594d] shadow-lg">
                  Kindness looks good on you!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT COUNTERS */}
        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              {
                icon: Users,
                value: "2,500+",
                label: "Kind hearts",
                color: "bg-[#dce8dd]",
              },
              {
                icon: CalendarDays,
                value: "120+",
                label: "Events organized",
                color: "bg-[#e9e3f2]",
              },
              {
                icon: HandHeart,
                value: "8,000+",
                label: "Hours volunteered",
                color: "bg-[#f3ddd1]",
              },
              {
                icon: TreePine,
                value: "35+",
                label: "Communities reached",
                color: "bg-[#e7e8d9]",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1"
              >
                <div className={`mb-5 inline-flex rounded-xl p-3 ${item.color}`}>
                  <item.icon size={23} className="text-[#617c62]" />
                </div>
                <h3 className="text-2xl font-bold sm:text-3xl">
                  {item.value}
                </h3>
                <p className="mt-1 text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="bg-surface-soft py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1000"
                alt="Volunteers working together"
                className="h-[440px] w-full rounded-[2rem] object-cover"
              />
              <div className="absolute -bottom-7 -right-2 max-w-[220px] rounded-2xl bg-[#e9e3f2] p-5 shadow-xl sm:-right-7">
                <Quote size={25} className="mb-3 text-[#78688e]" />
                <p className="font-serif text-lg italic text-[#554b65]">
                  Alone we can do so little; together we can do so much.
                </p>
              </div>
            </div>

            <div className="pt-4 lg:pl-8">
              <SectionHeading
                eyebrow="A little about us"
                title="A kinder world starts right here."
                description="Kindred is a community-driven platform that brings people together to create positive social change. We believe everyone has something meaningful to give."
              />

              <div className="space-y-6">
                {[
                  {
                    icon: Heart,
                    title: "Kindness with purpose",
                    text: "Turn compassion into real actions that make a difference.",
                  },
                  {
                    icon: Users,
                    title: "People over everything",
                    text: "Connect with people who share your passion for change.",
                  },
                  {
                    icon: Globe2,
                    title: "Change that grows",
                    text: "Build stronger communities through collective effort.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="h-fit rounded-xl bg-background p-3 text-primary-dark">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/events"
                className="mt-9 inline-flex items-center gap-2 font-semibold text-primary-dark hover:gap-4"
              >
                Be part of our story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section id="events" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Make a difference"
              title="Find your next good thing."
              description="There is always something meaningful happening. Find an event that speaks to you and be part of the change."
            />
            <Link
              href="/events"
              className="mb-10 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary-dark hover:gap-4"
            >
              View all events <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <article
                key={event.id}
                className="group overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#536b54]">
                    {event.category}
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-xs font-bold tracking-wider text-primary-dark">
                    {event.date}
                  </p>
                  <h3 className="mt-3 text-xl font-bold transition group-hover:text-primary-dark">
                    {event.title}
                  </h3>

                  <div className="mt-5 space-y-3 text-sm text-muted">
                    <p className="flex items-center gap-2">
                      <Clock size={16} /> {event.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={16} /> {event.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users size={16} /> {event.participants} people interested
                    </p>
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    className="mt-6 flex items-center justify-between border-t border-border pt-5 text-sm font-semibold text-primary-dark"
                  >
                    Explore event <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="px-5 pb-20 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#e9e3f2] px-7 py-16 text-center sm:px-14">
            <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-white/30 blur-2xl" />
            <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-[#d3c6e6]/50 blur-2xl" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 text-[#78688e]">
                <HandHeart size={29} />
              </div>
              <h2 className="text-3xl font-bold text-[#453d54] sm:text-5xl">
                Your little idea could change someone's world.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#70667d] sm:text-base">
                Have an idea for making your community better? Bring it to life.
                Create an event and invite others to join your journey.
              </p>
              <Link
                href="/create-event"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#78688e] px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#655679]"
              >
                Create an Event <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* PREVIOUS EVENTS */}
        <section className="bg-surface-soft py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Our memories"
              title="Little moments. Lasting impact."
              description="Every event leaves behind a story. Take a look at some of the beautiful moments our community has created together."
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event, index) => (
                <article
                  key={event.title}
                  className="group relative h-72 overflow-hidden rounded-2xl"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <p className="mb-2 text-xs font-medium text-white/75">
                      {event.date}
                    </p>
                    <h3 className="text-xl font-bold">{event.title}</h3>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                    0{index + 1}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="The Kindred community"
              title="A gallery of good things."
              description="Smiles, shared moments, and little acts of kindness. This is what community looks like."
            />
            <span className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark">
              <Heart size={17} /> Moments that matter
            </span>
          </div>

          <div className="grid h-[550px] grid-cols-2 grid-rows-3 gap-3 sm:grid-cols-3 sm:grid-rows-2 sm:gap-5">
            {galleryImages.map((image, index) => (
              <div
                key={image}
                className={`overflow-hidden rounded-2xl ${
                  index === 0 ? "row-span-2" : ""
                } ${index === 3 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <img
                  src={image}
                  alt={`Kindred community moment ${index + 1}`}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="px-5 pb-20 lg:px-8 lg:pb-28">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#dce8dd] px-7 py-16 sm:px-14 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 text-[#647e65]">
                <Mail size={26} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#647e65]">
                Stay connected
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#303a33] sm:text-5xl">
                A little kindness in your inbox.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#59675b] sm:text-base">
                Get updates about upcoming events, inspiring stories, and new
                ways to make a difference.
              </p>

              <form
                onSubmit={handleNewsletter}
                className="mx-auto mt-9 flex max-w-lg flex-col gap-3 rounded-2xl bg-white p-2 sm:flex-row sm:rounded-full"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-sm text-[#303a33] outline-none placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#647e65] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#526b53]"
                >
                  Subscribe <ArrowRight className="ml-2 inline" size={16} />
                </button>
              </form>
              <p className="mt-4 text-xs text-[#647e65]">
                No spam. Just good things. ♡
              </p>
            </div>
          </div>
        </section>

      </main>

    </>
  );
}
