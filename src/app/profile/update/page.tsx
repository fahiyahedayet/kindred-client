"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "../../../lib/auth-client";

import {
  ArrowLeft,
  Camera,
  UserRound,
  Mail,
  MapPin,
  FileText,
  Save,
  ImagePlus,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

type ProfileFormData = {
  name: string;
  email: string;
  location: string;
  bio: string;
  image: string;
};

const initialFormData: ProfileFormData = {
  name: "",
  email: "",
  location: "",
  bio: "",
  image: "",
};

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [formData, setFormData] = useState<ProfileFormData>(initialFormData);
  const [originalData, setOriginalData] =
    useState<ProfileFormData>(initialFormData);
  const [imageError, setImageError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      const userData: ProfileFormData = {
        name: session.user.name || "",
        email: session.user.email || "",
        location: session.user.location || "",
        bio: session.user.bio || "",
        image: session.user.image || "",
      };

      setFormData(userData);
      setOriginalData(userData);
    }
  }, [session]);

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

  const handleReset = () => {
    setFormData(originalData);
    setImageError(false);
    toast.success("Your changes have been reset.");
  };

  const isChanged =
    formData.name !== originalData.name ||
    formData.image !== originalData.image ||
    formData.location !== originalData.location ||
    formData.bio !== originalData.bio;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error("Your name must contain at least 2 characters.");
      return;
    }

    if (formData.bio.trim().length > 300) {
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

    if (!isChanged) {
      toast("You haven't made any changes yet.");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: formData.name.trim(),
        image: formData.image.trim() || null,
        location: formData.location.trim(),
        bio: formData.bio.trim(),
      });

      if (error) {
        toast.error(error.message || "Failed to update your profile.");
        return;
      }

      const updatedData: ProfileFormData = {
        ...formData,
        name: formData.name.trim(),
        location: formData.location.trim(),
        bio: formData.bio.trim(),
        image: formData.image.trim(),
      };

      setFormData(updatedData);
      setOriginalData(updatedData);

      toast.success("Your profile has been updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Something went wrong while updating your profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="mt-4 text-sm text-muted">Loading your profile...</p>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground">
            Please sign in first
          </h1>
          <Link
            href="/sign-in"
            className="mt-4 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/profile"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary-dark"
        >
          <ArrowLeft size={18} />
          Back to Profile
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-primary-dark sm:text-sm">
            Your Account Settings
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Update Your Profile
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-muted sm:text-base">
            Your profile tells your story. Keep your information updated and
            help the Kindred community get to know you better.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
            <div className="border-b border-border bg-surface-soft/60 px-6 py-5 sm:px-10">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/15 p-2.5 text-primary-dark">
                  <UserRound size={21} />
                </div>

                <div>
                  <h2 className="font-semibold text-foreground">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-xs text-muted">
                    Manage your public profile details.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <div className="mb-10 flex flex-col items-center gap-5 rounded-2xl border border-border bg-background p-6 sm:flex-row">
                <div className="relative shrink-0">
                  {formData.image.trim() && !imageError ? (
                    <img
                      src={formData.image}
                      alt="Profile preview"
                      onError={() => setImageError(true)}
                      className="h-28 w-28 rounded-full border-4 border-surface object-cover shadow-md"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-surface-soft text-muted">
                      <UserRound size={44} />
                    </div>
                  )}

                  <span className="absolute bottom-1 right-1 rounded-full bg-primary p-2 text-white shadow">
                    <Camera size={16} />
                  </span>
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-foreground">
                    Profile Photo
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted">
                    Add an image URL to preview your new profile photo.
                  </p>

                  <p className="mt-2 text-xs text-muted">
                    Recommended: Square JPG or PNG image.
                  </p>

                  {imageError && (
                    <p className="mt-2 text-xs text-red-500">
                      Unable to load this image. Please check the URL.
                    </p>
                  )}
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
                    required
                    minLength={2}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                    className="w-full cursor-not-allowed rounded-xl border border-border bg-surface-soft px-4 py-3 text-sm text-muted outline-none"
                  />

                  <p className="mt-2 text-xs text-muted">
                    Email address cannot be changed here.
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
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="bio"
                      className="flex items-center gap-2 text-sm font-semibold text-foreground"
                    >
                      <FileText size={16} />
                      About Me
                    </label>

                    <span
                      className={`text-xs font-medium ${
                        formData.bio.length >= 280
                          ? "text-orange-500"
                          : "text-muted"
                      }`}
                    >
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
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm leading-7 text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />

                  <p className="mt-2 text-xs text-muted">
                    Share your interests, passions, or why you joined Kindred.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-surface-soft/60 p-4">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-primary-dark"
                />

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Your information is important
                  </p>
                  <p className="mt-1 text-xs leading-6 text-muted">
                    Your email address is protected and cannot be edited from
                    this page. Your name, profile photo, location, and bio are
                    saved to your account.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted transition hover:text-foreground"
                >
                  <RotateCcw size={16} />
                  Reset Changes
                </button>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <Link
                    href="/profile"
                    className="rounded-xl border border-border px-6 py-3 text-center text-sm font-semibold text-foreground transition hover:bg-surface-soft"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={!isChanged || isSaving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save size={17} />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted">
                <CheckCircle2 size={14} />
                Your changes are checked before submission.
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}