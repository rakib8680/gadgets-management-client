import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AddGadgetForm from "@/components/gadgets/AddGadgetForm";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Gadget
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new gadget to your inventory.
          </DialogDescription>
        </DialogHeader>

        <AddGadgetForm
          brands={brands}
          onClose={() => onOpenChange(false)}
          showHeading={false}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddGadgetModal;
