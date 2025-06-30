import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export default function AnalyticsOverview() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 text-center sm:text-left">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Analytics Overview
        </h2>
        <p className="text-sm text-gray-500">Track your business performance</p>
      </div>
      <div className="flex flex-col gap-2 items-center sm:flex-row sm:items-center sm:gap-2 sm:justify-end">
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Last 30 days
        </Button>
        <Badge variant="secondary">Live</Badge>
      </div>
    </div>
  );
}
