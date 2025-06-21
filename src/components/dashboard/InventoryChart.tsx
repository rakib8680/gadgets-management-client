// components/InventoryChart.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface InventoryData {
  category: string;
  sold: number;
  remaining: number;
}

interface InventoryChartProps {
  data: InventoryData[];
}

export default function InventoryChart({ data }: InventoryChartProps) {
  return (
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
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="sold" fill="var(--color-sold)" radius={4} />
            <Bar dataKey="remaining" fill="var(--color-remaining)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
