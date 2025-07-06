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

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Dashboard = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);
  const [monthlyStock, setMonthlyStock] = useState([]);
  const [monthlyAlerts, setMonthlyAlerts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/total-purchase")
      .then(res => res.json())
      .then(data => setTotalPrice(data?.totalPrice || 0));

    fetch("http://localhost:3000/total-sales")
      .then(res => res.json())
      .then(data => setTotalSales(data?.totalPrice || 0));

    fetch("http://localhost:3000/total-quantity")
      .then(res => res.json())
      .then(data => setTotalQuantity(data?.totalQuantity || 0));

    fetch("http://localhost:3000/total-items")
      .then(res => res.json())
      .then(data => setTotalItems(data?.totalItems || 0));

    // === Fake Data for All Chart Sections ===
    const fakeSales = [
      { month: "Jan 2025", monthlySales: 12000 },
      { month: "Feb 2025", monthlySales: 17500 },
      { month: "Mar 2025", monthlySales: 19800 },
      { month: "Apr 2025", monthlySales: 21500 },
      { month: "May 2025", monthlySales: 16000 },
      { month: "Jun 2025", monthlySales: 23000 },
      { month: "Jul 2025", monthlySales: 25000 },
    ];
    setMonthlySales(fakeSales);

    const fakeAlerts = [
      { month: "Jan 2025", alertCount: 2 },
      { month: "Feb 2025", alertCount: 3 },
      { month: "Mar 2025", alertCount: 1 },
      { month: "Apr 2025", alertCount: 4 },
      { month: "May 2025", alertCount: 3 },
      { month: "Jun 2025", alertCount: 5 },
      { month: "Jul 2025", alertCount: 2 },
    ];
    setMonthlyAlerts(fakeAlerts);

    const fakeStock = [
      { month: "Jan 2025", monthlyStock: 500 },
      { month: "Feb 2025", monthlyStock: 800 },
      { month: "Mar 2025", monthlyStock: 600 },
      { month: "Apr 2025", monthlyStock: 750 },
      { month: "May 2025", monthlyStock: 900 },
      { month: "Jun 2025", monthlyStock: 680 },
      { month: "Jul 2025", monthlyStock: 700 },
    ];
    setMonthlyStock(fakeStock);
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
        {/* Monthly Sales */}
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

        {/* Monthly Stock */}
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

      {/* Alerts */}
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
