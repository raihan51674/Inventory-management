import axios from "axios";
import { useState } from "react";
import {
  MdAttachMoney,
  MdCalendarToday,
  MdColorLens,
  MdConfirmationNumber,
  MdDevicesOther,
  MdEmail,
  MdHome,
  MdMemory,
  MdNotes,
  MdPerson,
  MdPhone,
  MdPhoneAndroid,
  MdPhotoCamera,
  MdSdStorage
} from "react-icons/md";

const AddPurchase = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    brand: "",
    model: "",
    imei: "",
    ram: "",
    rom: "",
    color: "",
    displayCondition: "",
    batteryHealth: "",
    cameraCondition: "",
    bodyCondition: "",
    waterproof: "",
    purchasePrice: "",
    purchaseDate: "",
    photo: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const response = await axios.post("https://your-backend-api.com/api/purchases", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Purchase added successfully!");
      console.log(response.data);

      setFormData({
        customerName: "",
        phone: "",
        email: "",
        address: "",
        brand: "",
        model: "",
        imei: "",
        ram: "",
        rom: "",
        color: "",
        displayCondition: "",
        batteryHealth: "",
        cameraCondition: "",
        bodyCondition: "",
        waterproof: "",
        purchasePrice: "",
        purchaseDate: "",
        photo: "",
        notes: "",
      });

    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Failed to add purchase.");
    }
  };

  const renderInput = (name, placeholder, Icon, type = "text") => (
    <div className="flex items-center border rounded-md p-2 gap-2 bg-white">
      <Icon className="text-gray-500 text-xl" />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="outline-none w-full"
        value={formData[name]}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-6 mb-10">
      <h2 className="text-2xl font-bold text-center mb-6">🛒 Add Purchase (Used Phone)</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {renderInput("customerName", "Customer Name", MdPerson)}
        {renderInput("phone", "Phone Number", MdPhone)}
        {renderInput("email", "Email (optional)", MdEmail)}
        {renderInput("address", "Address", MdHome)}
        {renderInput("brand", "Brand", MdPhoneAndroid)}
        {renderInput("model", "Model", MdDevicesOther)}
        {renderInput("imei", "IMEI Number", MdConfirmationNumber)}
        {renderInput("color", "Color", MdColorLens)}
        {renderInput("ram", "RAM (e.g. 6GB)", MdMemory)}
        {renderInput("rom", "ROM (e.g. 128GB)", MdSdStorage)}

        {/* Condition dropdowns */}
        <select name="displayCondition" className="input-style" value={formData.displayCondition} onChange={handleChange}>
          <option value="">📱 Display Condition</option>
          <option value="Good">Good</option>
          <option value="Cracked">Cracked</option>
          <option value="Dead Pixels">Dead Pixels</option>
        </select>

        <select name="batteryHealth" className="input-style" value={formData.batteryHealth} onChange={handleChange}>
          <option value="">🔋 Battery Health</option>
          <option value="Good">Good</option>
          <option value="Weak">Weak</option>
          <option value="Needs Replacement">Needs Replacement</option>
        </select>

        <select name="cameraCondition" className="input-style" value={formData.cameraCondition} onChange={handleChange}>
          <option value="">📷 Camera Condition</option>
          <option value="Working">Working</option>
          <option value="Blurred">Blurred</option>
          <option value="Not Working">Not Working</option>
        </select>

        <select name="bodyCondition" className="input-style" value={formData.bodyCondition} onChange={handleChange}>
          <option value="">📦 Body Condition</option>
          <option value="Like New">Like New</option>
          <option value="Scratched">Scratched</option>
          <option value="Damaged">Damaged</option>
        </select>

        <select name="waterproof" className="input-style" value={formData.waterproof} onChange={handleChange}>
          <option value="">💧 Waterproof</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Unknown">Unknown</option>
        </select>

        {/* Purchase Details */}
        {renderInput("purchasePrice", "Purchase Price ($)", MdAttachMoney, "number")}
        {renderInput("purchaseDate", "Purchase Date", MdCalendarToday, "date")}

        {/* File input */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <MdPhotoCamera /> Attach Photo (optional)
          </label>
          <input type="file" name="photo" accept="image/*" className="w-full border rounded-md p-2" onChange={handleChange} />
        </div>

        {/* Notes */}
        <div className="md:col-span-2 flex gap-2 border rounded-md p-2">
          <MdNotes className="text-gray-500 text-xl mt-1" />
          <textarea
            name="notes"
            placeholder="Additional Notes..."
            className="w-full h-24 resize-none outline-none"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          ✅ Confirm Purchase
        </button>
      </form>
    </div>
  );
};

export default AddPurchase;
