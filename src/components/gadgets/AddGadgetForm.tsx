// components/gadgets/AddGadgetForm.tsx
import { useState, useMemo } from "react";
import { useCreateGadgetMutation } from "@/redux/features/productsApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GM_Form from "@/components/form/GM_Form";
import GM_Input from "@/components/form/GM_Input";
import GM_Select from "@/components/form/GM_Select";
import GM_CheckboxGroup from "@/components/form/GM_CheckboxGroup";
import GM_DatePicker from "@/components/form/GM_DatePicker";
import GM_ObjectBuilder from "@/components/form/GM_ObjectBuilder";
import {
  CATEGORY_OPTIONS,
  OS_OPTIONS,
  POWER_SOURCE_OPTIONS,
  CONNECTIVITY_OPTIONS,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogFooter } from "../ui/dialog";

interface AddGadgetFormProps {
  brands: string[];
  showHeading?: boolean;
  onClose?: () => void; // new prop for closing modal
}

export default function AddGadgetForm({
  brands,
  showHeading = true,
  onClose,
}: AddGadgetFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [createGadget] = useCreateGadgetMutation();
  const navigate = useNavigate();

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
    dimensions: { width: "", height: "", depth: "" },
    releaseDate: "",
    compatibility: [],
  };

  const brandOptions = useMemo(
    () => (brands || []).map((b) => ({ value: b, label: b })),
    [brands]
  );

  const handleAdd = async (data: any) => {
    setIsAdding(true);
    try {
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

      if (processedData.dimensions) {
        Object.keys(processedData.dimensions).forEach((key) => {
          if (processedData.dimensions[key] === undefined) {
            delete processedData.dimensions[key];
          }
        });
        if (Object.keys(processedData.dimensions).length === 0) {
          delete processedData.dimensions;
        }
      }

      const res = await createGadget(processedData).unwrap();
      if (res.success) {
        toast.success("Gadget added successfully", {
          description: `${data.name} has been added to the inventory.`,
          position: "top-center",
          duration: 3000,
        });
        if (onClose) onClose();
        navigate(`/dashboard/gadgets`);
      }
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
    <div className=" mx-auto py-6">
      {showHeading && (
        <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Plus className="h-6 w-6" /> Add New Gadget
        </h1>
      )}

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
                <label className="text-sm font-medium">Dimensions (cm)</label>
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

        {/* Features Section */}
        <div className="space-y-4 p-4 border rounded-lg mt-6">
          <h3 className="font-medium text-sm text-muted-foreground">
            Product Features
          </h3>
          <GM_ObjectBuilder name="features" label="Custom Features" />
        </div>

        {/* Actions */}
        <DialogFooter className="gap-2 mt-10">
          <Button
            variant="outline"
            type="button"
            className="cursor-pointer"
            disabled={isAdding}
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isAdding} className="cursor-pointer">
            {isAdding ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Gadget
              </>
            )}
          </Button>
        </DialogFooter>
      </GM_Form>
    </div>
  );
}
