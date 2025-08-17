import { TProduct } from "@/types/product";
import { TUser } from "@/types/auth";

export const canPerformGadgetActions = (
  user: TUser | null,
  gadget: TProduct | undefined
): boolean => {
  if (!user || !gadget) return false;

  // Admin can perform all actions
  if (user.role === "admin") return true;

  // Seller can only perform actions on their own gadgets
  if (user.role === "seller") {
    const sellerId = (gadget.seller_id as any)?._id || gadget.seller_id;
    return user._id === sellerId;
  }

  return false;
};
