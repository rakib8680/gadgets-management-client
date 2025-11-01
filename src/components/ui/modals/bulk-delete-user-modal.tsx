import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import type { TUserInfo } from "@/types/auth";
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
import { useBulkDeleteUsersMutation } from "@/redux/features/userAPi";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

interface BulkDeleteUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUsers: TUserInfo[];
  onSuccess?: () => void;
}

const BulkDeleteUserModal = ({
  open,
  onOpenChange,
  selectedUsers,
  onSuccess,
}: BulkDeleteUserModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [bulkDeleteUsers] = useBulkDeleteUsersMutation();

  const getRoleVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "destructive" as const;
      case "seller":
        return "default" as const;
      case "buyer":
        return "secondary" as const;
      default:
        return "outline" as const;
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleBulkDelete = async () => {
    if (!selectedUsers || selectedUsers.length === 0) return;

    const payload = {
      userIds: selectedUsers.map((user) => user._id),
    };
    setIsDeleting(true);

    try {
      const res = await bulkDeleteUsers(payload).unwrap();
      if (res.success) {
        toast.success("Users deleted", {
          description: `${selectedUsers.length} users have been successfully deleted.`,
          position: "top-center",
          duration: 3000,
        });
        onOpenChange(false);
        onSuccess?.();
      }
    } catch (error) {
      toast.error("Failed to delete users", {
        description: `Please try again.`,
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!selectedUsers || selectedUsers.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Bulk Delete Users
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-semibold">{selectedUsers.length}</span> users.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 max-h-64 overflow-y-auto space-y-3">
          {selectedUsers.slice(0, 10).map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 border rounded-lg"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.image} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate text-sm">{user.name}</h4>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
                <Badge
                  variant={getRoleVariant(user.role)}
                  className="mt-1 capitalize text-xs"
                >
                  {user.role}
                </Badge>
              </div>
            </div>
          ))}
          {selectedUsers.length > 10 && (
            <div className="mt-3 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                And {selectedUsers.length - 10} more users...
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
            className="cursor-pointer gap-2"
          >
            {isDeleting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            {isDeleting
              ? "Deleting..."
              : `Delete ${selectedUsers.length} Users`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkDeleteUserModal;
