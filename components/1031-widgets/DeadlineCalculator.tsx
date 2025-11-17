"use client";

import { useState } from "react";

export default function DeadlineCalculator() {
  const [saleDate, setSaleDate] = useState("");
  const [identificationDeadline, setIdentificationDeadline] = useState<Date | null>(null);
  const [exchangeDeadline, setExchangeDeadline] = useState<Date | null>(null);

  const calculateDeadlines = (dateString: string) => {
    const sale = new Date(dateString);
    if (isNaN(sale.getTime())) {
      setIdentificationDeadline(null);
      setExchangeDeadline(null);
      return;
    }

    const identification = new Date(sale);
    identification.setDate(identification.getDate() + 45);
    setIdentificationDeadline(identification);

    const exchange = new Date(sale);
    exchange.setDate(exchange.getDate() + 180);
    setExchangeDeadline(exchange);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaleDate(e.target.value);
    calculateDeadlines(e.target.value);
  };

  return (
    <div className="bg-panel border border-outline rounded-lg p-6">
      <h3 className="text-xl font-semibold text-heading mb-4">
        45 Day and 180 Day Deadline Calculator
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="sale-date" className="block text-sm font-medium text-heading mb-2">
            Relinquished Property Sale Date
          </label>
          <input
            type="date"
            id="sale-date"
            value={saleDate}
            onChange={handleDateChange}
            className="w-full px-4 py-2 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:border-primary"
          />
        </div>
        {identificationDeadline && (
          <div className="bg-paper border border-outline rounded-lg p-4">
            <p className="text-sm text-ink/70 mb-1">45 Day Identification Deadline</p>
            <p className="text-lg font-semibold text-heading">
              {identificationDeadline.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}
        {exchangeDeadline && (
          <div className="bg-paper border border-outline rounded-lg p-4">
            <p className="text-sm text-ink/70 mb-1">180 Day Exchange Deadline</p>
            <p className="text-lg font-semibold text-heading">
              {exchangeDeadline.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

