import jsPDF from "jspdf";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaMobileAlt,
  FaMoneyBillWave,
  FaUserTie,
} from "react-icons/fa";

const Purchase = () => {
  const [purchaseData, setPurchaseData] = useState({
    supplierName: "",
    phone: "",
    model: "",
    imei: "",
    quantity: 1,
    date: "",
    price: "",
    notes: "",
  });

  const [purchaseList, setPurchaseList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData({ ...purchaseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPurchaseList([...purchaseList, purchaseData]);
    alert("✅ Purchase recorded successfully!");
    setPurchaseData({
      supplierName: "",
      phone: "",
      model: "",
      imei: "",
      quantity: 1,
      date: "",
      price: "",
      notes: "",
    });
  };

  const generateInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor("#2c3e50");
    doc.text("Purchase Invoice", 20, 20);

    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    doc.setFontSize(14);
    doc.setTextColor("#34495e");
    doc.text("Supplier Information:", 20, 35);
    doc.setFontSize(12);
    doc.setTextColor("#000");

    doc.text(`Name: ${purchaseData.supplierName}`, 20, 45);
    doc.text(`Phone: ${purchaseData.phone}`, 20, 52);

    doc.setFontSize(14);
    doc.setTextColor("#34495e");
    doc.text("Purchase Details:", 20, 65);

    doc.setFontSize(12);
    doc.setTextColor("#000");
    const startY = 75;
    const lineHeight = 8;

    doc.text(`Mobile Model: ${purchaseData.model}`, 20, startY);
    doc.text(`IMEI Number: ${purchaseData.imei}`, 20, startY + lineHeight);
    doc.text(`Quantity: ${purchaseData.quantity}`, 20, startY + lineHeight * 2);
    doc.text(`Date: ${purchaseData.date}`, 20, startY + lineHeight * 3);
    doc.text(`Total Price: $${purchaseData.price}`, 20, startY + lineHeight * 4);

    if (purchaseData.notes.trim() !== "") {
      doc.setFontSize(14);
      doc.setTextColor("#34495e");
      doc.text("Additional Notes:", 20, startY + lineHeight * 6);

      doc.setFontSize(12);
      doc.setTextColor("#000");
      const splitNotes = doc.splitTextToSize(purchaseData.notes, 170);
      doc.text(splitNotes, 20, startY + lineHeight * 7);
    }

    doc.setDrawColor(200);
    doc.line(20, 280, 190, 280);
    doc.setFontSize(10);
    doc.setTextColor("#7f8c8d");
    doc.text("Thank you for your purchase!", 105, 288, null, null, "center");

    doc.save(`PurchaseInvoice-${purchaseData.model || "mobile"}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-8 mb-12">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
        📦 Mobile Purchase from Supplier
      </h2>

      {/* Purchase Form */}
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-2">
          <FaUserTie className="text-blue-600" />
          <input
            name="supplierName"
            placeholder="Supplier Name"
            className="input-style w-full"
            value={purchaseData.supplierName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <FaMobileAlt className="text-purple-600" />
          <input
            name="model"
            placeholder="Mobile Model"
            className="input-style w-full"
            value={purchaseData.model}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <FaMobileAlt className="text-indigo-600" />
          <input
            name="imei"
            placeholder="IMEI Number"
            className="input-style w-full"
            value={purchaseData.imei}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-red-500" />
          <input
            type="date"
            name="date"
            className="input-style w-full"
            value={purchaseData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <FaMoneyBillWave className="text-green-600" />
          <input
            type="number"
            name="price"
            placeholder="Total Price"
            className="input-style w-full"
            value={purchaseData.price}
            onChange={handleChange}
            min={0}
            step="0.01"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <FaFileInvoiceDollar className="text-yellow-500" />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="input-style w-full"
            value={purchaseData.quantity}
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        <textarea
          name="notes"
          placeholder="Additional Notes..."
          className="input-style sm:col-span-2 h-24 resize-none w-full"
          value={purchaseData.notes}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="sm:col-span-2 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          ✅ Add Purchase
        </button>

        <button
          type="button"
          onClick={generateInvoice}
          className="sm:col-span-2 w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          <FaFileInvoiceDollar /> Generate Invoice PDF
        </button>
      </form>

      {/* Purchase List */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">📋 Purchase List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-max w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th className="px-4 py-2 border">Supplier</th>
                <th className="px-4 py-2 border">Model</th>
                <th className="px-4 py-2 border">IMEI</th>
                <th className="px-4 py-2 border">Qty</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {purchaseList.map((purchase, index) => (
                <tr key={index} className="text-center text-sm">
                  <td className="px-4 py-2 border">{purchase.supplierName}</td>
                  <td className="px-4 py-2 border">{purchase.model}</td>
                  <td className="px-4 py-2 border">{purchase.imei}</td>
                  <td className="px-4 py-2 border">{purchase.quantity}</td>
                  <td className="px-4 py-2 border">${purchase.price}</td>
                  <td className="px-4 py-2 border">{purchase.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
