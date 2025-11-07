"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";

interface Event {
  id: number;
  title: string;
  date: string; // ISO format "YYYY-MM-DD"
  category: "Workshop" | "StoreEvent" | "SpecialOffer";
  description?: string;
}

// Predefined events
const events: Event[] = [
  { id: 1, title: "CBD Workshop", date: "2025-11-05", category: "Workshop", description: "Learn about CBD benefits." },
  { id: 2, title: "Grand Opening", date: "2025-11-12", category: "StoreEvent", description: "Visit our new location!" },
  { id: 3, title: "Yoga & CBD", date: "2025-11-20", category: "SpecialOffer", description: "Relax with yoga and learn about CBD." },
  { id: 4, title: "Holiday Sale", date: "2025-11-25", category: "SpecialOffer", description: "Exclusive in-store discounts." },
  { id: 5, title: "Meet & Greet", date: "2025-11-18", category: "StoreEvent", description: "Meet our staff and ask questions." },
];

// Category colors
const categoryColors: Record<Event["category"], string> = {
  Workshop: "bg-green-500",
  StoreEvent: "bg-blue-500",
  SpecialOffer: "bg-yellow-500",
};

export default function EventsCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Filter events for a specific day
  const eventsByDate = (date: string) => events.filter((e) => e.date === date);

  return (
    <Container className="py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Events Calendar</h1>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-bold py-2">{d}</div>
        ))}

        {/* Empty slots before first day */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Days */}
        {dates.map((day) => {
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayEvents = eventsByDate(dateStr);

          return (
            <div
              key={day}
              onClick={() => setSelectedDate(dateStr)}
              className={`border rounded-lg p-2 min-h-[80px] flex flex-col justify-start items-center cursor-pointer transition hover:shadow-lg ${
                dayEvents.length > 0 ? "bg-green-50" : "bg-white"
              }`}
            >
              <span className="font-semibold">{day}</span>

              {/* Event dots */}
              <div className="flex gap-1 mt-2">
                {dayEvents.map((e) => (
                  <span
                    key={e.id}
                    className={`w-2 h-2 rounded-full ${categoryColors[e.category]}`}
                    title={e.title}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Details */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            key="event-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-md mx-auto"
          >
            <h2 className="text-xl font-bold mb-4">Events on {selectedDate}</h2>

            {eventsByDate(selectedDate).length === 0 ? (
              <p className="text-gray-500 text-center">No events on this day</p>
            ) : (
              <ul className="space-y-4">
                {eventsByDate(selectedDate).map((e) => (
                  <li key={e.id} className="border-b pb-2 last:border-b-0">
                    <h3 className="font-semibold">{e.title}</h3>
                    <p className="text-gray-600 text-sm">{e.description}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${categoryColors[e.category]} text-white`}>
                      {e.category}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => setSelectedDate(null)}
              className="mt-4 text-green-700 hover:underline"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
