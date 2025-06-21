// components/TopProducts.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Product {
  name: string;
  sales: number;
  revenue: number;
}

interface TopProductsProps {
  products: Product[];
}

export default function TopProducts({ products }: TopProductsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const BLACK_SHADES = [
    "oklch(0.18 0 0)", // darkest
    "oklch(0.28 0 0)", // dark
    "oklch(0.38 0 0)", // medium-dark
    "oklch(0.48 0 0)", // medium
    "oklch(0.58 0 0)", // lightest
  ];

  const gradient = `linear-gradient(90deg, ${BLACK_SHADES.join(", ")})`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Best selling gadgets this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
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
                  <p className="text-xs text-gray-500">{product.sales} sold</p>
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
