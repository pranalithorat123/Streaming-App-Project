import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account");

  const initialAccount = {
    company: "",
    fullName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    address: "",
  };

  const [account, setAccount] = useState(initialAccount);

  const initialPassword = {
    old: "",
    new: "",
    confirm: "",
  };
  const [password, setPassword] = useState(initialPassword);

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "company",
      "fullName",
      "email",
      "phone",
      "country",
      "state",
      "city",
      "zip",
      "address",
    ];
    for (let field of requiredFields) {
      if (!account[field]) {
        toast.error("Please fill all required fields!", { autoClose: 2000 });
        return;
      }
    }
    toast.success("Account details saved successfully!", { autoClose: 2000 });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password.old || !password.new || !password.confirm) {
      toast.error("All password fields are required!", { autoClose: 2000 });
      return;
    }
    if (password.new !== password.confirm) {
      toast.error("Passwords do not match!", { autoClose: 2000 });
      return;
    }
    toast.success("Password updated successfully!", { autoClose: 2000 });
    setPassword(initialPassword);
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const resetAccountForm = () => setAccount(initialAccount);
  const resetPasswordForm = () => setPassword(initialPassword);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-[1200px] mx-auto space-y-6">
      <ToastContainer />
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        My Profile
      </h1>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded transition-colors duration-200 w-full sm:w-auto ${
            activeTab === "account"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("account")}
        >
          Account Details
        </button>
        <button
          className={`px-4 py-2 rounded transition-colors duration-200 w-full sm:w-auto ${
            activeTab === "password"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </div>

      {/* Account Details Form */}
      {activeTab === "account" && (
        <>
          <form
            onSubmit={handleAccountSubmit}
            className="p-4 sm:p-6 rounded-lg shadow-lg bg-white space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Account Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { label: "Company Name", name: "company" },
                { label: "Full Name", name: "fullName" },
                { label: "Email", name: "email" },
                { label: "Phone", name: "phone" },
                { label: "Country", name: "country" },
                { label: "State/Province", name: "state" },
                { label: "City", name: "city" },
                { label: "Zip/Postal Code", name: "zip" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={account[field.name]}
                    onChange={handleAccountChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={`Enter ${field.label}`}
                  />
                </div>
              ))}

              {/* Address Field */}
              <div className="md:col-span-2">
                <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={account.address}
                  onChange={handleAccountChange}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  placeholder="Enter Address"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
              <button
                type="submit"
                className="px-5 py-2 sm:px-6 sm:py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
              >
                Save Account
              </button>
              <button
                type="button"
                onClick={resetAccountForm}
                className="px-5 py-2 sm:px-6 sm:py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-colors duration-200 w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Cancel Account Section */}
          <div className="p-4 sm:p-6 rounded-lg shadow-lg bg-white mt-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              Cancel Account
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              All your data including videos and metadata will be deleted 14
              days after cancellation. Please make sure to export all your data
              before cancelling account.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() =>
                  window.location.assign("/account-info/cancel-subscription")
                }
                className="px-5 py-2 sm:px-6 sm:py-2.5 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto"
              >
                Cancel Account
              </button>
            </div>
          </div>
        </>
      )}

      {/* Change Password Form */}
      {activeTab === "password" && (
        <form
          onSubmit={handlePasswordSubmit}
          className="p-4 sm:p-6 rounded-lg shadow-lg bg-white space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Change Password
          </h2>
          {["old", "new", "confirm"].map((field) => (
            <div key={field} className="relative">
              <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">
                {field === "old"
                  ? "Old Password"
                  : field === "new"
                  ? "New Password"
                  : "Confirm Password"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword[field] ? "text" : "password"}
                value={password[field]}
                onChange={(e) =>
                  setPassword({ ...password, [field]: e.target.value })
                }
                placeholder={`Enter ${field} password`}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              />
              <button
                type="button"
                onClick={() => toggleShowPassword(field)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword[field] ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <button
              type="submit"
              className="px-5 py-2 sm:px-6 sm:py-2.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors duration-200 w-full sm:w-auto"
            >
              Save Password
            </button>
            <button
              type="button"
              onClick={resetPasswordForm}
              className="px-5 py-2 sm:px-6 sm:py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-colors duration-200 w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
