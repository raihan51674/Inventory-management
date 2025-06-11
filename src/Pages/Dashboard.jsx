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

// Quick stats data
const quickStats = [
  {
    title: "Total Sales",
    value: "$23,400",
    color: "bg-blue-600",
  },
  {
    title: "Stock Alert",
    value: "12 Items",
    color: "bg-yellow-500",
  },
  {
    title: "Profit",
    value: "$5,800",
    color: "bg-green-600",
  },
];

// Sales data for line chart
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 7000 },
  { name: "May", sales: 6000 },
];

// Purchase data for bar chart
const purchaseData = [
  { name: "Week 1", purchase: 2000 },
  { name: "Week 2", purchase: 3200 },
  { name: "Week 3", purchase: 2800 },
  { name: "Week 4", purchase: 3900 },
];

// Inventory summary data
const inventorySummary = {
  totalMobilesInStock: 150,
  topSellingMobiles: [
    { name: "Mobile Model A", sold: 120 },
    { name: "Mobile Model B", sold: 85 },
    { name: "Mobile Model C", sold: 70 },
  ],
  stockAlerts: [
    { name: "Mobile Model D", stock: 3 },
    { name: "Mobile Model E", stock: 5 },
    { name: "Mobile Model F", stock: 2 },
  ],
};

const Dashboard = () => {
  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto font-sans text-gray-800">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickStats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-xl shadow-md p-6 text-white ${stat.color}`}
          >
            <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Sales & Purchase Summary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales Line Chart */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Purchase Summary Bar Chart */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Purchase Summary</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={purchaseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="purchase" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inventory Summary */}
      <section className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Inventory Summary</h2>
        <p className="mb-4 text-lg">
          <strong>Total Mobiles in Stock:</strong> {inventorySummary.totalMobilesInStock}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Selling Mobiles */}
          <div>
            <h3 className="font-semibold mb-2">Top Selling Mobiles</h3>
            <ul className="list-disc list-inside space-y-1">
              {inventorySummary.topSellingMobiles.map((mobile, idx) => (
                <li key={idx}>
                  {mobile.name} - Sold: {mobile.sold}
                </li>
              ))}
            </ul>
          </div>

          {/* Stock Alerts */}
          <div>
            <h3 className="font-semibold mb-2 text-yellow-600">Stock Alerts (Low Stock)</h3>
            <ul className="list-disc list-inside space-y-1">
              {inventorySummary.stockAlerts.map((item, idx) => (
                <li key={idx}>
                  {item.name} - Only {item.stock} left
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
