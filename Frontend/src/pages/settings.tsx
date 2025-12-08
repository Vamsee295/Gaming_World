import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  User, Mail, Bell, Shield, Download, Palette, Globe, Lock,
  Save, Trash2, Eye, Smartphone, CreditCard, Gamepad2,
  ArrowLeft, AlertTriangle, CheckCircle2, XCircle
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsPage() {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();

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

  return (
    <>
      <Head>
        <title>Settings - GameVerse</title>
      </Head>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <Link href="/">
              <Button variant="ghost" className="gap-2 mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
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
                      <div className="space-y-2">
                        <Label htmlFor="old-password">Current Password</Label>
                        <Input
                          id="old-password"
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="Enter current password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                        />
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
                        <Select value={appTheme} onValueChange={(value) => { setAppTheme(value); toggleTheme(); }}>
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
                            <Input
                              id="overlay-shortcut"
                              value={overlayShortcut}
                              onChange={(e) => setOverlayShortcut(e.target.value)}
                              readOnly
                              className="cursor-not-allowed"
                            />
                            <p className="text-xs text-muted-foreground">
                              Press this key combination to open the overlay
                            </p>
                          </div>

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
                        <Button variant="outline" disabled>
                          Coming Soon
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
