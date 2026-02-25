import { NavLink, Outlet } from "react-router-dom";

export default function AccountLayout() {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md space-y-6">
      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
        My Account
      </h1>

      {/* Toggle Buttons */}
      <div className="flex flex-wrap gap-2 border-b pb-2">
        {[
          { to: "subscription-details", label: "Subscription Details" },
          { to: "purchase-subscription", label: "Purchase Subscription" },
          { to: "payment-history", label: "Payment History" },
          { to: "payment-information", label: "Payment Information" },
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

      {/* Render selected page here */}
      <div className="overflow-x-auto">
        <Outlet />
      </div>
    </div>
  );
}
