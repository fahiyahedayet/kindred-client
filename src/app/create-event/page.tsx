
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  ImagePlus,
  Tag,
  Clock,
  HeartHandshake,
  Plus,
  X,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "../../lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const categories = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Community",
  "Education",
  "Animal Welfare",
  "Healthcare",
  "Other",
];

export default function CreateEventPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    date: "",
    time: "",
    image: "",
  });

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");

  const updateField = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const addTag = () => {
    const newTag = tagInput.trim().replace(/^#/, "");

    if (!newTag) return;

    if (tags.length >= 5) {
      toast.error("You can add up to 5 tags.");
      return;
    }

    if (tags.some((tag) => tag.toLowerCase() === newTag.toLowerCase())) {
      toast.error("This tag already exists.");
      return;
    }

    setTags((previous) => [...previous, newTag]);
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags((previous) => previous.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("SUBMIT HANDLER WORKING");

    if (!formData.category) {
      toast.error("Please select an event category.");
      return;
    }

    if (!formData.category) {
      toast.error("Please select an event category.");
      return;
    }

    if (!formData.date || !formData.time) {
      toast.error("Please select an event date and time.");
      return;
    }

    const eventDate = new Date(
      `${formData.date}T${formData.time}:00`
    );

    if (Number.isNaN(eventDate.getTime()) || eventDate <= new Date()) {
      toast.error("Please select a future event date and time.");
      return;
    }

    if (formData.description.trim().length < 30) {
      toast.error("Description must be at least 30 characters.");
      return;
    }

    if (formData.image && !/^https?:\/\/.+/i.test(formData.image)) {
      toast.error("Please enter a valid image URL.");
      return;
    }

    setSubmitting(true);

    try {
      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        toast.error("Please sign in again to create an event.");
        router.push("/sign-in");
        return;
      }

      const response = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          category: formData.category,
          description: formData.description.trim(),
          location: formData.location.trim(),
          eventDate: eventDate.toISOString(),
          imageUrl: formData.image.trim(),
          tags,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create your event.");
      }

      toast.success("Your event has been created successfully!");

      router.push(`/events/${result.data._id}`);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-surface-soft px-5 py-14 lg:px-8">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-secondary/70 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-peach/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary-dark"
          >
            <ArrowLeft size={17} />
            Back to events
          </Link>

          <div className="mt-9 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-dark">
              <Sparkles size={14} />
              Make something meaningful
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Create an event.
              <span className="block text-primary-dark">
                Inspire a community.
              </span>
            </h1>

            <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
              Every great change starts with someone taking the first step.
              Share your idea and bring people together.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-9"
          >
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">
                Event information
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Tell us about your event
              </h2>
              <p className="mt-2 text-sm text-muted">
                Fill in the details below to get your event started.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-semibold">
                  Event title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  minLength={5}
                  maxLength={80}
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g. A Cleaner Tomorrow"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition placeholder:text-muted focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="category" className="mb-2 block text-sm font-semibold">
                  Event category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition focus:border-primary"
                >
                  <option value="">Choose a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-semibold">
                  Event description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  required
                  minLength={30}
                  maxLength={1500}
                  rows={5}
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Tell people what your event is about, why it matters, and how they can participate..."
                  className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3.5 text-sm leading-7 outline-none transition placeholder:text-muted focus:border-primary"
                />
                <p className="mt-2 text-right text-xs text-muted">
                  {formData.description.length}/1500 characters
                </p>
              </div>

              <div className="border-t border-border pt-7">
                <div className="mb-5 flex items-center gap-2">
                  <MapPin size={19} className="text-primary-dark" />
                  <h3 className="font-bold">When and where</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="location" className="mb-2 block text-sm font-semibold">
                      Event location <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="location"
                      type="text"
                      required
                      minLength={3}
                      value={formData.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      placeholder="e.g. Patenga Beach, Chattogram"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition placeholder:text-muted focus:border-primary"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="date" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <CalendarDays size={16} />
                        Event date *
                      </label>
                      <input
                        id="date"
                        type="date"
                        required
                        min={today}
                        value={formData.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="time" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <Clock size={16} />
                        Start time *
                      </label>
                      <input
                        id="time"
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => updateField("time", e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-7">
                <div className="mb-5 flex items-center gap-2">
                  <ImagePlus size={19} className="text-primary-dark" />
                  <h3 className="font-bold">Event cover image</h3>
                </div>

                <label htmlFor="image" className="mb-2 block text-sm font-semibold">
                  Image URL
                </label>
                <input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => updateField("image", e.target.value)}
                  placeholder="https://example.com/your-event-image.jpg"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition placeholder:text-muted focus:border-primary"
                />
                <p className="mt-2 text-xs text-muted">
                  Add a public image URL to make your event more attractive.
                </p>

                {formData.image && /^https?:\/\/.+/i.test(formData.image) && (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-border">
                    <img
                      src={formData.image}
                      alt="Event cover preview"
                      className="h-52 w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-7">
                <div className="mb-5 flex items-center gap-2">
                  <Tag size={19} className="text-primary-dark" />
                  <h3 className="font-bold">Add event tags</h3>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    maxLength={25}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="e.g. Environment"
                    className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none focus:border-primary"
                  />

                  <button
                    type="button"
                    onClick={addTag}
                    className="flex items-center gap-2 rounded-xl bg-surface-soft px-5 py-3 text-sm font-semibold transition hover:bg-secondary"
                  >
                    <Plus size={17} />
                    Add
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-medium"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        aria-label={`Remove ${tag}`}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-xs text-muted">
                  Add up to 5 relevant tags.
                </p>
              </div>
            </div>

            <div className="mt-9 border-t border-border pt-7">
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting ? (
                  "Creating your event..."
                ) : (
                  <>
                    <HeartHandshake size={19} />
                    Create Event
                  </>
                )}
              </button>

              <p className="mt-4 text-xs leading-6 text-muted">
                By creating this event, you agree to help build a safe,
                respectful, and welcoming community.
              </p>
            </div>
          </form>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-3xl bg-surface-soft p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80">
                <Sparkles size={23} className="text-primary-dark" />
              </div>
              <h3 className="mt-5 text-xl font-bold">
                Every act begins somewhere.
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Your event could be the reason someone discovers the joy of
                giving back. Make it welcoming, clear, and meaningful.
              </p>

              <div className="mt-6 space-y-4">
                {[
                  "Choose a clear and meaningful title.",
                  "Explain how volunteers can help.",
                  "Include an accurate location and date.",
                  "Use a relevant and welcoming image.",
                ].map((tip) => (
                  <div key={tip} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-primary-dark"
                    />
                    <p className="text-xs leading-6 text-muted">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-7">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">
                Kindred promise
              </p>
              <h3 className="mt-3 text-xl font-bold">
                Small Acts. Greater Change.
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                We believe meaningful communities are built when people
                come together with kindness and purpose.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
