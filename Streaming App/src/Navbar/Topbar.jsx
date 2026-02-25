import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineQuestionCircle,
  AiOutlineLink,
  AiOutlineDown,
  AiOutlineMenu,
} from "react-icons/ai";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userName = "Pranali Thorat";

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* trial banner */}
      <div className="w-full bg-blue-200">
        <div className="px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-10 text-center sm:text-left">
          <div className="text-blue-700 font-semibold text-sm sm:text-base">
            Your free trial will expire in 8 days. Please purchase a
            subscription to activate account.
          </div>
          <button
            className="rounded-md bg-blue-500 text-white px-3 py-1.5 text-sm sm:text-base shadow hover:bg-blue-600 transition-colors"
            onClick={() => navigate("billing/purchase-subscription")}
          >
            Purchase Subscription
          </button>
        </div>
      </div>

      {/* topbar */}
      <div className="px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-end gap-2 sm:gap-5 bg-white shadow">
        {/* Removed breadcrumbs */}

        {/* right menu */}
        <div className="flex items-center gap-2 sm:gap-5">
          {/* Mobile menu button */}
          <button
            className="sm:hidden p-1 rounded-md hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <AiOutlineMenu className="h-6 w-6 text-gray-700" />
          </button>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-5">
            <Link
              to="/help"
              className="flex items-center gap-2 text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors"
            >
              <AiOutlineQuestionCircle className="h-4 w-4 sm:h-5 sm:w-5" /> Help
              Center
            </Link>
            <a
              href="/visit"
              className="flex items-center gap-2 text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors"
            >
              <AiOutlineLink className="h-4 w-4 sm:h-5 sm:w-5" /> Visit Website
            </a>
          </div>

          {/* user dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 text-sm sm:text-base"
            >
              <div className="h-8 w-8 rounded-full bg-blue-200 grid place-items-center text-blue-700 font-semibold">
                {userName.charAt(0)}
              </div>
              <span className="hidden sm:block truncate max-w-[100px]">
                {userName}
              </span>
              <AiOutlineDown
                className={`h-4 w-4 transition-transform ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg overflow-hidden z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-base hover:bg-blue-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/billing"
                  className="block px-4 py-2  text-base hover:bg-blue-100"
                >
                  My Account
                </Link>
                <Link
                  to="/dev-center"
                  className="block px-4 py-2  text-base hover:bg-blue-100"
                >
                  Dev Center
                </Link>
                <button className="w-full text-left px-4 py-2  text-base hover:bg-blue-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg w-full px-4 py-2 space-y-2">
          <Link
            to="/help"
            className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Help Center
          </Link>
          <a
            href="/visit"
            className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Visit Website
          </a>
        </div>
      )}
    </div>
  );
}
