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

type TUserFiltersProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterRole: string;
  setFilterRole: (role: string) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  onClearFilters: () => void;
  isFetching?: boolean;
  onReload: () => void;
};

const UserFilters = ({
  searchTerm,
  setSearchTerm,
  filterRole,
  setFilterRole,
  pageSize,
  setPageSize,
  onClearFilters,
  isFetching,
  onReload,
}: TUserFiltersProps) => {
  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "admin", label: "Admin" },
    { value: "seller", label: "Seller" },
    { value: "buyer", label: "Buyer" },
  ];

  return (
    <Card className="max-w-xs md:max-w-full shadow-none">
      <CardContent>
        <div className="space-y-4 relative">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 shadow-inner"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Role Filter */}
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="cursor-pointer w-full md:max-w-[160px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
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
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="25">25 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
                <SelectItem value="100">100 per page</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button
              className="cursor-pointer w-full md:max-w-[160px]"
              variant="default"
              onClick={onClearFilters}
            >
              Clear Filters
            </Button>
          </div>

          {/* Reload Button */}
          <div className="flex justify-end absolute right-0 top-1">
            {isFetching && (
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-b-gray-600 absolute top-24 right-16" />
            )}
            <Button
              className={`shadow-none ${
                isFetching ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              variant="outline"
              onClick={() => {
                onReload();
                onClearFilters();
              }}
            >
              Reload
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserFilters;
