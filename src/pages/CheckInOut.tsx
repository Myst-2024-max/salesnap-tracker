
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const shops = [
  "Mall of America",
  "Times Square Shop",
  "Downtown LA Store",
  "Chicago Loop Store",
  "Miami Beach Shop",
];

export default function CheckInOut() {
  const [selectedShop, setSelectedShop] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckIn = () => {
    if (!selectedShop) {
      toast.error("Please select a shop first");
      return;
    }
    setIsCheckedIn(true);
    toast.success(`Checked in at ${selectedShop}`);
  };

  const handleCheckOut = () => {
    if (!saleAmount) {
      toast.error("Please enter sales amount");
      return;
    }
    setIsCheckedIn(false);
    setSelectedShop("");
    setSaleAmount("");
    toast.success("Successfully checked out");
  };

  return (
    <div className="max-w-md mx-auto animate-fadeIn">
      <h1 className="text-3xl font-semibold mb-8">Check In/Out</h1>
      <Card>
        <CardHeader>
          <CardTitle>{isCheckedIn ? "Currently Checked In" : "Check In to Shop"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={selectedShop}
            onValueChange={setSelectedShop}
            disabled={isCheckedIn}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a shop" />
            </SelectTrigger>
            <SelectContent>
              {shops.map((shop) => (
                <SelectItem key={shop} value={shop}>
                  {shop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {isCheckedIn && (
            <div className="space-y-4">
              <Input
                type="number"
                placeholder="Enter sales amount"
                value={saleAmount}
                onChange={(e) => setSaleAmount(e.target.value)}
              />
            </div>
          )}

          <Button
            className="w-full"
            onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
          >
            {isCheckedIn ? "Check Out" : "Check In"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
