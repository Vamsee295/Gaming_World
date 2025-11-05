import React from "react";
import { Badge } from "@/components/ui/badge";

const publishers = [
  { id: 1, name: "CD PROJEKT", games: 4 },
  { id: 2, name: "Rockstar Games", games: 6 },
  { id: 3, name: "Insomniac", games: 2 },
];

export default function PublishersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Publisher Index</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {publishers.map(p => (
          <div key={p.id} className="rounded-lg border border-border bg-secondary p-4 flex items-center justify-between">
            <div>
              <div className="text-foreground font-semibold">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.games} games</div>
            </div>
            <Badge variant="secondary">View</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}



