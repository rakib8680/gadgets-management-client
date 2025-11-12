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
  Clock,
  Edit,
  Trash2,
  ArrowLeft,
  Mail,
  User,
} from "lucide-react";
import { useGetSingleUserQuery } from "@/redux/features/userAPi";
import type { TUserInfo } from "@/types/auth";
import DeleteUserModal from "@/components/ui/modals/delete-user-modal";
import UpdateUserModal from "@/components/ui/modals/update-user-modal";
import LoadingHamster from "@/components/ui/loading-hamster/LoadingHamster";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetSingleUserQuery(id || "");
  const user = data?.data as TUserInfo | undefined;
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle modal success
  const handleSuccess = () => {
    // The query will automatically refetch due to invalidatesTags
    // No need to manually refetch
  };

  // Handle delete success - navigate back to users list
  const handleDeleteSuccess = () => {
    navigate("/dashboard/all-users");
  };

  // If loading, error, or no user found
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
            Failed to load user. Please try again.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  if (!user)
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>User Not Found</CardTitle>
          <CardDescription>The requested user does not exist.</CardDescription>
        </CardHeader>
      </Card>
    );

  return (
    <Card className="w-full max-w-6xl mx-auto mt-10 mb-20 p-6 lg:p-12 border border-gray-200">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <div>
            <CardTitle className="text-4xl font-extrabold mb-2 tracking-tight">
              {user.name}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              <span className="font-semibold">Email:</span> {user.email}
            </CardDescription>
            <CardDescription className="text-base text-gray-500 mt-1">
              <span className="font-semibold">User ID:</span> {user._id}
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
          <Badge
            variant={getRoleVariant(user.role)}
            className="text-lg px-4 py-2 capitalize"
          >
            {user.role}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
        <div className="flex-shrink-0">
          <Avatar className="w-80 h-80 border-2 border-gray-300 shadow-xl">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="text-6xl">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 space-y-6 bg-gray-50 rounded-xl p-8 border border-gray-200">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  Name
                </p>
                <p className="text-lg text-gray-700">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  Email
                </p>
                <p className="text-lg text-gray-700">{user.email}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                Role
              </p>
              <Badge
                variant={getRoleVariant(user.role)}
                className="text-base capitalize"
              >
                {user.role}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  Joined Date
                </p>
                <p className="text-lg text-gray-700">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  Last Updated
                </p>
                <p className="text-lg text-gray-700">
                  {formatDate(user.updatedAt)}
                </p>
              </div>
            </div>
          </div>
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
        <UpdateUserModal
          open={updateModalOpen}
          onOpenChange={setUpdateModalOpen}
          user={user}
          onSuccess={handleSuccess}
        />
        <DeleteUserModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          user={user}
          onSuccess={handleDeleteSuccess}
        />
      </CardContent>
    </Card>
  );
};

export default UserDetail;
