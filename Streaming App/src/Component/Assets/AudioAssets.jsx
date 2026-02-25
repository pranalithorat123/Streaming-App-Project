import React, { useState } from "react";
import {
  AiOutlineFilter,
  AiOutlineReload,
  AiOutlineUpload,
  AiOutlineDownload,
  AiOutlineSetting,
  AiOutlineAudio,
} from "react-icons/ai";
import { Trash2 } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import FileUploadModal from "../ContentLibrary/FileUploadModel";

export default function AudioAssets() {
  const [showFilters, setShowFilters] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [videos, setVideos] = useState([
    {
      id: 1,
      name: "Travel_Vlog_2025.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80",
      size: "820 MB",
    },
    {
      id: 2,
      name: "Cooking_Show.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=300&q=80",
      size: "2.5 GB",
    },
  ]);

  const durationOptions = [
    "All",
    "Less than 10 minutes",
    "Less than 30 minutes",
    "Less than 60 minutes",
    "Less than 120 minutes",
    "More than 120 minutes",
  ];
  const sizeOptions = [
    "All",
    "Less than 1 GB",
    "Less than 5 GB",
    "Less than 10 GB",
    "More than 10 GB",
  ];
  const mappedOptions = ["All", "Yes", "No"];
  const uploadedOptions = [
    "All",
    "Today",
    "Yesterday",
    "This Week",
    "This Month",
    "This Year",
    "Previous Year",
  ];
  const sortOptions = ["New to Old", "Old to New", "A to Z", "Z to A"];

  const [duration, setDuration] = useState("All");
  const [size, setSize] = useState("All");
  const [mapped, setMapped] = useState("All");
  const [uploadedIn, setUploadedIn] = useState("All");
  const [sortBy, setSortBy] = useState("New to Old");

  const resetFilters = () => {
    setDuration("All");
    setSize("All");
    setMapped("All");
    setUploadedIn("All");
    setSortBy("New to Old");
    setSearchQuery("");
    toast.info("Filters reset successfully");
  };

  // Filtered videos
  const filteredVideos = videos.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (img) => {
    const link = document.createElement("a");
    link.href = img.thumbnail;
    link.download = img.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloading ${img.name}...`);
  };

  const handleDelete = (id) => {
    setVideos(videos.filter((v) => v.id !== id));
    toast.success("Video deleted successfully");
  };

  const handleUpload = (file) => {
    const newVideo = {
      id: videos.length + 1,
      name: file.name,
      thumbnail: file.type.startsWith("video/")
        ? ""
        : "https://via.placeholder.com/300x180?text=New+File",
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      duration: "0 min",
      uploadedDate: new Date().toISOString().split("T")[0],
    };
    setVideos((prev) => [newVideo, ...prev]);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Search + Filter + Upload */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-3 mb-6 px-4 py-3 bg-white shadow rounded">
        <input
          type="text"
          placeholder="Search Audio File"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors"
          >
            <AiOutlineFilter className="w-5 h-5 mr-2" />
            Filter
          </button>

          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors"
          >
            <AiOutlineUpload className="w-5 h-5 mr-2" />
            Upload Audio
          </button>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="mb-6 bg-blue-100 p-4 flex flex-wrap items-end gap-2 w-full rounded">
          {[
            {
              label: "Audio Duration",
              value: duration,
              setter: setDuration,
              options: durationOptions,
            },
            {
              label: "File Size",
              value: size,
              setter: setSize,
              options: sizeOptions,
            },
            {
              label: "Mapped to Content",
              value: mapped,
              setter: setMapped,
              options: mappedOptions,
            },
            {
              label: "Uploaded In",
              value: uploadedIn,
              setter: setUploadedIn,
              options: uploadedOptions,
            },
            {
              label: "Sort By",
              value: sortBy,
              setter: setSortBy,
              options: sortOptions,
            },
          ].map((f) => (
            <div key={f.label} className="flex flex-col w-full sm:w-48 md:w-56">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                {f.label}
              </label>
              <select
                value={f.value}
                onChange={(e) => f.setter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded bg-white text-sm"
              >
                {f.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}

          <div className="flex gap-3 ml-auto mt-2 sm:mt-0">
            <button
              onClick={() => toast.success("Filters applied successfully")}
              className="px-5 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition-colors whitespace-nowrap"
            >
              Apply
            </button>
            <AiOutlineReload
              onClick={resetFilters}
              className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 mt-2 sm:mt-1"
              title="Reset Filters"
            />
          </div>
        </div>
      )}

      {/* Audio Table */}
      <div className="px-2 sm:px-4 pb-10">
        {filteredVideos.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No audio files available
          </p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full table-auto border-collapse text-sm sm:text-base">
              <thead className="bg-gray-100 text-black text-left font-semibold">
                <tr>
                  <th className="px-4 sm:px-6 py-3 font-semibold">File</th>
                  <th className="px-4 sm:px-6 py-3 font-semibold">
                    Properties
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-semibold text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredVideos.map((audio) => (
                  <tr
                    key={audio.id}
                    className="border border-gray-300 hover:bg-gray-100 transition"
                  >
                    {/* File Column */}
                    <td className="px-2 sm:px-6 py-4 flex items-center gap-3 sm:gap-4">
                      {audio.thumbnail ? (
                        <img
                          src={audio.thumbnail}
                          alt={audio.name}
                          className="w-12 sm:w-16 h-12 sm:h-16 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-gray-200 rounded-md">
                          <AiOutlineAudio className="w-6 sm:w-8 h-6 sm:h-8 text-gray-500" />
                        </div>
                      )}
                      <span className="font-medium text-gray-800 truncate w-32 sm:w-48">
                        {audio.name}
                      </span>
                    </td>

                    {/* Properties Column */}
                    <td className="px-2 sm:px-6 py-4 text-gray-700">
                      <p>
                        <strong>File Size:</strong> {audio.size}
                      </p>
                    </td>

                    {/* Actions Column */}
                    <td className="px-2 sm:px-6 py-4 text-center">
                      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-gray-600">
                        <button
                          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                          onClick={() => toast.info("Opening audio manager...")}
                        >
                          <AiOutlineSetting className="mr-1 w-4 h-4" /> Manage
                        </button>
                        <AiOutlineDownload
                          title="Download"
                          className="w-5 h-5 cursor-pointer text-blue-600 hover:text-blue-800"
                          onClick={() => handleDownload(audio)}
                        />
                        <Trash2
                          title="Delete"
                          className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(audio.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload New Audio"
        onUpload={handleUpload}
      />
    </div>
  );
}
