import { useState } from "react";
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Plus,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Calendar,
  Cpu,
  Zap,
} from "lucide-react";
import LoadingHamster from "@/components/ui/loading-hamster/LoadingHamster";
import { useGetAllGadgetsQuery } from "@/redux/features/productsApi";
import type {
  TMeta,
  TProduct,
  TCategory,
  TOperatingSystem,
  TConnectivity,
  TPowerSource,
} from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PaginationComponent from "@/components/ui/pagination-component";
import DeleteGadgetModal from "@/components/ui/modals/delete-gadget-modal";
import DuplicateGadgetModal from "@/components/ui/modals/duplicate-gadget-modal";
import UpdateGadgetModal from "@/components/ui/modals/update-gadget-modal";

const AllGadgets = () => {
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
  const [pageSize, setPageSize] = useState(10);

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

  const { data, error, isFetching, isLoading } = useGetAllGadgetsQuery({
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

  const allGadgets: TProduct[] = data?.data || [];
  const meta: TMeta = data?.meta || {
    limit: 10,
    page: 1,
    total: 0,
    totalPage: 1,
  };

  // Get unique brands from data for filter
  const uniqueBrands = Array.from(
    new Set(allGadgets.map((gadget) => gadget.brand))
  ).sort();

  if (isFetching) {
    return <LoadingHamster />;
  }

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

  const getCategoryColor = (category: TCategory) => {
    const colors = {
      smartphone: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      tablet: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      laptop: "bg-green-100 text-green-800 hover:bg-green-100",
      smartwatch: "bg-orange-100 text-orange-800 hover:bg-orange-100",
      headphone: "bg-pink-100 text-pink-800 hover:bg-pink-100",
      speaker: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
      accessory: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const formatConnectivity = (connectivity: TConnectivity[]) => {
    return (
      connectivity.slice(0, 3).join(", ") +
      (connectivity.length > 3 ? "..." : "")
    );
  };

  const formatDimensions = (dimensions?: {
    width: number;
    height: number;
    depth: number;
  }) => {
    if (!dimensions) return "N/A";
    return `${dimensions.width}×${dimensions.height}×${dimensions.depth}mm`;
  };

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

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, brand, model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <Select
                  value={filterCategory}
                  onValueChange={(value) =>
                    setFilterCategory(value as TCategory | "all")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="smartphone">Smartphone</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="smartwatch">Smartwatch</SelectItem>
                    <SelectItem value="headphone">Headphone</SelectItem>
                    <SelectItem value="speaker">Speaker</SelectItem>
                    <SelectItem value="accessory">Accessory</SelectItem>
                  </SelectContent>
                </Select>

                {/* Brand Filter */}
                <Select value={filterBrand} onValueChange={setFilterBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {uniqueBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Operating System Filter */}
                <Select
                  value={filterOS}
                  onValueChange={(value) =>
                    setFilterOS(value as TOperatingSystem | "all")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="OS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All OS</SelectItem>
                    <SelectItem value="iOS">iOS</SelectItem>
                    <SelectItem value="Android">Android</SelectItem>
                    <SelectItem value="Windows">Windows</SelectItem>
                    <SelectItem value="macOS">macOS</SelectItem>
                    <SelectItem value="Linux">Linux</SelectItem>
                  </SelectContent>
                </Select>

                {/* Power Source Filter */}
                <Select
                  value={filterPowerSource}
                  onValueChange={(value) =>
                    setFilterPowerSource(value as TPowerSource | "all")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Power Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Power Sources</SelectItem>
                    <SelectItem value="Battery">Battery</SelectItem>
                    <SelectItem value="Plug-in">Plug-in</SelectItem>
                    <SelectItem value="Battery & Plug-in">
                      Battery & Plug-in
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filters Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Price Range */}
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min Price"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: e.target.value })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Max Price"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: e.target.value })
                    }
                  />
                </div>

                {/* Page Size */}
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => setPageSize(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 per page</SelectItem>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="20">20 per page</SelectItem>
                    <SelectItem value="50">50 per page</SelectItem>
                  </SelectContent>
                </Select>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterCategory("all");
                    setFilterBrand("all");
                    setFilterOS("all");
                    setFilterPowerSource("all");
                    setPriceRange({ min: "", max: "" });
                    setCurrentPage(1);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("name")}
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                      >
                        Product
                        {sortBy === "name" &&
                          (sortOrder === "asc" ? (
                            <SortAsc className="ml-2 h-4 w-4" />
                          ) : (
                            <SortDesc className="ml-2 h-4 w-4" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("brand")}
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                      >
                        Brand
                        {sortBy === "brand" &&
                          (sortOrder === "asc" ? (
                            <SortAsc className="ml-2 h-4 w-4" />
                          ) : (
                            <SortDesc className="ml-2 h-4 w-4" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("price")}
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                      >
                        Price
                        {sortBy === "price" &&
                          (sortOrder === "asc" ? (
                            <SortAsc className="ml-2 h-4 w-4" />
                          ) : (
                            <SortDesc className="ml-2 h-4 w-4" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("quantity")}
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                      >
                        Stock
                        {sortBy === "quantity" &&
                          (sortOrder === "asc" ? (
                            <SortAsc className="ml-2 h-4 w-4" />
                          ) : (
                            <SortDesc className="ml-2 h-4 w-4" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("releaseDate")}
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                      >
                        Release Date
                        {sortBy === "releaseDate" &&
                          (sortOrder === "asc" ? (
                            <SortAsc className="ml-2 h-4 w-4" />
                          ) : (
                            <SortDesc className="ml-2 h-4 w-4" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allGadgets.length === 0 ? (
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
                    allGadgets.map((gadget, index) => (
                      <TableRow
                        key={`${gadget.seller_id}-${gadget.modelNo}-${index}`}
                      >
                        <TableCell>
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                            <img
                              src={
                                gadget.imageURL ||
                                "/placeholder.svg?height=64&width=64"
                              }
                              alt={gadget.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            <p className="font-medium truncate">
                              {gadget.name}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              Model: {gadget.modelNo}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(gadget.category)}>
                            {gadget.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {gadget.brand}
                        </TableCell>
                        <TableCell className="font-medium">
                          ${gadget.price.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              gadget.quantity > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {gadget.quantity} units
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {gadget.operatingSystem && (
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge
                                    variant="outline"
                                    className="text-xs w-fit"
                                  >
                                    <Cpu className="w-3 h-3 mr-1" />
                                    {gadget.operatingSystem}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Operating System
                                </TooltipContent>
                              </Tooltip>
                            )}
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge
                                  variant="outline"
                                  className="text-xs w-fit"
                                >
                                  <Zap className="w-3 h-3 mr-1" />
                                  {gadget.powerSource}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>Power Source</TooltipContent>
                            </Tooltip>
                            {gadget.connectivity.length > 0 && (
                              <Tooltip>
                                <TooltipTrigger>
                                  <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                                    {formatConnectivity(gadget.connectivity)}
                                  </p>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div>
                                    <p className="font-semibold">
                                      Connectivity:
                                    </p>
                                    <p>{gadget.connectivity.join(", ")}</p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(gadget.releaseDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => handleUpdate(gadget)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Update
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDuplicate(gadget)}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDelete(gadget)}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {meta.total > 0 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={meta.totalPage}
            totalItems={meta.total}
            pageSize={pageSize}
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
