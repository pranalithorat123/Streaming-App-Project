import React, { useState, useEffect } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import Modal from "../../common/Model";
import { toast } from "react-toastify";

export default function FileUploadModal({
  isOpen,
  onClose,
  title = "Upload File",
  onUpload,
}) {
  const [selectedFile, setSelectedFile] = useState(null);

  // Reset selected file whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedFile(null);
    }
  }, [isOpen]);

  const handleUpload = () => {
    if (selectedFile) {
      if (onUpload) onUpload(selectedFile);
      toast.success(`File "${selectedFile.name}" uploaded successfully`);
      onClose();
    } else {
      toast.error("Please select a file!");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width="600px">
      <div className="space-y-6">
        {/* Upload From Computer */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Upload from Computer
          </label>
          <div
            className="border-2 border-dashed border-gray-300 rounded p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <AiOutlineUpload className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-gray-500">
              {selectedFile
                ? selectedFile.name
                : "Browse or drag and drop your file here"}
            </p>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="hidden"
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Supported files: mp3, wav, aac, aiwf, m4a, m4b, m4p, dvf, raw, wma,
            webm, flac, ogg, peg
          </p>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-600">
          By uploading, you confirm you own the rights to this content.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </div>
    </Modal>
  );
}
