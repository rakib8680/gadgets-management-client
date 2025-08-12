import AddGadgetForm from "@/components/gadgets/AddGadgetForm";
import { useGetAllGadgetsQuery } from "@/redux/features/productsApi";
import { TProduct } from "@/types/product";
import { Plus } from "lucide-react";

export default function AddGadgetPage() {
  const {
    data: allBrandsData,
    isLoading,
    isError,
  } = useGetAllGadgetsQuery({
    limit: 1000, // limit high to get all brands
  });

  const uniqueBrands = allBrandsData
    ? Array.from(
        new Set(
          (allBrandsData.data as TProduct[]).map((gadget) => gadget.brand)
        )
      ).sort()
    : [];

  return (
    <div className=" min-h-screen bg-gradient-to-t from-accent  rounded-lg ">
      <div className="max-w-7xl mx-auto py-6">
        <header className="ps-12">
          <div className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
            <Plus className="h-6 w-6" />
            <span>Add New Gadget</span>
          </div>
          <p className="my-2 text-gray-500">
            Fill in the details below to add a new gadget to your inventory.
          </p>
        </header>
        {isLoading && (
          <p className="text-gray-500 text-center py-4">Loading...</p>
        )}

        {isError && (
          <p className="text-red-600 font-semibold text-center py-4">
            Failed to load. Please try again later.
          </p>
        )}

        {!isLoading && !isError && (
          <div className="bg-white p-8 px-12 pt-2 rounded-lg mb-20 ">
            <AddGadgetForm brands={uniqueBrands} showHeading={false} />
          </div>
        )}
      </div>
    </div>
  );
}
