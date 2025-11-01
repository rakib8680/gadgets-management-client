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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Trash2, AlertTriangle } from "lucide-react";

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

  // Get role badge variant
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

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete User
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user
            and all associated data.
          </DialogDescription>
        </DialogHeader>

        {user && (
          <div className="py-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="text-lg">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{user.name}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {user.email}
                </p>
                <Badge
                  variant={getRoleVariant(user.role)}
                  className="mt-2 capitalize"
                >
                  {user.role}
                </Badge>
              </div>
            </div>
          </div>
        )}

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
            {isLoading ? "Deleting..." : "Delete User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
