import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import FileUploadModal from "../ContentLibrary/FileUploadModel";

export default function AddPlaylist() {
  const navigate = useNavigate();

  const [playlistType, setPlaylistType] = useState("");
  const [displayTitle, setDisplayTitle] = useState("");
  const [permalink, setPermalink] = useState("");
  const [description, setDescription] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [playlistItems, setPlaylistItems] = useState([]);
  const [playlistItemInput, setPlaylistItemInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({
    poster: { web: null, mobile: null, tv: null },
    banner: { web: null, mobile: null, tv: null },
  });
  const [activeSection, setActiveSection] = useState("poster");
  const [errors, setErrors] = useState({});

  const posterResolutions = {
    web: "288x424px",
    mobile: "200x300px",
    tv: "415x600px",
  };
  const bannerResolutions = {
    web: "1600x480px",
    mobile: "1600x900px",
    tv: "1920x1080px",
  };

  const [contentCategory, setContentCategory] = useState([]);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const categoryList = ["Video", "Audio"];

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (contentCategory.includes(value)) {
      setContentCategory(contentCategory.filter((c) => c !== value));
    } else {
      setContentCategory([...contentCategory, value]);
    }
  };

  const handleAddPlaylistItem = () => {
    if (playlistItemInput.trim() !== "") {
      setPlaylistItems([...playlistItems, playlistItemInput]);
      setPlaylistItemInput("");
    }
  };

  // File Upload Modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentUpload, setCurrentUpload] = useState({
    type: "",
    resolution: "",
  });

  const handleOpenUploadModal = (type, resolution) => {
    setCurrentUpload({ type, resolution });
    setShowUploadModal(true);
  };

  const handleUpload = (file) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [currentUpload.type]: {
        ...prev[currentUpload.type],
        [currentUpload.resolution]: file,
      },
    }));
    setShowUploadModal(false);
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!playlistType) newErrors.playlistType = "Please select Playlist Type.";
    if (!displayTitle.trim()) newErrors.displayTitle = " Title is required.";
    if (!permalink.trim()) newErrors.permalink = "Permalink is required.";
    if (contentCategory.length === 0)
      newErrors.category = "Please select at least one category.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const data = {
        playlistType,
        displayTitle,
        permalink,
        category: contentCategory,
        description,
        searchTag,
        playlistItems,
        uploadedFiles,
      };
      console.log("Submit Data:", data);
      alert("Playlist submitted! Check console.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="flex items-center cursor-pointer text-blue-600"
            onClick={() => navigate(-1)}
          >
            <AiOutlineArrowLeft className="mr-1" /> Back
          </div>
          <h2 className="text-2xl font-semibold">Add Playlist</h2>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Left Form - Side-by-Side Responsive Layout */}
          <div className="w-full lg:w-3/5 space-y-6">
            {/* Playlist Type */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <label className="sm:col-span-4 font-semibold">
                Playlist Type <span className="text-red-600">*</span>
              </label>
              <div className="sm:col-span-8">
                <select
                  value={playlistType}
                  onChange={(e) => setPlaylistType(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="">Select Type</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                </select>
                {errors.playlistType && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.playlistType}
                  </p>
                )}
              </div>
            </div>

            {/* Display Title */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <label className="sm:col-span-4 font-semibold">
                Title <span className="text-red-600">*</span>
              </label>
              <div className="sm:col-span-8">
                <input
                  type="text"
                  value={displayTitle}
                  onChange={(e) => setDisplayTitle(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                {errors.displayTitle && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.displayTitle}
                  </p>
                )}
              </div>
            </div>

            {/* Permalink */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <label className="sm:col-span-4 font-semibold">
                Permalink <span className="text-red-600">*</span>
              </label>
              <div className="sm:col-span-8">
                <input
                  type="text"
                  value={permalink}
                  onChange={(e) => setPermalink(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                {errors.permalink && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.permalink}
                  </p>
                )}
              </div>
            </div>

            {/* Content Category */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center relative">
              <label className="sm:col-span-4 font-semibold">
                Content Category <span className="text-red-600">*</span>
              </label>
              <div className="sm:col-span-8 relative">
                <div
                  className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex justify-between items-center"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                >
                  {contentCategory.length > 0
                    ? contentCategory.join(", ")
                    : "Select Category"}
                  <span>▾</span>
                </div>
                {categoryDropdownOpen && (
                  <div className="absolute mt-1 w-full border border-gray-300 bg-white rounded shadow p-2 z-10">
                    {categoryList.map((cat, idx) => (
                      <label key={idx} className="flex items-center gap-2 mb-1">
                        <input
                          type="checkbox"
                          value={cat.toLowerCase()}
                          checked={contentCategory.includes(cat.toLowerCase())}
                          onChange={handleCategoryChange}
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                )}
                {errors.category && (
                  <p className="text-red-600 text-sm mt-1">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
              <label className="sm:col-span-4 font-semibold">
                Description:
              </label>
              <div className="sm:col-span-8">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  rows={4}
                />
              </div>
            </div>

            {/* Search Tag */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <label className="sm:col-span-4 font-semibold">Search Tag:</label>
              <div className="sm:col-span-8">
                <input
                  type="text"
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            </div>

            {/* Playlist Items */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
              <label className="sm:col-span-4 font-semibold">
                Playlist Items:
              </label>
              <div className="sm:col-span-8">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={playlistItemInput}
                    onChange={(e) => setPlaylistItemInput(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 flex-1"
                    placeholder="Add playlist item"
                  />
                  <button
                    type="button"
                    onClick={handleAddPlaylistItem}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
                  >
                    <AiOutlinePlus /> Add
                  </button>
                </div>
                <ul className="mt-2 list-disc list-inside text-sm">
                  {playlistItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Form - Smaller */}
          <div className="md:w-2/5 space-y-6 min-w-0">
            {/* Tabs for Poster/Banner */}
            <div className="flex gap-4 mb-4">
              {["poster", "banner"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded ${
                    activeSection === tab
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setActiveSection(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Upload Sections */}
            {["website", "mobile apps", "tv apps"].map((type) => {
              const resolutionKey =
                type === "mobile apps"
                  ? "mobile"
                  : type === "tv apps"
                  ? "tv"
                  : "web";
              const file =
                activeSection === "poster"
                  ? uploadedFiles.poster[resolutionKey]
                  : uploadedFiles.banner[resolutionKey];
              const resolution =
                activeSection === "poster"
                  ? posterResolutions[resolutionKey]
                  : bannerResolutions[resolutionKey];

              const handleDeleteFile = () => {
                setUploadedFiles((prev) => ({
                  ...prev,
                  [activeSection]: {
                    ...prev[activeSection],
                    [resolutionKey]: null,
                  },
                }));
              };

              const handleFileUpload = (e) => {
                const selectedFile = e.target.files[0];
                if (!selectedFile) return;

                const allowedTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "image/tiff",
                  "image/svg+xml",
                  "image/gif",
                  "image/jfif",
                  "image/webp",
                ];

                if (!allowedTypes.includes(selectedFile.type)) {
                  alert(
                    "❌ Unsupported file format.\nPlease upload JPG, JPEG, PNG, TIFF, SVG, GIF, JFIF, or WEBP."
                  );
                  e.target.value = "";
                  return;
                }

                // ✅ Save file if valid
                setUploadedFiles((prev) => ({
                  ...prev,
                  [activeSection]: {
                    ...prev[activeSection],
                    [resolutionKey]: selectedFile,
                  },
                }));
              };

              return (
                <div key={type} className="flex flex-col gap-2 w-full">
                  <p className="font-semibold">
                    {type.toUpperCase()}{" "}
                    {activeSection.charAt(0).toUpperCase() +
                      activeSection.slice(1)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Resolution: {resolution}
                  </p>

                  {/* Upload Box */}
                  <div className="relative border-2 border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center bg-blue-50 w-full h-48 overflow-hidden">
                    {file ? (
                      <>
                        {/* Image Preview */}
                        <img
                          src={
                            typeof file === "string"
                              ? file
                              : URL.createObjectURL(file)
                          }
                          alt="preview"
                          className="object-contain w-full h-full rounded"
                        />

                        {/* Delete Icon */}
                        <button
                          type="button"
                          onClick={handleDeleteFile}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <label className="cursor-pointer flex flex-col items-center justify-center text-gray-600">
                          <AiOutlinePlus className="w-5 h-5 mb-1" />
                          <span className="text-sm">Add File</span>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.tiff,.svg,.gif,.jfif,.webp"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Supported Formats Info */}
            <p className="text-sm text-gray-600 mt-2">
              Supported files : ( JPG, JPEG, PNG, TIFF, SVG, GIF, JFIF, WEBP )
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-end mt-6">
          <button
            className="px-6 py-2 bg-gray-300 rounded"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>

        {/* Upload Modal */}
        <FileUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          title="Upload New Image"
          onUpload={handleUpload}
        />
      </div>
    </div>
  );
}
