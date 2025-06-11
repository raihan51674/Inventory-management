import axios from "axios";
import { useState } from "react";

const AddMobile = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", formData);

    try {
      const response = await axios.post("https://your-api-url.com/mobiles", formData);
      console.log("✅ Mobile added successfully:", response.data);
      alert("✅ Mobile added successfully!");
      setFormData({
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
    } catch (error) {
      console.error("❌ Error adding mobile:", error);
      alert("❌ Failed to add mobile. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">📲 Add New Mobile</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
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
          ➕ Add Mobile
        </button>
      </form>
    </div>
  );
};

export default AddMobile;
