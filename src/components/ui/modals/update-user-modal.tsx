import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GM_Form from "@/components/form/GM_Form";
import { TUserInfo } from "@/types/auth";
import { useUpdateUserMutation } from "@/redux/features/userAPi";
import { toast } from "sonner";
import GM_Input from "@/components/form/GM_Input";
import GM_Select from "@/components/form/GM_Select";
import { Edit, Save } from "lucide-react";

type UpdateUserModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: TUserInfo | null;
  onSuccess: () => void;
};

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "seller", label: "Seller" },
  { value: "buyer", label: "Buyer" },
];

export default function UpdateUserModal({
  open,
  onOpenChange,
  user,
  onSuccess,
}: UpdateUserModalProps) {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async (data: Partial<TUserInfo>) => {
    if (!user) return;

    const toastId = toast.loading("Updating user...", {
      position: "top-center",
    });

    const payload: Partial<TUserInfo> = {
      role: data.role,
      name: data.name,
      image: data.image,
    };

    try {
      await updateUser({
        userId: user._id,
        payload,
      }).unwrap();
      toast.success("User updated successfully", {
        id: toastId,
        position: "top-center",
      });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update user", {
        id: toastId,
        position: "top-center",
      });
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Update User
          </DialogTitle>
          <DialogDescription>
            Make changes to the user profile. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <GM_Form
          onSubmit={handleSubmit}
          defaultValues={{
            name: user.name,
            role: user.role,
            image: user.image,
          }}
          className="space-y-4"
        >
          <GM_Input name="name" label="Full Name" required />
          <GM_Input name="image" label="Image URL" />
          <GM_Select name="role" label="Role" options={roleOptions} required />
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="gap-2 cursor-pointer"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </GM_Form>
      </DialogContent>
    </Dialog>
  );
}
