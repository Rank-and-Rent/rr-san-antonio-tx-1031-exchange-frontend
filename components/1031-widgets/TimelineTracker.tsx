"use client";

import { useState } from "react";

export default function TimelineTracker() {
  const [saleDate, setSaleDate] = useState("");
  const [milestones, setMilestones] = useState<Array<{ date: Date; label: string; status: string }>>([]);

  const calculateMilestones = (dateString: string) => {
    const sale = new Date(dateString);
    if (isNaN(sale.getTime())) {
      setMilestones([]);
      return;
    }

    const ms: Array<{ date: Date; label: string; status: string }> = [
      {
        date: sale,
        label: "Relinquished Property Sale",
        status: "completed",
      },
      {
        date: new Date(sale.getTime() + 45 * 24 * 60 * 60 * 1000),
        label: "45 Day Identification Deadline",
        status: "upcoming",
      },
      {
        date: new Date(sale.getTime() + 180 * 24 * 60 * 60 * 1000),
        label: "180 Day Exchange Deadline",
        status: "upcoming",
      },
    ];

    setMilestones(ms);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaleDate(e.target.value);
    calculateMilestones(e.target.value);
  };

  const getStatusColor = (status: string) => {
    if (status === "completed") return "text-primary";
    if (status === "upcoming") return "text-ink/70";
    return "text-ink/50";
  };

  return (
    <div className="bg-panel border border-outline rounded-lg p-6">
      <h3 className="text-xl font-semibold text-heading mb-4">
        Timeline Tracker
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="timeline-sale-date" className="block text-sm font-medium text-heading mb-2">
            Relinquished Property Sale Date
          </label>
          <input
            type="date"
            id="timeline-sale-date"
            value={saleDate}
            onChange={handleDateChange}
            className="w-full px-4 py-2 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:border-primary"
          />
        </div>
        {milestones.length > 0 && (
          <div className="space-y-3">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-paper border border-outline rounded-lg p-4">
                <p className={`text-sm font-medium mb-1 ${getStatusColor(milestone.status)}`}>
                  {milestone.status === "completed" ? "✓" : "○"} {milestone.label}
                </p>
                <p className="text-lg font-semibold text-heading">
                  {milestone.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

