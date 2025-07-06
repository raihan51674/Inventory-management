import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserInfo = () => {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/sales")

      .then((res) => res.json())
      .then((data) => setSales(data));
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
        fetch(`http://localhost:3000/sales/${id}`, { method: "DELETE" })
          .then(() => {
            setSales((prev) => prev.filter((sale) => (sale._id?.$oid || sale._id) !== id));
            Swal.fire("Deleted!", "The entry has been deleted.", "success");
          });
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 tracking-wide">
        Sales Summary
      </h1>

      {sales.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">No sales found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sales.map((sale) => {
            const id = sale._id?.$oid || sale._id;
            const name = sale.customerName;
            const phone = sale.phone;
            const model = sale.imei;
            const price = sale.price?.$numberInt || sale.price;
            const partial = sale.partialAmount?.$numberInt || sale.partialAmount;

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
                    Due Amount : <span className="text-red-600 font-bold text-2xl">৳{price - partial}</span>
                  </p>
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
