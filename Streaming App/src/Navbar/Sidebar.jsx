import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineFileText,
  AiOutlineMonitor,
  AiOutlineAppstore,
  AiOutlineDollar,
  AiOutlinePlayCircle,
  AiOutlineSend,
  AiOutlineUser,
  AiOutlineLineChart,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BiCoinStack } from "react-icons/bi";

const dashboardMenu = [
  { id: "dashboard", icon: AiFillHome, label: "Dashboard", to: "/dashboard" },
];

const otherMenus = [
  {
    id: "content",
    icon: AiOutlineFileText,
    label: "Content Management",
    to: "/content",
    children: [
      { label: "Content Library", to: "/content/content-library" },
      { label: "Asset Library", to: "/content/assets-library" },
      { label: "Playlist Library", to: "/content/playlists" },
      { label: "Featured Sections", to: "/content/featured-section" },
      { label: "Content Settings", to: "/content/content-settings" },
    ],
  },
  {
    id: "website",
    icon: AiOutlineMonitor,
    label: "Website",
    children: [
      { label: "Templates", to: "/website/templates" },
      { label: "Domain", to: "/website/domain" },
    ],
  },
  {
    id: "apps",
    icon: AiOutlineAppstore,
    label: "Apps",
    children: [
      { label: "App Store", to: "/apps/store" },
      { label: "Installed", to: "/apps/installed" },
    ],
  },
  {
    id: "monetization",
    icon: AiOutlineDollar,
    label: "Monetization",
    children: [
      { label: "Pricing", to: "/monetization/pricing" },
      { label: "Advertisements", to: "/monetization/ads" },
      { label: "Payment Gateways", to: "/monetization/gateways" },
      { label: "Settings", to: "/monetization/settings" },
    ],
  },
  {
    id: "player",
    icon: AiOutlinePlayCircle,
    label: "Player",
    children: [
      { label: "Player Settings", to: "/player/settings" },
      { label: "Encoding Profiles", to: "/player/encoding" },
    ],
  },
  {
    id: "marketing",
    icon: AiOutlineSend,
    label: "Marketing",
    children: [
      { label: "SEO", to: "/marketing/seo" },
      { label: "Marketing Integrations", to: "/marketing/integrations" },
      { label: "Notification Center", to: "/marketing/notifications" },
      { label: "Push Notification", to: "/marketing/push" },
    ],
  },
  {
    id: "users",
    icon: AiOutlineUser,
    label: "User Management",
    children: [
      { label: "User Details", to: "/users/details" },
      { label: "Settings", to: "/users/settings" },
    ],
  },
  {
    id: "analytics",
    icon: AiOutlineLineChart,
    label: "Analytics",
    children: [
      { label: "Engagement", to: "/analytics/engagement" },
      { label: "Revenue", to: "/analytics/revenue" },
      { label: "User", to: "/analytics/user" },
    ],
  },
  {
    id: "settings",
    icon: AiOutlineSetting,
    label: "Settings",
    children: [
      { label: "Access Management", to: "/settings/access" },
      { label: "Manage Language", to: "/settings/language" },
      { label: "Manage Translation", to: "/settings/translation" },
      { label: "Webhooks", to: "/settings/webhooks" },
      { label: "Advanced", to: "/settings/advanced" },
    ],
  },
];

export default function Sidebar() {
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMainClick = (item) => {
    if (!item.children) {
      navigate(item.to || "/");
      return;
    }
    setOpenId((cur) => (cur === item.id ? null : item.id));
  };

  const isMenuActive = (item) => {
    if (item.to)
      return (
        location.pathname === item.to ||
        (location.pathname === "/" && item.id === "dashboard")
      );
    if (item.children)
      return item.children.some((child) => child.to === location.pathname);
    return false;
  };

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const isOpen = openId === item.id;
    const active = isMenuActive(item) || isOpen;

    return (
      <div key={item.id} className="mb-1">
        <button
          onClick={() => handleMainClick(item)}
          className={`group w-full flex items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors ${
            active ? "bg-sky-100 text-sky-700" : "hover:bg-sky-50"
          }`}
        >
          <span className="flex items-center gap-3">
            <Icon
              className={`h-6 w-6 transition-colors ${
                active
                  ? "text-sky-700"
                  : "text-gray-700 group-hover:text-sky-600"
              }`}
            />
            <span className={active ? "text-sky-700" : "text-black"}>
              {item.label}
            </span>
          </span>
          {item.children && (
            <BiChevronDown
              className={`h-5 w-5 transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          )}
        </button>

        {item.children && (
          <div
            className={`origin-top overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-96 scale-y-100" : "max-h-0 scale-y-95"
            }`}
          >
            <ul className="pl-12 pr-2 py-1 space-y-1">
              {item.children.map((child) => (
                <li key={child.to}>
                  <NavLink
                    to={child.to}
                    className={({ isActive }) =>
                      `block rounded-md px-2 py-2 text-m font-medium transition-colors ${
                        isActive
                          ? "text-sky-700 bg-sky-100"
                          : "text-gray-500 hover:text-sky-600 hover:bg-sky-50"
                      }`
                    }
                  >
                    {child.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-70 shrink-0 bg-white text-gray-800 h-screen sticky top-0 overflow-y-auto shadow-md">
      {/* Logo */}
      <div className="px-5 py-4 flex items-center gap-2">
        <img
          src=""
          alt="Logo"
          className="h-10 w-10 object-contain rounded-md"
        />
        <div className="font-extrabold tracking-wide text-xl text-sky-700">
          Catseye
        </div>
      </div>

      <nav className="px-2 pb-6">
        {/* Dashboard on top */}
        {dashboardMenu.map(renderMenuItem)}

        <hr className="my-4 border-sky-200" />

        {/* Other menus */}
        {otherMenus.map(renderMenuItem)}
      </nav>
    </aside>
  );
}
