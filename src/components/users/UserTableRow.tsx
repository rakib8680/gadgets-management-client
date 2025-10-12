import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, User, Mail, Calendar, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TUserInfo } from "@/types/auth";

type UserTableRowProps = {
  user: TUserInfo;
  selected: boolean;
  onToggleSelected: (checked: boolean) => void;
};

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  selected,
  onToggleSelected,
}) => {
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
      <TableCell>
        <Checkbox
          checked={selected}
          onCheckedChange={onToggleSelected}
          aria-label={`Select ${user.name}`}
          className="cursor-pointer"
        />
      </TableCell>

      <TableCell>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback className="text-xs">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </TableCell>

      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{user.name}</span>
          <span className="text-xs text-muted-foreground">
            ID: {user._id.slice(-8)}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <Mail className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{user.email}</span>
        </div>
      </TableCell>

      <TableCell>
        <Badge variant={getRoleVariant(user.role)} className="capitalize">
          {user.role}
        </Badge>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{formatDate(user.createdAt)}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{formatDate(user.updatedAt)}</span>
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
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                // TODO: Implement view user details
                console.log("View user:", user._id);
              }}
            >
              <User className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                // TODO: Implement edit user
                console.log("Edit user:", user._id);
              }}
            >
              Edit User
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={() => {
                // TODO: Implement delete user
                console.log("Delete user:", user._id);
              }}
            >
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
