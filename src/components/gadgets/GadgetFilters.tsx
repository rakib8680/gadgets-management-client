import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import type {
  TCategory,
  TOperatingSystem,
  TPowerSource,
} from "@/types/product"; // Ensure these types are correctly imported

type TGadgetFiltersProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterCategory: TCategory | "all";
  setFilterCategory: (category: TCategory | "all") => void;
  filterBrand: string | "all";
  setFilterBrand: (brand: string | "all") => void;
  filterOS: TOperatingSystem | "all";
  setFilterOS: (os: TOperatingSystem | "all") => void;
  filterPowerSource: TPowerSource | "all";
  setFilterPowerSource: (source: TPowerSource | "all") => void;
  priceRange: { min: string; max: string };
  setPriceRange: (range: { min: string; max: string }) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  uniqueBrands: string[];
  onClearFilters: () => void;
};

const GadgetFilters = ({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  filterBrand,
  setFilterBrand,
  filterOS,
  setFilterOS,
  filterPowerSource,
  setFilterPowerSource,
  priceRange,
  setPriceRange,
  pageSize,
  setPageSize,
  uniqueBrands,
  onClearFilters,
}: TGadgetFiltersProps) => {
  return (
    <Card className=" max-w-xs md:max-w-full shadow-none">
      <CardContent>
        <div className="space-y-4 ">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, brand, model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 shadow-inner"
            />
          </div>

          {/*all filters*/}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* todo -make it reusable Category  */} 
            <Select
              value={filterCategory}
              onValueChange={(value) =>
                setFilterCategory(value as TCategory | "all")
              }
            >
              <SelectTrigger className="cursor-pointer w-full md:max-w-[160px]">
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
                <SelectItem value="camera">Camera</SelectItem>
                <SelectItem value="console">Console</SelectItem>
                <SelectItem value="drone">Drone</SelectItem>
                <SelectItem value="television">Television</SelectItem>
                <SelectItem value="accessory">Accessory</SelectItem>
              </SelectContent>
            </Select>

            {/* Brand  */}
            <Select value={filterBrand} onValueChange={setFilterBrand}>
              <SelectTrigger className="cursor-pointer w-full md:max-w-[160px]">
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

            {/* Price Min */}
            <div className="w-full md:max-w-[160px]">
              <Input
                type="number"
                placeholder="Min Price"
                value={priceRange.min}
                className="shadow-inner"
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
              />
            </div>

            {/* Price Max */}
            <div className="w-full md:max-w-[160px]">
              <Input
                type="number"
                placeholder="Max Price"
                value={priceRange.max}
                className="shadow-inner"
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
              />
            </div>

            {/* Power Source  */}
            <Select
              value={filterPowerSource}
              onValueChange={(value) =>
                setFilterPowerSource(value as TPowerSource | "all")
              }
            >
              <SelectTrigger className="cursor-pointer w-full md:max-w-[160px]">
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

            {/* Page Size */}
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger className="cursor-pointer w-full md:max-w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>

            {/* Operating System  */}
            <Select
              value={filterOS}
              onValueChange={(value) =>
                setFilterOS(value as TOperatingSystem | "all")
              }
            >
              <SelectTrigger className="cursor-pointer w-full md:max-w-[160px]">
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

            {/* Clear  */}
            <Button
              className="cursor-pointer w-full md:max-w-[160px]"
              variant="default"
              onClick={onClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GadgetFilters;
