import { useGetMyGadgetsQuery } from "@/redux/features/productsApi";
import GadgetList from "@/components/gadgets/GadgetList";

export default function MyGadgets() {
  return (
    <GadgetList
      title="My Gadgets"
      subtitlePrefix="Manage your personal gadgets collection"
      fetchHook={useGetMyGadgetsQuery}
      showFiltersCondition={(total) => total >= 10}
      emptyStateMessage="No gadgets found in your collection"
      emptyStateSubMessage={(showFilters) =>
        showFilters
          ? "Try adjusting your search or filters"
          : "Add your first gadget to get started"
      }
      navigateLocation="/dashboard/my-gadgets"
    />
  );
}
