import { useMemo, useState } from "react";
import { Plus, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GM_Form from "@/components/form/GM_Form";
import GM_Input from "@/components/form/GM_Input";
import GM_Select from "@/components/form/GM_Select";
import GM_CheckboxGroup from "@/components/form/GM_CheckboxGroup";
import {
  CATEGORY_OPTIONS,
  OS_OPTIONS,
  POWER_SOURCE_OPTIONS,
  CONNECTIVITY_OPTIONS,
} from "@/constants/options";
import GM_DatePicker from "@/components/form/GM_DatePicker";

interface AddGadgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brands: string[];
}

const AddGadgetModal = ({
  open,
  onOpenChange,
  brands,
}: AddGadgetModalProps) => {
  const [isAdding, setIsAdding] = useState(false);
  //   const [addGadget] = useAddGadgetMutation();

  // Default values for the form
  const defaultValues = {
    name: "",
    brand: "",
    modelNo: "",
    price: "",
    quantity: "",
    category: "",
    operatingSystem: "",
    powerSource: "",
    weight: "",
    imageURL: "",
    connectivity: [],
    features: {},
    dimensions: {
      width: "",
      height: "",
      depth: "",
    },
    releaseDate: "",
    compatibility: [],
  };

  // Transform brands to options
  const brandOptions = useMemo(() => {
    if (!brands || !Array.isArray(brands)) {
      return [];
    }
    return brands.map((brand) => ({ value: brand, label: brand }));
  }, [brands]);

  // Add gadget function
  const handleAdd = async (data: any) => {
    setIsAdding(true);

    try {
      // Prepare data for creation
      const processedData = {
        ...data,
        price: parseFloat(data.price),
        quantity: Number(data.quantity),
        weight: data.weight ? parseFloat(data.weight) : undefined,
        dimensions:
          data.dimensions?.width ||
          data.dimensions?.height ||
          data.dimensions?.depth
            ? {
                width: data.dimensions?.width
                  ? parseFloat(data.dimensions.width)
                  : undefined,
                height: data.dimensions?.height
                  ? parseFloat(data.dimensions.height)
                  : undefined,
                depth: data.dimensions?.depth
                  ? parseFloat(data.dimensions.depth)
                  : undefined,
              }
            : undefined,
        releaseDate: data.releaseDate ? new Date(data.releaseDate) : new Date(),
        features: data.features || {},
        compatibility: data.compatibility
          ? data.compatibility
              .split(",")
              .map((item: string) => item.trim())
              .filter((item: string) => item !== "")
          : [],
      };

      console.log(processedData);

      // Remove undefined values from dimensions
      if (processedData.dimensions) {
        Object.keys(processedData.dimensions).forEach((key) => {
          if (processedData.dimensions[key] === undefined) {
            delete processedData.dimensions[key];
          }
        });

        // Remove dimensions object if empty
        if (Object.keys(processedData.dimensions).length === 0) {
          delete processedData.dimensions;
        }
      }

      //   const res = await addGadget(processedData).unwrap();
      //   if (res.success) {
      //     toast.success("Gadget added successfully", {
      //       description: `${data.name} has been added to the inventory.`,
      //       position: "top-center",
      //       duration: 2500,
      //     });
      //     onOpenChange(false);
      //   }
    } catch (error) {
      toast.error("Failed to add gadget. Please try again.", {
        position: "top-center",
        duration: 2500,
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Gadget
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new gadget to your inventory.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <GM_Form defaultValues={defaultValues} onSubmit={handleAdd}>
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

            {/* Actions */}
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                type="button"
                disabled={isAdding}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isAdding}>
                {isAdding ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {isAdding ? "Adding..." : "Add Gadget"}
              </Button>
            </DialogFooter>
          </GM_Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddGadgetModal;
