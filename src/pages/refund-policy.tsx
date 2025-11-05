import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">Store Refund Policy</h1>
      <div className="prose prose-invert max-w-none">
        <h2>Eligibility</h2>
        <p>Refunds available within 14 days of purchase with less than 2 hours of playtime.</p>
        <h2>Time Limits</h2>
        <p>Requests must be initiated within the eligibility window.</p>
        <h2>How to Request</h2>
        <p>Open your order history and choose Request Refund on the desired order.</p>
      </div>
    </div>
  );
}



