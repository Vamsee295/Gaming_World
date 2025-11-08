import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { Settings2, Shield, Download, User, HelpCircle } from "lucide-react";

type SettingsTab = "general" | "download" | "privacy" | "account" | "support";

export default function SettingsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  // General Settings
  const [language, setLanguage] = useState("English (US)");
  const [notifications, setNotifications] = useState(true);
  const [themeMode, setThemeMode] = useState(true);
  const [autoDetectTimezone, setAutoDetectTimezone] = useState(true);
  const [timezone, setTimezone] = useState("UTC + 5:30 (IST)");

  // Download Settings
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [bandwidthLimit, setBandwidthLimit] = useState("No Limit");
  const [downloadLocation, setDownloadLocation] = useState("C:\\Games\\EpicStream");

  // Privacy Settings
  const [privateProfile, setPrivateProfile] = useState(false);
  const [hidePlaytime, setHidePlaytime] = useState(false);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);

  const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: "general", label: "1) General", icon: <Settings2 className="w-4 h-4" /> },
    { id: "download", label: "2) Download", icon: <Download className="w-4 h-4" /> },
    { id: "privacy", label: "3) Privacy", icon: <Shield className="w-4 h-4" /> },
    { id: "account", label: "4) Account Management", icon: <User className="w-4 h-4" /> },
    { id: "support", label: "5) Support / System", icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handlePauseDownloads = () => {
    toast({
      title: "Downloads Paused",
      description: "All active downloads have been paused.",
    });
  };

  const handleChooseFolder = () => {
    toast({
      title: "Folder Selection",
      description: "Folder selection dialog would open here (browser limitation).",
      variant: "default",
    });
  };

  const handleTwoFactorAuth = () => {
    router.push("/account");
  };

  const handleChangeEmail = () => {
    router.push("/account");
  };

  const handleChangePassword = () => {
    router.push("/account");
  };

  const handleLinkAccounts = () => {
    router.push("/account");
  };

  const handleSignOutAll = () => {
    toast({
      title: "Sign Out All Devices",
      description: "You have been signed out of all devices.",
      variant: "default",
    });
  };

  const handleContactSupport = () => {
    toast({
      title: "Contact Support",
      description: "Redirecting to support page...",
    });
  };

  const handleClearCache = () => {
    toast({
      title: "Cache Cleared",
      description: "Application cache has been cleared successfully.",
    });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 border-b border-border pb-4 text-primary tracking-tight">
          User Settings
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Navigation */}
          <nav className="lg:w-1/4 flex lg:flex-col p-4 bg-card rounded-xl shadow-lg border border-border overflow-x-auto lg:overflow-x-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full lg:w-auto text-left py-3 px-4 mb-2 lg:mb-1 rounded-lg text-sm font-medium transition duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Content Area */}
          <main className="lg:w-3/4 p-6 bg-card rounded-xl shadow-2xl border border-border">
            {/* General Settings */}
            {activeTab === "general" && (
              <section className="space-y-8">
                <h2 className="text-2xl font-bold mb-6 text-primary">General Settings</h2>

                {/* Language Selector */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-6">
                  <Label htmlFor="language" className="text-base font-medium">
                    Language
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="mt-2 sm:mt-0 w-full sm:w-1/2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English (US)">English (US)</SelectItem>
                      <SelectItem value="Spanish (ES)">Spanish (ES)</SelectItem>
                      <SelectItem value="Japanese (JP)">Japanese (JP)</SelectItem>
                      <SelectItem value="French (FR)">French (FR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Notifications Toggle */}
                <div className="flex justify-between items-center border-b border-border pb-6">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">Notifications</span>
                    <span className="text-sm text-muted-foreground">
                      Receive alerts for new messages and stream starts.
                    </span>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                {/* Theme Mode */}
                <div className="flex justify-between items-center border-b border-border pb-6">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">Theme Mode</span>
                    <span className="text-sm text-muted-foreground">
                      Switch between light and dark visual themes.
                    </span>
                  </div>
                  <Switch checked={themeMode} onCheckedChange={setThemeMode} />
                </div>

                {/* Timezone */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-base font-medium">Auto-Detect Timezone</span>
                      <span className="text-sm text-muted-foreground">
                        Automatically use your local timezone for schedules.
                      </span>
                    </div>
                    <Switch checked={autoDetectTimezone} onCheckedChange={setAutoDetectTimezone} />
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Label htmlFor="timezone-manual" className="block text-sm font-medium mb-2">
                      Manual Timezone Override
                    </Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger id="timezone-manual" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC - 5:00 (EST)">UTC - 5:00 (EST)</SelectItem>
                        <SelectItem value="UTC + 5:30 (IST)">UTC + 5:30 (IST)</SelectItem>
                        <SelectItem value="UTC + 1:00 (CET)">UTC + 1:00 (CET)</SelectItem>
                        <SelectItem value="UTC - 8:00 (PST)">UTC - 8:00 (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>
            )}

            {/* Download Settings */}
            {activeTab === "download" && (
              <section className="space-y-8">
                <h2 className="text-2xl font-bold mb-6 text-primary">Download Settings</h2>

                {/* Auto-update Toggle */}
                <div className="flex justify-between items-center border-b border-border pb-6">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">Automatic Updates</span>
                    <span className="text-sm text-muted-foreground">
                      Automatically download and install updates in the background.
                    </span>
                  </div>
                  <Switch checked={autoUpdate} onCheckedChange={setAutoUpdate} />
                </div>

                {/* Bandwidth Limit Selector */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-6">
                  <Label htmlFor="bandwidth" className="text-base font-medium">
                    Download Bandwidth Limit
                  </Label>
                  <Select value={bandwidthLimit} onValueChange={setBandwidthLimit}>
                    <SelectTrigger id="bandwidth" className="mt-2 sm:mt-0 w-full sm:w-1/2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="No Limit">No Limit</SelectItem>
                      <SelectItem value="500 KB/s">500 KB/s</SelectItem>
                      <SelectItem value="1 MB/s">1 MB/s</SelectItem>
                      <SelectItem value="2 MB/s">2 MB/s</SelectItem>
                      <SelectItem value="5 MB/s">5 MB/s</SelectItem>
                      <SelectItem value="10 MB/s">10 MB/s</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Download Location Selector */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-6">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">Download Location</span>
                    <span className="text-sm text-muted-foreground">
                      Current Folder: {downloadLocation}
                    </span>
                  </div>
                  <Button onClick={handleChooseFolder} variant="outline" className="mt-3 sm:mt-0">
                    Choose Folder
                  </Button>
                </div>

                {/* Pause All Downloads Button */}
                <div className="pt-4">
                  <Button
                    onClick={handlePauseDownloads}
                    variant="destructive"
                    className="w-full"
                  >
                    Pause All Active Downloads
                  </Button>
                </div>
              </section>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <section className="space-y-8">
                <h2 className="text-2xl font-bold mb-6 text-primary">Privacy Settings</h2>

                {/* Private Profile Toggle */}
                <div className="flex justify-between items-center border-b border-border pb-6">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">Private Profile</span>
                    <span className="text-sm text-muted-foreground">
                      Only friends can view your profile and activity.
                    </span>
                  </div>
                  <Switch checked={privateProfile} onCheckedChange={setPrivateProfile} />
                </div>

                {/* Hide Playtime Toggle */}
                <div className="flex justify-between items-center border-b border-border pb-6">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">Hide Playtime</span>
                    <span className="text-sm text-muted-foreground">
                      Prevents others from seeing how many hours you have played a game.
                    </span>
                  </div>
                  <Switch checked={hidePlaytime} onCheckedChange={setHidePlaytime} />
                </div>

                {/* Show Online Status Toggle */}
                <div className="flex justify-between items-center border-b border-border pb-6">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">Show Online Status</span>
                    <span className="text-sm text-muted-foreground">
                      Friends can see when you are online and playing.
                    </span>
                  </div>
                  <Switch checked={showOnlineStatus} onCheckedChange={setShowOnlineStatus} />
                </div>

                {/* Two-Factor Authentication Link */}
                <div className="pt-4">
                  <Button onClick={handleTwoFactorAuth} className="w-full bg-primary hover:bg-primary/90">
                    Two-Factor Authentication Settings
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Highly recommended for account security.
                  </p>
                </div>
              </section>
            )}

            {/* Account Management */}
            {activeTab === "account" && (
              <section className="space-y-8">
                <h2 className="text-2xl font-bold mb-6 text-primary">Account Management</h2>

                {/* Change Email */}
                <div className="flex justify-between items-center border-b border-border pb-6">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">Change Email Address</span>
                    <span className="text-sm text-muted-foreground">
                      Current: user@gamingstream.com
                    </span>
                  </div>
                  <Button onClick={handleChangeEmail} variant="outline" size="sm">
                    Edit
                  </Button>
                </div>

                {/* Change Password */}
                <div className="flex justify-between items-center border-b border-border pb-6">
                  <span className="text-base font-medium">Change Password</span>
                  <Button onClick={handleChangePassword} variant="outline" size="sm">
                    Update Password
                  </Button>
                </div>

                {/* Manage Connected Accounts */}
                <div className="flex justify-between items-center border-b border-border pb-6">
                  <span className="text-base font-medium">Manage Connected Accounts</span>
                  <Button onClick={handleLinkAccounts} size="sm">
                    Link/Unlink Accounts
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Linked: Epic, Steam. Unlinked: Xbox, PlayStation.
                </p>

                {/* Sign out of all devices button */}
                <div className="pt-4">
                  <Button
                    onClick={handleSignOutAll}
                    variant="destructive"
                    className="w-full bg-red-800 hover:bg-red-700"
                  >
                    Sign Out of All Devices
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Use this if you suspect unauthorized access.
                  </p>
                </div>
              </section>
            )}

            {/* Support / System */}
            {activeTab === "support" && (
              <section className="space-y-8">
                <h2 className="text-2xl font-bold mb-6 text-primary">Support & System Info</h2>

                {/* App Version Info */}
                <div className="border-b border-border pb-6">
                  <span className="text-base font-medium block">Application Version</span>
                  <span className="text-lg font-mono text-primary mt-1">1.23.4 (Build 7890)</span>
                  <p className="text-sm text-muted-foreground">Your application is up to date.</p>
                </div>

                {/* Contact Support Link */}
                <div className="pt-4 border-b border-border pb-6">
                  <Button onClick={handleContactSupport} className="w-full">
                    Contact Technical Support
                  </Button>
                </div>

                {/* Clear Cache Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleClearCache}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    Clear Application Cache
                  </Button>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
