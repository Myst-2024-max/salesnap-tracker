
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
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function CheckInOut() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  
  // Form states
  const [selectedShop, setSelectedShop] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [newShop, setNewShop] = useState({
    name: "",
    place: "",
    phone_number: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch shops
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

  // Add shop mutation
  const addShopMutation = useMutation({
    mutationFn: async (shopData: typeof newShop) => {
      const { error } = await supabase.from("shops").insert([shopData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shops"] });
      toast.success("Shop added successfully");
      setIsDialogOpen(false);
      setNewShop({ name: "", place: "", phone_number: "" });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleAddShop = async (e: React.FormEvent) => {
    e.preventDefault();
    addShopMutation.mutate(newShop);
  };

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Check In/Out</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Shop</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Shop</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddShop} className="space-y-4 mt-4">
              <Input
                placeholder="Shop Name"
                value={newShop.name}
                onChange={(e) =>
                  setNewShop({ ...newShop, name: e.target.value })
                }
                required
              />
              <Input
                placeholder="Location"
                value={newShop.place}
                onChange={(e) =>
                  setNewShop({ ...newShop, place: e.target.value })
                }
                required
              />
              <Input
                placeholder="Phone Number"
                value={newShop.phone_number}
                onChange={(e) =>
                  setNewShop({ ...newShop, phone_number: e.target.value })
                }
                required
              />
              <Button
                type="submit"
                className="w-full"
                disabled={addShopMutation.isPending}
              >
                {addShopMutation.isPending ? "Adding..." : "Add Shop"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {isCheckedIn ? "Currently Checked In" : "Check In to Shop"}
          </CardTitle>
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
                <SelectItem key={shop.id} value={shop.name}>
                  {shop.name}
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
