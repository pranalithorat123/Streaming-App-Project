import { NavLink, Outlet } from "react-router-dom";

export default function ContentLibraryLayout() {
  return (
    <div className="bg-white  p-4 sm:p-6 md:p-8 rounded-lg shadow-md space-y-6 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-2 border-b pb-2">
        {[
          { to: "content-library", label: "Content Library" },
          { to: "people-library", label: "People Library" },
          { to: "manage-category", label: "Manage Category" },
          { to: "bulk-upload", label: "Bulk Upload" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm sm:text-base md:text-lg font-medium transition ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="overflow-x-auto w-full">
        <div className="min-w-[320px] md:min-w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
