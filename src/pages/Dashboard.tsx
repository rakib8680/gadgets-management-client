"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  Calendar,
  MoreHorizontal,
  Bell,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function Dashboard() {
  // Sample data - replace with your actual data
  const analyticsData = {
    totalGadgets: 1247,
    gadgetsSold: 892,
    totalIncome: 45680,
    totalUsers: 2341,
  };

  // Sample chart data - replace with your actual data
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

  const PIE_COLORS = [
    "oklch(0.18 0 0)", // darkest
    "oklch(0.28 0 0)", // dark
    "oklch(0.38 0 0)", // medium-dark
    "oklch(0.48 0 0)", // medium
  ];

  const topProducts = [
    { name: "iPhone 15 Pro", sales: 145, revenue: 145000 },
    { name: "MacBook Air M3", sales: 89, revenue: 89000 },
    { name: "iPad Pro", sales: 76, revenue: 76000 },
    { name: "AirPods Pro", sales: 134, revenue: 26800 },
    { name: "Apple Watch", sales: 98, revenue: 39200 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Export Data</DropdownMenuItem>
                <DropdownMenuItem>View Reports</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Date Range Selector */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Analytics Overview
            </h2>
            <p className="text-sm text-gray-500">
              Track your business performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Badge variant="secondary">Live</Badge>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Gadgets */}
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Gadgets
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Package className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatNumber(analyticsData.totalGadgets)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-600 font-medium">+12%</span> from
                last month
              </p>
            </CardContent>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          </Card>

          {/* Gadgets Sold */}
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Gadgets Sold
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatNumber(analyticsData.gadgetsSold)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-600 font-medium">+8%</span> from
                last month
              </p>
            </CardContent>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
          </Card>

          {/* Total Income */}
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Income
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(analyticsData.totalIncome)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-600 font-medium">+15%</span> from
                last month
              </p>
            </CardContent>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
          </Card>

          {/* Total Users */}
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Users
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatNumber(analyticsData.totalUsers)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-600 font-medium">+23%</span> from
                last month
              </p>
            </CardContent>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>
                Monthly revenue over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    fill="var(--color-revenue)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Sales vs Inventory Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sales vs Inventory</CardTitle>
              <CardDescription>
                Comparison of gadgets sold vs remaining inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  sold: {
                    label: "Sold",
                    color: "hsl(var(--chart-2))",
                  },
                  remaining: {
                    label: "Remaining",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <BarChart data={inventoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sold" fill="var(--color-sold)" radius={4} />
                  <Bar
                    dataKey="remaining"
                    fill="var(--color-remaining)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>New users over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  users: {
                    label: "New Users",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[250px]"
              >
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#a3a3a3"
                    strokeWidth={3}
                    dot={{ fill: "#000", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Product Categories Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
              <CardDescription>Sales distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  smartphones: {
                    label: "Smartphones",
                    color: "hsl(var(--chart-1))",
                  },
                  laptops: {
                    label: "Laptops",
                    color: "hsl(var(--chart-2))",
                  },
                  tablets: {
                    label: "Tablets",
                    color: "hsl(var(--chart-3))",
                  },
                  accessories: {
                    label: "Accessories",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[250px]"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Performing Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best selling gadgets this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => {
                  // Define shades of black for the gradient
                  const BLACK_SHADES = [
                    "oklch(0.18 0 0)", // darkest
                    "oklch(0.28 0 0)", // dark
                    "oklch(0.38 0 0)", // medium-dark
                    "oklch(0.48 0 0)", // medium
                    "oklch(0.58 0 0)", // lightest
                  ];
                  const gradient = `linear-gradient(90deg, ${BLACK_SHADES.join(
                    ", "
                  )})`;
                  return (
                    <div
                      key={product.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ background: gradient }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">
                            {product.sales} sold
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">
                          {formatCurrency(product.revenue)}
                        </p>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${(product.sales / 150) * 100}%`,
                              background: gradient,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
