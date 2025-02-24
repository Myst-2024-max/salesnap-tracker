
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, IndianRupee } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  // Fetch all shops
  const { data: shops = [] } = useQuery({
    queryKey: ["shops"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shops")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  // Fetch today's check-ins
  const { data: checkInsData } = useQuery({
    queryKey: ["todayCheckIns"],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from("check_ins")
        .select("*")
        .gte('created_at', today.toISOString())
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Fetch today's sales
  const { data: salesData } = useQuery({
    queryKey: ["todaySales"],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from("check_ins")
        .select("sales_amount")
        .gte('created_at', today.toISOString());
        
      if (error) throw error;
      
      const totalSales = data?.reduce((sum, record) => sum + (record.sales_amount || 0), 0);
      return totalSales || 0;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Get the last check-in time
  const lastCheckIn = checkInsData?.[0]?.created_at
    ? new Date(checkInsData[0].created_at)
    : null;

  // Calculate time difference for last check-in
  const getLastCheckInText = () => {
    if (!lastCheckIn) return "No check-ins today";
    
    const diff = Math.floor((new Date().getTime() - lastCheckIn.getTime()) / (1000 * 60));
    if (diff < 60) return `${diff} minutes ago`;
    return `${Math.floor(diff / 60)} hours ago`;
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Check-ins</CardTitle>
            <Building2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{checkInsData?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last check-in: {getLastCheckInText()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <IndianRupee className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{salesData?.toLocaleString('en-IN') || '0'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All sales today
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Shops</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell className="font-medium">{shop.name}</TableCell>
                  <TableCell>{shop.place}</TableCell>
                  <TableCell>{shop.phone_number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
