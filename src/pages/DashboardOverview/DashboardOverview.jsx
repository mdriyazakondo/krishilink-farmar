import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaBox, FaUsers, FaLeaf, FaArrowUp } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";

const DashboardOverview = () => {
  const stats = [
    {
      id: 1,
      label: "Total Crops",
      value: "124",
      icon: <FaLeaf />,
      color: "bg-green-500",
      trend: "+12%",
    },
    {
      id: 2,
      label: "Total Users",
      value: "1,250",
      icon: <FaUsers />,
      color: "bg-blue-500",
      trend: "+5%",
    },
    {
      id: 3,
      label: "Active Posts",
      value: "84",
      icon: <FaBox />,
      color: "bg-orange-500",
      trend: "+18%",
    },
    {
      id: 4,
      label: "Total Revenue",
      value: "$12,400",
      icon: <MdOutlinePayments />,
      color: "bg-emerald-600",
      trend: "+10%",
    },
  ];

  const barData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
  ];

  const pieData = [
    { name: "Vegetables", value: 400 },
    { name: "Fruits", value: 300 },
    { name: "Grains", value: 300 },
  ];
  const COLORS = ["#10b981", "#3b82f6", "#f59e0b"];

  const recentActivities = [
    {
      id: 101,
      user: "Abdur Rahman",
      crop: "Organic Tomato",
      status: "Active",
      price: "$40",
    },
    {
      id: 102,
      user: "Karim Uddin",
      crop: "Fresh Potato",
      status: "Pending",
      price: "$25",
    },
    {
      id: 103,
      user: "Sara Islam",
      crop: "Green Chili",
      status: "Active",
      price: "$15",
    },
    {
      id: 104,
      user: "Jabbar Ali",
      crop: "Sweet Pumpkin",
      status: "Closed",
      price: "$60",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm">
          Welcome back! Here's what's happening with your crops today.
        </p>
      </div>

      {/* 1. Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl text-white ${item.color}`}>
                {item.icon}
              </div>
              <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <FaArrowUp className="mr-1" /> {item.trend}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-400 text-sm font-medium">
                {item.label}
              </h3>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart - Left */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Crop Sales Analytics
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#f9fafb" }}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="sales"
                  fill="#22c55e"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Right */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Category Distribution
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Dynamic Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Recent Crop Posts</h3>
          <button className="text-green-600 text-sm font-semibold hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Farmer Name</th>
                <th className="px-6 py-4 font-semibold">Crop Name</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentActivities.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">
                        {row.user.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {row.user}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.crop}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">
                    {row.price}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        row.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : row.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-green-600 transition-colors">
                      •••
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
