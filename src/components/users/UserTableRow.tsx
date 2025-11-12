import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MoreHorizontal,
  Mail,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { TUserInfo } from "@/types/auth";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

type UserTableRowProps = {
  user: TUserInfo;
  selected?: boolean;
  onToggleSelected?: (checked: boolean) => void;
  onUpdate: (user: TUserInfo) => void;
  onDelete: (user: TUserInfo) => void;
};

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  selected,
  onToggleSelected,
  onUpdate,
  onDelete,
}) => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);
  const isCurrentUser = currentUser?._id === user._id;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get role badge variant
  const getRoleVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "destructive" as const;
      case "seller":
        return "default" as const;
      case "buyer":
        return "secondary" as const;
      default:
        return "outline" as const;
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <TableRow className="hover:bg-muted/50">
      {/* checkbox */}
      <TableCell>
        <Checkbox
          checked={selected}
          onCheckedChange={(value) => onToggleSelected?.(Boolean(value))}
          aria-label={`Select ${user.name}`}
          disabled={isCurrentUser}
          className="cursor-pointer"
        />
      </TableCell>
      {/* avatar */}
      <TableCell>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback className="text-xs">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      {/* name */}
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{user.name}</span>
          <span className="text-xs text-muted-foreground">
            ID: {user._id.slice(-8)}
          </span>
        </div>
      </TableCell>
      {/* email */}
      <TableCell>
        <div className="flex items-center gap-2">
          <Mail className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{user.email}</span>
        </div>
      </TableCell>
      {/* role */}
      <TableCell>
        <Badge variant={getRoleVariant(user.role)} className="capitalize">
          {user.role}
        </Badge>
      </TableCell>
      {/* joined date */}
      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{formatDate(user.createdAt)}</span>
        </div>
      </TableCell>
      {/* last updated */}
      <TableCell>
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{formatDate(user.updatedAt)}</span>
        </div>
      </TableCell>
      {/* actions */}
      <TableCell className="h-20 w-[120px]">
        <div className="w-full flex items-center gap-2 justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 p-0 cursor-pointer"
                onClick={() => {
                  navigate(`/dashboard/all-users/${user._id}`);
                }}
              >
                <span className="sr-only">View user</span>
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View details</TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onUpdate(user)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Update User
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                onClick={() => onDelete(user)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
