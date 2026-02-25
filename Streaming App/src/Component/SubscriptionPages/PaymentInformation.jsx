import React, { useState } from "react";
import Modal from "../../common/Model";

export default function PaymentInformation() {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    country: "",
    state: "",
    province: "",
    city: "",
    zip: "",
    streetAddress: "",
  });

  const [errors, setErrors] = useState({});

  const fieldMessages = {
    cardHolderName: "Please enter the card holder name",
    cardNumber: "Please enter a valid card number",
    expiryDate: "Please enter the expiry date",
    cvv: "Please enter CVV",
    country: "Please select a country",
    state: "Please enter a state",
    province: "Please enter a province",
    city: "Please enter a city",
    zip: "Please enter a zip code",
    streetAddress: "Please enter a street/lane name",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field as soon as user types
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = fieldMessages[key];
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      alert("Card saved successfully!");
      setShowDialog(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300";

  const fields = [
    {
      name: "cardHolderName",
      label: "Card Holder Name",
      colSpan: 2,
      placeholder: "Full name as displayed on card",
    },
    {
      name: "cardNumber",
      label: "Card Number",
      placeholder: "XXXX XXXX XXXX XXXX",
    },
    { name: "expiryDate", label: "Expiry Date", placeholder: "MM/YY" },
    { name: "cvv", label: "CVV", placeholder: "Security code" },
    { name: "country", label: "Country", placeholder: "Country" },
    { name: "state", label: "State", placeholder: "State" },
    { name: "province", label: "Province", placeholder: "Province" },
    { name: "city", label: "City", placeholder: "City" },
    {
      name: "zip",
      label: "Zip / Postal Code",
      placeholder: "Zip / Postal Code",
    },
    {
      name: "streetAddress",
      label: "Street / Lane Name",
      colSpan: 2,
      placeholder: "Street / Lane Name",
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg text-center">
      <h2 className="text-lg font-semibold mb-4">Payment Information</h2>

      <div className="text-gray-500 mb-4">No cards available.</div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => setShowDialog(true)}
      >
        Add New Card
      </button>

      <Modal
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        title="Add New Card"
        width="600px"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fields.map((field) => (
            <div
              key={field.name}
              className={field.colSpan === 2 ? "md:col-span-2" : ""}
            >
              {/* Left-aligned label */}
              <label className="block text-left text-sm mb-1 font-medium text-gray-700">
                {field.label} <span className="text-red-500">*</span>
              </label>

              <input
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={inputClass}
                placeholder={field.placeholder}
              />

              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setShowDialog(false)}
            className="border rounded px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}
