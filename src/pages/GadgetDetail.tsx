import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Calendar,
  Cpu,
  Zap,
  Edit,
  Copy,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import {
  useGetAllGadgetsQuery,
  useGetSingleGadgetQuery,
} from "@/redux/features/productsApi";
import type { TProduct } from "@/types/product";
import DeleteGadgetModal from "@/components/ui/modals/delete-gadget-modal";
import DuplicateGadgetModal from "@/components/ui/modals/duplicate-gadget-modal";
import UpdateGadgetModal from "@/components/ui/modals/update-gadget-modal";
import LoadingHamster from "@/components/ui/loading-hamster/LoadingHamster";
import getCategoryColor from "@/utils/getCategoryColor";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GadgetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetSingleGadgetQuery(id);
  const gadget = data?.data as TProduct | undefined;

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = React.useState(false);
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);

  // Fetch all gadgets (unfiltered, just for brands)
  const { data: allBrandsData } = useGetAllGadgetsQuery({
    limit: 1000, // or a number larger than your total gadgets count
  });
  const uniqueBrands = allBrandsData
    ? Array.from(
        new Set(
          (allBrandsData.data as TProduct[]).map((gadget) => gadget.brand)
        )
      ).sort()
    : [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingHamster />
      </div>
    );
  if (error)
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>
            Failed to load gadget. Please try again.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  if (!gadget)
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Gadget Not Found</CardTitle>
          <CardDescription>
            The requested gadget does not exist.
          </CardDescription>
        </CardHeader>
      </Card>
    );

  return (
    <Card className="w-full max-w-6xl mx-auto mt-10 mb-20 p-6 lg:p-12 border border-gray-200 ">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <div>
            <CardTitle className="text-4xl font-extrabold mb-2 tracking-tight">
              {gadget.name}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              <span className="font-semibold">Model:</span> {gadget.modelNo}{" "}
              &nbsp; | &nbsp;
              <span className="font-semibold">Brand:</span> {gadget.brand}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate(-1)}
            className="text-lg px-6 py-3 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Badge className={getCategoryColor(gadget.category)}>
            {gadget.category}
          </Badge>
          <span className="text-2xl font-bold text-gray-800">
            ${gadget.price.toLocaleString()}
          </span>
          <span
            className={
              gadget.quantity > 0
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {gadget.quantity} units
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
        <div className="flex-shrink-0">
          <img
            src={gadget.imageURL || "/placeholder.svg?height=320&width=320"}
            alt={gadget.name}
            className="w-80 h-80 object-cover rounded-2xl bg-muted border-2 border-gray-300 shadow-xl"
          />
        </div>
        <div className="flex-1 space-y-6 bg-gray-50 rounded-xl p-8 border border-gray-200">
          <div className="flex gap-3 flex-wrap mb-4">
            {gadget.operatingSystem && (
              <Tooltip>
                <TooltipTrigger asChild>
                  {
                    <Badge variant="outline" className="text-base w-fit">
                      <Cpu className="w-4 h-4 mr-1" />
                      {gadget.operatingSystem}
                    </Badge>
                  }
                </TooltipTrigger>
                <TooltipContent>
                  <p>Operating System</p>
                </TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-base w-fit">
                  <Zap className="w-4 h-4 mr-1" />
                  {gadget.powerSource}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Power Source</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-base w-fit">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(gadget.releaseDate).toLocaleDateString()}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Release Date</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Connectivity:</span>{" "}
            {gadget.connectivity.join(", ")}
          </div>
          {gadget.compatibility && gadget.compatibility.length > 0 && (
            <div className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">Compatibility:</span>{" "}
              {gadget.compatibility.join(", ")}
            </div>
          )}
          {gadget.weight && (
            <div className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">Weight:</span> {gadget.weight}g
            </div>
          )}
          {gadget.dimensions && (
            <div className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">Dimensions:</span>{" "}
              {gadget.dimensions.width} x {gadget.dimensions.height} x{" "}
              {gadget.dimensions.depth} mm
            </div>
          )}
          {gadget.features && Object.keys(gadget.features).length > 0 && (
            <div className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">Features:</span>
              <ul className="list-disc ml-6 mt-1">
                {Object.entries(gadget.features)
                  .filter(([key]) => key !== "_id")
                  .map(([key, value]) => (
                    <li key={key} className="capitalize">
                      <span className="font-semibold">{key}:</span>{" "}
                      {String(value)}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      <CardContent>
        <div className="flex flex-wrap gap-6 mt-8 justify-between">
          <Button
            onClick={() => setDeleteModalOpen(true)}
            variant="destructive"
            size="lg"
            className="text-lg px-8 py-4 cursor-pointer"
          >
            <Trash2 className="mr-3 h-5 w-5" /> Delete
          </Button>
          <div className="flex gap-4">
            <Button
              onClick={() => setDuplicateModalOpen(true)}
              variant="secondary"
              size="lg"
              className="text-lg px-8 py-4 cursor-pointer"
            >
              <Copy className="mr-3 h-5 w-5" /> Duplicate
            </Button>
            <Button
              onClick={() => setUpdateModalOpen(true)}
              variant="default"
              size="lg"
              className="text-lg px-8 py-4 cursor-pointer"
            >
              <Edit className="mr-3 h-5 w-5" /> Edit
            </Button>
          </div>
        </div>
        {/* Modals */}
        <UpdateGadgetModal
          open={updateModalOpen}
          onOpenChange={setUpdateModalOpen}
          brands={uniqueBrands}
          gadget={gadget}
        />
        <DuplicateGadgetModal
          open={duplicateModalOpen}
          onOpenChange={setDuplicateModalOpen}
          gadget={gadget}
        />
        <DeleteGadgetModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          gadget={gadget}
        />
      </CardContent>
    </Card>
  );
};

export default GadgetDetail;
