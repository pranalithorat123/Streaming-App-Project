import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddSection({
  formData,
  setFormData,
  handleSave,
  onCancel,
}) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      sectionName: "",
      sectionType: "Manual",
      contentType: "Select",
      content: "",
      criteria: "Select",
      category: "",
      contentLimit: "",
      poster: "",
      algorithm: "",
    });
    setErrors({});
    if (onCancel) onCancel();
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.sectionName)
      newErrors.sectionName = "Section Name is required";
    if (!formData.sectionType)
      newErrors.sectionType = "Section Type is required";
    if (!formData.contentType || formData.contentType === "Select")
      newErrors.contentType = "Content Type is required";
    if (!formData.content) newErrors.content = "Content is required";

    if (formData.sectionType === "Automatic") {
      if (!formData.criteria || formData.criteria === "Select")
        newErrors.criteria = "Criteria is required";

      switch (formData.criteria) {
        case "Recently Added":
          if (!formData.poster) newErrors.poster = "Poster level is required";
          if (!formData.contentLimit)
            newErrors.contentLimit = "Content Limit is required";
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

  const onSaveClick = () => {
    if (validate()) {
      handleSave(formData);
      toast.success("Section added successfully!");
      resetForm();
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
          name="sectionName"
          value={formData.sectionName}
          onChange={handleChange}
          placeholder="Enter section name"
          className={fieldClass}
        />
      </div>
      {errors.sectionName && (
        <p className="text-red-500 text-sm">{errors.sectionName}</p>
      )}

      {/* Section Type */}
      <div className="flex items-center gap-4">
        <label className="w-1/3 font-medium text-gray-700">
          Section Type <span className="text-red-600">*</span>
        </label>
        <select
          name="sectionType"
          value={formData.sectionType}
          onChange={handleChange}
          className={fieldClass}
        >
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
      </div>
      {errors.sectionType && (
        <p className="text-red-500 text-sm">{errors.sectionType}</p>
      )}

      {/* Content Type */}
      <div className="flex items-center gap-4">
        <label className="w-1/3 font-medium text-gray-700">
          Content Type <span className="text-red-600">*</span>
        </label>
        <select
          name="contentType"
          value={formData.contentType}
          onChange={handleChange}
          className={fieldClass}
        >
          <option value="Select">Select</option>
          <option value="Video">Video</option>
          <option value="Audio">Audio</option>
        </select>
      </div>
      {errors.contentType && (
        <p className="text-red-500 text-sm">{errors.contentType}</p>
      )}

      {/* Content Field (common) */}
      <div className="flex items-center gap-4">
        <label className="w-1/3 font-medium text-gray-700">
          Content <span className="text-red-600">*</span>
        </label>
        <input
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Enter content"
          className={fieldClass}
        />
      </div>
      {errors.content && (
        <p className="text-red-500 text-sm">{errors.content}</p>
      )}

      {/* Automatic Fields */}
      {formData.sectionType === "Automatic" && (
        <>
          {/* Criteria */}
          <div className="flex items-center gap-4">
            <label className="w-1/3 font-medium text-gray-700">
              Criteria <span className="text-red-600">*</span>
            </label>
            <select
              name="criteria"
              value={formData.criteria}
              onChange={handleChange}
              className={fieldClass}
            >
              <option value="Select">Select</option>
              <option value="Recently Added">Recently Added</option>
              <option value="Recently Published">Recently Published</option>
              <option value="Recently Watched">Recently Watched</option>
              <option value="Ally Recommended">Ally Recommended</option>
            </select>
          </div>
          {errors.criteria && (
            <p className="text-red-500 text-sm">{errors.criteria}</p>
          )}

          {/* Dynamic Fields based on Criteria */}
          {formData.criteria === "Recently Added" && (
            <>
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
              <div className="flex items-center gap-4">
                <label className="w-1/3 font-medium text-gray-700">
                  Content Limit <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="contentLimit"
                  value={formData.contentLimit || ""}
                  onChange={handleChange}
                  placeholder="Enter content limit"
                  className={fieldClass}
                />
                {errors.contentLimit && (
                  <p className="text-red-500 text-sm">{errors.contentLimit}</p>
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
                  name="category"
                  value={formData.category || ""}
                  onChange={handleChange}
                  placeholder="Enter category"
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
                  placeholder="Enter content limit"
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
                placeholder="Enter content limit"
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
                  placeholder="Enter content limit"
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
      <div className="flex justify-end pt-4 border-t border-gray-200 gap-3">
        <button
          onClick={resetForm}
          className="px-5 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={onSaveClick}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
