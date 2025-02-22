
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, DollarSign, Users } from "lucide-react";

const stats = [
  {
    title: "Total Check-ins Today",
    value: "24",
    icon: Building2,
    change: "+8%",
  },
  {
    title: "Active Sales Reps",
    value: "12",
    icon: Users,
    change: "+2%",
  },
  {
    title: "Total Sales Today",
    value: "$8,234",
    icon: DollarSign,
    change: "+12%",
  },
];

export default function Dashboard() {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
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
