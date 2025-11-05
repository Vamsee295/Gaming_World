import React from "react";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">Terms of Service</h1>
      <p className="text-xs text-muted-foreground mb-6">Last updated: Jan 1, 2025</p>
      <div className="prose prose-invert max-w-none">
        <h2>1. Introduction</h2>
        <p>Welcome to our gaming store. By using the service you agree to these terms.</p>
        <h2>2. User Rights</h2>
        <p>You may browse and purchase games for personal use subject to license terms.</p>
        <h2>3. Restrictions</h2>
        <p>No reverse engineering, redistribution, or misuse of the platform.</p>
        <h2>4. Refunds</h2>
        <p>Refunds are governed by our Store Refund Policy.</p>
      </div>
    </div>
  );
}



