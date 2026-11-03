"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  Tag,
  Save,
} from "lucide-react";
import { authClient } from "../../../../lib/auth-client";

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

type EventData = {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  location: string;
  eventDate: string;
  tags: string[];
};

type EventFormData = {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  location: string;
  eventDate: string;
  tags: string;
};

export default function EditEventPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const eventId = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    location: "",
    eventDate: "",
    tags: "",
  });

  const fetchEvent = useCallback(async () => {
    try {
      const tokenData = await authClient.token();
      const token = tokenData.data?.token;

      if (!token) {
        toast.error("Please sign in again.");
        router.replace("/sign-in");
        return;
      }

      const response = await fetch(`${API_URL}/api/events/my-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not load your events.");
      }

      const event = (result.data as EventData[]).find(
        (item) => item._id === eventId
      );

      if (!event) {
        toast.error(
          "Event not found or you don't have permission to edit it."
        );
        router.replace("/manage-events");
        return;
      }

      const date = new Date(event.eventDate);
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);

      setFormData({
        title: event.title,
        description: event.description,
        category: event.category,
        imageUrl: event.imageUrl || "",
        location: event.location,
        eventDate: localDate,
        tags: (event.tags || []).join(", "),
      });
    } catch (error) {
      console.error("Fetch event error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to load event."
      );
    } finally {
      setLoading(false);
    }
  }, [eventId, router]);

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId, fetchEvent]);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (saving) return;

    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (tags.length > 5) {
      toast.error("You can add up to 5 tags.");
      return;
    }

    if (tags.some((tag) => tag.length > 25)) {
      toast.error("Each tag must be 25 characters or fewer.");
      return;
    }

    if (new Date(formData.eventDate) <= new Date()) {
      toast.error("Please select a future event date.");
      return;
    }

    try {
      setSaving(true);

      const tokenData = await authClient.token();
      const token = tokenData.data?.token;

      if (!token) {
        toast.error("Please sign in again.");
        router.replace("/sign-in");
        return;
      }

      const response = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
          category: formData.category,
          imageUrl: formData.imageUrl.trim(),
          location: formData.location.trim(),
          tags,
          eventDate: new Date(formData.eventDate).toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update event.");
      }

      toast.success("Event updated successfully!");
      router.push("/manage-events");
    } catch (error) {
      console.error("Update event error:", error);
      toast.error(
        error instanceof Error ? error.message : "Could not update event."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="mt-4 text-sm text-muted">
            Loading event details...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="bg-surface-soft px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/manage-events"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary-dark"
          >
            <ArrowLeft size={17} />
            Back to Manage Events
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-primary-dark">
            Your community dashboard
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Edit your event
          </h1>

          <p className="mt-3 text-sm leading-7 text-muted">
            Update your event information and keep your community informed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-9"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold"
            >
              Event title
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              minLength={5}
              maxLength={80}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold"
            >
              Event category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold"
            >
              Event description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              minLength={30}
              maxLength={1500}
              rows={6}
              required
              className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-7 outline-none focus:border-primary"
            />
            <p className="mt-2 text-right text-xs text-muted">
              {formData.description.length}/1500
            </p>
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="mb-2 flex items-center gap-2 text-sm font-semibold"
            >
              <ImageIcon size={17} />
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="mb-2 flex items-center gap-2 text-sm font-semibold"
            >
              <MapPin size={17} />
              Event location
            </label>
            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="eventDate"
              className="mb-2 flex items-center gap-2 text-sm font-semibold"
            >
              <CalendarDays size={17} />
              Event date and time
            </label>
            <input
              id="eventDate"
              name="eventDate"
              type="datetime-local"
              value={formData.eventDate}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="mb-2 flex items-center gap-2 text-sm font-semibold"
            >
              <Tag size={17} />
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Community, Volunteers, Environment"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <p className="mt-2 text-xs text-muted">
              Separate tags with commas. Maximum 5 tags, 25 characters each.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/manage-events"
              className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3 text-sm font-semibold transition hover:bg-surface-soft"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />
              {saving ? "Saving changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}