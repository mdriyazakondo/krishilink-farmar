import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AnalyticsSection = () => {
  // ডামি ডেটা (আপনি চাইলে এগুলো প্রপস হিসেবেও নিতে পারেন)
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

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
      {/* 1. Bar Chart Container */}
      <div className="xl:col-span-2 bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="mb-6">
          <h3 className="text-base md:text-lg font-bold text-gray-800">
            Sales Analytics
          </h3>
          <p className="text-xs text-gray-400 font-medium">
            Monthly performance overview
          </p>
        </div>

        {/* Responsive Bar Chart Wrapper */}
        <div className="h-[250px] sm:h-[300px] md:h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
              />
              <Tooltip
                cursor={{ fill: "#f9fafb" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
              />
              <Bar
                dataKey="sales"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
                // মোবাইল স্ক্রিনে বারের সাইজ ছোট করার জন্য চেক
                barSize={
                  typeof window !== "undefined" && window.innerWidth < 640
                    ? 18
                    : 35
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Pie Chart Container */}
      <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
        <div className="mb-2">
          <h3 className="text-base md:text-lg font-bold text-gray-800">
            Categories
          </h3>
          <p className="text-xs text-gray-400">Distribution by type</p>
        </div>

        {/* Responsive Pie Chart Wrapper */}
        <div className="h-[280px] sm:h-[320px] md:h-[350px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius="58%"
                outerRadius="78%"
                paddingAngle={6}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "20px",
                  fontWeight: "500",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
