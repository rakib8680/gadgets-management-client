import { useState, useEffect } from "react";
import { Copy, Plus } from "lucide-react";
import type { TProduct } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCreateGadgetMutation } from "@/redux/features/productsApi";
import { FieldValues, useForm } from "react-hook-form";

import GM_Select from "@/components/form/GM_Select";
import { FormProvider } from "react-hook-form";
import getCategoryColor from "@/utils/getCategoryColor";
import GM_Input from "@/components/form/GM_Input";
import GM_Form from "@/components/form/GM_Form";

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
  const methods = useForm();
  const { register, handleSubmit, reset, control } = methods;

  // Reset form when gadget changes
  useEffect(() => {
    if (gadget) {
      reset({
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
  }, [gadget, reset]);

  // Handle form submission to duplicate gadget
  const onSubmit = async (data: FieldValues) => {
    if (!gadget) return;
    setIsDuplicating(true);
    try {
      const duplicatedGadget: Partial<TProduct> = {
        name: data.name,
        price: Number.parseFloat(data.price),
        imageURL:
          gadget.imageURL ||
          "https://images.squarespace-cdn.com/content/v1/530cd931e4b0e49b19b254ec/ef572341-cfa5-48b4-823e-195af17cbcf3/final+logo++copy-1+%281%29.png",
        quantity: Number.parseInt(data.quantity),
        releaseDate: new Date(), // Set current date for duplicate
        brand: data.brand,
        modelNo: data.modelNo,
        category: data.category,
        operatingSystem: data.operatingSystem,
        connectivity: gadget.connectivity,
        powerSource: data.powerSource,
        features: gadget.features,
        weight: gadget.weight,
        dimensions: gadget.dimensions,
        compatibility: gadget.compatibility,
      };

      const res = await duplicateGadget(duplicatedGadget).unwrap();
      if (res.success) {
        toast.success("Gadget duplicated", {
          description: `${data.name} has been successfully created.`,
          duration: 2000,
        });
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to duplicate gadget. Please try again.", {
        duration: 2000,
      });
    } finally {
      setIsDuplicating(false);
    }
  };

  if (!gadget) return null;

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

        {/* main content */}
        <div className="space-y-4 py-4">
          {/* Original Gadget Preview */}
          <div className="p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={
                    gadget.imageURL ||
                    "https://images.squarespace-cdn.com/content/v1/530cd931e4b0e49b19b254ec/ef572341-cfa5-48b4-823e-195af17cbcf3/final+logo++copy-1+%281%29.png"
                  }
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
          <GM_Form
            onSubmit={onSubmit}
            defaultValues={
              gadget
                ? {
                    name: `${gadget.name} (Copy)`,
                    brand: gadget.brand,
                    modelNo: `${gadget.modelNo}-COPY`,
                    price: gadget.price.toString(),
                    quantity: gadget.quantity.toString(),
                    category: gadget.category,
                    operatingSystem: gadget.operatingSystem || "iOS",
                    powerSource: gadget.powerSource,
                  }
                : {}
            }
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <GM_Input
                name="name"
                label="Product Name"
                required
                placeholder="Enter product name"
              />
              <GM_Input
                name="brand"
                label="Brand"
                required
                placeholder="Enter brand name"
              />
              <GM_Input
                name="modelNo"
                label="Model Number"
                required
                placeholder="Enter model number"
              />
              <GM_Select
                name="category"
                label="Category"
                required
                options={[
                  { value: "smartphone", label: "Smartphone" },
                  { value: "tablet", label: "Tablet" },
                  { value: "laptop", label: "Laptop" },
                  { value: "smartwatch", label: "Smartwatch" },
                  { value: "headphone", label: "Headphone" },
                  { value: "speaker", label: "Speaker" },
                  { value: "camera", label: "Camera" },
                  { value: "console", label: "Console" },
                  { value: "drone", label: "Drone" },
                  { value: "television", label: "Television" },
                  { value: "accessory", label: "Accessory" },
                ]}
              />
            </div>
            <div className="space-y-4">
              <GM_Input
                name="price"
                label="Price ($)"
                type="number"
                required
                placeholder="0.00"
              />
              <GM_Input
                name="quantity"
                label="Quantity"
                type="number"
                required
                placeholder="0"
              />
              <GM_Select
                name="operatingSystem"
                label="Operating System"
                required
                options={[
                  { value: "iOS", label: "iOS" },
                  { value: "Android", label: "Android" },
                  { value: "Windows", label: "Windows" },
                  { value: "macOS", label: "macOS" },
                  { value: "Linux", label: "Linux" },
                ]}
              />
              <GM_Select
                name="powerSource"
                label="Power Source"
                required
                options={[
                  { value: "Battery", label: "Battery" },
                  { value: "Plug-in", label: "Plug-in" },
                  { value: "Battery & Plug-in", label: "Battery & Plug-in" },
                ]}
              />
            </div>
            <div className="col-span-2 flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isDuplicating}>
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
            </div>
          </GM_Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateGadgetModal;
