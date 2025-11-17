"use client";

import { useState } from "react";

export default function IdentificationLetter() {
  const [formData, setFormData] = useState({
    exchangerName: "",
    relinquishedProperty: "",
    saleDate: "",
    property1: "",
    property2: "",
    property3: "",
    intermediaryName: "",
    intermediaryAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateLetter = () => {
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return `Date: ${date}

${formData.intermediaryName || "[Qualified Intermediary Name]"}
${formData.intermediaryAddress || "[Qualified Intermediary Address]"}

Re: Identification of Replacement Property(ies) for Section 1031 Exchange

Dear ${formData.intermediaryName || "[Qualified Intermediary Name]"},

Pursuant to Treasury Regulation Section 1.1031(k)-1, I hereby identify the following property(ies) as replacement property(ies) for my Section 1031 like kind exchange:

Relinquished Property: ${formData.relinquishedProperty || "[Property Address]"}
Sale Date: ${formData.saleDate || "[Sale Date]"}

Replacement Property(ies):

1. ${formData.property1 || "[Property Address 1]"}

${formData.property2 ? `2. ${formData.property2}` : ""}

${formData.property3 ? `3. ${formData.property3}` : ""}

This identification is made within the 45 day identification period as required by Section 1031 of the Internal Revenue Code.

Sincerely,

${formData.exchangerName || "[Your Name]"}`;
  };

  const [letter, setLetter] = useState("");

  return (
    <div className="bg-panel border border-outline rounded-lg p-6">
      <h3 className="text-xl font-semibold text-heading mb-4">
        Identification Letter Helper
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-heading mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="exchangerName"
            value={formData.exchangerName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:border-primary"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-heading mb-2">
            Relinquished Property Address
          </label>
          <input
            type="text"
            name="relinquishedProperty"
            value={formData.relinquishedProperty}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:border-primary"
            placeholder="123 Main St, City, State"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-heading mb-2">
            Sale Date
          </label>
          <input
            type="date"
            name="saleDate"
            value={formData.saleDate}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-heading mb-2">
            Replacement Property 1
          </label>
          <input
            type="text"
            name="property1"
            value={formData.property1}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:border-primary"
            placeholder="123 Replacement St, City, State"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-heading mb-2">
            Replacement Property 2 (Optional)
          </label>
          <input
            type="text"
            name="property2"
            value={formData.property2}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:border-primary"
            placeholder="456 Replacement St, City, State"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-heading mb-2">
            Replacement Property 3 (Optional)
          </label>
          <input
            type="text"
            name="property3"
            value={formData.property3}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:border-primary"
            placeholder="789 Replacement St, City, State"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-heading mb-2">
            Qualified Intermediary Name
          </label>
          <input
            type="text"
            name="intermediaryName"
            value={formData.intermediaryName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:border-primary"
            placeholder="ABC Exchange Company"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-heading mb-2">
            Qualified Intermediary Address
          </label>
          <textarea
            name="intermediaryAddress"
            value={formData.intermediaryAddress}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:border-primary resize-none"
            placeholder="123 QI St, City, State ZIP"
          />
        </div>
        <button
          onClick={() => setLetter(generateLetter())}
          className="w-full px-6 py-3 bg-primary text-primaryfg rounded-full hover:opacity-90 transition-opacity font-medium"
        >
          Generate Letter
        </button>
        {letter && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-heading mb-2">
              Identification Letter Draft
            </label>
            <textarea
              readOnly
              value={letter}
              rows={20}
              className="w-full px-4 py-2 bg-paper border border-outline rounded-lg text-ink font-mono text-sm resize-none"
            />
            <p className="text-xs text-ink/70 mt-2">
              Review this draft with your Qualified Intermediary and tax advisor before sending.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

