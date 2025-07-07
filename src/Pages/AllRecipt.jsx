import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const AllRecipt = () => {
  const [receipts, setReceipts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const queryParam = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : "";
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/receipts${queryParam}`
        );
        const data = await res.json();
        setReceipts(data);
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };

    fetchReceipts();
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-tr from-white via-sky-50 to-indigo-50 rounded-3xl shadow-2xl border border-indigo-200">
      <h2 className="text-4xl font-extrabold text-indigo-900 mb-8 tracking-tight drop-shadow-sm">
        📋 All Receipts
      </h2>

      <div className="relative max-w-md mb-10 mx-auto sm:mx-0">
        <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-indigo-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by supplier, model, or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-4 pl-12 pr-5 rounded-xl border-2 border-indigo-300 text-indigo-900 text-lg font-semibold placeholder-indigo-400 shadow-md
            focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-300 transition"
        />
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-indigo-300">
        <table className="min-w-full table-auto border-collapse bg-white rounded-xl">
          <thead className="bg-indigo-100 sticky top-0 z-10">
            <tr>
              {["Supplier", "Model", "Date", "Price"].map((heading) => (
                <th
                  key={heading}
                  className="border-b border-indigo-300 px-8 py-4 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wide"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {receipts.length > 0 ? (
              receipts.map((receipt, index) => (
                <tr
                  key={receipt._id}
                  className={`transition hover:bg-indigo-50 cursor-pointer ${
                    index % 2 === 0 ? "bg-white" : "bg-indigo-50"
                  }`}
                >
                  <td className="px-8 py-5 text-indigo-900 font-medium whitespace-nowrap">
                    {receipt.supplierName || "N/A"}
                  </td>
                  <td className="px-8 py-5 text-indigo-900 font-medium whitespace-nowrap">
                    {receipt.model || "N/A"}
                  </td>
                  <td className="px-8 py-5 text-indigo-900 font-medium whitespace-nowrap">
                    {receipt.date || "N/A"}
                  </td>
                  <td className="px-8 py-5 text-indigo-900 font-medium whitespace-nowrap">
                    {receipt.price || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-12 text-center text-indigo-400 italic text-lg select-none"
                >
                  No receipts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRecipt;
