export default function IdentificationRules() {
  return (
    <div className="bg-panel border border-outline rounded-lg p-6">
      <h3 className="text-xl font-semibold text-heading mb-4">
        Identification Rules Explained
      </h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-heading mb-2">
            Three Property Rule
          </h4>
          <p className="text-ink/80">
            You can identify up to three replacement properties of any value. You must close on at
            least one of the identified properties within 180 days of your relinquished property sale.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-heading mb-2">
            200 Percent Rule
          </h4>
          <p className="text-ink/80">
            You can identify more than three properties if the total fair market value of all
            identified properties does not exceed 200 percent of the value of your relinquished
            property. You must close on enough properties to meet the value requirement.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-heading mb-2">
            95 Percent Exception
          </h4>
          <p className="text-ink/80">
            You can identify any number of properties if you acquire replacement properties with a
            total value equal to at least 95 percent of the aggregate fair market value of all
            identified properties by the end of the exchange period.
          </p>
        </div>
      </div>
    </div>
  );
}

