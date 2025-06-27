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

interface DeleteGadgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gadget: TProduct | null;
}

const DeleteGadgetModal = ({
  open,
  onOpenChange,
  gadget,
}: DeleteGadgetModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!gadget) return;

    setIsDeleting(true);
    try {
      // Replace with your actual delete API call
      // await deleteGadgetMutation(gadget.seller_id + gadget.modelNo)

      toast.success("Gadget deleted", {
        description: `${gadget.name} has been successfully deleted.`,
      });

      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to delete gadget. Please try again.");
    } finally {
      setIsDeleting(false);
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
      <DialogContent className="sm:max-w-[425px]">
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
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
