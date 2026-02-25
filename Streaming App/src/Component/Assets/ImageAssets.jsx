import React, { useState } from "react";
import {
  AiOutlineFilter,
  AiOutlineReload,
  AiOutlineUpload,
  AiOutlineDownload,
} from "react-icons/ai";
import { Trash2 } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import FileUploadModal from "../ContentLibrary/FileUploadModel";

export default function ImageAssets() {
  const [showFilters, setShowFilters] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [images, setImages] = useState([
    {
      id: 1,
      name: "Nature1.jpg",
      thumbnail:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80",
      size: "4 MB",
    },
    {
      id: 2,
      name: "Nature2.jpg",
      thumbnail:
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=300&q=80",
      size: "8 MB",
    },
  ]);

  const sizeOptions = [
    "All",
    "Less than 5 MB",
    "Less than 10 MB",
    "More than 10 MB",
  ];
  const sortOptions = ["New to Old", "Old to New", "A to Z", "Z to A"];

  const [size, setSize] = useState("All");
  const [sortBy, setSortBy] = useState("New to Old");

  const resetFilters = () => {
    setSize("All");
    setSortBy("New to Old");
    toast.info("Filters reset successfully");
  };

  const applyFilters = () => {
    let filtered = [...images];

    // Size filter
    filtered = filtered.filter((img) => {
      const sizeMB = parseFloat(img.size);
      if (size === "Less than 5 MB") return sizeMB < 5;
      if (size === "Less than 10 MB") return sizeMB < 10;
      if (size === "More than 10 MB") return sizeMB > 10;
      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === "A to Z") return a.name.localeCompare(b.name);
      if (sortBy === "Z to A") return b.name.localeCompare(a.name);
      if (sortBy === "New to Old") return b.id - a.id;
      if (sortBy === "Old to New") return a.id - b.id; 
      return 0;
    });

    setImages(filtered);
    setShowFilters(false);
    toast.success("Filters applied successfully");
  };

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
    setImages(images.filter((img) => img.id !== id));
    toast.success("Image deleted successfully");
  };

  const handleUpload = (file) => {
    const newImage = {
      id: images.length + 1,
      name: file.name,
      thumbnail: URL.createObjectURL(file),
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
    };
    setImages((prev) => [newImage, ...prev]);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Search + Filter + Upload */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6 px-4 py-3 bg-white shadow">
        <input
          type="text"
          placeholder="Search Images"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-2 sm:gap-3">
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
            Upload Image
          </button>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="mb-6 bg-blue-100 p-4 flex flex-wrap items-end gap-3 w-full">
          {/* Size Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              File Size
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-48 md:w-56 p-2 border border-gray-300 rounded bg-white text-sm"
            >
              {sizeOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-48 md:w-56 p-2 border border-gray-300 rounded bg-white text-sm"
            >
              {sortOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Apply & Reset */}
          <div className="flex gap-3 ml-auto">
            <button
              onClick={applyFilters}
              className="px-5 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition-colors whitespace-nowrap"
            >
              Apply
            </button>
            <AiOutlineReload
              onClick={resetFilters}
              className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 mt-1"
              title="Reset Filters"
            />
          </div>
        </div>
      )}

      {/* Image Table */}
      <div className="w-full overflow-x-auto bg-white shadow rounded-lg">
        {images.filter((img) =>
          img.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0 ? (
          <p className="text-center text-gray-500 py-10">No images available</p>
        ) : (
          <table className="w-full table-auto border-collapse text-base">
            <thead className="bg-gray-100 text-black text-left font-semibold">
              <tr>
                <th className="px-4 py-3 font-semibold">File</th>
                <th className="px-4 py-3 font-semibold">Properties</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {images
                .filter((img) =>
                  img.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((img) => (
                  <tr
                    key={img.id}
                    className="border border-gray-300 hover:bg-gray-100 transition"
                  >
                    {/* File Column */}
                    <td className="px-4 py-4 flex items-center gap-4">
                      {img.thumbnail ? (
                        <img
                          src={img.thumbnail}
                          alt={img.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-md">
                          <AiOutlinePicture className="w-8 h-8 text-gray-500" />
                        </div>
                      )}
                      <span className="font-medium text-gray-800 truncate w-48">
                        {img.name}
                      </span>
                    </td>

                    {/* Properties Column */}
                    <td className="px-4 py-4 text-gray-700">
                      <p>
                        <strong>File Size:</strong> {img.size}
                      </p>
                    </td>

                    {/* Actions Column */}
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-5 text-gray-600">
                        <AiOutlineDownload
                          title="Download"
                          className="w-5 h-5 cursor-pointer text-blue-600"
                          onClick={() => handleDownload(img)}
                        />
                        <Trash2
                          title="Delete"
                          className="w-5 h-5 cursor-pointer text-red-600"
                          onClick={() => handleDelete(img.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Upload Modal */}
      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload New Image"
        onUpload={handleUpload}
      />
    </div>
  );
}
