import {
  FaBoxOpen,
  FaCartPlus,
  FaCashRegister,
  FaChartBar,
  FaClipboardList,
  FaEdit,
  FaPlusSquare,
  FaTachometerAlt,
} from "react-icons/fa";
import { NavLink } from "react-router";

const Navbar = () => {
  const navItems = [
    { name: "Dashboard", path: "/Dashboard", icon: <FaTachometerAlt /> },
    { name: "Inventory", path: "/inventory", icon: <FaBoxOpen /> },
    { name: "Add Mobile", path: "/AddMobile", icon: <FaPlusSquare /> },
    { name: "Add Purchase", path: "/AddPurchase", icon: <FaCartPlus /> },
    { name: "Add Sales", path: "/AddSalePage", icon: <FaCashRegister /> },
    { name: "Buy Recipt", path: "/purchase", icon: <FaClipboardList /> },
    { name: "Edit Mobile", path: "/EditMobile", icon: <FaEdit /> },
    { name: "Report Analysis", path: "/ReportPage", icon: <FaChartBar /> },
  ];

  return (
    <div className="h-screen p-4 bg-gray-900 text-white flex flex-col gap-2">
      <h1 className="text-2xl font-bold mb-6 text-center">📱 InventorySys</h1>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-lg transition-all ${
              isActive ? "bg-blue-600" : "hover:bg-gray-800"
            }`
          }
        >
          <span className="text-xl">{item.icon}</span>
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
