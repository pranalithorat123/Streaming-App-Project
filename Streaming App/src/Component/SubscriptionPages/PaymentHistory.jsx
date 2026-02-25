import React from "react";

export default function PaymentHistory() {
  return (
    <div className="rounded-lg bg-white p-4 sm:p-6 shadow-lg text-center max-w-full mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Payment History</h2>
      <p className="text-gray-500 text-base sm:text-lg">
        No payment history found yet.
      </p>
    </div>
  );
}
