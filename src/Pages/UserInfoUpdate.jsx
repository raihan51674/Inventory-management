import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserInfoUpdate = () => {
  const rawData = useLoaderData();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
        : 0,
    dueAmount:
      data.dueAmount && Number(data.dueAmount?.$numberInt || data.dueAmount) !== 0
        ? Number(data.dueAmount?.$numberInt || data.dueAmount)
        : 0,
    createdAt: data.createdAt?.$date?.$numberLong
      ? new Date(Number(data.createdAt.$date.$numberLong)).toISOString().slice(0, 10)
      : (data.createdAt ? new Date(data.createdAt).toISOString().slice(0, 10) : ""),
  });

  const [formData, setFormData] = useState(parseData(rawData));

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dueAmount") {
      const newDue = value === "" ? "" : Number(value);
      setFormData((prev) => ({
        ...prev,
        dueAmount: newDue,
      }));
    } else if (name === "quantity" || name === "price") {
      const newVal = value === "" ? "" : Number(value);
      setFormData((prev) => ({
        ...prev,
        [name]: newVal,
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
    setLoading(true);

    const { price, partialAmount, dueAmount, paymentType } = formData;

    if (paymentType === "partial") {
      const currentDue = price - partialAmount;
      const paidDue = Number(dueAmount || 0);

      if (paidDue <= 0) {
        Swal.fire({
          icon: "error",
          title: "Invalid Payment",
          text: "Please enter a valid due amount to pay.",
          confirmButtonColor: "#d33",
        });
        setLoading(false);
        return;
      }

      if (paidDue > currentDue) {
        Swal.fire({
          icon: "error",
          title: "Overpayment!",
          text: `You cannot pay more than the current due amount: ৳${currentDue}`,
          confirmButtonColor: "#d33",
        });
        setLoading(false);
        return;
      }

      const updatedPartial = partialAmount + paidDue;
      const updatedDue = price - updatedPartial;

      formData.partialAmount = updatedPartial;
      formData.dueAmount = updatedDue;

      if (updatedDue === 0) {
        await Swal.fire({
          icon: "success",
          title: "All dues cleared!",
          text: "Congratulations! Full payment completed ✅",
          confirmButtonColor: "#3085d6",
        });
      } else {
        await Swal.fire({
          icon: "info",
          title: "Partial Due Paid",
          text: `Aro dua thaklo: ৳${updatedDue}`,
          confirmButtonColor: "#3085d6",
        });
      }
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/sales/${formData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
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
    } finally {
      setLoading(false);
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
    <div className="max-w-3xl mx-auto p-10 bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl border border-indigo-200">
      <button
        type="button"
        onClick={() => navigate("/userInfo")}
        className="mb-8 px-6 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold rounded-xl shadow transition"
      >
        ← Back
      </button>
      <h2 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 bg-clip-text text-transparent mb-10 text-center tracking-wider">
        Update User Sale Info
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Show Total Price above Payment Type */}
        <div>
          <label className="block text-indigo-700 font-semibold mb-1 text-lg">
            Total Price
          </label>
          <div className="w-full rounded-2xl border border-indigo-300 px-5 py-4 bg-gray-100 shadow-inner text-indigo-900 font-bold text-lg">
            ৳{formData.price}
          </div>
        </div>

        <div>
          <label className="block text-indigo-700 font-semibold mb-3 text-lg">
            Payment Type
          </label>
          <select
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            className="w-full rounded-2xl border border-indigo-300 px-5 py-4 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-transparent shadow-lg text-indigo-900 font-semibold text-lg"
          >
            <option value="full">Full</option>
            <option value="partial">Partial</option>
          </select>
        </div>

        {formData.paymentType === "partial" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <label className="block text-indigo-700 font-semibold mb-3 text-lg">
                Partial Paid
              </label>
              <input
                type="number"
                name="partialAmount"
                value={formData.partialAmount}
                readOnly
                className="w-full bg-gray-100 border border-indigo-200 px-5 py-4 rounded-2xl shadow-inner text-indigo-800 font-semibold text-lg"
              />
            </div>
            <div>
              <label className="block text-indigo-700 font-semibold mb-3 text-lg">
                Pay Due Amount
              </label>
              <input
                type="number"
                name="dueAmount"
                value={formData.dueAmount}
                onChange={handleChange}
                min={0}
                max={formData.price - formData.partialAmount}
                className="w-full border border-indigo-300 px-5 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent shadow-lg text-indigo-900 font-semibold text-lg"
              />
            </div>
          </div>
        )}

        {/* Add other form fields and textarea here */}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 via-indigo-700 to-pink-600 hover:from-pink-600 hover:via-indigo-700 hover:to-purple-600 text-white font-extrabold py-4 rounded-3xl shadow-2xl transition duration-400 ease-in-out focus:outline-none focus:ring-6 focus:ring-pink-300"
        >
          Update Info
        </button>
      </form>
    </div>
  );
};

export default UserInfoUpdate;
