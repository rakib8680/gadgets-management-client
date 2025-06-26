import LoadingHamster from "@/components/ui/loading-hamster/LoadingHamster";
import { useGetAllGadgetsQuery } from "@/redux/features/productsApi";
import { TMeta, TProduct } from "@/types/product";

const AllGadgets = () => {
  const { data, error, isFetching, isLoading } = useGetAllGadgetsQuery({});

  const AllGadgets: TProduct = data?.data || [];
  const meta: TMeta = data?.meta || {};
  console.log(isFetching);

  if (isFetching) {
    return <LoadingHamster />;
  }

  return (
    <div>
      <h1>This is AllGadgets component</h1>
    </div>
  );
};

export default AllGadgets;
