
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Clock } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Check-ins</CardTitle>
            <Building2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last check-in: 2 hours ago
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Hours Today</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.5</div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: 8 hours
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
