import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SortAsc, SortDesc } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type UserTableHeaderProps = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (column: string) => void;
  // bulk selection controls
  allSelected?: boolean;
  someSelected?: boolean;
  onToggleAll?: (checked: boolean) => void;
};

const UserTableHeader: React.FC<UserTableHeaderProps> = ({
  sortBy,
  sortOrder,
  onSort,
  allSelected = false,
  someSelected = false,
  onToggleAll,
}) => {
  const renderSortButton = (column: string, label: string) => (
    <TableHead>
      <Button
        variant="ghost"
        onClick={() => onSort(column)}
        className="h-auto p-0 font-semibold hover:bg-gray-200 hover:px-2 cursor-pointer"
      >
        {label}
        {sortBy === column &&
          (sortOrder === "asc" ? (
            <SortAsc className="ml-2 h-4 w-4" />
          ) : (
            <SortDesc className="ml-2 h-4 w-4" />
          ))}
      </Button>
    </TableHead>
  );

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[40px]">
          <Checkbox
            checked={
              allSelected ? true : someSelected ? "indeterminate" : false
            }
            onCheckedChange={(value) => onToggleAll?.(Boolean(value))}
            aria-label="Select all"
            className="cursor-pointer"
          />
        </TableHead>
        <TableHead className="w-[60px]">Avatar</TableHead>
        {renderSortButton("name", "Name")}
        <TableHead>Email</TableHead>
        {renderSortButton("role", "Role")}
        {renderSortButton("createdAt", "Joined")}
        {renderSortButton("updatedAt", "Last Updated")}
        <TableHead className="text-right w-[120px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default UserTableHeader;
