import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CancelSubscriptionPage() {
  const navigate = useNavigate();
  const [cancelStep, setCancelStep] = useState(1);
  const [cancelReason, setCancelReason] = useState("");
  const [error, setError] = useState("");

  const handleCancelNext = () => {
    if (!cancelReason) {
      setError("Please select a cancellation reason.");
      return;
    }
    setError("");
    setCancelStep(2);
  };

  const handleConfirmCancel = () => {
    toast.success("Account deleted successfully...", {
      autoClose: 2500,
      onClose: () => navigate("/profile"),
    });
  };

  const handleStayBack = () => {
    toast.success("Great! We're glad you're staying with us.", {
      autoClose: 2000,
      onClose: () => navigate("/profile"),
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-md sm:max-w-lg md:max-w-xl mx-auto mt-8 sm:mt-10 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      {/* Step Indicator */}
      <div className="text-gray-500 text-xs sm:text-sm mb-4">
        Step {cancelStep} of 2
      </div>

      {cancelStep === 1 ? (
        <>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            Cancel Subscription
          </h3>
          <p className="mb-4 text-sm sm:text-base">
            Select the reason for cancellation:
          </p>
          <div className="space-y-2 mb-4">
            {[
              "Monthly platform fee is too high",
              "Missing some features that I am looking for",
              "Bandwidth fee is too high",
              "Platform is very difficult to use",
              "Not happy with customer support",
              "Don't have a need at this time",
              "Other, my reason is not listed here",
            ].map((reason) => (
              <label
                key={reason}
                className="flex items-center gap-2 text-sm sm:text-base"
              >
                <input
                  type="radio"
                  name="cancelReason"
                  value={reason}
                  checked={cancelReason === reason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="accent-blue-600"
                />
                {reason}
              </label>
            ))}
          </div>

          {error && (
            <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>
          )}

          {/* Buttons at bottom */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              onClick={handleStayBack}
              className="px-4 py-2 border rounded hover:bg-gray-100 w-full sm:w-auto"
            >
              Stay Back
            </button>
            <button
              onClick={handleCancelNext}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full sm:w-auto"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            Cancel Subscription
          </h3>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            Did you know we give substantial discounts on half yearly or yearly
            plans? Please write to
            <a
              href="mailto:accountmanagement@xyz.com"
              className="text-blue-600 underline ml-1"
            >
              accountmanagement@xyz.com
            </a>{" "}
            to know more.
          </p>

          {/* Buttons at bottom */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              onClick={handleStayBack}
              className="px-4 py-2 border rounded hover:bg-gray-100 w-full sm:w-auto"
            >
              Stay Back
            </button>
            <button
              onClick={handleConfirmCancel}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full sm:w-auto"
            >
              No, I want to cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
