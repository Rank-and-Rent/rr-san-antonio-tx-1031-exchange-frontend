"use client";

import { useState, useEffect } from "react";

export default function ExchangeCostEstimator() {
  const [propertyValue, setPropertyValue] = useState<string>("");
  const [qiFeePercentage, setQiFeePercentage] = useState<string>("1.5");
  const [escrowFee, setEscrowFee] = useState<string>("500");
  const [titleInsuranceRate, setTitleInsuranceRate] = useState<string>("0.5");
  const [recordingFees, setRecordingFees] = useState<string>("150");
  const [results, setResults] = useState<{
    qiFee: number;
    escrowFee: number;
    titleInsurance: number;
    recordingFees: number;
    totalCosts: number;
  } | null>(null);

  useEffect(() => {
    calculateCosts();
  }, [propertyValue, qiFeePercentage, escrowFee, titleInsuranceRate, recordingFees]);

  const calculateCosts = () => {
    const propValue = parseFloat(propertyValue) || 0;
    const qiPercent = parseFloat(qiFeePercentage) || 0;
    const escrow = parseFloat(escrowFee) || 0;
    const titleRate = parseFloat(titleInsuranceRate) || 0;
    const recording = parseFloat(recordingFees) || 0;

    if (propValue === 0) {
      setResults(null);
      return;
    }

    const qiFee = propValue * (qiPercent / 100);
    const titleInsurance = propValue * (titleRate / 100);
    const totalCosts = qiFee + escrow + titleInsurance + recording;

    setResults({
      qiFee,
      escrowFee: escrow,
      titleInsurance,
      recordingFees: recording,
      totalCosts,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-panel border border-outline rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-heading mb-6">
        Exchange Cost Estimator
      </h2>
      <p className="text-ink/80 mb-8">
        Calculate QI fees, escrow costs, title insurance, recording fees (Harris County), and other closing costs for your 1031 exchange.
      </p>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="property-value"
              className="block text-sm font-medium text-heading mb-2"
            >
              Property Value
            </label>
            <input
              type="number"
              id="property-value"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-ink/60">
              Purchase price of the replacement property
            </p>
          </div>

          <div>
            <label
              htmlFor="qi-fee-percentage"
              className="block text-sm font-medium text-heading mb-2"
            >
              QI Fee Percentage (%)
            </label>
            <input
              type="number"
              id="qi-fee-percentage"
              value={qiFeePercentage}
              onChange={(e) => setQiFeePercentage(e.target.value)}
              step="0.1"
              min="0"
              max="10"
              className="w-full px-4 py-3 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-ink/60">
              Qualified Intermediary fee (typically 1-2%)
            </p>
          </div>

          <div>
            <label
              htmlFor="escrow-fee"
              className="block text-sm font-medium text-heading mb-2"
            >
              Escrow Fee
            </label>
            <input
              type="number"
              id="escrow-fee"
              value={escrowFee}
              onChange={(e) => setEscrowFee(e.target.value)}
              placeholder="500"
              className="w-full px-4 py-3 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-ink/60">
              Escrow or closing fee (flat rate)
            </p>
          </div>

          <div>
            <label
              htmlFor="title-insurance-rate"
              className="block text-sm font-medium text-heading mb-2"
            >
              Title Insurance Rate (%)
            </label>
            <input
              type="number"
              id="title-insurance-rate"
              value={titleInsuranceRate}
              onChange={(e) => setTitleInsuranceRate(e.target.value)}
              step="0.1"
              min="0"
              max="5"
              className="w-full px-4 py-3 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-ink/60">
              Title insurance premium rate (typically 0.5-1%)
            </p>
          </div>

          <div>
            <label
              htmlFor="recording-fees"
              className="block text-sm font-medium text-heading mb-2"
            >
              Recording Fees
            </label>
            <input
              type="number"
              id="recording-fees"
              value={recordingFees}
              onChange={(e) => setRecordingFees(e.target.value)}
              placeholder="150"
              className="w-full px-4 py-3 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-ink/60">
              Recording fees (Harris County rates vary by document)
            </p>
          </div>
        </div>

        {results && (
          <div className="mt-8 bg-paper border border-outline rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-heading mb-4">
              Cost Breakdown
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-panel border border-outline rounded-lg p-4">
                <p className="text-sm text-ink/70 mb-1">QI Fee</p>
                <p className="text-2xl font-bold text-heading">
                  {formatCurrency(results.qiFee)}
                </p>
                <p className="text-xs text-ink/60 mt-1">
                  {qiFeePercentage}% of property value
                </p>
              </div>

              <div className="bg-panel border border-outline rounded-lg p-4">
                <p className="text-sm text-ink/70 mb-1">Escrow Fee</p>
                <p className="text-2xl font-bold text-heading">
                  {formatCurrency(results.escrowFee)}
                </p>
                <p className="text-xs text-ink/60 mt-1">
                  Flat escrow/closing fee
                </p>
              </div>

              <div className="bg-panel border border-outline rounded-lg p-4">
                <p className="text-sm text-ink/70 mb-1">Title Insurance</p>
                <p className="text-2xl font-bold text-heading">
                  {formatCurrency(results.titleInsurance)}
                </p>
                <p className="text-xs text-ink/60 mt-1">
                  {titleInsuranceRate}% of property value
                </p>
              </div>

              <div className="bg-panel border border-outline rounded-lg p-4">
                <p className="text-sm text-ink/70 mb-1">Recording Fees</p>
                <p className="text-2xl font-bold text-heading">
                  {formatCurrency(results.recordingFees)}
                </p>
                <p className="text-xs text-ink/60 mt-1">
                  Document recording fees
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-outline">
              <div className="bg-panel border-2 border-primary rounded-lg p-4">
                <p className="text-sm text-ink/70 mb-1">Total Exchange Costs</p>
                <p className="text-3xl font-bold text-heading">
                  {formatCurrency(results.totalCosts)}
                </p>
                <p className="text-xs text-ink/60 mt-1">
                  Estimated total closing costs
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-outline">
              <h4 className="text-sm font-semibold text-heading mb-2">
                Important Notes
              </h4>
              <ul className="text-sm text-ink/80 space-y-1 list-disc list-inside">
                <li>
                  Texas does not impose a state real estate transfer tax.
                </li>
                <li>
                  Recording fees vary by county and document type. Harris County rates are used as a reference.
                </li>
                <li>
                  Additional costs may include survey fees, inspection costs, and lender fees if financing.
                </li>
                <li>
                  Actual costs may vary. Consult with your Qualified Intermediary and closing agent for precise estimates.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

