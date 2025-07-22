import { useMemo, useState } from "react";
import { Edit, Save } from "lucide-react";
import type { TProduct } from "@/types/product";
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
import { useUpdateGadgetMutation } from "@/redux/features/productsApi";

interface UpdateGadgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gadget: TProduct | null;
  brands: string[];
}

const UpdateGadgetModal = ({
  open,
  onOpenChange,
  gadget,
  brands,
}: UpdateGadgetModalProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateGadget] = useUpdateGadgetMutation();

  //defaultValues for the form
  const defaultValues = gadget
    ? {
        name: gadget.name,
        brand: gadget.brand,
        modelNo: gadget.modelNo,
        price: gadget.price.toString(),
        quantity: gadget.quantity.toString(),
        category: gadget.category,
        operatingSystem: gadget.operatingSystem || "N/A",
        powerSource: gadget.powerSource,
        weight: gadget.weight?.toString() || "",
        imageURL: gadget.imageURL,
      }
    : {};

  //todo - add form for non-primitive types like features, dimensions, etc.
  //todo- add brand select options with new brand add functionality
  //todo - addGadget api integration

  //transform brands
  const brandOptions = useMemo(() => {
    if (!brands || !Array.isArray(brands)) {
      return [];
    }
    return brands.map((brand) => ({ value: brand, label: brand }));
  }, [brands]);

  //update gadget function
  const handleUpdate = async (data: any) => {
    if (!gadget) return;
    setIsUpdating(true);

    // Prepare data for update
    data.price = parseFloat(data.price);
    data.quantity = Number(data.quantity);
    data.weight = data.weight ? parseFloat(data.weight) : undefined;

    const payload = {
      id: gadget._id,
      data,
    };

    try {
      const res = await updateGadget(payload).unwrap();
      if (res.success) {
        toast.success("Gadget updated", {
          description: `${data.name} has been successfully updated.`,
          position: "top-center",
          duration: 2500,
        });
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to update gadget. Please try again.", {
        position: "top-center",
        duration: 2500,
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
        {/* current info  */}
        <div className="space-y-6 py-4">
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
          {/* Default values */}
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
                <GM_Select
                  name="brand"
                  label="brand"
                  required
                  options={brandOptions}
                  placeholder="Select Brand"
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
                  options={CATEGORY_OPTIONS}
                  placeholder="Select category"
                />
                <GM_Select
                  name="operatingSystem"
                  label="Operating System"
                  required
                  options={OS_OPTIONS}
                  placeholder="Select OS"
                />
                <GM_Select
                  name="powerSource"
                  label="Power Source"
                  required
                  options={POWER_SOURCE_OPTIONS}
                  placeholder="Select power source"
                />
                <GM_CheckboxGroup
                  name="connectivity"
                  label="Connectivity Options"
                  options={CONNECTIVITY_OPTIONS}
                />
              </div>
            </div>
            {/* actions  */}
            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                disabled={isUpdating}
                className="cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="cursor-pointer"
              >
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
