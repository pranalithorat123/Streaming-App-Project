import React, { useState } from "react";
import { AiOutlineFilter, AiOutlineReload } from "react-icons/ai";
import { Edit, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import Modal from "../../common/Model";
import AddSection from "./AddSections";
import EditSectionForm from "./EditSections";

const FeaturedSections = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("New-Old");
  const [expandedId, setExpandedId] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  const [sections, setSections] = useState([
    {
      id: 1,
      sectionName: "Latest Videos",
      sectionType: "Automatic",
      criteria: "Recently Added",
      algorithm: "Most Viewed",
      category: "Video",
      contentType: "Video",
      contentLimit: 10,
    },
    {
      id: 2,
      sectionName: "Latest Audios",
      sectionType: "Automatic",
      criteria: "Top Rated",
      algorithm: "Most Viewed",
      category: "Audio",
      contentType: "Audio",
      contentLimit: 8,
    },
    {
      id: 3,
      sectionName: "Audio Upload",
      sectionType: "Manual",
      contentType: "Audio",
    },
  ]);

  const [formData, setFormData] = useState({
    sectionName: "",
    sectionType: "Manual",
    criteria: "Select",
    algorithm: "Select",
    category: "",
    contentType: "Select",
    contentLimit: "",
  });

  const [errors, setErrors] = useState({});

  // Sort Options
  const sortOptions = ["New-Old", "Old-New", "A-Z", "Z-A"];

  // Apply Sorting
  const handleApply = () => {
    let sorted = [...sections];
    if (sortBy === "A-Z")
      sorted.sort((a, b) => a.sectionName.localeCompare(b.sectionName));
    if (sortBy === "Z-A")
      sorted.sort((a, b) => b.sectionName.localeCompare(a.sectionName));
    if (sortBy === "Old-New") sorted = [...sections].reverse();
    setSections(sorted);
  };

  // Reset Filters
  const handleReset = () => {
    setFilterType("All");
    setSortBy("New-Old");
  };

  // Expand/Collapse Section
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Delete Section with confirmation
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Confirming this action will delete this featured section here and it will be removed from store. Do you want to proceed ?"
    );
    if (confirmDelete) {
      setSections(sections.filter((sec) => sec.id !== id));
    }
  };

  // Handle Add/Edit Save
  const handleSave = (data, isEdit = false) => {
    if (isEdit) {
      setSections(
        sections.map((sec) =>
          sec.id === editingSection.id ? { ...sec, ...data } : sec
        )
      );
      setIsEditModalOpen(false);
      setEditingSection(null);
    } else {
      setSections([...sections, { id: Date.now(), ...data }]);
      setIsAddModalOpen(false);
    }
    setFormData({
      sectionName: "",
      sectionType: "Manual",
      criteria: "Select",
      algorithm: "Select",
      category: "",
      contentType: "Select",
      contentLimit: "",
    });
    setErrors({});
  };

  // Open Edit Modal
  const handleEdit = (section) => {
    setEditingSection(section);
    setFormData(section);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b pb-3">
        <h2 className="text-2xl font-semibold text-gray-800">
          Featured Sections
        </h2>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap justify-end items-center gap-3 mb-4">
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Section"
            className="px-3 py-2 border border-gray-300 rounded-lg w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-sm"
          />
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center justify-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-sm"
          >
            <AiOutlineFilter size={18} /> Filter
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            + Add Section
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilter && (
        <div className="bg-white border border-gray-200 shadow-md rounded-xl p-4 mb-5">
          <div className="flex flex-wrap items-end gap-10 bg-blue-100 p-5 rounded-lg">
            <div className="flex flex-col">
              <label className="text-base font-semibold text-gray-700 mb-1">
                Section Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option>All</option>
                <option>Manual</option>
                <option>Automatic</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-base font-semibold text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                {sortOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={handleApply}
                className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-sm transition"
              >
                Apply
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                <AiOutlineReload className="text-gray-700" size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section List */}
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-5">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border border-gray-100 rounded-xl mb-4 shadow-sm hover:shadow-md transition bg-white"
          >
            {/* Top Row */}
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                <h3 className="font-semibold text-gray-900 text-lg">
                  {section.sectionName}
                </h3>
                <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                  {section.sectionType}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => handleEdit(section)}
                  className="flex items-center justify-center text-blue-600 hover:text-blue-800 w-9 h-9 rounded-full hover:bg-blue-50 transition"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(section.id)}
                  className="flex items-center justify-center text-red-600 hover:text-red-800 w-9 h-9 rounded-full hover:bg-red-50 transition"
                >
                  <Trash2 size={20} />
                </button>
                <button
                  onClick={() => toggleExpand(section.id)}
                  className="flex items-center justify-center text-gray-600 hover:text-blue-700 w-9 h-9 rounded-full hover:bg-gray-100 transition"
                >
                  {expandedId === section.id ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === section.id && (
              <div className="border-t border-gray-200 bg-gray-50 p-5 rounded-b-xl text-gray-700">
                <h4 className="font-semibold text-lg mb-4">
                  Auto Generated Featured Section
                </h4>

                <div className="grid grid-cols-2 divide-x divide-gray-300 border border-gray-300 rounded-lg">
                  {/* Left Column */}
                  <div className="flex flex-col border-b border-gray-300 p-4 gap-2">
                    <div>
                      <span className="font-semibold">Criteria: </span>
                      {section.criteria || "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Category: </span>
                      {section.category || "-"}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col border-b border-gray-300 p-4 gap-2">
                    <div>
                      <span className="font-semibold">Content Types: </span>
                      {section.contentType || "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Content Limit: </span>
                      {section.contentLimit || "-"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Section Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Section"
        width="650px"
      >
        <AddSection
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          handleSave={(data) => handleSave(data, false)}
        />
      </Modal>

      {/* Edit Section Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Section"
        width="650px"
      >
        <EditSectionForm
          section={editingSection}
          onSave={(data) => handleSave(data, true)}
          onClose={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default FeaturedSections;
