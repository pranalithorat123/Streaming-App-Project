import { NavLink, Outlet } from "react-router-dom";

export default function ContentSettingLayout() {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md space-y-6 min-h-screen">
      {/* Menu Tabs */}
      <div className="flex flex-col sm:flex-row gap-2 border-b pb-2">
        {[
          { to: "nested-content", label: "Nested Content" },
          { to: "geo-restrictions", label: "Geo Restrictions" },
          { to: "imagesLike-ratings", label: "ImagesLike-Ratings" },
          { to: "ordering", label: "Ordering" },
          { to: "metadata", label: "Metadata" },
          { to: "dvanced", label: "Advanced" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm sm:text-sm md:text-base font-medium transition ${
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

      {/* Outlet for nested routes */}
      <div className="overflow-x-auto w-full">
        <div className="min-w-[320px] md:min-w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
