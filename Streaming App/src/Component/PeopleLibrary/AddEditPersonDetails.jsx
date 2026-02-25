import React, { useState, useEffect } from "react";

export default function AddEditPersonModal({ person, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (person) setFormData(person);
  }, [person]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () =>
          setFormData((prev) => ({ ...prev, image: reader.result }));
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    // if (!formData.bio.trim()) newErrors.bio = "Bio is required";
    if (!formData.image) newErrors.image = "Profile picture is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded shadow"
    >
      {/* Profile Picture */}
      <div className="mb-6 flex items-center">
        <label className="w-36 text-gray-700 font-semibold">
          Profile Picture<span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-md w-[180px] h-[180px] flex items-center justify-center cursor-pointer relative overflow-hidden">
          {formData.image ? (
            <img
              src={formData.image}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <label className="flex flex-col items-center cursor-pointer">
              <span className="text-gray-500">Add file</span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
      {errors.image && (
        <p className="text-red-500 text-sm ml-36 mb-2">{errors.image}</p>
      )}
      <p className="text-sm text-gray-400 ml-36 mb-4 font-semibold">
        Resolution: (252x300) px
      </p>

      {/* Name */}
      <div className="mb-4 flex items-center">
        <label className="w-36 text-gray-700 font-semibold">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="flex-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter person name"
        />
      </div>
      {errors.name && (
        <p className="text-red-500 text-sm ml-36 mb-2">{errors.name}</p>
      )}

      {/* Bio */}
      <div className="mb-4 flex items-start">
        <label className="w-36 text-gray-700 mt-2 font-semibold">Bio</label>
        <textarea
          name="bio"
          rows="4"
          value={formData.bio}
          onChange={handleChange}
          className="flex-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Type here"
        />
      </div>
      {errors.bio && (
        <p className="text-red-500 text-sm ml-36 mb-2">{errors.bio}</p>
      )}

      {/* Buttons */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded mr-2 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
