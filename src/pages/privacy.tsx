import React from "react";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">Privacy Policy</h1>
      <p className="text-xs text-muted-foreground mb-6">Last updated: Jan 1, 2025</p>
      <div className="prose prose-invert max-w-none">
        <h2>Data We Collect</h2>
        <p>Account identifiers, purchase history, device data.</p>
        <h2>Cookies</h2>
        <p>We use cookies to keep you signed in and remember preferences.</p>
        <h2>Data Removal</h2>
        <p>Contact support to request data deletion in accordance with applicable law.</p>
      </div>
    </div>
  );
}



