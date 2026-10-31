
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
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.category) {
      toast.error("Please select an event category.");
      return;
    }

    if (formData.date <= today) {
      toast.error("Please select a future event date.");
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

    toast.success("Your event form is ready!");

    setTimeout(() => {
      setSubmitting(false);
      router.push("/events");
    }, 1200);
  };

  return (
    <>
      <Navbar />

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

        
      </main>

      <Footer />
    </>
  );
}
