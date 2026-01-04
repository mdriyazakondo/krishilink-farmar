import React from "react";
import { FaEllipsisH } from "react-icons/fa";

const TableSection = () => {
  const recentActivities = [
    {
      id: 101,
      user: "Abdur Rahman",
      crop: "Tomato",
      status: "Active",
      price: "৳40",
    },
    {
      id: 102,
      user: "Karim Uddin",
      crop: "Potato",
      status: "Pending",
      price: "৳25",
    },
    {
      id: 103,
      user: "Sara Islam",
      crop: "Chili",
      status: "Active",
      price: "৳15",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full max-w-full mx-auto">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-50 flex justify-between items-center">
        <h3 className="text-base md:text-lg font-bold text-gray-800 tracking-tight">
          Recent Posts
        </h3>
        <button className="text-green-600 text-xs font-bold hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors">
          View All
        </button>
      </div>

      {/* Table Wrapper for Horizontal Scroll */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-[10px] md:text-xs uppercase font-bold tracking-wider">
              <th className="px-5 py-4">Farmer</th>
              <th className="px-5 py-4">Crop</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentActivities.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-green-50/30 transition-all duration-200 group"
              >
                {/* Farmer Column */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-[10px] shadow-sm border border-green-200 uppercase">
                      {row.user.charAt(0)}
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-gray-700 group-hover:text-green-700 transition-colors">
                      {row.user}
                    </span>
                  </div>
                </td>

                {/* Crop Column */}
                <td className="px-5 py-4 text-xs md:text-sm text-gray-600 whitespace-nowrap font-medium italic">
                  {row.crop}
                </td>

                {/* Price Column */}
                <td className="px-5 py-4 text-xs md:text-sm font-bold text-gray-900 whitespace-nowrap">
                  {row.price}
                </td>

                {/* Status Column */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-extrabold border shadow-sm ${
                      row.status === "Active"
                        ? "bg-green-50 text-green-600 border-green-100"
                        : "bg-yellow-50 text-yellow-600 border-yellow-100"
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full mr-1.5 ${
                        row.status === "Active"
                          ? "bg-green-600"
                          : "bg-yellow-600"
                      }`}
                    ></span>
                    {row.status}
                  </span>
                </td>

                {/* Action Column */}
                <td className="px-5 py-4 text-right">
                  <button className="text-gray-300 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all active:scale-90">
                    <FaEllipsisH size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optional Mobile Footer Hint */}
      <div className="xl:hidden bg-gray-50/50 py-2 border-t border-gray-50 text-center">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter italic">
          ← Swipe left or right to see more details →
        </p>
      </div>
    </div>
  );
};

export default TableSection;
