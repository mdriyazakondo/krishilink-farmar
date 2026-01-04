import { FaLeaf, FaUsers, FaBox, FaArrowUp } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";

const DashboardCardSection = () => {
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
      value: "৳12,400",
      icon: <MdOutlinePayments />,
      color: "bg-emerald-600",
      trend: "+10%",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((item) => (
        <div
          key={item.id}
          className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex justify-between items-start">
            <div
              className={`p-2.5 rounded-xl text-white shadow-sm ${item.color}`}
            >
              <span className="text-base md:text-xl">{item.icon}</span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center border border-green-100">
                <FaArrowUp className="mr-0.5 text-[8px]" /> {item.trend}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              {item.label}
            </h3>
            <p className="text-lg md:text-2xl font-extrabold text-gray-800 mt-1">
              {item.value}
            </p>
          </div>

          <div className="mt-3 w-full bg-gray-50 h-1 rounded-full overflow-hidden">
            <div className={`${item.color} h-full w-2/3 opacity-20`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCardSection;
