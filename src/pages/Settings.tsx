import { useGetMyProfileQuery } from "@/redux/features/userAPi";
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
} from "lucide-react";

const Settings = () => {
  const {
    data: profileData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetMyProfileQuery({});

  const user = profileData?.data;

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

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
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
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <Card>
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
    </div>
  );
};

export default Settings;
