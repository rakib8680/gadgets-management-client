import { useState, useEffect } from "react";
import { Copy, Plus } from "lucide-react";
import type {
  TProduct,
  TCategory,
  TOperatingSystem,
  TPowerSource,
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCreateGadgetMutation } from "@/redux/features/productsApi";

interface DuplicateGadgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gadget: TProduct | null;
}

const DuplicateGadgetModal = ({
  open,
  onOpenChange,
  gadget,
}: DuplicateGadgetModalProps) => {
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [duplicateGadget] = useCreateGadgetMutation();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    modelNo: "",
    price: "",
    quantity: "",
    category: "" as TCategory,
    operatingSystem: "" as TOperatingSystem,
    powerSource: "" as TPowerSource,
  });

  // Update form data when gadget changes
  useEffect(() => {
    if (gadget) {
      setFormData({
        name: `${gadget.name} (Copy)`,
        brand: gadget.brand,
        modelNo: `${gadget.modelNo}-COPY`,
        price: gadget.price.toString(),
        quantity: gadget.quantity.toString(),
        category: gadget.category,
        operatingSystem: gadget.operatingSystem || "iOS",
        powerSource: gadget.powerSource,
      });
    }
  }, [gadget]);

  const handleDuplicate = async () => {
    if (!gadget) return;

    setIsDuplicating(true);
    try {
      const duplicatedGadget: Partial<TProduct> = {
        ...gadget,
        name: formData.name,
        brand: formData.brand,
        modelNo: formData.modelNo,
        price: Number.parseFloat(formData.price),
        quantity: Number.parseInt(formData.quantity),
        category: formData.category,
        operatingSystem: formData.operatingSystem,
        powerSource: formData.powerSource,
        releaseDate: new Date(), // Set current date for duplicate
      };

      // Replace with your actual duplicate/create API call
      const res = await duplicateGadget(duplicatedGadget).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Gadget duplicated", {
          description: `${formData.name} has been successfully created.`,
          duration: 2000,
        });
        onOpenChange(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to duplicate gadget. Please try again.", {
        duration: 2000,
      });
    } finally {
      setIsDuplicating(false);
    }
  };

  if (!gadget) return null;

  const getCategoryColor = (category: string) => {
    const colors = {
      smartphone: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      tablet: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      laptop: "bg-green-100 text-green-800 hover:bg-green-100",
      smartwatch: "bg-orange-100 text-orange-800 hover:bg-orange-100",
      headphone: "bg-pink-100 text-pink-800 hover:bg-pink-100",
      speaker: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
      accessory: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Copy className="h-5 w-5" />
            Duplicate Gadget
          </DialogTitle>
          <DialogDescription>
            Create a copy of this gadget. You can modify the details before
            creating.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Original Gadget Preview */}
          <div className="p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={gadget.imageURL || "/placeholder.svg?height=48&width=48"}
                  alt={gadget.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  Original: {gadget.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    className={getCategoryColor(gadget.category)}
                    variant="outline"
                  >
                    {gadget.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    ${gadget.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  placeholder="Enter brand name"
                />
              </div>

              <div>
                <Label htmlFor="modelNo">Model Number</Label>
                <Input
                  id="modelNo"
                  value={formData.modelNo}
                  onChange={(e) =>
                    setFormData({ ...formData, modelNo: e.target.value })
                  }
                  placeholder="Enter model number"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
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
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
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
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="operatingSystem">Operating System</Label>
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
                <Label htmlFor="powerSource">Power Source</Label>
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
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleDuplicate}
            disabled={isDuplicating || !formData.name.trim()}
          >
            {isDuplicating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Duplicate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateGadgetModal;
