import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react";

interface AnalyticsData {
  totalGadgets: number;
  gadgetsSold: number;
  totalIncome: number;
  totalUsers: number;
}

interface AnalyticsCardsProps {
  data: AnalyticsData;
}

export default function AnalyticsCards({ data }: AnalyticsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const cards = [
    {
      title: "Total Gadgets",
      value: formatNumber(data.totalGadgets),
      change: "+12%",
      icon: Package,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Gadgets Sold",
      value: formatNumber(data.gadgetsSold),
      change: "+8%",
      icon: ShoppingCart,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Total Income",
      value: formatCurrency(data.totalIncome),
      change: "+15%",
      icon: DollarSign,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Total Users",
      value: formatNumber(data.totalUsers),
      change: "+23%",
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div
                className={`h-8 w-8 rounded-full ${card.iconBg} flex items-center justify-center`}
              >
                <Icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {card.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-600 font-medium">
                  {card.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
            <div
              className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${card.gradient}`}
            ></div>
          </Card>
        );
      })}
    </div>
  );
}
