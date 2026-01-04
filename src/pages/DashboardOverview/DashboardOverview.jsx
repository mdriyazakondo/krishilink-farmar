import AnalyticsSection from "./AnalyticsSection";
import TableSection from "./TableSection";
import DashboardCardSection from "./DashboardCardSection";

const DashboardOverview = () => {
  return (
    <div className="p-3 sm:p-5 md:p-8 space-y-6 md:space-y-8 bg-gray-50/50 min-h-screen max-w-[1600px] mx-auto overflow-hidden">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-3xl font-extrabold text-gray-800 leading-tight">
            Dashboard Overview
          </h2>
          <p className="text-gray-500 text-xs md:text-sm">
            Welcome back to your farming insights.
          </p>
        </div>
        <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all active:scale-95">
          Generate Report
        </button>
      </div>
      <DashboardCardSection />
      <AnalyticsSection />
      <TableSection />
    </div>
  );
};

export default DashboardOverview;
