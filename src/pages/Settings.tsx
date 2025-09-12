import {
  useGetMyProfileQuery,
  // useUpdateMyProfileMutation,
  // useDeleteMyAccountMutation,
} from "@/redux/features/userAPi";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/auth/LogOutButton";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Mail,
  Shield,
  CalendarClock,
  RefreshCw,
  Copy,
  Download,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Settings = () => {
  const {
    data: profileData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetMyProfileQuery({});

  // const [updateMyProfile, { isLoading: isUpdating }] =
  //   useUpdateMyProfileMutation();
  // const [deleteMyAccount, { isLoading: isDeleting }] =
  //   useDeleteMyAccountMutation();

  const user = profileData?.data;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");

  const handleCopyEmail = async () => {
    if (!user?.email) return;
    try {
      await navigator.clipboard.writeText(user.email);
    } catch (e) {
      // noop: clipboard may be blocked
    }
  };

  const handleDownloadJson = () => {
    if (!profileData) return;
    const blob = new Blob([JSON.stringify(profileData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "profile.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // await updateMyProfile({ name, image }).unwrap();
      setEditOpen(false);
      refetch();
    } catch {}
  };

  const handleConfirmDelete = async () => {
    try {
      // await deleteMyAccount().unwrap();
      setDeleteOpen(false);
      // Optionally you could redirect or auto-logout; keeping simple here
    } catch {}
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex items-start gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <CardAction className="flex gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </CardAction>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-48" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-6">
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-destructive">
              Failed to load profile
            </CardTitle>
            <CardDescription>
              {typeof error === "object" &&
              error !== null &&
              "status" in (error as any)
                ? `Error ${(error as any).status}`
                : "Something went wrong while fetching your profile."}
            </CardDescription>
            <CardAction>
              <Button
                variant="outline"
                onClick={() => refetch()}
                className="gap-2"
              >
                <RefreshCw className="size-4" /> Try again
              </Button>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarImage src={user?.image} alt={user?.name || "User"} />
                <AvatarFallback>
                  {user?.name?.slice(0, 2)?.toUpperCase() || "US"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">
                  {user?.name || "User"}
                </CardTitle>
                <div className="mt-1 flex items-center gap-2">
                  <Badge className="capitalize">
                    <Shield className="size-3" /> {user?.role || "user"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => refetch()}
                disabled={isFetching}
                className="gap-2"
              >
                <RefreshCw
                  className={`size-4 ${isFetching ? "animate-spin" : ""}`}
                />{" "}
                Refresh
              </Button>
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-2">
                    <Pencil className="size-4" /> Edit profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Update your basic information. Changes will be saved to
                      your account.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmitUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        placeholder="https://..."
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setEditOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        // disabled={isUpdating}
                        className="gap-2"
                      >
                        {/* {isUpdating && (
                          <RefreshCw className="size-4 animate-spin" />
                        )} */}
                        Save changes
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="size-4" /> Delete account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete account</DialogTitle>
                    <DialogDescription>
                      This action is permanent and cannot be undone. Type DELETE
                      to confirm.
                    </DialogDescription>
                  </DialogHeader>
                  <DeleteConfirm
                    onConfirm={handleConfirmDelete}
                    // loading={isDeleting}
                  />
                </DialogContent>
              </Dialog>
              <LogoutButton variant="outline" />
            </div>
          </div>
          <CardDescription className="mt-2">
            Manage your account information and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Email</div>
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-muted-foreground" />
                  <span className="font-medium break-all">
                    {user?.email || "—"}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyEmail}
                    className="ml-1"
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  User ID
                </div>
                <div className="font-mono text-sm break-all">
                  {user?._id || "—"}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CalendarClock className="size-4 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">Joined</div>
                <div className="font-medium">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "—"}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CalendarClock className="size-4 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  Last updated
                </div>
                <div className="font-medium">
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString()
                    : "—"}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Profile actions
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={handleDownloadJson}
                    className="gap-2"
                  >
                    <Download className="size-4" /> Download JSON
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCopyEmail}
                    className="gap-2"
                  >
                    <Copy className="size-4" /> Copy email
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => refetch()}
                    className="gap-2"
                  >
                    <RefreshCw className="size-4" /> Refresh
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Security
                </div>
                <div className="text-sm text-muted-foreground">
                  Role determines your access level within the dashboard.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account preferences</CardTitle>
          <CardDescription>
            Configure display, notifications, and privacy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <Badge variant="outline">System</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Email notifications</span>
            <Badge>Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Privacy</span>
            <Badge variant="secondary">Standard</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional profile</CardTitle>
          <CardDescription>
            Information visible to collaborators and in shared reports.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Role</span>
            <span className="font-medium capitalize">{user?.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Contact</span>
            <span className="font-medium break-all">{user?.email}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function DeleteConfirm({
  onConfirm,
  loading,
}: {
  onConfirm: () => void;
  loading?: boolean;
}) {
  const [text, setText] = useState("");
  const canDelete = text.trim() === "DELETE";
  return (
    <div className="space-y-4">
      <Input
        placeholder="Type DELETE"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <DialogFooter>
        <Button variant="ghost" type="button">
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          disabled={!canDelete || loading}
          className="gap-2"
        >
          {loading && <RefreshCw className="size-4 animate-spin" />}
          Permanently delete
        </Button>
      </DialogFooter>
    </div>
  );
}

export default Settings;
