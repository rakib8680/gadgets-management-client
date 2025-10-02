import GadgetList from "@/components/gadgets/GadgetList";
import { useGetAllGadgetsQuery } from "@/redux/features/productsApi";

export default function AllGadgets() {
  return (
    <GadgetList
      title="All Gadgets"
      subtitlePrefix="Manage your gadgets inventory"
      fetchHook={useGetAllGadgetsQuery}
      emptyStateMessage="No gadgets found"
      emptyStateSubMessage={() => "Try adjusting your search or filters"}
    />
  );
}

//todo- add new brand add functionality
//todo - update  - now its good not jittery but its not smooth transition, how can i get smoothness, also make the transition happening from one corner of the page
