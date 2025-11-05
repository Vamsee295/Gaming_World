import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RedeemFortnitePage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">Redeem Fortnite Gift Card</h1>
      <p className="text-muted-foreground mb-6">Enter your Fortnite gift card code below. Rewards will appear in Fortnite under your connected account.</p>
      <div className="rounded-lg border border-border bg-secondary p-4 max-w-xl">
        <Input placeholder="Enter Card Code" value={code} onChange={(e)=>setCode(e.target.value)} />
        <div className="mt-3 flex gap-2">
          <Button onClick={()=> setMessage(code ? "Card redeemed successfully!" : "Please enter a valid code.")}>Redeem</Button>
          <Button variant="outline" onClick={()=>{setCode(""); setMessage(null);}}>Clear</Button>
        </div>
        {message && <p className="mt-3 text-sm text-foreground">{message}</p>}
      </div>
    </div>
  );
}



