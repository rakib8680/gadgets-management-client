import { useCallback, useState } from "react";
import { Users } from "lucide-react";
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
import UserFilters from "./UserFilters";
import { useDebounced } from "@/redux/hooks";
import type { TUserInfo } from "@/types/auth";
import { useSelection } from "@/hooks/useSelection";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import UpdateUserModal from "../ui/modals/update-user-modal";
import DeleteUserModal from "../ui/modals/delete-user-modal";

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

  // Modal states
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TUserInfo | null>(null);

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
  const getId = useCallback((user: TUserInfo) => user._id, []);
  const currentUser = useAppSelector(selectCurrentUser);
  const isSelectable = useCallback(
    (_user: TUserInfo) => {
      if (!currentUser) return false;
      // Only admin can select users
      return currentUser.role === "admin";
    },
    [currentUser]
  );

  const { selectedIds, allSelected, someSelected, toggleSelectAll, toggleRow } =
    useSelection<TUserInfo>(users, getId, { isSelectable });

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

  const handleUpdate = (user: TUserInfo) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };

  const handleDelete = (user: TUserInfo) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleModalSuccess = () => {
    refetch();
  };

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
          <UserFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterRole={filterRole}
            setFilterRole={setFilterRole}
            pageSize={pageSize}
            setPageSize={setPageSize}
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
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
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
        <UpdateUserModal
          open={updateModalOpen}
          onOpenChange={setUpdateModalOpen}
          user={selectedUser}
          onSuccess={handleModalSuccess}
        />
        <DeleteUserModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          user={selectedUser}
          onSuccess={handleModalSuccess}
        />
      </div>
    </TooltipProvider>
  );
}
