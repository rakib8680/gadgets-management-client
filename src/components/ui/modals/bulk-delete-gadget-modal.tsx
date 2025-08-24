import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import getCategoryColor from "@/utils/getCategoryColor";
import { useBulkDeleteGadgetsMutation } from "@/redux/features/productsApi";

interface BulkDeleteGadgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedGadgets: TProduct[];
  navigateLocation?: string;
  onSuccess?: () => void;
}

const BulkDeleteGadgetModal = ({
  open,
  onOpenChange,
  selectedGadgets,
  onSuccess,
}: BulkDeleteGadgetModalProps) => {
  //state & api
  const [isDeleting, setIsDeleting] = useState(false);
  const [bulkDelete] = useBulkDeleteGadgetsMutation();

  // Handle bulk delete function
  const handleBulkDelete = async () => {
    if (!selectedGadgets || selectedGadgets.length === 0) return;

    const payload = {
      selectedGadgets: selectedGadgets.map((gadget) => gadget._id),
    };
    setIsDeleting(true);

    try {
      const res = await bulkDelete(payload).unwrap();
      if (res.success) {
        toast.success("Gadgets deleted", {
          description: `${selectedGadgets.length} gadgets have been successfully deleted.`,
          position: "top-center",
          duration: 3000,
        });
        onOpenChange(false);
        onSuccess?.();
        // navigate(navigateLocation || "/dashboard/gadgets");
      }
    } catch (error) {
      toast.error("Failed to delete gadgets", {
        description: `Failed to delete ${selectedGadgets.length} gadgets. Please try again.`,
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!selectedGadgets || selectedGadgets.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Bulk Delete Gadgets
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-semibold">{selectedGadgets.length}</span>{" "}
            gadgets from your inventory.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="max-h-64 overflow-y-auto space-y-3">
            {selectedGadgets.slice(0, 10).map((gadget) => (
              <div
                key={gadget._id}
                className="flex items-center gap-4 p-3 border rounded-lg"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={
                      gadget.imageURL || "/placeholder.svg?height=48&width=48"
                    }
                    alt={gadget.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate text-sm">
                    {gadget.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {gadget.brand} • Model: {gadget.modelNo}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      className={`${getCategoryColor(gadget.category)} text-xs`}
                    >
                      {gadget.category}
                    </Badge>
                    <span className="text-xs font-medium">
                      ${gadget.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Stock: {gadget.quantity} units
                  </p>
                </div>
              </div>
            ))}
          </div>

          {selectedGadgets.length > 10 && (
            <div className="mt-3 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                And {selectedGadgets.length - 10} more gadgets...
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            disabled={isDeleting}
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleBulkDelete}
            disabled={isDeleting}
            className="cursor-pointer"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete {selectedGadgets.length} Gadgets
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkDeleteGadgetModal;
