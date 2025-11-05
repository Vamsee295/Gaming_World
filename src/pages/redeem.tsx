import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RedeemCodePage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const onRedeem = () => {
    if (code.trim().length < 6) setMessage("Invalid code. Please check and try again.");
    else setMessage("Success! Code redeemed.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Redeem Code</h1>
      <div className="rounded-lg border border-border bg-secondary p-4 max-w-xl">
        <Input placeholder="Enter Code" value={code} onChange={(e)=>setCode(e.target.value)} />
        <div className="mt-3 flex gap-2">
          <Button onClick={onRedeem}>Redeem</Button>
          <Button variant="outline" onClick={()=>{setCode(""); setMessage(null);}}>Clear</Button>
        </div>
        {message && <p className="mt-3 text-sm text-foreground">{message}</p>}
      </div>
    </div>
  );
}



