import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

export default function PlaylistLibraryLayout() {
  const navigate = useNavigate();

  const handleAddPlaylist = () => {
    navigate("add-playlist");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Container with shadow */}
      <div className="max-w-7xl h-[500px] mx-auto bg-white shadow-md rounded-lg p-6 mt-5">
        <div className="text-center mb-4 mt-10">
          <p className="text-gray-700 text-lg mb-4">
            No playlist found.
            <br /> Start adding playlists to your store.
          </p>
          <button
            onClick={handleAddPlaylist}
            className="flex items-center justify-center gap-2 mx-auto bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition-colors"
          >
            <AiOutlinePlus className="w-5 h-5" /> Add Playlist
          </button>
        </div>
      </div>
    </div>
  );
}
