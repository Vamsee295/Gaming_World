import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const coupons = {
  active: [{ code: "SAVE10", expiry: "2026-01-08", product: "Any game" }],
  expired: [{ code: "WINTER25", expiry: "2024-12-31", product: "Select titles" }],
  upcoming: [{ code: "SPRING15", expiry: "2026-03-01", product: "Storewide" }],
};

function CouponRow({ c }: { c: { code: string; expiry: string; product: string } }) {
  return (
    <div className="flex items-center justify-between rounded border border-border bg-secondary p-3">
      <div>
        <div className="text-foreground font-semibold">{c.code}</div>
        <div className="text-xs text-muted-foreground">Expires: {c.expiry} • {c.product}</div>
      </div>
      <Button>Redeem Now</Button>
    </div>
  );
}

export default function CouponsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Coupons</h1>
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        <div className="mt-4 grid gap-3">
          <TabsContent value="active" className="m-0">
            {coupons.active.map(c => <CouponRow key={c.code} c={c} />)}
          </TabsContent>
          <TabsContent value="expired" className="m-0">
            {coupons.expired.map(c => <CouponRow key={c.code} c={c} />)}
          </TabsContent>
          <TabsContent value="upcoming" className="m-0">
            {coupons.upcoming.map(c => <CouponRow key={c.code} c={c} />)}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}



