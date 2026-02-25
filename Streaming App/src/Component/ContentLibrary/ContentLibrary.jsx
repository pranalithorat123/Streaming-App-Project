import React, { useState, useEffect, useRef } from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineFilter,
  AiOutlineUpload,
  AiOutlineDown,
  AiOutlineRight,
  AiOutlineReload,
} from "react-icons/ai";
import { Edit } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import FileUploadModal from "./FileUploadModel";

const contentItems = [
  {
    name: "Claudia Alves",
    contentId: "CLAU93959341",
    fileName: "Boomopera_-_Summer_Pop_Full_Length_-1666173158467....wav",
    category: "Audio",
    date: "2024-09-20",
  },
  {
    name: "Morgan Hello",
    contentId: "MORG13955955",
    fileName: "Boomopera_-_Summer_Pop_Full_Length_-1666173158467....wav",
    category: "Video",
    date: "2024-09-18",
  },
  {
    name: "Jacqueline",
    contentId: "JACQ29196830",
    fileName: "Boomopera_-_Summer_Pop_Full_Length_-1666173158467....wav",
    category: "Audio",
    date: "2024-09-10",
  },
  {
    name: "Ibex Woman",
    contentId: "IBEX80041692",
    fileName: "Boomopera_-_Summer_Pop_Full_Length_-1666173158467....wav",
    category: "Video",
    date: "2024-09-25",
  },
];

export default function ContentPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFor, setUploadFor] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef();
  const [editContent, setEditContent] = useState(null);

  // -------- Filter states ----------
  const [filterCategory, setFilterCategory] = useState({
    video: false,
    audio: false,
  });
  const [filterContentType, setFilterContentType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSortBy, setFilterSortBy] = useState("New to Old");

  // Dropdown open/close
  const [openCategory, setOpenCategory] = useState(false);

  // Filtered items
  const [filteredItems, setFilteredItems] = useState(contentItems);

  const handleEditClick = (item) => {
    navigate("/edit-content", { state: { contentData: item } });
  };

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Upload modal
  const openUploadBox = (name) => {
    setUploadFor(name);
    setShowUploadModal(true);
  };

  // Helpers
  const toggleCategory = (key) =>
    setFilterCategory((prev) => ({ ...prev, [key]: !prev[key] }));

  const resetFilters = () => {
    setFilterCategory({ video: false, audio: false });
    setFilterContentType("All");
    setFilterStatus("All");
    setFilterSortBy("New to Old");
    setFilteredItems(contentItems);
    setSearchQuery("");
  };

  // Apply Filters
  const applyFilters = () => {
    let filtered = [...contentItems];

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        ({ name, contentId, fileName }) =>
          name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fileName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const selectedCategories = Object.entries(filterCategory)
      .filter(([_, value]) => value)
      .map(([key]) => key.toLowerCase());

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category.toLowerCase())
      );
    }

    if (filterContentType !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.category.toLowerCase() === filterContentType.toLowerCase()
      );
    }

    filtered.sort((a, b) => {
      if (filterSortBy === "A to Z") return a.name.localeCompare(b.name);
      if (filterSortBy === "Z to A") return b.name.localeCompare(a.name);
      if (filterSortBy === "New to Old")
        return new Date(b.date) - new Date(a.date);
      if (filterSortBy === "Old to New")
        return new Date(a.date) - new Date(b.date);
      return 0;
    });

    setFilteredItems(filtered);
    setShowFilters(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Search, Filter & Add */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search Content"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors"
          >
            <AiOutlineFilter className="w-5 h-5" />
          </button>
          <Link
            to="add-content"
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            + Add Content
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="mb-6 bg-blue-100 p-4 rounded flex flex-wrap items-center gap-4 relative">
          {/* Category */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Filter By Category
            </label>
            <div className="border rounded bg-white relative">
              <button
                onClick={() => setOpenCategory(!openCategory)}
                className="w-48 flex justify-between items-center p-2 text-sm text-gray-700"
              >
                Select Category
                {openCategory ? <AiOutlineDown /> : <AiOutlineRight />}
              </button>
              {openCategory && (
                <div className="absolute bg-white border rounded shadow mt-1 w-48 z-50 p-2 flex flex-col gap-1">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filterCategory.video}
                      onChange={() => toggleCategory("video")}
                    />{" "}
                    Video
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filterCategory.audio}
                      onChange={() => toggleCategory("audio")}
                    />{" "}
                    Audio
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Content Type
            </label>
            <select
              value={filterContentType}
              onChange={(e) => setFilterContentType(e.target.value)}
              className="w-48 p-2 border border-gray-300 rounded text-sm bg-white"
            >
              <option value="All">All</option>
              <option value="Video">Video</option>
              <option value="Audio">Audio</option>
            </select>
          </div>

          {/* Sort & Apply */}
          <div className="flex gap-3 items-end ml-auto">
            <button
              onClick={applyFilters}
              className="px-5 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition-colors whitespace-nowrap"
            >
              Apply
            </button>
            <AiOutlineReload
              onClick={resetFilters}
              className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800"
              title="Reset Filters"
            />
          </div>
        </div>
      )}

      {/* Content Table */}
      <div className="px-4 pb-10">
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No content available
          </p>
        ) : (
          <table className="min-w-full table-auto border-collapse text-base">
            <thead className="bg-gray-100 text-black text-left font-semibold">
              <tr>
                <th className="px-6 py-3 font-semibold">Content Name</th>
                <th className="px-6 py-3 font-semibold text-center">
                  Category
                </th>
                <th className="px-6 py-3 font-semibold text-center">
                  Monetization
                </th>
                <th className="px-6 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map(
                ({ name, contentId, fileName, category }, i) => (
                  <tr
                    key={i}
                    className=" border border-gray-300 hover:bg-gray-100 transition"
                  >
                    {/* Content Name & Details */}
                    <td className="px-6 py-4 flex items-center gap-4">
                      <img
                        src={`https://randomuser.me/api/portraits/${
                          i % 2 === 0 ? "women" : "men"
                        }/${i + 10}.jpg`}
                        alt={name}
                        className="w-16 h-16 rounded object-cover flex-shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">
                          {name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {contentId}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          File: {fileName}
                        </div>
                        <span className="inline-block mt-1 px-2 py-0.5 text-green-700 bg-green-100 rounded text-xs font-semibold">
                          Published
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-center text-gray-700">
                      {category}
                    </td>

                    {/* Monetization */}
                    <td className="px-6 py-4 text-center text-gray-700">
                      <div className="flex justify-center items-center gap-2">
                        <button className="px-2 py-1 bg-gray-200 rounded text-xs md:text-sm">
                          Info
                        </button>
                        <AiOutlineInfoCircle className="w-4 h-4 text-gray-500" />
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-4 text-gray-600">
                        {/* Upload */}
                        <div
                          className="w-8 h-8 flex items-center justify-center rounded cursor-pointer hover:bg-gray-200"
                          onClick={() => openUploadBox(name)}
                          title="Upload File"
                        >
                          <AiOutlineUpload className="text-blue-600 w-5 h-5" />
                        </div>

                        {/* Edit */}
                        <div
                          className="w-8 h-8 flex items-center justify-center rounded cursor-pointer hover:bg-gray-200"
                          onClick={() => navigate("edit-content")}
                          title="Edit Content"
                        >
                          <Edit
                            size={18}
                            className="text-blue-600"
                            onClick={() => handleEditClick(item)}
                          />
                        </div>

                        {/* More Options Dropdown */}
                        <div className="relative">
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded cursor-pointer text-gray-500 hover:bg-gray-200"
                            onClick={() =>
                              setActiveMenuIndex(
                                activeMenuIndex === i ? null : i
                              )
                            }
                            title="More Options"
                          >
                            ⋮
                          </button>
                          {activeMenuIndex === i && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-50 flex flex-col text-sm">
                              {[
                                "Manage Schedule",
                                "Embed",
                                "Shareable Link",
                                "Related Content",
                                "Manage Plan",
                                "Add to Playlist",
                                "Set Geoblock",
                                "Manage Ads",
                              ].map((option) => (
                                <button
                                  key={option}
                                  className="px-3 py-2 hover:bg-gray-100 text-left text-base"
                                >
                                  {option}
                                </button>
                              ))}
                              <button className="px-3 py-2 hover:bg-red-600 text-white text-left text-base">
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title={`Upload File for ${uploadFor || ""}`}
        onUpload={(file) => {
          console.log("Uploading file:", file);
          toast.success(`File "${file.name}" uploaded`);
        }}
      />
    </div>
  );
}
