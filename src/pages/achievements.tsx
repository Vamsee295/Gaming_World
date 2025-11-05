import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface GameAchievement {
  game: string;
  progress: number; // 0-100
  total: number;
  unlocked: number;
}

const data: GameAchievement[] = [
  { game: "Cyberpunk 2077", progress: 72, total: 48, unlocked: 34 },
  { game: "Spiderman", progress: 45, total: 30, unlocked: 14 },
  { game: "GTA 6", progress: 20, total: 60, unlocked: 12 },
];

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">My Achievements</h1>
      <div className="grid gap-4">
        {data.map((g) => (
          <div key={g.game} className="rounded-lg border border-border bg-secondary p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-foreground font-semibold">{g.game}</h2>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{g.unlocked}/{g.total}</Badge>
                <Badge className="bg-primary text-primary-foreground">{g.progress}%</Badge>
              </div>
            </div>
            <Progress value={g.progress} />
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span>Unlocked Badges:</span>
              <span className="inline-flex gap-1">
                <span className="inline-block h-3 w-3 rounded-full bg-yellow-400" />
                <span className="inline-block h-3 w-3 rounded-full bg-yellow-400" />
                <span className="inline-block h-3 w-3 rounded-full bg-muted" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



