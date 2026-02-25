import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  { name: "Standard", price: 399 },
  { name: "Professional", price: 1499 },
  { name: "Enterprise", price: 3900 },
];

const terms = [
  { name: "Monthly", price: 399, discount: "" },
  { name: "Halfyearly", price: 359, discount: "10% OFF", info: "Save up to USD 239" },
  { name: "Yearly", price: 339, discount: "15% OFF", info: "Save up to USD 718" },
];

const applications = [
  { name: "Website", price: 299 },
  { name: "iOS App", price: 299 },
  { name: "Android App", price: 299 },
  { name: "Roku App", price: 299 },
  { name: "Android TV App", price: 299 },
  { name: "Fire TV App", price: 299 },
  { name: "Apple TV App", price: 299 },
  { name: "Samsung TV App", price: 299 },
  { name: "LG TV App", price: 299 },
];

export default function PurchaseSubscription() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [selectedTerm, setSelectedTerm] = useState(terms[0]);
  const [selectedApp, setSelectedApp] = useState(applications[0]);
  const [coupon, setCoupon] = useState("");
  const [finalAmount, setFinalAmount] = useState(selectedTerm.price);
  const navigate = useNavigate();

  useEffect(() => {
    setFinalAmount(selectedTerm.price);
  }, [selectedPlan, selectedTerm, selectedApp]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 pt-0 min-h-screen p-4 lg:p-6">
      {/* Left: Plan Selection */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 min-h-[600px]">
          {/* Select Plan */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-5 text-gray-700">Select Plan</h3>
            <div className="flex flex-col sm:flex-row sm:flex-wrap mb-4 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`border rounded px-6 py-4 cursor-pointer ${
                    selectedPlan.name === plan.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="font-medium text-gray-700">{plan.name}</div>
                  <div className="font-bold text-lg text-gray-800">
                    USD {plan.price}/Month
                  </div>
                  {selectedPlan.name === plan.name && (
                    <button className="bg-blue-700 text-white px-4 py-1 mt-2 rounded">
                      Selected
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Select Term */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-5 text-gray-700">Select Term</h3>
            <div className="flex flex-col sm:flex-row sm:flex-wrap mb-4 gap-4">
              {terms.map((term) => (
                <div
                  key={term.name}
                  className={`border rounded px-6 py-4 cursor-pointer ${
                    selectedTerm.name === term.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedTerm(term)}
                >
                  <div className="font-medium text-gray-700">{term.name}</div>
                  <div className="font-bold text-lg text-gray-800">
                    USD {term.price}/Month
                  </div>
                  {term.discount && (
                    <div className="text-xs text-white bg-indigo-600 px-2 py-1 rounded inline-block mt-1">
                      {term.discount}
                    </div>
                  )}
                  {term.info && <div className="text-xs text-gray-500">{term.info}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Select Applications */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-gray-700">Select Applications</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-2">
              {applications.map((app) => (
                <div
                  key={app.name}
                  className={`border rounded px-4 py-3 cursor-pointer ${
                    selectedApp.name === app.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedApp(app)}
                >
                  <div className="text-gray-700">{app.name}</div>
                  <div className="font-bold text-sm text-gray-800">USD {app.price}</div>
                </div>
              ))}
            </div>
            <div className="text-base text-gray-500 mt-4">
              * First Application is included. Others are chargeable as per the selected package.
            </div>
          </div>
        </div>
      </div>

      {/* Right: Pricing Summary */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 min-h-[600px]">
          <div className="font-semibold text-lg mb-4 text-gray-700">Projected Pricing</div>
          <div className="mb-1 text-gray-500 text-sm">Plan</div>
          <div className="flex justify-between mb-2 flex-wrap">
            <span className="text-gray-700">{selectedPlan.name}/{selectedTerm.name}(s)</span>
            <span className="font-medium text-gray-800">USD {selectedTerm.price}.00</span>
          </div>
          <div className="mb-1 text-gray-500 text-sm">Applications</div>
          <div className="flex justify-between mb-2 flex-wrap">
            <span className="text-gray-700">{selectedApp.name}</span>
            <span className="font-medium text-gray-800">Included</span>
          </div>
          <div className="border-t my-4" />
          <div className="text-xs text-gray-400 text-center my-2">
            Have a Coupon Code? Apply Here
          </div>
          <div className="flex flex-col sm:flex-row mb-2 gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter Coupon Code"
              className="flex-1 border px-2 py-1 rounded"
            />
            <button className="bg-blue-500 text-white rounded px-4 py-1">
              Apply
            </button>
          </div>
          <div className="flex justify-between py-2 flex-wrap">
            <span className="text-gray-700">Total Amount</span>
            <span className="text-gray-800">USD {selectedTerm.price}.00</span>
          </div>
          <div className="flex justify-between py-2 font-bold flex-wrap">
            <span className="text-gray-700">Final Amount*</span>
            <span className="text-gray-800">USD {finalAmount}.00</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-blue-600 text-white mt-4 py-2 rounded font-medium"
          >
            Proceed To Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}
