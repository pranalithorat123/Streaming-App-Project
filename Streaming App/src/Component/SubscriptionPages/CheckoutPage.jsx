import React, { useState } from "react";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = "This field cannot be empty";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      alert("Form submitted successfully!");
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300";

  const labelClass = "block text-gray-700 mb-1";

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-20">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center sm:text-left">
        Checkout
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Add New Card Form */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Add New Card
          </h2>
          <p className="text-base text-gray-500 mb-4">
            Your card will be saved for future purchases and automatic renewals.
          </p>

          {/* Name on Card */}
          <div className="mb-4">
            <label className={labelClass}>
              Name on Card <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name as displayed on card"
              className={inputClass}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Card Number, Expiry, CVV */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className={labelClass}>
                Card Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="Enter card number"
                className={inputClass}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">{errors.cardNumber}</p>
              )}
            </div>
            <div className="flex-1 md:w-1/4">
              <label className={labelClass}>
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className={inputClass}
              />
              {errors.expiry && (
                <p className="text-red-500 text-sm">{errors.expiry}</p>
              )}
            </div>
            <div className="flex-1 md:w-1/4">
              <label className={labelClass}>
                CVV <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="Security code"
                className={inputClass}
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Country, State/Province */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className={labelClass}>
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className={inputClass}
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>
            <div className="flex-1">
              <label className={labelClass}>
                State/Province <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className={inputClass}
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>
          </div>

          {/* City, Zip */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className={labelClass}>
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className={inputClass}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>
            <div className="flex-1">
              <label className={labelClass}>
                Zip/Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="Zip Code"
                className={inputClass}
              />
              {errors.zip && (
                <p className="text-red-500 text-sm">{errors.zip}</p>
              )}
            </div>
          </div>

          {/* Street Address */}
          <div className="mb-4">
            <label className={labelClass}>
              Street/Lane Name <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className={inputClass}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
        </div>

        {/* Order Details / Payment Summary */}
        <div className="md:w-1/3 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Order Details
            </h2>
            <div className="text-sm text-gray-500 mb-2">
              Purchase Subscription
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Plan</span>
              <span className="text-gray-800">
                Standard/ 1 Month(s) USD 399.00
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Website</span>
              <span className="text-gray-800">Included</span>
            </div>
            <div className="border-t my-4" />
            <div className="flex justify-between font-semibold text-gray-700 mb-4">
              <span>Final Amount</span>
              <span>USD 399.00</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4 sm:flex-row">
            <button className="flex-1 border border-gray-300 py-2 rounded text-gray-700 hover:bg-gray-100 transition">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Pay Now
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-4 text-center">
            Powered by <span className="text-blue-600">xyz</span>
          </p>
          <div className="mt-2 flex justify-center">
            <img src="/pcilogo.png" alt="PCI DSS" className="h-20 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
