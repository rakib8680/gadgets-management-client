import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TUserInfo } from "@/types/auth";
import { useDeleteUserMutation } from "@/redux/features/userAPi";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

type DeleteUserModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: TUserInfo | null;
  onSuccess: () => void;
};

export default function DeleteUserModal({
  open,
  onOpenChange,
  user,
  onSuccess,
}: DeleteUserModalProps) {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async () => {
    if (!user) return;

    const toastId = toast.loading("Deleting user...", {
      position: "top-center",
    });

    try {
      await deleteUser(user._id).unwrap();
      toast.success("User deleted successfully", {
        id: toastId,
        position: "top-center",
      });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to delete user", {
        id: toastId,
        position: "top-center",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete the user: <br />
            <strong>{user?.name}</strong> ({user?.email}). This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="gap-2 cursor-pointer"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
