import { useState } from "react";
import { Plus, Filter } from "lucide-react";
import LoadingHamster from "@/components/ui/loading-hamster/LoadingHamster";
import { useGetAllGadgetsQuery } from "@/redux/features/productsApi";
import type {
  TMeta,
  TProduct,
  TCategory,
  TOperatingSystem,
  TPowerSource,
} from "@/types/product";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import PaginationComponent from "@/components/ui/pagination-component";
import DeleteGadgetModal from "@/components/ui/modals/delete-gadget-modal";
import DuplicateGadgetModal from "@/components/ui/modals/duplicate-gadget-modal";
import UpdateGadgetModal from "@/components/ui/modals/update-gadget-modal";

// Import the new sub-components
import GadgetFilters from "@/components/gadgets/GadgetFilters";
import GadgetTableHeader from "@/components/gadgets/GadgetTableHeader";
import GadgetTableRow from "@/components/gadgets/GadgetTableRow";

const AllGadgets = () => {
  // State management for filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
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
  const [pageSize, setPageSize] = useState(20);

  // Modal states
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    gadget: TProduct | null;
  }>({
    open: false,
    gadget: null,
  });
  const [duplicateModal, setDuplicateModal] = useState<{
    open: boolean;
    gadget: TProduct | null;
  }>({
    open: false,
    gadget: null,
  });
  const [updateModal, setUpdateModal] = useState<{
    open: boolean;
    gadget: TProduct | null;
  }>({
    open: false,
    gadget: null,
  });

  //data fetching using RTK Query
  const { data, error, isFetching } = useGetAllGadgetsQuery({
    search: searchTerm,
    sortBy,
    sortOrder,
    category: filterCategory !== "all" ? filterCategory : undefined,
    brand: filterBrand !== "all" ? filterBrand : undefined,
    operatingSystem: filterOS !== "all" ? filterOS : undefined,
    powerSource: filterPowerSource !== "all" ? filterPowerSource : undefined,
    minPrice: priceRange.min ? Number(priceRange.min) : undefined,
    maxPrice: priceRange.max ? Number(priceRange.max) : undefined,
    page: currentPage,
    limit: pageSize,
  });

  //All gadgets data and meta information
  const allGadgets: TProduct[] = data?.data || [];
  const meta: TMeta = data?.meta || {
    limit: 10,
    page: 1,
    total: 0,
    totalPage: 1,
  };

  // Get unique brands from data for dropdown filter
  const uniqueBrands = Array.from(
    new Set(allGadgets.map((gadget) => gadget.brand))
  ).sort();

  if (isFetching) {
    return <LoadingHamster />;
  }

  // Handle error state
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

  // Handler functions for sorting, deleting, duplicating, and updating gadgets
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleDelete = (gadget: TProduct) => {
    setDeleteModal({ open: true, gadget });
  };

  const handleDuplicate = (gadget: TProduct) => {
    setDuplicateModal({ open: true, gadget });
  };

  const handleUpdate = (gadget: TProduct) => {
    setUpdateModal({ open: true, gadget });
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

  //main component
  return (
    <TooltipProvider>
      <div className="container mx-auto py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Gadgets</h1>
            <p className="text-muted-foreground">
              Manage your gadgets inventory ({meta.total || 0} total)
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Gadget
          </Button>
        </div>

        {/* Filters and Search Component */}
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
        />

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                {/* Table Header Component */}
                <GadgetTableHeader
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableBody>
                  {allGadgets?.length === 0 ? ( //for empty state
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        <div className="flex flex-col items-center gap-2">
                          <Filter className="h-8 w-8 text-muted-foreground" />
                          <p className="text-muted-foreground">
                            No gadgets found
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Try adjusting your search or filters
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    allGadgets.map(
                      (
                        gadget,
                        index //for displaying gadgets
                      ) => (
                        <GadgetTableRow
                          key={`${gadget?._id || index}`}
                          gadget={gadget}
                          onUpdate={handleUpdate}
                          onDuplicate={handleDuplicate}
                          onDelete={handleDelete}
                        />
                      )
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

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
        <DeleteGadgetModal
          open={deleteModal.open}
          onOpenChange={(open) => setDeleteModal({ open, gadget: null })}
          gadget={deleteModal.gadget}
        />

        <DuplicateGadgetModal
          open={duplicateModal.open}
          onOpenChange={(open) => setDuplicateModal({ open, gadget: null })}
          gadget={duplicateModal.gadget}
        />

        <UpdateGadgetModal
          open={updateModal.open}
          onOpenChange={(open) => setUpdateModal({ open, gadget: null })}
          gadget={updateModal.gadget}
        />
      </div>
    </TooltipProvider>
  );
};

export default AllGadgets;
