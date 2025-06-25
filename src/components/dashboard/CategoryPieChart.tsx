

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CategoryData {
  name: string;
  value: number;
}

interface CategoryPieChartProps {
  data: CategoryData[];
}

const PIE_COLORS = [
  "oklch(0.18 0 0)", // darkest
  "oklch(0.28 0 0)", // dark
  "oklch(0.38 0 0)", // medium-dark
  "oklch(0.48 0 0)", // medium
];

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  return (
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
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
            >
              {data.map((entry, index) => (
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
  );
}
