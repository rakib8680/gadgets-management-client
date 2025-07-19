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
import GM_Form from "@/components/form/GM_Form";
import GM_Input from "@/components/form/GM_Input";
import GM_Select from "@/components/form/GM_Select";
import { Controller, useFormContext } from "react-hook-form";

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

  // Compose defaultValues for the form
  const defaultValues = gadget
    ? {
        name: gadget.name,
        brand: gadget.brand,
        modelNo: gadget.modelNo,
        price: gadget.price.toString(),
        quantity: gadget.quantity.toString(),
        category: gadget.category,
        operatingSystem: gadget.operatingSystem || "iOS",
        powerSource: gadget.powerSource,
        weight: gadget.weight?.toString() || "",
        imageURL: gadget.imageURL,
      }
    : {};

  const handleUpdate = async (data: any) => {
    if (!gadget) return;
    setIsUpdating(true);
    try {
      const updatedGadget: Partial<TProduct> = {
        ...gadget,
        name: data.name,
        brand: data.brand,
        modelNo: data.modelNo,
        price: Number.parseFloat(data.price),
        quantity: Number.parseInt(data.quantity),
        category: data.category,
        operatingSystem: data.operatingSystem,
        powerSource: data.powerSource,
        weight: data.weight ? Number.parseFloat(data.weight) : undefined,
        imageURL: data.imageURL,
      };
      // Replace with your actual update API call
      // await updateGadgetMutation({ id: gadget.seller_id + gadget.modelNo, data: updatedGadget })
      toast.success("Gadget updated", {
        description: `${data.name} has been successfully updated.`,
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
          <GM_Form
            defaultValues={{
              ...defaultValues,
              connectivity: gadget.connectivity || [],
            }}
            onSubmit={handleUpdate}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
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
                <GM_Input
                  name="imageURL"
                  label="Image URL"
                  placeholder="Enter image URL"
                />
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                <GM_Input
                  name="weight"
                  label="Weight (grams)"
                  type="number"
                  placeholder="Enter weight"
                />
              </div>
              {/* Right Column */}
              <div className="space-y-4">
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
                    { value: "accessory", label: "Accessory" },
                  ]}
                  placeholder="Select category"
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
                  placeholder="Select OS"
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
                  placeholder="Select power source"
                />
                {/* Connectivity checkboxes integrated with react-hook-form */}
                <Controller
                  name="connectivity"
                  defaultValue={gadget.connectivity || []}
                  render={({ field }) => (
                    <div>
                      <Label>Connectivity Options</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2 max-h-32 overflow-y-auto border rounded-md p-3">
                        {connectivityOptions.map((option) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`connectivity-${option}`}
                              checked={field.value?.includes(option)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([
                                    ...(field.value || []),
                                    option,
                                  ]);
                                } else {
                                  field.onChange(
                                    (field.value || []).filter(
                                      (c: string) => c !== option
                                    )
                                  );
                                }
                              }}
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
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {isUpdating ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </GM_Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGadgetModal;
