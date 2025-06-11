import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet, useLocation } from "react-router-dom"; // ✅ FIXED import
import Navbar from "../Components/Navbar";

const RootHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation(); // track route changes

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location]);

  // Auto toggle sidebar on resize
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-50 md:hidden text-2xl text-white bg-gray-800 p-2 rounded"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:w-64"
        }`}
      >
        <Navbar sidebarOpen={sidebarOpen} />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 transition-all duration-300 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default RootHome;
