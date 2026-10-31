
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  ArrowLeft,
  Camera,
  UserRound,
  Mail,
  MapPin,
  FileText,
  Save,
  ImagePlus,
} from "lucide-react";

export default function UpdateProfilePage() {
  const [formData, setFormData] = useState({
    name: "Alex Morgan",
    email: "alex@example.com",
    location: "Chattogram, Bangladesh",
    bio: "Passionate about making a positive difference in the community. I believe every small act of kindness can create meaningful change.",
    image: "https://i.pravatar.cc/300?img=47",
  });

  const [imageError, setImageError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "image") {
      setImageError(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!formData.location.trim()) {
      toast.error("Please enter your location.");
      return;
    }

    if (formData.bio.length > 300) {
      toast.error("Your bio cannot exceed 300 characters.");
      return;
    }

    if (formData.image.trim()) {
      try {
        const imageUrl = new URL(formData.image);

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          toast.error("Please enter a valid image URL.");
          return;
        }
      } catch {
        toast.error("Please enter a valid image URL.");
        return;
      }
    }

    toast.success("Your profile information looks good!");
    toast("Profile saving will be connected when authentication and the API are ready.", {
      duration: 4000,
    });
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/profile"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary-dark"
          >
            <ArrowLeft size={18} />
            Back to Profile
          </Link>

          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary-dark">
              Your Account
            </p>

            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Update Your Profile
            </h1>

            <p className="mt-3 max-w-xl text-muted">
              Keep your information up to date and let the Kindred community
              know a little more about you.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-10">
              <div className="mb-10 flex flex-col items-center gap-5 border-b border-border pb-10 sm:flex-row">
                <div className="relative">
                  {formData.image.trim() && !imageError ? (
                    <img
                      src={formData.image}
                      alt="Profile preview"
                      onError={() => setImageError(true)}
                      className="h-28 w-28 rounded-full border-4 border-background object-cover shadow-md"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-surface-soft text-muted">
                      <UserRound size={44} />
                    </div>
                  )}

                  <span className="absolute bottom-1 right-1 rounded-full bg-primary p-2 text-white">
                    <Camera size={16} />
                  </span>
                </div>

                <div className="text-center sm:text-left">
                  <h2 className="text-lg font-semibold text-foreground">
                    Profile Photo
                  </h2>

                  <p className="mt-1 text-sm text-muted">
                    Add an image URL below to update your profile photo.
                  </p>

                  <p className="mt-2 text-xs text-muted">
                    Recommended: Square image, JPG or PNG.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground"
                  >
                    <UserRound size={16} />
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground"
                  >
                    <Mail size={16} />
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-border bg-surface-soft px-4 py-3 text-muted outline-none"
                  />

                  <p className="mt-2 text-xs text-muted">
                    Your email address cannot be changed here.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="location"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground"
                  >
                    <MapPin size={16} />
                    Location
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Your city and country"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="image"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground"
                  >
                    <ImagePlus size={16} />
                    Profile Image URL
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />

                  {imageError && formData.image.trim() && (
                    <p className="mt-2 text-xs text-red-500">
                      This image could not be loaded. Please check the URL.
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="bio"
                      className="flex items-center gap-2 text-sm font-semibold text-foreground"
                    >
                      <FileText size={16} />
                      About Me
                    </label>

                    <span className="text-xs text-muted">
                      {formData.bio.length}/300
                    </span>
                  </div>

                  <textarea
                    id="bio"
                    name="bio"
                    rows={5}
                    maxLength={300}
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell the community about yourself..."
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
                <Link
                  href="/profile"
                  className="rounded-xl border border-border px-6 py-3 text-center text-sm font-semibold text-foreground transition hover:bg-surface-soft"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  <Save size={17} />
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
