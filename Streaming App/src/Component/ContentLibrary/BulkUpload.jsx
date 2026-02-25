import React, { useRef, useState } from "react";
import {
  AiOutlineUpload,
  AiOutlineDownload,
  AiOutlineExport,
} from "react-icons/ai";
export default function BulkUpload() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);

  const handleDownload = (type) => {
    let fileUrl = "";
    let fileName = "";

    if (type === "fresh") {
      fileUrl = "/sample_fresh_upload.csv";
      fileName = "fresh_upload_template.csv";
    } else {
      fileUrl = "/sample_bulk_edit.csv";
      fileName = "bulk_edit_export.csv";
    }

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`File "${fileName}" download started.`);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setFileName(null);
      return;
    }
    setFileName(file.name);
    alert(`File "${file.name}" uploaded successfully.`);
  };

  const handleLearnMore = () => {
    alert("Refer to the bulk upload guide for step-by-step instructions.");
  };

  // --- Basic Icon Components (SVGs) ---
  const UploadCloud = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 15a4 4 0 014-4h1m4 0h1a4 4 0 014 4v5H3v-5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v12m0 0l3-3m-3 3l-3-3"
      />
    </svg>
  );

  const FileUp = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8M12 4v8m0 0l-3-3m3 3l3-3"
      />
    </svg>
  );

  const FileDown = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v12a2 2 0 002 2h12a2 2 0 002-2V4M12 12v8m0-8l-3 3m3-3l3 3"
      />
    </svg>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6 pt-0 shadow-lg">
      <div className="rounded-lg  bg-white  mt-0 p-6 space-y-8">
        <header className="space-y-2">
          <h2 className="text-2xl font-semibold">Upload Bulk Contents</h2>
        </header>

        {/* Download Section */}
        <section className="space-y-4">
          <h3 className="text-base font-semibold">Download Sample File</h3>
          <p className="text-base text-gray-600">
            We recommend to upload your audio/video/image files in our asset
            library first and then map against the content metadata for a better
            import experience.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Fresh Upload */}
            <article className="flex flex-col items-center justify-between gap-4 p-6 border border-dashed rounded-xl text-center shadow-sm bg-gray-50">
              <div className="flex flex-col items-center gap-2">
                
                <h4 className="font-semibold">Fresh Upload</h4>
                <p className="text-sm text-gray-500">Download sample file</p>
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                onClick={() => handleDownload("fresh")}
              >
                <AiOutlineDownload className="h-4 w-4" />
                Download
              </button>
            </article>

            {/* Bulk Edit */}
            <article className="flex flex-col items-center justify-between gap-4 p-6 border border-dashed rounded-xl text-center shadow-sm bg-gray-50">
              <div className="flex flex-col items-center gap-2">
               
                <h4 className="font-semibold">Bulk Edit</h4>
                <p className="text-sm text-gray-500">
                  Export existing metadata
                </p>
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                onClick={() => handleDownload("bulk")}
              >
                <AiOutlineExport className="h-4 w-4" />
                Export
              </button>
            </article>
          </div>
        </section>

        <section className="space-y-4 text-center p-6 border border-dashed rounded-xl bg-gray-50 shadow-sm">
          <h3 className="text-base font-semibold">
            Upload the Filled Template
          </h3>
          <p className="text-sm text-gray-500">
            Track the upload status from the bulk import status report after
            uploading the completed template.
          </p>

          <div className="flex justify-center">
            <button
              className="px-6 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-md"
              onClick={handleUploadClick}
            >
              <AiOutlineUpload className="h-5 w-5" /> Upload File
            </button>
          </div>

          {fileName && (
            <p className="text-xs text-gray-500 mt-2">
              Selected file: <span className="font-medium">{fileName}</span>
            </p>
          )}

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </section>
      </div>
    </div>
  );
}
