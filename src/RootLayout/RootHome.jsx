import { Outlet } from 'react-router';
import Navbar from "../Components/Navbar";

const RootHome = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <Navbar />
      </div>

      {/* Right Content Area */}
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default RootHome;
