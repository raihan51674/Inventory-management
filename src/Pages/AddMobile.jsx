import Swal from "sweetalert2";

const AddMobile = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const MobileData = Object.fromEntries(new FormData(form).entries());

    MobileData.dateAdded = new Date();
    MobileData.stockStatus = "In Stock";

    fetch("http://localhost:3000/addMobile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(MobileData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        form.reset();
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
    <div className="max-w-4xl mx-auto p-10 bg-gradient-to-tr from-purple-50 via-indigo-50 to-blue-50 rounded-3xl shadow-2xl border border-indigo-200">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-700 tracking-wide">
        📲 Add New Mobile
      </h2>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        onSubmit={handleSubmit}
      >
        {[
          { name: "brand", placeholder: "🏷️ Brand", type: "text", required: true },
          { name: "model", placeholder: "📱 Model", type: "text", required: true },
          { name: "ram", placeholder: "🧠 RAM (e.g. 8GB)", type: "text" },
          { name: "rom", placeholder: "💾 ROM (e.g. 128GB)", type: "text" },
          { name: "price", placeholder: "💲 Price ($)", type: "number", required: true },
          { name: "quantity", placeholder: "🔢 Quantity", type: "number", required: true },
          { name: "imei", placeholder: "🔍 IMEI ID", type: "text" },
          { name: "color", placeholder: "🎨 Color", type: "text" },
          { name: "waterproof", placeholder: "💧 Waterproof?", type: "select", options: ["", "Yes", "No"] },
          { name: "support5g", placeholder: "📡 5G Supported?", type: "select", options: ["", "Yes", "No"] },
          { name: "displaySize", placeholder: "🖥️ Display Size (e.g. 6.5-inch)", type: "text" },
          { name: "battery", placeholder: "🔋 Battery (e.g. 5000mAh)", type: "text" },
          { name: "camera", placeholder: "📸 Camera (e.g. 64MP + 8MP)", type: "text" },
        ].map(({ name, placeholder, type, required, options }) =>
          type === "select" ? (
            <select
              key={name}
              name={name}
              className="input-style-modern"
              defaultValue={""}
            >
              {options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt === "" ? placeholder : opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              required={required}
              className="input-style-modern"
            />
          )
        )}

        <textarea
          name="description"
          placeholder="📝 Description..."
          rows={4}
          className="input-style-modern col-span-1 sm:col-span-2 resize-none"
        />

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600
          hover:from-pink-600 hover:via-purple-700 hover:to-indigo-600
          text-white font-extrabold py-4 rounded-3xl shadow-xl transition duration-300 ease-in-out"
        >
          ➕ Add Mobile
        </button>
      </form>
    </div>
  );
};

export default AddMobile;
