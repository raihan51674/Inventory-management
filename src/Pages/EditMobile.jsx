import axios from "axios";
import { useEffect, useState } from "react";

const EditMobile = ({ mobileId }) => {
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
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMobile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://your-api-url.com/mobiles/${mobileId}`);
        setFormData(res.data);
      } catch (err) {
        setError("Failed to fetch mobile data");
      } finally {
        setLoading(false);
      }
    };

    if (mobileId) fetchMobile();
  }, [mobileId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://your-api-url.com/mobiles/${mobileId}`, formData);
      alert("✅ Mobile updated successfully!");
    } catch (err) {
      alert("❌ Update failed. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this mobile?")) {
      try {
        await axios.delete(`https://your-api-url.com/mobiles/${mobileId}`);
        alert("🗑️ Mobile deleted successfully!");
        // Add redirect or clearing logic here if needed
      } catch (err) {
        alert("❌ Delete failed. Please try again.");
      }
    }
  };

  // if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">✏️ Edit Mobile</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleUpdate}>
        <input type="text" name="brand" placeholder="🏷️ Brand" className="input-style" value={formData.brand} onChange={handleChange} />
        <input type="text" name="model" placeholder="📱 Model" className="input-style" value={formData.model} onChange={handleChange} />
        <input type="text" name="ram" placeholder="🧠 RAM (e.g. 8GB)" className="input-style" value={formData.ram} onChange={handleChange} />
        <input type="text" name="rom" placeholder="💾 ROM (e.g. 128GB)" className="input-style" value={formData.rom} onChange={handleChange} />
        <input type="number" name="price" placeholder="💲 Price ($)" className="input-style" value={formData.price} onChange={handleChange} />
        <input type="number" name="quantity" placeholder="🔢 Quantity" className="input-style" value={formData.quantity} onChange={handleChange} />
        <input type="text" name="imei" placeholder="🔍 IMEI ID" className="input-style" value={formData.imei} onChange={handleChange} />
        <input type="text" name="color" placeholder="🎨 Color" className="input-style" value={formData.color} onChange={handleChange} />
        <select name="waterproof" className="input-style" value={formData.waterproof} onChange={handleChange}>
          <option value="">💧 Waterproof?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <select name="support5g" className="input-style" value={formData.support5g} onChange={handleChange}>
          <option value="">📡 5G Supported?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <input type="text" name="displaySize" placeholder="🖥️ Display Size (e.g. 6.5-inch)" className="input-style" value={formData.displaySize} onChange={handleChange} />
        <input type="text" name="battery" placeholder="🔋 Battery (e.g. 5000mAh)" className="input-style" value={formData.battery} onChange={handleChange} />
        <input type="text" name="camera" placeholder="📸 Camera (e.g. 64MP + 8MP)" className="input-style" value={formData.camera} onChange={handleChange} />
        <textarea
          name="description"
          placeholder="📝 Description..."
          className="input-style col-span-1 sm:col-span-2 h-24 resize-none"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit" className="col-span-1 sm:col-span-2 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
          💾 Update Mobile
        </button>
      </form>
      <button
        onClick={handleDelete}
        className="mt-6 w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition"
      >
        🗑️ Delete Mobile
      </button>
    </div>
  );
};

export default EditMobile;
