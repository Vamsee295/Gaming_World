import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [bandwidthLimit, setBandwidthLimit] = useState("No limit");
  const [privateProfile, setPrivateProfile] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-secondary p-4">
          <h2 className="text-foreground font-semibold mb-3">General</h2>
          <div className="flex items-center justify-between mb-3">
            <span className="text-foreground">Language</span>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Language" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground">Notifications</span>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-secondary p-4">
          <h2 className="text-foreground font-semibold mb-3">Download</h2>
          <div className="flex items-center justify-between mb-3">
            <span className="text-foreground">Auto-update</span>
            <Switch checked={autoUpdate} onCheckedChange={setAutoUpdate} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground">Bandwidth</span>
            <Select value={bandwidthLimit} onValueChange={setBandwidthLimit}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Limit" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="No limit">No limit</SelectItem>
                <SelectItem value="1 MB/s">1 MB/s</SelectItem>
                <SelectItem value="5 MB/s">5 MB/s</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-secondary p-4 md:col-span-2">
          <h2 className="text-foreground font-semibold mb-3">Privacy</h2>
          <div className="flex items-center justify-between">
            <span className="text-foreground">Private profile</span>
            <Switch checked={privateProfile} onCheckedChange={setPrivateProfile} />
          </div>
        </div>
      </div>
    </div>
  );
}



