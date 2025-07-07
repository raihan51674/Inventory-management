import jsPDF from "jspdf";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaEye,
  FaFileInvoiceDollar,
  FaMobileAlt,
  FaMoneyBillWave,
  FaUserTie,
} from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Purchase = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = Object.fromEntries(new FormData(form).entries());

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/addReceipt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to post data to server");

      form.reset();
      generatePDF(formData);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Purchase received successfully.",
        confirmButtonColor: "#3085d6",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("❌ Failed to save purchase or generate PDF.");
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor("#2c3e50");
    doc.text(" Purchase Invoice", 20, 20);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    doc.setFontSize(14);
    doc.setTextColor("#34495e");
    doc.text(" Supplier Info", 20, 35);

    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.text(`Name: ${data.supplierName}`, 20, 45);
    doc.text(` Phone: ${data.phone || "N/A"}`, 20, 52);

    doc.setFontSize(14);
    doc.setTextColor("#34495e");
    doc.text(" Purchase Details", 20, 65);

    const startY = 75;
    const lineHeight = 8;

    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.text(`Model: ${data.model}`, 20, startY);
    doc.text(`IMEI: ${data.imei}`, 20, startY + lineHeight);
    doc.text(` Date: ${data.date}`, 20, startY + lineHeight * 2);
    doc.text(` Quantity: ${data.quantity}`, 20, startY + lineHeight * 3);
    doc.text(` Price: $${data.price}`, 20, startY + lineHeight * 4);

    if (data.notes?.trim()) {
      doc.setFontSize(14);
      doc.setTextColor("#34495e");
      doc.text(" Rahad Shop", 20, startY + lineHeight * 6);
      doc.setFontSize(12);
      doc.setTextColor("#000");
      const splitNotes = doc.splitTextToSize(data.notes, 170);
      doc.text(splitNotes, 20, startY + lineHeight * 7);
    }

    doc.setDrawColor(200);
    doc.line(20, 280, 190, 280);
    doc.setFontSize(10);
    doc.setTextColor("#7f8c8d");
    doc.text("Thank you for your purchase!", 105, 288, null, null, "center");

    doc.save(`PurchaseInvoice-${data.model || "Mobile"}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-tr from-white via-blue-50 to-indigo-100 shadow-2xl rounded-3xl mt-8 mb-12 border border-indigo-300">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-3xl font-extrabold text-indigo-900 drop-shadow-sm">
          📦 Mobile Purchase from Supplier
        </h2>
        <Link
          to="/all-recipt"
          className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
          title="View All Receipts"
        >
          <FaEye className="text-lg" /> View All Receipts
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {[
          { icon: <FaUserTie className="text-indigo-600" />, name: "supplierName", placeholder: "Supplier Name", required: true },
          { icon: <FaMobileAlt className="text-purple-600" />, name: "model", placeholder: "Mobile Model", required: true },
          { icon: <FaMobileAlt className="text-indigo-700" />, name: "imei", placeholder: "IMEI Number", required: true },
          { icon: <FaCalendarAlt className="text-red-500" />, name: "date", placeholder: "Purchase Date", type: "date", required: true },
          { icon: <FaMoneyBillWave className="text-green-600" />, name: "price", placeholder: "Total Price ($)", type: "number", min: 0, step: "0.01", required: true },
          { icon: <FaFileInvoiceDollar className="text-yellow-500" />, name: "quantity", placeholder: "Quantity", type: "number", min: 1, required: true },
        ].map(({ icon, name, placeholder, type, min, step, required }, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 rounded-xl bg-white shadow-md border border-indigo-200 focus-within:ring-4 focus-within:ring-indigo-300 transition"
          >
            <div className="pl-4">{icon}</div>
            <input
              type={type || "text"}
              name={name}
              placeholder={placeholder}
              min={min}
              step={step}
              required={required}
              className="w-full py-3 px-4 rounded-r-xl text-indigo-900 font-medium text-lg placeholder-indigo-400 focus:outline-none bg-transparent"
            />
          </div>
        ))}

        <textarea
          name="notes"
          placeholder="Additional Notes..."
          className="sm:col-span-2 resize-none h-28 rounded-xl border border-indigo-300 px-5 py-4 text-indigo-900 font-semibold text-lg placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 bg-white shadow-md transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="sm:col-span-2 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-extrabold shadow-lg hover:shadow-2xl transform hover:scale-[1.03] transition duration-300 disabled:opacity-50"
        >
          {loading ? "Processing..." : "✅ Buy Receive in Customer"}
        </button>
      </form>
    </div>
  );
};

export default Purchase;
