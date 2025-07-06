import {
  FaBoxOpen,
  FaCashRegister,
  FaChartBar,
  FaClipboardList,
  FaPlusSquare,
  FaTachometerAlt,
} from "react-icons/fa";
import { NavLink } from "react-router";


const Navbar = ({ sidebarOpen }) => {
  const navItems = [
    { name: "Dashboard", path: "/Dashboard", icon: <FaTachometerAlt /> },
    { name: "Inventory", path: "/inventory", icon: <FaBoxOpen /> },
    { name: "Purchase Mobile", path: "/AddMobile", icon: <FaPlusSquare /> },
    { name: "Sales Info", path: "/AddSalePage", icon: <FaCashRegister /> },
    { name: "Buy Receipt", path: "/purchase", icon: <FaClipboardList /> },
    { name: "Report Analysis", path: "/ReportPage", icon: <FaChartBar /> },
  ];

  return (
    <aside
      className={`
        flex flex-col
        bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
        text-white
        shadow-lg rounded-tr-xl rounded-br-xl
        transition-all duration-300
        ${sidebarOpen ? "w-64 p-6" : "w-16 p-4"}
        h-full
        select-none
      `}
    >
      {/* Brand */}
      <div
        className={`
          flex items-center justify-center mb-10
          ${sidebarOpen ? "justify-start gap-3" : "justify-center"}
          transition-all duration-300
        `}
      >
        <span
          className="text-3xl"
          role="img"
          aria-label="mobile phone"
          title="Rahad Shop"
        >
          📱
        </span>
        {sidebarOpen && (
          <h1 className="text-2xl font-extrabold tracking-wider select-text">
            Rahad Shop
          </h1>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-3 flex-grow">
        {navItems.map(({ name, path, icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `
                flex items-center gap-4 rounded-lg
                p-3
                text-lg font-semibold
                transition-all duration-300
                group
                ${isActive ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg" : "hover:bg-gray-700"}
                ${sidebarOpen ? "justify-start" : "justify-center"}
                relative
              `
            }
            title={!sidebarOpen ? name : undefined} // Tooltip on icon-only
          >
            <span
              className={`
                text-2xl
                transition-transform duration-300
                group-hover:scale-110
                ${sidebarOpen ? "" : "mx-auto"}
              `}
            >
              {icon}
            </span>
            {sidebarOpen && <span>{name}</span>}
            {!sidebarOpen && (
              <span
                className="
                  absolute left-full top-1/2 -translate-y-1/2
                  ml-3
                  bg-gray-800 text-white text-sm rounded-md
                  px-2 py-1
                  opacity-0 group-hover:opacity-100
                  pointer-events-none
                  whitespace-nowrap
                  transition-opacity duration-200
                  select-none
                "
              >
                {name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer or extra links */}
      {sidebarOpen && (
        <div className="mt-auto pt-4 border-t border-gray-700 text-center text-xs text-gray-400 select-text">
          © 2025 Rahad Shop
        </div>
      )}
    </aside>
  );
};

export default Navbar;
