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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales vs Inventory</CardTitle>
        <CardDescription>
          Comparison of gadgets sold vs remaining inventory
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-4">
        <div className="w-full overflow-x-auto">
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
            className="h-[240px] min-w-[320px] sm:h-[300px] sm:min-w-[400px] md:min-w-[480px] lg:min-w-[560px]"
          >
            <BarChart data={data}>
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
        </div>
      </CardContent>
    </Card>
  );
}
