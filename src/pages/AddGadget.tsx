// pages/AddGadgetPage.tsx
import AddGadgetForm from "@/components/gadgets/AddGadgetForm";
import { useGetAllGadgetsQuery } from "@/redux/features/productsApi";
import { TProduct } from "@/types/product";

export default function AddGadgetPage() {
  // Fetch all gadgets (unfiltered, just for brands)
  const { data: allBrandsData } = useGetAllGadgetsQuery({
    limit: 1000, // or a number larger than your total gadgets count
  });
  const uniqueBrands = allBrandsData
    ? Array.from(
        new Set(
          (allBrandsData.data as TProduct[]).map((gadget) => gadget.brand)
        )
      ).sort()
    : [];

  return (
    <div className="p-6">
      <AddGadgetForm brands={uniqueBrands} />
    </div>
  );
}
