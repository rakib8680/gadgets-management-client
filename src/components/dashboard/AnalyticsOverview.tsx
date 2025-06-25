

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export default function AnalyticsOverview() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Analytics Overview
        </h2>
        <p className="text-sm text-gray-500">Track your business performance</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Last 30 days
        </Button>
        <Badge variant="secondary">Live</Badge>
      </div>
    </div>
  );
}
