import React from "react";

const Modal = ({ isOpen, onClose, title, children, width = "600px" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000] bg-[rgba(0,0,0,0.4)] flex items-center justify-center p-4 z-50">
      <div
        className={`bg-white rounded-[13px] w-[${width}] max-lg:w-full max-h-[90vh] overflow-y-auto overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
      >
        <header className="p-6 max-lg:p-4 border-b-[0.8px] border-[#E9ECEF] flex justify-between items-center">
          <h2 className="text-[24px] max-lg:text-[20px] font-semibold text-[#1E293B]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-[24px] text-[#64748B] cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </header>
        <div className="p-6 max-lg:p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
