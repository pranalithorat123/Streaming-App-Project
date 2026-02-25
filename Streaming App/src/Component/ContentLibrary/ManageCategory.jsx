import React, { useMemo, useState } from "react";
import { Trash2 as TrashIcon } from "lucide-react";
import { Plus as PlusIcon } from "lucide-react";
// --- Icon Components ---
const IconBase = ({ className, children, onClick, title }) => (
  <span
    className={`inline-flex items-center justify-center ${className}`}
    onClick={onClick}
    title={title}
  >
    {children}
  </span>
);

const ChevronDown = () => (
  <IconBase className="h-5 w-5 text-gray-500">▼</IconBase>
);
const ChevronRight = () => (
  <IconBase className="h-5 w-5 text-gray-500">▶</IconBase>
);
const Plus = ({ className = "h-4 w-4" }) => <PlusIcon className={className} />;
const Trash2 = () => <TrashIcon className="h-5 w-5 text-red-600" />;

// --- Mock Toast Functionality ---
const mockToast = (options) => {
  console.log(
    `[TOAST - ${options.title}]: ${options.description} (Variant: ${
      options.variant || "default"
    })`
  );
};

// --- Mock ContentTabs Component ---
const ContentTabs = () => (
  <div className="border-b border-gray-200 pb-3 mb-6">
    {/* Add actual tabs here if needed */}
  </div>
);

// --- Initial Categories Data ---
const initialCategories = [
  { id: "video", name: "Video", subcategories: ["Movies", "Series"] },
  { id: "audio", name: "Audio", subcategories: ["Podcasts", "Music"] },
];

// --- ManageCategory Component ---
export default function ManageCategory() {
  const [categories, setCategories] = useState(initialCategories);
  const [expandedIds, setExpandedIds] = useState(
    initialCategories.map((item) => item.id)
  );
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [activeSubInput, setActiveSubInput] = useState(null);
  const [subCategoryName, setSubCategoryName] = useState("");

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.name.localeCompare(b.name)),
    [categories]
  );

  const toggleExpanded = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetCategoryForm = () => {
    setAddingCategory(false);
    setNewCategoryName("");
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      mockToast({
        variant: "destructive",
        title: "Category name required",
        description: "Enter a category name to continue.",
      });
      return;
    }

    const id = newCategoryName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    if (categories.some((item) => item.id === id)) {
      mockToast({
        variant: "destructive",
        title: "Duplicate category",
        description: "A category with this name already exists.",
      });
      return;
    }

    const payload = { id, name: newCategoryName.trim(), subcategories: [] };
    setCategories((prev) => [payload, ...prev]);
    setExpandedIds((prev) => [payload.id, ...prev]);

    mockToast({
      title: "Category added",
      description: `${payload.name} created.`,
    });
    resetCategoryForm();
  };

  const handleDeleteCategory = (id) => {
    const category = categories.find((item) => item.id === id);
    setCategories((prev) => prev.filter((item) => item.id !== id));
    setExpandedIds((prev) => prev.filter((item) => item !== id));
    mockToast({
      title: "Category deleted",
      description: category ? `${category.name} removed.` : "Category removed.",
    });
  };

  const handleStartAddSub = (id) => {
    setActiveSubInput(id);
    setSubCategoryName("");
    if (!expandedIds.includes(id)) setExpandedIds((prev) => [...prev, id]);
  };

  const handleAddSubcategory = () => {
    if (!activeSubInput) return;
    if (!subCategoryName.trim()) {
      mockToast({
        variant: "destructive",
        title: "Subcategory name required",
        description: "Enter a subcategory name to continue.",
      });
      return;
    }
    setCategories((prev) =>
      prev.map((item) =>
        item.id === activeSubInput
          ? {
              ...item,
              subcategories: [...item.subcategories, subCategoryName.trim()],
            }
          : item
      )
    );
    mockToast({
      title: "Subcategory added",
      description: `${subCategoryName.trim()} added to category.`,
    });
    setActiveSubInput(null);
    setSubCategoryName("");
  };

  const handleDeleteSubcategory = (categoryId, name) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === categoryId
          ? {
              ...item,
              subcategories: item.subcategories.filter((sub) => sub !== name),
            }
          : item
      )
    );
    mockToast({
      title: "Subcategory removed",
      description: `${name} removed from category.`,
    });
  };

  // --- Base Styles ---
  const btnPrimary =
    "px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  const btnOutline =
    "px-4 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400";
  const btnGhostIcon =
    "p-2 rounded-full hover:bg-gray-100 transition-colors duration-150";
  const btnTextDestructive =
    "px-2 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors text-sm";
  const inputStyle =
    "p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 shadow-sm";

  return (
    <div className="w-full max-w-full mx-auto pt-2 sm:pt-2 px-4 sm:px-6 space-y-6">
      <div className="w-full rounded-lg bg-white shadow-xl -mt-4">
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 pt-0">
              Category Listing
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {addingCategory ? (
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  autoFocus
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className={`${inputStyle} w-56`}
                />
                <button className={btnPrimary} onClick={handleAddCategory}>
                  Add
                </button>
                <button className={btnOutline} onClick={resetCategoryForm}>
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className={`${btnPrimary} flex items-center gap-2`}
                onClick={() => setAddingCategory(true)}
              >
                <Plus /> Add Category
              </button>
            )}
          </div>
        </div>

        {/* Category List */}
        <div className="space-y-4 p-6">
          {sortedCategories.map((category) => {
            const expanded = expandedIds.includes(category.id);
            const isAddingSub = activeSubInput === category.id;

            return (
              <div
                key={category.id}
                className="w-full rounded-lg border border-gray-200 shadow-sm"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between px-4 py-3 cursor-pointer">
                  <button
                    type="button"
                    className="flex flex-1 items-center gap-2 text-left bg-transparent p-0 border-none"
                    onClick={() => toggleExpanded(category.id)}
                  >
                    {expanded ? <ChevronDown /> : <ChevronRight />}
                    <span className="text-base font-medium text-gray-900">
                      {category.name}
                    </span>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      className={btnGhostIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartAddSub(category.id);
                      }}
                      title="Add subcategory"
                    >
                      <Plus className="h-5 w-5 text-gray-500" />
                    </button>
                    <button
                      className={`${btnGhostIcon} hover:bg-red-50`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category.id);
                      }}
                      title="Delete category"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>

                {/* Subcategories */}
                {expanded && (
                  <div className="space-y-2 border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-6">
                    {category.subcategories.length === 0 && !isAddingSub && (
                      <p className="text-sm text-gray-500">
                        No subcategories added yet.
                      </p>
                    )}

                    {category.subcategories.map((sub) => (
                      <div
                        key={sub}
                        className="flex items-center justify-between rounded-md bg-white px-3 py-2 border border-gray-100 shadow-sm"
                      >
                        <span className="text-sm text-gray-800">{sub}</span>
                        <button
                          className={btnTextDestructive}
                          onClick={() =>
                            handleDeleteSubcategory(category.id, sub)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    ))}

                    {isAddingSub ? (
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <input
                          type="text"
                          autoFocus
                          value={subCategoryName}
                          onChange={(e) => setSubCategoryName(e.target.value)}
                          placeholder="Enter subcategory name"
                          className={`${inputStyle} w-full sm:w-64`}
                        />
                        <button
                          className={btnPrimary}
                          onClick={handleAddSubcategory}
                        >
                          Add
                        </button>
                        <button
                          className={btnOutline}
                          onClick={() => setActiveSubInput(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className={`${btnOutline} flex items-center gap-2 mt-2`}
                        onClick={() => handleStartAddSub(category.id)}
                      >
                        <Plus className="h-4 w-4" /> Add Subcategory
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Empty State */}
          {sortedCategories.length === 0 && (
            <div className="rounded-md border-2 border-dashed border-gray-300 px-4 py-10 text-center text-sm text-gray-500">
              No categories found. Create a category to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
