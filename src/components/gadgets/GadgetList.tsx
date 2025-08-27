import { useCallback, useState } from "react";
import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import PaginationComponent from "@/components/ui/pagination-component";
import LoadingHamster from "@/components/ui/loading-hamster/LoadingHamster";
import GadgetFilters from "@/components/gadgets/GadgetFilters";
import GadgetTableHeader from "@/components/gadgets/GadgetTableHeader";
import GadgetTableRow from "@/components/gadgets/GadgetTableRow";
import AddGadgetModal from "@/components/ui/modals/add-gadget-modal";
import DeleteGadgetModal from "@/components/ui/modals/delete-gadget-modal";
import BulkDeleteGadgetModal from "@/components/ui/modals/bulk-delete-gadget-modal";
import DuplicateGadgetModal from "@/components/ui/modals/duplicate-gadget-modal";
import UpdateGadgetModal from "@/components/ui/modals/update-gadget-modal";
import { useDebounced } from "@/redux/hooks";
import type {
  TMeta,
  TProduct,
  TCategory,
  TOperatingSystem,
  TPowerSource,
} from "@/types/product";
import { useGetAllGadgetsQuery } from "@/redux/features/productsApi";
import { useSelection } from "@/hooks/useSelection";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

interface GadgetListProps {
  title: string;
  subtitlePrefix: string;
  fetchHook: (params: any) => {
    data?: any;
    error?: any;
    isLoading: boolean;
    isFetching: boolean;
    refetch: () => void;
  };
  showFiltersCondition?: (total: number) => boolean;
  emptyStateMessage: string;
  emptyStateSubMessage: (shouldShowFilters: boolean) => string;
  navigateLocation?: string;
}

export default function GadgetList({
  title,
  subtitlePrefix,
  fetchHook,
  showFiltersCondition = () => true,
  emptyStateMessage,
  emptyStateSubMessage,
  navigateLocation,
}: GadgetListProps) {




  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterCategory, setFilterCategory] = useState<TCategory | "all">(
    "all"
  );
  const [filterBrand, setFilterBrand] = useState("all");
  const [filterOS, setFilterOS] = useState<TOperatingSystem | "all">("all");
  const [filterPowerSource, setFilterPowerSource] = useState<
    TPowerSource | "all"
  >("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);





  // Modal states
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    gadget: TProduct | null;
  }>({ open: false, gadget: null });
  const [bulkDeleteModal, setBulkDeleteModal] = useState(false);
  const [duplicateModal, setDuplicateModal] = useState<{
    open: boolean;
    gadget: TProduct | null;
  }>({ open: false, gadget: null });
  const [updateModal, setUpdateModal] = useState<{
    open: boolean;
    gadget: TProduct | null;
  }>({ open: false, gadget: null });





  // Debounced query
  const query: Record<string, any> = {};
  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });
  const debouncedMinPrice = useDebounced({
    searchQuery: priceRange.min,
    delay: 600,
  });
  const debouncedMaxPrice = useDebounced({
    searchQuery: priceRange.max,
    delay: 600,
  });
  if (debouncedTerm) query.searchTerm = debouncedTerm;
  if (debouncedMinPrice) query.minPrice = Number(debouncedMinPrice);
  if (debouncedMaxPrice) query.maxPrice = Number(debouncedMaxPrice);





  //Api calling
  const { data, error, isLoading, isFetching, refetch } = fetchHook({
    ...query,
    sort: sortBy,
    sortOrder,
    category: filterCategory !== "all" ? filterCategory : undefined,
    brand: filterBrand !== "all" ? filterBrand : undefined,
    operatingSystem: filterOS !== "all" ? filterOS : undefined,
    powerSource: filterPowerSource !== "all" ? filterPowerSource : undefined,
    page: currentPage,
    limit: pageSize,
  });
  const gadgets: TProduct[] = data?.data || [];
  const meta: TMeta = data?.meta || {
    limit: 10,
    page: 1,
    total: 0,
    totalPage: 1,
  };
  const { data: allBrandsData } = useGetAllGadgetsQuery({ limit: 1000 });
  const uniqueBrands = allBrandsData
    ? Array.from(
        new Set((allBrandsData.data as TProduct[]).map((g) => g.brand))
      ).sort()
    : [];





  // Get the ID of the gadget for selection
  const getId = useCallback((g: TProduct) => g._id, []);
  const currentUser = useAppSelector(selectCurrentUser);
  const isSelectable = useCallback(
    (g: TProduct) => {
      if (!currentUser) return false;
      if (currentUser.role === "admin") return true;
      if (currentUser.role === "seller") {
        const sellerId = (g.seller_id as any)?._id || g.seller_id;
        return currentUser._id === sellerId;
      }
      return false;
    },
    [currentUser]
  );
  const {
    selectedIds,
    allSelected,
    someSelected,
    toggleSelectAll,
    toggleRow,
    resetSelection,
  } = useSelection<TProduct>(gadgets, getId, { isSelectable });
  // Get selected gadgets objects
  const selectedGadgets = gadgets.filter((gadget) =>
    selectedIds.includes(gadget._id)
  );





  // Handlers
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterCategory("all");
    setFilterBrand("all");
    setFilterOS("all");
    setFilterPowerSource("all");
    setPriceRange({ min: "", max: "" });
    setCurrentPage(1);
  };
  const handleBulkDelete = () => {
    setBulkDeleteModal(true);
  };



  // Determine if filters should be shown based on total count
  const shouldShowFilters = showFiltersCondition(meta.total);

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>
            Failed to load gadgets. Please try again.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  
  return (
    <TooltipProvider>
      <div className="container mx-auto py-6 space-y-6 mb-24">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">
              {subtitlePrefix} (
              {isFetching ? (
                <span className="animate-spin rounded-full h-4 w-4 border-b-1 mx-2 border-gray-700 inline-block relative top-1" />
              ) : (
                meta.total || 0
              )}{" "}
              total)
            </p>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setAddModal(true)}
            >
              <Plus className="h-4 w-4" /> Add New Gadget
            </Button>
          </div>
        </div>

        {/* Filters */}
        {shouldShowFilters && (
          <GadgetFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterBrand={filterBrand}
            setFilterBrand={setFilterBrand}
            filterOS={filterOS}
            setFilterOS={setFilterOS}
            filterPowerSource={filterPowerSource}
            setFilterPowerSource={setFilterPowerSource}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            pageSize={pageSize}
            setPageSize={setPageSize}
            uniqueBrands={uniqueBrands}
            onClearFilters={handleClearFilters}
            isFetching={isFetching}
            onReload={refetch}
          />
        )}

        {/* Table */}
        {isLoading ? (
          <LoadingHamster />
        ) : (
          <>
            {selectedIds.length > 0 && (
              <div className="mb-3 flex justify-end">
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={handleBulkDelete}
                >
                  Delete All ({selectedIds.length})
                </Button>
              </div>
            )}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <GadgetTableHeader
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      allSelected={allSelected}
                      someSelected={someSelected}
                      onToggleAll={toggleSelectAll}
                    />
                    <TableBody>
                      {gadgets.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8">
                            <div className="flex flex-col items-center gap-2">
                              <Filter className="h-8 w-8 text-muted-foreground" />
                              <p className="text-muted-foreground">
                                {emptyStateMessage}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {emptyStateSubMessage(shouldShowFilters)}
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        gadgets.map((gadget, index) => (
                          <GadgetTableRow
                            key={gadget?._id || index}
                            gadget={gadget}
                            onUpdate={(g) =>
                              setUpdateModal({ open: true, gadget: g })
                            }
                            onDuplicate={(g) =>
                              setDuplicateModal({ open: true, gadget: g })
                            }
                            onDelete={(g) =>
                              setDeleteModal({ open: true, gadget: g })
                            }
                            selected={selectedIds.includes(gadget._id)}
                            onToggleSelected={(checked) =>
                              toggleRow(gadget._id, checked)
                            }
                          />
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Pagination */}
        {meta.total > 0 && (
          <PaginationComponent
            currentPage={meta.page}
            totalPages={meta.totalPage}
            totalItems={meta.total}
            pageSize={meta.limit}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Modals */}
        <AddGadgetModal
          open={addModal}
          onOpenChange={setAddModal}
          brands={uniqueBrands}
          navigateLocation={navigateLocation}
        />
        <DeleteGadgetModal
          open={deleteModal.open}
          onOpenChange={(open) => setDeleteModal({ open, gadget: null })}
          gadget={deleteModal.gadget}
          navigateLocation={navigateLocation}
        />
        <BulkDeleteGadgetModal
          open={bulkDeleteModal}
          onOpenChange={setBulkDeleteModal}
          selectedGadgets={selectedGadgets}
          navigateLocation={navigateLocation}
          onSuccess={resetSelection}
        />
        <DuplicateGadgetModal
          brands={uniqueBrands}
          open={duplicateModal.open}
          onOpenChange={(open) => setDuplicateModal({ open, gadget: null })}
          gadget={duplicateModal.gadget}
          navigateLocation={navigateLocation}
        />
        <UpdateGadgetModal
          open={updateModal.open}
          onOpenChange={(open) => setUpdateModal({ open, gadget: null })}
          gadget={updateModal.gadget}
          brands={uniqueBrands}
        />
      </div>
    </TooltipProvider>
  );
}
