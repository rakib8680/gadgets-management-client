"use client";

import { useState, useEffect } from "react";
import { Edit, Save } from "lucide-react";
import type {
  TProduct,
  TCategory,
  TOperatingSystem,
  TPowerSource,
  TConnectivity,
} from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface UpdateGadgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gadget: TProduct | null;
}

const connectivityOptions: TConnectivity[] = [
  "WiFi",
  "Bluetooth",
  "NFC",
  "GPS",
  "4G",
  "5G",
  "USB",
  "HDMI",
  "Thunderbolt",
];

const UpdateGadgetModal = ({
  open,
  onOpenChange,
  gadget,
}: UpdateGadgetModalProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    modelNo: "",
    price: "",
    quantity: "",
    category: "" as TCategory,
    operatingSystem: "" as TOperatingSystem,
    powerSource: "" as TPowerSource,
    connectivity: [] as TConnectivity[],
    weight: "",
    imageURL: "",
  });

  // Update form data when gadget changes
  useEffect(() => {
    if (gadget) {
      setFormData({
        name: gadget.name,
        brand: gadget.brand,
        modelNo: gadget.modelNo,
        price: gadget.price.toString(),
        quantity: gadget.quantity.toString(),
        category: gadget.category,
        operatingSystem: gadget.operatingSystem || "iOS",
        powerSource: gadget.powerSource,
        connectivity: gadget.connectivity,
        weight: gadget.weight?.toString() || "",
        imageURL: gadget.imageURL,
      });
    }
  }, [gadget]);

  const handleUpdate = async () => {
    if (!gadget) return;

    setIsUpdating(true);
    try {
      const updatedGadget: Partial<TProduct> = {
        ...gadget,
        name: formData.name,
        brand: formData.brand,
        modelNo: formData.modelNo,
        price: Number.parseFloat(formData.price),
        quantity: Number.parseInt(formData.quantity),
        category: formData.category,
        operatingSystem: formData.operatingSystem,
        powerSource: formData.powerSource,
        connectivity: formData.connectivity,
        weight: formData.weight
          ? Number.parseFloat(formData.weight)
          : undefined,
        imageURL: formData.imageURL,
      };

      // Replace with your actual update API call
      // await updateGadgetMutation({ id: gadget.seller_id + gadget.modelNo, data: updatedGadget })

      toast.success("Gadget updated", {
        description: `${formData.name} has been successfully updated.`,
        duration: 2000,
      });

      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update gadget. Please try again.", {
        duration: 2000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConnectivityChange = (
    connectivity: TConnectivity,
    checked: boolean
  ) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        connectivity: [...prev.connectivity, connectivity],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        connectivity: prev.connectivity.filter((c) => c !== connectivity),
      }));
    }
  };

  if (!gadget) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Update Gadget
          </DialogTitle>
          <DialogDescription>
            Make changes to your gadget. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Image Preview */}
          <div className="flex items-center gap-4 p-3 border rounded-lg">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img
                src={gadget.imageURL || "/placeholder.svg?height=64&width=64"}
                alt={gadget.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">Current Product</p>
              <p className="text-sm text-muted-foreground">{gadget.name}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="update-name">Product Name</Label>
                <Input
                  id="update-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <Label htmlFor="update-brand">Brand</Label>
                <Input
                  id="update-brand"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  placeholder="Enter brand name"
                />
              </div>

              <div>
                <Label htmlFor="update-modelNo">Model Number</Label>
                <Input
                  id="update-modelNo"
                  value={formData.modelNo}
                  onChange={(e) =>
                    setFormData({ ...formData, modelNo: e.target.value })
                  }
                  placeholder="Enter model number"
                />
              </div>

              <div>
                <Label htmlFor="update-imageURL">Image URL</Label>
                <Input
                  id="update-imageURL"
                  value={formData.imageURL}
                  onChange={(e) =>
                    setFormData({ ...formData, imageURL: e.target.value })
                  }
                  placeholder="Enter image URL"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="update-price">Price ($)</Label>
                  <Input
                    id="update-price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="update-quantity">Quantity</Label>
                  <Input
                    id="update-quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="update-weight">Weight (grams)</Label>
                <Input
                  id="update-weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  placeholder="Enter weight"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="update-category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value as TCategory })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smartphone">Smartphone</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="smartwatch">Smartwatch</SelectItem>
                    <SelectItem value="headphone">Headphone</SelectItem>
                    <SelectItem value="speaker">Speaker</SelectItem>
                    <SelectItem value="accessory">Accessory</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="update-operatingSystem">Operating System</Label>
                <Select
                  value={formData.operatingSystem}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      operatingSystem: value as TOperatingSystem,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select OS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iOS">iOS</SelectItem>
                    <SelectItem value="Android">Android</SelectItem>
                    <SelectItem value="Windows">Windows</SelectItem>
                    <SelectItem value="macOS">macOS</SelectItem>
                    <SelectItem value="Linux">Linux</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="update-powerSource">Power Source</Label>
                <Select
                  value={formData.powerSource}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      powerSource: value as TPowerSource,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select power source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Battery">Battery</SelectItem>
                    <SelectItem value="Plug-in">Plug-in</SelectItem>
                    <SelectItem value="Battery & Plug-in">
                      Battery & Plug-in
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Connectivity Options</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 max-h-32 overflow-y-auto border rounded-md p-3">
                  {connectivityOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`connectivity-${option}`}
                        checked={formData.connectivity.includes(option)}
                        onCheckedChange={(checked) =>
                          handleConnectivityChange(option, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`connectivity-${option}`}
                        className="text-sm"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={isUpdating || !formData.name.trim()}
          >
            {isUpdating ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isUpdating ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGadgetModal;
