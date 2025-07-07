import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

// React Icons imports
import {
  FaBarcode,
  FaBatteryFull,
  FaBoxes,
  FaCamera,
  FaDollarSign,
  FaFileAlt,
  FaHdd,
  FaMemory,
  FaMobileAlt,
  FaPalette,
  FaSave,
  FaSignal,
  FaTint,
  FaTrademark,
  FaTv,
  FaWarehouse,
} from "react-icons/fa";

const iconMap = {
  brand: <FaTrademark className="inline mr-2 text-pink-500" />,
  model: <FaMobileAlt className="inline mr-2 text-pink-500" />,
  ram: <FaMemory className="inline mr-2 text-pink-500" />,
  rom: <FaHdd className="inline mr-2 text-pink-500" />,
  price: <FaDollarSign className="inline mr-2 text-pink-500" />,
  quantity: <FaBoxes className="inline mr-2 text-pink-500" />,
  imei: <FaBarcode className="inline mr-2 text-pink-500" />,
  color: <FaPalette className="inline mr-2 text-pink-500" />,
  waterproof: <FaTint className="inline mr-2 text-pink-500" />,
  support5g: <FaSignal className="inline mr-2 text-pink-500" />,
  displaySize: <FaTv className="inline mr-2 text-pink-500" />,
  battery: <FaBatteryFull className="inline mr-2 text-pink-500" />,
  camera: <FaCamera className="inline mr-2 text-pink-500" />,
  description: <FaFileAlt className="inline mr-2 text-pink-500" />,
  stockStatus: <FaWarehouse className="inline mr-2 text-pink-500" />,
};

const InventUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    ram: "",
    rom: "",
    price: "",
    quantity: "",
    imei: "",
    color: "",
    waterproof: "",
    support5g: "",
    displaySize: "",
    battery: "",
    camera: "",
    description: "",
    stockStatus: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/mobiles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/mobiles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Successfully Updated!",
          text: "Mobile updated successfully!",
          confirmButtonColor: "#d946ef", // Tailwind pink-500
        }).then(() => {
          navigate("/inventory");
        });
      } else {
        alert("Failed to update");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-white">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-t-4 border-gray-200 border-t-blue-600 animate-spin"></div>
          <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center shadow-inner">
            <span className="text-blue-600 font-bold animate-pulse">Loading</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 px-6 py-12 text-black">
      <div className="max-w-5xl w-full bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl p-12">
        <h2 className="text-4xl font-extrabold text-black mb-12 text-center tracking-widest drop-shadow-md">
          Update Mobile Info
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12"
        >
          {[
            "brand",
            "model",
            "ram",
            "rom",
            "price",
            "quantity",
            "imei",
            "color",
            "waterproof",
            "support5g",
            "displaySize",
            "battery",
            "camera",
            "description",
            "stockStatus",
          ].map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="mb-3 text-xl font-semibold text-black select-none flex items-center"
              >
                {iconMap[field]} {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === "description" ? (
                <textarea
                  id={field}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  rows={5}
                  className="resize-none p-4 rounded-2xl border-2 border-pink-300 bg-white text-black placeholder-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-500 transition-shadow shadow-sm hover:shadow-md"
                />
              ) : (
                <input
                  id={field}
                  type="text"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  className="p-4 rounded-2xl border-2 border-pink-300 bg-white text-black placeholder-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-500 transition-shadow shadow-sm hover:shadow-md"
                />
              )}
            </div>
          ))}
          <div className="md:col-span-2 flex justify-center mt-10">
            <button
              type="submit"
              className="flex items-center space-x-3 px-16 py-4 rounded-full bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-extrabold text-xl shadow-lg transition-transform transform hover:scale-105"
            >
              <FaSave size={22} />
              <span>Update Mobile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventUpdate;
