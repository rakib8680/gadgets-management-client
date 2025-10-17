import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface UserGrowthData {
  week: string;
  users: number;
}

interface UserGrowthChartProps {
  data: UserGrowthData[];
}

export default function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>New users over time</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-4">
        <div className="w-full overflow-x-auto">
          <ChartContainer
            config={{
              users: {
                label: "New Users",
                color: "var(--foreground)",
              },
            }}
            className="h-[200px] min-w-[320px] sm:h-[250px] sm:min-w-[400px] md:min-w-[480px] lg:min-w-[560px]"
          >
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="users"
                stroke="var(--color-users)"
                strokeWidth={3}
                dot={{ fill: "currentColor", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
