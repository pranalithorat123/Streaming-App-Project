export default function SubscriptionDetails() {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 shadow-sm rounded-lg space-y-4 max-w-md sm:max-w-lg md:max-w-xl mx-auto">
      {/* Status */}
      <div className="flex flex-col sm:flex-row sm:items-left gap-2 text-base sm:text-lg font-semibold">
        <span className="text-gray-800 w-full sm:w-36">Status:</span>
        <span className="p-2 rounded-full bg-blue-100 text-blue-600 w-max">
          Free Trial
        </span>
      </div>

      {/* Trial Period */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-base sm:text-lg font-semibold">
        <span className="text-gray-800 w-full sm:w-36">Trial Period:</span>
        <span className="text-gray-600">Sep 23, 2025 - Oct 7, 2025</span>
      </div>
    </div>
  );
}
