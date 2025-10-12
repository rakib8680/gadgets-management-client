import { useCallback, useState } from "react";
import { Users, Filter } from "lucide-react";
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
import { useDebounced } from "@/redux/hooks";
import type { TUserInfo } from "@/types/auth";
import { useGetAllUsersQuery } from "@/redux/features/userAPi";
import { useSelection } from "@/hooks/useSelection";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";

interface UserListProps {
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
}

export default function UserList({
  title,
  subtitlePrefix,
  fetchHook,
  showFiltersCondition = () => true,
  emptyStateMessage,
  emptyStateSubMessage,
}: UserListProps) {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  // Debounced query
  const query: Record<string, any> = {};
  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });
  if (debouncedTerm) query.searchTerm = debouncedTerm;

  // Api calling
  const { data, error, isLoading, isFetching, refetch } = fetchHook({
    ...query,
    sort: sortBy,
    sortOrder,
    role: filterRole !== "all" ? filterRole : undefined,
    page: currentPage,
    limit: pageSize,
  });

  const users: TUserInfo[] = data?.data || [];
  const meta = data?.meta || {
    limit: 10,
    page: 1,
    total: 0,
    totalPage: 1,
  };

  // Get the ID of the user for selection
  const getId = useCallback((u: TUserInfo) => u._id, []);
  const currentUser = useAppSelector(selectCurrentUser);
  const isSelectable = useCallback(
    (u: TUserInfo) => {
      if (!currentUser) return false;
      // Only admin can select users
      return currentUser.role === "admin";
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
  } = useSelection<TUserInfo>(users, getId, { isSelectable });

  // Get selected users objects
  const selectedUsers = users.filter((user) => selectedIds.includes(user._id));

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
    setFilterRole("all");
    setCurrentPage(1);
  };

  // Role options
  const roleOptions = ["admin", "seller", "buyer"];

  // Determine if filters should be shown based on total count
  const shouldShowFilters = showFiltersCondition(meta.total);

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>
            Failed to load users. Please try again.
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
        </div>

        {/* Filters */}
        {shouldShowFilters && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search Users</label>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                {/* Role Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="all">All Roles</option>
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Page Size */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Items per page</label>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="cursor-pointer"
                >
                  Clear Filters
                </Button>
                <Button
                  variant="outline"
                  onClick={refetch}
                  disabled={isFetching}
                  className="cursor-pointer"
                >
                  {isFetching ? "Refreshing..." : "Refresh"}
                </Button>
              </div>
            </CardContent>
          </Card>
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
                  disabled
                  title="Bulk actions not implemented yet"
                >
                  Selected ({selectedIds.length})
                </Button>
              </div>
            )}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <UserTableHeader
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      allSelected={allSelected}
                      someSelected={someSelected}
                      onToggleAll={toggleSelectAll}
                    />
                    <TableBody>
                      {users.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="flex flex-col items-center gap-2">
                              <Users className="h-8 w-8 text-muted-foreground" />
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
                        users.map((user, index) => (
                          <UserTableRow
                            key={user?._id || index}
                            user={user}
                            selected={selectedIds.includes(user._id)}
                            onToggleSelected={(checked) =>
                              toggleRow(user._id, checked)
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
      </div>
    </TooltipProvider>
  );
}
