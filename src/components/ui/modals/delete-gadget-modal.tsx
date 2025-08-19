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
import { useDeleteGadgetMutation } from "@/redux/features/productsApi";
import { useNavigate } from "react-router-dom";

interface DeleteGadgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gadget: TProduct | null;
  navigateLocation?: string;
}

const DeleteGadgetModal = ({
  open,
  onOpenChange,
  gadget,
  navigateLocation,
}: DeleteGadgetModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteGadget] = useDeleteGadgetMutation();
  const navigate = useNavigate();

  // Handle delete function
  const handleDelete = async () => {
    if (!gadget) return;

    setIsDeleting(true);
    try {
      const res = await deleteGadget(gadget._id).unwrap();
      if (res.success) {
        toast.success("Gadget deleted", {
          description: `${gadget.name} has been successfully deleted.`,
          position: "top-center",
          duration: 3000,
        });
        onOpenChange(false);
        navigate(navigateLocation || "/dashboard/gadgets");
      }
    } catch (error) {
      toast.error("Failed to delete gadget. Please try again.", {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!gadget) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Gadget
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            gadget from your inventory.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img
                src={gadget.imageURL || "/placeholder.svg?height=64&width=64"}
                alt={gadget.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{gadget.name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {gadget.brand} • Model: {gadget.modelNo}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getCategoryColor(gadget.category)}>
                  {gadget.category}
                </Badge>
                <span className="text-sm font-medium">
                  ${gadget.price.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Stock: {gadget.quantity} units
              </p>
            </div>
          </div>
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
            onClick={handleDelete}
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
                Delete Gadget
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGadgetModal;
