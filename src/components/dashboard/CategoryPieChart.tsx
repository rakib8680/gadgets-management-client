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
  "var(--foreground)",
  "color-mix(in oklab, var(--foreground) 70%, transparent)",
  "color-mix(in oklab, var(--foreground) 50%, transparent)",
  "color-mix(in oklab, var(--foreground) 30%, transparent)",
];

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Categories</CardTitle>
        <CardDescription>Sales distribution by category</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-4">
        <div className="w-full overflow-x-hidden">
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
            className="h-[200px] min-w-[320px] sm:h-[250px] sm:min-w-[400px] md:min-w-[480px]"
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
        </div>
      </CardContent>
    </Card>
  );
}
