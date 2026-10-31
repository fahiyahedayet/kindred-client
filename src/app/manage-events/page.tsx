"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Plus,
  Search,
  CalendarDays,
  MapPin,
  Users,
  Pencil,
  Trash2,
  Eye,
  ArrowUpRight,
  HeartHandshake,
  X,
  LayoutList,
  Clock,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Event = {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
  volunteers: number;
  spots: number;
  status: "Upcoming" | "Completed";
};

const initialEvents: Event[] = [
  {
    id: "1",
    title: "A Cleaner Tomorrow",
    category: "Cleanup",
    date: "November 8, 2026",
    location: "Patenga Beach, Chattogram",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800",
    volunteers: 32,
    spots: 18,
    status: "Upcoming",
  },
  {
    id: "2",
    title: "Plant a Little Hope",
    category: "Plantation",
    date: "November 12, 2026",
    location: "CRB, Chattogram",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    volunteers: 28,
    spots: 12,
    status: "Upcoming",
  },
  {
    id: "3",
    title: "Warm Hearts, Warm Homes",
    category: "Donation",
    date: "November 15, 2026",
    location: "GEC Circle, Chattogram",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    volunteers: 45,
    spots: 25,
    status: "Upcoming",
  },
  {
    id: "4",
    title: "Community Food Drive",
    category: "Community",
    date: "October 10, 2026",
    location: "Agrabad, Chattogram",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
    volunteers: 40,
    spots: 0,
    status: "Completed",
  },
];