import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { TProduct } from "@/types/product";

export function useCanPerformGadgetActions(
  gadget: TProduct | undefined
): boolean {
  const user = useAppSelector(selectCurrentUser);

  if (!user || !gadget) return false;

  if (user.role === "admin") return true;

  if (user.role === "seller") {
    const sellerId = (gadget.seller_id as any)?._id || gadget.seller_id;
    return user._id === sellerId;
  }

  return false;
}
