import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from "recharts";

const salesDailyData = [
  { date: "2025-06-01", totalSales: 1500, totalItems: 35 },
  { date: "2025-06-02", totalSales: 1750, totalItems: 40 },
  { date: "2025-06-03", totalSales: 1600, totalItems: 38 },
];

const salesMonthlyData = [
  { month: "January", totalSales: 45000, totalItems: 1000 },
  { month: "February", totalSales: 48000, totalItems: 1100 },
  { month: "March", totalSales: 47000, totalItems: 1080 },
];

const purchaseReportData = {
  totalPurchases: 35000,
  totalItemsBought: 900,
  recentPurchases: [
    { supplier: "Supplier A", amount: 5000, date: "2025-06-01" },
    { supplier: "Supplier B", amount: 3000, date: "2025-06-03" },
    { supplier: "Supplier C", amount: 4000, date: "2025-06-05" },
  ],
};

const profitReportData = {
  totalProfit: 12000,
  profitMargin: "15%",
  topProducts: [
    { name: "Mobile Model A", profit: 5000 },
    { name: "Mobile Model B", profit: 3000 },
    { name: "Mobile Model C", profit: 4000 },
  ],
};

const lossReportData = {
  totalLoss: 2000,
  reasons: [
    { reason: "Damaged stock", value: 1200 },
    { reason: "Return & refunds", value: 800 },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ReportPage = () => {
  const [salesView, setSalesView] = useState("Daily");

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-16 font-sans text-gray-800">
      <h1 className="text-4xl font-extrabold text-center mb-10">📊 Reports Dashboard</h1>

      {/* Sales Report */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Sales Report</h2>

        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              salesView === "Daily" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSalesView("Daily")}
          >
            Daily
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              salesView === "Monthly" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSalesView("Monthly")}
          >
            Monthly
          </button>
        </div>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={salesView === "Daily" ? salesDailyData : salesMonthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={salesView === "Daily" ? "date" : "month"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalSales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Total Sales"
              />
              <Line
                type="monotone"
                dataKey="totalItems"
                stroke="#82ca9d"
                name="Items Sold"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Also keep the existing tables for clarity */}
        {salesView === "Daily" ? (
          <table className="w-full text-left border-collapse mt-6">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2">Date</th>
                <th className="py-2">Total Sales ($)</th>
                <th className="py-2">Items Sold</th>
              </tr>
            </thead>
            <tbody>
              {salesDailyData.map((day) => (
                <tr key={day.date} className="hover:bg-gray-100">
                  <td className="py-2">{day.date}</td>
                  <td className="py-2">${day.totalSales}</td>
                  <td className="py-2">{day.totalItems}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left border-collapse mt-6">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2">Month</th>
                <th className="py-2">Total Sales ($)</th>
                <th className="py-2">Items Sold</th>
              </tr>
            </thead>
            <tbody>
              {salesMonthlyData.map((month) => (
                <tr key={month.month} className="hover:bg-gray-100">
                  <td className="py-2">{month.month}</td>
                  <td className="py-2">${month.totalSales}</td>
                  <td className="py-2">{month.totalItems}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Purchase Report */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Purchase Report</h2>
        <p><strong>Total Purchases:</strong> ${purchaseReportData.totalPurchases}</p>
        <p><strong>Total Items Bought:</strong> {purchaseReportData.totalItemsBought}</p>
        <h3 className="font-semibold mt-4 mb-2">Recent Purchases</h3>
        <ul className="list-disc list-inside space-y-1">
          {purchaseReportData.recentPurchases.map((purchase, i) => (
            <li key={i}>
              {purchase.date} - {purchase.supplier}: ${purchase.amount}
            </li>
          ))}
        </ul>

        <div style={{ width: "100%", height: 300, marginTop: "1rem" }}>
          <ResponsiveContainer>
            <BarChart
              data={purchaseReportData.recentPurchases}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="supplier" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#82ca9d" name="Purchase Amount ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Profit Report */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Profit Report</h2>
        <p><strong>Total Profit:</strong> ${profitReportData.totalProfit}</p>
        <p><strong>Profit Margin:</strong> {profitReportData.profitMargin}</p>
        <h3 className="font-semibold mt-4 mb-2">Top Products</h3>
        <ul className="list-disc list-inside space-y-1">
          {profitReportData.topProducts.map((product, i) => (
            <li key={i}>
              {product.name}: ${product.profit}
            </li>
          ))}
        </ul>

        <div style={{ width: "100%", height: 300, marginTop: "1rem" }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={profitReportData.topProducts}
                dataKey="profit"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {profitReportData.topProducts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Loss Report */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Loss Report</h2>
        <p><strong>Total Loss:</strong> ${lossReportData.totalLoss}</p>
        <h3 className="font-semibold mt-4 mb-2">Reasons for Loss</h3>
        <ul className="list-disc list-inside space-y-1">
          {lossReportData.reasons.map((reasonObj, i) => (
            <li key={i}>{reasonObj.reason}</li>
          ))}
        </ul>

        <div style={{ width: "100%", height: 300, marginTop: "1rem" }}>
          <ResponsiveContainer>
            <BarChart
              data={lossReportData.reasons}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="reason" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#ff4d4d" name="Loss Amount ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default ReportPage;
