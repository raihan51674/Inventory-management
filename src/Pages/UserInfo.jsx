import { useEffect, useState } from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserInfo = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showDueOnly, setShowDueOnly] = useState(false);
  const [showNoDueOnly, setShowNoDueOnly] = useState(false);
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
        fetch(`${import.meta.env.VITE_API_BASE_URL}/sales/${id}`, {
          method: "DELETE",
        }).then(() => {
          setSales((prev) =>
            prev.filter((sale) => (sale._id?.$oid || sale._id) !== id)
          );
          Swal.fire("Deleted!", "The entry has been deleted.", "success");
        });
      }
    });
  };

  const filteredSales = sales.filter((sale) =>
    sale.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  const dueCount = filteredSales.filter((sale) => {
    const price = sale.price?.$numberInt || sale.price;
    const partial = sale.partialAmount?.$numberInt || sale.partialAmount;
    return price - partial > 0;
  }).length;

  const noDueCount = filteredSales.filter((sale) => {
    const price = sale.price?.$numberInt || sale.price;
    const partial = sale.partialAmount?.$numberInt || sale.partialAmount;
    return price - partial === 0;
  }).length;

  let displaySales = filteredSales;
  if (showDueOnly) {
    displaySales = filteredSales.filter((sale) => {
      const price = sale.price?.$numberInt || sale.price;
      const partial = sale.partialAmount?.$numberInt || sale.partialAmount;
      return price - partial > 0;
    });
  } else if (showNoDueOnly) {
    displaySales = filteredSales.filter((sale) => {
      const price = sale.price?.$numberInt || sale.price;
      const partial = sale.partialAmount?.$numberInt || sale.partialAmount;
      return price - partial === 0;
    });
  }

  const totalPrice = displaySales.reduce((acc, sale) => {
    const price = parseFloat(sale.price?.$numberInt || sale.price || 0);
    return acc + price;
  }, 0);

  const totalPaid = displaySales.reduce((acc, sale) => {
    const paid = parseFloat(sale.partialAmount?.$numberInt || sale.partialAmount || 0);
    return acc + paid;
  }, 0);

  const totalDue = totalPrice - totalPaid;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-gradient-to-r from-sky-50 to-indigo-100">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-t-4 border-blue-200 border-t-blue-600 animate-spin"></div>
          <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center shadow-inner">
            <span className="text-blue-600 font-bold animate-pulse text-lg">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-[#f8fbff] via-[#f1f5ff] to-[#e9f0ff] rounded-3xl shadow-2xl border border-indigo-100">
      <button
        className="mb-6 flex items-center gap-2 px-6 py-2 rounded-full bg-white hover:bg-indigo-50 text-indigo-600 font-bold shadow-lg border border-indigo-100 transition duration-300"
        onClick={() => navigate(-1)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h1 className="text-5xl font-extrabold mb-10 text-indigo-800 text-center tracking-tight leading-tight drop-shadow-sm">
        📊 Sales Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-10">
        <button
          onClick={() => {
            setShowNoDueOnly((prev) => !prev);
            if (!showNoDueOnly) setShowDueOnly(false);
          }}
          className={`w-full bg-white border-2 px-5 py-4 rounded-3xl shadow-md font-semibold text-green-600 hover:shadow-xl transition-all duration-200 ${
            showNoDueOnly ? "ring-2 ring-green-400 scale-105" : ""
          }`}
        >
          ✅ {noDueCount} Fully Paid Customer{noDueCount !== 1 && "s"}
        </button>

        <div className="flex flex-col items-center gap-3">
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-400">
              <FaSearch className="text-xl" />
            </span>
            <input
              type="text"
              placeholder="🔍 Search by customer name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-4 py-3 w-full rounded-2xl bg-white border border-indigo-200 shadow-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700 text-base"
            />
          </div>
          <button
            onClick={() => {
              setShowDueOnly(false);
              setShowNoDueOnly(false);
            }}
            className="px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full shadow hover:shadow-md transition"
          >
            🔄 Show All Customers
          </button>
        </div>

        <button
          onClick={() => {
            setShowDueOnly((prev) => !prev);
            if (!showDueOnly) setShowNoDueOnly(false);
          }}
          className={`w-full bg-white border-2 px-5 py-4 rounded-3xl shadow-md font-semibold text-red-600 hover:shadow-xl transition-all duration-200 ${
            showDueOnly ? "ring-2 ring-red-400 scale-105" : ""
          }`}
        >
          ⛔ {dueCount} Due Customer{dueCount !== 1 && "s"} list
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-blue-100 px-6 py-6 rounded-3xl shadow-md text-center hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-blue-800 mb-1">Total Sales</h3>
          <p className="text-2xl font-bold text-blue-900">৳ {totalPrice}</p>
        </div>
        <div className="bg-white border border-green-100 px-6 py-6 rounded-3xl shadow-md text-center hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-green-800 mb-1">Total Paid</h3>
          <p className="text-2xl font-bold text-green-900">৳ {totalPaid}</p>
        </div>
        <div className="bg-white border border-red-100 px-6 py-6 rounded-3xl shadow-md text-center hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-red-800 mb-1">Total Due</h3>
          <p className="text-2xl font-bold text-red-900">৳ {totalDue}</p>
        </div>
      </div>

      {displaySales.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-12">No matching sales found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displaySales.map((sale) => {
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
                className="bg-white bg-opacity-70 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-6 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-extrabold text-indigo-700 mb-2 truncate tracking-wide">
                    {name}
                  </h2>
                  <p className="text-gray-600"><strong>📞 Phone:</strong> {phone}</p>
                  <p className="text-gray-600"><strong>📱 Model:</strong> {model}</p>
                  <p className="text-green-600 font-semibold mt-2">💰 Total: ৳{price}</p>
                  <p className="text-yellow-600 font-semibold">✅ Paid: ৳{partial}</p>
                  <p className="text-red-600 font-bold text-xl">❗ Due: ৳{due}</p>

                  {due === 0 ? (
                    <div className="mt-4 text-center py-2 bg-green-100 text-green-700 font-semibold rounded-full shadow-sm animate-bounce">
                      ✅ Payment Complete
                    </div>
                  ) : (
                    <div className="mt-4 text-center py-2 bg-red-100 text-red-700 font-semibold rounded-full shadow-sm animate-bounce">
                      ❌ Payment Pending
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={() => handleUpdate(id)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full shadow transition duration-200"
                    title="Update"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow transition duration-200"
                    title="Delete"
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
