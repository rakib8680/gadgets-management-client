import React from "react";
import { Search, Filter } from "lucide-react";
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

type GadgetFiltersProps = {
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

const GadgetFilters: React.FC<GadgetFiltersProps> = ({
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
}) => {
  return (
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
            <Button variant="outline" onClick={onClearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GadgetFilters;
