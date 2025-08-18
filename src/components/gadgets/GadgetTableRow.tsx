import React, { useMemo } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Calendar,
  Cpu,
  Zap,
  Eye,
} from "lucide-react";
import type { TConnectivity, TProduct } from "@/types/product"; // Ensure these types are correctly imported
import { useNavigate } from "react-router-dom";
import getCategoryColor from "@/utils/getCategoryColor";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { canPerformGadgetActions } from "@/utils/permissions";

type GadgetTableRowProps = {
  gadget: TProduct;
  onUpdate: (gadget: TProduct) => void;
  onDuplicate: (gadget: TProduct) => void;
  onDelete: (gadget: TProduct) => void;
};

const GadgetTableRow: React.FC<GadgetTableRowProps> = ({
  gadget,
  onUpdate,
  onDuplicate,
  onDelete,
}) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  //check if user can perform actions on the gadget
  const canPerformActions = useMemo(() => {
    return canPerformGadgetActions(user, gadget);
  }, [user, gadget]);

  const formatConnectivity = (connectivity: TConnectivity[]) => {
    return (
      connectivity.slice(0, 4).join(", ") +
      (connectivity.length > 4 ? "..." : "")
    );
  };

  return (
    <TableRow>
      {/* image */}
      <TableCell>
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
          <img
            src={gadget.imageURL || "/placeholder.svg?height=64&width=64"}
            alt={gadget.name}
            className="w-full h-full object-cover"
          />
        </div>
      </TableCell>
      {/* name */}
      <TableCell>
        <div className="max-w-[200px]">
          <p className="font-medium truncate">{gadget.name}</p>
          <p className="text-sm text-muted-foreground truncate">
            Model: {gadget.modelNo}
          </p>
        </div>
      </TableCell>
      {/* category */}
      <TableCell>
        <Badge className={getCategoryColor(gadget.category)}>
          {gadget.category}
        </Badge>
      </TableCell>
      {/* brand */}
      <TableCell className="font-medium">{gadget.brand}</TableCell>
      {/* price */}
      <TableCell className="font-medium">
        ${gadget.price.toLocaleString()}
      </TableCell>
      {/* quantity */}
      <TableCell>
        <span
          className={gadget.quantity > 0 ? "text-green-600" : "text-red-600"}
        >
          {gadget.quantity} units
        </span>
      </TableCell>
      {/* details */}
      <TableCell className="max-w-[150px]">
        <div className="flex flex-col gap-1 items-start">
          {gadget.operatingSystem && (
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className="text-xs w-fit">
                  <Cpu className="w-3 h-3 mr-1" />
                  {gadget.operatingSystem}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Operating System</TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="outline" className="text-xs w-fit">
                <Zap className="w-3 h-3 mr-1" />
                {gadget.powerSource}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>Power Source</TooltipContent>
          </Tooltip>
          {gadget.connectivity.length > 0 && (
            <Tooltip>
              <TooltipTrigger>
                <p className="text-xs text-muted-foreground">
                  {formatConnectivity(gadget.connectivity)}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <div>
                  <p className="font-semibold">Connectivity:</p>
                  <p>{gadget.connectivity.join(", ")}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TableCell>
      {/* release date */}
      <TableCell className="text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {new Date(gadget.releaseDate).toLocaleDateString()}
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
                  navigate(`/dashboard/gadgets/${gadget._id}`);
                }}
              >
                <span className="sr-only">View gadget</span>
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View details</TooltipContent>
          </Tooltip>
          {canPerformActions ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onUpdate(gadget)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDuplicate(gadget)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(gadget)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span className="inline-block h-8 w-8" />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default GadgetTableRow;
