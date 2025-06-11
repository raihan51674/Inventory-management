import axios from "axios";
import { useEffect, useState } from "react";

const getStatusBadge = (quantity) => {
  if (quantity === 0) return "bg-red-100 text-red-700";
  if (quantity <= 5) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-700";
};

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://your-api-url.com/mobiles");
        setInventoryData(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch inventory:", error);
      }
    };
    fetchData();
  }, []);

  const filteredData = inventoryData
    .filter((item) =>
      item.model.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "price") return a.price - b.price;
      if (sortKey === "stock") return b.quantity - a.quantity;
      return 0;
    });

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">📦 Inventory</h1>

        <div className="mt-4 sm:mt-0 flex gap-3">
          <input
            type="text"
            placeholder="Search model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none"
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Brand</th>
              <th className="px-6 py-3">Model</th>
              <th className="px-6 py-3">RAM</th>
              <th className="px-6 py-3">ROM</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredData.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4 font-medium">{item.brand}</td>
                <td className="px-6 py-4">{item.model}</td>
                <td className="px-6 py-4">{item.ram}</td>
                <td className="px-6 py-4">{item.rom}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">${item.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusBadge(
                      item.quantity
                    )}`}
                  >
                    {item.quantity === 0
                      ? "Out of Stock"
                      : item.quantity <= 5
                      ? "Low Stock"
                      : "In Stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No matching models found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
