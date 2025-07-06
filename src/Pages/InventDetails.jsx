import {
  FaArrowLeft,
  FaBatteryFull,
  FaCalendarAlt,
  FaCamera,
  FaDatabase,
  FaDollarSign,
  FaHashtag,
  FaMemory,
  FaMobileAlt,
} from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";

const InventDetails = () => {
  const data = useLoaderData();
  const {
    brand,
    model,
    ram,
    rom,
    price,
    quantity,
    imei,
    color,
    waterproof,
    support5g,
    displaySize,
    battery,
    camera,
    description,
    dateAdded,
    stockStatus,
  } = data || {};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <Link
        to="/inventory"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold mb-6 transition-colors duration-300"
      >
        <FaArrowLeft className="mr-2 text-xl" />
        Back to Inventory
      </Link>

      <div
        className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 space-y-8 border border-white/30"
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)" }}
      >
        {/* Header with gradient text */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            {brand} - {model}
          </h2>
          <span
            className={`text-sm font-semibold px-4 py-1 rounded-full uppercase tracking-wide shadow-sm transition-colors duration-300 ${
              stockStatus === "In Stock"
                ? "bg-green-200 text-green-900"
                : "bg-red-200 text-red-900"
            }`}
          >
            {stockStatus}
          </span>
        </div>

        <p className="text-gray-700 text-lg leading-relaxed max-w-prose">{description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <Detail label="RAM" value={ram} icon={<FaMemory />} />
          <Detail label="ROM" value={rom} icon={<FaDatabase />} />
          <Detail label="Display" value={`${displaySize} inch`} icon={<FaMobileAlt />} />
          <Detail label="Battery" value={`${battery} mAh`} icon={<FaBatteryFull />} />
          <Detail label="Camera" value={camera} icon={<FaCamera />} />
          <Detail label="Color" value={color} icon={<FaHashtag />} />
          {waterproof && <Detail label="Waterproof" value={waterproof} icon="💧" />}
          {support5g && <Detail label="5G Support" value={support5g} icon="📶" />}
          <Detail label="IMEI" value={imei} icon="🔒" />
          <Detail label="Quantity" value={quantity} icon="📦" />
          <Detail label="Price" value={`$${price}`} icon={<FaDollarSign />} />
          <Detail label="Date Added" value={new Date(dateAdded).toLocaleDateString()} icon={<FaCalendarAlt />} />
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value, icon }) => (
  <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md cursor-default hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 text-xl shadow-inner">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default InventDetails;
