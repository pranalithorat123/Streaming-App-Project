import React, { useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineFilter,
  AiOutlineReload,
} from "react-icons/ai";
import { Edit, Trash2 } from "react-feather"; 

import Modal from "../../common/Model";
import AddEditPersonModal from "./AddEditPersonDetails";

export default function PeopleLibrary() {
  const [people, setPeople] = useState([
    {
      id: 1,
      name: "Elizabeth Brooks",
      bio: "Lorem ipsum dolor sit amet, novum nonumy soluta cum at, nam no munere deleniti.",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=300&h=300&fit=crop",
      createdAt: "2024-10-01",
    },
    {
      id: 2,
      name: "Michael Shaw",
      bio: "Lorem ipsum dolor sit amet, novum nonumy soluta cum at, nam no munere deleniti.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
      createdAt: "2023-08-15",
    },
    {
      id: 3,
      name: "Ava Johnson",
      bio: "Creative content producer specializing in digital media and design.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
      createdAt: "2025-02-20",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPerson, setEditPerson] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("A to Z");

  //  Add new person
  const handleAddPerson = (newPerson) => {
    setPeople([
      ...people,
      { ...newPerson, id: Date.now(), createdAt: new Date().toISOString() },
    ]);
    setIsModalOpen(false);
  };

  //  Edit existing person
  const handleEditPerson = (updatedPerson) => {
    setPeople(
      people.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
    );
    setEditPerson(null);
  };

  //  Delete person
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      setPeople(people.filter((p) => p.id !== id));
    }
  };

  //  Filter & Sort logic
  const filteredPeople = people
    .filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
    .sort((a, b) => {
      if (sortBy === "A to Z") return a.name.localeCompare(b.name);
      if (sortBy === "Z to A") return b.name.localeCompare(a.name);
      if (sortBy === "New to Old")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "Old to New")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  const resetFilters = () => {
    setSortBy("A to Z");
    setShowFilters(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/*  Search + Filter + Add */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search Person"
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

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            <AiOutlinePlus /> Add Person
          </button>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="mb-6 bg-blue-50 p-4 rounded flex flex-wrap items-center gap-4 relative">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-48 p-2 border border-gray-300 rounded text-sm bg-white"
            >
              <option value="A to Z">A to Z</option>
              <option value="Z to A">Z to A</option>
              <option value="New to Old">New to Old</option>
              <option value="Old to New">Old to New</option>
            </select>
          </div>

          <div className="flex gap-3 items-end ml-auto">
            <button
              onClick={() => setShowFilters(false)}
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

      {/*  People Table */}
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left py-3 px-4">Person Name</th>
            <th className="text-left py-3 px-4">Bio</th>
            <th className="text-right py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPeople.length > 0 ? (
            filteredPeople.map((person) => (
              <tr key={person.id} className="border border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4 flex items-center gap-3">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <span className="font-medium text-gray-800">
                    {person.name}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {person.bio.length > 80
                    ? person.bio.slice(0, 80) + "..."
                    : person.bio}
                </td>
                <td className="py-4 px-4 text-right">
                  <button
                    className="text-blue-600 hover:text-blue-800 mr-3"
                    onClick={() => setEditPerson(person)}
                  >
                    <Edit size={18} /> {/* ✅ Updated icon */}
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(person.id)}
                  >
                    <Trash2 size={18} /> {/* ✅ Updated icon */}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-6 text-gray-500">
                No people found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Person Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Person"
          width="600px"
        >
          <AddEditPersonModal
            onSave={handleAddPerson}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}

      {/* Edit Person Modal */}
      {editPerson && (
        <Modal
          isOpen={!!editPerson}
          onClose={() => setEditPerson(null)}
          title="Edit Person"
          width="600px"
        >
          <AddEditPersonModal
            person={editPerson}
            onSave={handleEditPerson}
            onClose={() => setEditPerson(null)}
          />
        </Modal>
      )}
    </div>
  );
}
