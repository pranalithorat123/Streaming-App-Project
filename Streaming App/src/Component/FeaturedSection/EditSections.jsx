import React, { useState } from "react";
import { toast } from "react-toastify";

const EditSectionForm = ({ section, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...section });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.sectionName)
      newErrors.sectionName = "Section Name is required";
    if (!formData.contentType)
      newErrors.contentType = "Content Type is required";

    if (formData.sectionType === "Automatic") {
      if (!formData.criteria || formData.criteria === "Select")
        newErrors.criteria = "Criteria is required";

      switch (formData.criteria) {
        case "Recently Added":
          if (!formData.contentLimit)
            newErrors.contentLimit = "Content Limit is required";
          if (!formData.poster) newErrors.poster = "Poster Level is required";
          break;
        case "Recently Published":
          if (!formData.category) newErrors.category = "Category is required";
          if (!formData.contentLimit)
            newErrors.contentLimit = "Content Limit is required";
          break;
        case "Recently Watched":
          if (!formData.contentLimit)
            newErrors.contentLimit = "Content Limit is required";
          break;
        case "Ally Recommended":
          if (!formData.algorithm || formData.algorithm === "Select")
            newErrors.algorithm = "Algorithm is required";
          if (!formData.contentLimit)
            newErrors.contentLimit = "Content Limit is required";
          break;
        default:
          break;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = () => {
    if (validate()) {
      onSave(formData);
      toast.success("Section updated successfully!");
    } else {
      toast.error("Please fill all required fields!");
    }
  };

  const fieldClass =
    "w-2/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200";

  return (
    <div className="space-y-4">
      {/* Section Name */}
      <div className="flex items-center gap-4">
        <label className="w-1/3 font-medium text-gray-700">
          Section Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="sectionName"
          value={formData.sectionName}
          onChange={handleChange}
          className={fieldClass}
        />
      </div>
      {errors.sectionName && (
        <p className="text-red-500 text-sm">{errors.sectionName}</p>
      )}

      {/* Section Type (disabled) */}
      <div className="flex items-center gap-4">
        <label className="w-1/3 font-medium text-gray-700">
          Section Type <span className="text-red-600">*</span>
        </label>
        <select
          name="sectionType"
          value={formData.sectionType}
          disabled
          className="text-gray-500 w-2/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option>Manual</option>
          <option>Automatic</option>
        </select>
      </div>

      {/* Content Type (disabled) */}
      <div className="flex items-center gap-4">
        <label className="w-1/3 font-medium text-gray-700">
          Content Type <span className="text-red-600">*</span>
        </label>
        <select
          name="contentType"
          value={formData.contentType}
          disabled
          className="text-gray-500 w-2/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">Select</option>
          <option value="Video">Video</option>
          <option value="Audio">Audio</option>
        </select>
      </div>
      {errors.contentType && (
        <p className="text-red-500 text-sm">{errors.contentType}</p>
      )}

      {/* Add Content */}
      <div className="flex items-center gap-4">
        <label className="w-1/3 font-medium text-gray-700">Add Content</label>
        <input
          type="text"
          name="content"
          value={formData.content || ""}
          onChange={handleChange}
          className={fieldClass}
          placeholder="Enter content"
        />
      </div>

      {/* Automatic Fields */}
      {formData.sectionType === "Automatic" && (
        <>
          <div className="flex items-center gap-4">
            <label className="w-1/3 font-medium text-gray-700">
              Criteria <span className="text-red-600">*</span>
            </label>
            <select
              name="criteria"
              value={formData.criteria || ""}
              onChange={handleChange}
              className={fieldClass}
            >
              <option value="">Select</option>
              <option value="Recently Added">Recently Added</option>
              <option value="Recently Published">Recently Published</option>
              <option value="Recently Watched">Recently Watched</option>
              <option value="Ally Recommended">Ally Recommended</option>
            </select>
          </div>
          {errors.criteria && (
            <p className="text-red-500 text-sm">{errors.criteria}</p>
          )}

          {/* Dynamic Fields */}
          {formData.criteria === "Recently Added" && (
            <>
              <div className="flex items-center gap-4">
                <label className="w-1/3 font-medium text-gray-700">
                  Content Limit <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="contentLimit"
                  value={formData.contentLimit || ""}
                  onChange={handleChange}
                  className={fieldClass}
                />
                {errors.contentLimit && (
                  <p className="text-red-500 text-sm">{errors.contentLimit}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <label className="w-1/3 font-medium text-gray-700">
                  Poster Level <span className="text-red-600">*</span>
                </label>
                <select
                  name="poster"
                  value={formData.poster || ""}
                  onChange={handleChange}
                  className={fieldClass}
                >
                  <option value="">Select Level</option>
                  <option value="Level 0">Level 0</option>
                  <option value="Level 1">Level 1</option>
                  <option value="Level 2">Level 2</option>
                </select>
                {errors.poster && (
                  <p className="text-red-500 text-sm">{errors.poster}</p>
                )}
              </div>
            </>
          )}

          {formData.criteria === "Recently Published" && (
            <>
              <div className="flex items-center gap-4">
                <label className="w-1/3 font-medium text-gray-700">
                  Category <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category || ""}
                  onChange={handleChange}
                  className={fieldClass}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <label className="w-1/3 font-medium text-gray-700">
                  Content Limit <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="contentLimit"
                  value={formData.contentLimit || ""}
                  onChange={handleChange}
                  className={fieldClass}
                />
                {errors.contentLimit && (
                  <p className="text-red-500 text-sm">{errors.contentLimit}</p>
                )}
              </div>
            </>
          )}

          {formData.criteria === "Recently Watched" && (
            <div className="flex items-center gap-4">
              <label className="w-1/3 font-medium text-gray-700">
                Content Limit <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="contentLimit"
                value={formData.contentLimit || ""}
                onChange={handleChange}
                className={fieldClass}
              />
              {errors.contentLimit && (
                <p className="text-red-500 text-sm">{errors.contentLimit}</p>
              )}
            </div>
          )}

          {formData.criteria === "Ally Recommended" && (
            <>
              <div className="flex items-center gap-4">
                <label className="w-1/3 font-medium text-gray-700">
                  Algorithm <span className="text-red-600">*</span>
                </label>
                <select
                  name="algorithm"
                  value={formData.algorithm || ""}
                  onChange={handleChange}
                  className={fieldClass}
                >
                  <option value="">Select Algorithm</option>
                  <option value="Most Viewed">Most Viewed</option>
                  <option value="Most Purchased">Most Purchased</option>
                  <option value="Recently Added">Recently Added</option>
                  <option value="Other User Choice">Other User Choice</option>
                </select>
                {errors.algorithm && (
                  <p className="text-red-500 text-sm">{errors.algorithm}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <label className="w-1/3 font-medium text-gray-700">
                  Content Limit <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="contentLimit"
                  value={formData.contentLimit || ""}
                  onChange={handleChange}
                  className={fieldClass}
                />
                {errors.contentLimit && (
                  <p className="text-red-500 text-sm">{errors.contentLimit}</p>
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveClick}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditSectionForm;
