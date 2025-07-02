import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AnalyticsOverview from "@/components/dashboard/AnalyticsOverview";
import AnalyticsCards from "@/components/dashboard/AnalyticsCards";
import RevenueChart from "@/components/dashboard/RevenueChart";
import InventoryChart from "@/components/dashboard/InventoryChart";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import CategoryPieChart from "@/components/dashboard/CategoryPieChart";
import TopProducts from "@/components/dashboard/TopProducts";

export default function Analytics() {
  //todo- Sample data - replace with actual data
  const analyticsData = {
    totalGadgets: 1247,
    gadgetsSold: 892,
    totalIncome: 45680,
    totalUsers: 2341,
  };

  const revenueData = [
    { month: "Jan", revenue: 32000 },
    { month: "Feb", revenue: 28000 },
    { month: "Mar", revenue: 35000 },
    { month: "Apr", revenue: 42000 },
    { month: "May", revenue: 38000 },
    { month: "Jun", revenue: 45680 },
  ];

  const inventoryData = [
    { category: "Smartphones", sold: 245, remaining: 155 },
    { category: "Laptops", sold: 180, remaining: 220 },
    { category: "Tablets", sold: 120, remaining: 80 },
    { category: "Accessories", sold: 347, remaining: 253 },
  ];

  const userGrowthData = [
    { week: "W1", users: 45 },
    { week: "W2", users: 52 },
    { week: "W3", users: 48 },
    { week: "W4", users: 61 },
    { week: "W5", users: 55 },
    { week: "W6", users: 67 },
  ];

  const categoryData = [
    { name: "Smartphones", value: 35 },
    { name: "Laptops", value: 25 },
    { name: "Tablets", value: 20 },
    { name: "Accessories", value: 20 },
  ];

  const topProducts = [
    { name: "iPhone 15 Pro", sales: 145, revenue: 145000 },
    { name: "MacBook Air M3", sales: 89, revenue: 89000 },
    { name: "iPad Pro", sales: 76, revenue: 76000 },
    { name: "AirPods Pro", sales: 134, revenue: 26800 },
    { name: "Apple Watch", sales: 98, revenue: 39200 },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 mb-10">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="p-2 sm:p-4 md:p-6">
        {/* Analytics Overview Section */}
        <AnalyticsOverview />

        {/* Analytics Cards */}
        <AnalyticsCards data={analyticsData} />

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mb-8">
          <RevenueChart data={revenueData} />
          <InventoryChart data={inventoryData} />
        </div>

        {/* Additional Charts Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6 mb-8">
          <UserGrowthChart data={userGrowthData} />
          <CategoryPieChart data={categoryData} />
          <TopProducts products={topProducts} />
        </div>
      </main>
    </div>
  );
}
