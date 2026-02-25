import React, { useState } from "react";

const FtpSyncPage = () => {
  const [bulkUpload, setBulkUpload] = useState(true);

  const handleToggle = () => {
    setBulkUpload(!bulkUpload);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow-2xl ">
      <div className="flex items-center space-x-3 mb-4 ">
        <label
          htmlFor="bulk-upload"
          className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="bulk-upload"
            className="sr-only"
            checked={bulkUpload}
            onChange={handleToggle}
          />
          <div
            className={`w-11 h-6 rounded-full transition-colors duration-300 ease-in-out ${
              bulkUpload ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
          <div
            className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ease-in-out ${
              bulkUpload ? "translate-x-5" : ""
            }`}
          />
        </label>
        <span className="text-gray-900 font-semibold select-none">
          Bulk Upload
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        You can sync medias after enabling this option
      </p>

      <div>
        <h2 className="font-bold text-lg mb-4">FTP Account Details</h2>
        <div className="border rounded-md divide-y divide-gray-200">
          <div className="flex justify-between px-4 py-3">
            <span className="font-semibold text-gray-700">Server</span>
            <span className="text-gray-600">52.86.193.110</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="font-semibold text-gray-700">User Name</span>
            <span className="text-gray-600">pranalithorat161805</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="font-semibold text-gray-700">Password</span>
            <span className="text-gray-600">kfLk3oqruO</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="font-semibold text-gray-700">Port</span>
            <span className="text-gray-600">21</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-6 px-5 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
      >
        ↻ Sync To Library
      </button>
    </div>
  );
};

export default FtpSyncPage;
