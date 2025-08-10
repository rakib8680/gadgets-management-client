import { useState, useEffect, useMemo } from "react";
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCreateGadgetMutation } from "@/redux/features/productsApi";
import { FieldValues, useForm } from "react-hook-form";

import GM_Select from "@/components/form/GM_Select";
import getCategoryColor from "@/utils/getCategoryColor";
import GM_Input from "@/components/form/GM_Input";
import GM_Form from "@/components/form/GM_Form";
import { useNavigate } from "react-router-dom";
import {
  CATEGORY_OPTIONS,
  CONNECTIVITY_OPTIONS,
  OS_OPTIONS,
  POWER_SOURCE_OPTIONS,
} from "@/constants/options";
import GM_DatePicker from "@/components/form/GM_DatePicker";
import GM_CheckboxGroup from "@/components/form/GM_CheckboxGroup";
import GM_ObjectBuilder from "@/components/form/GM_ObjectBuilder";

interface DuplicateGadgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gadget: TProduct | null;
  brands: string[];
}

const DuplicateGadgetModal = ({
  open,
  onOpenChange,
  gadget,
  brands,
}: DuplicateGadgetModalProps) => {
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [duplicateGadget] = useCreateGadgetMutation();
  const methods = useForm();
  const { reset } = methods;
  const navigate = useNavigate();

  //transform brands
  const brandOptions = useMemo(() => {
    if (!brands || !Array.isArray(brands)) {
      return [];
    }
    return brands.map((brand) => ({ value: brand, label: brand }));
  }, [brands]);

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
        releaseDate: new Date(),
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
          position: "top-center",
          duration: 3000,
        });
        onOpenChange(false);
        navigate(`/dashboard/gadgets`);
      }
    } catch (error) {
      toast.error("Failed to duplicate gadget. Please try again.", {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsDuplicating(false);
    }
  };

  if (!gadget) return null;

  //defaultValues for the form
  const defaultValues = gadget
    ? {
        name: `${gadget.name} (Copy)`,
        brand: gadget.brand,
        modelNo: `${gadget.modelNo}-COPY`,
        price: gadget.price.toString(),
        quantity: gadget.quantity.toString(),
        category: gadget.category,
        connectivity: gadget.connectivity || [],
        operatingSystem: gadget.operatingSystem || "N/A",
        powerSource: gadget.powerSource,
        weight: gadget.weight?.toString() || "",
        dimensions: gadget.dimensions,
        features: gadget.features,
        compatibility: gadget.compatibility,
        releaseDate: gadget.releaseDate,
        imageURL: gadget.imageURL,
      }
    : {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
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

          {/* Default values */}
          <GM_Form defaultValues={defaultValues} onSubmit={onSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Basic Information
                  </h3>

                  <GM_Input
                    name="name"
                    label="Product Name"
                    required
                    placeholder="Enter product name"
                  />

                  <GM_Select
                    name="brand"
                    label="Brand"
                    required
                    options={brandOptions}
                    placeholder="Select brand"
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
                    required
                    placeholder="Enter image URL"
                  />
                </div>

                <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Pricing & Inventory
                  </h3>

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
                </div>

                <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Physical Properties
                  </h3>

                  <GM_Input
                    name="weight"
                    label="Weight (grams)"
                    type="number"
                    placeholder="Enter weight"
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Dimensions (cm)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <GM_Input
                        name="dimensions.width"
                        label="Width"
                        type="number"
                        placeholder="W"
                      />
                      <GM_Input
                        name="dimensions.height"
                        label="Height"
                        type="number"
                        placeholder="H"
                      />
                      <GM_Input
                        name="dimensions.depth"
                        label="Depth"
                        type="number"
                        placeholder="D"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Technical Specifications
                  </h3>

                  <GM_Select
                    name="category"
                    label="Category"
                    required
                    options={CATEGORY_OPTIONS}
                    placeholder="Select category"
                  />

                  <GM_Select
                    name="operatingSystem"
                    label="Operating System"
                    options={OS_OPTIONS}
                    placeholder="Select OS"
                  />

                  <GM_Select
                    name="powerSource"
                    label="Power Source"
                    options={POWER_SOURCE_OPTIONS}
                    placeholder="Select power source"
                  />

                  <GM_CheckboxGroup
                    name="connectivity"
                    label="Connectivity Options"
                    options={CONNECTIVITY_OPTIONS}
                  />
                </div>

                <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Additional Information
                  </h3>

                  <GM_DatePicker
                    name="releaseDate"
                    label="Release Date"
                    required
                    placeholder="Select release date"
                    dateFormat="dd-MM-yyyy"
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Compatibility</label>
                    <GM_Input
                      name="compatibility"
                      label="Compatible Devices/Systems"
                      placeholder="e.g., iPhone, Android, Windows (comma separated)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section*/}
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="font-medium text-sm text-muted-foreground">
                Product Features
              </h3>

              <GM_ObjectBuilder name="features" label="Custom Features" />
            </div>

            {/* actions  */}
            <div className="col-span-2 flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer"
                disabled={isDuplicating}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isDuplicating}
                className="cursor-pointer"
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
            </div>
          </GM_Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateGadgetModal;
