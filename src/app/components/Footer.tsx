
import Link from "next/link";
import { HeartHandshake, Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#303a33] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <HeartHandshake size={30} />
            <span className="text-2xl font-bold">kindred.</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
            Small acts. Greater change. Together, we're building stronger
            communities through kindness, compassion, and meaningful action.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20">
              <Instagram size={18} />
            </a>
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20">
              <Facebook size={18} />
            </a>
            <a href="mailto:hello@kindred.org" aria-label="Email" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-semibold">Explore</h3>
          <div className="flex flex-col gap-3 text-sm text-white/65">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/events" className="hover:text-white">Upcoming Events</Link>
            <Link href="/#about" className="hover:text-white">About Us</Link>
            <Link href="/sign-up" className="hover:text-white">Join Kindred</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-semibold">Get Involved</h3>
          <div className="flex flex-col gap-3 text-sm text-white/65">
            <Link href="/events" className="hover:text-white">Find Events</Link>
            <Link href="/create-event" className="hover:text-white">Create an Event</Link>
            <Link href="/sign-in" className="hover:text-white">Your Account</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-6 text-xs text-white/50 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Kindred. All rights reserved.</p>
          <p>Made with kindness, for a better tomorrow.</p>
        </div>
      </div>
    </footer>
  );
}
