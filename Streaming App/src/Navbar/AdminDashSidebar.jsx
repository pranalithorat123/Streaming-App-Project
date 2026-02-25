import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FileCheck2,
  FileType,
  Folder,
  FileText,
  Briefcase,
  ScrollText,
  Menu,
  X,
  Settings,
  LogOut,
  FilePlus,
  Users,
  Database,
  Mail,
  BarChart3,
  ClipboardList,
  BookOpen,
} from "lucide-react";

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Clients", icon: <Database size={20} />, path: "/admin/dms" },
    {
      name: "Create Task",
      icon: <FilePlus size={20} />,
      path: "/admin/create-task",
    },
    {
      name: "Task List",
      icon: <FileText size={20} />,
      path: "/admin/tasklist",
    },
    {
      name: "Client List",
      icon: <Users size={20} />,
      path: "/admin/clientlist",
    },
    {
      name: "Consent Master",
      icon: <FileCheck2 size={20} />,
      path: "/admin/consent-master",
    },
    {
      name: "Document Type Master",
      icon: <FileType size={20} />,
      path: "/admin/document-type-master",
    },
    {
      name: "Document Name Master",
      icon: <FileText size={20} />,
      path: "/admin/document-list",
    },
    {
      name: "Service Master",
      icon: <Briefcase size={20} />,
      path: "/admin/service-master",
    },
    {
      name: "Customer Type Master",
      icon: <ClipboardList size={20} />,
      path: "/admin/customer-type-master",
    },

    {
      name: "File Management",
      icon: <Folder size={20} />,
      path: "/admin/file-management",
    },
    {
      name: "Terms & Conditions",
      icon: <BookOpen size={20} />,
      path: "/admin/terms-conditions",
    },

    {
      name: "Email Template",
      icon: <Mail size={20} />,
      path: "/email-template",
    },
    { name: "Report", icon: <BarChart3 size={20} />, path: "/status-report" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-70" : "w-16"
      } bg-indigo-600 text-white text-semibold  h-screen p-4 transition-all duration-300 fixed flex flex-col justify-between overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent`}
    >
      {/* TOP SECTION */}
      <div className={`${!isOpen ? "flex flex-col items-center" : ""}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
            A
          </div>
          {isOpen && (
            <div>
              <p className="font-semibold">Admin Panel</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          className={`mb-6 flex items-center justify-between w-full text-black-300 ${
            !isOpen ? "justify-center" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`text-lg font-bold text-white ${
              !isOpen ? "hidden" : ""
            }`}
          >
            {isOpen ? "Admin Portal" : "AD"}
          </span>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Nav Items */}
        <ul className="space-y-4">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded-lg transition ${
                  location.pathname === item.path
                    ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-bold"
                    : "hover:bg-gradient-to-br hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500"
                } ${!isOpen ? "justify-center" : "space-x-3"}`}
              >
                {item.icon}
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-6">
        <ul className="space-y-4">
          {/* Settings */}
          <li>
            <Link
              to="/settings"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 transition"
            >
              <Settings size={20} />
              {isOpen && <span>Settings</span>}
            </Link>
          </li>
          {/* Logout */}
          <li>
            <button
              className="flex items-center space-x-3 p-2 w-full rounded-lg bg-red-700 transition"
              onClick={() => {
                navigate("/admin-login");
                // Add your logout logic here
                console.log("Logout clicked");
              }}
            >
              <LogOut size={20} />
              {isOpen && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
