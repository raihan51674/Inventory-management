import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserInfoUpdate = () => {
  const rawData = useLoaderData();
  const navigate = useNavigate();

  const parseData = (data) => ({
    _id: data._id?.$oid || data._id,
    customerName: data.customerName || "",
    phone: data.phone || "",
    quantity: Number(data.quantity?.$numberInt || data.quantity || 0),
    date: data.date || "",
    price: Number(data.price?.$numberInt || data.price || 0),
    imei: data.imei || "",
    notes: data.notes || "",
    paymentType: data.paymentType || "full",
    partialAmount:
      data.partialAmount && Number(data.partialAmount?.$numberInt || data.partialAmount) !== 0
        ? Number(data.partialAmount?.$numberInt || data.partialAmount)
        : "",
    dueAmount:
      data.dueAmount && Number(data.dueAmount?.$numberInt || data.dueAmount) !== 0
        ? Number(data.dueAmount?.$numberInt || data.dueAmount)
        : "",
    createdAt: data.createdAt?.$date?.$numberLong
      ? new Date(Number(data.createdAt.$date.$numberLong)).toISOString().slice(0, 10)
      : (data.createdAt ? new Date(data.createdAt).toISOString().slice(0, 10) : ""),
  });

  const [formData, setFormData] = useState(parseData(rawData));

  const calculateDueAmount = (price, partialAmount) => {
    const p = Number(partialAmount) || 0;
    const pr = Number(price) || 0;
    let due = pr - p;
    if (due < 0) due = 0;
    return due;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["price", "partialAmount"].includes(name)) {
      const newValue = value === "" ? "" : Number(value);

      setFormData((prev) => {
        const updated = {
          ...prev,
          [name]: newValue,
        };

        const due = calculateDueAmount(
          name === "price" ? newValue : prev.price,
          name === "partialAmount" ? newValue : prev.partialAmount
        );

        return {
          ...updated,
          dueAmount: due,
        };
      });
    } else if (name === "dueAmount") {
      const newDue = value === "" ? "" : Number(value);
      setFormData((prev) => ({
        ...prev,
        dueAmount: newDue,
      }));
    } else if (name === "quantity") {
      const newQty = value === "" ? "" : Number(value);
      setFormData((prev) => ({
        ...prev,
        quantity: newQty,
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const partial = Number(formData.partialAmount || 0);
    const total = Number(formData.price || 0);

    if (partial > total) {
      Swal.fire({
        icon: "error",
        title: "Invalid Partial Amount",
        text: "Partial paid amount cannot be greater than total price.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    if (partial === total) {
      await Swal.fire({
        icon: "info",
        title: "Great news! No Due!",
        text: "Congratulations! All dues are cleared. Your payment is fully complete ✅",
        confirmButtonColor: "#3085d6",
      });
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/sales/${formData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            partialAmount: partial,
            dueAmount: partial === total ? 0 : Number(formData.dueAmount || 0),
            createdAt: new Date(formData.createdAt).toISOString(),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update user info");

      await Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "User info updated successfully",
        confirmButtonColor: "#2563eb",
      });

      navigate("/userInfo");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl border border-indigo-200">
      <h2 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 bg-clip-text text-transparent mb-10 text-center tracking-wider">
        Update User Sale Info
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Payment Type on top */}
        <div>
          <label
            htmlFor="paymentType"
            className="block text-indigo-700 font-semibold mb-3 select-none tracking-wide text-lg"
          >
            Payment Type
          </label>
          <select
            id="paymentType"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            className="w-full rounded-2xl border border-indigo-300 px-5 py-4
              focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-transparent
              transition duration-400 shadow-lg text-indigo-900 font-semibold text-lg"
          >
            <option value="full">Full</option>
            <option value="partial">Partial</option>
          </select>
        </div>

        {/* Partial Amount and Due Amount together */}
        {formData.paymentType === "partial" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <label
                htmlFor="partialAmount"
                className="block text-indigo-700 font-semibold mb-3 select-none tracking-wide text-lg"
              >
                Partial Amount
              </label>
              <input
                id="partialAmount"
                name="partialAmount"
                type="number"
                min={0}
                max={formData.price}
                value={formData.partialAmount}
                onChange={handleChange}
                className="w-full rounded-2xl border border-indigo-300 px-5 py-4
                  focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent
                  transition duration-400 shadow-lg text-indigo-900 font-semibold text-lg placeholder-indigo-400"
                placeholder="Enter partial payment"
              />
            </div>
            <div>
              <label
                htmlFor="dueAmount"
                className="block text-indigo-700 font-semibold mb-3 select-none tracking-wide text-lg"
              >
                Due Amount
              </label>
              <input
                id="dueAmount"
                name="dueAmount"
                type="number"
                min={0}
                value={formData.price - (formData.partialAmount || 0)}
                readOnly
                className="w-full rounded-2xl border border-indigo-300 px-5 py-4 bg-indigo-100
                  focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent
                  transition duration-400 shadow-lg text-indigo-900 font-semibold text-lg"
                placeholder="Due amount auto-calculated"
              />
            </div>
          </div>
        )}

        {/* Other fields */}
        {[
          { label: "Customer Name", name: "customerName", type: "text", required: true },
          { label: "Phone", name: "phone", type: "text", required: true },
          { label: "Quantity", name: "quantity", type: "number", min: 0, required: true },
          { label: "Date", name: "date", type: "date", required: true },
          { label: "Total Price", name: "price", type: "number", min: 0, required: true },
          { label: "IMEI", name: "imei", type: "text" },
          { label: "Created At", name: "createdAt", type: "date" },
        ].map(({ label, name, type, required, min }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-indigo-700 font-semibold mb-3 select-none tracking-wide text-lg"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              min={min}
              value={formData[name]}
              onChange={handleChange}
              required={required}
              className="w-full rounded-2xl border border-indigo-300 px-5 py-4 placeholder-indigo-400
                focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent
                transition duration-400 shadow-lg text-indigo-900 font-semibold text-lg"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        ))}

        <div>
          <label
            htmlFor="notes"
            className="block text-indigo-700 font-semibold mb-3 select-none tracking-wide text-lg"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-2xl border border-indigo-300 px-5 py-4 resize-none
              placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent
              transition duration-400 shadow-lg text-indigo-900 font-semibold text-lg"
            placeholder="Additional notes..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 via-indigo-700 to-pink-600 hover:from-pink-600 hover:via-indigo-700 hover:to-purple-600
            text-white font-extrabold py-4 rounded-3xl shadow-2xl transition duration-400 ease-in-out
            focus:outline-none focus:ring-6 focus:ring-pink-300"
        >
          Update Info
        </button>
      </form>
    </div>
  );
};

export default UserInfoUpdate;
