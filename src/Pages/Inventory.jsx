import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const getStatusBadge = (status) => {
  if (status === "Out of Stock") return "bg-red-200 text-red-800";
  if (status === "Low Stock") return "bg-yellow-200 text-yellow-900";
  return "bg-green-200 text-green-800";
};

const Inventory = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/mobiles`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Confirm Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/mobiles/${id}`, { method: "DELETE" })
          .then(() => {
            setData((prev) => prev.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "The item has been deleted.", "success");
          })
          .catch((err) => {
            console.error("Error deleting item:", err);
            Swal.fire("Error!", "Failed to delete the item.", "error");
          });
      }
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setData((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, stockStatus: newStatus } : item
      )
    );

    fetch(`${import.meta.env.VITE_API_BASE_URL}/mobiles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stockStatus: newStatus }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setData((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, stockStatus: updated.stockStatus || newStatus }
              : item
          )
        );
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      });
  };

  const filteredData = data
    .filter((item) =>
      item?.brand?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "price") return a.price - b.price;
      if (sortKey === "stock") return a.quantity - b.quantity;
      return 0;
    });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-gradient-to-r from-white via-blue-50 to-indigo-100">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-t-4 border-blue-200 border-t-indigo-600 animate-spin"></div>
          <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center shadow-inner">
            <span className="text-indigo-600 font-bold animate-pulse text-lg">Loading</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-slate-100 to-white min-h-screen rounded-xl shadow-xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-black text-gray-900 drop-shadow-sm">📱 Mobile Showcase in Customer</h1>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="🔍 Search name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
          />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
          >
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedData.map((item) => (
          <div
            key={item._id}
            className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl p-5 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-indigo-800">
                {item.brand} - {item.model}
              </h2>
              <p className="text-gray-600 text-sm">
                RAM: {item.ram} | ROM: {item.rom}
              </p>
              <p className="text-gray-700">📦 Quantity: {item.quantity}</p>
              <p className="text-gray-800 font-semibold">💵 ${item.price}</p>
              <p className="text-sm text-gray-500">Supplier: {item.supplier}</p>
              <p className="text-sm text-gray-400">
                🕒 Date: {new Date(item.dateAdded).toLocaleDateString()}
              </p>
              <select
                value={item.stockStatus || "In Stock"}
                onChange={(e) => handleStatusChange(item._id, e.target.value)}
                className={`mt-2 px-4 py-1 rounded-full font-medium text-sm transition ${getStatusBadge(
                  item.stockStatus || "In Stock"
                )}`}
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div className="mt-4 flex gap-2">
              <Link
                to={`/mobiles/details/${item._id}`}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium py-2 rounded-lg transition"
              >
                <FaEye /> Details
              </Link>
              <Link
                to={`/mobiles/update/${item._id}`}
                className="flex-1 flex items-center justify-center gap-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 font-medium py-2 rounded-lg transition"
              >
                <FaEdit /> Update
              </Link>
              <button
                onClick={() => handleDelete(item._id)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 font-medium py-2 rounded-lg transition"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center text-gray-400 text-lg py-6">
          No matching models found.
        </div>
      )}

      <div className="flex justify-center mt-8 flex-wrap gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-200 ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Inventory;