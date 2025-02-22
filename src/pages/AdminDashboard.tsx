
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, DollarSign, Users } from "lucide-react";

const stats = [
  {
    title: "Total Sales Reps",
    value: "45",
    icon: Users,
    change: "+12%",
  },
  {
    title: "Active Shops",
    value: "128",
    icon: Building2,
    change: "+4%",
  },
  {
    title: "Monthly Revenue",
    value: "$142,384",
    icon: DollarSign,
    change: "+18%",
  },
];

export default function AdminDashboard() {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-semibold mb-8">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
