
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const logs = [
  {
    id: 1,
    shop: "Mall of America",
    salesRep: "John Doe",
    checkIn: "2024-02-20 09:00 AM",
    checkOut: "2024-02-20 05:00 PM",
    sales: "$1,234",
  },
  {
    id: 2,
    shop: "Times Square Shop",
    salesRep: "Jane Smith",
    checkIn: "2024-02-20 08:30 AM",
    checkOut: "2024-02-20 04:30 PM",
    sales: "$2,567",
  },
];

export default function ActivityLogs() {
  const handleExport = () => {
    // TODO: Implement export functionality
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Activity Logs</h1>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shop</TableHead>
              <TableHead>Sales Rep</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Sales</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.shop}</TableCell>
                <TableCell>{log.salesRep}</TableCell>
                <TableCell>{log.checkIn}</TableCell>
                <TableCell>{log.checkOut}</TableCell>
                <TableCell>{log.sales}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
