"use client";

import { useState, useEffect } from "react";

export default function IdentificationRulesChecker() {
  const [numProperties, setNumProperties] = useState<string>("");
  const [totalIdentifiedValue, setTotalIdentifiedValue] = useState<string>("");
  const [relinquishedValue, setRelinquishedValue] = useState<string>("");
  const [results, setResults] = useState<{
    threePropertyRule: boolean;
    twoHundredPercentRule: boolean;
    ninetyFivePercentRule: boolean;
    isValid: boolean;
    warnings: string[];
  } | null>(null);

  useEffect(() => {
    validateRules();
  }, [numProperties, totalIdentifiedValue, relinquishedValue]);

  const validateRules = () => {
    const numProps = parseInt(numProperties) || 0;
    const totalValue = parseFloat(totalIdentifiedValue) || 0;
    const relValue = parseFloat(relinquishedValue) || 0;

    if (numProps === 0 && totalValue === 0 && relValue === 0) {
      setResults(null);
      return;
    }

    const warnings: string[] = [];
    let isValid = false;

    // Three Property Rule: Can identify up to 3 properties of any value
    const threePropertyRule = numProps <= 3;

    // 200% Rule: Can identify more than 3 if total value <= 200% of relinquished value
    const twoHundredPercentRule = relValue === 0 ? false : totalValue <= relValue * 2;

    // 95% Rule: Can identify any number if you acquire at least 95% of identified value
    // This rule is about acquisition, not identification, so we note it but can't fully validate
    const ninetyFivePercentRule = true; // Always true for identification purposes

    // Determine if identification is valid
    if (threePropertyRule) {
      isValid = true;
    } else if (numProps > 3 && twoHundredPercentRule) {
      isValid = true;
    } else if (numProps > 3 && !twoHundredPercentRule) {
      isValid = false;
      warnings.push(
        `You have identified ${numProps} properties with a total value of ${formatCurrency(totalValue)}, which exceeds 200% of your relinquished property value (${formatCurrency(relValue * 2)}). This violates the 200% rule.`
      );
    }

    // Additional warnings
    if (numProps > 3 && !twoHundredPercentRule && relValue > 0) {
      warnings.push(
        "To identify more than 3 properties, the total value must not exceed 200% of your relinquished property value, OR you must acquire at least 95% of the total identified value."
      );
    }

    if (relValue > 0 && totalValue > 0 && totalValue < relValue * 0.95) {
      warnings.push(
        "Note: If you identify properties but acquire less than 95% of the total identified value, you may not fully defer your gain."
      );
    }

    setResults({
      threePropertyRule,
      twoHundredPercentRule,
      ninetyFivePercentRule,
      isValid,
      warnings,
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
        Identification Rules Checker
      </h2>
      <p className="text-ink/80 mb-8">
        Validate your property identification against the 3-property, 200%, or 95% identification rules for 1031 exchanges.
      </p>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="num-properties"
              className="block text-sm font-medium text-heading mb-2"
            >
              Number of Properties Identified
            </label>
            <input
              type="number"
              id="num-properties"
              value={numProperties}
              onChange={(e) => setNumProperties(e.target.value)}
              placeholder="0"
              min="0"
              className="w-full px-4 py-3 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-ink/60">
              Total number of replacement properties identified
            </p>
          </div>

          <div>
            <label
              htmlFor="total-identified-value"
              className="block text-sm font-medium text-heading mb-2"
            >
              Total Value of Identified Properties
            </label>
            <input
              type="number"
              id="total-identified-value"
              value={totalIdentifiedValue}
              onChange={(e) => setTotalIdentifiedValue(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 bg-paper border border-outline rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-ink/60">
              Sum of all identified property values
            </p>
          </div>

          <div className="md:col-span-2">
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
        </div>

        {results && (
          <div className="mt-8 bg-paper border border-outline rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-heading mb-4">
              Rule Validation Results
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className={`bg-panel border-2 rounded-lg p-4 ${results.threePropertyRule ? 'border-primary' : 'border-outline'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {results.threePropertyRule ? (
                    <span className="text-green-500 font-bold">✓</span>
                  ) : (
                    <span className="text-ink/60 font-bold">✗</span>
                  )}
                  <p className="text-sm font-semibold text-heading">Three Property Rule</p>
                </div>
                <p className="text-xs text-ink/70">
                  {results.threePropertyRule
                    ? "Satisfied: Up to 3 properties allowed"
                    : "Not satisfied: More than 3 properties identified"}
                </p>
              </div>

              <div className={`bg-panel border-2 rounded-lg p-4 ${results.twoHundredPercentRule ? 'border-primary' : 'border-outline'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {results.twoHundredPercentRule ? (
                    <span className="text-green-500 font-bold">✓</span>
                  ) : (
                    <span className="text-ink/60 font-bold">✗</span>
                  )}
                  <p className="text-sm font-semibold text-heading">200% Rule</p>
                </div>
                <p className="text-xs text-ink/70">
                  {relinquishedValue
                    ? results.twoHundredPercentRule
                      ? `Satisfied: Total value ≤ ${formatCurrency(parseFloat(relinquishedValue) * 2)}`
                      : `Not satisfied: Exceeds 200% limit`
                    : "Enter relinquished value to check"}
                </p>
              </div>

              <div className="bg-panel border border-outline rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-ink/60 font-bold">ℹ</span>
                  <p className="text-sm font-semibold text-heading">95% Exception</p>
                </div>
                <p className="text-xs text-ink/70">
                  Valid if you acquire ≥95% of identified value
                </p>
              </div>
            </div>

            <div className={`mt-4 pt-4 border-t border-outline ${results.isValid ? 'bg-panel border-primary' : 'bg-panel border-outline'}`}>
              <div className={`rounded-lg p-4 ${results.isValid ? 'bg-panel border-2 border-primary' : 'bg-panel border-2 border-outline'}`}>
                <p className="text-sm text-ink/70 mb-1">Identification Status</p>
                <p className={`text-2xl font-bold ${results.isValid ? 'text-heading' : 'text-ink/80'}`}>
                  {results.isValid ? "✓ Valid Identification" : "⚠ Review Required"}
                </p>
                <p className="text-xs text-ink/60 mt-1">
                  {results.isValid
                    ? "Your identification appears to comply with the rules"
                    : "Please review the warnings below"}
                </p>
              </div>
            </div>

            {results.warnings.length > 0 && (
              <div className="mt-4 pt-4 border-t border-outline">
                <h4 className="text-sm font-semibold text-heading mb-2">
                  Warnings & Notes
                </h4>
                <ul className="space-y-2">
                  {results.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-ink/80 bg-panel border border-outline rounded-lg p-3">
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-outline">
              <h4 className="text-sm font-semibold text-heading mb-2">
                Understanding the Rules
              </h4>
              <div className="space-y-3 text-sm text-ink/80">
                <div>
                  <strong className="text-heading">Three Property Rule:</strong> You can identify up to three replacement properties of any value. You must close on at least one within 180 days.
                </div>
                <div>
                  <strong className="text-heading">200% Rule:</strong> You can identify more than three properties if the total fair market value does not exceed 200% of your relinquished property value.
                </div>
                <div>
                  <strong className="text-heading">95% Exception:</strong> You can identify any number of properties if you acquire replacement properties with a total value equal to at least 95% of the aggregate fair market value of all identified properties.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

