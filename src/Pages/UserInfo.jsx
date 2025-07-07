import { useEffect, useState } from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserInfo = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // add search state
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/sales`)
      .then((res) => res.json())
      .then((data) => setSales(data))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = (id) => navigate(`/update-sale/${id}`);

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
        fetch(`${import.meta.env.VITE_API_BASE_URL}/sales/${id}`, { method: "DELETE" })
          .then(() => {
            setSales((prev) => prev.filter((sale) => (sale._id?.$oid || sale._id) !== id));
            Swal.fire("Deleted!", "The entry has been deleted.", "success");
          });
      }
    });
  };

  // Filter sales by customer name (case-insensitive)
  const filteredSales = sales.filter((sale) =>
    sale.customerName?.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        className="mb-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold shadow transition"
        onClick={() => navigate(-1)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 tracking-wide">
        Sales Summary
      </h1>

      {/* Enhanced Search input */}
      <div className="mb-10 flex justify-center">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-400 pointer-events-none">
            <FaSearch className="text-xl" />
          </span>
          <input
            type="text"
            placeholder="Search by customer name..."
            className="pl-12 pr-4 py-3 w-full rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 text-gray-800 placeholder-gray-400 font-medium text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              boxShadow: "0 4px 24px 0 rgba(80, 112, 255, 0.08)",
              border: "1.5px solid #e0e7ff",
            }}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            {/* Decorative glass reflection */}
            <div className="w-8 h-8 rounded-full bg-white/30 blur-sm"></div>
          </div>
        </div>
      </div>

      {filteredSales.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">No sales found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSales.map((sale) => {
            const id = sale._id?.$oid || sale._id;
            const name = sale.customerName;
            const phone = sale.phone;
            const model = sale.imei;
            const price = sale.price?.$numberInt || sale.price;
            const partial = sale.partialAmount?.$numberInt || sale.partialAmount;
            const due = price - partial;

            return (
              <div
                key={id}
                className="bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-indigo-700 truncate">{name}</h2>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Phone:</span> {phone}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Model:</span> {model}
                  </p>
                  <p className="text-gray-800 font-semibold mb-1">
                    Total Price: <span className="text-green-600">৳{price}</span>
                  </p>
                  <p className="text-gray-700">
                    Partial Paid: <span className="text-yellow-600">৳{partial}</span>
                  </p>
                  <p className="text-gray-950 font-semibold">
                    Due Amount : <span className="text-red-600 font-bold text-2xl">৳{due}</span>
                  </p>
                  {due === 0 && (
                    <div className="mt-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 shadow-lg px-4 py-3 animate-pulse">
                      <svg className="w-7 h-7 text-white mr-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.3" strokeWidth="2.5" fill="none"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 13l3 3 7-7" stroke="white" strokeWidth="2.5"/>
                      </svg>
                      <span className="text-white font-extrabold text-lg md:text-xl tracking-wide drop-shadow-lg">
                        No due, <span className="underline decoration-white/60 decoration-2">payment OK!</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={() => handleUpdate(id)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md shadow-md flex items-center justify-center"
                    title="Update Sale"
                    aria-label="Update Sale"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-md flex items-center justify-center"
                    title="Delete Sale"
                    aria-label="Delete Sale"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserInfo;

