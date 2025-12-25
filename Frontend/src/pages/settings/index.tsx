import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  User, Mail, Bell, Shield, Download, Palette, Globe, Lock,
  Save, Trash2, Eye, EyeOff, Smartphone, CreditCard, Gamepad2,
  ArrowLeft, AlertTriangle, CheckCircle2, XCircle, Monitor, Tablet,
  MapPin, Key, KeyRound, LogOut, Keyboard, Clock
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsPage() {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();

  // Account & Security
  const [username, setUsername] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginAlerts, setLoginAlerts] = useState(true);

  // Profile & Privacy
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [libraryVisibility, setLibraryVisibility] = useState("friends");
  const [onlineStatus, setOnlineStatus] = useState("online");
  const [friendRequestPolicy, setFriendRequestPolicy] = useState("everyone");

  // Store & Payments
  const [currency, setCurrency] = useState("INR");
  const [oneClickPurchase, setOneClickPurchase] = useState(false);
  const [purchaseLimit, setPurchaseLimit] = useState("500");
  const [savePaymentMethod, setSavePaymentMethod] = useState(true);

  // Downloads & Updates
  const [autoUpdate, setAutoUpdate] = useState("always");
  const [downloadLimit, setDownloadLimit] = useState("unlimited");
  const [downloadsWhilePlaying, setDownloadsWhilePlaying] = useState(true);
  const [installPath, setInstallPath] = useState("C:\\Program Files\\GameVerse\\Games");

  // Interface & Theme
  const [appTheme, setAppTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [region, setRegion] = useState("IN");

  // Notifications
  const [emailPurchases, setEmailPurchases] = useState(true);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [emailFriendActivity, setEmailFriendActivity] = useState(true);
  const [notifyDownloads, setNotifyDownloads] = useState(true);
  const [notifyAchievements, setNotifyAchievements] = useState(true);

  // In-Game & Overlay
  const [overlayEnabled, setOverlayEnabled] = useState(true);
  const [overlayShortcut, setOverlayShortcut] = useState("Shift+Tab");
  const [inGameNotifications, setInGameNotifications] = useState(true);

  // Devices & Controllers
  const [controllerType, setControllerType] = useState("xbox");
  const [vibration, setVibration] = useState(true);

  // Delete Account Dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Success Dialog
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Error Dialog
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ========== PHASE 1: NEW STATE VARIABLES ==========

  // Password visibility toggles
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthText, setPasswordStrengthText] = useState("");

  // Two-Factor Authentication
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);

  // Active Sessions
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 1,
      device: "Windows PC",
      location: "Mumbai, India",
      lastActive: "Active now",
      isCurrent: true,
      icon: "monitor"
    },
    {
      id: 2,
      device: "Android Phone",
      location: "Mumbai, India",
      lastActive: "2 hours ago",
      isCurrent: false,
      icon: "smartphone"
    },
    {
      id: 3,
      device: "iPad Pro",
      location: "Delhi, India",
      lastActive: "1 day ago",
      isCurrent: false,
      icon: "tablet"
    }
  ]);

  // Spending limit & password confirmation
  const [spendingLimit, setSpendingLimit] = useState("5000");
  const [requirePasswordAbove, setRequirePasswordAbove] = useState("2000");

  // Editable overlay shortcut
  const [isEditingShortcut, setIsEditingShortcut] = useState(false);

  // Data download
  const [isDownloadingData, setIsDownloadingData] = useState(false);

  // ========== PHASE 2: NEW STATE VARIABLES ==========

  // Last login display
  const [lastLoginDate, setLastLoginDate] = useState("2025-12-23 10:30 AM");
  const [lastLoginDevice, setLastLoginDevice] = useState("Windows PC");

  // Storage usage
  const [storageUsage] = useState({
    total: 500, // GB
    used: 348,
    games: [
      { name: "Cyberpunk 2077", size: 70 },
      { name: "Red Dead Redemption 2", size: 150 },
      { name: "Call of Duty: Warzone", size: 85 },
      { name: "GTA V", size: 72 },
      { name: "Final Fantasy XVI", size: 55 }
    ]
  });

  // Overlay customization
  const [overlayPosition, setOverlayPosition] = useState("top-right");
  const [overlayOpacity, setOverlayOpacity] = useState(90);
  const [overlaySize, setOverlaySize] = useState("medium");
  const [showFPS, setShowFPS] = useState(false);
  const [showNetworkMonitor, setShowNetworkMonitor] = useState(false);

  // Notification frequency
  const [emailFrequency, setEmailFrequency] = useState("weekly");

  // Do Not Disturb
  const [dndEnabled, setDndEnabled] = useState(false);
  const [dndStartTime, setDndStartTime] = useState("22:00");
  const [dndEndTime, setDndEndTime] = useState("08:00");

  const handleSaveChanges = (section: string) => {
    setSuccessMessage(`${section} settings saved successfully!`);
    setIsSuccessDialogOpen(true);
  };

  const handlePasswordUpdate = () => {
    // Validate all fields are filled
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage("All password fields are required!");
      setIsErrorDialogOpen(true);
      return;
    }

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setIsErrorDialogOpen(true);
      return;
    }

    // Validate new password is different from old
    if (oldPassword === newPassword) {
      setErrorMessage("New password must be different from current password!");
      setIsErrorDialogOpen(true);
      return;
    }

    // If all validations pass, show success
    handleSaveChanges("Password");
    // Clear password fields
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // ========== PHASE 1: HELPER FUNCTIONS ==========

  // Password strength calculator
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    let text = "";

    if (password.length === 0) {
      setPasswordStrength(0);
      setPasswordStrengthText("");
      return;
    }

    // Length check
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;

    // Character variety checks
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 20;

    // Determine text
    if (strength < 40) text = "Weak";
    else if (strength < 70) text = "Medium";
    else text = "Strong";

    setPasswordStrength(strength);
    setPasswordStrengthText(text);
  };

  // Handle session logout
  const handleLogoutSession = (sessionId: number) => {
    setActiveSessions(activeSessions.filter(s => s.id !== sessionId));
    setSuccessMessage("Session logged out successfully!");
    setIsSuccessDialogOpen(true);
  };

  const handleLogoutAllOthers = () => {
    setActiveSessions(activeSessions.filter(s => s.isCurrent));
    setSuccessMessage("All other sessions logged out successfully!");
    setIsSuccessDialogOpen(true);
  };

  // Handle shortcut key capture
  const handleShortcutKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isEditingShortcut) return;

    e.preventDefault();
    const keys: string[] = [];

    if (e.ctrlKey) keys.push("Ctrl");
    if (e.shiftKey) keys.push("Shift");
    if (e.altKey) keys.push("Alt");

    const key = e.key;
    if (key !== "Control" && key !== "Shift" && key !== "Alt") {
      keys.push(key.toUpperCase());
    }

    if (keys.length > 0) {
      setOverlayShortcut(keys.join("+"));
    }
  };

  // Download user data (GDPR compliance)
  const handleDownloadData = () => {
    setIsDownloadingData(true);

    setTimeout(() => {
      const userData = {
        profile: {
          username: username,
          email: email,
          region: region,
          language: language
        },
        settings: {
          privacy: {
            profileVisibility,
            libraryVisibility,
            onlineStatus,
            friendRequestPolicy
          },
          store: {
            currency,
            oneClickPurchase,
            savePaymentMethod,
            spendingLimit,
            requirePasswordAbove
          },
          notifications: {
            emailPurchases,
            emailMarketing,
            emailFriendActivity,
            notifyDownloads,
            notifyAchievements
          }
        },
        exportDate: new Date().toISOString()
      };

      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `gameverse-data-${new Date().getTime()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsDownloadingData(false);
      setSuccessMessage("Your data has been downloaded successfully!");
      setIsSuccessDialogOpen(true);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Settings - GameVerse</title>
      </Head>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <BackButton className="mb-4" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-4 text-foreground">Settings</h1>
              <p className="text-xl text-muted-foreground">
                Manage your account, privacy, and preferences
              </p>
            </motion.div>
          </div>
        </div>

        {/* Settings with Sidebar */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="account" className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-4">
                <TabsList className="flex flex-col h-auto w-full bg-card border border-border rounded-lg p-2 space-y-1">
                  <TabsTrigger value="account" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Shield className="h-5 w-5" />
                    <span className="text-sm font-medium">Account</span>
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Eye className="h-5 w-5" />
                    <span className="text-sm font-medium">Privacy</span>
                  </TabsTrigger>
                  <TabsTrigger value="store" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <CreditCard className="h-5 w-5" />
                    <span className="text-sm font-medium">Store</span>
                  </TabsTrigger>
                  <TabsTrigger value="downloads" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Download className="h-5 w-5" />
                    <span className="text-sm font-medium">Downloads</span>
                  </TabsTrigger>
                  <TabsTrigger value="interface" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Palette className="h-5 w-5" />
                    <span className="text-sm font-medium">Interface</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Bell className="h-5 w-5" />
                    <span className="text-sm font-medium">Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger value="ingame" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Gamepad2 className="h-5 w-5" />
                    <span className="text-sm font-medium">In-Game</span>
                  </TabsTrigger>
                  <TabsTrigger value="devices" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Smartphone className="h-5 w-5" />
                    <span className="text-sm font-medium">Devices</span>
                  </TabsTrigger>
                  <TabsTrigger value="data" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Trash2 className="h-5 w-5" />
                    <span className="text-sm font-medium">Data</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">

              {/* 1. Account & Security */}
              <TabsContent value="account">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Account Information
                      </CardTitle>
                      <CardDescription>Update your account details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <div className="flex gap-2">
                          <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                          />
                          <Button onClick={() => handleSaveChanges("Username")}>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="flex gap-2">
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                          />
                          <Button onClick={() => handleSaveChanges("Email")}>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          You may be asked to re-enter your password to confirm
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        Change Password
                      </CardTitle>
                      <CardDescription>Keep your account secure</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Current Password with show/hide toggle */}
                      <div className="space-y-2">
                        <Label htmlFor="old-password">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="old-password"
                            type={showOldPassword ? "text" : "password"}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Enter current password"
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                          >
                            {showOldPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* New Password with show/hide toggle and strength indicator */}
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Input
                            id="new-password"
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                              calculatePasswordStrength(e.target.value);
                            }}
                            placeholder="Enter new password"
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>

                        {/* Password Strength Indicator */}
                        {newPassword && (
                          <div className="space-y-2 mt-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">Password Strength:</span>
                              <span className={`text-xs font-semibold ${passwordStrength < 40 ? 'text-red-500' :
                                passwordStrength < 70 ? 'text-yellow-500' : 'text-green-500'
                                }`}>
                                {passwordStrengthText}
                              </span>
                            </div>
                            <Progress
                              value={passwordStrength}
                              className={`h-2 ${passwordStrength < 40 ? '[&>*]:bg-red-500' :
                                passwordStrength < 70 ? '[&>*]:bg-yellow-500' : '[&>*]:bg-green-500'
                                }`}
                            />
                            <div className="text-xs space-y-1 mt-2">
                              <p className={newPassword.length >= 8 ? 'text-green-500' : 'text-muted-foreground'}>
                                • At least 8 characters
                              </p>
                              <p className={/[A-Z]/.test(newPassword) ? 'text-green-500' : 'text-muted-foreground'}>
                                • One uppercase letter
                              </p>
                              <p className={/[a-z]/.test(newPassword) ? 'text-green-500' : 'text-muted-foreground'}>
                                • One lowercase letter
                              </p>
                              <p className={/[0-9]/.test(newPassword) ? 'text-green-500' : 'text-muted-foreground'}>
                                • One number
                              </p>
                              <p className={/[^a-zA-Z0-9]/.test(newPassword) ? 'text-green-500' : 'text-muted-foreground'}>
                                • One special character
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Confirm Password with show/hide toggle */}
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Button onClick={handlePasswordUpdate}>
                        Update Password
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Security Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="login-alerts">Login Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Email me when a new device logs in to my account
                          </p>
                        </div>
                        <Switch
                          id="login-alerts"
                          checked={loginAlerts}
                          onCheckedChange={setLoginAlerts}
                        />
                      </div>

                      <Separator />

                      {/* Last Login Display - Phase 2 */}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Last Login</p>
                            <p className="text-xs text-muted-foreground">
                              {lastLoginDate} • {lastLoginDevice}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Two-Factor Authentication */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="2fa" className="flex items-center gap-2">
                              <KeyRound className="h-4 w-4" />
                              Two-Factor Authentication (2FA)
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch
                            id="2fa"
                            checked={twoFactorEnabled}
                            onCheckedChange={(checked) => {
                              setTwoFactorEnabled(checked);
                              if (checked) setShow2FASetup(true);
                            }}
                          />
                        </div>

                        {twoFactorEnabled && show2FASetup && (
                          <div className="p-4 rounded-lg bg-muted space-y-4">
                            <div className="text-sm">
                              <p className="font-semibold mb-2">Setup 2FA</p>
                              <p className="text-muted-foreground mb-4">
                                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                              </p>
                              <div className="flex justify-center p-6 bg-white rounded-lg">
                                <div className="w-48 h-48 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                  QR Code Placeholder
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-4">
                                Manual key: ABCD-EFGH-IJKL-MNOP
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setShow2FASetup(false);
                                  handleSaveChanges("Two-Factor Authentication");
                                }}
                              >
                                Complete Setup
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setShow2FASetup(false);
                                  setTwoFactorEnabled(false);
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}

                        {twoFactorEnabled && !show2FASetup && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>2FA is enabled and protecting your account</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Sessions */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Monitor className="h-5 w-5" />
                            Active Sessions
                          </CardTitle>
                          <CardDescription>Manage devices logged into your account</CardDescription>
                        </div>
                        {activeSessions.filter(s => !s.isCurrent).length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogoutAllOthers}
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout All Others
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {activeSessions.map((session) => {
                        const Icon = session.icon === "monitor" ? Monitor :
                          session.icon === "smartphone" ? Smartphone : Tablet;
                        return (
                          <div
                            key={session.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-full bg-primary/10">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-sm">{session.device}</p>
                                  {session.isCurrent && (
                                    <Badge variant="secondary" className="text-xs">Current</Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span>{session.location}</span>
                                  <span>•</span>
                                  <Clock className="h-3 w-3" />
                                  <span>{session.lastActive}</span>
                                </div>
                              </div>
                            </div>
                            {!session.isCurrent && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleLogoutSession(session.id)}
                              >
                                <LogOut className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* 2. Profile & Privacy */}
              <TabsContent value="privacy">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Privacy Settings
                      </CardTitle>
                      <CardDescription>Control what others can see</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="profile-visibility">Profile Visibility</Label>
                        <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                          <SelectTrigger id="profile-visibility">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="friends">Friends Only</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="library-visibility">Game Library Visibility</Label>
                        <Select value={libraryVisibility} onValueChange={setLibraryVisibility}>
                          <SelectTrigger id="library-visibility">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="friends">Friends Only</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="online-status">Online Status</Label>
                        <Select value={onlineStatus} onValueChange={setOnlineStatus}>
                          <SelectTrigger id="online-status">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">Show Online</SelectItem>
                            <SelectItem value="offline">Appear Offline</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="friend-requests">Friend Requests</Label>
                        <Select value={friendRequestPolicy} onValueChange={setFriendRequestPolicy}>
                          <SelectTrigger id="friend-requests">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everyone">Everyone</SelectItem>
                            <SelectItem value="friends-of-friends">Friends of Friends</SelectItem>
                            <SelectItem value="noone">No One</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button onClick={() => handleSaveChanges("Privacy")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Privacy Settings
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* 3. Store & Payments */}
              <TabsContent value="store">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Store Preferences
                      </CardTitle>
                      <CardDescription>Manage your purchasing preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Preferred Currency</Label>
                        <Select value={currency} onValueChange={setCurrency}>
                          <SelectTrigger id="currency">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INR">₹ INR - Indian Rupee</SelectItem>
                            <SelectItem value="USD">$ USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">€ EUR - Euro</SelectItem>
                            <SelectItem value="GBP">£ GBP - British Pound</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="one-click">One-Click Purchase</Label>
                            <p className="text-sm text-muted-foreground">
                              Don't show confirmation popup for purchases under limit
                            </p>
                          </div>
                          <Switch
                            id="one-click"
                            checked={oneClickPurchase}
                            onCheckedChange={setOneClickPurchase}
                          />
                        </div>

                        {oneClickPurchase && (
                          <div className="space-y-2 pl-4">
                            <Label htmlFor="purchase-limit">Purchase Limit (₹)</Label>
                            <Input
                              id="purchase-limit"
                              type="number"
                              value={purchaseLimit}
                              onChange={(e) => setPurchaseLimit(e.target.value)}
                              placeholder="500"
                            />
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="save-payment">Save Payment Method</Label>
                          <p className="text-sm text-muted-foreground">
                            Securely store your payment information
                          </p>
                        </div>
                        <Switch
                          id="save-payment"
                          checked={savePaymentMethod}
                          onCheckedChange={setSavePaymentMethod}
                        />
                      </div>

                      <Separator />

                      {/* Spending Limits */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="spending-limit">Monthly Spending Limit (₹)</Label>
                          <Input
                            id="spending-limit"
                            type="number"
                            value={spendingLimit}
                            onChange={(e) => setSpendingLimit(e.target.value)}
                            placeholder="5000"
                          />
                          <p className="text-xs text-muted-foreground">
                            Set a maximum amount you can spend per month
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password-threshold">Require Password for Purchases Above (₹)</Label>
                          <Input
                            id="password-threshold"
                            type="number"
                            value={requirePasswordAbove}
                            onChange={(e) => setRequirePasswordAbove(e.target.value)}
                            placeholder="2000"
                          />
                          <p className="text-xs text-muted-foreground">
                            Additional verification for high-value purchases
                          </p>
                        </div>
                      </div>

                      <Button onClick={() => handleSaveChanges("Store")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Store Settings
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* 4. Downloads & Updates */}
              <TabsContent value="downloads">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Download className="h-5 w-5" />
                        Download Settings
                      </CardTitle>
                      <CardDescription>Configure downloads and updates</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="auto-update">Auto-Update Games</Label>
                        <Select value={autoUpdate} onValueChange={setAutoUpdate}>
                          <SelectTrigger id="auto-update">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="always">Always</SelectItem>
                            <SelectItem value="launcher-open">Only when launcher is open</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="download-limit">Download Speed Limit</Label>
                        <Select value={downloadLimit} onValueChange={setDownloadLimit}>
                          <SelectTrigger id="download-limit">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unlimited">No Limit</SelectItem>
                            <SelectItem value="1">1 MB/s</SelectItem>
                            <SelectItem value="5">5 MB/s</SelectItem>
                            <SelectItem value="10">10 MB/s</SelectItem>
                            <SelectItem value="20">20 MB/s</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="downloads-playing">Allow Downloads While Playing</Label>
                          <p className="text-sm text-muted-foreground">
                            Continue downloads while playing games
                          </p>
                        </div>
                        <Switch
                          id="downloads-playing"
                          checked={downloadsWhilePlaying}
                          onCheckedChange={setDownloadsWhilePlaying}
                        />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="install-path">Default Install Location</Label>
                        <div className="flex gap-2">
                          <Input
                            id="install-path"
                            value={installPath}
                            onChange={(e) => setInstallPath(e.target.value)}
                            readOnly
                            className="cursor-not-allowed"
                          />
                          <Button variant="outline">Browse</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          This is where your games will be installed by default
                        </p>
                      </div>

                      <Button onClick={() => handleSaveChanges("Downloads")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Download Settings
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Storage Usage Card - Phase 2 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Download className="h-5 w-5" />
                        Storage Usage
                      </CardTitle>
                      <CardDescription>Manage your disk space</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Used Space</span>
                          <span className="font-medium">{storageUsage.used} GB / {storageUsage.total} GB</span>
                        </div>
                        <Progress value={(storageUsage.used / storageUsage.total) * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {Math.round((storageUsage.used / storageUsage.total) * 100)}% used • {storageUsage.total - storageUsage.used} GB available
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Largest Games</h4>
                        {storageUsage.games.map((game, index) => (
                          <div key={index} className="flex items-center justify-between text-sm p-2 rounded bg-muted">
                            <span className="text-muted-foreground">{game.name}</span>
                            <span className="font-medium">{game.size} GB</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* 5. Interface & Theme */}
              <TabsContent value="interface">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Interface Preferences
                      </CardTitle>
                      <CardDescription>Customize your app experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select value={theme} onValueChange={(value) => setTheme(value as "dark" | "light" | "system")}>
                          <SelectTrigger id="theme">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger id="language">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="hi">हिन्दी</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="region">Region</Label>
                        <Select value={region} onValueChange={setRegion}>
                          <SelectTrigger id="region">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IN">India</SelectItem>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="GB">United Kingdom</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Used for showing local times for sales and events
                        </p>
                      </div>

                      <Button onClick={() => handleSaveChanges("Interface")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Interface Settings
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* 6. Notifications */}
              <TabsContent value="notifications">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Email Notifications
                      </CardTitle>
                      <CardDescription>Choose what emails you receive</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-purchases">Game Purchases & Receipts</Label>
                          <p className="text-sm text-muted-foreground">
                            Order confirmations and receipts
                          </p>
                        </div>
                        <Switch
                          id="email-purchases"
                          checked={emailPurchases}
                          onCheckedChange={setEmailPurchases}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-marketing">New Game Releases & Offers</Label>
                          <p className="text-sm text-muted-foreground">
                            Marketing emails about sales and new releases
                          </p>
                        </div>
                        <Switch
                          id="email-marketing"
                          checked={emailMarketing}
                          onCheckedChange={setEmailMarketing}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-friends">Friend Activity</Label>
                          <p className="text-sm text-muted-foreground">
                            Friend requests, invites, and activity
                          </p>
                        </div>
                        <Switch
                          id="email-friends"
                          checked={emailFriendActivity}
                          onCheckedChange={setEmailFriendActivity}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        In-App Notifications
                      </CardTitle>
                      <CardDescription>Desktop notifications and popups</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-downloads">Downloads Completed</Label>
                          <p className="text-sm text-muted-foreground">
                            Show popup when downloads finish
                          </p>
                        </div>
                        <Switch
                          id="notify-downloads"
                          checked={notifyDownloads}
                          onCheckedChange={setNotifyDownloads}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-achievements">Achievements Unlocked</Label>
                          <p className="text-sm text-muted-foreground">
                            Show popup when you unlock achievements
                          </p>
                        </div>
                        <Switch
                          id="notify-achievements"
                          checked={notifyAchievements}
                          onCheckedChange={setNotifyAchievements}
                        />
                      </div>

                      <Separator />

                      {/* Phase 2: Email Frequency */}
                      <div className="space-y-2">
                        <Label htmlFor="email-frequency">Email Digest Frequency</Label>
                        <Select value={emailFrequency} onValueChange={setEmailFrequency}>
                          <SelectTrigger id="email-frequency">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                            <SelectItem value="weekly">Weekly Summary</SelectItem>
                            <SelectItem value="monthly">Monthly Report</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          How often to receive marketing and update emails
                        </p>
                      </div>

                      <Separator />

                      {/* Phase 2: Do Not Disturb */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="dnd-enabled">Do Not Disturb</Label>
                            <p className="text-sm text-muted-foreground">
                              Silence notifications during specific hours
                            </p>
                          </div>
                          <Switch
                            id="dnd-enabled"
                            checked={dndEnabled}
                            onCheckedChange={setDndEnabled}
                          />
                        </div>

                        {dndEnabled && (
                          <div className="grid grid-cols-2 gap-4 pl-4">
                            <div className="space-y-2">
                              <Label htmlFor="dnd-start">Start Time</Label>
                              <Input
                                id="dnd-start"
                                type="time"
                                value={dndStartTime}
                                onChange={(e) => setDndStartTime(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="dnd-end">End Time</Label>
                              <Input
                                id="dnd-end"
                                type="time"
                                value={dndEndTime}
                                onChange={(e) => setDndEndTime(e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <Button onClick={() => handleSaveChanges("Notifications")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Notification Settings
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* 7. In-Game & Overlay */}
              <TabsContent value="ingame">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Gamepad2 className="h-5 w-5" />
                        In-Game Overlay
                      </CardTitle>
                      <CardDescription>Configure the in-game overlay</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="overlay-enabled">Enable In-Game Overlay</Label>
                          <p className="text-sm text-muted-foreground">
                            Access friends, chat, and more while playing
                          </p>
                        </div>
                        <Switch
                          id="overlay-enabled"
                          checked={overlayEnabled}
                          onCheckedChange={setOverlayEnabled}
                        />
                      </div>

                      {overlayEnabled && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="overlay-shortcut">Overlay Shortcut</Label>
                            <div className="flex gap-2">
                              <Input
                                id="overlay-shortcut"
                                value={overlayShortcut}
                                onKeyDown={handleShortcutKeyPress}
                                onFocus={() => setIsEditingShortcut(true)}
                                onBlur={() => setIsEditingShortcut(false)}
                                placeholder="Click and press keys"
                                className={isEditingShortcut ? "border-primary" : ""}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setOverlayShortcut("Shift+Tab")}
                              >
                                Reset
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {isEditingShortcut ? "Press any key combination (e.g., Ctrl+Shift+O)" : "Click to record a new shortcut"}
                            </p>
                          </div>

                          <Separator />

                          {/* Phase 2: Overlay Customization */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-medium">Overlay Customization</h4>

                            <div className="space-y-2">
                              <Label htmlFor="overlay-position">Position</Label>
                              <Select value={overlayPosition} onValueChange={setOverlayPosition}>
                                <SelectTrigger id="overlay-position">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="top-left">Top Left</SelectItem>
                                  <SelectItem value="top-right">Top Right</SelectItem>
                                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="overlay-opacity">Opacity</Label>
                                <span className="text-sm text-muted-foreground">{overlayOpacity}%</span>
                              </div>
                              <input
                                type="range"
                                id="overlay-opacity"
                                min="0"
                                max="100"
                                value={overlayOpacity}
                                onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                                className="w-full"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Size</Label>
                              <div className="flex gap-2">
                                {["small", "medium", "large"].map((size) => (
                                  <Button
                                    key={size}
                                    variant={overlaySize === size ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setOverlaySize(size)}
                                    className="flex-1 capitalize"
                                  >
                                    {size}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label htmlFor="show-fps">FPS Counter</Label>
                                <p className="text-sm text-muted-foreground">Display frames per second</p>
                              </div>
                              <Switch
                                id="show-fps"
                                checked={showFPS}
                                onCheckedChange={setShowFPS}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label htmlFor="show-network">Network Monitor</Label>
                                <p className="text-sm text-muted-foreground">Display ping and latency</p>
                              </div>
                              <Switch
                                id="show-network"
                                checked={showNetworkMonitor}
                                onCheckedChange={setShowNetworkMonitor}
                              />
                            </div>
                          </div>

                          <Separator />

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="ingame-notifications">Show Notifications In-Game</Label>
                              <p className="text-sm text-muted-foreground">
                                Achievement and friend popups while playing
                              </p>
                            </div>
                            <Switch
                              id="ingame-notifications"
                              checked={inGameNotifications}
                              onCheckedChange={setInGameNotifications}
                            />
                          </div>
                        </>
                      )}

                      <Button onClick={() => handleSaveChanges("In-Game")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Overlay Settings
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* 8. Devices & Controllers */}
              <TabsContent value="devices">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Gamepad2 className="h-5 w-5" />
                        Controller Settings
                      </CardTitle>
                      <CardDescription>Configure controller preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="controller-type">Preferred Controller Type</Label>
                        <Select value={controllerType} onValueChange={setControllerType}>
                          <SelectTrigger id="controller-type">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="xbox">Xbox Controller</SelectItem>
                            <SelectItem value="playstation">PlayStation Controller</SelectItem>
                            <SelectItem value="nintendo">Nintendo Controller</SelectItem>
                            <SelectItem value="generic">Generic Controller</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="vibration">Allow Vibration</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable controller rumble/vibration feedback
                          </p>
                        </div>
                        <Switch
                          id="vibration"
                          checked={vibration}
                          onCheckedChange={setVibration}
                        />
                      </div>

                      <Button onClick={() => handleSaveChanges("Controller")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Controller Settings
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* 9. Data & Account Management */}
              <TabsContent value="data">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Data Management
                      </CardTitle>
                      <CardDescription>Export or manage your data</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted">
                        <h3 className="font-semibold mb-2">Download Your Data</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Export a copy of your account information, game library, and activity
                        </p>
                        <Button
                          variant="outline"
                          disabled={isDownloadingData}
                          onClick={handleDownloadData}
                        >
                          {isDownloadingData ? (
                            <>
                              <Download className="h-4 w-4 mr-2 animate-spin" />
                              Preparing Download...
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              Download Data
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-destructive/50 bg-destructive/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        Danger Zone
                      </CardTitle>
                      <CardDescription>Irreversible actions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted">
                        <h3 className="font-semibold mb-2 text-destructive">Delete Account</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Permanently delete your account, games, and all associated data. This action cannot be undone.
                        </p>
                        <Button
                          variant="destructive"
                          onClick={() => setIsDeleteDialogOpen(true)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </div> {/* End Content Area */}
          </Tabs>
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Delete Account?
            </DialogTitle>
            <DialogDescription>
              This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm">
              Deleting your account will:
            </p>
            <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
              <li>Remove access to all your games</li>
              <li>Delete your game saves and achievements</li>
              <li>Remove you from all friends lists</li>
              <li>Cancel any active subscriptions</li>
              <li>Delete all your account data</li>
            </ul>
            <p className="text-sm font-semibold">
              Are you absolutely sure you want to proceed?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                alert("Account deletion requested. Our team will review your request.");
                setIsDeleteDialogOpen(false);
              }}
            >
              Yes, Delete My Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <div className="flex flex-col items-center text-center py-6">
            <div className="mb-6 h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl">Success!</DialogTitle>
              <DialogDescription className="text-base">
                {successMessage}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 w-full">
              <Button onClick={() => setIsSuccessDialogOpen(false)} className="w-full">
                OK
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <div className="flex flex-col items-center text-center py-6">
            <div className="mb-6 h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl text-red-500">Mismatch!</DialogTitle>
              <DialogDescription className="text-base">
                {errorMessage}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 w-full">
              <Button onClick={() => setIsErrorDialogOpen(false)} className="w-full" variant="destructive">
                OK
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
