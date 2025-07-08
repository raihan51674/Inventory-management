import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddMobile = () => {
  const naviage =useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const MobileData = Object.fromEntries(new FormData(form).entries());

    MobileData.dateAdded = new Date();
    MobileData.stockStatus = "In Stock";

    fetch(`${import.meta.env.VITE_API_BASE_URL}/addMobile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(MobileData),
    })
      .then((response) => response.json())
      .then((data) => {
        form.reset();
        naviage("/inventory")
        Swal.fire({
          icon: "success",
          title: "Mobile added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to add mobile",
          text: "Please try again.",
        });
      });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-white border border-indigo-100 rounded-3xl shadow-2xl">
      <h2 className="text-4xl font-black text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-800 to-pink-700 drop-shadow">
        📲 Add a New Mobile Device
      </h2>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {[{
          name: "brand", placeholder: "🏷️ Brand", type: "text", required: true
        }, {
          name: "model", placeholder: "📱 Model", type: "text", required: true
        }, {
          name: "ram", placeholder: "🧠 RAM (e.g. 8GB)", type: "text"
        }, {
          name: "rom", placeholder: "💾 ROM (e.g. 128GB)", type: "text"
        }, {
          name: "price", placeholder: "💲 Price ($)", required: true
        }, {
          name: "quantity", placeholder: "🔢 Quantity", required: true
        }, {
          name: "imei", placeholder: "🔍 IMEI ID", type: "text"
        }, {
          name: "color", placeholder: "🎨 Color", type: "text"
        }, {
          name: "waterproof", placeholder: "💧 Waterproof?", type: "select", options: ["", "Yes", "No"]
        }, {
          name: "support5g", placeholder: "📡 5G Supported?", type: "select", options: ["", "Yes", "No"]
        }, {
          name: "displaySize", placeholder: "🖥️ Display Size", type: "text"
        }, {
          name: "battery", placeholder: "🔋 Battery", type: "text"
        }, {
          name: "camera", placeholder: "📸 Camera", type: "text"
        }].map(({ name, placeholder, type, required, options }) =>
          type === "select" ? (
            <select
              key={name}
              name={name}
              defaultValue={""}
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {options.map((opt, i) => (
                <option key={i} value={opt}>{opt === "" ? placeholder : opt}</option>
              ))}
            </select>
          ) : (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              required={required}
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          )
        )}

        <textarea
          name="description"
          placeholder="📝 Description..."
          rows={4}
          className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 col-span-1 sm:col-span-2 resize-none"
        />

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 mt-4 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-full shadow-md hover:scale-105 transform transition-all duration-300"
        >
          ➕ Submit New Mobile
        </button>
      </form>
    </div>
  );
};

export default AddMobile;
