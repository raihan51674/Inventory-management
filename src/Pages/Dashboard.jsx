import { useEffect, useState } from "react";
import {
  FaBell,
  FaBoxes,
  FaChartLine,
  FaDollarSign,
  FaShoppingCart,
} from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Month names for chart x-axis
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);
  const [monthlyStock, setMonthlyStock] = useState([]);
  const [monthlyAlerts, setMonthlyAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [purchaseRes, salesRes, quantityRes, itemsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/total-purchase`),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/total-sales`),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/total-quantity`),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/total-items`),
        ]);

        const [purchaseData, salesData, quantityData, itemsData] = await Promise.all([
          purchaseRes.json(),
          salesRes.json(),
          quantityRes.json(),
          itemsRes.json(),
        ]);

        setTotalPrice(purchaseData?.totalPrice || 0);
        setTotalSales(salesData?.totalPrice || 0);
        setTotalQuantity(quantityData?.totalQuantity || 0);
        setTotalItems(itemsData?.totalItems || 0);

        // Fake chart data
        setMonthlySales([
          { month: "Jan 2025", monthlySales: 12000 },
          { month: "Feb 2025", monthlySales: 17500 },
          { month: "Mar 2025", monthlySales: 19800 },
          { month: "Apr 2025", monthlySales: 21500 },
          { month: "May 2025", monthlySales: 16000 },
          { month: "Jun 2025", monthlySales: 23000 },
          { month: "Jul 2025", monthlySales: 25000 },
        ]);

        setMonthlyAlerts([
          { month: "Jan 2025", alertCount: 2 },
          { month: "Feb 2025", alertCount: 3 },
          { month: "Mar 2025", alertCount: 1 },
          { month: "Apr 2025", alertCount: 4 },
          { month: "May 2025", alertCount: 3 },
          { month: "Jun 2025", alertCount: 5 },
          { month: "Jul 2025", alertCount: 2 },
        ]);

        setMonthlyStock([
          { month: "Jan 2025", monthlyStock: 500 },
          { month: "Feb 2025", monthlyStock: 800 },
          { month: "Mar 2025", monthlyStock: 600 },
          { month: "Apr 2025", monthlyStock: 750 },
          { month: "May 2025", monthlyStock: 900 },
          { month: "Jun 2025", monthlyStock: 680 },
          { month: "Jul 2025", monthlyStock: 700 },
        ]);

        setLoading(false); // Data load complete
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setLoading(false); // Even if error, stop loader
      }
    };

    fetchData();
  }, []);

  const quickStats = [
    {
      title: "Total Purchase",
      value: `$${totalPrice.toLocaleString()}`,
      color: "from-blue-500 to-indigo-600",
      icon: <FaShoppingCart className="text-white text-3xl" />,
    },
    {
      title: "Total Sales",
      value: `$${totalSales.toLocaleString()}`,
      color: "from-green-500 to-emerald-600",
      icon: <FaChartLine className="text-white text-3xl" />,
    },
    {
      title: "Stock Quantity",
      value: totalQuantity.toLocaleString(),
      color: "from-yellow-400 to-yellow-500",
      icon: <FaBoxes className="text-white text-3xl" />,
    },
    {
      title: "Item Alerts",
      value: totalItems.toLocaleString(),
      color: "from-red-500 to-rose-600",
      icon: <FaBell className="text-white text-3xl" />,
    },
    {
      title: "Total Profit",
      value: `$${(totalSales - totalPrice).toLocaleString()}`,
      color: "from-purple-500 to-violet-600",
      icon: <FaDollarSign className="text-white text-3xl" />,
    },
  ];

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[70vh]">
  //       <div className="w-16 h-16 border-[5px] border-dashed rounded-full animate-spin border-blue-500"></div>
  //     </div>
  //   );
  // }

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
    <div className="p-6 max-w-7xl mx-auto space-y-12">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {quickStats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-5 bg-gradient-to-br ${stat.color} shadow-xl hover:scale-[1.03] transform transition duration-300 text-white`}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium tracking-wide uppercase">{stat.title}</div>
              <div>{stat.icon}</div>
            </div>
            <div className="mt-3 text-3xl font-semibold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur shadow-lg rounded-2xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">📈 Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="monthlySales" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/70 backdrop-blur shadow-lg rounded-2xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">📦 Monthly Stock Quantity</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyStock}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Bar dataKey="monthlyStock" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts Chart */}
      <div className="bg-white/70 backdrop-blur shadow-lg rounded-2xl p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">🚨 Monthly Item Alerts</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyAlerts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Line type="monotone" dataKey="alertCount" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
