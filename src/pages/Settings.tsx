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
  ArrowLeft,
  Home,
  Settings as SettingsIcon,
  Bell,
  Eye,
  Palette,
  Database,
  Key,
  Monitor,
  Moon,
  Sun,
  AlertTriangle,
  Lock,
  ShieldCheck,
  Activity,
  FileText,
  Languages,
  MapPin,
  Zap,
  BarChart3,
  HelpCircle,
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
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
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

  // Settings state
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
    security: true,
    updates: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showActivity: true,
    dataCollection: true,
    analytics: true,
  });
  const [appearance, setAppearance] = useState({
    theme: "system",
    language: "en",
    timezone: "UTC",
    density: "comfortable",
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
  });

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          {/* Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>

          {/* Navigation Skeleton */}
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>

          {/* Content Grid Skeleton */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-4 md:p-6">
          <Card className="border-destructive/40">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertTriangle className="size-5" />
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <Home className="size-4" />
              Home
            </Button>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="size-8 text-primary" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Manage your account settings, preferences, and security options
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Overview Card */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-20 border-4 border-background shadow-lg">
                      <AvatarImage
                        src={user?.image}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback className="text-lg font-semibold">
                        {user?.name?.slice(0, 2)?.toUpperCase() || "US"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {user?.name || "User"}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="secondary"
                          className="capitalize text-sm"
                        >
                          <Shield className="size-3 mr-1" />{" "}
                          {user?.role || "user"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Activity className="size-3 mr-1" /> Active
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Member since{" "}
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "—"}
                      </p>
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
                      />
                      Refresh
                    </Button>
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                      <DialogTrigger asChild>
                        <Button variant="secondary" className="gap-2">
                          <Pencil className="size-4" /> Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                          <DialogDescription>
                            Update your basic information. Changes will be saved
                            to your account.
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={handleSubmitUpdate}
                          className="space-y-4"
                        >
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
                            <Button type="submit" className="gap-2">
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <LogoutButton variant="outline" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Email Address
                      </div>
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
                      <div className="font-mono text-sm break-all bg-muted p-2 rounded">
                        {user?._id || "—"}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CalendarClock className="size-4 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">
                        Last Updated
                      </div>
                      <div className="font-medium">
                        {user?.updatedAt
                          ? new Date(user.updatedAt).toLocaleDateString()
                          : "—"}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        onClick={handleDownloadJson}
                        className="gap-2"
                      >
                        <Download className="size-4" /> Export Data
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleCopyEmail}
                        className="gap-2"
                      >
                        <Copy className="size-4" /> Copy Email
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-green-600" />
                  Security & Privacy
                </CardTitle>
                <CardDescription>
                  Manage your account security, privacy settings, and data
                  preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Lock className="size-4" />
                      Authentication
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            Two-Factor Authentication
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Add an extra layer of security
                          </div>
                        </div>
                        <Button
                          variant={security.twoFactor ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            setSecurity((prev) => ({
                              ...prev,
                              twoFactor: !prev.twoFactor,
                            }))
                          }
                        >
                          {security.twoFactor ? "Enabled" : "Enable"}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Login Alerts</div>
                          <div className="text-sm text-muted-foreground">
                            Get notified of new sign-ins
                          </div>
                        </div>
                        <Button
                          variant={security.loginAlerts ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            setSecurity((prev) => ({
                              ...prev,
                              loginAlerts: !prev.loginAlerts,
                            }))
                          }
                        >
                          {security.loginAlerts ? "On" : "Off"}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Eye className="size-4" />
                      Privacy
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Profile Visibility</div>
                          <div className="text-sm text-muted-foreground">
                            Who can see your profile
                          </div>
                        </div>
                        <Badge variant="outline">
                          {privacy.profileVisibility}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Show Email</div>
                          <div className="text-sm text-muted-foreground">
                            Display email in profile
                          </div>
                        </div>
                        <Button
                          variant={privacy.showEmail ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            setPrivacy((prev) => ({
                              ...prev,
                              showEmail: !prev.showEmail,
                            }))
                          }
                        >
                          {privacy.showEmail ? "Show" : "Hide"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="size-5 text-blue-600" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Choose how and when you want to be notified about updates and
                  activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Communication</h4>
                    <div className="space-y-3">
                      {[
                        {
                          key: "email",
                          label: "Email Notifications",
                          desc: "Receive updates via email",
                        },
                        {
                          key: "push",
                          label: "Push Notifications",
                          desc: "Browser and mobile notifications",
                        },
                        {
                          key: "sms",
                          label: "SMS Alerts",
                          desc: "Text message notifications",
                        },
                      ].map(({ key, label, desc }) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium">{label}</div>
                            <div className="text-sm text-muted-foreground">
                              {desc}
                            </div>
                          </div>
                          <Button
                            variant={
                              notifications[key as keyof typeof notifications]
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              setNotifications((prev) => ({
                                ...prev,
                                [key]: !prev[key as keyof typeof notifications],
                              }))
                            }
                          >
                            {notifications[key as keyof typeof notifications]
                              ? "On"
                              : "Off"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Content</h4>
                    <div className="space-y-3">
                      {[
                        {
                          key: "marketing",
                          label: "Marketing Emails",
                          desc: "Product updates and offers",
                        },
                        {
                          key: "security",
                          label: "Security Alerts",
                          desc: "Important security notifications",
                        },
                        {
                          key: "updates",
                          label: "System Updates",
                          desc: "Platform and feature updates",
                        },
                      ].map(({ key, label, desc }) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium">{label}</div>
                            <div className="text-sm text-muted-foreground">
                              {desc}
                            </div>
                          </div>
                          <Button
                            variant={
                              notifications[key as keyof typeof notifications]
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              setNotifications((prev) => ({
                                ...prev,
                                [key]: !prev[key as keyof typeof notifications],
                              }))
                            }
                          >
                            {notifications[key as keyof typeof notifications]
                              ? "On"
                              : "Off"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="size-5 text-purple-600" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize your interface preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Theme</Label>
                  <div className="flex gap-2 mt-2">
                    {[
                      { key: "light", icon: Sun, label: "Light" },
                      { key: "dark", icon: Moon, label: "Dark" },
                      { key: "system", icon: Monitor, label: "System" },
                    ].map(({ key, icon: Icon, label }) => (
                      <Button
                        key={key}
                        variant={
                          appearance.theme === key ? "default" : "outline"
                        }
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={() =>
                          setAppearance((prev) => ({
                            ...prev,
                            theme: key as any,
                          }))
                        }
                      >
                        <Icon className="size-4" />
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Language</Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                    >
                      <Languages className="size-4" />
                      English
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Timezone</Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                    >
                      <MapPin className="size-4" />
                      UTC
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="size-5 text-orange-600" />
                  Account Statistics
                </CardTitle>
                <CardDescription>
                  Overview of your account activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-xs text-muted-foreground">
                      Gadgets Listed
                    </div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-xs text-muted-foreground">
                      Items Sold
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Account Health</span>
                    <span className="font-medium text-green-600">
                      Excellent
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Last Login</span>
                    <span className="font-medium">2 hours ago</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Storage Used</span>
                    <span className="font-medium">2.4 GB / 10 GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="size-5 text-yellow-600" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common account management tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Key className="size-4" />
                  Change Password
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Database className="size-4" />
                  Download Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <FileText className="size-4" />
                  View Activity Log
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <HelpCircle className="size-4" />
                  Help & Support
                </Button>
                <Separator />
                <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full justify-start gap-2"
                    >
                      <Trash2 className="size-4" />
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Account</DialogTitle>
                      <DialogDescription>
                        This action is permanent and cannot be undone. Type
                        DELETE to confirm.
                      </DialogDescription>
                    </DialogHeader>
                    <DeleteConfirm onConfirm={handleConfirmDelete} />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
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
