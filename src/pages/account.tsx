import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

export default function AccountPage() {
  const { user } = useUser();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [region, setRegion] = useState("India");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Account</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-secondary p-4">
          <h2 className="text-foreground font-semibold mb-3">Profile</h2>
          <div className="grid gap-3">
            <Input placeholder="Username" value={name} onChange={(e)=>setName(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Input placeholder="Region" value={region} onChange={(e)=>setRegion(e.target.value)} />
            <Button>Save Changes</Button>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-secondary p-4">
          <h2 className="text-foreground font-semibold mb-3">Linked Accounts</h2>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center justify-between"><span>Google</span><Button variant="outline">Connect</Button></div>
            <div className="flex items-center justify-between"><span>Xbox</span><Button variant="outline">Connect</Button></div>
            <div className="flex items-center justify-between"><span>Steam</span><Button variant="outline">Connect</Button></div>
          </div>
          <h2 className="text-foreground font-semibold mt-6 mb-3">Change Password</h2>
          <div className="grid gap-2">
            <Input type="password" placeholder="Current Password" />
            <Input type="password" placeholder="New Password" />
            <Input type="password" placeholder="Confirm New Password" />
            <Button>Update Password</Button>
          </div>
        </div>
      </div>
    </div>
  );
}



