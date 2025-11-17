"use client";

import { useState, useEffect } from "react";

export default function BootCalculator() {
  const [relinquishedValue, setRelinquishedValue] = useState<string>("");
  const [replacementValue, setReplacementValue] = useState<string>("");
  const [cashReceived, setCashReceived] = useState<string>("");
  const [oldMortgage, setOldMortgage] = useState<string>("");
  const [newMortgage, setNewMortgage] = useState<string>("");
  const [results, setResults] = useState<{
    totalBoot: number;
    cashBoot: number;
    mortgageBoot: number;
    estimatedTax: number;
  } | null>(null);

  useEffect(() => {
    calculateBoot();
  }, [relinquishedValue, replacementValue, cashReceived, oldMortgage, newMortgage]);

  const calculateBoot = () => {
    const relValue = parseFloat(relinquishedValue) || 0;
    const repValue = parseFloat(replacementValue) || 0;
    const cash = parseFloat(cashReceived) || 0;
    const oldMort = parseFloat(oldMortgage) || 0;
    const newMort = parseFloat(newMortgage) || 0;

    if (relValue === 0 && repValue === 0 && cash === 0 && oldMort === 0 && newMort === 0) {
      setResults(null);
      return;
    }

    // Mortgage boot occurs when new debt is less than old debt
    const mortgageBoot = Math.max(0, oldMort - newMort);
    
    // Cash boot is cash received
    const cashBoot = cash;
    
    // Total boot is cash boot + mortgage boot
    const totalBoot = cashBoot + mortgageBoot;
    
    // Estimated tax (using illustrative 20% rate - should note this is not actual tax rate)
    const estimatedTax = totalBoot * 0.20;

    setResults({
      totalBoot,
      cashBoot,
      mortgageBoot,
      estimatedTax,
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
        Boot Calculator
      </h2>
      <p className="text-ink/80 mb-8">
        Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications for your 1031 exchange.
      </p>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="relinquished-value"
              className="block text-sm font-medium text-heading mb-2"
            >
              Relinquished Property Value
            </label>
            <input
              type="number"
              id="relinquished-value"
              value={relinquishedValue}
              onChange={(e) => setRelinquishedValue(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-ink/60">
              Sale price of the property you are relinquishing
            </p>
          </div>

          <div>
            <label
              htmlFor="replacement-value"
              className="block text-sm font-medium text-heading mb-2"
            >
              Replacement Property Value
            </label>
            <input
              type="number"
              id="replacement-value"
              value={replacementValue}
              onChange={(e) => setReplacementValue(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-ink/60">
              Purchase price of the replacement property
            </p>
          </div>

          <div>
            <label
              htmlFor="cash-received"
              className="block text-sm font-medium text-heading mb-2"
            >
              Cash Received
            </label>
            <input
              type="number"
              id="cash-received"
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-ink/60">
              Cash received from the sale (if any)
            </p>
          </div>

          <div>
            <label
              htmlFor="old-mortgage"
              className="block text-sm font-medium text-heading mb-2"
            >
              Old Mortgage Balance
            </label>
            <input
              type="number"
              id="old-mortgage"
              value={oldMortgage}
              onChange={(e) => setOldMortgage(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-ink/60">
              Mortgage balance on relinquished property
            </p>
          </div>

          <div>
            <label
              htmlFor="new-mortgage"
              className="block text-sm font-medium text-heading mb-2"
            >
              New Mortgage Balance
            </label>
            <input
              type="number"
              id="new-mortgage"
              value={newMortgage}
              onChange={(e) => setNewMortgage(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-ink/60">
              Mortgage balance on replacement property
            </p>
          </div>
        </div>

        {results && (
          <div className="mt-8 bg-paper border border-outline rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-heading mb-4">
              Calculation Results
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-panel border border-outline rounded-lg p-4">
                <p className="text-sm text-ink/70 mb-1">Cash Boot</p>
                <p className="text-2xl font-bold text-heading">
                  {formatCurrency(results.cashBoot)}
                </p>
                <p className="text-xs text-ink/60 mt-1">
                  Cash received from the exchange
                </p>
              </div>

              <div className="bg-panel border border-outline rounded-lg p-4">
                <p className="text-sm text-ink/70 mb-1">Mortgage Boot</p>
                <p className="text-2xl font-bold text-heading">
                  {formatCurrency(results.mortgageBoot)}
                </p>
                <p className="text-xs text-ink/60 mt-1">
                  Debt relief (old mortgage - new mortgage)
                </p>
              </div>

              <div className="bg-panel border-2 border-primary rounded-lg p-4">
                <p className="text-sm text-ink/70 mb-1">Total Boot</p>
                <p className="text-2xl font-bold text-heading">
                  {formatCurrency(results.totalBoot)}
                </p>
                <p className="text-xs text-ink/60 mt-1">
                  Total taxable boot amount
                </p>
              </div>

              <div className="bg-panel border border-outline rounded-lg p-4">
                <p className="text-sm text-ink/70 mb-1">Estimated Tax on Boot</p>
                <p className="text-2xl font-bold text-heading">
                  {formatCurrency(results.estimatedTax)}
                </p>
                <p className="text-xs text-ink/60 mt-1">
                  Illustrative estimate at 20% rate
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-outline">
              <h4 className="text-sm font-semibold text-heading mb-2">
                Understanding Boot
              </h4>
              <ul className="text-sm text-ink/80 space-y-1 list-disc list-inside">
                <li>
                  <strong>Cash Boot:</strong> Any cash you receive from the exchange is taxable boot.
                </li>
                <li>
                  <strong>Mortgage Boot:</strong> If your new mortgage is less than your old mortgage, the difference is considered taxable boot.
                </li>
                <li>
                  <strong>Tax Implications:</strong> Boot is subject to capital gains tax. Consult a tax advisor for your specific situation.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

