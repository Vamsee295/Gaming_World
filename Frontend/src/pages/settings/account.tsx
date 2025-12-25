import React, { useState, useEffect } from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import ChangePhotoDialog from "@/components/profile/ChangePhotoDialog";
import {
  User,
  Lock,
  Link as LinkIcon,
  CreditCard,
  History,
  ShieldCheck,
  Settings2,
  Camera,
  Save,
  KeyRound,
  LogOut,
  Download,
  AlertTriangle,
  Trash2,
  Loader2,
  Wallet,
  Smartphone,
  PlusCircle,
} from "lucide-react";

interface LoginActivity {
  dateTime: string;
  device: string;
  location: string;
  status: string;
  isActive?: boolean;
}

interface LinkedAccount {
  platform: string;
  connected: boolean;
  icon?: React.ReactNode;
}

interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  details: string;
  isDefault: boolean;
  icon: React.ReactNode;
}

export default function AccountPage() {
  const { user, signOut } = useUser();
  const { toast } = useToast();
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Profile state
  const [fullName, setFullName] = useState(user?.name || "Gamer Bro");
  const [email, setEmail] = useState(user?.email || "gamerbro@epicstream.com");
  const [username, setUsername] = useState("EpicStreamerX");
  const [country, setCountry] = useState("India");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("bg-red-500");

  // Security settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [loginAlertsEnabled, setLoginAlertsEnabled] = useState(false);

  // Linked accounts
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([
    { platform: "Google", connected: true },
    { platform: "Xbox", connected: false },
    { platform: "Steam", connected: false },
  ]);

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "Visa",
      name: "Visa Credit Card (Default)",
      details: "Expires 08/26 - **** 5678",
      isDefault: true,
      icon: <Wallet className="w-6 h-6 text-yellow-500" />,
    },
    {
      id: "2",
      type: "PhonePe",
      name: "PhonePe UPI",
      details: "Connected account",
      isDefault: false,
      icon: <Smartphone className="w-6 h-6 text-green-500" />,
    },
  ]);

  // Login activity
  const [loginActivity] = useState<LoginActivity[]>([
    {
      dateTime: "2025-11-08 17:30 IST",
      device: "Windows 11 (Current Session)",
      location: "Nagapatla, India",
      status: "Active",
      isActive: true,
    },
    {
      dateTime: "2025-11-07 20:15 IST",
      device: "Android Mobile",
      location: "Chennai, India",
      status: "Success",
    },
    {
      dateTime: "2025-11-06 10:00 PST",
      device: "MacBook Pro",
      location: "Seattle, USA",
      status: "Success",
    },
  ]);

  // Password strength checker
  useEffect(() => {
    if (newPassword.length === 0) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (newPassword.length > 7) strength += 25;
    if (newPassword.match(/[a-z]/) && newPassword.match(/[A-Z]/)) strength += 25;
    if (newPassword.match(/\d/)) strength += 25;
    if (newPassword.match(/[^a-zA-Z\d]/)) strength += 25;

    setPasswordStrength(strength);

    if (strength < 50) {
      setPasswordStrengthColor("bg-red-500");
    } else if (strength < 100) {
      setPasswordStrengthColor("bg-yellow-500");
    } else {
      setPasswordStrengthColor("bg-green-500");
    }
  }, [newPassword]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    toast({
      title: message,
      variant: type === "error" ? "destructive" : "default",
    });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      showToast("Profile updated successfully! ✅", "success");
    }, 1500);
  };

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("Please fill in all password fields.", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("New passwords do not match.", "error");
      return;
    }
    if (newPassword.length < 8) {
      showToast("Password must be at least 8 characters.", "error");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordStrength(0);
      showToast("Password Changed successfully! 🔒", "success");
    }, 1500);
  };

  const handleToggleLinkAccount = (platform: string) => {
    setLinkedAccounts((prev) =>
      prev.map((account) =>
        account.platform === platform
          ? { ...account, connected: !account.connected }
          : account
      )
    );

    const account = linkedAccounts.find((a) => a.platform === platform);
    if (account?.connected) {
      showToast(`${platform} Account Disconnected.`, "info");
    } else {
      showToast(`${platform} Account Connected 🎮`, "success");
    }
  };

  const handleRemovePayment = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
    showToast("Payment method removed.", "success");
  };

  const handleLogoutAllSessions = () => {
    showToast("Successfully logged out of all other sessions.", "success");
  };

  const handleToggleSecuritySetting = (setting: string, enabled: boolean) => {
    if (setting === "2FA") {
      setTwoFactorEnabled(enabled);
    } else if (setting === "Alerts") {
      setLoginAlertsEnabled(enabled);
    }
    showToast(`${setting} ${enabled ? "Enabled" : "Disabled"}.`, "info");
  };

  const handleDownloadData = () => {
    showToast("Data download initiated. Check your email!", "success");
  };

  const handleDeleteAccount = () => {
    setIsDeleteDialogOpen(false);
    showToast("Account Deactivation Process Started. We are sad to see you go! 😢", "success");
    // Further API calls for final deletion would happen here
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Google":
        return (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google"
            className="w-6 h-6"
          />
        );
      case "Xbox":
        return <span className="text-green-500 text-xl">X</span>;
      case "Steam":
        return <span className="text-gray-400 text-xl">S</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="pb-6 border-b border-border">
          <h1 className="text-4xl font-extrabold mb-1">Account Settings</h1>
          <p className="text-muted-foreground">Manage your profile, security, and linked accounts.</p>
        </header>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold border-b border-border pb-3 flex items-center">
              <User className="w-6 h-6 mr-3 text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                {user?.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatarUrl}
                    alt="Profile Picture"
                    className="w-20 h-20 rounded-full object-cover border-4 border-primary"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center border-4 border-primary">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setIsPhotoDialogOpen(true)}
                  className="absolute bottom-0 right-0 p-1 bg-primary rounded-full border-2 border-background hover:bg-primary/90 transition duration-150"
                  aria-label="Change profile photo"
                  title="Change profile photo"
                >
                  <Camera className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>

              {/* Profile Fields */}
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div>
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input
                    id="full-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <Label htmlFor="username">Username (Optional)</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username (Optional)"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger id="country">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleSaveProfile} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold border-b border-border pb-3 flex items-center">
              <Lock className="w-6 h-6 mr-3 text-primary" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current Password"
                />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                />
              </div>
            </div>

            {/* Password Strength Meter */}
            <div className="h-2 rounded-full bg-muted overflow-hidden" role="presentation">
              <div
                className={`h-full rounded-full transition-all duration-300 ${passwordStrengthColor}`}
                style={{ width: `${passwordStrength}%` }}
                aria-label={`Password strength: ${passwordStrength}%`}
              />
            </div>

            <div>
              <Button onClick={handleUpdatePassword}>
                <KeyRound className="w-5 h-5 mr-2" />
                Update Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Linked Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold border-b border-border pb-3 flex items-center">
              <LinkIcon className="w-6 h-6 mr-3 text-primary" />
              Linked Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {linkedAccounts.map((account) => (
              <div
                key={account.platform}
                className="flex items-center justify-between p-3 bg-secondary rounded-lg"
              >
                <div className="flex items-center">
                  {getPlatformIcon(account.platform)}
                  <span className="font-medium ml-3">{account.platform}</span>
                </div>
                <Button
                  onClick={() => handleToggleLinkAccount(account.platform)}
                  variant={account.connected ? "destructive" : "default"}
                  size="sm"
                >
                  {account.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold border-b border-border pb-3 flex items-center">
              <CreditCard className="w-6 h-6 mr-3 text-primary" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center justify-between p-4 bg-secondary rounded-lg ${method.isDefault ? "border border-yellow-500/50" : ""
                  }`}
              >
                <div className="flex items-center space-x-3">
                  {method.icon}
                  <div>
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-muted-foreground">{method.details}</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleRemovePayment(method.id)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={() => showToast("Payment Add UI Not Implemented", "info")}
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add New Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Account Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold border-b border-border pb-3 flex items-center">
              <History className="w-6 h-6 mr-3 text-primary" />
              Account Activity / Login History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loginActivity.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell className="whitespace-nowrap">{activity.dateTime}</TableCell>
                      <TableCell className="whitespace-nowrap">{activity.device}</TableCell>
                      <TableCell className="whitespace-nowrap">{activity.location}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <span
                          className={
                            activity.isActive
                              ? "text-green-400 font-semibold"
                              : "text-muted-foreground"
                          }
                        >
                          {activity.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <Button onClick={handleLogoutAllSessions} variant="destructive">
                <LogOut className="w-5 h-5 mr-2" />
                Logout of All Sessions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold border-b border-border pb-3 flex items-center">
              <ShieldCheck className="w-6 h-6 mr-3 text-primary" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div>
                <p className="font-medium">Two-Factor Authentication (2FA)</p>
                <p className="text-sm text-muted-foreground">
                  Requires a code from your phone for login.
                </p>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={(checked) => handleToggleSecuritySetting("2FA", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div>
                <p className="font-medium">Login Alerts via Email</p>
                <p className="text-sm text-muted-foreground">
                  Get an email notification when a new device logs in.
                </p>
              </div>
              <Switch
                checked={loginAlertsEnabled}
                onCheckedChange={(checked) => handleToggleSecuritySetting("Alerts", checked)}
              />
            </div>

            <Button
              variant="ghost"
              className="text-primary hover:text-primary/90"
              onClick={() => showToast("Security questions reset simulation.", "success")}
            >
              Reset Security Questions
            </Button>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold border-b border-border pb-3 flex items-center">
              <Settings2 className="w-6 h-6 mr-3 text-primary" />
              Account Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button variant="outline" onClick={handleDownloadData}>
                <Download className="w-5 h-5 mr-2" />
                Download Account Data
              </Button>

              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="bg-red-800 hover:bg-red-700"
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Delete / Deactivate Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Photo Dialog */}
      <ChangePhotoDialog
        open={isPhotoDialogOpen}
        onOpenChange={setIsPhotoDialogOpen}
      />

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-destructive flex items-center">
              <Trash2 className="w-6 h-6 mr-3" />
              Confirm Deactivation
            </DialogTitle>
            <DialogDescription>
              Are you absolutely sure you want to deactivate your account? This action is permanent
              and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Yes, Deactivate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
