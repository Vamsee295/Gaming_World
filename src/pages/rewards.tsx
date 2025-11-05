import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const rewards = [
  { id: 1, title: "10% Off Coupon", cost: 500 },
  { id: 2, title: "Exclusive Avatar Frame", cost: 800 },
  { id: 3, title: "₹200 Wallet Credit", cost: 1200 },
];

export default function RewardsPage() {
  const points = 760; // demo

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Epic Rewards</h1>
        <div className="rounded-full bg-secondary px-4 py-2 text-foreground">Points: <span className="font-semibold">{points}</span></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rewards.map(r => (
          <Card key={r.id}>
            <CardHeader>
              <CardTitle className="text-foreground">{r.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-muted-foreground">Cost: {r.cost} pts</span>
              <Button disabled={points < r.cost}>Claim Reward</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}



