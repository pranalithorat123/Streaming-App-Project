import React, { useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineUpload,
  AiOutlineArrowLeft,
  AiOutlineClose,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FileUploadModal from "../FileUploadModel";

export default function AddContentPage() {
  const navigate = useNavigate();
  const [contentType, setContentType] = useState("");
  const [group, setGroup] = useState("");
  const [contentName, setContentName] = useState("");
  const [perMonthLink, setPerMonthLink] = useState("");
  const [contentCategory, setContentCategory] = useState([]);
  const [storyDescription, setStoryDescription] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [addonsFiles, setAddonsFiles] = useState([]);

  const [posterTab, setPosterTab] = useState("web");

  const [activeSection, setActiveSection] = useState("media");
  const [personType, setPersonType] = useState("");
  const [personName, setPersonName] = useState("");
  const [peopleList, setPeopleList] = useState([]);

  const posterResolutions = {
    web: "288x424px",
    mobile: "200x300px",
    tv: "450x600px",
  };
  const bannerResolutions = {
    website: "1600x560px",
    mobile: "1600x900px",
    tv: "1920x1080px",
  };

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setContentCategory([...contentCategory, value]);
    } else {
      setContentCategory(contentCategory.filter((c) => c !== value));
    }
  };

  const addPerson = () => {
    if (!personType || !personName) {
      toast.error("Please select person type and enter person name");
      return;
    }
    setPeopleList([...peopleList, { type: personType, name: personName }]);
    setPersonName("");
    toast.success("Person added successfully");
  };

  const saveDraft = () => {
    toast.success("Saved as draft successfully");
  };

  const savePublish = () => {
    if (
      !contentType ||
      !group ||
      !contentName ||
      !perMonthLink ||
      contentCategory.length === 0
    ) {
      toast.error("Please fill all required fields (*)");
      return;
    }
    toast.success("Content published successfully");
  };

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFor, setUploadFor] = useState("");
  const [uploadCategory, setUploadCategory] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({
    poster: { web: null, mobile: null, tv: null },
    primaryMedia: null,
    previewMedia: null,
    banner: { website: null, mobile: null, tv: null },
    addons: [],
  });

  const handlePosterDelete = (tab) => {
    setUploadedFiles((prev) => ({
      ...prev,
      poster: { ...prev.poster, [tab]: null },
    }));
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen mt-0">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center mb-2 flex-wrap gap-2">
        <div
          className="flex items-center text-blue-600 cursor-pointer mr-4 "
          onClick={() => navigate("/content/content-library")}
        >
          <AiOutlineArrowLeft className="w-5 h-5 mr-1" />
          Back
        </div>

        <h1 className="text-xl sm:text-2xl font-bold ">Add Content</h1>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded shadow">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/5 space-y-6">
            {/* Content Type */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <label className="sm:col-span-4 font-semibold">
                Content Type <span className="text-red-600">*</span>
              </label>
              <select
                className="sm:col-span-8 border border-gray-300 rounded px-3 py-2 w-full"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
              >
                <option value="">Please select</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>
            </div>

            {/* Group */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <label className="sm:col-span-4 font-semibold">
                Group <span className="text-red-600">*</span>
              </label>
              <select
                className="sm:col-span-8 border border-gray-300 rounded px-3 py-2 w-full"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              >
                <option value="">Please select</option>
                <option value="video">Video</option>
                <option value="web-series">Web Series</option>
                <option value="podcast">Podcast</option>
              </select>
            </div>

            {/* Content Name */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <label className="sm:col-span-4 font-semibold">
                Content Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={contentName}
                onChange={(e) => setContentName(e.target.value)}
                className="sm:col-span-8 border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            {/* Per Month Link */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <label className="sm:col-span-4 font-semibold">
                PermaLink <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={perMonthLink}
                onChange={(e) => setPerMonthLink(e.target.value)}
                className="sm:col-span-8 border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            {/* Content Category */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center relative">
              <label className="sm:col-span-4 font-semibold">
                Content Category <span className="text-red-600">*</span>
              </label>
              <div className="sm:col-span-8 relative w-full">
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
                    {[, "Video", "Audio"].map((cat, idx) => (
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
              </div>
            </div>

            {/* Story + Description */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
              <label className="sm:col-span-4 font-semibold">
                Story / Description
              </label>
              <textarea
                value={storyDescription}
                onChange={(e) => setStoryDescription(e.target.value)}
                className="sm:col-span-8 border border-gray-300 rounded px-3 py-2 w-full"
                rows={4}
              />
            </div>

            {/* Search Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <label className="sm:col-span-4 font-semibold">Search Tags</label>
              <input
                type="text"
                value={searchTags}
                onChange={(e) => setSearchTags(e.target.value)}
                className="sm:col-span-8 border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          {/* Right Poster */}
          <div className="w-full lg:w-2/5 space-y-8">
            <label className="font-semibold block text-xl sm:text-2xl">
              Poster
            </label>
            <div className="space-y-2">
              {/* Toggle buttons */}
              <div className="flex gap-4 sm:gap-10">
                {["web", "mobile", "tv"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-1 rounded text-sm sm:text-base ${
                      posterTab === tab
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setPosterTab(tab)}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Resolution & File Upload */}
              <p className="font-semibold">
                Resolution: {posterResolutions[posterTab]}
              </p>
              <div
                className="border-2 border-dashed border-gray-300 rounded p-6 flex flex-col items-center justify-center cursor-pointer bg-blue-100 relative h-64 w-full flex-wrap"
                onClick={() => {
                  setUploadFor(`poster-${posterTab}`);
                  setUploadCategory("Poster");
                  setShowUploadModal(true);
                }}
              >
                {uploadedFiles.poster[posterTab] ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <img
                      src={URL.createObjectURL(uploadedFiles.poster[posterTab])}
                      alt="poster"
                      className="object-contain max-h-full max-w-full"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePosterDelete(posterTab);
                      }}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                ) : (
                  <>
                    <AiOutlineUpload className="w-10 h-10 mb-2" />
                    Add File
                  </>
                )}
              </div>
              <p>
                Supported files : JPG, JPEG, PNG, TIFF, SVG, GIF, JFIF, WEBP
              </p>
            </div>
          </div>
        </div>

        {/* Media / Banner / People / Addons Tabs */}
        <div className="w-full lg:w-3/5 mt-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {["media", "banner", "people", "add ons"].map((section) => (
              <button
                key={section}
                className={`px-3 py-1 rounded text-sm sm:text-base ${
                  activeSection === section
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveSection(section)}
              >
                {section.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Media Section */}
          {activeSection === "media" && (
            <>
              <div className="flex flex-col md:flex-row gap-6">
                {["primaryMedia", "previewMedia"].map((type) => (
                  <div key={type} className="flex-1 flex flex-col items-center">
                    <p className="font-semibold">
                      {type === "primaryMedia"
                        ? "Primary Media"
                        : "Preview Media"}
                    </p>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded p-4 flex items-center justify-center cursor-pointer bg-blue-100 w-full max-w-md min-h-[250px] relative"
                      onClick={() => {
                        setUploadFor(type);
                        setUploadCategory(
                          type === "primaryMedia" ? "Media" : "Preview Media"
                        );
                        setShowUploadModal(true);
                      }}
                    >
                      {uploadedFiles[type] ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Show image preview if file is an image */}
                          {uploadedFiles[type].type.startsWith("image") ? (
                            <img
                              src={URL.createObjectURL(uploadedFiles[type])}
                              alt={type}
                              className="object-contain max-h-full max-w-full"
                            />
                          ) : (
                            <p className="font-medium">
                              {uploadedFiles[type].name}
                            </p>
                          )}
                          {/* Delete Button */}
                          <button
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              setUploadedFiles((prev) => ({
                                ...prev,
                                [type]: null,
                              }));
                            }}
                          >
                            <AiOutlineClose />
                          </button>
                        </div>
                      ) : (
                        <>
                          <AiOutlinePlus className="w-8 h-8 mb-2" />
                          <p>Add Media</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm sm:text-base mt-3 text-left">
                Supported: mp4, mvm, ovf, lv, vob, m4v, mkv, avi, 3gp, mpg, mxf,
                hls, feed
              </p>
            </>
          )}

          {/* Banner Section */}
          {activeSection === "banner" && (
            <>
              <div className="flex flex-col gap-6">
                {["website", "mobile", "tv"].map((type) => (
                  <div key={type} className="w-full md:w-2/3">
                    <p className="font-semibold">{type.toUpperCase()}</p>
                    <p className="text-xs sm:text-sm mb-1">
                      Resolution: {bannerResolutions[type]}
                    </p>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded p-4 flex items-center justify-center cursor-pointer bg-blue-100 w-full min-h-[220px] relative"
                      onClick={() => {
                        setUploadFor(`banner-${type}`);
                        setUploadCategory("Banner");
                        setShowUploadModal(true);
                      }}
                    >
                      {uploadedFiles.banner[type] ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Show image preview */}
                          <img
                            src={URL.createObjectURL(
                              uploadedFiles.banner[type]
                            )}
                            alt={`banner-${type}`}
                            className="object-contain max-h-full max-w-full"
                          />
                          {/* Delete Button */}
                          <button
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              setUploadedFiles((prev) => ({
                                ...prev,
                                banner: { ...prev.banner, [type]: null },
                              }));
                            }}
                          >
                            <AiOutlineClose />
                          </button>
                        </div>
                      ) : (
                        <>
                          <AiOutlinePlus className="w-8 h-8 mb-2" />
                          <p>Add File</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm sm:text-base mt-3 text-left">
                Supported: JPG, JPEG, PNG, TIFF, SVG, GIF, JFIF, WEBP
              </p>
            </>
          )}

          {/* People Section */}
          {activeSection === "people" && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <select
                  className="border border-gray-300 rounded px-3 py-2 mt-2 sm:mt-5 w-full sm:w-auto"
                  value={personType}
                  onChange={(e) => setPersonType(e.target.value)}
                >
                  <option value="">Select Person Type</option>
                  <option value="new">New Type</option>
                  <option value="actor">Actor</option>
                </select>
                <input
                  type="text"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="Enter Person Name"
                  className="border border-gray-300 rounded px-3 py-2 flex-1 mt-2 sm:mt-5 w-full"
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-2 sm:mt-5 w-full sm:w-auto"
                  onClick={addPerson}
                >
                  Add
                </button>
              </div>
              <div>
                {peopleList.map((p, idx) => (
                  <p key={idx}>
                    {p.type} - {p.name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Addons Section */}
          {activeSection === "add ons" && (
            <div className="space-y-4">
              <p className="font-semibold">
                Add Supportive Media / Files / Links
              </p>

              {/* Add Media Button */}
              <button
                className="flex items-center gap-1 px-3 py-2 bg-blue-100 rounded"
                onClick={() =>
                  setAddonsFiles([
                    ...addonsFiles,
                    { type: "", label: "", file: null },
                  ])
                }
              >
                <AiOutlinePlus /> Add Media
              </button>

              {/* Dynamic Addon Inputs */}
              {addonsFiles.map((addon, index) => (
                <div
                  key={index}
                  className="flex flex-wrap gap-2 items-center border p-3 rounded bg-gray-50"
                >
                  {/* Media Type Dropdown */}
                  <select
                    className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
                    value={addon.type}
                    onChange={(e) => {
                      const newAddons = [...addonsFiles];
                      newAddons[index].type = e.target.value;
                      setAddonsFiles(newAddons);
                    }}
                  >
                    <option value="">Select Media Type</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                    <option value="pdf">PDF</option>
                    <option value="external">External Link</option>
                  </select>

                  {/* Label Name Input */}
                  <input
                    type="text"
                    placeholder="Add Label Name"
                    className="border border-gray-300 rounded px-2 py-1 flex-1 w-full sm:w-auto"
                    value={addon.label}
                    onChange={(e) => {
                      const newAddons = [...addonsFiles];
                      newAddons[index].label = e.target.value;
                      setAddonsFiles(newAddons);
                    }}
                  />

                  {/* Upload Button */}
                  <button
                    className={`px-3 py-1 rounded w-full sm:w-auto ${
                      addon.type && addon.label
                        ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!(addon.type && addon.label)}
                    onClick={() => {
                      setUploadFor(`addon-${index}`);
                      setUploadCategory(addon.type);
                      setShowUploadModal(true);
                    }}
                  >
                    Upload
                  </button>

                  {/* Cancel Button */}
                  <button
                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 w-full sm:w-auto"
                    onClick={() => {
                      const newAddons = [...addonsFiles];
                      newAddons.splice(index, 1);
                      setAddonsFiles(newAddons);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-5 mb-20 justify-end">
          <button
            className="px-6 py-2 border rounded w-full sm:w-auto"
            onClick={saveDraft}
          >
            Save as Draft
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto"
            onClick={savePublish}
          >
            Save & Publish
          </button>
        </div>
      </div>

      {/* FileUploadModal */}
      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title={`Upload File for ${uploadFor}`}
        onUpload={(file) => {
          if (uploadFor.startsWith("poster")) {
            const tab = uploadFor.split("-")[1];
            setUploadedFiles((prev) => ({
              ...prev,
              poster: { ...prev.poster, [tab]: file },
            }));
          } else if (uploadFor === "primaryMedia") {
            setUploadedFiles((prev) => ({ ...prev, primaryMedia: file }));
          } else if (uploadFor === "previewMedia") {
            setUploadedFiles((prev) => ({ ...prev, previewMedia: file }));
          } else if (uploadFor.startsWith("banner")) {
            const type = uploadFor.split("-")[1];
            setUploadedFiles((prev) => ({
              ...prev,
              banner: { ...prev.banner, [type]: file },
            }));
          } else if (uploadFor.startsWith("addon")) {
            const index = parseInt(uploadFor.split("-")[1]);
            const newAddons = [...addonsFiles];
            newAddons[index].file = file;
            setAddonsFiles(newAddons);
          }

          setShowUploadModal(false);
        }}
      />
    </div>
  );
}
