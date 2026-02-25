import React, { useState, useMemo } from "react";
import {
  AiOutlineUpload,
  AiOutlineDownload,
  AiOutlineFilter,
  AiOutlineReload,
} from "react-icons/ai";
import { Trash2 } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import FileUploadModal from "../ContentLibrary/FileUploadModel";

export default function FileUploadPage() {
  const [files, setFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [fileSizeFilter, setFileSizeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("New to Old");

  const sizeOptions = ["All", "< 5 MB", "< 10 MB", "> 10 MB"];
  const sortOptions = ["New to Old", "Old to New", "A to Z", "Z to A"];

  // Upload file
  const handleUpload = (file) => {
    const newFile = {
      id: files.length + 1,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2), // MB
      url: URL.createObjectURL(file),
    };
    setFiles((prev) => [newFile, ...prev]);
    // toast.success(`File "${file.name}" uploaded successfully`);
  };

  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloading ${file.name}...`);
  };

  const handleDelete = (id) => {
    setFiles(files.filter((f) => f.id !== id));
    toast.success("File deleted successfully");
  };

  const resetFilters = () => {
    setFileSizeFilter("All");
    setSortBy("New to Old");
    setSearchQuery("");
    toast.info("Filters reset successfully");
  };

  const applyFilters = () => {
    setShowFilters(false);
    toast.success("Filters applied successfully");
  };

  // Filtered & sorted files
  const filteredFiles = useMemo(() => {
    let filtered = [...files];

    // Search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // File size filter
    filtered = filtered.filter((f) => {
      if (fileSizeFilter === "less than 5 MB") return f.size < 5;
      if (fileSizeFilter === "less than < 10 MB") return f.size < 10;
      if (fileSizeFilter === "greater than> 10 MB") return f.size > 10;
      return true;
    });

    // Sort filter
    filtered.sort((a, b) => {
      if (sortBy === "A to Z") return a.name.localeCompare(b.name);
      if (sortBy === "Z to A") return b.name.localeCompare(a.name);
      if (sortBy === "New to Old") return b.id - a.id;
      if (sortBy === "Old to New") return a.id - b.id;
      return 0;
    });

    return filtered;
  }, [files, searchQuery, fileSizeFilter, sortBy]);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Search + Filter + Upload */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4 px-4 py-3 bg-white shadow rounded">
        <input
          type="text"
          placeholder="Search files..."
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
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="mb-6 bg-blue-100 p-4 flex flex-wrap items-end gap-3 w-full rounded">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              File Size
            </label>
            <select
              value={fileSizeFilter}
              onChange={(e) => setFileSizeFilter(e.target.value)}
              className="w-48 md:w-56 p-2 border border-gray-300 rounded bg-white text-sm"
            >
              {sizeOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>

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

      {/* File Table or No Files Message */}
      {filteredFiles.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 mb-4">
            No files found. Start adding files to your store.
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center justify-center gap-2 mx-auto bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition-colors"
          >
            <AiOutlineUpload className="w-5 h-5" /> Add File
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-4 text-left">File Name</th>
                <th className="px-4 py-4 text-left">File Size (MB)</th>
                <th className="px-4 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file.id} className="border-b">
                  <td className="px-4 py-4">{file.name}</td>
                  <td className="px-4 py-4">{file.size}</td>
                  <td className="px-4 py-4 text-center flex justify-center gap-5">
                    <AiOutlineDownload
                      className="w-5 h-5 cursor-pointer text-blue-600 hover:text-blue-800"
                      onClick={() => handleDownload(file)}
                      title="Download"
                    />
                    <Trash2
                      className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(file.id)}
                      title="Delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="" // No title
        onUpload={handleUpload}
      />
    </div>
  );
}
